import { createServerClient, type CookieOptions } from "@supabase/ssr";

import { getSupabasePublicEnv } from "@/lib/supabase/env";

export type CookieToGet = { name: string; value: string };
export type CookieToSet = { name: string; value: string; options: CookieOptions };

export type ServerCookieMethods = {
  getAll: () => CookieToGet[];
  setAll: (cookies: CookieToSet[]) => void;
};

/**
 * Create a Supabase client for server environments that can read/write auth cookies.
 *
 * In Next.js route handlers you typically wire `getAll`/`setAll` to your cookies/response.
 */
export function createSupabaseServerClient(cookieMethods: ServerCookieMethods) {
  const { url, key } = getSupabasePublicEnv();

  return createServerClient(url, key, {
    cookies: cookieMethods
  });
}
