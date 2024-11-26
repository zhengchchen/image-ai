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
  title: "Image AI - AI-Powered Image Editor & Generator",
  description:
    "Transform your images with AI magic. Create, edit, and enhance photos with advanced AI filters, one-click beautification, and AI image generation.",
  keywords: "AI image editor, online photo editor, AI filters, image generation, photo enhancement",
  openGraph: {
    title: "ImageGicAI - AI-Powered Image Editor & Generator",
    description: "Transform your images with AI magic",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ImageGicAI - AI-Powered Image Editor",
    description: "Transform your images with AI magic",
  },
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
