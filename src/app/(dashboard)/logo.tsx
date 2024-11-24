import Link from "next/link";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-2 hover:opacity-75 transition h-[68px] px-4">
        <div className="size-8 relative">
          <Image src="/logo.svg" alt="Image AI" fill />
        </div>
        <h1 className={cn("text-xl font-bold", font.className)}>Image AI</h1>
      </div>
    </Link>
  );
};
