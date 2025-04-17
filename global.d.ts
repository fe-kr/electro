import { FrameStatus } from "@/shared/config/events";

declare global {
  interface Window {
    electronAPI: {
      onSendResourcesUsage: (callback: Resources.UsageCallback) => () => void;
      invokeResourcesLimits: () => Promise<Resources.Limits>;
      invokeResourcesUsage: (interval: number) => Promise<void>;
      invokeChangeFrameStatus: (status: FrameStatus) => Promise<void>;
    };
  }

  namespace Resources {
    type Variant = "cpu" | "ram" | "storage";

    type Limits = Record<Variant, string>;

    type Usage = Record<Variant, number>;

    type UsageCallback = (usage: Usage) => void;
  }
}

export {};
