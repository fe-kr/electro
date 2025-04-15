import {
  ResourceCard,
  ResourcesContext,
  ResourceChart,
} from "@/features/resources";
import { useSettingsContext } from "@/features/settings";
import { use } from "react";

export const AppMain = () => {
  const { limits, usage } = use(ResourcesContext);
  const { isCpuShown, isRamShown, isStorageShown } =
    useSettingsContext().settings;

  return (
    <main className="grid flex-grow gap-2 p-2">
      {isCpuShown && (
        <ResourceCard title="CPU" description={limits?.cpu ?? "-"}>
          <ResourceChart data={usage} dataKey="cpu" />
        </ResourceCard>
      )}

      {isRamShown && (
        <ResourceCard
          title="RAM"
          description={`Total capacity: ${limits?.ram ?? "-"} GB`}
        >
          <ResourceChart data={usage} dataKey="ram" />
        </ResourceCard>
      )}

      {isStorageShown && (
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
