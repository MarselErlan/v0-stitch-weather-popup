import { app, BrowserWindow, screen, ipcMain } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  // Get primary display dimensions
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  // Create the browser window with Mac-specific settings
  mainWindow = new BrowserWindow({
    width: 450,
    height: 650,
    x: Math.floor(width / 2 - 225),
    y: Math.floor(height / 2 - 325),
    resizable: false,
    alwaysOnTop: true, // Keep popup on top like a widget
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
    },
    titleBarStyle: "hiddenInset", // Mac-specific: native titlebar with traffic lights
    backgroundColor: "#f3e5f5", // Light purple background
  })

  // Load the app
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:3000")
    // DevTools disabled - causing SIGTRAP crash on Mac
    // Uncomment to enable: mainWindow.webContents.openDevTools({ mode: "detach" })
  } else {
    mainWindow.loadFile(path.join(__dirname, "../out/index.html"))
  }

  // Handle window close
  mainWindow.on("closed", () => {
    mainWindow = null
  })

  // Make window draggable from anywhere
  mainWindow.setMovable(true)
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow()

  app.on("activate", () => {
    // On macOS, re-create window when dock icon is clicked and no windows are open
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

// Handle IPC messages from renderer (ipcMain already imported above)

ipcMain.on("minimize-window", () => {
  if (mainWindow) {
    mainWindow.minimize()
  }
})

ipcMain.on("close-window", () => {
  if (mainWindow) {
    mainWindow.close()
  }
})

ipcMain.on("set-always-on-top", (_event: any, flag: boolean) => {
  if (mainWindow) {
    mainWindow.setAlwaysOnTop(flag)
  }
})
