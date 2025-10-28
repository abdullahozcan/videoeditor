# Electron AI Video Editor & Subtitler - Copilot Instructions

## Project Overview
Electron desktop application for AI-powered video editing, subtitle generation and burn-in using OpenAI Whisper API and ffmpeg.

## Project Type
- **Framework**: Electron
- **Language**: JavaScript (Node.js)
- **Main Dependencies**: electron, axios, form-data, ffmpeg-static

## Project Structure
```
electron-ai-subtitler/
├── package.json
├── README.md
├── .gitignore
└── src/
    ├── main.js       # Main Electron process
    ├── preload.js    # Context bridge
    ├── renderer.js   # UI logic
    └── index.html    # UI
```

## Key Features
1. Video file selection (mp4, mov, mkv, webm, avi)
2. **Interactive timeline with playback controls**
3. **Real audio waveform on timeline (Web Audio API)**
4. **Video trimming with drag handles**
5. **Video splitting at playback position**
6. **Audio volume control (0-200%)**
7. **Aspect ratio conversion (9:16, 16:9, 1:1, 4:5, 4:3)**
8. **Live aspect ratio preview overlay on video player**
9. **Export trimmed/edited video segments**
10. AI-powered subtitle generation using OpenAI Whisper API
11. SRT subtitle preview and editing
12. Subtitle burn-in using ffmpeg-static
13. Progress indicators for upload/transcription/encoding
14. Soft subtitle export option (separate .srt file)

## Environment Requirements
- Node.js 18+
- OPENAI_API_KEY environment variable
- ffmpeg-static (bundled) or system ffmpeg

## Development Commands
- `npm install` - Install dependencies
- `npm start` - Run the application
- `npm run build` - Package for distribution

## Completed Steps
- [x] Create workspace instructions
- [x] Create project structure with src/ folder
- [x] Add progress indicators (upload, transcription, burn-in)
- [x] Add SRT editing UI (edit, save, cancel functionality)
- [x] Configure electron-builder for multi-platform packaging
- [x] Install dependencies and fix security vulnerabilities
- [x] Update documentation with comprehensive README
- [x] Add interactive timeline component with playback controls
- [x] Implement video trimming with draggable handles
- [x] Add video splitting functionality
- [x] Implement ffmpeg-based trim and concatenation
- [x] Add export trimmed video feature
- [x] Add audio volume control with equalizer visualization
- [x] Add aspect ratio selector for social media formats
- [x] Implement ffmpeg audio and video filters
- [x] Add real audio waveform visualization on timeline (Web Audio API)
- [x] Add aspect ratio preview overlay on video player
