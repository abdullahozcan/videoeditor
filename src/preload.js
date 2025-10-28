const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Video selection
  selectVideo: () => ipcRenderer.invoke('select-video'),
  
  // Subtitle generation
  generateSubtitles: (videoPath) => ipcRenderer.invoke('generate-subtitles', videoPath),
  
  // SRT operations
  saveSrt: (srtPath, srtContent) => ipcRenderer.invoke('save-srt', srtPath, srtContent),
  exportSrt: (videoPath, srtContent) => ipcRenderer.invoke('export-srt', videoPath, srtContent),
  
  // Video editing
  trimVideo: (videoPath, startTime, endTime, splits, audioVolume, aspectRatio) => 
    ipcRenderer.invoke('trim-video', videoPath, startTime, endTime, splits, audioVolume, aspectRatio),
  
  // Subtitle burn-in
  burnSubtitles: (videoPath, srtPath) => ipcRenderer.invoke('burn-subtitles', videoPath, srtPath),
  
  // Progress listeners
  onUploadProgress: (callback) => ipcRenderer.on('upload-progress', (event, progress) => callback(progress)),
  onTranscriptionStatus: (callback) => ipcRenderer.on('transcription-status', (event, status) => callback(status)),
  onBurnProgress: (callback) => ipcRenderer.on('burn-progress', (event, time) => callback(time)),
  onBurnStatus: (callback) => ipcRenderer.on('burn-status', (event, status) => callback(status))
});
