import { useCallback, useEffect, useState } from "react";

export function useResourcesUsageData(limit: number) {
  const [data, setData] = useState<(Resources.Usage | null)[]>(() =>
    Array.from({ length: limit }).map(() => null),
  );

  const onReceiveData = useCallback((data: Resources.Usage) => {
    setData((prevState) => prevState.slice(1).concat(data));
  }, []);

  useEffect(() => {
    window.electronAPI.invokeResourcesUsage(500);

    const removeListener =
      window.electronAPI.onSendResourcesUsage(onReceiveData);

    return removeListener;
  }, [onReceiveData]);

  return data;
}
