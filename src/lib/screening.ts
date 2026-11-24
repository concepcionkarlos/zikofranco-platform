/**
 * src/lib/screening.ts
 * Screens text that comes from outside (booking form, inbound emails) before it is stored or shown.
 *
 * 1. sanitizeText(): removes invisible / control characters often used to hide text.
 * 2. screenSubmission(): scores spam and prompt-injection signals. Flagged messages are still saved
 *    (so no real client is lost) but get no auto-reply and are clearly marked in the admin.
 *
 * Client-written text is always DATA. Nothing in it should ever be treated as an instruction —
 * by this app, by the people reading it, or by any automated tool that processes it.
 */

// Zero-width chars, bidi overrides/isolates, BOM, soft hyphen, other C0/C1 controls (keeps \n and \t).
const INVISIBLE = /[­᠎​-‏‪-‮⁠-⁤⁦-⁩﻿]|[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;

export function sanitizeText(value: string): string {
  return value.normalize("NFKC").replace(INVISIBLE, "").replace(/\r\n?/g, "\n");
}

export function hadHiddenCharacters(value: string): boolean {
  INVISIBLE.lastIndex = 0;
  return INVISIBLE.test(value);
}

const INJECTION_PATTERNS: [RegExp, string][] = [
  [/\b(ignore|disregard|forget|override)\b[^.\n]{0,40}\b(previous|prior|above|earlier|all|your)\b[^.\n]{0,40}\b(instructions?|prompts?|rules?|directions?)/i, "asks to ignore instructions"],
  [/\b(system|developer)\s*(prompt|message|instructions?)\b/i, "mentions system prompt"],
  [/\byou\s+are\s+(now|no\s+longer)\b|\bact\s+as\s+(an?|the)\b|\bpretend\s+(to\s+be|you)\b/i, "tries to change AI role"],
  [/^\s*(system|assistant|user|human)\s*:/im, "fake chat role marker"],
  [/<\/?\s*(system|instructions?|prompt|im_start|im_end)\b|\[\/?(INST|SYS)\]|<\|[a-z_]+\|>/i, "prompt markup"],
  [/\b(ai|llm|chatgpt|claude|gpt|assistant|model)\b[^.\n]{0,60}\b(must|should|need to|have to|will)\b[^.\n]{0,40}\b(reply|respond|send|forward|reveal|execute|run|delete|transfer)/i, "gives orders to an AI"],
  [/\b(reveal|print|show|send|forward)\b[^.\n]{0,40}\b(api[\s_-]?key|password|secret|token|credentials?|env(ironment)? var)/i, "asks for secrets"],
  [/\b(base64|eval\(|<script|javascript:|data:text\/html)/i, "embedded code"],
];

const SPAM_PATTERNS: [RegExp, string, number][] = [
  [/\b(seo|backlinks?|guest post|link building|domain authority|google ranking|first page of google)\b/i, "SEO pitch", 3],
  [/\b(catalog|directory|listing)\b[^.\n]{0,60}\b(free|register|sign ?up|add you|join)\b/i, "directory listing pitch", 3],
  [/\b(web ?design|website redesign|app development|marketing agency|lead generation|increase (your )?(sales|traffic))\b/i, "agency pitch", 3],
  [/\b(crypto|bitcoin|forex|investment opportunity|loan|casino|viagra|cbd)\b/i, "spam keywords", 3],
  [/\b(unsubscribe|opt[- ]out|reply stop)\b/i, "bulk-mail wording", 2],
  [/\b(i (recently )?sent you|reminding you|following up on my (offer|email))\b/i, "cold outreach follow-up", 2],
];

export type ScreeningResult = {
  flagged: boolean;
  injection: boolean;
  spam: boolean;
  reasons: string[];
};

export function screenSubmission(fields: { name?: string; email?: string; phone?: string; text: string }): ScreeningResult {
  const reasons: string[] = [];
  const text = fields.text;
  let spamScore = 0;
  let injection = false;

  for (const [re, label] of INJECTION_PATTERNS) {
    if (re.test(text) || (fields.name && re.test(fields.name))) {
      injection = true;
      reasons.push(`Possible prompt injection: ${label}`);
    }
  }

  for (const [re, label, weight] of SPAM_PATTERNS) {
    if (re.test(text)) {
      spamScore += weight;
      reasons.push(`Spam signal: ${label}`);
    }
  }

  const urls = text.match(/\bhttps?:\/\/|\bwww\.|\b[a-z0-9-]+\.(com|net|org|io|co|biz|info|xyz|top)\b/gi) ?? [];
  if (urls.length) {
    spamScore += urls.length >= 2 ? 3 : 1;
    reasons.push(`Spam signal: contains ${urls.length} link(s)`);
  }

  // North American 555-01xx numbers are reserved for fiction — a classic fake.
  const digits = (fields.phone ?? "").replace(/\D/g, "");
  if (/555(01\d\d)$/.test(digits) || /^1?\d{3}5550\d{3}$/.test(digits)) {
    spamScore += 2;
    reasons.push("Spam signal: fake 555 phone number");
  }

  if (fields.name && /\bhttps?:|www\.|\.com\b/i.test(fields.name)) {
    spamScore += 3;
    reasons.push("Spam signal: link in name field");
  }

  const spam = spamScore >= 3;
  return { flagged: spam || injection, injection, spam, reasons };
}
