"use client";

import { CreditCard, Crown, Home, MessageCircleQuestion } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { SidebarItem } from "./sidebar-item";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const { shouldBlock, triggerPaywall } = usePaywall();

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }
  };

  return (
    <div className="flex flex-col gap-y-4 flex-1">
      <div className="px-3">
        <Button
          onClick={onClick}
          className="w-full rounded-xl border-none bg-white hover:bg-white hover:opacity-75 transition"
          variant="outline"
          size="lg"
        >
          <Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
          Upgrade to Image AI Pro
        </Button>
      </div>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem href="/" icon={Home} label="Home" isActive={pathname === "/"} />
      </ul>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem href={pathname} icon={CreditCard} label="Billing" onClick={() => {}} />
        <SidebarItem href="mailto:275781239@qq.com" icon={MessageCircleQuestion} label="Get Help" />
      </ul>
    </div>
  );
};
