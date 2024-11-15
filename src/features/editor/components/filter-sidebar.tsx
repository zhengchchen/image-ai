import { ActiveTool, Editor, filters } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-siderbar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FilterSidebar = ({ editor, activeTool, onChangeActiveTool }: FilterSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative z-[40] w-[360px] flex flex-col h-full border-r",
        activeTool === "filter" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Filter" description="Apply a filter to selected image" />
      <ScrollArea className="h-full">
        <div className="p-4 space-y-1 border-b">
          {
            filters.map((filter) => (
              <Button 
                onClick={() => editor?.changeImageFilter(filter)}
                key={filter} 
                variant="secondary" 
                className="w-full h-16 justify-start text-left"
              >
                {filter}
              </Button>
            ))
          }
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
