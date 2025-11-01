# Building Stitch Weather Desktop App for Mac

This guide will help you build the Stitch Weather app as a native Mac desktop application.

## Prerequisites

1. **Node.js** (v18 or higher)
   \`\`\`bash
   node --version
   \`\`\`

2. **npm or pnpm** package manager
   \`\`\`bash
   npm --version
   # or
   pnpm --version
   \`\`\`

## Installation Steps

### 1. Install Dependencies

\`\`\`bash

# Using npm

npm install

# Or using pnpm

pnpm install
\`\`\`

### 2. Generate App Icon (Recommended)

Before building, generate the app icon from the Stitch image:

\`\`\`bash

# Using npm

npm run generate:icon

# Or using pnpm

pnpm generate:icon
\`\`\`

This creates `build/icon.icns` from the Stitch image. See `build/ICON_README.md` for alternative methods.

> **Note:** If you skip this step, the app will build with Electron's default icon.

### 3. Development Mode (Test Before Building)

Run the app in development mode to test it:

\`\`\`bash

# Using npm

npm run electron:dev

# Or using pnpm

pnpm electron:dev
\`\`\`

This will:

- Compile the Electron TypeScript files
- Start the Next.js development server
- Launch the Electron app
- Enable hot-reload for development

### 4. Build the Mac App

To create a distributable Mac application:

\`\`\`bash

# Using npm

npm run electron:build

# Or using pnpm

pnpm electron:build
\`\`\`

This will:

- Build the Next.js app for production (with static export)
- Compile Electron TypeScript files
- Package everything into a Mac .app file
- Create a DMG installer

### 5. Find Your Built App

After building, you'll find your app in the `release` folder:

\`\`\`
release/
├── Stitch Weather-1.0.0.dmg # Installer for distribution
├── Stitch Weather-1.0.0-mac.zip # Zipped app
└── mac/
└── Stitch Weather.app # The actual Mac application
\`\`\`

## Running the Built App

### Option 1: Run from the release folder

Double-click `Stitch Weather.app` in the `release/mac/` folder

### Option 2: Install via DMG

Double-click the `.dmg` file and drag the app to your Applications folder

## Customization

### Add Your Weather API Key

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `components/weather-popup.tsx`
3. Replace `YOUR_API_KEY` with your actual API key:
   \`\`\`typescript
   const response = await fetch(
   `https://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=YOUR_ACTUAL_KEY_HERE`,
   )
   \`\`\`

### Change the App Icon

The easiest way is to use the built-in script:
\`\`\`bash
npm run generate:icon
\`\`\`

For custom icons, see detailed instructions in `build/ICON_README.md`.

### Change the City

Edit `components/weather-popup.tsx` and change `Chicago` to your desired city:
\`\`\`typescript
const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=YourCity&units=imperial&appid=YOUR_API_KEY`,
)
\`\`\`

## Troubleshooting

### "App is damaged and can't be opened" error

This happens because the app isn't signed. To fix:
\`\`\`bash
xattr -cr "release/mac/Stitch Weather.app"
\`\`\`

### Electron not found

\`\`\`bash
npm install electron --save-dev
\`\`\`

### Build fails

1. Clear cache and rebuild:
   \`\`\`bash
   rm -rf .next out dist-electron release
   npm run electron:build
   \`\`\`

## Features

- **Always on Top**: The weather widget stays on top of other windows
- **Transparent Background**: Native Mac transparency with vibrancy effect
- **Draggable**: Drag the window from the title bar
- **Animated Stitch**: Interactive character with animations
- **Real-time Weather**: Live Chicago weather data
- **Native Controls**: Mac-style minimize and close buttons

## Distribution

To distribute your app to others:

1. **DMG File**: Share the `.dmg` file from the `release` folder
2. **Code Signing** (Optional but recommended):
   - Get an Apple Developer account
   - Sign the app with your certificate
   - Notarize the app for Gatekeeper

## Next Steps

- Add auto-update functionality with `electron-updater`
- Add system tray icon for quick access
- Add settings panel to change city
- Add multiple city support
- Add weather alerts and notifications

Enjoy your Stitch Weather desktop app! 🌺
\`\`\`

```typescript file="" isHidden

```
