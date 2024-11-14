import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-siderbar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TextSidebar = ({ editor, activeTool, onChangeActiveTool }: TextSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative z-[40] w-[360px] flex flex-col h-full border-r",
        activeTool === "text" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Text" description="Add text to your canvas" />
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4 border-b">
          <Button 
            onClick={()=>editor?.addText("Textbox")} 
            className="w-full"
          >
            Add a textbox
          </Button>
          <Button
            className="w-full h-16"
            variant="secondary"
            size="lg"
            onClick={()=>editor?.addText("Heading",{fontSize: 80,fontWeight: 700})} 
          >
            <span className="text-3xl font-bold">Add a heading</span>
          </Button>
          <Button
            className="w-full h-16"
            variant="secondary"
            size="lg"
            onClick={()=>editor?.addText("Subheading",{fontSize: 44,fontWeight: 600})} 
          >
            <span className="text-xl font-semibold">Add a subheading</span>
          </Button>
          <Button
            className="w-full h-16"
            variant="secondary"
            size="lg"
            onClick={()=>editor?.addText("Paragraph",{fontSize: 32})} 
          >
            Paragraph
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
