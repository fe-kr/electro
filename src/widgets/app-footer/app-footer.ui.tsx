import {
  useResourcesVisibilityContext,
  useResourcesMaxPercent,
  resourcesUsageLimitsConfig,
} from "@/features/resources";
import { filterObjectKeys } from "@/shared/lib/fp";
import { Card } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { useMemo } from "react";

export const AppFooter = () => {
  const visibility = useResourcesVisibilityContext()[0];
  const visibilityKeys = filterObjectKeys(visibility);
  const maxPercent = useResourcesMaxPercent(visibilityKeys);

  const config = useMemo(
    () =>
      resourcesUsageLimitsConfig.filter(({ dataKey }) => visibility[dataKey]),
    [visibility],
  );

  if (!visibilityKeys.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {config.map(({ dataKey, title, formatValue }) => (
        <Card className="gap-2 p-2 text-xs">
          <Label className="font-semibold">{title}</Label>

          {formatValue(maxPercent?.[dataKey] ?? 0)}
        </Card>
      ))}
    </div>
  );
};
