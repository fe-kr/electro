import { createContext } from "react";

interface IResourcesContext {
  data: {
    static: "";
    dynamic: "";
  };
}

export const ResourcesContext = createContext<IResourcesContext>(null!);
