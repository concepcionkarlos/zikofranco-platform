/**
 * src/lib/email.ts
 * Configuración central de emails (Resend).
 *
 * - PUBLIC_EMAIL: el email que se muestra en el sitio y se usa como "reply-to" (la "máscara").
 * - LEAD_NOTIFY_TO (env, privado): a dónde llegan las notificaciones de nuevas solicitudes.
 * - EMAIL_FROM (env): remitente para emails a clientes. Requiere el dominio verificado en Resend.
 * - EMAIL_NOTIFY_FROM (env): remitente de las notificaciones internas (puede usar otro dominio verificado).
 * - EMAIL_REPLY_TO (env): a dónde responden los clientes. Con la recepción de Resend activa,
 *   usar booking@zikofranco.com para que las respuestas entren al admin.
 * - CLIENT_AUTOREPLY=off (env): pausa la confirmación automática al cliente.
 */

export const PUBLIC_EMAIL = "Zikofranco@gmail.com";

export const EMAIL_FROM = process.env.EMAIL_FROM || "ZikoFranco <booking@zikofranco.com>";
export const NOTIFY_FROM = process.env.EMAIL_NOTIFY_FROM || EMAIL_FROM;
export const NOTIFY_TO = process.env.LEAD_NOTIFY_TO || PUBLIC_EMAIL;
export const CLIENT_AUTOREPLY = process.env.CLIENT_AUTOREPLY !== "off";
export const REPLY_TO = process.env.EMAIL_REPLY_TO || PUBLIC_EMAIL;

/** "Name <a@b.com>" → "a@b.com" (lowercased). */
export function extractAddress(value: string): string {
  const match = value.match(/<([^>]+)>/);
  return (match ? match[1] : value).trim().toLowerCase();
}

/** Drops the quoted history from a reply so the admin shows only the new message. */
export function stripQuotedReply(text: string): string {
  const lines = text.split(/\r?\n/);
  const cut = lines.findIndex(
    (l) =>
      /^On .+wrote:\s*$/i.test(l.trim()) ||
      /^El .+escribió:\s*$/i.test(l.trim()) ||
      /^-{2,}\s*Original Message/i.test(l.trim()) ||
      /^From: .+/i.test(l.trim()),
  );
  const kept = (cut > 0 ? lines.slice(0, cut) : lines).filter((l) => !l.startsWith(">"));
  return kept.join("\n").trim() || text.trim();
}
