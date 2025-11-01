# Command Reference - Stitch Weather Desktop App

Quick reference for all available npm commands.

## 🚀 Quick Start Commands

```bash
# Complete setup and test
npm install && npm run generate:icon && npm run electron:dev

# Build production app
npm run electron:build
```

---

## 📋 All Available Commands

### 🌐 Web Development (Next.js)

#### `npm run dev`
Start Next.js development server on http://localhost:3000
- Hot reload enabled
- Web version of the app
- Good for testing UI changes

#### `npm run build`
Build Next.js for production
- Creates optimized production build
- Outputs to `out/` directory (static export)
- Required before `electron:build`

#### `npm start`
Start Next.js production server
- Runs the production build
- Not typically used with Electron

---

### 🖥️ Desktop App (Electron)

#### `npm run electron:dev` ⭐ Most Used
Start Electron app in development mode
```bash
npm run electron:dev
```
**What it does:**
1. Compiles Electron TypeScript files
2. Starts Next.js dev server (port 3000)
3. Launches Electron window
4. Enables hot reload for React components

**Use for:** Testing the desktop app during development

---

#### `npm run electron:build` ⭐ For Distribution
Build production Mac desktop app
```bash
npm run electron:build
```
**What it does:**
1. Builds Next.js (static export)
2. Compiles Electron TypeScript
3. Packages everything with electron-builder
4. Creates .app, .dmg, and .zip files

**Output:** `release/` folder with:
- `Stitch Weather.app`
- `Stitch Weather-1.0.0.dmg`
- `Stitch Weather-1.0.0-mac.zip`

**Use for:** Creating distributable app

---

#### `npm run electron:start`
Start compiled Electron app
```bash
npm run electron:start
```
**What it does:**
1. Compiles Electron TypeScript
2. Runs Electron with compiled files
3. No Next.js dev server (faster startup)

**Use for:** Quick testing of Electron changes

---

#### `npm run build:electron`
Compile Electron TypeScript files only
```bash
npm run build:electron
```
**What it does:**
- Compiles `electron/*.ts` → `dist-electron/*.js`
- Uses `tsconfig.electron.json`

**Output:** `dist-electron/` folder

**Use for:** 
- Checking for TypeScript errors
- Manual compilation before running

---

#### `npm run generate:icon` ⭐ Recommended Before Build
Generate app icon from Stitch image
```bash
npm run generate:icon
```
**What it does:**
1. Makes the script executable
2. Runs `scripts/generate-icon.sh`
3. Converts `public/stitch.jpg` to PNG
4. Creates all icon sizes (16x16 to 1024x1024)
5. Generates `build/icon.icns`
6. Cleans up temporary files

**Use for:** Creating professional app icon before building

---

### 🧰 Utility Commands

#### `npm install`
Install all dependencies
```bash
npm install
```
**Use for:** First-time setup or after pulling changes

#### `npm run lint`
Run ESLint
```bash
npm run lint
```
**Use for:** Checking code quality

---

## 🎯 Common Workflows

### First Time Setup
```bash
# 1. Install dependencies
npm install

# 2. Generate icon
npm run generate:icon

# 3. Test the app
npm run electron:dev
```

---

### Development Workflow
```bash
# Start development mode
npm run electron:dev

# Make changes to React components
# Hot reload will update the app automatically

# To restart Electron (if you change electron/main.ts):
# Ctrl+C to stop, then run npm run electron:dev again
```

---

### Building for Production
```bash
# 1. Generate icon (if not already done)
npm run generate:icon

# 2. Build the app
npm run electron:build

# 3. Test the built app
open "release/mac/Stitch Weather.app"

# 4. Distribute the DMG
# Share release/Stitch Weather-1.0.0.dmg
```

---

### Troubleshooting Workflow
```bash
# Clear everything and rebuild
rm -rf .next out dist-electron release node_modules
npm install
npm run generate:icon
npm run electron:build

# Check for TypeScript errors
npm run build:electron

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## 📊 Command Comparison

| Command | When to Use | Output | Time |
|---------|-------------|--------|------|
| `electron:dev` | Development & testing | Electron window | ~10s |
| `electron:build` | Creating distributable | .app + .dmg files | ~60s |
| `electron:start` | Quick Electron test | Electron window | ~5s |
| `build:electron` | Check TS errors | Compiled JS files | ~3s |
| `generate:icon` | Before first build | icon.icns | ~5s |
| `dev` | Web development | Web server | ~5s |
| `build` | Production Next.js | Static files | ~30s |

---

## 🎨 Command Chaining

### Quick Test Chain
```bash
npm install && npm run electron:dev
```

### Full Setup Chain
```bash
npm install && npm run generate:icon && npm run electron:dev
```

### Build and Open Chain
```bash
npm run electron:build && open "release/mac/Stitch Weather.app"
```

### Clean Build Chain
```bash
rm -rf .next out dist-electron release && npm run electron:build
```

---

## 🔧 Advanced Usage

### Run with Debugging
```bash
# Electron with debug output
DEBUG=electron* npm run electron:dev

# Next.js with debug output
DEBUG=* npm run dev
```

### Custom Electron Flags
```bash
# Run with specific flags
electron . --enable-logging --trace-warnings
```

### Check Build Output
```bash
# See what's in the release
ls -lh release/

# See compiled Electron files
ls -lh dist-electron/

# See Next.js output
ls -lh out/
```

---

## 📝 Script Details

### What Each Script Actually Runs

```json
{
  "dev": "next dev",
  "build": "next build",
  "build:electron": "tsc -p tsconfig.electron.json",
  "electron:dev": "npm run build:electron && concurrently \"npm run dev\" \"wait-on http://localhost:3000 && electron .\"",
  "electron:start": "npm run build:electron && electron .",
  "electron:build": "npm run build && npm run build:electron && electron-builder",
  "generate:icon": "chmod +x scripts/generate-icon.sh && ./scripts/generate-icon.sh"
}
```

---

## 🆘 Common Issues

### "Port 3000 already in use"
```bash
lsof -ti:3000 | xargs kill -9
npm run electron:dev
```

### "electron: command not found"
```bash
npm install
# Electron should be in node_modules/.bin/
```

### "Permission denied: generate-icon.sh"
```bash
chmod +x scripts/generate-icon.sh
npm run generate:icon
```

### "Cannot find module 'electron'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails with "icon not found"
```bash
# Either generate the icon:
npm run generate:icon

# Or comment out icon in electron-builder.config.js:
# icon: "build/icon.icns",  // Comment this
```

---

## ⭐ Recommended Commands

For most users, you'll primarily use:

1. **`npm run electron:dev`** - Daily development
2. **`npm run electron:build`** - When ready to distribute
3. **`npm run generate:icon`** - Once before first build

That's it! These three commands cover 99% of use cases.

---

## 📚 More Help

- Quick setup: `QUICKSTART.md`
- Build guide: `ELECTRON_BUILD_INSTRUCTIONS.md`
- Architecture: `ARCHITECTURE.md`
- Testing: `VERIFICATION_CHECKLIST.md`

**Ready to build? Run:** `npm run electron:dev`

