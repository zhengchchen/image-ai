import { ActiveTool, Editor, fonts } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-siderbar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface FontSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FontSidebar = ({ editor, activeTool, onChangeActiveTool }: FontSidebarProps) => {
  const value = editor?.getActiveFontFamily();
  
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative z-[40] w-[360px] flex flex-col h-full border-r",
        activeTool === "font" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Font" description="Change the text font" />
      <ScrollArea className="h-full">
        <div className="p-4 space-y-1 border-b">
          {
            fonts.map((font) => (
              <Button 
                key={font} 
                variant="secondary" 
                className={cn(
                  "w-full h-16 justify-start text-left", 
                  font === value && "border-2 border-blue-500")}
                style={{
                  fontFamily: font,
                  fontSize: 16,
                  padding: "8px 16px"
                }}
                onClick={() => editor?.changeFontFamily(font)}
              >
                {font}
              </Button>
            ))
          }
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
