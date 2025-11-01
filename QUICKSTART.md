# Stitch Weather - Quick Start Guide 🌺

Get your Stitch Weather desktop app up and running in 5 minutes!

## Prerequisites

- **macOS** (for desktop app)
- **Node.js 18+** ([Download](https://nodejs.org))
- **npm or pnpm** (comes with Node.js)

## One-Command Setup

```bash
# Clone or navigate to your project directory
cd v0-stitch-weather-popup

# Install all dependencies
npm install

# Generate the app icon
npm run generate:icon

# Test the app in development mode
npm run electron:dev
```

That's it! Your Stitch Weather widget should appear on your screen.

## Build for Distribution

When you're ready to create the final Mac app:

```bash
npm run electron:build
```

Your app will be created in the `release/` folder:

- `Stitch Weather.app` - The Mac application
- `Stitch Weather-1.0.0.dmg` - Installer for sharing

## Customization

### Add Your Weather API Key

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Open `components/weather-popup.tsx`
3. Find line 34 and replace `YOUR_API_KEY`:

```typescript
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=YOUR_ACTUAL_KEY_HERE`
);
```

### Change the City

In the same file, replace `Chicago` with your city:

```typescript
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=YourCity&units=imperial&appid=YOUR_API_KEY`
);
```

## Common Issues

### "App is damaged" Error

Run this command:

```bash
xattr -cr "release/mac/Stitch Weather.app"
```

### Development Mode Not Starting

Make sure port 3000 is available:

```bash
lsof -ti:3000 | xargs kill -9  # Kill any process using port 3000
npm run electron:dev
```

### Build Fails

Clear caches and rebuild:

```bash
rm -rf .next out dist-electron release node_modules
npm install
npm run electron:build
```

## What's Next?

- Read the full [Electron Build Instructions](ELECTRON_BUILD_INSTRUCTIONS.md)
- Customize the icon: See `build/ICON_README.md`
- Deploy the web version: Check the main [README.md](README.md)

## Features You'll Love

✨ **Always on Top** - Weather widget stays visible while you work  
🎨 **Transparent Design** - Beautiful Mac vibrancy effects  
🖱️ **Draggable** - Position it anywhere on your screen  
💙 **Animated Stitch** - Click on Stitch for a surprise!  
🌤️ **Real-time Weather** - Live updates from OpenWeatherMap

Enjoy your Stitch Weather app! Ohana means family! 🌺
