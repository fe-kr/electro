import { createContext } from "react";

interface IResourcesContext {
  limits: Resources.Limits | null;
  usage: (Resources.Usage | null)[];
}

export const ResourcesContext = createContext<IResourcesContext>(null!);
