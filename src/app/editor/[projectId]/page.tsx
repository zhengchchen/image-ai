"use client";

import { fabric } from "fabric";

import { useEditor } from "@/features/editor/hooks/use-editor";
import { useEffect, useRef } from "react";

const EditorProjectIdPage = () => {
  const { init } = useEditor();

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <div className="h-full flex-1 bg-muted" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default EditorProjectIdPage;
