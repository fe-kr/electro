import { useReducedState } from "@/shared/lib/react";

export const useResourcesVisibility = () => {
  return useReducedState<Record<Resources.Variant, boolean>>({
    cpu: true,
    ram: true,
    storage: true,
  });
};
