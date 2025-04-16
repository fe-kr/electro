import { app } from "electron";
import path from "node:path";

export class AppPath {
  static appPath = app.getAppPath();

  static statsPath = process.platform === "win32" ? "C://" : "/";

  static rendererDist = AppPath.join(AppPath.appPath, "dist");

  static electronDist = AppPath.join(AppPath.appPath, "dist-electron");

  static preloadFile = AppPath.join(AppPath.electronDist, "preload.mjs");

  static trayIcon = AppPath.join(AppPath.rendererDist, "tray-icon.png");

  static join(...paths: string[]) {
    return path.join(...paths);
  }
}
