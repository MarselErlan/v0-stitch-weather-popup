# Stitch Weather Desktop App

A cute desktop weather widget featuring Stitch that shows real-time Chicago weather with delightful animations.

*Automatically synced with your [v0.app](https://v0.app) deployments*

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

## Quick Start

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

# Test in development mode
npm run electron:dev

# Build Mac app
npm run electron:build
\`\`\`

Your app will be in the `release/` folder.

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles with animations
├── components/            # React components
│   ├── weather-popup.tsx  # Main weather widget
│   └── ui/               # UI components (shadcn)
├── electron/             # Electron main process
│   ├── main.ts          # Electron entry point
│   ├── preload.ts       # Preload script for IPC
│   └── types.d.ts       # Electron type definitions
├── public/              # Static assets
│   └── stitch-transparent.jpg  # Stitch character image
└── ELECTRON_BUILD_INSTRUCTIONS.md  # Build guide
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

- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js for production
- `npm run electron:dev` - Run Electron app in development
- `npm run electron:build` - Build Mac desktop app
- `npm run electron:start` - Start built Electron app

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
