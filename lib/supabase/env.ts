export type SupabasePublicEnv = {
  url: string;
  key: string;
};

const URL_ENV = "NEXT_PUBLIC_SUPABASE_URL" as const;
const PUBLISHABLE_KEY_ENV = "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY" as const;
const ANON_KEY_ENV = "NEXT_PUBLIC_SUPABASE_ANON_KEY" as const;

/** Read and validate the public Supabase env vars needed to create a client. */
export function getSupabasePublicEnv(): SupabasePublicEnv {
  const url = process.env[URL_ENV];
  const publishableKey = process.env[PUBLISHABLE_KEY_ENV];
  const anonKey = process.env[ANON_KEY_ENV];

  const key = publishableKey ?? anonKey;

  const missing: string[] = [];
  if (!url) missing.push(URL_ENV);
  if (!key) missing.push(`${PUBLISHABLE_KEY_ENV} (preferred) or ${ANON_KEY_ENV}`);

  if (missing.length > 0) {
    throw new Error(
      [
        "Supabase env is missing.",
        `Set: ${missing.join(", ")}.`,
        "Tip: copy `.env.example` to `.env.local`.",
      ].join(" ")
    );
  }

  return { url: url!, key: key! };
}
