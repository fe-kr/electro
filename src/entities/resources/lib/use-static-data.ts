import { RendererToMainEvent } from "@/shared/config/events";
import { useEffect, useState } from "react";

export const useStaticData = () => {
  const [data, setData] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    window.ipcRenderer
      .invoke(RendererToMainEvent.GET_STATIC_DATA)
      .then(setData)
      .catch(Error);
  }, []);

  return data;
};
