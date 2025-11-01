# Stitch Weather - Installation Instructions

## 📥 Installing on macOS

### Method 1: Right-Click to Open (Easiest)

1. Download `Stitch Weather-1.0.0.dmg` from the GitHub Releases page
2. Double-click the `.dmg` file to mount it
3. Drag **Stitch Weather** to your Applications folder
4. **Important**: Instead of double-clicking, **right-click** (or Control+click) on the app
5. Select **"Open"** from the menu
6. Click **"Open"** again in the security dialog
7. The app will now open and be trusted for future launches

### Method 2: Terminal Command (Advanced)

If Method 1 doesn't work, open Terminal and run:

```bash
xattr -cr "/Applications/Stitch Weather.app"
```

Then launch the app normally.

### Method 3: System Settings (Alternative)

1. Try to open the app (it will be blocked)
2. Go to **System Settings** → **Privacy & Security**
3. Scroll down to find "Stitch Weather was blocked"
4. Click **"Open Anyway"**
5. Confirm by clicking **"Open"**

## ⚠️ Why is this happening?

This app is not code-signed with an Apple Developer certificate ($99/year). macOS Gatekeeper blocks unsigned apps by default to protect users. The app is safe to use - you're just bypassing Apple's verification.

## 🔐 For Developers: Code Signing (Future)

To distribute without these warnings, you need:

- Apple Developer Program membership ($99/year)
- Code signing certificate
- App notarization through Apple

## ⚡ Quick Start After Installation

Once installed, the app will:

- Show current weather for Chicago
- Display the adorable Stitch character
- Update automatically when you open it

**Note**: If weather data fails to load, the app shows fallback data (44°F, scattered clouds) so you always see something!

---

**Enjoy your Stitch Weather app!** 🐾☀️
