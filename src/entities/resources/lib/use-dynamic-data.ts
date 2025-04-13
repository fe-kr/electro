import { RendererToMainEvent } from "@/shared/config/events";
import { useCallback, useEffect, useState } from "react";

export function useDynamicData(limit: number) {
  const [data, setData] = useState<Array<unknown>>([]);

  const onReceiveData = useCallback(
    (_: unknown, data: Array<unknown>) => {
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
    window.ipcRenderer.on(RendererToMainEvent.GET_DYNAMIC_DATA, onReceiveData);

    return () => {
      window.ipcRenderer.off(
        RendererToMainEvent.GET_DYNAMIC_DATA,
        onReceiveData,
      );
    };
  }, [onReceiveData]);

  return data;
}
