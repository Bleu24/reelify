import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase";
import { buildTikTokAuthorizeUrl } from "@/lib/features/tiktok/tiktokOAuth";
import { generateOAuthState, generatePkcePair } from "@/lib/features/tiktok/pkce";

const STATE_COOKIE = "reelify_tiktok_oauth_state";
const VERIFIER_COOKIE = "reelify_tiktok_code_verifier";
const NEXT_COOKIE = "reelify_tiktok_oauth_next";

type CookieToSet = { name: string; value: string; options: Parameters<NextResponse["cookies"]["set"]>[2] };

function applyCookies(res: NextResponse, cookiesToSet: CookieToSet[]): void {
  cookiesToSet.forEach(({ name, value, options }) => {
    res.cookies.set(name, value, options);
  });
}

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const next = url.searchParams.get("next") ?? "/accounts";

  const cookieStore = await cookies();
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
    const afterSignIn = new URL("/auth/tiktok", url);
    afterSignIn.searchParams.set("next", next);

    const signInUrl = new URL("/auth/sign-in", url);
    signInUrl.searchParams.set("next", `${afterSignIn.pathname}?${afterSignIn.searchParams.toString()}`);

    const res = NextResponse.redirect(signInUrl);
    applyCookies(res, cookiesToSet);
    return res;
  }

  const state = generateOAuthState();
  const { verifier, challenge } = generatePkcePair();

  const authorizeUrl = buildTikTokAuthorizeUrl({
    state,
    codeChallenge: challenge,
    scopes: ["user.info.basic"],
  });

  const res = NextResponse.redirect(authorizeUrl);
  applyCookies(res, cookiesToSet);

  // Short-lived, HTTP-only cookies to validate the callback.
  res.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });
  res.cookies.set(VERIFIER_COOKIE, verifier, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });
  res.cookies.set(NEXT_COOKIE, next, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });

  return res;
}
