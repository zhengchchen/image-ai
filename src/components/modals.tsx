"use client";

import { useState, useEffect } from "react";

import { SubscriptionModal } from "@/features/subscriptions/components/subscription-modal";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SubscriptionModal />
    </>
  );
};
