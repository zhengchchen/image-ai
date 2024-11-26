import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

import { Inter } from "next/font/google";

import { Providers } from "@/components/provides";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Modals } from "@/components/modals";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Image AI",
  description: "Image AI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <Toaster />
            <Modals />
            {children}
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
