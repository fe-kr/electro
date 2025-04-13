import {
  MainToRendererEvent,
  RendererToMainEvent,
} from "@/shared/config/events";
import { useCallback, useEffect, useState } from "react";

export function useResourcesUsageData(limit: number) {
  const [data, setData] = useState<Array<Resources.Usage>>([]);

  const onReceiveData = useCallback(
    (_: unknown, data: Array<Resources.Usage>) => {
      const isQueueOverflow = data.length === limit;

      setData((prevState) =>
        isQueueOverflow
          ? prevState.slice(1).concat(data)
          : prevState.concat(data),
      );
    },
    [limit],
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
