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
- 🖼️ **Thumbnail Preview**: Hover over timeline to see video frame preview
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
- 🎨 **Video Filters**: Adjust visual appearance
  - ☀️ Brightness (-0.3 to +0.3)
  - ◐ Contrast (0.5x to 2.0x)
  - 🌈 Saturation (0 to 2.0x)
- ⚡ **Speed Control**: Adjust playback speed (0.25x to 4.0x)
- 🔄 **Rotation & Flip**: Rotate (90°, 180°, 270°) or flip (horizontal/vertical)
- 🎵 **Audio Fade Effects**: Fade in/out at start/end of video
- ✨ **Transitions**: Smooth transitions between split segments
  - Fade, Fade to Black/White
  - Wipe (Left/Right/Up/Down)
  - Slide (Left/Right)
- 💾 **Export Edited**: Export with all adjustments applied

### AI Subtitles
- 🎥 **Video Support**: mp4, mov, mkv, webm, avi formats
- 🤖 **AI-Powered**: Uses OpenAI Whisper API for accurate transcription
- 🌍 **Multi-Language**: Support for 29+ languages including auto-detection
  - English, Turkish, Spanish, French, German, Italian, Portuguese
  - Russian, Japanese, Korean, Chinese, Arabic, Hindi
  - Dutch, Polish, Swedish, Danish, Norwegian, Finnish
  - Czech, Ukrainian, Romanian, Greek, Hungarian
  - Indonesian, Vietnamese, Thai, Malay, and more
- ✏️ **SRT Editing**: Preview and edit subtitles before applying
- 🎨 **Custom Styling**: Full control over subtitle appearance
  - 🔤 Font family (Arial, Helvetica, Times New Roman, etc.)
  - 📏 Font size (16pt to 40pt)
  - 🎨 Text color (any hex color with color picker)
  - 🖼️ Outline color for better readability
  - 📍 Position (top, middle, bottom)
  - 💪 Font weight (normal or bold)
- ⚙️ **Advanced Subtitle Editor**: Precision subtitle editing
  - 📝 Individual subtitle block editing
  - ⏱️ Timestamp adjustment with +/- buttons
  - 🎯 Jump to subtitle position in video
  - ➕ Add/delete subtitle entries
  - ⏰ Shift all subtitles timing at once
  - 🔢 Visual index and duration display
- 🔄 **Auto-Sync Timing**: Fix subtitle timing misalignments
  - ⏱️ Simple Offset: Shift all subtitles by fixed seconds
  - 📏 Stretch/Compress: Apply speed factor (0.5x-2.0x) to all timings
  - 🎯 Two-Point Sync: Calibrate using two reference points for precise linear adjustment
- 🤖 **AI-Powered Enhancement**: Improve subtitles with Gemini & DeepSeek
  - ✨ Grammar and style improvement
  - 🌍 Translation to 10+ languages
  - 📝 Automatic summarization
  - 👔 Formal/casual tone adjustment
  - 📌 Punctuation correction
  - � Secure local API key storage
- �🔥 **Burn-in Subtitles**: Permanently embed subtitles with custom styling using ASS format
- 📄 **Soft Subtitles**: Export standalone SRT files
- 📊 **Progress Tracking**: Real-time progress for upload, transcription, and encoding

### UI/UX
- 🎨 **Modern UI**: Beautiful gradient interface with intuitive workflow
- 📱 **Responsive**: Adapts to different window sizes
- ⚡ **Real-time Feedback**: Progress bars and status updates
- 📚 **Batch Mode**: Process multiple videos automatically with same settings
- 📌 **Sticky Video Player**: Video player automatically becomes sticky in bottom-right corner when scrolled out of view

## 📋 Requirements

- **Node.js** 18 or higher
- **OpenAI API Key** - Get one at [platform.openai.com](https://platform.openai.com) (for Whisper transcription)
- **Gemini API Key** (Optional) - Get one at [ai.google.dev](https://ai.google.dev) (for AI subtitle enhancement)
- **DeepSeek API Key** (Optional) - Get one at [platform.deepseek.com](https://platform.deepseek.com) (for AI subtitle enhancement)
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

### Building for Distribution

```bash
# Build for all Linux formats (AppImage, deb, rpm)
npm run build:linux

# Build for Fedora/RHEL (AppImage - recommended)
npm run build:linux -- --linux AppImage

# Build for Windows
npm run build:win

# Build for macOS
npm run build:mac
```

**Notes**: 
- On Fedora, AppImage is the recommended format as it works universally across all Linux distributions without dependency issues
- Auto-update is disabled - this is a standalone portable application
- AppImage files are self-contained and require no installation

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

### Single Video Mode (Default)

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
   - **Apply video filters**:
     - Brightness: Adjust from -0.3 to +0.3
     - Contrast: Adjust from 0.5x to 2.0x
     - Saturation: Adjust from 0 to 2.0x
   - **Control playback speed**: 0.25x (slow) to 4.0x (fast)
   - **Rotate or flip**: Rotate by 90°, 180°, 270° or flip horizontally/vertically
   - **Audio fade effects**: Set fade in/out duration (0-10 seconds)
   - **Transitions** (for split videos): Choose transition type and duration
   - Click "Export Edited Video" to save with all changes
   - Click "Reset Trim" to clear all edits

3. **Generate Subtitles**
   - **Select language** from the dropdown (or use auto-detect)
   - Click "Generate Subtitles (AI)"
   - Watch upload progress bar
   - Wait for AI transcription (may take 1-3 minutes)
   - SRT subtitles appear in the text box

4. **Edit Subtitles (Optional)**
   - **Simple View**: Click "Edit SRT" to modify text directly
   - **Advanced Editor**: Switch to "⚙️ Advanced Editor" for:
     - Individual subtitle editing
     - Timestamp fine-tuning (+/- 0.1s buttons)
     - Add new subtitles with ➕ button
     - Delete unwanted subtitles
     - Shift all subtitle timing with "⏰ Shift All Timing"
     - Click ▶️ to jump to subtitle in video
     - **🔄 Auto-Sync Timing**: Click "🔄 Auto-Sync" to fix timing issues:
       - **Simple Offset**: Shift all subtitles by +/- seconds (e.g., if all subtitles are 2s late)
       - **Stretch/Compress**: Apply speed factor 0.5x-2.0x (e.g., if video was sped up/slowed down)
       - **Two-Point Sync**: Define two reference points for precise calibration
         - Example: Subtitle #5 should start at 10.5s, subtitle #20 should start at 45.0s
         - Algorithm calculates linear transformation for all subtitles
     - **✨ AI Enhancement**: Click "✨ AI Enhance" for:
       - Choose provider (Gemini or DeepSeek)
       - Improve grammar & style
       - Translate to other languages
       - Summarize for shorter text
       - Adjust tone (formal/casual)
       - Fix punctuation
       - Enter your API key (stored locally)
   - Save changes with "💾 Save Changes" or cancel

5. **Customize Subtitle Style (Optional)**
   - Select font family, size, and weight
   - Choose text color and outline color using color pickers
   - Set subtitle position (top, middle, or bottom)
   - Preview your style choices before burning

6. **Export Options**
   - **Export SRT File**: Creates a separate .srt file (soft subtitle)
   - **Burn Subtitles**: Creates new video with embedded subtitles

### Batch Mode (Multiple Videos)

1. **Enable Batch Mode**
   - Check "📚 Batch Mode (Process Multiple Videos)" checkbox
   - Interface switches to batch processing mode

2. **Add Videos to Queue**
   - Click "📂 Select Multiple Videos"
   - Select multiple video files at once
   - All videos appear in the queue list

3. **Configure Settings**
   - Select transcription language (applies to all videos)
   - Customize subtitle styling (applies to all videos)

4. **Process Queue**
   - Click "⚡ Process All Videos" button
   - Application automatically:
     - Generates subtitles for each video
     - Burns subtitles with your custom styling
     - Shows progress for each file
   - Output videos saved in same folder as originals

5. **Queue Management**
   - Remove individual videos with ❌ button
   - Clear entire queue with "🗑️ Clear Queue"
   - Track status: ⏳ Waiting, ⚙️ Processing, ✅ Completed, ❌ Failed

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
# SRT format (basic, no styling)
ffmpeg -i input.mp4 -vf subtitles=input.srt -c:a copy output.mp4

# ASS format (with custom styling)
ffmpeg -i input.mp4 -vf ass=input.ass -c:a copy output.mp4
```

The app automatically converts SRT to ASS format when custom styling is applied, supporting:
- Font family, size, and weight
- Text color and outline color (hex to ASS color conversion)
- Subtitle positioning (alignment codes: 2=bottom, 5=middle, 8=top)

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

### AI Enhancement not working
**For Gemini:**
- Get API key from [Google AI Studio](https://ai.google.dev)
- Make sure to enable Gemini API in your Google Cloud project
- Check browser console for CORS errors

**For DeepSeek:**
- Get API key from [DeepSeek Platform](https://platform.deepseek.com)
- Ensure your API key has proper permissions
- Check rate limits if getting 429 errors

**General:**
- API keys are stored in browser localStorage (not in environment variables)
- Make sure you have internet connection for AI features
- Check browser console (F12) for detailed error messages

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
- [x] Thumbnail preview on timeline hover
- [x] Multiple language support for transcription (29+ languages)
- [x] Custom subtitle styling (font, size, color, position)
- [x] Batch processing for multiple videos
- [x] Advanced subtitle editor with timestamp adjustment
- [x] AI subtitle enhancement with Gemini & DeepSeek (translate, improve, summarize)
- [x] Auto-sync subtitle timing adjustments
- [x] Transitions between video segments (fade, wipe, slide)
- [x] Audio fade in/out effects
- [x] Video filters (brightness, contrast, saturation)
- [x] Speed control (0.25x to 4.0x)
- [x] Rotation and flip options
- [ ] Local Whisper model integration (offline mode)
- [ ] Export to other subtitle formats (VTT, ASS, SSA)
- [ ] GPU acceleration for encoding


---

Made with ❤️ using Electron and AI
