import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { useResourcesVisibilityContext } from "../model/resources-context";

interface ResourceTogglerProps {
  name: Resources.Variant;
  label?: string;
  className?: string;
}

export const ResourceToggler = ({
  label,
  name,
  className,
}: ResourceTogglerProps) => {
  const [visibility, setVisibility] = useResourcesVisibilityContext();

  const onCheckedChange = (checked: boolean) => {
    setVisibility({ [name]: checked });
  };

  return (
    <div className={className}>
      <Label>{label}</Label>
      <Switch
        name={name}
        checked={visibility[name]}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};
