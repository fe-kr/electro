import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Settings } from "lucide-react";
import { useSettingsContext } from "../model/settings-context";

export const SettingsDialog = () => {
  const { settings, setSettings } = useSettingsContext();

  const onSwitchChange = ({
    name,
    checked,
  }: {
    name: string;
    checked: boolean;
  }) => {
    setSettings({ [name]: checked });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Settings">
          <Settings />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Update your interface settings</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex justify-between gap-4">
            <Label>CPU</Label>
            <Switch
              name="isCpuShown"
              checked={settings.isCpuShown}
              onChange={onSwitchChange}
            />
          </div>

          <div className="flex justify-between gap-4">
            <Label>RAM</Label>
            <Switch
              name="isRamShown"
              checked={settings.isRamShown}
              onChange={onSwitchChange}
            />
          </div>

          <div className="flex justify-between gap-4">
            <Label>Storage</Label>
            <Switch
              name="isStorageShown"
              checked={settings.isStorageShown}
              onChange={onSwitchChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
