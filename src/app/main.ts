import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
  IpcMain,
  Menu,
  Tray,
  WebFrameMain,
} from "electron";
import {
  FrameStatus,
  MainToRendererEvent,
  RendererToMainEvent,
} from "../shared/config/events";
import { getResourcesLimits, getResourcesUsage } from "../shared/lib/os-utils";
import { AppPath } from "../shared/config/path";
import { pathToFileURL } from "url";

class Main {
  static instance: Main;
  private pollIntervalId?: NodeJS.Timeout;
  private mainWindow!: BrowserWindow;

  static init(windowConfig: BrowserWindowConstructorOptions) {
    this.instance ??= new Main(windowConfig);
  }

  constructor(private readonly windowConfig: BrowserWindowConstructorOptions) {
    app.on("ready", this.createMainWindow);
    app.on("before-quit", this.onDestroyMainWindow);

    this.ipcMainHandle(
      RendererToMainEvent.INVOKE_CHANGE_FRAME_STATUS,
      this.manageMainWindow,
    );

    this.ipcMainHandle(
      RendererToMainEvent.INVOKE_RESOURCES_LIMITS,
      getResourcesLimits,
    );

    this.ipcMainHandle(
      RendererToMainEvent.INVOKE_RESOURCES_USAGE,
      this.pollResourcesUsage,
    );
  }

  private createMainWindow = async () => {
    this.mainWindow = new BrowserWindow(this.windowConfig);

    await (import.meta.env.VITE_DEV_SERVER_URL
      ? this.mainWindow.loadURL(import.meta.env.VITE_DEV_SERVER_URL)
      : this.mainWindow.loadFile(AppPath.rendererFileRel));

    this.createTray();
  };

  private onDestroyMainWindow = () => {
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

  private ipcMainHandle: IpcMain["handle"] = (channel, listener) => {
    ipcMain.handle(channel, (e, ...args) => {
      this.validateFrameSender(e.senderFrame);
      return listener(e, ...args);
    });
  };

  private validateFrameSender = (webFrameMain: WebFrameMain | null) => {
    const { url } = webFrameMain ?? {};

    const isDevValidUrl =
      import.meta.env.DEV && url === import.meta.env.VITE_DEV_SERVER_URL;
    const isProdValidUrl =
      import.meta.env.PROD && url === `${pathToFileURL(AppPath.rendererFile)}`;

    if (isDevValidUrl) return;

    if (isProdValidUrl) return;

    throw new Error("Invalid source");
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
