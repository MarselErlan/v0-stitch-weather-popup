# Stitch Weather Desktop App

A cute desktop weather widget featuring Stitch that shows real-time Chicago weather with delightful animations.

_Automatically synced with your [v0.app](https://v0.app) deployments_

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/ethanabduraimov-7965s-projects/v0-stitch-weather-popup)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/lscK7e4SDa9)

## Features

- 🌤️ Real-time weather data for Chicago
- 🎨 Beautiful animated Stitch character
- 🪟 Native Mac desktop app with transparency
- 🎯 Always-on-top widget mode
- 🖱️ Draggable window
- 💫 Smooth animations and transitions
- 🌡️ Temperature, humidity, and wind speed display

## 📥 Installation (For Users)

**Want to just use the app?** Download the latest `.dmg` file from the [Releases page](../../releases).

⚠️ **Important**: macOS will block the app because it's not code-signed. Follow these steps:

### Easy Installation Steps:

1. Download `Stitch Weather-1.0.0.dmg`
2. Open the DMG and drag the app to Applications
3. **Right-click** (or Control+click) on "Stitch Weather"
4. Select **"Open"** from the menu
5. Click **"Open"** again in the security dialog
6. The app is now trusted! 🎉

**Alternative**: Run this command in Terminal:

```bash
xattr -cr "/Applications/Stitch Weather.app"
```

📖 **Full installation guide**: See [INSTALLATION.md](INSTALLATION.md) for detailed instructions and troubleshooting.

## Quick Start (For Developers)

### For Development (Web Version)

\`\`\`bash

# Install dependencies

npm install

# Run development server

npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the web version.

### For Desktop App (Mac)

See [ELECTRON_BUILD_INSTRUCTIONS.md](ELECTRON_BUILD_INSTRUCTIONS.md) for detailed instructions on building the native Mac desktop application.

**Quick build:**

\`\`\`bash

# Install dependencies

npm install

# Generate app icon (optional but recommended)

npm run generate:icon

# Test in development mode

npm run electron:dev

# Build Mac app

npm run electron:build
\`\`\`

Your app will be in the `release/` folder as `Stitch Weather.app` and `Stitch Weather-1.0.0.dmg`.

## Project Structure

\`\`\`
├── app/ # Next.js app directory
│ ├── page.tsx # Main page
│ ├── layout.tsx # Root layout
│ └── globals.css # Global styles with animations
├── components/ # React components
│ ├── weather-popup.tsx # Main weather widget
│ └── ui/ # UI components (shadcn)
├── electron/ # Electron main process
│ ├── main.ts # Electron entry point
│ ├── preload.ts # Preload script for IPC
│ └── types.d.ts # Electron type definitions
├── public/ # Static assets
│ └── stitch-transparent.jpg # Stitch character image
└── ELECTRON_BUILD_INSTRUCTIONS.md # Build guide
\`\`\`

## Configuration

### Weather API

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `components/weather-popup.tsx`
3. Replace `YOUR_API_KEY` with your actual key

### Change City

Edit the city in `components/weather-popup.tsx`:

\`\`\`typescript
const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=YourCity&units=imperial&appid=YOUR_API_KEY`
)
\`\`\`

## Technologies

- **Next.js 16** - React framework
- **React 19** - UI library
- **Electron 28** - Desktop app framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Scripts

### Web Development

- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js for production
- `npm start` - Start production server

### Desktop App

- `npm run generate:icon` - Generate Mac app icon from Stitch image
- `npm run electron:dev` - Run Electron app in development mode
- `npm run electron:build` - Build Mac desktop app (.app and .dmg)
- `npm run electron:start` - Start built Electron app
- `npm run build:electron` - Compile Electron TypeScript files only

## Building for Distribution

See [ELECTRON_BUILD_INSTRUCTIONS.md](ELECTRON_BUILD_INSTRUCTIONS.md) for:

- Creating DMG installers
- Code signing (optional)
- App notarization (optional)
- Custom app icons
- Troubleshooting

## Deployment

Your web version is live at:

**[https://vercel.com/ethanabduraimov-7965s-projects/v0-stitch-weather-popup](https://vercel.com/ethanabduraimov-7965s-projects/v0-stitch-weather-popup)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/lscK7e4SDa9](https://v0.app/chat/lscK7e4SDa9)**

## License

MIT

## Credits

- Stitch character © Disney
- Weather data from OpenWeatherMap
- Built with ❤️ using v0 by Vercel
