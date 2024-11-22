import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

import { Inter } from "next/font/google";

import { Providers } from "@/components/provides";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Image AI",
  description: "Image AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
