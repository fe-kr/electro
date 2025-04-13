import { IpcRenderer } from "electron";

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
  }

  namespace Resources {
    interface Limits {
      storage: number;
      cpu: string;
      ram: number;
    }

    interface Usage {
      storage: number;
      cpu: number;
      ram: number;
    }
  }
}

export {};
