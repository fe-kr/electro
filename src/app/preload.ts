import { contextBridge, ipcRenderer } from "electron";
import {
  RendererToMainEvent,
  MainToRendererEvent,
} from "../shared/config/events";

contextBridge.exposeInMainWorld("electronAPI", {
  invokeResourcesLimits: () =>
    ipcRenderer.invoke(RendererToMainEvent.INVOKE_RESOURCES_LIMITS),
  invokeResourcesUsage: (payload) =>
    ipcRenderer.invoke(RendererToMainEvent.INVOKE_RESOURCES_USAGE, payload),
  invokeChangeFrameStatus: (payload) =>
    ipcRenderer.invoke(RendererToMainEvent.INVOKE_CHANGE_FRAME_STATUS, payload),
  onSendResourcesUsage: (callback) => {
    const listen = (_: unknown, payload: Resources.Usage) => callback(payload);
    ipcRenderer.on(MainToRendererEvent.SEND_RESOURCES_USAGE, listen);

    return () => {
      ipcRenderer.off(MainToRendererEvent.SEND_RESOURCES_USAGE, listen);
    };
  },
} satisfies typeof window.electronAPI);
