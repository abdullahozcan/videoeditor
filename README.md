# 🎬 Electron AI Video Editor & Subtitler

Modern Electron desktop application for AI-powered video editing, subtitle generation and burn-in using OpenAI Whisper API and ffmpeg.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Electron](https://img.shields.io/badge/electron-39.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-18%2B-green.svg)

## ✨ Features

### Video Editing
- ✂️ **Video Trimming**: Drag handles on timeline to trim start/end
- 🎯 **Interactive Timeline**: Visual timeline with playback position
- 🌊 **Audio Waveform**: Real-time audio visualization on timeline using Web Audio API
- ⏯️ **Playback Controls**: Play, pause, skip forward/backward
- 🔪 **Video Splitting**: Split video at current playback position
- 🔊 **Audio Equalizer**: Adjust volume from 0% to 200%
- 📐 **Aspect Ratio**: Convert to phone/social media formats
  - 📱 9:16 (Phone Portrait/TikTok/Reels)
  - 🖥️ 16:9 (Landscape/YouTube)
  - ⬛ 1:1 (Square/Instagram)
  - 📱 4:5 (Instagram Portrait)
  - 🖥️ 4:3 (Classic TV)
- 👁️ **Live Preview**: See aspect ratio frame overlay on video player
- 💾 **Export Edited**: Export with all adjustments applied

### AI Subtitles
- 🎥 **Video Support**: mp4, mov, mkv, webm, avi formats
- 🤖 **AI-Powered**: Uses OpenAI Whisper API for accurate transcription
- ✏️ **SRT Editing**: Preview and edit subtitles before applying
- 🔥 **Burn-in Subtitles**: Permanently embed subtitles into video
- 📄 **Soft Subtitles**: Export standalone SRT files
- 📊 **Progress Tracking**: Real-time progress for upload, transcription, and encoding

### UI/UX
- 🎨 **Modern UI**: Beautiful gradient interface with intuitive workflow
- 📱 **Responsive**: Adapts to different window sizes
- ⚡ **Real-time Feedback**: Progress bars and status updates

## 📋 Requirements

- **Node.js** 18 or higher
- **OpenAI API Key** - Get one at [platform.openai.com](https://platform.openai.com)
- **ffmpeg** - Bundled via ffmpeg-static (no installation needed)

## 🚀 Quick Start

### Installation

```bash
# Clone or download this repository
cd electron-ai-subtitler

# Install dependencies
npm install

# Set your OpenAI API key (Linux/macOS)
export OPENAI_API_KEY="sk-..."

# Or on Windows (Command Prompt)
set OPENAI_API_KEY=sk-...

# Or on Windows (PowerShell)
$env:OPENAI_API_KEY="sk-..."

# Run the application
npm start
```

### Building Distribution Packages

```bash
# Build for your current platform
npm run build

# Or build for specific platforms
npm run build:linux   # AppImage and .deb
npm run build:mac     # .dmg and .zip
npm run build:win     # NSIS installer and portable
```

Built packages will be in the `dist/` directory.

## 📖 How to Use

1. **Select Video** 
   - Click "Select Video File" button
   - Choose your video file (mp4, mov, mkv, webm, avi)
   - Preview will appear below

2. **Edit Video (Optional)**
   - Use playback controls (play, pause, skip)
   - Drag timeline handles to set start/end trim points
   - Click anywhere on timeline to seek
   - **View real audio waveform** on timeline (Web Audio API)
   - Click "Split at Current Time" to mark split points
   - **Adjust audio volume** using the slider (0-200%)
   - **Select aspect ratio** for your target platform:
     - Original (keep as-is)
     - 9:16 for TikTok/Reels (vertical phone)
     - 16:9 for YouTube/TV (horizontal)
     - 1:1 for Instagram square posts
     - 4:5 for Instagram portrait posts
     - 4:3 for classic TV format
   - **See aspect ratio preview** - Blue frame shows target crop area on video
   - Click "Export Edited Video" to save with all changes
   - Click "Reset Trim" to clear all edits

3. **Generate Subtitles**
   - Click "Generate Subtitles (AI)"
   - Watch upload progress bar
   - Wait for AI transcription (may take 1-3 minutes)
   - SRT subtitles appear in the text box

4. **Edit Subtitles (Optional)**
   - Click "Edit SRT" to modify the text
   - Make your changes
   - Click "Save Changes" or "Cancel"

5. **Export Options**
   - **Export SRT File**: Creates a separate .srt file (soft subtitle)
   - **Burn Subtitles**: Creates new video with embedded subtitles

## 🛠️ Technical Details

### Architecture

- **Main Process** (`src/main.js`): Handles IPC, file operations, OpenAI API calls, ffmpeg encoding
- **Preload Script** (`src/preload.js`): Secure API bridge using contextBridge
- **Renderer Process** (`src/renderer.js`): UI logic and event handlers
- **UI** (`src/index.html`): Modern, responsive interface

### API Usage

The app uses OpenAI's Audio Transcriptions API:
- Endpoint: `https://api.openai.com/v1/audio/transcriptions`
- Model: `whisper-1`
- Response format: `srt`

### ffmpeg Integration

Uses `ffmpeg-static` to bundle ffmpeg binary. 

**Trimming:**
```bash
ffmpeg -ss <start> -t <duration> -i input.mp4 -c copy output.mp4
```

**Audio Volume:**
```bash
ffmpeg -i input.mp4 -af "volume=1.5" -c:v copy output.mp4
```

**Aspect Ratio Conversion:**
```bash
# Scale and pad to target ratio without stretching
ffmpeg -i input.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black" output.mp4
```

**Splitting & Concatenating:**
```bash
# Extract segments
ffmpeg -ss <start> -t <duration> -i input.mp4 -c copy segment1.mp4

# Concatenate
ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.mp4
```

**Subtitles:**
```bash
ffmpeg -i input.mp4 -vf subtitles=input.srt -c:a copy output.mp4
```

## ⚙️ Configuration

### Environment Variables

- `OPENAI_API_KEY` (required): Your OpenAI API key

### Supported Video Formats

- MP4 (H.264, H.265)
- MOV (QuickTime)
- MKV (Matroska)
- WebM
- AVI

## 🔒 Privacy & Security

- Videos are uploaded to OpenAI for transcription (cloud processing)
- No data is stored on external servers beyond the API call
- SRT files are temporarily stored in your system's temp directory
- For offline processing, consider using local Whisper models (requires code modification)

## 🐛 Troubleshooting

### "OPENAI_API_KEY environment variable is not set"
Make sure you set the API key before running the app:
```bash
export OPENAI_API_KEY="sk-your-key-here"
npm start
```

### Large video files timeout
For files > 100MB, increase the timeout in `src/main.js`:
```javascript
timeout: 600000 // 10 minutes
```

### ffmpeg errors
If using system ffmpeg instead of bundled version:
1. Install ffmpeg: `sudo apt install ffmpeg` (Linux) or `brew install ffmpeg` (macOS)
2. Modify `src/main.js` to use `'ffmpeg'` instead of `ffmpegPath`

### Video format not supported
Ensure your video codec is supported by ffmpeg. Convert to H.264 MP4 if needed:
```bash
ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4
```

## 📦 Project Structure

```
electron-ai-subtitler/
├── package.json              # Dependencies and build config
├── README.md                 # This file
├── .gitignore               # Git ignore rules
├── .github/
│   └── copilot-instructions.md
└── src/
    ├── main.js              # Electron main process (IPC, ffmpeg, API)
    ├── preload.js           # Context bridge
    ├── renderer.js          # UI logic (timeline, editing, subtitles)
    └── index.html           # Application UI (video editor + subtitler)
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- [OpenAI Whisper](https://openai.com/research/whisper) - AI transcription model
- [Electron](https://www.electronjs.org/) - Cross-platform desktop framework
- [ffmpeg](https://ffmpeg.org/) - Video processing

## 🔮 Future Enhancements

- [x] Interactive timeline with drag handles
- [x] Video trimming (start/end points)
- [x] Video splitting at playback position
- [x] Audio volume control (0-200%)
- [x] Aspect ratio conversion (9:16, 16:9, 1:1, 4:5, 4:3)
- [x] Real audio waveform visualization (Web Audio API)
- [x] Aspect ratio preview overlay on video player
- [ ] Thumbnail preview on timeline hover
- [ ] Multiple language support for transcription
- [ ] Custom subtitle styling (font, size, color, position)
- [ ] Batch processing for multiple videos
- [ ] Local Whisper model integration (offline mode)
- [ ] Advanced subtitle editor with timestamp adjustment
- [ ] Auto-sync subtitle timing adjustments
- [ ] Export to other formats (VTT, ASS, SSA)
- [ ] GPU acceleration for encoding
- [ ] Transitions between video segments
- [ ] Audio fade in/out effects
- [ ] Video filters (brightness, contrast, saturation)
- [ ] Speed control (slow motion, fast forward)
- [ ] Rotation and flip options

---

Made with ❤️ using Electron and AI
