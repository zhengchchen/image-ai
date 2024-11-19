import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Minimize, ZoomIn, ZoomOut } from "lucide-react";
import { Editor } from "@/features/editor/types";

interface FooterProps {
  editor: Editor | undefined;
}

export const Footer = ({ editor }: FooterProps) => {
  return (
    <footer className="h-[52px] w-full border-t bg-white flex items-center overflow-x-auto z-[49] p-2 gap-x-1 shrink-0 px4 flex-row-reverse">
      <Hint label="Reset" side="top" sideOffset={10}>
        <Button onClick={editor?.autoZoom} size="icon" variant="ghost" className="h-full">
          <Minimize />
        </Button>
      </Hint>
      <Hint label="Zoom in" side="top" sideOffset={10}>
        <Button onClick={editor?.zoomIn} size="icon" variant="ghost" className="h-full">
          <ZoomIn />
        </Button>
      </Hint>
      <Hint label="Zoom out" side="top" sideOffset={10}>
        <Button onClick={editor?.zoomOut} size="icon" variant="ghost" className="h-full">
          <ZoomOut />
        </Button>
      </Hint>
    </footer>
  );
};
