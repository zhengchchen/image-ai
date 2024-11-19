import { ChromePicker, CirclePicker } from "react-color";

import { colors } from "@/features/editor/types";
import { rgbaObjectToString } from "@/features/editor/utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
        className="border rounded-lg"
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          console.log("color", color);
          const formattedValue = rgbaObjectToString(color.rgb);
          console.log("formattedValue", formattedValue);
          onChange(formattedValue);
        }}
      />
    </div>
  );
};
