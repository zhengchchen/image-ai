import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-siderbar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useGenerateImage } from "@/features/ai/api/use-generate-image";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useRemoveBackground } from "@/features/ai/api/use-remove-background";

interface RemoveBgSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const RemoveBgSidebar = ({ editor, activeTool, onChangeActiveTool }: RemoveBgSidebarProps) => {
  const mutation = useRemoveBackground();

  const selectedObject = editor?.selectedObjects[0];
  // @ts-ignore
  const imageSrc = selectedObject?._originalElement?.currentSrc;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onClick = () => {
    mutation.mutate(
      {
        image: imageSrc,
      },
      {
        // @ts-ignore
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
      }
    );
  };

  return (
    <aside
      className={cn(
        "bg-white relative z-[40] w-[360px] flex flex-col h-full border-r",
        activeTool === "remove-bg" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Background Removal" description="Remove background from image using AI" />
      {!imageSrc && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Feature not available for this object</p>
        </div>
      )}
      {imageSrc && (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div
              className={cn(
                "relative aspect-square rounded-md overflow-hidden transition bg-muted",
                false && "opacity-50"
              )}
            >
              <Image src={imageSrc} alt="image" fill className="object-cover" />
            </div>
            <Button onClick={onClick} className="w-full">
              Remove Background
            </Button>
          </div>
        </ScrollArea>
      )}
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
