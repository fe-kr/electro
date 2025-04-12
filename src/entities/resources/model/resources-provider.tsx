import { ResourcesContext } from "./resources-context";
import { useStaticData } from "../lib/use-static-data";

export const ResourcesProvider = ({ children }: React.PropsWithChildren) => {
  const staticData = useStaticData();

  return <ResourcesContext value={staticData}>{children}</ResourcesContext>;
};
