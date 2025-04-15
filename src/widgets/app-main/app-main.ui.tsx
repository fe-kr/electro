import {
  ResourceCard,
  ResourceChart,
  useResourcesContext,
  useResourcesVisibilityContext,
} from "@/features/resources";

export const AppMain = () => {
  const { limits, usage } = useResourcesContext();
  const visibility = useResourcesVisibilityContext()[0];

  return (
    <main className={`grid flex-grow grid-rows-3 gap-2 overflow-hidden p-2`}>
      {visibility.cpu && (
        <ResourceCard title="CPU" description={limits?.cpu ?? "-"}>
          <ResourceChart data={usage} dataKey="cpu" />
        </ResourceCard>
      )}

      {visibility.ram && (
        <ResourceCard
          title="RAM"
          description={`Total capacity: ${limits?.ram ?? "-"} GB`}
        >
          <ResourceChart data={usage} dataKey="ram" />
        </ResourceCard>
      )}

      {visibility.storage && (
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
