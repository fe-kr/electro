import { useReducedState } from "@/shared/lib/react";
import { usePersistData, usePersistedData } from "@/shared/lib/persist";

const initialState = {
  cpu: true,
  ram: true,
  storage: true,
};

const PERSIST_KEY = "resources-visibility";

export const useResourcesVisibility = () => {
  const initialData = usePersistedData(PERSIST_KEY, initialState);

  const [data, setData] = useReducedState(initialData);

  usePersistData(PERSIST_KEY, data);

  return [data, setData] as const;
};
