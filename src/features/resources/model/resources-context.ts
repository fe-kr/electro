import {
  createStrictContext,
  ReturnUseReducedState,
  useStrictContext,
} from "@/shared/lib/react";

interface ResourcesContext {
  limits: Resources.Limits | null;
  usage: (Resources.Usage | null)[];
}

type ResourcesVisibilityContext = ReturnUseReducedState<
  Record<Resources.Variant, boolean>
>;

export const ResourcesContext = createStrictContext<ResourcesContext>();

export const ResourcesVisibilityContext =
  createStrictContext<ResourcesVisibilityContext>();

export const useResourcesContext = () => useStrictContext(ResourcesContext);

export const useResourcesVisibilityContext = () =>
  useStrictContext(ResourcesVisibilityContext);
