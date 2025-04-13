import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
} from "electron";
import path from "node:path";
import { FrameStatus, RendererToMainEvent } from "../shared/config/events";
import { getStaticData } from "../shared/lib/os-utils";

class Main {
  private mainWindow: BrowserWindow | undefined;

  constructor(private windowConfig: BrowserWindowConstructorOptions) {
    app.whenReady().then(() => {
      this.createMainWindow();
    });

    ipcMain.on(RendererToMainEvent.SEND_FRAME_STATUS, (_, status) =>
      this.manageMainWindow(status),
    );

    ipcMain.handle(RendererToMainEvent.GET_STATIC_DATA, getStaticData);
  }

  createMainWindow = async () => {
    this.mainWindow = new BrowserWindow(this.windowConfig);

    if (process.env.VITE_DEV_SERVER_URL) {
      await this.mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
      await this.mainWindow.loadFile("dist/index.html");
    }
  };

  manageMainWindow = (status: `${FrameStatus}`) => {
    switch (status) {
      case FrameStatus.CLOSE:
        return this.mainWindow!.close();

      case FrameStatus.MAXIMIZE:
        return this.mainWindow!.maximize();

      case FrameStatus.MINIMIZE:
        return this.mainWindow!.minimize();
    }
  };
}

new Main({
  webPreferences: {
    preload: path.join(app.getAppPath(), "dist-electron", "preload.mjs"),
  },
  frame: false,
});
