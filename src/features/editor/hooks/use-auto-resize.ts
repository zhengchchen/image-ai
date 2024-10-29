import { fabric } from "fabric";
import { useCallback, useEffect } from "react";

interface UseAutoResize {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
}

export const useAutoResize = ({ canvas, container }: UseAutoResize) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.setWidth(width);
    canvas.setHeight(height);

    const center = canvas.getCenter();
    const zoomRatio = 0.85;

    const localWorkspace = canvas.getObjects().find((obj) => obj.name === "clip");

    // @ts-expect-error TODO
    const scale = fabric.util.findScaleToFit(localWorkspace, {
      width,
      height,
    });

    const zoom = scale * zoomRatio;
    canvas.setViewportTransform(fabric.iMatrix.concat());
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);
    if (!localWorkspace) return;

    const workspaceCenter = localWorkspace.getCenterPoint();
    const viewTransform = canvas.viewportTransform;

    if (canvas.width === undefined || canvas.height === undefined || !viewTransform) {
      return;
    }

    viewTransform[4] = canvas.width / 2 - workspaceCenter.x * viewTransform[0];
    viewTransform[5] = canvas.height / 2 - workspaceCenter.y * viewTransform[3];

    canvas.setViewportTransform(viewTransform);

    localWorkspace.clone((cloned: fabric.Rect) => {
      canvas.clipPath = cloned;
      canvas.requestRenderAll();
    });
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;
    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom();
      });
      resizeObserver.observe(container);
    }
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [canvas, container, autoZoom]);
};
