# Stitch Weather v1.0.0 - Release Notes

## 🎉 First Release!

A cute desktop weather widget featuring Stitch that shows real-time Chicago weather with delightful animations.

### ✨ What's Included

- Real-time weather data for Chicago (temperature, humidity, wind speed)
- Adorable animated Stitch character
- Native macOS desktop app
- Always-on-top widget mode
- Draggable window
- Fallback weather data (44°F, scattered clouds) if API fails

### 📥 Installation Instructions

**⚠️ IMPORTANT: macOS Security Warning**

This app is **NOT code-signed** (requires $99/year Apple Developer account). macOS Gatekeeper will block it. This is normal!

#### How to Install:

1. Download `Stitch Weather-1.0.0.dmg` below
2. Open the DMG file
3. Drag **Stitch Weather** to your Applications folder
4. **Right-click** (or Control+click) on the app icon
5. Select **"Open"** from the menu
6. Click **"Open"** in the security dialog
7. Enjoy! 🐾

#### Alternative Method (Terminal):

```bash
xattr -cr "/Applications/Stitch Weather.app"
open "/Applications/Stitch Weather.app"
```

### 🔧 Technical Details

- Built with Electron + Next.js + React
- Supports macOS (Intel and Apple Silicon)
- Weather data from OpenWeatherMap API
- App size: ~142 MB

### 📝 Known Issues

- App is unsigned (causes security warning on first launch)
- Weather location is hardcoded to Chicago
- No auto-update functionality yet

### 🚀 Coming Soon

- Code signing and notarization
- Customizable city selection
- Auto-update feature
- Windows support

---

**Need help?** See [INSTALLATION.md](INSTALLATION.md) for detailed instructions.

**Developers**: See [README.md](README.md) for build instructions.
