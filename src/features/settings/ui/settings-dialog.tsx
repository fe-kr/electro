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
import { SettingsContext } from "../model/settings-context";
import { use } from "react";

export const SettingsDialog = () => {
  const { settings, setSettings } = use(SettingsContext);

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
          <DialogDescription>Make changes to your settings.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex justify-between gap-4">
            <Label>CPU</Label>
            <Switch
              checked={settings.cpu}
              onCheckedChange={(checked) => setSettings({ cpu: checked })}
            />
          </div>
          <div className="flex justify-between gap-4">
            <Label>RAM</Label>
            <Switch
              checked={settings.ram}
              onCheckedChange={(checked) => setSettings({ ram: checked })}
            />
          </div>
          <div className="flex justify-between gap-4">
            <Label>Storage</Label>
            <Switch
              checked={settings.storage}
              onCheckedChange={(checked) => setSettings({ storage: checked })}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
