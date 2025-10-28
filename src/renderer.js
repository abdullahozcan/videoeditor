// DOM Elements
const selectBtn = document.getElementById('selectBtn');
const selectMultipleBtn = document.getElementById('selectMultipleBtn');
const batchModeToggle = document.getElementById('batchModeToggle');
const batchQueue = document.getElementById('batchQueue');
const queueList = document.getElementById('queueList');
const queueCount = document.getElementById('queueCount');
const clearQueueBtn = document.getElementById('clearQueueBtn');
const processBatchBtn = document.getElementById('processBatchBtn');

const genBtn = document.getElementById('genBtn');
const burnBtn = document.getElementById('burnBtn');
const exportSrtBtn = document.getElementById('exportSrtBtn');
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Advanced subtitle editor elements
const simpleViewBtn = document.getElementById('simpleViewBtn');
const advancedViewBtn = document.getElementById('advancedViewBtn');
const simpleView = document.getElementById('simpleView');
const advancedView = document.getElementById('advancedView');
const subtitleList = document.getElementById('subtitleList');
const subtitleCount = document.getElementById('subtitleCount');
const addSubtitleBtn = document.getElementById('addSubtitleBtn');
const shiftAllBtn = document.getElementById('shiftAllBtn');

// Auto-Sync elements
const autoSyncBtn = document.getElementById('autoSyncBtn');
const autoSyncPanel = document.getElementById('autoSyncPanel');
const syncMethod = document.getElementById('syncMethod');
const timeOffset = document.getElementById('timeOffset');
const speedFactor = document.getElementById('speedFactor');
const offsetOptions = document.getElementById('offsetOptions');
const stretchOptions = document.getElementById('stretchOptions');
const twoPointOptions = document.getElementById('twoPointOptions');
const syncPoint1Index = document.getElementById('syncPoint1Index');
const syncPoint1Time = document.getElementById('syncPoint1Time');
const syncPoint2Index = document.getElementById('syncPoint2Index');
const syncPoint2Time = document.getElementById('syncPoint2Time');
const applyAutoSyncBtn = document.getElementById('applyAutoSyncBtn');
const closeAutoSyncBtn = document.getElementById('closeAutoSyncBtn');

// AI Enhancement elements
const aiEnhanceBtn = document.getElementById('aiEnhanceBtn');
const aiPanel = document.getElementById('aiPanel');
const aiProvider = document.getElementById('aiProvider');
const aiOperation = document.getElementById('aiOperation');
const targetLanguage = document.getElementById('targetLanguage');
const translateOptions = document.getElementById('translateOptions');
const aiApiKey = document.getElementById('aiApiKey');
const processAiBtn = document.getElementById('processAiBtn');
const closeAiBtn = document.getElementById('closeAiBtn');
const aiProgress = document.getElementById('aiProgress');
const aiProgressBar = document.getElementById('aiProgressBar');
const aiStatus = document.getElementById('aiStatus');

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

// Video effects elements
const brightnessSlider = document.getElementById('brightnessSlider');
const brightnessValue = document.getElementById('brightnessValue');
const contrastSlider = document.getElementById('contrastSlider');
const contrastValue = document.getElementById('contrastValue');
const saturationSlider = document.getElementById('saturationSlider');
const saturationValue = document.getElementById('saturationValue');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

const rotate90Btn = document.getElementById('rotate90Btn');
const rotate180Btn = document.getElementById('rotate180Btn');
const rotate270Btn = document.getElementById('rotate270Btn');
const resetRotationBtn = document.getElementById('resetRotationBtn');
const flipHorizontalBtn = document.getElementById('flipHorizontalBtn');
const flipVerticalBtn = document.getElementById('flipVerticalBtn');

const fadeInDuration = document.getElementById('fadeInDuration');
const fadeOutDuration = document.getElementById('fadeOutDuration');
const transitionSettings = document.getElementById('transitionSettings');
const transitionType = document.getElementById('transitionType');
const transitionDuration = document.getElementById('transitionDuration');

const aspectOverlay = document.getElementById('aspectOverlay');
const aspectFrame = document.getElementById('aspectFrame');
const aspectLabel = document.getElementById('aspectLabel');
const timelineWaveform = document.getElementById('timelineWaveform');
const splitMarkers = document.getElementById('splitMarkers');

// Thumbnail preview elements
const timelineThumbnail = document.getElementById('timelineThumbnail');
const thumbnailCanvas = document.getElementById('thumbnailCanvas');
const thumbnailTime = document.getElementById('thumbnailTime');
const thumbnailCtx = thumbnailCanvas.getContext('2d');

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

const languageSelect = document.getElementById('languageSelect');

// Subtitle styling elements
const fontFamily = document.getElementById('fontFamily');
const fontSize = document.getElementById('fontSize');
const textColor = document.getElementById('textColor');
const textColorValue = document.getElementById('textColorValue');
const outlineColor = document.getElementById('outlineColor');
const outlineColorValue = document.getElementById('outlineColorValue');
const subtitlePosition = document.getElementById('subtitlePosition');
const fontWeight = document.getElementById('fontWeight');

const videoPathSpan = document.getElementById('videoPath');
const fileInfo = document.getElementById('fileInfo');
const srtBox = document.getElementById('srtBox');
const preview = document.getElementById('preview');
const videoContainer = document.getElementById('videoContainer');
const stickyCloseBtn = document.getElementById('stickyCloseBtn');

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

// Advanced subtitle editor state
let subtitles = []; // Array of { index, startTime, endTime, text }
let isAdvancedView = false;

// Batch mode state
let isBatchMode = false;
let videoQueue = []; // Array of { path, name, status, srtPath }
let isProcessingBatch = false;

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

// Video effects state
let videoEffects = {
  brightness: 0,      // -0.3 to 0.3
  contrast: 1.0,      // 0.5 to 2.0
  saturation: 1.0,    // 0 to 2.0
  speed: 1.0,         // 0.25 to 4.0
  rotation: 0,        // 0, 90, 180, 270
  flipH: false,       // horizontal flip
  flipV: false,       // vertical flip
  fadeIn: 0,          // seconds
  fadeOut: 0,         // seconds
  transition: 'none', // transition type
  transitionDuration: 0.5 // transition duration in seconds
};

// Subtitle styling state
let subtitleStyle = {
  fontFamily: 'Arial',
  fontSize: 24,
  textColor: '#FFFFFF',
  outlineColor: '#000000',
  position: 'bottom',
  fontWeight: 'bold'
};

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

// Subtitle helper functions
function parseSRT(srtText) {
  const subtitles = [];
  const blocks = srtText.trim().split(/\n\n+/);
  
  for (const block of blocks) {
    const lines = block.trim().split('\n');
    if (lines.length < 3) continue;
    
    const index = parseInt(lines[0]);
    const timeMatch = lines[1].match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
    
    if (!timeMatch) continue;
    
    const startTime = `${timeMatch[1]}:${timeMatch[2]}:${timeMatch[3]},${timeMatch[4]}`;
    const endTime = `${timeMatch[5]}:${timeMatch[6]}:${timeMatch[7]}:${timeMatch[8]}`;
    const text = lines.slice(2).join('\n');
    
    subtitles.push({ index, startTime, endTime, text });
  }
  
  return subtitles;
}

function srtTimeToSeconds(srtTime) {
  const match = srtTime.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
  if (!match) return 0;
  
  const hours = parseInt(match[1]);
  const mins = parseInt(match[2]);
  const secs = parseInt(match[3]);
  const ms = parseInt(match[4]);
  
  return hours * 3600 + mins * 60 + secs + ms / 1000;
}

function secondsToSrtTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
}

function subtitlesToSRT() {
  let srtText = '';
  
  subtitles.forEach((sub, idx) => {
    srtText += `${idx + 1}\n`;
    srtText += `${sub.startTime} --> ${sub.endTime}\n`;
    srtText += `${sub.text}\n\n`;
  });
  
  return srtText.trim();
}

// Batch Mode Toggle
batchModeToggle.addEventListener('change', (e) => {
  isBatchMode = e.target.checked;
  
  if (isBatchMode) {
    selectBtn.classList.add('hidden');
    selectMultipleBtn.classList.remove('hidden');
    batchQueue.classList.remove('hidden');
    fileInfo.classList.add('hidden');
    videoEditSection.classList.add('hidden');
    preview.classList.add('hidden');
  } else {
    selectBtn.classList.remove('hidden');
    selectMultipleBtn.classList.add('hidden');
    batchQueue.classList.add('hidden');
    videoQueue = [];
    updateQueueDisplay();
  }
});

// Select Multiple Videos
selectMultipleBtn.addEventListener('click', async () => {
  const paths = await window.api.selectMultipleVideos();
  if (paths && paths.length > 0) {
    paths.forEach(path => {
      if (!videoQueue.find(v => v.path === path)) {
        videoQueue.push({
          path,
          name: path.split(/[/\\]/).pop(),
          status: 'pending',
          srtPath: null
        });
      }
    });
    updateQueueDisplay();
    processBatchBtn.disabled = videoQueue.length === 0;
  }
});

// Clear Queue
clearQueueBtn.addEventListener('click', () => {
  if (confirm('Clear all videos from queue?')) {
    videoQueue = [];
    updateQueueDisplay();
    processBatchBtn.disabled = true;
  }
});

// Process Batch
processBatchBtn.addEventListener('click', async () => {
  if (isProcessingBatch) return;
  
  isProcessingBatch = true;
  processBatchBtn.disabled = true;
  clearQueueBtn.disabled = true;
  
  for (let i = 0; i < videoQueue.length; i++) {
    const video = videoQueue[i];
    if (video.status === 'completed') continue;
    
    video.status = 'processing';
    updateQueueDisplay();
    
    try {
      // Generate subtitles
      updateQueueItemStatus(i, 'Generating subtitles...');
      const selectedLanguage = languageSelect.value;
      const res = await window.api.generateSubtitles(video.path, selectedLanguage);
      video.srtPath = res.srtPath;
      
      // Burn subtitles with styling
      updateQueueItemStatus(i, 'Burning subtitles...');
      await window.api.burnSubtitles(video.path, video.srtPath, subtitleStyle);
      
      video.status = 'completed';
      updateQueueItemStatus(i, '✅ Completed');
    } catch (err) {
      video.status = 'error';
      updateQueueItemStatus(i, `❌ Error: ${err.message}`);
      console.error('Batch processing error for', video.name, err);
    }
    
    updateQueueDisplay();
  }
  
  isProcessingBatch = false;
  processBatchBtn.disabled = false;
  clearQueueBtn.disabled = false;
  
  alert('🎉 Batch processing completed!\n\nCheck the video folders for output files.');
});

// Update Queue Display
function updateQueueDisplay() {
  queueCount.textContent = videoQueue.length;
  queueList.innerHTML = '';
  
  if (videoQueue.length === 0) {
    queueList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No videos in queue</p>';
    return;
  }
  
  videoQueue.forEach((video, index) => {
    const item = document.createElement('div');
    item.className = `queue-item ${video.status}`;
    item.innerHTML = `
      <div class="queue-item-info">
        <div class="queue-item-name">📹 ${video.name}</div>
        <div class="queue-item-status" id="queue-status-${index}">${getStatusText(video.status)}</div>
        ${video.status === 'processing' ? '<div class="queue-item-progress"><div class="queue-item-progress-bar" style="width: 50%"></div></div>' : ''}
      </div>
      ${video.status === 'pending' ? `<button class="queue-item-remove" onclick="removeFromQueue(${index})">❌ Remove</button>` : ''}
    `;
    queueList.appendChild(item);
  });
}

function getStatusText(status) {
  const statusMap = {
    'pending': '⏳ Waiting...',
    'processing': '⚙️ Processing...',
    'completed': '✅ Completed',
    'error': '❌ Failed'
  };
  return statusMap[status] || status;
}

function updateQueueItemStatus(index, statusText) {
  const statusEl = document.getElementById(`queue-status-${index}`);
  if (statusEl) {
    statusEl.textContent = statusText;
  }
}

// Global function for removing queue items
window.removeFromQueue = (index) => {
  videoQueue.splice(index, 1);
  updateQueueDisplay();
  processBatchBtn.disabled = videoQueue.length === 0;
};

// Video Selection (Single Mode)
selectBtn.addEventListener('click', async () => {
  const path = await window.api.selectVideo();
  if (path) {
    currentVideo = path;
    videoPathSpan.textContent = path;
    fileInfo.classList.remove('hidden');
    preview.src = path;
    preview.classList.remove('hidden');
    genBtn.disabled = false;
    
    // Reset sticky mode
    videoContainer.classList.remove('sticky');
    stickyEnabled = false;
    
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

// Apply video filters to preview
function applyVideoFilters() {
  let filters = [];
  
  // Brightness
  if (videoEffects.brightness !== 0) {
    filters.push(`brightness(${1 + videoEffects.brightness})`);
  }
  
  // Contrast
  if (videoEffects.contrast !== 1.0) {
    filters.push(`contrast(${videoEffects.contrast})`);
  }
  
  // Saturation
  if (videoEffects.saturation !== 1.0) {
    filters.push(`saturate(${videoEffects.saturation})`);
  }
  
  // Rotation and flip using transform
  let transforms = [];
  
  if (videoEffects.rotation !== 0) {
    transforms.push(`rotate(${videoEffects.rotation}deg)`);
  }
  
  if (videoEffects.flipH) {
    transforms.push('scaleX(-1)');
  }
  
  if (videoEffects.flipV) {
    transforms.push('scaleY(-1)');
  }
  
  preview.style.filter = filters.join(' ');
  preview.style.transform = transforms.join(' ');
}

// Update rotation display
function updateRotationDisplay() {
  const rotationLabels = {
    0: '↺ Reset',
    90: '↻ 90°',
    180: '↻ 180°',
    270: '↻ 270°'
  };
  
  // Visual feedback
  applyVideoFilters();
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

// Timeline hover for thumbnail preview
timelineWrapper.addEventListener('mouseenter', () => {
  if (currentVideoPath) {
    timelineThumbnail.classList.add('active');
  }
});

timelineWrapper.addEventListener('mouseleave', () => {
  timelineThumbnail.classList.remove('active');
});

timelineWrapper.addEventListener('mousemove', (e) => {
  if (!currentVideoPath || isDragging) {
    timelineThumbnail.classList.remove('active');
    return;
  }
  
  const rect = timelineWrapper.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  const time = percent * videoDuration;
  
  // Update thumbnail position
  const thumbnailWidth = 160 + 4; // canvas width + border
  let left = e.clientX - thumbnailWidth / 2;
  const top = rect.top - 120; // Above timeline
  
  // Keep thumbnail within viewport
  const viewportWidth = window.innerWidth;
  left = Math.max(10, Math.min(left, viewportWidth - thumbnailWidth - 10));
  
  timelineThumbnail.style.left = left + 'px';
  timelineThumbnail.style.top = top + 'px';
  
  // Update time display
  thumbnailTime.textContent = formatTime(time);
  
  // Capture frame from video
  captureThumbnailFrame(time);
});

// Capture video frame for thumbnail
function captureThumbnailFrame(time) {
  // Create a temporary video element to seek without affecting main preview
  if (!window.thumbnailVideo) {
    window.thumbnailVideo = document.createElement('video');
    window.thumbnailVideo.src = preview.src;
    window.thumbnailVideo.muted = true;
  }
  
  window.thumbnailVideo.currentTime = time;
  
  window.thumbnailVideo.onseeked = () => {
    // Draw current frame to canvas
    const canvas = thumbnailCanvas;
    const ctx = thumbnailCtx;
    const video = window.thumbnailVideo;
    
    // Calculate aspect ratio
    const videoAspect = video.videoWidth / video.videoHeight;
    const canvasAspect = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (videoAspect > canvasAspect) {
      // Video is wider
      drawHeight = canvas.height;
      drawWidth = drawHeight * videoAspect;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Video is taller
      drawWidth = canvas.width;
      drawHeight = drawWidth / videoAspect;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
  };
}

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
      
      // Show transition settings when there are splits
      if (splits.length > 0) {
        transitionSettings.style.display = 'block';
      }
      
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
  
  // Reset video effects
  videoEffects = {
    brightness: 0,
    contrast: 1.0,
    saturation: 1.0,
    speed: 1.0,
    rotation: 0,
    flipH: false,
    flipV: false,
    fadeIn: 0,
    fadeOut: 0,
    transition: 'none',
    transitionDuration: 0.5
  };
  
  // Reset UI controls
  brightnessSlider.value = 0;
  brightnessValue.textContent = '0';
  contrastSlider.value = 1.0;
  contrastValue.textContent = '1.0';
  saturationSlider.value = 1.0;
  saturationValue.textContent = '1.0';
  speedSlider.value = 1.0;
  speedValue.textContent = '1.0x';
  fadeInDuration.value = 0;
  fadeOutDuration.value = 0;
  transitionType.value = 'none';
  transitionDuration.value = 0.5;
  
  flipHorizontalBtn.classList.remove('active');
  flipVerticalBtn.classList.remove('active');
  
  applyVideoFilters();
  transitionSettings.style.display = 'none';
  
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

// Video filters
brightnessSlider.addEventListener('input', (e) => {
  videoEffects.brightness = parseFloat(e.target.value);
  brightnessValue.textContent = videoEffects.brightness.toFixed(2);
  applyVideoFilters();
});

contrastSlider.addEventListener('input', (e) => {
  videoEffects.contrast = parseFloat(e.target.value);
  contrastValue.textContent = videoEffects.contrast.toFixed(1);
  applyVideoFilters();
});

saturationSlider.addEventListener('input', (e) => {
  videoEffects.saturation = parseFloat(e.target.value);
  saturationValue.textContent = videoEffects.saturation.toFixed(1);
  applyVideoFilters();
});

// Speed control
speedSlider.addEventListener('input', (e) => {
  videoEffects.speed = parseFloat(e.target.value);
  speedValue.textContent = videoEffects.speed.toFixed(2) + 'x';
});

// Rotation and flip controls
rotate90Btn.addEventListener('click', () => {
  videoEffects.rotation = (videoEffects.rotation + 90) % 360;
  updateRotationDisplay();
});

rotate180Btn.addEventListener('click', () => {
  videoEffects.rotation = (videoEffects.rotation + 180) % 360;
  updateRotationDisplay();
});

rotate270Btn.addEventListener('click', () => {
  videoEffects.rotation = (videoEffects.rotation + 270) % 360;
  updateRotationDisplay();
});

resetRotationBtn.addEventListener('click', () => {
  videoEffects.rotation = 0;
  videoEffects.flipH = false;
  videoEffects.flipV = false;
  updateRotationDisplay();
  applyVideoFilters();
});

flipHorizontalBtn.addEventListener('click', () => {
  videoEffects.flipH = !videoEffects.flipH;
  flipHorizontalBtn.classList.toggle('active');
  applyVideoFilters();
});

flipVerticalBtn.addEventListener('click', () => {
  videoEffects.flipV = !videoEffects.flipV;
  flipVerticalBtn.classList.toggle('active');
  applyVideoFilters();
});

// Audio fade controls
fadeInDuration.addEventListener('input', (e) => {
  videoEffects.fadeIn = parseFloat(e.target.value) || 0;
});

fadeOutDuration.addEventListener('input', (e) => {
  videoEffects.fadeOut = parseFloat(e.target.value) || 0;
});

// Transition controls
transitionType.addEventListener('change', (e) => {
  videoEffects.transition = e.target.value;
});

transitionDuration.addEventListener('input', (e) => {
  videoEffects.transitionDuration = parseFloat(e.target.value) || 0.5;
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

// Subtitle styling controls
textColor.addEventListener('input', (e) => {
  subtitleStyle.textColor = e.target.value.toUpperCase();
  textColorValue.textContent = subtitleStyle.textColor;
});

outlineColor.addEventListener('input', (e) => {
  subtitleStyle.outlineColor = e.target.value.toUpperCase();
  outlineColorValue.textContent = subtitleStyle.outlineColor;
});

fontFamily.addEventListener('change', (e) => {
  subtitleStyle.fontFamily = e.target.value;
});

fontSize.addEventListener('change', (e) => {
  subtitleStyle.fontSize = parseInt(e.target.value);
});

subtitlePosition.addEventListener('change', (e) => {
  subtitleStyle.position = e.target.value;
});

fontWeight.addEventListener('change', (e) => {
  subtitleStyle.fontWeight = e.target.value;
});

// Update overlay when video resizes
preview.addEventListener('loadeddata', () => {
  updateAspectOverlay();
});

window.addEventListener('resize', () => {
  updateAspectOverlay();
});

// Sticky video player functionality
let stickyEnabled = false;
let videoContainerOriginalPosition = null;

function checkStickyVideo() {
  if (!currentVideo || preview.classList.contains('hidden')) {
    return;
  }

  const rect = videoContainer.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // Video is out of view (scrolled past)
  if (rect.bottom < 0 && !stickyEnabled) {
    videoContainer.classList.add('sticky');
    stickyEnabled = true;
  } 
  // Video is back in view
  else if (rect.top > 0 && rect.bottom < windowHeight && stickyEnabled) {
    videoContainer.classList.remove('sticky');
    stickyEnabled = false;
  }
}

// Scroll event for sticky player
window.addEventListener('scroll', checkStickyVideo);

// Close sticky player button
stickyCloseBtn.addEventListener('click', () => {
  videoContainer.classList.remove('sticky');
  stickyEnabled = false;
  
  // Scroll back to video
  videoContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
  
  // Build effects info
  const effectsInfo = [];
  if (videoEffects.brightness !== 0) effectsInfo.push(`Brightness: ${videoEffects.brightness > 0 ? '+' : ''}${videoEffects.brightness.toFixed(2)}`);
  if (videoEffects.contrast !== 1.0) effectsInfo.push(`Contrast: ${videoEffects.contrast.toFixed(1)}`);
  if (videoEffects.saturation !== 1.0) effectsInfo.push(`Saturation: ${videoEffects.saturation.toFixed(1)}`);
  if (videoEffects.speed !== 1.0) effectsInfo.push(`Speed: ${videoEffects.speed.toFixed(2)}x`);
  if (videoEffects.rotation !== 0) effectsInfo.push(`Rotation: ${videoEffects.rotation}°`);
  if (videoEffects.flipH) effectsInfo.push('Flipped horizontally');
  if (videoEffects.flipV) effectsInfo.push('Flipped vertically');
  if (videoEffects.fadeIn > 0) effectsInfo.push(`Fade in: ${videoEffects.fadeIn}s`);
  if (videoEffects.fadeOut > 0) effectsInfo.push(`Fade out: ${videoEffects.fadeOut}s`);
  if (splits.length > 0 && videoEffects.transition !== 'none') effectsInfo.push(`Transition: ${videoEffects.transition}`);
  
  const confirm = window.confirm(
    `🎬 Export edited video?\n\n` +
    `Start: ${formatTime(trimStart)}\n` +
    `End: ${formatTime(trimEnd)}\n` +
    `Duration: ${formatTime(trimEnd - trimStart)}\n` +
    `${splits.length > 0 ? `Splits: ${splits.length}\n` : ''}` +
    `${audioInfo}\n` +
    `${aspectInfo}\n` +
    `${effectsInfo.length > 0 ? `\nEffects:\n${effectsInfo.join('\n')}\n` : ''}` +
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
      aspectRatio,
      videoEffects
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
  
  const selectedLanguage = languageSelect.value;
  
  genBtn.disabled = true;
  genBtn.textContent = '⏳ Generating...';
  uploadProgress.classList.add('active');
  uploadFill.style.width = '0%';
  uploadFill.textContent = '0%';
  
  try {
    const res = await window.api.generateSubtitles(currentVideo, selectedLanguage);
    currentSrt = res.srtPath;
    originalSrtContent = res.srtText;
    srtBox.value = res.srtText;
    srtBox.readOnly = true;
    
    // Parse subtitles for advanced editor
    subtitles = parseSRT(res.srtText);
    renderSubtitleList();
    
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

// Toggle between simple and advanced view
simpleViewBtn.addEventListener('click', () => {
  isAdvancedView = false;
  simpleView.classList.remove('hidden');
  advancedView.classList.add('hidden');
  simpleViewBtn.classList.add('active');
  advancedViewBtn.classList.remove('active');
});

advancedViewBtn.addEventListener('click', () => {
  isAdvancedView = true;
  simpleView.classList.add('hidden');
  advancedView.classList.remove('hidden');
  simpleViewBtn.classList.remove('active');
  advancedViewBtn.classList.add('active');
  renderSubtitleList();
});

// Render subtitle list in advanced editor
function renderSubtitleList() {
  if (subtitles.length === 0) {
    subtitleList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No subtitles yet</p>';
    subtitleCount.textContent = '0';
    return;
  }
  
  subtitleCount.textContent = subtitles.length;
  subtitleList.innerHTML = '';
  
  subtitles.forEach((sub, idx) => {
    const item = document.createElement('div');
    item.className = 'subtitle-item';
    item.dataset.index = idx;
    
    item.innerHTML = `
      <div class="subtitle-header">
        <span class="subtitle-index">#${sub.index}</span>
        <div class="subtitle-actions">
          <button class="icon-btn play" onclick="playSubtitle(${idx})" title="Play from this subtitle">▶️</button>
          <button class="icon-btn delete" onclick="deleteSubtitle(${idx})" title="Delete subtitle">🗑️</button>
        </div>
      </div>
      
      <div class="subtitle-time-controls">
        <div class="time-input-group">
          <label class="time-input-label">⏱️ Start Time</label>
          <div class="time-input-wrapper">
            <button class="time-adjust-btn" onclick="adjustTime(${idx}, 'start', -0.1)">-0.1s</button>
            <input type="text" class="time-input" value="${sub.startTime}" 
                   onchange="updateSubtitleTime(${idx}, 'start', this.value)">
            <button class="time-adjust-btn" onclick="adjustTime(${idx}, 'start', 0.1)">+0.1s</button>
          </div>
        </div>
        
        <div class="time-input-group">
          <label class="time-input-label">⏹️ End Time</label>
          <div class="time-input-wrapper">
            <button class="time-adjust-btn" onclick="adjustTime(${idx}, 'end', -0.1)">-0.1s</button>
            <input type="text" class="time-input" value="${sub.endTime}" 
                   onchange="updateSubtitleTime(${idx}, 'end', this.value)">
            <button class="time-adjust-btn" onclick="adjustTime(${idx}, 'end', 0.1)">+0.1s</button>
          </div>
        </div>
      </div>
      
      <textarea class="subtitle-text-input" 
                onchange="updateSubtitleText(${idx}, this.value)"
                placeholder="Subtitle text...">${sub.text}</textarea>
    `;
    
    subtitleList.appendChild(item);
  });
  
  // Update SRT box with current subtitles
  srtBox.value = subtitlesToSRT();
}

// Global functions for subtitle manipulation
window.playSubtitle = (index) => {
  const sub = subtitles[index];
  const seconds = srtTimeToSeconds(sub.startTime);
  preview.currentTime = seconds;
  preview.play();
};

window.deleteSubtitle = (index) => {
  if (confirm(`Delete subtitle #${subtitles[index].index}?`)) {
    subtitles.splice(index, 1);
    // Reindex
    subtitles.forEach((sub, idx) => sub.index = idx + 1);
    renderSubtitleList();
  }
};

window.adjustTime = (index, type, offset) => {
  const sub = subtitles[index];
  const currentSeconds = srtTimeToSeconds(sub[type === 'start' ? 'startTime' : 'endTime']);
  const newSeconds = Math.max(0, currentSeconds + offset);
  const newTime = secondsToSrtTime(newSeconds);
  
  if (type === 'start') {
    sub.startTime = newTime;
  } else {
    sub.endTime = newTime;
  }
  
  renderSubtitleList();
};

window.updateSubtitleTime = (index, type, value) => {
  const sub = subtitles[index];
  if (type === 'start') {
    sub.startTime = value;
  } else {
    sub.endTime = value;
  }
  renderSubtitleList();
};

window.updateSubtitleText = (index, text) => {
  subtitles[index].text = text;
  renderSubtitleList();
};

// Add new subtitle
addSubtitleBtn.addEventListener('click', () => {
  const newIndex = subtitles.length + 1;
  const lastSub = subtitles[subtitles.length - 1];
  
  let startTime, endTime;
  if (lastSub) {
    const lastEndSeconds = srtTimeToSeconds(lastSub.endTime);
    startTime = secondsToSrtTime(lastEndSeconds + 0.5);
    endTime = secondsToSrtTime(lastEndSeconds + 3.5);
  } else {
    startTime = '00:00:00,000';
    endTime = '00:00:03,000';
  }
  
  subtitles.push({
    index: newIndex,
    startTime,
    endTime,
    text: 'New subtitle text...'
  });
  
  renderSubtitleList();
  subtitleList.scrollTop = subtitleList.scrollHeight;
});

// Shift all subtitles timing
shiftAllBtn.addEventListener('click', () => {
  const offset = prompt('Enter time offset in seconds (e.g., 0.5 or -1.5):');
  if (offset === null) return;
  
  const offsetNum = parseFloat(offset);
  if (isNaN(offsetNum)) {
    alert('Invalid number');
    return;
  }
  
  subtitles.forEach(sub => {
    const startSeconds = srtTimeToSeconds(sub.startTime) + offsetNum;
    const endSeconds = srtTimeToSeconds(sub.endTime) + offsetNum;
    
    sub.startTime = secondsToSrtTime(Math.max(0, startSeconds));
    sub.endTime = secondsToSrtTime(Math.max(0, endSeconds));
  });
  
  renderSubtitleList();
  alert(`✅ All subtitles shifted by ${offset}s`);
});

// Auto-Sync Panel Toggle
autoSyncBtn.addEventListener('click', () => {
  if (subtitles.length === 0) {
    alert('⚠️ No subtitles to sync. Generate subtitles first.');
    return;
  }
  autoSyncPanel.classList.toggle('hidden');
});

closeAutoSyncBtn.addEventListener('click', () => {
  autoSyncPanel.classList.add('hidden');
});

// Show/hide sync method options
syncMethod.addEventListener('change', (e) => {
  offsetOptions.classList.add('hidden');
  stretchOptions.classList.add('hidden');
  twoPointOptions.classList.add('hidden');
  
  if (e.target.value === 'offset') {
    offsetOptions.classList.remove('hidden');
  } else if (e.target.value === 'stretch') {
    stretchOptions.classList.remove('hidden');
  } else if (e.target.value === 'twopoint') {
    twoPointOptions.classList.remove('hidden');
  }
});

// Apply Auto-Sync
applyAutoSyncBtn.addEventListener('click', () => {
  const method = syncMethod.value;
  
  try {
    if (method === 'offset') {
      const offset = parseFloat(timeOffset.value);
      if (isNaN(offset)) {
        alert('⚠️ Invalid time offset');
        return;
      }
      
      subtitles.forEach(sub => {
        const startSeconds = srtTimeToSeconds(sub.startTime) + offset;
        const endSeconds = srtTimeToSeconds(sub.endTime) + offset;
        
        sub.startTime = secondsToSrtTime(Math.max(0, startSeconds));
        sub.endTime = secondsToSrtTime(Math.max(0, endSeconds));
      });
      
      renderSubtitleList();
      alert(`✅ All subtitles shifted by ${offset}s`);
      
    } else if (method === 'stretch') {
      const factor = parseFloat(speedFactor.value);
      if (isNaN(factor) || factor <= 0) {
        alert('⚠️ Invalid speed factor (must be > 0)');
        return;
      }
      
      subtitles.forEach(sub => {
        const startSeconds = srtTimeToSeconds(sub.startTime) * factor;
        const endSeconds = srtTimeToSeconds(sub.endTime) * factor;
        
        sub.startTime = secondsToSrtTime(startSeconds);
        sub.endTime = secondsToSrtTime(endSeconds);
      });
      
      renderSubtitleList();
      alert(`✅ All subtitle timings adjusted by ${factor}x`);
      
    } else if (method === 'twopoint') {
      const point1Index = parseInt(syncPoint1Index.value) - 1;
      const point1Target = parseFloat(syncPoint1Time.value);
      const point2Index = parseInt(syncPoint2Index.value) - 1;
      const point2Target = parseFloat(syncPoint2Time.value);
      
      if (isNaN(point1Index) || isNaN(point1Target) || isNaN(point2Index) || isNaN(point2Target)) {
        alert('⚠️ Invalid sync point values');
        return;
      }
      
      if (point1Index < 0 || point1Index >= subtitles.length || point2Index < 0 || point2Index >= subtitles.length) {
        alert('⚠️ Sync point index out of range');
        return;
      }
      
      if (point1Index === point2Index) {
        alert('⚠️ Sync points must be different subtitles');
        return;
      }
      
      // Get current times of reference points
      const point1Current = srtTimeToSeconds(subtitles[point1Index].startTime);
      const point2Current = srtTimeToSeconds(subtitles[point2Index].startTime);
      
      // Calculate linear transformation: newTime = a * oldTime + b
      // point1Target = a * point1Current + b
      // point2Target = a * point2Current + b
      const a = (point2Target - point1Target) / (point2Current - point1Current);
      const b = point1Target - a * point1Current;
      
      subtitles.forEach(sub => {
        const startSeconds = srtTimeToSeconds(sub.startTime);
        const endSeconds = srtTimeToSeconds(sub.endTime);
        
        const newStart = a * startSeconds + b;
        const newEnd = a * endSeconds + b;
        
        sub.startTime = secondsToSrtTime(Math.max(0, newStart));
        sub.endTime = secondsToSrtTime(Math.max(0, newEnd));
      });
      
      renderSubtitleList();
      alert(`✅ Subtitles synced using two-point calibration`);
    }
    
    autoSyncPanel.classList.add('hidden');
    
  } catch (error) {
    console.error('Auto-sync error:', error);
    alert(`❌ Auto-sync failed: ${error.message}`);
  }
});

// AI Enhancement Panel Toggle
aiEnhanceBtn.addEventListener('click', () => {
  if (subtitles.length === 0) {
    alert('⚠️ No subtitles to enhance. Generate subtitles first.');
    return;
  }
  aiPanel.classList.toggle('hidden');
});

closeAiBtn.addEventListener('click', () => {
  aiPanel.classList.add('hidden');
});

// Show/hide translate options
aiOperation.addEventListener('change', (e) => {
  if (e.target.value === 'translate') {
    translateOptions.classList.remove('hidden');
  } else {
    translateOptions.classList.add('hidden');
  }
});

// Load saved API key
const savedApiKey = localStorage.getItem('ai_api_key');
if (savedApiKey) {
  aiApiKey.value = savedApiKey;
}

// Process with AI
processAiBtn.addEventListener('click', async () => {
  const apiKey = aiApiKey.value.trim();
  if (!apiKey) {
    alert('⚠️ Please enter your API key');
    aiApiKey.focus();
    return;
  }
  
  // Save API key
  localStorage.setItem('ai_api_key', apiKey);
  
  const provider = aiProvider.value;
  const operation = aiOperation.value;
  const targetLang = targetLanguage.value;
  
  processAiBtn.disabled = true;
  aiProgress.classList.remove('hidden');
  aiProgressBar.style.width = '0%';
  aiStatus.textContent = 'Starting AI processing...';
  
  try {
    const total = subtitles.length;
    const enhancedSubtitles = [];
    
    for (let i = 0; i < subtitles.length; i++) {
      const sub = subtitles[i];
      aiStatus.textContent = `Processing subtitle ${i + 1} of ${total}...`;
      aiProgressBar.style.width = `${((i / total) * 100)}%`;
      
      const enhancedText = await enhanceTextWithAI(
        sub.text,
        provider,
        operation,
        targetLang,
        apiKey
      );
      
      enhancedSubtitles.push({
        ...sub,
        text: enhancedText
      });
    }
    
    subtitles = enhancedSubtitles;
    renderSubtitleList();
    
    aiProgressBar.style.width = '100%';
    aiStatus.textContent = '✅ AI enhancement complete!';
    
    setTimeout(() => {
      aiPanel.classList.add('hidden');
      aiProgress.classList.add('hidden');
    }, 2000);
    
  } catch (err) {
    aiStatus.textContent = `❌ Error: ${err.message}`;
    console.error('AI Enhancement error:', err);
    alert(`❌ AI Enhancement failed: ${err.message}`);
  } finally {
    processAiBtn.disabled = false;
  }
});

// AI Enhancement Function
async function enhanceTextWithAI(text, provider, operation, targetLang, apiKey) {
  const prompts = {
    improve: `Improve the grammar, spelling, and style of this subtitle text. Keep it concise and natural. Return ONLY the improved text without explanations:\n\n"${text}"`,
    translate: `Translate this subtitle text to ${getLanguageName(targetLang)}. Keep it natural and concise for subtitles. Return ONLY the translation:\n\n"${text}"`,
    summarize: `Summarize this subtitle text to make it shorter while keeping the main meaning. Return ONLY the summarized text:\n\n"${text}"`,
    formal: `Rewrite this subtitle text in a more formal tone. Return ONLY the rewritten text:\n\n"${text}"`,
    casual: `Rewrite this subtitle text in a more casual, friendly tone. Return ONLY the rewritten text:\n\n"${text}"`,
    punctuation: `Fix the punctuation in this subtitle text. Return ONLY the corrected text:\n\n"${text}"`
  };
  
  const prompt = prompts[operation];
  
  if (provider === 'gemini') {
    return await callGeminiAPI(prompt, apiKey);
  } else if (provider === 'deepseek') {
    return await callDeepSeekAPI(prompt, apiKey);
  }
  
  throw new Error('Unknown AI provider');
}

// Gemini API Call
async function callGeminiAPI(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }]
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Gemini API error');
  }
  
  const data = await response.json();
  return data.candidates[0].content.parts[0].text.trim().replace(/^["']|["']$/g, '');
}

// DeepSeek API Call
async function callDeepSeekAPI(prompt, apiKey) {
  const url = 'https://api.deepseek.com/v1/chat/completions';
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are a subtitle editor assistant. Respond ONLY with the processed text, no explanations.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'DeepSeek API error');
  }
  
  const data = await response.json();
  return data.choices[0].message.content.trim().replace(/^["']|["']$/g, '');
}

// Helper function to get language name
function getLanguageName(code) {
  const languages = {
    en: 'English',
    tr: 'Turkish',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    ja: 'Japanese',
    ko: 'Korean',
    zh: 'Chinese',
    ar: 'Arabic',
    ru: 'Russian'
  };
  return languages[code] || code;
}

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
    // If in advanced view, convert subtitles array to SRT
    const srtContent = isAdvancedView ? subtitlesToSRT() : srtBox.value;
    
    await window.api.saveSrt(currentSrt, srtContent);
    originalSrtContent = srtContent;
    srtBox.value = srtContent;
    
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
    const res = await window.api.burnSubtitles(currentVideo, currentSrt, subtitleStyle);
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
