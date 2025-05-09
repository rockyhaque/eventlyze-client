import type React from "react";
import type { Metadata } from "next";
import { Mona_Sans as FontSans } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Eventify - Event Planner & Participation System",
  description: "Discover, create, and join amazing events",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="bottom-right" richColors />
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1 min-h-screen">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
