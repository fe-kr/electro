import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
  Menu,
  Tray,
} from "electron";
import {
  FrameStatus,
  MainToRendererEvent,
  RendererToMainEvent,
} from "../shared/config/events";
import { getResourcesLimits, getResourcesUsage } from "../shared/lib/os-utils";
import { AppPath } from "../shared/config/path";

class Main {
  private pollIntervalId?: NodeJS.Timeout;
  private mainWindow!: BrowserWindow;

  static init(windowConfig: BrowserWindowConstructorOptions) {
    new Main(windowConfig);
  }

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

    this.createTray();
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

  private createTray = () => {
    const tray = new Tray(AppPath.trayIcon);
    const trayMenu = Menu.buildFromTemplate([
      {
        label: "Show",
        click: () => this.mainWindow.show(),
      },
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ]);

    tray.setToolTip("Electro");

    tray.setContextMenu(trayMenu);
  };
}

const shouldDisablePreload = process.env.PW_DISABLE_PRELOAD_SCRIPT === "true";

Main.init({
  skipTaskbar: true,
  alwaysOnTop: true,
  hasShadow: true,
  width: 320,
  useContentSize: true,
  frame: false,
  webPreferences: {
    preload: shouldDisablePreload ? undefined : AppPath.preloadFile,
  },
});
