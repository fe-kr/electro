import { useResourcesContext } from "../model/resources-context";

export const useResourcesMaxPercent = (keys: Resources.Variant[]) => {
  const { usage } = useResourcesContext();

  if (!keys.length) return null;

  return usage.reduce<Record<Resources.Variant, number>>(
    (acc, item) => {
      if (!item) return acc;

      keys.forEach((key) => {
        const maxValue = Math.max(item[key], acc[key]);

        acc[key] = maxValue;
      });

      return acc;
    },
    { cpu: 0, ram: 0, storage: 0 },
  );
};
