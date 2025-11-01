# Distribution Guide for Stitch Weather Desktop App

## 📦 Your Built Files

After running `pnpm run electron:build`, you'll find in the `release/` folder:

- **`Stitch Weather-1.0.0.dmg`** (140 MB) - The installer file users download
- **`Stitch Weather-1.0.0-mac.zip`** (134 MB) - Alternative zip format
- **`mac/Stitch Weather.app`** - The actual macOS application

## 🚀 Distribution Methods

### Option 1: GitHub Releases (Recommended)

**Best for:** Open source projects, easy updates, free hosting

1. **Create a new release on GitHub:**

   ```bash
   # Tag and push
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **Go to GitHub:**

   - Visit: https://github.com/YOUR_USERNAME/v0-stitch-weather-popup/releases
   - Click "Create a new release"
   - Choose tag `v1.0.0`
   - Upload `release/Stitch Weather-1.0.0.dmg`
   - Publish release

3. **Users download:**
   - Download the `.dmg` file
   - Open it and drag to Applications folder
   - Done! ✅

### Option 2: Cloud Storage (Simplest)

**Best for:** Quick sharing with friends/colleagues

1. **Upload to cloud:**

   - Google Drive, Dropbox, iCloud, OneDrive, etc.
   - Upload `release/Stitch Weather-1.0.0.dmg`
   - Get shareable link

2. **Share the link:**
   - Users download the `.dmg`
   - Open and install

### Option 3: Self-Hosted (Advanced)

**Best for:** Professional deployment with your own domain

1. **Upload to your server:**

   ```bash
   scp release/Stitch\ Weather-1.0.0.dmg user@yourserver.com:/var/www/downloads/
   ```

2. **Share download link:**
   ```
   https://yourwebsite.com/downloads/Stitch-Weather-1.0.0.dmg
   ```

### Option 4: Mac App Store (Professional)

**Best for:** Maximum reach, requires $99/year Apple Developer account

- Requires code signing with valid Developer ID
- Submit through App Store Connect
- Apple reviews and approves
- Users install from App Store

## 🔐 Code Signing (Optional but Recommended)

**Current status:** Your app is unsigned (warning shown during build)

To properly sign your app:

1. **Enroll in Apple Developer Program:** https://developer.apple.com ($99/year)
2. **Get Developer ID Certificate**
3. **Update `package.json`:**
   ```json
   {
     "build": {
       "appId": "com.yourcompany.stitchweather",
       "mac": {
         "identity": "Developer ID Application: Your Name (TEAM_ID)"
       }
     }
   }
   ```

Without signing, users will see "App from unidentified developer" warning (they can still install by right-clicking → Open).

## 📱 Installation Instructions for Users

### For macOS users:

1. **Download** `Stitch Weather-1.0.0.dmg`
2. **Open** the downloaded `.dmg` file
3. **Drag** "Stitch Weather.app" to Applications folder
4. **Launch** from Applications or Spotlight

**If you see security warning (unsigned app):**

1. Right-click the app
2. Select "Open"
3. Click "Open" in the dialog
4. App will now run normally

## 🌐 Why Not Railway/Vercel?

**Important:** This is an **Electron desktop app**, not a web app.

- **Railway/Vercel** = For web servers/APIs (Node.js, Python, etc.)
- **Electron apps** = Desktop applications that run locally on user's Mac

If you want a **web version** instead:

- Remove Electron setup
- Deploy Next.js app to Vercel/Railway
- Users access via browser (no installation)
- Loses desktop features (transparency, always-on-top, etc.)

## 📊 File Sizes

- **`.dmg` file:** 140 MB (includes Electron + Chromium)
- **Installed app:** ~290 MB
- This is normal for Electron apps

## 🔄 Auto-Updates (Advanced)

To enable automatic updates:

1. **Setup GitHub Releases as update server**
2. **Add to `electron/main.ts`:**

   ```typescript
   import { autoUpdater } from "electron-updater";

   autoUpdater.checkForUpdatesAndNotify();
   ```

3. **Publish new versions to GitHub Releases**
4. App auto-updates when new version available

## 📝 Next Steps

Choose your distribution method:

- **Quick share?** → Use Google Drive/Dropbox (Option 2)
- **Public project?** → Use GitHub Releases (Option 1)
- **Professional?** → Get code signing + Mac App Store (Option 4)

## 🎯 Current Distribution Status

Your app is ready to share! The `.dmg` file in `release/` folder is the installer.

**Quick command to create GitHub release:**

```bash
# Create and push tag
git tag v1.0.0
git push origin v1.0.0

# Then upload release/Stitch Weather-1.0.0.dmg to GitHub Releases page
```
