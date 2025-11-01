# Stitch Weather - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Electron Main Process                    │
│                      (electron/main.ts)                       │
│                                                               │
│  • Creates BrowserWindow with Mac vibrancy                   │
│  • Handles window lifecycle (create, close, minimize)        │
│  • Sets up IPC communication                                 │
│  • Manages always-on-top behavior                            │
│  • Loads Next.js app (dev: localhost, prod: static files)    │
└───────────────┬─────────────────────────────────────────────┘
                │
                │ IPC Communication
                │
┌───────────────▼─────────────────────────────────────────────┐
│                    Preload Script                            │
│                   (electron/preload.ts)                       │
│                                                               │
│  • contextBridge.exposeInMainWorld("electronAPI", {...})     │
│  • Safely exposes IPC methods to renderer                    │
│  • Provides: minimizeWindow, closeWindow, setAlwaysOnTop     │
└───────────────┬─────────────────────────────────────────────┘
                │
                │ Context Bridge
                │
┌───────────────▼─────────────────────────────────────────────┐
│                  Renderer Process (Next.js)                  │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              app/page.tsx (Main Page)                │   │
│  │                                                       │   │
│  │  • Renders WeatherPopup component                    │   │
│  │  • Centered layout                                   │   │
│  └───────────────────┬─────────────────────────────────┘   │
│                      │                                       │
│  ┌───────────────────▼─────────────────────────────────┐   │
│  │      components/weather-popup.tsx (Main Widget)      │   │
│  │                                                       │   │
│  │  • Detects Electron environment                      │   │
│  │  • Fetches weather data from OpenWeatherMap          │   │
│  │  • Renders UI with Tailwind CSS                      │   │
│  │  • Handles user interactions (click Stitch, etc.)    │   │
│  │  • Title bar: -webkit-app-region: drag               │   │
│  │  • Window controls: call window.electronAPI.xxx()    │   │
│  └───────────────────┬─────────────────────────────────┘   │
│                      │                                       │
│  ┌───────────────────▼─────────────────────────────────┐   │
│  │           UI Components (shadcn/ui)                  │   │
│  │                                                       │   │
│  │  • Button (minimize, close)                          │   │
│  │  • Icons (Cloud, Sun, Wind from Lucide)             │   │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Flow

### 1. Application Startup

```
User launches app
    ↓
Electron main.ts executes
    ↓
BrowserWindow created with:
  - frame: false (frameless)
  - transparent: true
  - vibrancy: "under-window" (Mac blur effect)
  - alwaysOnTop: true
    ↓
Preload script loads
    ↓
Renderer process starts:
  - Dev: http://localhost:3000
  - Prod: file:///.../out/index.html
    ↓
Next.js app renders
    ↓
WeatherPopup component mounts
    ↓
Fetches weather data
    ↓
Displays UI to user
```

### 2. IPC Communication Flow

```
User clicks minimize button
    ↓
weather-popup.tsx: onClick handler
    ↓
window.electronAPI.minimizeWindow()
    ↓
IPC message sent to main process
    ↓
electron/main.ts: ipcMain.on("minimize-window")
    ↓
mainWindow.minimize() executed
    ↓
Window minimizes to dock
```

## Directory Structure Explained

```
v0-stitch-weather-popup/
│
├── electron/                      # Electron-specific code
│   ├── main.ts                   # Main process (Node.js environment)
│   │                             # - Creates and manages windows
│   │                             # - Handles IPC from renderer
│   │                             # - Native OS integration
│   │
│   ├── preload.ts                # Security layer between main and renderer
│   │                             # - Exposes safe APIs to web content
│   │                             # - Uses contextBridge
│   │
│   └── types.d.ts                # TypeScript definitions for Electron APIs
│
├── app/                          # Next.js 16 app directory
│   ├── page.tsx                  # Main page (renders WeatherPopup)
│   ├── layout.tsx                # Root layout with theme provider
│   └── globals.css               # Global styles + animations
│
├── components/                   # React components
│   ├── weather-popup.tsx         # Main weather widget component
│   │                             # - Detects Electron vs Web
│   │                             # - Fetches weather data
│   │                             # - Renders UI
│   │
│   └── ui/                       # shadcn/ui components
│       └── button.tsx            # Button component
│
├── public/                       # Static assets
│   ├── stitch-transparent.jpg    # Stitch character image
│   └── stitch.jpg                # Alternative Stitch image
│
├── scripts/                      # Build/helper scripts
│   └── generate-icon.sh          # Icon generation automation
│
├── build/                        # Build resources
│   ├── ICON_README.md            # Icon creation guide
│   └── icon.icns                 # App icon (after generation)
│
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript config for Next.js
├── tsconfig.electron.json        # TypeScript config for Electron
├── next.config.mjs               # Next.js configuration (static export)
└── electron-builder.config.js    # Electron Builder configuration
```

## Build Process

### Development Build

```
npm run electron:dev
    ↓
1. npm run build:electron
   - Compiles electron/*.ts → dist-electron/*.js
    ↓
2. concurrently runs:
   - npm run dev (Next.js dev server on :3000)
   - wait-on http://localhost:3000 && electron .
    ↓
3. Electron loads http://localhost:3000
    ↓
4. Hot reload enabled for React components
```

### Production Build

```
npm run electron:build
    ↓
1. npm run build
   - Next.js builds app
   - Exports static files to out/
    ↓
2. npm run build:electron
   - Compiles electron/*.ts → dist-electron/*.js
    ↓
3. electron-builder
   - Packages out/ + dist-electron/ + package.json
   - Creates .app bundle
   - Signs (optional)
   - Creates DMG installer
   - Creates ZIP archive
    ↓
4. Output to release/
   - Stitch Weather.app
   - Stitch Weather-1.0.0.dmg
   - Stitch Weather-1.0.0-mac.zip
```

## Data Flow

### Weather Data Fetching

```
WeatherPopup mounts
    ↓
useEffect runs fetchWeather()
    ↓
fetch("https://api.openweathermap.org/data/2.5/weather?q=Chicago...")
    ↓
Response received
    ↓
Parse JSON
    ↓
Extract: temp, description, humidity, windSpeed, icon
    ↓
setWeather(data)
    ↓
Component re-renders with weather data
    ↓
Display temperature, conditions, animations
```

### User Interaction Flow

```
User clicks on Stitch character
    ↓
handleStitchClick() triggered
    ↓
setShowMessage(true)
    ↓
Speech bubble appears: "Ohana means family! 🌺"
    ↓
setTimeout(2000ms)
    ↓
setShowMessage(false)
    ↓
Speech bubble disappears
```

## Technology Stack

### Frontend (Renderer Process)

- **Next.js 16** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Component library
- **Lucide React** - Icon library

### Desktop (Main Process)

- **Electron 28** - Cross-platform desktop framework
- **electron-builder** - Packaging and distribution

### Build Tools

- **TypeScript Compiler** - Compiles .ts to .js
- **Next.js Build System** - Optimizes and exports app
- **PostCSS** - CSS processing
- **Concurrently** - Run multiple commands in parallel
- **wait-on** - Wait for resources (dev server) before starting

## Window Configuration

```javascript
// electron/main.ts
new BrowserWindow({
  width: 450, // Window width
  height: 600, // Window height
  frame: false, // Remove OS frame (custom title bar)
  transparent: true, // Transparent background
  resizable: false, // Fixed size
  alwaysOnTop: true, // Stay above other windows
  titleBarStyle: "hidden", // Hide macOS title bar
  vibrancy: "under-window", // macOS blur effect
  webPreferences: {
    preload: "...", // Inject preload script
    nodeIntegration: false, // Security: disable Node in renderer
    contextIsolation: true, // Security: isolate contexts
  },
});
```

## Security Model

```
┌─────────────────────────────────────────────────────────┐
│                    Main Process                          │
│              (Full Node.js access)                       │
│  • File system access                                    │
│  • Native APIs                                           │
│  • OS integration                                        │
└───────────────┬─────────────────────────────────────────┘
                │
                │ Context Bridge (Secure)
                │
┌───────────────▼─────────────────────────────────────────┐
│                  Preload Script                          │
│  • Limited, curated API exposure                         │
│  • Only safe methods exposed                             │
└───────────────┬─────────────────────────────────────────┘
                │
                │ Exposed APIs Only
                │
┌───────────────▼─────────────────────────────────────────┐
│                 Renderer Process                         │
│              (Sandboxed web content)                     │
│  • No direct Node.js access                              │
│  • Can only use exposed APIs                             │
│  • Runs web code (React, Next.js)                        │
└─────────────────────────────────────────────────────────┘
```

This ensures:

- Renderer can't access file system directly
- Renderer can't execute arbitrary native code
- Only explicitly exposed methods are available
- Web content stays sandboxed for security

## Build Targets

### macOS

- **x64** (Intel Macs)
- **arm64** (Apple Silicon M1/M2/M3)
- **Universal** (Both architectures in one app)

### Output Formats

- **.app** - Mac application bundle
- **.dmg** - Disk image installer
- **.zip** - Compressed archive

## Performance Optimizations

### Next.js Static Export

```javascript
// next.config.mjs
output: "export"; // Pre-renders all pages at build time
images: {
  unoptimized: true; // No server-side image optimization needed
}
```

### Electron Window

- `frame: false` - Reduces overhead from OS window chrome
- `transparent: true` - Enables custom styling
- `resizable: false` - Prevents layout recalculation

### Bundle Size

- Tree-shaking via Next.js
- Code splitting (automatic)
- Static asset optimization

---

## Quick Reference

| Component    | Purpose                    | Technology                 |
| ------------ | -------------------------- | -------------------------- |
| Main Process | Window management, OS APIs | Electron, Node.js          |
| Preload      | Secure IPC bridge          | Electron contextBridge     |
| Renderer     | UI and logic               | Next.js, React, TypeScript |
| Build System | Package app                | electron-builder           |
| Dev Server   | Hot reload                 | Next.js dev server         |

**Development**: Code in TypeScript → Compile → Run in Electron  
**Production**: Build Next.js → Compile Electron → Package → Distribute
