import { IpcRenderer } from "electron";

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
  }

  namespace App {
    interface StaticData {
      total: number;
      usage: number;
    }

    interface DynamicData {
      total: number;
      usage: number;
    }
  }
}

export {};
