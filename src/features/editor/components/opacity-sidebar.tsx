import { ActiveTool, Editor, STROKE_DASH_ARRAY, STROKE_WIDTH } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-siderbar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";

interface OpacitySidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const OpacitySidebar = ({ editor, activeTool, onChangeActiveTool }: OpacitySidebarProps) => {
  const initialValue = editor?.getActiveOpacity() || 1;

  const selectedObject = useMemo(() => editor?.selectedObjects[0], [editor?.selectedObjects]);

  useEffect(() => {
    if(selectedObject){
      setOpacity(selectedObject.get("opacity") || 1);
    }
  }, [selectedObject]);

  const [opacity, setOpacity] = useState(initialValue);

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative z-[40] w-[360px] flex flex-col h-full border-r",
        activeTool === "opacity" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Opacity" description="Change the opacity of the selected object" />
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4 border-b">
          <Slider value={[opacity]} onValueChange={(values)=>onChange(values[0])} min={0} max={1} step={0.01}/>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
