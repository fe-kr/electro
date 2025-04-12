import { app, BrowserWindow, ipcMain } from "electron";
import { RendererToMainEvent } from "../shared/config/events";
import { windowConfig } from "../shared/config/window";
import { getStaticData } from "../shared/lib/os-resources";

app.on("ready", async () => {
  const mainWindow = new BrowserWindow(windowConfig);

  if (process.env.VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    await mainWindow.loadFile("dist/index.html");
  }

  ipcMain.handle(RendererToMainEvent.GET_STATIC_DATA, getStaticData);
});
