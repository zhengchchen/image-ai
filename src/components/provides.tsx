"use client";

import { QueryProviders } from "./query-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <QueryProviders>{children}</QueryProviders>;
}
