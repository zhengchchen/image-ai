import { ActiveTool, Editor, FILL_COLOR } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ColorPicker } from "@/features/editor/components/color-picker";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SettingsSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const SettingsSidebar = ({ editor, activeTool, onChangeActiveTool }: SettingsSidebarProps) => {
  const workspace = editor?.getWorkspace();

  const initialWidth = useMemo(() => `${workspace?.width || 0}`, [workspace]);
  const initialHeight = useMemo(() => `${workspace?.height || 0}`, [workspace]);
  const initialBackground = useMemo(() => workspace?.fill || "#ffffff", [workspace]);

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    setWidth(initialWidth);
    setHeight(initialHeight);
    setBackground(initialBackground);
  }, [initialWidth, initialHeight, initialBackground]);

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const changeBackground = (value: string) => {
    setBackground(value);
    editor?.changeBackground(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editor?.changeSize({ width: parseInt(width), height: parseInt(height) });
  };

  return (
    <aside
      className={cn(
        "bg-white relative z-[40] w-[360px] flex flex-col h-full border-r",
        activeTool === "settings" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Settings" description="Workspace settings" />
      <ScrollArea className="h-full">
        <form onSubmit={onSubmit} className="space-y-4 p-4">
          <div className="space-y-2">
            <Label>Height</Label>
            <Input type="number" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Width</Label>
            <Input type="number" placeholder="Width" value={width} onChange={(e) => setWidth(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">
            Resize
          </Button>
        </form>
        <div className="p-4">
          <ColorPicker value={background as string} onChange={changeBackground} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
