'use client'

import "./globals.css";
import { Suspense, ReactNode, useState, useEffect } from "react";
import { ThemeProvider } from "../components/theme-provider";
import { Space_Grotesk } from "next/font/google";
import Loading from "@/components/loading";

// Initialize Google font
const font = Space_Grotesk({
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [mounted, setMounted] = useState(false);

  // This useEffect hook ensures that we only apply client-specific logic after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted yet, return nothing to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <html lang="en">
      <body
        className={`${font.className} bg-background min-h-screen flex flex-col overflow-y-auto`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<Loading />}>
            {/* Allow the content area to scroll */}
            <div className="flex-1 overflow-auto">{children}</div>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
