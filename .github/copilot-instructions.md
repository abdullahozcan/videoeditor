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
4. **Thumbnail preview on timeline hover**
5. **Video trimming with drag handles**
6. **Video splitting at playback position**
7. **Audio volume control (0-200%)**
8. **Aspect ratio conversion (9:16, 16:9, 1:1, 4:5, 4:3)**
9. **Live aspect ratio preview overlay on video player**
11. **Export trimmed/edited video segments**
12. AI-powered subtitle generation using OpenAI Whisper API (29+ languages)
13. **Advanced subtitle editor with timestamp adjustment**
14. **Auto-Sync subtitle timing** (offset, stretch/compress, two-point calibration)
15. **AI subtitle enhancement (Gemini & DeepSeek)**
    - Grammar and style improvement
    - Translation to 10+ languages
    - Summarization
    - Tone adjustment (formal/casual)
    - Punctuation correction
16. **Custom subtitle styling (font, size, color, position)**
17. SRT subtitle preview and editing
18. Subtitle burn-in using ffmpeg-static with ASS format
19. Progress indicators for upload/transcription/encoding
20. Soft subtitle export option (separate .srt file)
21. **Batch processing for multiple videos**
22. **Video filters** (brightness, contrast, saturation)
23. **Speed control** (0.25x to 4.0x)
24. **Rotation and flip** options
25. **Audio fade in/out** effects
26. **Transitions between segments** (fade, wipe, slide)
27. **Sticky video player** - Auto-sticks to bottom-right when scrolled out of view

## Environment Requirements
- Node.js 18+
- OPENAI_API_KEY environment variable (for Whisper transcription)
- GEMINI_API_KEY (optional, for AI subtitle enhancement)
- DEEPSEEK_API_KEY (optional, for AI subtitle enhancement)
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
- [x] Add video filters (brightness, contrast, saturation)
- [x] Add speed control (0.25x to 4.0x)
- [x] Add rotation and flip options
- [x] Add audio fade in/out effects
- [x] Add transitions between segments (fade, wipe, slide)
- [x] Add sticky video player (auto-sticks when scrolled out of view)
