import {
  ResourceCard,
  ResourceChart,
  resourcesUsageConfig,
  useResourcesContext,
  useResourcesVisibilityContext,
} from "@/features/resources";
import { useMemo } from "react";

export const AppMain = () => {
  const { limits, usage } = useResourcesContext();
  const visibility = useResourcesVisibilityContext()[0];

  const config = useMemo(
    () => resourcesUsageConfig.filter(({ dataKey }) => visibility[dataKey]),
    [visibility],
  );

  return (
    <main className="grid flex-grow gap-2 overflow-y-auto p-2">
      {config.map(({ dataKey, title, description }) => {
        const limit = limits?.[dataKey] ?? "-";

        return (
          <ResourceCard
            title={title}
            description={description ? `${description} ${limit}` : limit}
          >
            <ResourceChart data={usage} dataKey={dataKey} />
          </ResourceCard>
        );
      })}
    </main>
  );
};
