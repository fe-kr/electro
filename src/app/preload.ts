import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRenderer", {
  invoke: ipcRenderer.invoke.bind(ipcRenderer),
  send: ipcRenderer.send.bind(ipcRenderer),
  on: ipcRenderer.on.bind(ipcRenderer),
  off: ipcRenderer.off.bind(ipcRenderer),
});
