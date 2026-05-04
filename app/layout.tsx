import type React from "react";

import type { Metadata } from "next";
import { Inter, Spline_Sans } from "next/font/google";

import "@/app/globals.css";

import { Sidebar } from "@/components/Sidebar";
import { SupabaseSessionInitializer } from "@/components/supabase/SupabaseSessionInitializer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const splineSans = Spline_Sans({ subsets: ["latin"], variable: "--font-spline" });

export const metadata: Metadata = {
  title: "Reelify",
  description: "Mock-only dashboard for automating short-form content."
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props): React.ReactElement => {
  return (
    <html lang="en" className="dark">
      <body
        className={[
          inter.variable,
          splineSans.variable,
          "min-h-screen font-sans antialiased",
          "bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(255,0,80,0.12),transparent_45%),radial-gradient(1000px_circle_at_80%_10%,rgba(189,0,255,0.10),transparent_40%),radial-gradient(900px_circle_at_60%_80%,rgba(0,242,234,0.08),transparent_45%)]"
        ].join(" ")}
      >
        <div className="grid min-h-screen grid-cols-[260px_1fr]">
          <Sidebar />
          <main className="p-6">
            <div className="mx-auto w-full max-w-[1200px]">
              <SupabaseSessionInitializer>{children}</SupabaseSessionInitializer>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
