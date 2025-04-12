import { app } from "electron";
import { join } from "node:path";

export class Path {
  static root = app.getAppPath();

  static dist = join(Path.root, "/dist-electron");

  static preload = join(Path.dist, "/preload.mjs");
}
