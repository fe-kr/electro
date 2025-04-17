import { app } from "electron";
import path from "node:path";

export class AppPath {
  static root = app.getAppPath();

  static statsPath = process.platform === "win32" ? "C://" : "/";

  static rendererDist = AppPath.join(AppPath.root, "dist");

  static electronDist = AppPath.join(AppPath.root, "dist-electron");

  static preloadFile = AppPath.join(AppPath.electronDist, "preload.mjs");

  static rendererFile = AppPath.join(AppPath.rendererDist, "index.html");

  static rendererFileRel = AppPath.relative(AppPath.root, AppPath.rendererFile);

  static trayIcon = AppPath.join(AppPath.rendererDist, "tray-icon.png");

  static join(...paths: string[]) {
    return path.join(...paths);
  }

  static relative(form: string, to: string) {
    return path.relative(form, to);
  }
}
