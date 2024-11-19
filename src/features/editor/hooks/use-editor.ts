import { fabric } from "fabric";
import { useCallback, useState, useMemo } from "react";

import { useAutoResize } from "@/features/editor/hooks/use-auto-resize";
import { useCanvasEvents } from "@/features/editor/hooks/use-canvas-events";

import {
  Editor,
  BuildEditorProps,
  CIRCLE_OPTIONS,
  TEXT_OPTIONS,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS,
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_WIDTH,
  EditorHookProps,
  STROKE_DASH_ARRAY,
  DIAMOND_OPTIONS,
  FONT_FAMILY,
  FONT_WEIGHT,
  FONT_SIZE,
} from "@/features/editor/types";
import { createFilter, isTextType } from "@/features/editor/utils";
import { useClipboard } from "./use-clipboard";

const buildEditor = ({
  autoZoom,
  copy,
  paste,
  canvas,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  fontFamily,
  setFontFamily,
  strokeDashArray,
  setStrokeWidth,
  setStrokeDashArray,
  selectedObjects,
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === "clip");
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();
    if (!center) return;
    //@ts-ignore
    canvas._centerObject(object, center);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    getWorkspace,
    changeSize: (size: { width: number; height: number }) => {
      const workspace = getWorkspace();
      workspace?.set(size);
      canvas.renderAll();
    },
    changeBackground: (color: string) => {
      const workspace = getWorkspace();
      workspace?.set({ fill: color });
      canvas.renderAll();
    },
    enableDrawingMode: () => {
      canvas.discardActiveObject();
      canvas.renderAll();
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = strokeColor;
      canvas.freeDrawingBrush.width = strokeWidth;
    },
    disableDrawingMode: () => {
      canvas.isDrawingMode = false;
    },
    onCopy: copy,
    onPaste: paste,
    changeImageFilter: (value: string) => {
      const objects = canvas.getActiveObjects();
      objects.forEach((object) => {
        if (object.type === "image") {
          const imgaeObject = object as fabric.Image;

          const effect = createFilter(value);
          imgaeObject.filters = effect ? [effect] : [];

          imgaeObject.applyFilters();
        }
      });
      canvas.renderAll();
    },
    addImage: (value: string) => {
      fabric.Image.fromURL(
        value,
        (image) => {
          const workspace = getWorkspace();

          image.scaleToWidth(workspace?.width || 0);
          image.scaleToHeight(workspace?.height || 0);

          addToCanvas(image);
        },
        {
          crossOrigin: "anonymous",
        }
      );
    },
    delete: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.remove(object);
      });
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    addText: (value, options) => {
      const object = new fabric.Textbox(value, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options,
      });
      addToCanvas(object);
    },
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.bringForward(object);
      });
      canvas.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    sendBackwards: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.sendBackwards(object);
      });
      canvas.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    changeOpacity: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity: value });
      });
      canvas.renderAll();
    },
    changeFontSize: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          //@ts-ignore
          object.set({ fontSize: value });
        }
      });
      canvas.renderAll();
    },
    changeFontLinethrough: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          //@ts-ignore
          object.set({ linethrough: value });
        }
      });
      canvas.renderAll();
    },
    changeFontUnderline: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          //@ts-ignore
          object.set({ underline: value });
        }
      });
      canvas.renderAll();
    },
    changeFontStyle: (value: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          //@ts-ignore
          object.set({ fontStyle: value });
        }
      });
      canvas.renderAll();
    },
    changeFontWeight: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          //@ts-ignore
          object.set({ fontWeight: value });
        }
      });
      canvas.renderAll();
    },
    changeTextAlign: (value: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          //@ts-ignore
          object.set({ textAlign: value });
        }
      });
      canvas.renderAll();
    },
    changeFontFamily: (value: string) => {
      setFontFamily(value);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          //@ts-ignore
          object.set({ fontFamily: value });
        }
      });
      canvas.renderAll();
    },
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value });
      });
      canvas.renderAll();
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((object) => {
        // text objects don't have stroke property
        if (isTextType(object.type)) {
          object.set({ fill: value });
          return;
        }
        object.set({ stroke: value });
      });
      canvas.freeDrawingBrush.color = value;
      canvas.renderAll();
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value });
      });
      canvas.freeDrawingBrush.width = value;
      canvas.renderAll();
    },
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });
      canvas.renderAll();
    },
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(object);
    },
    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 10,
        ry: 10,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(object);
    },
    addInverseTriangle: () => {
      const WIDTH = TRIANGLE_OPTIONS.width;
      const HEIGHT = TRIANGLE_OPTIONS.height;
      const object = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        }
      );
      addToCanvas(object);
    },
    addDiamond: () => {
      const WIDTH = DIAMOND_OPTIONS.width;
      const HEIGHT = DIAMOND_OPTIONS.height;
      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        }
      );
      addToCanvas(object);
    },
    canvas,
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return 1;
      }

      const value = selectedObject.get("opacity") || 1;
      return value as number;
    },
    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return FONT_SIZE;
      }
      //@ts-ignore
      const value = selectedObject.get("fontSize") || FONT_SIZE;
      return value;
    },
    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return "normal";
      }
      //@ts-ignore
      const value = selectedObject.get("fontStyle") || "normal";
      return value;
    },
    getActiveFontLinethrough: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return false;
      }
      //@ts-ignore
      const value = selectedObject.get("linethrough") || false;
      return value;
    },
    getActiveFontUnderline: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return false;
      }
      //@ts-ignore
      const value = selectedObject.get("underline") || false;
      return value;
    },
    getActiveTextAlign: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return "left";
      }
      //@ts-ignore
      const value = selectedObject.get("textAlign") || "left";
      return value;
    },
    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return FONT_WEIGHT;
      }
      //@ts-ignore
      const value = selectedObject.get("fontWeight") || FONT_WEIGHT;
      return value;
    },
    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return fontFamily;
      }
      //@ts-ignore
      const value = selectedObject.get("fontFamily") || fontFamily;
      return value as string;
    },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return fillColor;
      }

      const value = selectedObject.get("fill") || fillColor;
      return value as string;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return strokeColor;
      }

      const value = selectedObject.get("stroke") || strokeColor;
      return value as string;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return strokeWidth;
      }

      const value = selectedObject.get("strokeWidth") || strokeWidth;
      return value as number;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return strokeDashArray;
      }

      const value = selectedObject.get("strokeDashArray") || strokeDashArray;
      return value as number[];
    },
    selectedObjects,
  };
};

export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fontFamily, setFontFamily] = useState(FONT_FAMILY);
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);

  const { autoZoom } = useAutoResize({
    canvas,
    container,
  });

  useCanvasEvents({ canvas, setSelectedObjects, clearSelectionCallback });

  const { copy, paste } = useClipboard({ canvas });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        autoZoom,
        copy,
        paste,
        canvas,
        fillColor,
        setFillColor,
        strokeColor,
        strokeDashArray,
        setStrokeColor,
        strokeWidth,
        fontFamily,
        setStrokeWidth,
        setStrokeDashArray,
        selectedObjects,
        setFontFamily,
      });
    }
    return undefined;
  }, [
    autoZoom,
    copy,
    paste,
    canvas,
    fillColor,
    strokeColor,
    strokeDashArray,
    strokeWidth,
    fontFamily,
    selectedObjects,
  ]);

  const init = useCallback(
    ({ initialCanvas, initialContainer }: { initialCanvas: fabric.Canvas; initialContainer: HTMLDivElement }) => {
      fabric.Object.prototype.set({
        cornerColor: "FFF",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0, 0, 0, 0.8),",
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    []
  );
  return { init, editor };
};
