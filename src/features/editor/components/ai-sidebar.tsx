import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useGenerateImage } from "@/features/ai/api/use-generate-image";
import { useState } from "react";

interface AiSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AiSidebar = ({ editor, activeTool, onChangeActiveTool }: AiSidebarProps) => {
  const [value, setValue] = useState("");

  const mutation = useGenerateImage();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      { prompt: value },
      {
        // @ts-ignore
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
      }
    );
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative z-[40] w-[360px] flex flex-col h-full border-r",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate a image using AI" />
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <Textarea
              disabled={mutation.isPending}
              placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
              cols={30}
              rows={10}
              required
              minLength={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button disabled={mutation.isPending} type="submit" className="w-full">
              Generate
            </Button>
          </form>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
