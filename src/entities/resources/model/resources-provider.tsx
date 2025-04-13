import { ResourcesContext } from "./resources-context";
import { useResourcesLimitsData } from "../lib/use-resources-limits-data";
import { useResourcesUsageData } from "../lib/use-resources-usage-data";

export const ResourcesProvider = ({ children }: React.PropsWithChildren) => {
  const limits = useResourcesLimitsData();
  const usage = useResourcesUsageData(10);

  return (
    <ResourcesContext value={{ limits, usage }}>{children}</ResourcesContext>
  );
};
