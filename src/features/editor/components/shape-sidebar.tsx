import { ActiveTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-siderbar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShapeTool } from "./shape-tool";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";

interface ShapeSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSidebar = ({ activeTool, onChangeActiveTool }: ShapeSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative z-[40] w-[360px] flex flex-col h-full border-r",
        activeTool === "shapes" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Shapes" description="Add shapes to your canvas" />
      <ScrollArea className="h-full">
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool onClick={() => {}} icon={FaCircle} />
          <ShapeTool onClick={() => {}} icon={FaSquare} />
          <ShapeTool onClick={() => {}} icon={FaSquareFull} />
          <ShapeTool onClick={() => {}} icon={IoTriangle} />
          <ShapeTool onClick={() => {}} icon={IoTriangle} iconClassName="rotate-180" />
          <ShapeTool onClick={() => {}} icon={FaDiamond} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
