"use client";

import type React from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import * as ReactLib from "react";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signInWithEmailPassword } from "@/lib/features/auth/supabaseAuth";
import { createSupabaseBrowserClient } from "@/lib/supabase";

function getSafeNextPath(rawNext: string | null): string {
  if (!rawNext) return "/dashboard";
  return rawNext.startsWith("/") ? rawNext : "/dashboard";
}

const SignInPage = (): React.ReactElement => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = ReactLib.useState("");
  const [password, setPassword] = ReactLib.useState("");
  const [isSubmitting, setIsSubmitting] = ReactLib.useState(false);
  const [error, setError] = ReactLib.useState<string | null>(null);

  const nextPath = ReactLib.useMemo(() => {
    return getSafeNextPath(searchParams.get("next"));
  }, [searchParams]);

  const onSubmit = async (e: ReactLib.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      await signInWithEmailPassword(supabase, { email, password });
      router.replace(nextPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sign in"
        description="Sign in to connect TikTok accounts and persist data."
      />

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle className="font-display">Welcome back</CardTitle>
          <CardDescription>Use your email and password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm text-white/80" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/80" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error ? <div className="text-sm text-pink-300/90">{error}</div> : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" variant="gradient" disabled={isSubmitting}>
                {isSubmitting ? "Signing in…" : "Sign in"}
              </Button>

              <div className="text-sm text-white/60">
                No account?{" "}
                <Link className="text-white/90 underline underline-offset-4" href={`/auth/sign-up?next=${encodeURIComponent(nextPath)}`}>
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
