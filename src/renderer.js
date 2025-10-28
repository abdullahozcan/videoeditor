// DOM Elements
const selectBtn = document.getElementById('selectBtn');
const genBtn = document.getElementById('genBtn');
const burnBtn = document.getElementById('burnBtn');
const exportSrtBtn = document.getElementById('exportSrtBtn');
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Video editing elements
const videoEditSection = document.getElementById('videoEditSection');
const playPauseBtn = document.getElementById('playPauseBtn');
const skipBackBtn = document.getElementById('skipBackBtn');
const skipForwardBtn = document.getElementById('skipForwardBtn');
const splitBtn = document.getElementById('splitBtn');
const resetTrimBtn = document.getElementById('resetTrimBtn');
const exportTrimmedBtn = document.getElementById('exportTrimmedBtn');

const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const audioWaveform = document.getElementById('audioWaveform');
const aspectBtns = document.querySelectorAll('.aspect-btn');

const aspectOverlay = document.getElementById('aspectOverlay');
const aspectFrame = document.getElementById('aspectFrame');
const aspectLabel = document.getElementById('aspectLabel');
const timelineWaveform = document.getElementById('timelineWaveform');
const splitMarkers = document.getElementById('splitMarkers');

const timelineWrapper = document.getElementById('timelineWrapper');
const timelineSegment = document.getElementById('timelineSegment');
const handleStart = document.getElementById('handleStart');
const handleEnd = document.getElementById('handleEnd');
const playhead = document.getElementById('playhead');

const currentTimeDisplay = document.getElementById('currentTimeDisplay');
const durationDisplay = document.getElementById('durationDisplay');
const trimStartDisplay = document.getElementById('trimStartDisplay');
const trimEndDisplay = document.getElementById('trimEndDisplay');
const trimDurationDisplay = document.getElementById('trimDurationDisplay');

const subtitleStepNumber = document.getElementById('subtitleStepNumber');
const exportStepNumber = document.getElementById('exportStepNumber');

const videoPathSpan = document.getElementById('videoPath');
const fileInfo = document.getElementById('fileInfo');
const srtBox = document.getElementById('srtBox');
const preview = document.getElementById('preview');

const uploadProgress = document.getElementById('uploadProgress');
const uploadFill = document.getElementById('uploadFill');
const transcriptionStatus = document.getElementById('transcriptionStatus');

const burnProgress = document.getElementById('burnProgress');
const burnFill = document.getElementById('burnFill');
const burnStatus = document.getElementById('burnStatus');

const editControls = document.getElementById('editControls');

// State
let currentVideo = null;
let currentSrt = null;
let originalSrtContent = '';
let isEditing = false;

// Timeline state
let videoDuration = 0;
let trimStart = 0;
let trimEnd = 0;
let isDragging = false;
let dragHandle = null;
let splits = []; // Array of split points

// Audio/Video settings state
let audioVolume = 100; // Percentage (0-200)
let aspectRatio = 'original'; // 'original', '9:16', '16:9', '1:1', '4:5', '4:3'

// Audio context for waveform
let audioContext = null;
let audioBuffer = null;

// Helper functions
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 100);
  return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

function updateTimelineMarkers() {
  document.getElementById('marker0').textContent = '0:00';
  document.getElementById('marker25').textContent = formatTime(videoDuration * 0.25);
  document.getElementById('marker50').textContent = formatTime(videoDuration * 0.5);
  document.getElementById('marker75').textContent = formatTime(videoDuration * 0.75);
  document.getElementById('marker100').textContent = formatTime(videoDuration);
}

function updateTrimDisplays() {
  trimStartDisplay.textContent = formatTime(trimStart);
  trimEndDisplay.textContent = formatTime(trimEnd);
  trimDurationDisplay.textContent = formatTime(trimEnd - trimStart);
  
  const startPercent = (trimStart / videoDuration) * 100;
  const endPercent = (trimEnd / videoDuration) * 100;
  
  timelineSegment.style.left = startPercent + '%';
  timelineSegment.style.width = (endPercent - startPercent) + '%';
}

function updatePlayhead() {
  const percent = (preview.currentTime / videoDuration) * 100;
  playhead.style.left = percent + '%';
  currentTimeDisplay.textContent = formatTime(preview.currentTime);
}

// Video Selection
selectBtn.addEventListener('click', async () => {
  const path = await window.api.selectVideo();
  if (path) {
    currentVideo = path;
    videoPathSpan.textContent = path;
    fileInfo.classList.remove('hidden');
    preview.src = path;
    preview.classList.remove('hidden');
    genBtn.disabled = false;
    
    // Show video editing section
    videoEditSection.classList.remove('hidden');
    subtitleStepNumber.textContent = '3';
    exportStepNumber.textContent = '4';
    
    // Reset other states
    srtBox.value = '';
    currentSrt = null;
    burnBtn.disabled = true;
    exportSrtBtn.disabled = true;
    editControls.classList.remove('active');
    splits = [];
  }
});

// Video loaded - initialize timeline
preview.addEventListener('loadedmetadata', () => {
  videoDuration = preview.duration;
  trimStart = 0;
  trimEnd = videoDuration;
  
  durationDisplay.textContent = formatTime(videoDuration);
  updateTimelineMarkers();
  updateTrimDisplays();
  generateWaveform();
  loadAudioWaveform();
});

// Load and analyze audio for timeline waveform
async function loadAudioWaveform() {
  if (!currentVideo) return;
  
  try {
    // Create audio context if needed
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Fetch audio data
    const response = await fetch(currentVideo);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Generate waveform from audio data
    generateTimelineWaveform();
  } catch (err) {
    console.error('Failed to load audio waveform:', err);
    // Fallback to simple visualization
    generateSimpleTimelineWaveform();
  }
}

// Generate real audio waveform on timeline
function generateTimelineWaveform() {
  if (!audioBuffer) {
    generateSimpleTimelineWaveform();
    return;
  }
  
  timelineWaveform.innerHTML = '';
  timelineWaveform.style.display = 'flex'; // Ensure visible
  
  const samples = 150; // Number of waveform bars
  const rawData = audioBuffer.getChannelData(0); // Get first channel
  const blockSize = Math.floor(rawData.length / samples);
  
  for (let i = 0; i < samples; i++) {
    const bar = document.createElement('div');
    bar.className = 'waveform-sample';
    
    // Calculate RMS (root mean square) for this block
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      const index = i * blockSize + j;
      if (index < rawData.length) {
        sum += rawData[index] * rawData[index];
      }
    }
    const rms = Math.sqrt(sum / blockSize);
    const height = Math.max(2, Math.min(25, rms * 80)); // Scale to visible range
    
    bar.style.height = height + 'px';
    timelineWaveform.appendChild(bar);
  }
  
  console.log('Timeline waveform generated with', samples, 'bars');
}

// Fallback simple waveform
function generateSimpleTimelineWaveform() {
  timelineWaveform.innerHTML = '';
  timelineWaveform.style.display = 'flex'; // Ensure visible
  
  const samples = 150;
  
  for (let i = 0; i < samples; i++) {
    const bar = document.createElement('div');
    bar.className = 'waveform-sample';
    // Simulate audio pattern
    const height = 5 + Math.sin(i * 0.1) * 8 + Math.random() * 10;
    bar.style.height = height + 'px';
    timelineWaveform.appendChild(bar);
  }
  
  console.log('Simple waveform generated (fallback)');
}

// Generate simple audio waveform visualization
function generateWaveform() {
  audioWaveform.innerHTML = '';
  const bars = 50;
  const waveformWidth = audioWaveform.offsetWidth;
  const barWidth = 2;
  const gap = (waveformWidth / bars) - barWidth;
  
  for (let i = 0; i < bars; i++) {
    const bar = document.createElement('div');
    bar.className = 'waveform-bar';
    // Random height for visual effect (in real app, would use Web Audio API)
    const height = 5 + Math.random() * 30;
    bar.style.height = height + 'px';
    bar.style.left = (i * (barWidth + gap)) + 'px';
    audioWaveform.appendChild(bar);
  }
}

// Update aspect ratio overlay on video preview
function updateAspectOverlay() {
  if (aspectRatio === 'original') {
    aspectOverlay.classList.remove('active');
    aspectLabel.textContent = 'Original';
    return;
  }
  
  aspectOverlay.classList.add('active');
  
  const ratioMap = {
    '9:16': { ratio: 9/16, label: '9:16 Portrait' },
    '16:9': { ratio: 16/9, label: '16:9 Landscape' },
    '1:1': { ratio: 1, label: '1:1 Square' },
    '4:5': { ratio: 4/5, label: '4:5 Instagram' },
    '4:3': { ratio: 4/3, label: '4:3 Classic' }
  };
  
  const config = ratioMap[aspectRatio];
  if (!config) return;
  
  aspectLabel.textContent = config.label;
  
  // Get video dimensions
  const videoWidth = preview.videoWidth;
  const videoHeight = preview.videoHeight;
  const videoRatio = videoWidth / videoHeight;
  
  // Get display dimensions
  const displayWidth = preview.offsetWidth;
  const displayHeight = preview.offsetHeight;
  
  let frameWidth, frameHeight, frameLeft, frameTop;
  
  if (config.ratio > videoRatio) {
    // Target is wider - constrain by width
    frameWidth = displayWidth;
    frameHeight = displayWidth / config.ratio;
    frameLeft = 0;
    frameTop = (displayHeight - frameHeight) / 2;
  } else {
    // Target is taller - constrain by height
    frameHeight = displayHeight;
    frameWidth = displayHeight * config.ratio;
    frameTop = 0;
    frameLeft = (displayWidth - frameWidth) / 2;
  }
  
  aspectFrame.style.width = frameWidth + 'px';
  aspectFrame.style.height = frameHeight + 'px';
  aspectFrame.style.left = frameLeft + 'px';
  aspectFrame.style.top = frameTop + 'px';
}

// Update split markers on timeline
function updateSplitMarkers() {
  splitMarkers.innerHTML = '';
  
  splits.forEach((splitTime) => {
    const marker = document.createElement('div');
    marker.className = 'split-marker';
    
    const percent = (splitTime / videoDuration) * 100;
    marker.style.left = percent + '%';
    
    splitMarkers.appendChild(marker);
  });
}

// Update playhead during playback
preview.addEventListener('timeupdate', updatePlayhead);

// Playback controls
playPauseBtn.addEventListener('click', () => {
  if (preview.paused) {
    preview.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    preview.pause();
    playPauseBtn.textContent = '▶️';
  }
});

skipBackBtn.addEventListener('click', () => {
  preview.currentTime = Math.max(0, preview.currentTime - 5);
});

skipForwardBtn.addEventListener('click', () => {
  preview.currentTime = Math.min(videoDuration, preview.currentTime + 5);
});

// Timeline click to seek
timelineWrapper.addEventListener('click', (e) => {
  if (isDragging) return;
  
  const rect = timelineWrapper.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  preview.currentTime = percent * videoDuration;
});

// Drag handlers for trim handles
handleStart.addEventListener('mousedown', (e) => {
  e.stopPropagation();
  isDragging = true;
  dragHandle = 'start';
});

handleEnd.addEventListener('mousedown', (e) => {
  e.stopPropagation();
  isDragging = true;
  dragHandle = 'end';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  
  const rect = timelineWrapper.getBoundingClientRect();
  const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const time = percent * videoDuration;
  
  if (dragHandle === 'start') {
    trimStart = Math.min(time, trimEnd - 0.1);
    preview.currentTime = trimStart;
  } else if (dragHandle === 'end') {
    trimEnd = Math.max(time, trimStart + 0.1);
    preview.currentTime = trimEnd;
  }
  
  updateTrimDisplays();
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  dragHandle = null;
});

// Split video at current time
splitBtn.addEventListener('click', () => {
  const currentTime = preview.currentTime;
  if (currentTime > trimStart && currentTime < trimEnd) {
    if (!splits.includes(currentTime)) {
      splits.push(currentTime);
      splits.sort((a, b) => a - b);
      updateSplitMarkers();
      alert(`✂️ Split point added at ${formatTime(currentTime)}\n\nTotal splits: ${splits.length}`);
    }
  } else {
    alert('⚠️ Split point must be within the trimmed region');
  }
});

// Reset trim
resetTrimBtn.addEventListener('click', () => {
  trimStart = 0;
  trimEnd = videoDuration;
  splits = [];
  audioVolume = 100;
  aspectRatio = 'original';
  
  volumeSlider.value = 100;
  volumeValue.textContent = '100%';
  
  aspectBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.ratio === 'original');
  });
  
  updateTrimDisplays();
  updateSplitMarkers();
  updateAspectOverlay();
  preview.currentTime = 0;
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
  audioVolume = parseInt(e.target.value);
  volumeValue.textContent = audioVolume + '%';
  
  // Update preview volume (0-1 range)
  preview.volume = Math.min(1, audioVolume / 100);
});

// Aspect ratio selection
aspectBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    aspectRatio = btn.dataset.ratio;
    aspectBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateAspectOverlay();
  });
});

// Update overlay when video resizes
preview.addEventListener('loadeddata', () => {
  updateAspectOverlay();
});

window.addEventListener('resize', () => {
  updateAspectOverlay();
});

// Export trimmed video
exportTrimmedBtn.addEventListener('click', async () => {
  if (!currentVideo) return;
  
  const aspectInfo = aspectRatio === 'original' 
    ? 'Original size' 
    : `Resized to ${aspectRatio}`;
  
  const audioInfo = audioVolume === 100 
    ? 'Original audio' 
    : `Audio: ${audioVolume}%`;
  
  const confirm = window.confirm(
    `🎬 Export edited video?\n\n` +
    `Start: ${formatTime(trimStart)}\n` +
    `End: ${formatTime(trimEnd)}\n` +
    `Duration: ${formatTime(trimEnd - trimStart)}\n` +
    `${splits.length > 0 ? `Splits: ${splits.length}\n` : ''}` +
    `${audioInfo}\n` +
    `${aspectInfo}\n` +
    `\nThis will create a new video file. Continue?`
  );
  
  if (!confirm) return;
  
  exportTrimmedBtn.disabled = true;
  const originalText = exportTrimmedBtn.textContent;
  exportTrimmedBtn.textContent = '⏳ Exporting...';
  
  try {
    const res = await window.api.trimVideo(
      currentVideo, 
      trimStart, 
      trimEnd, 
      splits,
      audioVolume,
      aspectRatio
    );
    alert('✅ Edited video exported successfully!\n\n' + res.outPath);
  } catch (err) {
    alert('❌ Export failed: ' + err.message);
    console.error(err);
  } finally {
    exportTrimmedBtn.disabled = false;
    exportTrimmedBtn.textContent = originalText;
  }
});

// Generate Subtitles
genBtn.addEventListener('click', async () => {
  if (!currentVideo) return;
  
  genBtn.disabled = true;
  genBtn.textContent = '⏳ Generating...';
  uploadProgress.classList.add('active');
  uploadFill.style.width = '0%';
  uploadFill.textContent = '0%';
  
  try {
    const res = await window.api.generateSubtitles(currentVideo);
    currentSrt = res.srtPath;
    originalSrtContent = res.srtText;
    srtBox.value = res.srtText;
    srtBox.readOnly = true;
    
    burnBtn.disabled = false;
    exportSrtBtn.disabled = false;
    editControls.classList.add('active');
    
  } catch (err) {
    alert('❌ Error: ' + err.message);
    console.error(err);
    transcriptionStatus.textContent = 'Error: ' + err.message;
  } finally {
    genBtn.disabled = false;
    genBtn.textContent = '✨ Generate Subtitles (AI)';
  }
});

// Edit SRT
editBtn.addEventListener('click', () => {
  isEditing = true;
  srtBox.readOnly = false;
  srtBox.focus();
  editBtn.classList.add('hidden');
  saveBtn.classList.remove('hidden');
  cancelBtn.classList.remove('hidden');
  burnBtn.disabled = true;
  exportSrtBtn.disabled = true;
});

// Save SRT Changes
saveBtn.addEventListener('click', async () => {
  try {
    await window.api.saveSrt(currentSrt, srtBox.value);
    originalSrtContent = srtBox.value;
    isEditing = false;
    srtBox.readOnly = true;
    editBtn.classList.remove('hidden');
    saveBtn.classList.add('hidden');
    cancelBtn.classList.add('hidden');
    burnBtn.disabled = false;
    exportSrtBtn.disabled = false;
    
    // Show success feedback
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '✅ Saved!';
    setTimeout(() => {
      saveBtn.textContent = originalText;
    }, 2000);
  } catch (err) {
    alert('❌ Failed to save: ' + err.message);
  }
});

// Cancel Edit
cancelBtn.addEventListener('click', () => {
  srtBox.value = originalSrtContent;
  isEditing = false;
  srtBox.readOnly = true;
  editBtn.classList.remove('hidden');
  saveBtn.classList.add('hidden');
  cancelBtn.classList.add('hidden');
  burnBtn.disabled = false;
  exportSrtBtn.disabled = false;
});

// Export SRT (Soft Subtitle)
exportSrtBtn.addEventListener('click', async () => {
  if (!currentVideo || !srtBox.value) return;
  
  exportSrtBtn.disabled = true;
  const originalText = exportSrtBtn.textContent;
  exportSrtBtn.textContent = '⏳ Exporting...';
  
  try {
    const res = await window.api.exportSrt(currentVideo, srtBox.value);
    alert('✅ SRT file exported successfully!\n\n' + res.srtPath);
  } catch (err) {
    alert('❌ Export failed: ' + err.message);
    console.error(err);
  } finally {
    exportSrtBtn.disabled = false;
    exportSrtBtn.textContent = originalText;
  }
});

// Burn Subtitles
burnBtn.addEventListener('click', async () => {
  if (!currentVideo || !currentSrt) return;
  
  // Confirm action
  const confirm = window.confirm(
    '🔥 This will create a new video file with burned-in subtitles.\n\n' +
    'This process may take several minutes depending on video length.\n\n' +
    'Continue?'
  );
  
  if (!confirm) return;
  
  burnBtn.disabled = true;
  exportSrtBtn.disabled = true;
  const originalText = burnBtn.textContent;
  burnBtn.textContent = '⏳ Processing...';
  burnProgress.classList.add('active');
  burnFill.style.width = '0%';
  
  try {
    const res = await window.api.burnSubtitles(currentVideo, currentSrt);
    alert('✅ Video created successfully!\n\n' + res.outPath);
    burnFill.style.width = '100%';
    burnFill.textContent = 'Complete!';
  } catch (err) {
    alert('❌ Burn failed: ' + err.message);
    console.error(err);
  } finally {
    burnBtn.disabled = false;
    exportSrtBtn.disabled = false;
    burnBtn.textContent = originalText;
  }
});

// Progress Listeners
window.api.onUploadProgress((progress) => {
  uploadFill.style.width = progress + '%';
  uploadFill.textContent = progress + '%';
});

window.api.onTranscriptionStatus((status) => {
  transcriptionStatus.textContent = status;
});

window.api.onBurnProgress((time) => {
  // Simple progress indication based on time
  burnFill.style.width = '50%'; // Indeterminate progress
  burnFill.textContent = 'Processing...';
});

window.api.onBurnStatus((status) => {
  burnStatus.textContent = status;
});
