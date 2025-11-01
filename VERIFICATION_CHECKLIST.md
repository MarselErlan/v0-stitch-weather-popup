# Electron Setup Verification Checklist ✓

Use this checklist to verify your Electron setup is complete and ready to build.

## 📋 Configuration Files

- [x] `electron/main.ts` - Main process with Mac-specific settings
- [x] `electron/preload.ts` - IPC context bridge
- [x] `electron/types.d.ts` - Type definitions
- [x] `global.d.ts` - Global type declarations
- [x] `package.json` - Scripts and dependencies configured
- [x] `tsconfig.electron.json` - Electron TypeScript config
- [x] `electron-builder.config.js` - Build configuration
- [x] `next.config.mjs` - Static export enabled

## 🎨 Components

- [x] `components/weather-popup.tsx` - Updated with Electron API support
- [x] Draggable title bar (`-webkit-app-region`)
- [x] Window controls (minimize, close buttons)
- [x] Electron detection logic

## 🛠️ Scripts & Tools

- [x] `scripts/generate-icon.sh` - Icon generation script
- [x] Icon script is executable (`chmod +x`)
- [x] `npm run generate:icon` command added

## 📚 Documentation

- [x] `README.md` - Updated with desktop app instructions
- [x] `ELECTRON_BUILD_INSTRUCTIONS.md` - Detailed build guide
- [x] `QUICKSTART.md` - Fast-track setup guide
- [x] `build/ICON_README.md` - Icon creation instructions
- [x] `ELECTRON_SETUP_SUMMARY.md` - This setup summary

## 🔧 npm Scripts

- [x] `npm run dev` - Next.js development
- [x] `npm run build` - Next.js production build
- [x] `npm run build:electron` - Compile Electron TS files
- [x] `npm run generate:icon` - Generate app icon
- [x] `npm run electron:dev` - Electron development mode
- [x] `npm run electron:start` - Start Electron app
- [x] `npm run electron:build` - Build Mac desktop app

## 📦 Dependencies

Check that these are in your `package.json`:

### Production Dependencies

- [x] All existing Next.js and React dependencies
- [x] Standard UI libraries (@radix-ui, lucide-react, etc.)

### Development Dependencies

- [x] `electron` (^28.0.0)
- [x] `electron-builder` (^24.9.1)
- [x] `concurrently` (^8.2.2)
- [x] `wait-on` (^7.2.0)
- [x] `typescript` (^5)

## 🗂️ Directory Structure

- [x] `electron/` - Main and preload scripts
- [x] `scripts/` - Helper scripts
- [x] `build/` - Build resources (for icon)
- [x] `.gitignore` - Updated to exclude build artifacts

## 🧪 Testing Steps

Run these commands to verify everything works:

### 1. Install Dependencies

```bash
npm install
```

**Expected**: All packages install without errors

### 2. Compile Electron TypeScript

```bash
npm run build:electron
```

**Expected**: Creates `dist-electron/` folder with compiled JS files

### 3. Generate Icon (Optional)

```bash
npm run generate:icon
```

**Expected**: Creates `build/icon.icns` from Stitch image

### 4. Test Development Mode

```bash
npm run electron:dev
```

**Expected**:

- Next.js dev server starts on port 3000
- Electron window opens with weather widget
- Window is transparent with vibrancy
- Window stays on top
- Can drag window by title bar
- Minimize and close buttons work

### 5. Build Production App

```bash
npm run electron:build
```

**Expected**:

- Next.js builds successfully
- Electron files compile
- Creates `release/` folder
- Generates `.app`, `.dmg`, and `.zip` files

### 6. Test Built App

```bash
open "release/mac/Stitch Weather.app"
```

**Expected**: App launches and functions identically to dev mode

## ⚠️ Common Issues to Check

### Port Already in Use

If port 3000 is already in use:

```bash
lsof -ti:3000 | xargs kill -9
```

### TypeScript Errors

Compile TypeScript manually to check for errors:

```bash
npm run build:electron
```

### Icon Missing

The app will build without an icon, but it's recommended to generate one:

```bash
npm run generate:icon
```

### "App is damaged" Error

This is normal for unsigned apps. Users can fix with:

```bash
xattr -cr "release/mac/Stitch Weather.app"
```

## ✅ Ready to Build Checklist

Before running `npm run electron:build`, verify:

- [ ] Node.js 18+ is installed
- [ ] All dependencies are installed (`npm install`)
- [ ] Icon has been generated (optional but recommended)
- [ ] Weather API key is added (optional, works with fallback)
- [ ] No TypeScript errors in Electron files
- [ ] Development mode works (`npm run electron:dev`)
- [ ] `.gitignore` properly excludes build artifacts

## 🚀 Production Deployment

When ready to distribute:

1. **Build the app**: `npm run electron:build`
2. **Test the .app**: Open from `release/mac/`
3. **Share the .dmg**: Upload `release/Stitch Weather-1.0.0.dmg`

### Optional: Code Signing & Notarization

For distribution outside your organization, consider:

- Apple Developer account ($99/year)
- Code signing certificate
- App notarization through Apple

See `ELECTRON_BUILD_INSTRUCTIONS.md` for details.

## 📝 Customization Checklist

- [ ] Add OpenWeatherMap API key in `components/weather-popup.tsx`
- [ ] Change city from Chicago to your location
- [ ] Update author name in `package.json`
- [ ] Update app version in `package.json`
- [ ] Customize app icon (optional)
- [ ] Adjust window size in `electron/main.ts` (default: 450x600)

## 🎯 Success Criteria

Your setup is complete when:

✅ Development mode launches without errors  
✅ Window has transparency and vibrancy effects  
✅ Window stays on top of other applications  
✅ Window can be dragged by the title bar  
✅ Minimize and close buttons work  
✅ Weather data loads (with or without API key)  
✅ Stitch character is visible and animated  
✅ Production build completes successfully  
✅ Built app runs from `release/mac/` folder  
✅ DMG file is created for distribution

---

## 🎉 All Done!

If all items are checked, you're ready to:

```bash
npm run electron:build
```

Your Stitch Weather desktop app will be created in the `release/` folder!

**Need Help?**

- Full instructions: `ELECTRON_BUILD_INSTRUCTIONS.md`
- Quick start: `QUICKSTART.md`
- Setup summary: `ELECTRON_SETUP_SUMMARY.md`
