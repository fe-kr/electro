import {
  ResourceCard,
  ResourcesContext,
  ResourceChart,
} from "@/entities/resources";
import { SettingsContext } from "@/features/settings";
import { use } from "react";

export const AppMain = () => {
  const { limits, usage } = use(ResourcesContext);
  const { settings } = use(SettingsContext);

  return (
    <main className="grid flex-grow gap-2 p-2">
      {settings.cpu && (
        <ResourceCard title="CPU" description={limits?.cpu ?? "-"}>
          <ResourceChart data={usage} dataKey="cpu" />
        </ResourceCard>
      )}

      {settings.ram && (
        <ResourceCard
          title="RAM"
          description={`Total capacity: ${limits?.ram ?? "-"} GB`}
        >
          <ResourceChart data={usage} dataKey="ram" />
        </ResourceCard>
      )}

      {settings.storage && (
        <ResourceCard
          title="STORAGE"
          description={`Total capacity: ${limits?.storage ?? "-"} GB`}
        >
          <ResourceChart data={usage} dataKey="storage" />
        </ResourceCard>
      )}
    </main>
  );
};
