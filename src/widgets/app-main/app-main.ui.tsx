import { ResourcesContext } from "@/entities/resources/model/resources-context";
import { use } from "react";

export const AppMain = () => {
  use(ResourcesContext);

  return <>Hello World</>;
};
