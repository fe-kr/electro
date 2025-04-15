import {
  ResourcesContext,
  ResourcesVisibilityContext,
} from "./resources-context";
import { useResourcesLimitsData } from "../lib/use-resources-limits-data";
import { useResourcesUsageData } from "../lib/use-resources-usage-data";
import { useResourcesVisibility } from "../lib/use-resources-visibility";

export const ResourcesProvider = ({ children }: React.PropsWithChildren) => {
  const limits = useResourcesLimitsData();
  const usage = useResourcesUsageData(10);
  const value = { limits, usage };

  return <ResourcesContext value={value}>{children}</ResourcesContext>;
};

export const ResourcesVisibilityProvider = ({
  children,
}: React.PropsWithChildren) => {
  const value = useResourcesVisibility();

  return (
    <ResourcesVisibilityContext value={value}>
      {children}
    </ResourcesVisibilityContext>
  );
};
