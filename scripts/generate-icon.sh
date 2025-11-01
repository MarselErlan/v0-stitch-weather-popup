#!/bin/bash

# Script to generate Mac app icon from Stitch image
# Run: chmod +x scripts/generate-icon.sh && ./scripts/generate-icon.sh

echo "🎨 Generating Mac app icon from Stitch image..."

# Use stitch.jpg as source
SOURCE="public/stitch.jpg"
if [ ! -f "$SOURCE" ]; then
  echo "❌ Error: Source image not found at $SOURCE"
  exit 1
fi

# Create build directory if it doesn't exist
mkdir -p build

# Convert to PNG first
echo "📸 Converting to PNG..."
sips -s format png "$SOURCE" --out build/icon.png

# Create iconset folder
echo "📦 Creating iconset..."
mkdir -p build/icon.iconset

# Generate all required icon sizes
echo "🔄 Generating icon sizes..."
sips -z 16 16     build/icon.png --out build/icon.iconset/icon_16x16.png >/dev/null 2>&1
sips -z 32 32     build/icon.png --out build/icon.iconset/icon_16x16@2x.png >/dev/null 2>&1
sips -z 32 32     build/icon.png --out build/icon.iconset/icon_32x32.png >/dev/null 2>&1
sips -z 64 64     build/icon.png --out build/icon.iconset/icon_32x32@2x.png >/dev/null 2>&1
sips -z 128 128   build/icon.png --out build/icon.iconset/icon_128x128.png >/dev/null 2>&1
sips -z 256 256   build/icon.png --out build/icon.iconset/icon_128x128@2x.png >/dev/null 2>&1
sips -z 256 256   build/icon.png --out build/icon.iconset/icon_256x256.png >/dev/null 2>&1
sips -z 512 512   build/icon.png --out build/icon.iconset/icon_256x256@2x.png >/dev/null 2>&1
sips -z 512 512   build/icon.png --out build/icon.iconset/icon_512x512.png >/dev/null 2>&1
sips -z 1024 1024 build/icon.png --out build/icon.iconset/icon_512x512@2x.png >/dev/null 2>&1

# Convert to .icns
echo "✨ Converting to .icns format..."
iconutil -c icns build/icon.iconset -o build/icon.icns

# Clean up temporary files
echo "🧹 Cleaning up..."
rm -rf build/icon.iconset build/icon.png

echo "✅ Icon generated successfully at build/icon.icns"
echo "🚀 You can now run: npm run electron:build"

