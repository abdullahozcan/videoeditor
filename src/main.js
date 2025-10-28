const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const axios = require('axios');
const FormData = require('form-data');
const { spawn } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Select video file
ipcMain.handle('select-video', async () => {
  const res = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Videos', extensions: ['mp4', 'mov', 'mkv', 'webm', 'avi'] }
    ]
  });
  if (res.canceled) return null;
  return res.filePaths[0];
});

// Select multiple video files
ipcMain.handle('select-multiple-videos', async () => {
  const res = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Videos', extensions: ['mp4', 'mov', 'mkv', 'webm', 'avi'] }
    ]
  });
  if (res.canceled) return null;
  return res.filePaths;
});

// Generate subtitles using OpenAI Whisper API
ipcMain.handle('generate-subtitles', async (event, videoPath, language = 'auto') => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set.');
  }

  const url = 'https://api.openai.com/v1/audio/transcriptions';
  const form = new FormData();
  const fileStream = fs.createReadStream(videoPath);
  const fileSize = fs.statSync(videoPath).size;
  
  form.append('file', fileStream);
  form.append('model', 'whisper-1');
  form.append('response_format', 'srt');
  
  // Add language parameter if not auto-detect
  if (language && language !== 'auto') {
    form.append('language', language);
  }

  try {
    const headers = Object.assign(
      { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      form.getHeaders()
    );

    // Send progress updates
    let uploadedBytes = 0;
    fileStream.on('data', (chunk) => {
      uploadedBytes += chunk.length;
      const progress = Math.round((uploadedBytes / fileSize) * 100);
      mainWindow.webContents.send('upload-progress', progress);
    });

    mainWindow.webContents.send('transcription-status', 'Uploading video...');

    const resp = await axios.post(url, form, {
      headers,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 300000 // 5 minutes
    });

    mainWindow.webContents.send('transcription-status', 'Transcription complete!');

    const srtText = resp.data;
    const base = path.basename(videoPath, path.extname(videoPath));
    const srtPath = path.join(os.tmpdir(), `${base}.srt`);
    fs.writeFileSync(srtPath, srtText, 'utf8');
    
    return { srtPath, srtText };
  } catch (err) {
    console.error('transcription error', err.response ? err.response.data : err.message);
    mainWindow.webContents.send('transcription-status', 'Transcription failed');
    throw new Error('Transcription failed: ' + (err.response ? JSON.stringify(err.response.data) : err.message));
  }
});

// Save edited SRT
ipcMain.handle('save-srt', async (event, srtPath, srtContent) => {
  try {
    fs.writeFileSync(srtPath, srtContent, 'utf8');
    return { success: true };
  } catch (err) {
    throw new Error('Failed to save SRT: ' + err.message);
  }
});

// Export SRT as soft subtitle
ipcMain.handle('export-srt', async (event, videoPath, srtContent) => {
  const dir = path.dirname(videoPath);
  const base = path.basename(videoPath, path.extname(videoPath));
  const srtPath = path.join(dir, `${base}.srt`);
  
  try {
    fs.writeFileSync(srtPath, srtContent, 'utf8');
    return { srtPath };
  } catch (err) {
    throw new Error('Failed to export SRT: ' + err.message);
  }
});

// Burn subtitles into video
ipcMain.handle('burn-subtitles', async (event, videoPath, srtPath, subtitleStyle = {}) => {
  if (!fs.existsSync(videoPath)) throw new Error('Video file not found');
  if (!fs.existsSync(srtPath)) throw new Error('SRT file not found');

  const dir = path.dirname(videoPath);
  const base = path.basename(videoPath, path.extname(videoPath));
  const outPath = path.join(dir, `${base}-with-subs.mp4`);

  // Convert SRT to ASS with custom styling
  const assPath = await convertSrtToAss(srtPath, subtitleStyle);

  // Escape path for ffmpeg subtitle filter (Windows compatibility)
  const escapedAssPath = assPath.replace(/\\/g, '/').replace(/:/g, '\\:');
  const args = [
    '-y',
    '-i', videoPath,
    '-vf', `ass=${escapedAssPath}`,
    '-c:a', 'copy',
    outPath
  ];

  return new Promise((resolve, reject) => {
    mainWindow.webContents.send('burn-status', 'Starting encoding...');
    
    const ff = spawn(ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    
    ff.stderr.on('data', (data) => {
      stderr += data.toString();
      
      // Parse ffmpeg progress
      const timeMatch = stderr.match(/time=(\d{2}):(\d{2}):(\d{2})/);
      if (timeMatch) {
        const hours = parseInt(timeMatch[1]);
        const minutes = parseInt(timeMatch[2]);
        const seconds = parseInt(timeMatch[3]);
        const currentTime = hours * 3600 + minutes * 60 + seconds;
        
        // Estimate progress (rough approximation)
        mainWindow.webContents.send('burn-progress', currentTime);
      }
    });

    ff.on('close', (code) => {
      // Clean up temporary ASS file
      try {
        if (fs.existsSync(assPath)) fs.unlinkSync(assPath);
      } catch (e) {
        console.error('Failed to delete temp ASS file:', e);
      }
      
      if (code === 0) {
        mainWindow.webContents.send('burn-status', 'Encoding complete!');
        resolve({ outPath });
      } else {
        mainWindow.webContents.send('burn-status', 'Encoding failed');
        reject(new Error(`ffmpeg failed (code ${code}): ${stderr}`));
      }
    });
  });
});

// Convert SRT to ASS with custom styling
async function convertSrtToAss(srtPath, style = {}) {
  const srtContent = fs.readFileSync(srtPath, 'utf8');
  const assPath = srtPath.replace(/\.srt$/i, '.ass');
  
  // Default styling
  const fontFamily = style.fontFamily || 'Arial';
  const fontSize = style.fontSize || 24;
  const textColor = hexToAssColor(style.textColor || '#FFFFFF');
  const outlineColor = hexToAssColor(style.outlineColor || '#000000');
  const position = style.position || 'bottom';
  const fontWeight = style.fontWeight || 'bold';
  
  // ASS alignment codes: 1=left-bottom, 2=center-bottom, 3=right-bottom
  //                      5=center-middle, 8=center-top
  const alignmentMap = {
    'bottom': 2,
    'middle': 5,
    'top': 8
  };
  const alignment = alignmentMap[position] || 2;
  
  // Font weight
  const isBold = fontWeight === 'bold' ? -1 : 0;
  
  // ASS header
  let assContent = `[Script Info]
Title: Subtitle
ScriptType: v4.00+
WrapStyle: 0
PlayResX: 1920
PlayResY: 1080
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${fontFamily},${fontSize},${textColor},&H000000FF,${outlineColor},&H00000000,${isBold},0,0,0,100,100,0,0,1,2,1,${alignment},10,10,10,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

  // Parse SRT and convert to ASS events
  const srtBlocks = srtContent.trim().split(/\n\n+/);
  
  for (const block of srtBlocks) {
    const lines = block.trim().split('\n');
    if (lines.length < 3) continue;
    
    // Parse SRT timestamp (00:00:01,000 --> 00:00:03,000)
    const timeMatch = lines[1].match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
    if (!timeMatch) continue;
    
    const startTime = `${timeMatch[1]}:${timeMatch[2]}:${timeMatch[3]}.${timeMatch[4].substring(0, 2)}`;
    const endTime = `${timeMatch[5]}:${timeMatch[6]}:${timeMatch[7]}.${timeMatch[8].substring(0, 2)}`;
    
    // Get subtitle text (everything after timestamp)
    const text = lines.slice(2).join('\\N'); // \N is newline in ASS
    
    assContent += `Dialogue: 0,${startTime},${endTime},Default,,0,0,0,,${text}\n`;
  }
  
  fs.writeFileSync(assPath, assContent, 'utf8');
  return assPath;
}

// Convert hex color to ASS color format (&HAABBGGRR)
function hexToAssColor(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // ASS format is &HAABBGGRR (alpha is always 00 for opaque)
  const assColor = `&H00${b.toString(16).padStart(2, '0').toUpperCase()}${g.toString(16).padStart(2, '0').toUpperCase()}${r.toString(16).padStart(2, '0').toUpperCase()}`;
  
  return assColor;
}

// Trim video (cut from start to end time)
ipcMain.handle('trim-video', async (event, videoPath, startTime, endTime, splits = [], audioVolume = 100, aspectRatio = 'original', videoEffects = {}) => {
  if (!fs.existsSync(videoPath)) throw new Error('Video file not found');

  const dir = path.dirname(videoPath);
  const base = path.basename(videoPath, path.extname(videoPath));
  const ext = path.extname(videoPath);
  
  // Build filter complex for audio and video
  const audioFilters = [];
  const videoFilters = [];
  
  // Audio volume filter
  if (audioVolume !== 100) {
    const volumeMultiplier = audioVolume / 100;
    audioFilters.push(`volume=${volumeMultiplier}`);
  }
  
  // Audio fade effects
  if (videoEffects.fadeIn && videoEffects.fadeIn > 0) {
    audioFilters.push(`afade=t=in:st=${startTime}:d=${videoEffects.fadeIn}`);
  }
  if (videoEffects.fadeOut && videoEffects.fadeOut > 0) {
    const fadeOutStart = endTime - videoEffects.fadeOut;
    audioFilters.push(`afade=t=out:st=${fadeOutStart}:d=${videoEffects.fadeOut}`);
  }
  
  // Audio speed adjustment (atempo for audio)
  if (videoEffects.speed && videoEffects.speed !== 1.0) {
    let speed = videoEffects.speed;
    // atempo has limits of 0.5-2.0, so chain multiple for extreme speeds
    while (speed > 2.0) {
      audioFilters.push('atempo=2.0');
      speed /= 2.0;
    }
    while (speed < 0.5) {
      audioFilters.push('atempo=0.5');
      speed /= 0.5;
    }
    if (speed !== 1.0) {
      audioFilters.push(`atempo=${speed}`);
    }
  }
  
  // Video filters
  // Brightness, contrast, saturation (eq filter)
  const eqParams = [];
  if (videoEffects.brightness && videoEffects.brightness !== 0) {
    eqParams.push(`brightness=${videoEffects.brightness}`);
  }
  if (videoEffects.contrast && videoEffects.contrast !== 1.0) {
    eqParams.push(`contrast=${videoEffects.contrast}`);
  }
  if (videoEffects.saturation && videoEffects.saturation !== 1.0) {
    eqParams.push(`saturation=${videoEffects.saturation}`);
  }
  if (eqParams.length > 0) {
    videoFilters.push(`eq=${eqParams.join(':')}`);
  }
  
  // Speed control (setpts for video)
  if (videoEffects.speed && videoEffects.speed !== 1.0) {
    const ptsMultiplier = 1.0 / videoEffects.speed;
    videoFilters.push(`setpts=${ptsMultiplier}*PTS`);
  }
  
  // Rotation and flip
  if (videoEffects.rotation && videoEffects.rotation !== 0) {
    // transpose filter: 1=90°CW, 2=90°CCW, 3=180°
    if (videoEffects.rotation === 90) {
      videoFilters.push('transpose=1');
    } else if (videoEffects.rotation === 180) {
      videoFilters.push('transpose=1,transpose=1');
    } else if (videoEffects.rotation === 270) {
      videoFilters.push('transpose=2');
    }
  }
  
  if (videoEffects.flipH) {
    videoFilters.push('hflip');
  }
  if (videoEffects.flipV) {
    videoFilters.push('vflip');
  }
  
  // Video aspect ratio filter (apply after other filters)
  if (aspectRatio !== 'original') {
    const ratioMap = {
      '9:16': { width: 1080, height: 1920 },   // Phone portrait
      '16:9': { width: 1920, height: 1080 },   // Landscape/YouTube
      '1:1': { width: 1080, height: 1080 },    // Square/Instagram
      '4:5': { width: 1080, height: 1350 },    // Instagram portrait
      '4:3': { width: 1440, height: 1080 }     // Classic TV
    };
    
    const target = ratioMap[aspectRatio];
    if (target) {
      // Scale and pad to maintain aspect ratio without stretching
      videoFilters.push(`scale=${target.width}:${target.height}:force_original_aspect_ratio=decrease,pad=${target.width}:${target.height}:(ow-iw)/2:(oh-ih)/2:black`);
    }
  }
  
  // Build final filter strings
  const filters = audioFilters;
  const videoFilter = videoFilters.length > 0 ? videoFilters.join(',') : null;
  
  // If no splits, just trim
  if (splits.length === 0) {
    const outPath = path.join(dir, `${base}-edited${ext}`);
    const duration = endTime - startTime;
    
    const args = ['-y', '-i', videoPath, '-ss', startTime.toString(), '-t', duration.toString()];
    
    // Add filters
    if (videoFilter) {
      args.push('-vf', videoFilter);
    } else {
      args.push('-c:v', 'copy');
    }
    
    if (filters.length > 0) {
      args.push('-af', filters.join(','));
    } else {
      args.push('-c:a', 'copy');
    }
    
    // If we're applying filters, we need to re-encode
    if (!videoFilter && filters.length === 0) {
      // Fast copy mode
    } else {
      // Re-encode with quality
      if (videoFilter) {
        args.push('-c:v', 'libx264', '-preset', 'fast', '-crf', '23');
      }
      if (filters.length > 0) {
        args.push('-c:a', 'aac', '-b:a', '192k');
      }
    }
    
    args.push(outPath);

    return new Promise((resolve, reject) => {
      mainWindow.webContents.send('burn-status', 'Processing video...');
      
      const ff = spawn(ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
      let stderr = '';
      
      ff.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      ff.on('close', (code) => {
        if (code === 0) {
          mainWindow.webContents.send('burn-status', 'Export complete!');
          resolve({ outPath });
        } else {
          mainWindow.webContents.send('burn-status', 'Export failed');
          reject(new Error(`ffmpeg failed (code ${code}): ${stderr}`));
        }
      });
    });
  }
  
  // If splits exist, create multiple segments and concatenate
  const segments = [];
  const segmentFiles = [];
  
  // Create segments based on splits
  let lastTime = startTime;
  for (const splitTime of splits) {
    if (splitTime > lastTime && splitTime <= endTime) {
      segments.push({ start: lastTime, end: splitTime });
      lastTime = splitTime;
    }
  }
  segments.push({ start: lastTime, end: endTime });
  
  try {
    mainWindow.webContents.send('burn-status', `Creating ${segments.length} segments...`);
    
    // Extract each segment
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const segmentPath = path.join(os.tmpdir(), `segment_${i}${ext}`);
      segmentFiles.push(segmentPath);
      
      const duration = segment.end - segment.start;
      const args = ['-y', '-i', videoPath, '-ss', segment.start.toString(), '-t', duration.toString()];
      
      // Add filters to each segment
      if (videoFilter) {
        args.push('-vf', videoFilter, '-c:v', 'libx264', '-preset', 'fast', '-crf', '23');
      } else {
        args.push('-c:v', 'copy');
      }
      
      if (filters.length > 0) {
        args.push('-af', filters.join(','), '-c:a', 'aac', '-b:a', '192k');
      } else {
        args.push('-c:a', 'copy');
      }
      
      args.push(segmentPath);

      await new Promise((resolve, reject) => {
        const ff = spawn(ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
        let stderr = '';
        
        ff.stderr.on('data', (data) => {
          stderr += data.toString();
        });

        ff.on('close', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`Segment ${i} failed: ${stderr}`));
          }
        });
      });
    }
    
    // Create concat file
    const concatListPath = path.join(os.tmpdir(), 'concat_list.txt');
    const concatContent = segmentFiles.map(f => `file '${f}'`).join('\n');
    fs.writeFileSync(concatListPath, concatContent, 'utf8');
    
    // Concatenate segments
    const outPath = path.join(dir, `${base}-edited${ext}`);
    const concatArgs = [
      '-y',
      '-f', 'concat',
      '-safe', '0',
      '-i', concatListPath,
      '-c', 'copy',
      outPath
    ];

    await new Promise((resolve, reject) => {
      mainWindow.webContents.send('burn-status', 'Merging segments...');
      
      const ff = spawn(ffmpegPath, concatArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
      let stderr = '';
      
      ff.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      ff.on('close', (code) => {
        if (code === 0) {
          mainWindow.webContents.send('burn-status', 'Edit complete!');
          resolve();
        } else {
          reject(new Error(`Concatenation failed: ${stderr}`));
        }
      });
    });
    
    // Cleanup temp files
    segmentFiles.forEach(f => {
      if (fs.existsSync(f)) fs.unlinkSync(f);
    });
    if (fs.existsSync(concatListPath)) fs.unlinkSync(concatListPath);
    
    return { outPath };
    
  } catch (err) {
    // Cleanup on error
    segmentFiles.forEach(f => {
      if (fs.existsSync(f)) fs.unlinkSync(f);
    });
    throw err;
  }
});
