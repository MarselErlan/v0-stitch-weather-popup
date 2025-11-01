interface ElectronAPI {
  minimizeWindow: () => void
  closeWindow: () => void
  setAlwaysOnTop: (flag: boolean) => void
  platform: string
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}

export {}
