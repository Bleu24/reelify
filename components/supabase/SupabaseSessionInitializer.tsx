"use client";

import type React from "react";

import * as ReactLib from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/supabase";

type Props = {
  children: React.ReactNode;
};

/** Ensure there is a Supabase session (email/password, etc.) and gate the app behind sign-in. */
export function SupabaseSessionInitializer({ children }: Props): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isReady, setIsReady] = ReactLib.useState(false);

  ReactLib.useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const isAuthRoute = pathname.startsWith("/auth");
    if (isAuthRoute) {
      setIsReady(true);
      return;
    }

    setIsReady(false);

    const ensureSession = async (): Promise<void> => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("supabase.auth.getSession failed", error);
      }

      if (!data.session) {
        const qp = searchParams.toString();
        const next = `${pathname}${qp ? `?${qp}` : ""}`;
        router.replace(`/auth/sign-in?next=${encodeURIComponent(next)}`);
        return;
      }

      setIsReady(true);
    };

    void ensureSession();
  }, [pathname, router, searchParams]);

  if (!isReady) {
    return <div className="text-sm text-white/60">Initializing…</div>;
  }

  return <>{children}</>;
}
