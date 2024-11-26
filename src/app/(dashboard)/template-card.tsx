import Image from "next/image";

import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

interface TemplateCardProps {
  imageSrc: string;
  title: string;
  onClick: (title: string) => void;
  description: string;
  width: number;
  height: number;
  isPro: boolean | null;
  disabled?: boolean;
}

export const TemplateCard = ({
  imageSrc,
  title,
  onClick,
  description,
  width,
  height,
  isPro,
  disabled,
}: TemplateCardProps) => {
  return (
    <button
      onClick={() => onClick(title)}
      disabled={disabled}
      className={cn(
        "space-y-2 group text-left transition flex flex-col",
        disabled ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
      )}
    >
      <div
        className="relative rounded-xl h-full w-full overflow-hidden border"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image fill src={imageSrc} alt={title} className="object-cover transition transform group-hover:scale-105" />
        {isPro && (
          <div className="absolute top-2 right-2 h-10 w-10 flex items-center justify-center bg-black/50 rounded-full z-[10]">
            <Crown className="size-5 text-yellow-500 fill-yellow-500" />
          </div>
        )}
        <div className="opacity-0 group-hover:opacity-100 transition absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl backdrop-filter backdrop-blur-sm">
          <p className="font-medium text-white">Open in editor</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-75 transition">{description}</p>
      </div>
    </button>
  );
};
