import { IpcRenderer } from "electron";

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
  }

  namespace Resources {
    type Variant = "cpu" | "ram" | "storage";

    type Limits = Record<Variant, string>;

    type Usage = Record<Variant, number>;
  }
}

export {};
