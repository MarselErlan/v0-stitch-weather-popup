module.exports = {
  appId: "com.stitchweather.app",
  productName: "Stitch Weather",
  directories: {
    output: "release",
    buildResources: "build",
  },
  files: ["out/**/*", "dist-electron/**/*", "package.json"],
  mac: {
    category: "public.app-category.weather",
    target: [
      {
        target: "dmg",
        arch: ["x64", "arm64"],
      },
      {
        target: "zip",
        arch: ["x64", "arm64"],
      },
    ],
    icon: "build/icon.icns",
    darkModeSupport: true,
    hardenedRuntime: false,
    gatekeeperAssess: false,
    entitlements: null,
    entitlementsInherit: null,
  },
  dmg: {
    contents: [
      {
        x: 130,
        y: 220,
      },
      {
        x: 410,
        y: 220,
        type: "link",
        path: "/Applications",
      },
    ],
    window: {
      width: 540,
      height: 380,
    },
  },
}
