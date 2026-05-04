"use client";

import type React from "react";

import * as ReactLib from "react";

import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/supabase";

type Props = {
  children: React.ReactNode;
};

/** Ensure there is a Supabase session (email/password, etc.) and gate the app behind sign-in. */
export function SupabaseSessionInitializer({ children }: Props): React.ReactElement {
  const router = useRouter();

  const [isReady, setIsReady] = ReactLib.useState(false);

  ReactLib.useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const ensureSession = async (): Promise<void> => {
      const pathname = window.location.pathname;
      const isAuthRoute = pathname.startsWith("/auth");
      if (isAuthRoute) {
        setIsReady(true);
        return;
      }

      setIsReady(false);

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("supabase.auth.getSession failed", error);
      }

      if (!data.session) {
        const next = `${window.location.pathname}${window.location.search}`;
        router.replace(`/auth/sign-in?next=${encodeURIComponent(next)}`);
        return;
      }

      setIsReady(true);
    };

    void ensureSession();
  }, [router]);

  if (!isReady) {
    return <div className="text-sm text-white/60">Initializing…</div>;
  }

  return <>{children}</>;
}
