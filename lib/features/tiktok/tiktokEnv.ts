export type TikTokOAuthEnv = {
  clientKey: string;
  clientSecret: string;
  redirectUri: string;
};

const CLIENT_KEY_ENV = "TIKTOK_CLIENT_KEY" as const;
const CLIENT_SECRET_ENV = "TIKTOK_CLIENT_SECRET" as const;
const REDIRECT_URI_ENV = "TIKTOK_REDIRECT_URI" as const;

/** Read and validate the server-only env vars needed for TikTok OAuth. */
export function getTikTokOAuthEnv(): TikTokOAuthEnv {
  const clientKey = process.env[CLIENT_KEY_ENV];
  const clientSecret = process.env[CLIENT_SECRET_ENV];
  const redirectUri = process.env[REDIRECT_URI_ENV];

  const missing: string[] = [];
  if (!clientKey) missing.push(CLIENT_KEY_ENV);
  if (!clientSecret) missing.push(CLIENT_SECRET_ENV);
  if (!redirectUri) missing.push(REDIRECT_URI_ENV);

  if (missing.length > 0) {
    throw new Error(
      [
        "TikTok OAuth env is missing.",
        `Set: ${missing.join(", ")}.`,
        "Tip: copy `.env.example` to `.env.local`.",
      ].join(" ")
    );
  }

  return {
    clientKey: clientKey!,
    clientSecret: clientSecret!,
    redirectUri: redirectUri!,
  };
}
