import { RGBColor } from "react-color";

export function isTextType(type: string | undefined) {
  return type === "text" || type === "itext" || type === "textbox";
}

export function rgbaObjectToString(rgba: RGBColor | "transparent") {
  if (rgba === "transparent") return `rgba(0, 0, 0, 0)`;
  const alpha = rgba.a || 1;
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
}
