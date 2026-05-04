import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase";
import {
  exchangeTikTokCodeForToken,
  fetchTikTokUserProfile
} from "@/lib/features/tiktok/tiktokOAuth";

const STATE_COOKIE = "reelify_tiktok_oauth_state";
const VERIFIER_COOKIE = "reelify_tiktok_code_verifier";
const NEXT_COOKIE = "reelify_tiktok_oauth_next";

type CookieToSet = { name: string; value: string; options: Parameters<NextResponse["cookies"]["set"]>[2] };

function getRedirectPath(rawNext: string | null): string {
  if (!rawNext) return "/accounts";
  return rawNext.startsWith("/") ? rawNext : "/accounts";
}

function buildAccountsErrorRedirect(requestUrl: URL, code: string): NextResponse {
  return NextResponse.redirect(new URL(`/accounts?connect_error=${encodeURIComponent(code)}`, requestUrl));
}

export async function GET(request: Request): Promise<NextResponse> {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");

  const cookieStore = await cookies();
  const expectedState = cookieStore.get(STATE_COOKIE)?.value;
  const codeVerifier = cookieStore.get(VERIFIER_COOKIE)?.value;
  const next = getRedirectPath(cookieStore.get(NEXT_COOKIE)?.value ?? null);

  // Always clear temporary cookies.
  cookieStore.delete(STATE_COOKIE);
  cookieStore.delete(VERIFIER_COOKIE);
  cookieStore.delete(NEXT_COOKIE);

  if (!code || !state || !expectedState || state !== expectedState) {
    return buildAccountsErrorRedirect(requestUrl, "oauth_state");
  }

  if (!codeVerifier) {
    return buildAccountsErrorRedirect(requestUrl, "oauth_verifier");
  }

  const cookiesToSet: CookieToSet[] = [];

  const supabase = createSupabaseServerClient({
    getAll: () => cookieStore.getAll().map((c) => ({ name: c.name, value: c.value })),
    setAll: (cs) => {
      cs.forEach(({ name, value, options }) => {
        cookiesToSet.push({ name, value, options });
      });
    },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    const signInUrl = new URL("/auth/sign-in", requestUrl);
    signInUrl.searchParams.set("next", next);

    const res = NextResponse.redirect(signInUrl);
    cookiesToSet.forEach(({ name, value, options }) => {
      res.cookies.set(name, value, options);
    });
    return res;
  }

  let token: Awaited<ReturnType<typeof exchangeTikTokCodeForToken>>;
  let profile: Awaited<ReturnType<typeof fetchTikTokUserProfile>>;

  try {
    token = await exchangeTikTokCodeForToken({
      code,
      codeVerifier,
    });

    profile = await fetchTikTokUserProfile(token.access_token);
  } catch (e) {
    console.error("TikTok OAuth exchange/profile failed", e);
    return buildAccountsErrorRedirect(requestUrl, "oauth_exchange");
  }

  // Store the connected TikTok account profile.
  // NOTE: This assumes you have created the `public.tiktok_accounts` table.
  const { data: accountRow, error: accountError } = await supabase
    .from("tiktok_accounts")
    .upsert(
      {
        user_id: userData.user.id,
        tiktok_open_id: profile.openId,
        handle: profile.username ? `@${profile.username}` : "@tiktok",
        display_name: profile.displayName ?? "TikTok Account",
        avatar_url: profile.avatarUrl ?? null,
        status: "active",
        safety_mode: "draft",
        niche: "",
      },
      { onConflict: "user_id,tiktok_open_id" }
    )
    .select("id")
    .single();

  if (accountError || !accountRow) {
    console.error("Failed to upsert tiktok_accounts", accountError);
    return buildAccountsErrorRedirect(requestUrl, "save_account");
  }

  // Store token data in a write-only table (no select policy).
  // NOTE: This assumes you have created the `public.tiktok_tokens` table.
  const expiresAt =
    typeof token.expires_in === "number"
      ? new Date(Date.now() + token.expires_in * 1000).toISOString()
      : null;

  const { error: tokenError } = await supabase.from("tiktok_tokens").upsert(
    {
      tiktok_account_id: accountRow.id,
      access_token: token.access_token,
      refresh_token: token.refresh_token ?? null,
      scope: token.scope ?? null,
      expires_at: expiresAt,
    },
    { onConflict: "tiktok_account_id" }
  );

  if (tokenError) {
    console.error("Failed to upsert tiktok_tokens", tokenError);
    return buildAccountsErrorRedirect(requestUrl, "save_token");
  }

  const redirectUrl = new URL(next, requestUrl);
  redirectUrl.searchParams.set("connected", "1");
  redirectUrl.searchParams.set("account_id", accountRow.id);

  const res = NextResponse.redirect(redirectUrl);
  cookiesToSet.forEach(({ name, value, options }) => {
    res.cookies.set(name, value, options);
  });
  return res;
}
