import crypto from "node:crypto";

type PkcePair = {
  verifier: string;
  challenge: string;
};

function base64UrlEncode(buffer: Buffer): string {
  return buffer
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function sha256(input: string): Buffer {
  return crypto.createHash("sha256").update(input).digest();
}

/** Generate a PKCE verifier + S256 challenge. */
export function generatePkcePair(): PkcePair {
  // 32 bytes => 43 char base64url (within PKCE recommended length)
  const verifier = base64UrlEncode(crypto.randomBytes(32));
  const challenge = base64UrlEncode(sha256(verifier));
  return { verifier, challenge };
}

/** Generate a cryptographically-random OAuth state string. */
export function generateOAuthState(): string {
  return base64UrlEncode(crypto.randomBytes(16));
}
