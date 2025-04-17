import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/shared/ui/dialog";
import { Settings } from "lucide-react";
import { Separator } from "@/shared/ui/separator";
import { ResourceToggler } from "@/features/resources/@x/settings";
import { ThemeToggler } from "@/features/theme/@x/settings";

export const SettingsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title="Settings"
          data-testid="open-settings"
        >
          <Settings />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Update your interface settings</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <ResourceToggler
            name="cpu"
            label="CPU"
            className="flex justify-between gap-4"
          />

          <ResourceToggler
            name="ram"
            label="RAM"
            className="flex justify-between gap-4"
          />

          <ResourceToggler
            name="storage"
            label="Storage"
            className="flex justify-between gap-4"
          />

          <Separator />

          <ThemeToggler label="Theme" className="flex justify-between gap-4" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
