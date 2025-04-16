import { useCallback, useEffect, useMemo } from "react";

export const usePersistData = <T>(key: string, value: T) => {
  const callback = useCallback(() => {
    const data = JSON.stringify(value);

    localStorage.setItem(key, data);
  }, [key, value]);

  useEffect(() => {
    window.addEventListener("beforeunload", callback);

    return () => {
      callback();
      window.removeEventListener("beforeunload", callback);
    };
  }, [callback]);
};

export const usePersistedData = <T>(key: string, value: T): T =>
  useMemo(() => {
    const data = localStorage.getItem(key)!;

    return JSON.parse(data ?? null) || value;
  }, [key, value]);
