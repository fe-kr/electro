import { RendererToMainEvent } from "@/shared/config/events";
import { useEffect, useState } from "react";

export const useResourcesLimitsData = () => {
  const [data, setData] = useState<Resources.Limits | null>(null);

  useEffect(() => {
    window.ipcRenderer
      ?.invoke(RendererToMainEvent.GET_RESOURCES_LIMITS)
      .then(setData)
      .catch(Error);
  }, []);

  return data;
};
