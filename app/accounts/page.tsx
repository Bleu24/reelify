"use client";

import type React from "react";

import Link from "next/link";

import * as ReactLib from "react";

import { PageHeader } from "@/components/PageHeader";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { SafetyModeBadge } from "@/components/SafetyModeBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { listAccounts } from "@/lib/features/accounts/accountsData";
import type { Account } from "@/lib/types";
import { cn } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@/lib/supabase";

function getConnectErrorLabel(code: string | null): string | null {
  if (!code) return null;

  switch (code) {
    case "oauth_state":
      return "TikTok OAuth failed (state mismatch). Try again.";
    case "no_session":
      return "You must be signed in to connect a TikTok account.";
    case "save_account":
      return "Connected to TikTok but failed to save the account in Supabase.";
    case "save_token":
      return "Connected to TikTok but failed to save the token in Supabase.";
    case "oauth_exchange":
      return "TikTok OAuth failed during token exchange or profile fetch. Try again.";
    case "oauth_verifier":
      return "TikTok OAuth failed (missing PKCE verifier). Try again.";
    default:
      return "TikTok connect failed. Try again.";
  }
}

const AccountsPage = (): React.ReactElement => {
  const [accounts, setAccounts] = ReactLib.useState<Account[]>([]);
  const [isLoading, setIsLoading] = ReactLib.useState(true);
  const [loadError, setLoadError] = ReactLib.useState<string | null>(null);
  const [lastAddedAccountId, setLastAddedAccountId] = ReactLib.useState<string | null>(null);

  ReactLib.useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const load = async (): Promise<void> => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const rows = await listAccounts(supabase);
        setAccounts(rows);

        const url = new URL(window.location.href);
        const connected = url.searchParams.get("connected");
        const accountId = url.searchParams.get("account_id");

        if (connected === "1") {
          if (accountId) {
            setLastAddedAccountId(accountId);
          } else if (rows[0]) {
            setLastAddedAccountId(rows[0].id);
          }
        }
      } catch (e) {
        setLoadError(e instanceof Error ? e.message : "Failed to load accounts.");
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const connectError = ReactLib.useMemo(() => {
    if (typeof window === "undefined") return null;
    const url = new URL(window.location.href);
    return getConnectErrorLabel(url.searchParams.get("connect_error"));
  }, []);

  return (
    <div>
      <PageHeader
        title="Accounts"
        description="Connected TikTok account profiles (Supabase)."
        actions={
          <div className="flex flex-col items-end gap-2">
            <Button asChild variant="gradient">
              <Link href="/auth/tiktok?next=/accounts">
                <TikTokIcon className="h-4 w-4" />
                Connect TikTok
              </Link>
            </Button>
            {connectError ? (
              <div className="text-xs text-pink-300/90">{connectError}</div>
            ) : null}
          </div>
        }
      />

      {isLoading ? (
        <div className="text-sm text-white/60">Loading…</div>
      ) : loadError ? (
        <div className="text-sm text-pink-300/90">{loadError}</div>
      ) : accounts.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="font-display">No connected accounts</CardTitle>
            <CardDescription>
              Click “Connect TikTok” to add your first account.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {accounts.map((a) => (
            <Card
              key={a.id}
              className={cn(
                lastAddedAccountId === a.id &&
                  "ring-1 ring-pink-500/30 shadow-[0_0_24px_rgba(255,0,80,0.10)]"
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="font-display">{a.displayName}</CardTitle>
                    <CardDescription>{a.handle}</CardDescription>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <SafetyModeBadge mode={a.safetyMode} />
                    <StatusBadge status={a.status} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Niche</span>
                    <span className="text-white/90">{a.niche || "—"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountsPage;
