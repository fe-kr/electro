import { ResourcesContext } from "./resources-context";
import { useStaticData } from "../lib/use-static-data";
import { useDynamicData } from "../lib/use-dynamic-data";

export const ResourcesProvider = ({ children }: React.PropsWithChildren) => {
  const staticData = useStaticData();
  const dynamicData = useDynamicData(10);

  return (
    <ResourcesContext
      value={{
        data: {
          static: staticData,
          dynamic: dynamicData,
        },
      }}
    >
      {children}
    </ResourcesContext>
  );
};
