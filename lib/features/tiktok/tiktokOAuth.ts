import { getTikTokOAuthEnv } from "@/lib/features/tiktok/tiktokEnv";

type TikTokAuthorizeParams = {
  state: string;
  codeChallenge?: string;
  scopes: string[];
};

export type TikTokTokenResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
  open_id?: string;
};

type TikTokErrorPayload = {
  code?: string | number;
  message?: string;
  log_id?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function formatTikTokError(error: TikTokErrorPayload | unknown): string {
  if (!isRecord(error)) return "Unknown TikTok error";
  const code = "code" in error ? String(error.code ?? "") : "";
  const message = "message" in error ? String(error.message ?? "") : "";
  const logId = "log_id" in error ? String(error.log_id ?? "") : "";

  const parts = [code && `code=${code}`, message && message, logId && `log_id=${logId}`].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "Unknown TikTok error";
}

function extractTikTokTokenResponse(json: unknown): TikTokTokenResponse {
  // Common shapes:
  // 1) { access_token: "...", ... }
  // 2) { data: { access_token: "...", ... }, error: { ... }? }
  if (!isRecord(json)) {
    throw new Error("TikTok token exchange returned a non-object payload.");
  }

  if ("error" in json && json.error) {
    throw new Error(`TikTok token exchange returned an error: ${formatTikTokError(json.error)}`);
  }

  if ("access_token" in json && typeof json.access_token === "string") {
    return json as TikTokTokenResponse;
  }

  if ("data" in json && isRecord(json.data)) {
    const data = json.data;
    if ("error" in data && data.error) {
      throw new Error(`TikTok token exchange returned an error: ${formatTikTokError(data.error)}`);
    }
    if ("access_token" in data && typeof data.access_token === "string") {
      return data as TikTokTokenResponse;
    }
  }

  throw new Error("TikTok token exchange returned an unexpected payload.");
}

function buildQuery(params: Record<string, string>): string {
  const usp = new URLSearchParams(params);
  return usp.toString();
}

/** Build the TikTok Login Kit authorization URL (OAuth 2.0). */
export function buildTikTokAuthorizeUrl(params: TikTokAuthorizeParams): string {
  const { clientKey, redirectUri } = getTikTokOAuthEnv();

  // TikTok Login Kit (Web) authorization endpoint.
  // If TikTok changes their endpoints, update here.
  const base = "https://www.tiktok.com/v2/auth/authorize/";

  const query: Record<string, string> = {
    client_key: clientKey,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: params.scopes.join(","),
    state: params.state,
  };

  if (params.codeChallenge) {
    query.code_challenge = params.codeChallenge;
    query.code_challenge_method = "S256";
  }

  return `${base}?${buildQuery(query)}`;
}

type ExchangeCodeParams = {
  code: string;
  codeVerifier?: string;
};

/** Exchange the OAuth `code` for tokens using TikTok's token endpoint. */
export async function exchangeTikTokCodeForToken(
  params: ExchangeCodeParams
): Promise<TikTokTokenResponse> {
  const { clientKey, clientSecret, redirectUri } = getTikTokOAuthEnv();

  // TikTok token endpoint.
  const tokenUrl = "https://open.tiktokapis.com/v2/oauth/token/";

  const body = new URLSearchParams({
    client_key: clientKey,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code: params.code,
    redirect_uri: redirectUri,
  });

  if (params.codeVerifier) {
    body.set("code_verifier", params.codeVerifier);
  }

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TikTok token exchange failed: ${res.status} ${text}`);
  }

  const json = (await res.json()) as unknown;
  return extractTikTokTokenResponse(json);
}

export type TikTokUserProfile = {
  openId: string;
  displayName?: string;
  avatarUrl?: string;
  username?: string;
};

/** Fetch basic user profile from TikTok Open API (requires `user.info.basic`). */
export async function fetchTikTokUserProfile(
  accessToken: string
): Promise<TikTokUserProfile> {
  // TikTok user info endpoint.
  const url = new URL("https://open.tiktokapis.com/v2/user/info/");
  url.searchParams.set(
    "fields",
    ["open_id", "display_name", "avatar_url", "username"].join(",")
  );

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TikTok user info failed: ${res.status} ${text}`);
  }

  const json = (await res.json()) as unknown;

  // Expected shape (loosely): { data: { user: {...} } }
  if (typeof json !== "object" || json === null || !("data" in json)) {
    throw new Error("TikTok user info returned an unexpected payload.");
  }

  const data = (json as { data?: unknown }).data;
  const user =
    typeof data === "object" && data !== null && "user" in data
      ? (data as { user?: unknown }).user
      : undefined;

  if (typeof user !== "object" || user === null || !("open_id" in user)) {
    throw new Error("TikTok user info payload is missing `open_id`." );
  }

  const u = user as {
    open_id: string;
    display_name?: string;
    avatar_url?: string;
    username?: string;
  };

  return {
    openId: u.open_id,
    displayName: u.display_name,
    avatarUrl: u.avatar_url,
    username: u.username,
  };
}
