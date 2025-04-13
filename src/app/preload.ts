import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRenderer", {
  invoke: ipcRenderer.invoke,
  send: ipcRenderer.send,
  on: ipcRenderer.on,
  off: ipcRenderer.off,
});
