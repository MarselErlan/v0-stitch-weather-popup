#!/bin/bash

# Quick Deploy Script for Stitch Weather Desktop App
# This script creates a GitHub release and uploads the .dmg file

set -e

echo "🚀 Deploying Stitch Weather Desktop App..."
echo ""

# Check if gh is authenticated
if ! gh auth status &>/dev/null; then
  echo "❌ GitHub CLI not authenticated"
  echo ""
  echo "Please run:"
  echo "  gh auth login"
  echo ""
  echo "Then run this script again!"
  exit 1
fi

echo "✅ GitHub CLI authenticated"
echo ""

# Check if release file exists
if [ ! -f "release/Stitch Weather-1.0.0.dmg" ]; then
  echo "❌ Release file not found!"
  echo "Please run: pnpm run electron:build"
  exit 1
fi

echo "✅ Release file found (140 MB)"
echo ""

# Create the release
echo "📦 Creating GitHub release v1.0.0..."
echo ""

gh release create v1.0.0 \
  "release/Stitch Weather-1.0.0.dmg" \
  --title "Stitch Weather Desktop v1.0.0 - Mac App" \
  --notes "🌤️ **Stitch Weather - Beautiful Mac Desktop Weather Widget**

## ✨ Features
- 🎨 Beautiful native Mac interface with traffic light controls
- 🌈 Real-time weather data from OpenWeatherMap
- 💙 Adorable Stitch character with animations
- 🪟 Always-on-top widget mode
- 🎯 Draggable anywhere on your screen
- 🌟 Live weather updates for Chicago

## 📥 Installation
1. Download **Stitch Weather-1.0.0.dmg** below
2. Open the downloaded .dmg file
3. Drag \"Stitch Weather\" to your Applications folder
4. Launch from Applications or Spotlight!

⚠️ **First launch:** If you see a security warning (app from unidentified developer), right-click the app and select \"Open\". This only needs to be done once.

## 💻 Requirements
- macOS 10.15 (Catalina) or later
- 290 MB disk space
- Internet connection for weather updates

## 🙏 Credits
Built with Electron, Next.js, and lots of ❤️

Ohana means family! 🌺"

echo ""
echo "✅ Release created successfully!"
echo ""
echo "🌐 View your release at:"
echo "   https://github.com/MarselErlan/v0-stitch-weather-popup/releases/tag/v1.0.0"
echo ""
echo "📥 Direct download link:"
echo "   https://github.com/MarselErlan/v0-stitch-weather-popup/releases/download/v1.0.0/Stitch.Weather-1.0.0.dmg"
echo ""
echo "🎉 Done! Share the link with anyone who wants to use your app!"

