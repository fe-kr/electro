import {
  ResourceCard,
  ResourcesContext,
  ResourceChart,
} from "@/entities/resources";
import { use } from "react";

export const AppMain = () => {
  const { limits, usage } = use(ResourcesContext);

  return (
    <main className="flex flex-col gap-2 p-2">
      <ResourceCard title="CPU" description={limits?.cpu}>
        <ResourceChart data={usage} dataKey="cpu" />
      </ResourceCard>
      <ResourceCard
        title="RAM"
        description={`Total capacity: ${limits?.ram ?? "-"} GB`}
      >
        <ResourceChart data={usage} dataKey="ram" />
      </ResourceCard>
      <ResourceCard
        title="STORAGE"
        description={`Total capacity: ${limits?.storage ?? "-"} GB`}
      >
        <ResourceChart data={usage} dataKey="storage" />
      </ResourceCard>
    </main>
  );
};
