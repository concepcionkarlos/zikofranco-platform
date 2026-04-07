/**
 * src/lib/auth.ts
 * Simple HMAC-SHA256 signed token auth — no external dependencies.
 * Works in Node.js and Edge runtimes.
 */

const TOKEN_COOKIE = "admin_token";
const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET env var is not set");
  return secret;
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function toBase64Url(buf: ArrayBuffer | Uint8Array): string {
  const arr = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return btoa(String.fromCharCode(...arr))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(str: string): string {
  return atob(str.replace(/-/g, "+").replace(/_/g, "/"));
}

export async function createToken(email: string): Promise<string> {
  const secret = getSecret();
  const payload = JSON.stringify({ email, exp: Date.now() + TOKEN_TTL_MS });
  const payloadB64 = toBase64Url(new TextEncoder().encode(payload));
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadB64),
  );
  return `${payloadB64}.${toBase64Url(sig)}`;
}

export async function verifyToken(
  token: string,
): Promise<{ email: string } | null> {
  try {
    const [payloadB64, sigB64] = token.split(".");
    if (!payloadB64 || !sigB64) return null;

    const secret = getSecret();
    const key = await getKey(secret);
    const sigBytes = Uint8Array.from(fromBase64Url(sigB64), (c) =>
      c.charCodeAt(0),
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes.buffer as ArrayBuffer,
      new TextEncoder().encode(payloadB64),
    );
    if (!valid) return null;

    const payload = JSON.parse(fromBase64Url(payloadB64)) as {
      email: string;
      exp: number;
    };
    if (Date.now() > payload.exp) return null;

    return { email: payload.email };
  } catch {
    return null;
  }
}

export { TOKEN_COOKIE };
