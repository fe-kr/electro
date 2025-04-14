import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
} from "electron";
import path from "node:path";
import {
  FrameStatus,
  MainToRendererEvent,
  RendererToMainEvent,
} from "../shared/config/events";
import { getResourcesLimits, getResourcesUsage } from "../shared/lib/os-utils";

class Main {
  private pollIntervalId?: NodeJS.Timeout;
  private mainWindow!: BrowserWindow;

  constructor(private readonly windowConfig: BrowserWindowConstructorOptions) {
    app.on("ready", this.createMainWindow);
    app.on("before-quit", this.destroyMainWindow);

    ipcMain.on(RendererToMainEvent.SEND_FRAME_STATUS, this.manageMainWindow);

    ipcMain.handle(
      RendererToMainEvent.GET_RESOURCES_LIMITS,
      getResourcesLimits,
    );

    ipcMain.handle(
      RendererToMainEvent.GET_RESOURCES_USAGE,
      this.pollResourcesUsage,
    );
  }

  private createMainWindow = async () => {
    this.mainWindow = new BrowserWindow(this.windowConfig);

    await (process.env.VITE_DEV_SERVER_URL
      ? this.mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
      : this.mainWindow.loadFile("dist/index.html"));
  };

  private destroyMainWindow = () => {
    clearInterval(this.pollIntervalId);
  };

  private manageMainWindow = (_: unknown, status: FrameStatus) => {
    switch (status) {
      case FrameStatus.CLOSE:
        return this.mainWindow.close();

      case FrameStatus.MINIMIZE: {
        return this.mainWindow.minimize();
      }
    }
  };

  private pollResourcesUsage = (_: unknown, interval: number) => {
    clearInterval(this.pollIntervalId);

    this.pollIntervalId = setInterval(async () => {
      const usage = await getResourcesUsage();

      this.mainWindow.webContents.send(
        MainToRendererEvent.SEND_RESOURCES_USAGE,
        usage,
      );
    }, interval);
  };
}

new Main({
  skipTaskbar: true,
  alwaysOnTop: true,
  hasShadow: true,
  width: 320,
  useContentSize: true,
  webPreferences: {
    preload: path.join(app.getAppPath(), "dist-electron", "preload.mjs"),
  },
  frame: false,
});
