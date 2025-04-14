import {
  MainToRendererEvent,
  RendererToMainEvent,
} from "@/shared/config/events";
import { useCallback, useEffect, useState } from "react";

export function useResourcesUsageData(limit: number) {
  const [data, setData] = useState<(Resources.Usage | null)[]>(() =>
    Array.from({ length: limit }).map(() => null),
  );

  const onReceiveData = useCallback(
    (_: unknown, data: Array<Resources.Usage>) => {
      setData((prevState) => prevState.slice(1).concat(data));
    },
    [],
  );

  useEffect(() => {
    window.ipcRenderer.invoke(RendererToMainEvent.GET_RESOURCES_USAGE, 500);

    window.ipcRenderer.on(
      MainToRendererEvent.SEND_RESOURCES_USAGE,
      onReceiveData,
    );

    return () => {
      window.ipcRenderer.off(
        MainToRendererEvent.SEND_RESOURCES_USAGE,
        onReceiveData,
      );
    };
  }, [onReceiveData]);

  return data;
}
