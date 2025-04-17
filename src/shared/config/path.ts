import { app } from "electron";
import { join, relative } from "node:path";

export class AppPath {
  static root = app.getAppPath();

  static statsPath = process.platform === "win32" ? "C://" : "/";

  static rendererDist = join(AppPath.root, "dist-react");

  static electronDist = join(AppPath.root, "dist-electron");

  static preloadFile = join(AppPath.electronDist, "preload.mjs");

  static rendererFile = join(AppPath.rendererDist, "index.html");

  static rendererFileRel = relative(AppPath.root, AppPath.rendererFile);

  static trayIcon = join(AppPath.rendererDist, "tray-icon.png");
}
