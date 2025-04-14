import { SettingsDialog } from "@/features/settings";
import { FrameStatus, RendererToMainEvent } from "@/shared/config/events";
import { Button } from "@/shared/ui/button";
import { X, Minus, GripHorizontal } from "lucide-react";

export const AppHeader = () => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { status } = e.currentTarget.dataset;

    window.ipcRenderer.send(RendererToMainEvent.SEND_FRAME_STATUS, status);
  };

  return (
    <header className="grid grid-cols-3 gap-2">
      <SettingsDialog />

      <GripHorizontal className="cursor-grab place-self-center [-webkit-app-region:drag]" />

      <div className="place-self-end">
        <Button
          variant="ghost"
          size="icon"
          title="Minimize"
          data-status={FrameStatus.MINIMIZE}
          onClick={onClick}
        >
          <Minus />
        </Button>

        <Button
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
