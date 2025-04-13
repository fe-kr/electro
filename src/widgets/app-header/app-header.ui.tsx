import { FrameStatus, RendererToMainEvent } from "@/shared/config/events";
import { Button } from "@/shared/ui/button";
import { X, Minimize, Maximize } from "lucide-react";

export const AppHeader = () => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { status } = e.currentTarget.dataset;

    window.ipcRenderer.send(RendererToMainEvent.SEND_FRAME_STATUS, status);
  };

  return (
    <header className="flex items-center gap-2 p-2 [-webkit-app-region:drag]">
      <h1 className="flex-grow" />

      <div className="[-webkit-app-region:no-drag]">
        <Button
          variant="ghost"
          size="icon"
          title="Maximize"
          data-status={FrameStatus.MAXIMIZE}
          onClick={onClick}
        >
          <Maximize />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          title="Minimize"
          data-status={FrameStatus.MINIMIZE}
          onClick={onClick}
        >
          <Minimize />
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
