import { useEffect, useState } from "react";

export const useResourcesLimitsData = () => {
  const [data, setData] = useState<Resources.Limits | null>(null);

  useEffect(() => {
    window.electronAPI.invokeResourcesLimits().then(setData).catch(Error);
  }, []);

  return data;
};
