import { SettingsDialog } from "@/features/settings";
import { FrameStatus } from "@/shared/config/events";
import { Button } from "@/shared/ui/button";
import { X, Minus, GripHorizontal } from "lucide-react";

export const AppHeader = () => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const status = e.currentTarget.dataset.status as FrameStatus;

    window.electronAPI.invokeChangeFrameStatus(status);
  };

  return (
    <header className="grid grid-cols-3 gap-2 p-1 shadow-sm">
      <SettingsDialog />

      <div className="cursor-grab place-self-center px-4 [-webkit-app-region:drag]">
        <GripHorizontal />
      </div>

      <div className="place-self-end">
        <Button
          data-testid="minimize-window"
          variant="ghost"
          size="icon"
          title="Minimize"
          data-status={FrameStatus.MINIMIZE}
          onClick={onClick}
        >
          <Minus />
        </Button>

        <Button
          data-testid="close-window"
          variant="ghost"
          size="icon"
          title="Close"
          data-status={FrameStatus.CLOSE}
          onClick={onClick}
        >
          <X />
        </Button>
      </div>
    </header>
  );
};
