# App Icon Setup

## Quick Start

The app icon should be placed here as `icon.icns` for Mac builds.

## Creating an Icon from Your Stitch Image

### Option 1: Use an Online Converter (Easiest)

1. Visit https://cloudconvert.com/png-to-icns
2. Upload `public/stitch.jpg` or `public/stitch-transparent.jpg`
3. Download the converted `icon.icns`
4. Place it in this `build/` folder

### Option 2: Use Mac's Built-in Tools

```bash
# 1. First convert JPG to PNG (if needed)
sips -s format png public/stitch.jpg --out build/icon.png

# 2. Create iconset folder
mkdir -p build/icon.iconset

# 3. Generate all required icon sizes
sips -z 16 16     build/icon.png --out build/icon.iconset/icon_16x16.png
sips -z 32 32     build/icon.png --out build/icon.iconset/icon_16x16@2x.png
sips -z 32 32     build/icon.png --out build/icon.iconset/icon_32x32.png
sips -z 64 64     build/icon.png --out build/icon.iconset/icon_32x32@2x.png
sips -z 128 128   build/icon.png --out build/icon.iconset/icon_128x128.png
sips -z 256 256   build/icon.png --out build/icon.iconset/icon_128x128@2x.png
sips -z 256 256   build/icon.png --out build/icon.iconset/icon_256x256.png
sips -z 512 512   build/icon.png --out build/icon.iconset/icon_256x256@2x.png
sips -z 512 512   build/icon.png --out build/icon.iconset/icon_512x512.png
sips -z 1024 1024 build/icon.png --out build/icon.iconset/icon_512x512@2x.png

# 4. Convert to .icns
iconutil -c icns build/icon.iconset -o build/icon.icns

# 5. Clean up temporary files
rm -rf build/icon.iconset build/icon.png
```

### Option 3: Use the Helper Script

```bash
npm run generate:icon
```

## Temporary Workaround

If you want to build the app without a custom icon, Electron will use a default icon.
You can also comment out the icon line in `electron-builder.config.js`:

```js
// icon: "build/icon.icns",  // Comment this line temporarily
```
