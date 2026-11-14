/**
 * Plantillas de respuesta para leads (admin → Requests → Send Email).
 * Reemplaza [PRICE] y revisa los detalles antes de enviar.
 */

export type QuoteContext = { name: string; eventType: string };

export type QuoteTemplate = {
  id: string;
  label: string;
  subject: (c: QuoteContext) => string;
  body: (c: QuoteContext) => string;
};

const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;

const SIGNATURE = `Best,
Ziko & JCConcepcion
ZikoFranco — Miami Live Show
zikofranco.com`;

const INCLUDES = `• Power trio: Ziko (lead vocals), JCConcepcion (lead guitar) and live drums, backed by pro tracks
• Bilingual setlist (English / Spanish) tailored to your crowd — dance, Latin & rock
• In-ear monitor setup for clean, controlled sound`;

export const QUOTE_TEMPLATES: QuoteTemplate[] = [
  {
    id: "full",
    label: "Quote · Full Show (3h)",
    subject: () => "Your quote — ZikoFranco Full Miami Live Show",
    body: (c) => `Hi ${firstName(c.name)},

Thank you for reaching out about your ${c.eventType.toLowerCase()} — we'd love to be part of it!

Based on what you shared, I recommend our Full Miami Live Show:
• 3 sets of 50 minutes (3 hours of live music, two 15-min breaks)
• Set 1 Funk, Pop & Dance · Set 2 Miami Latin & Sing-Along · Set 3 Rock Party Finale
${INCLUDES}

Total: $[PRICE]
To reserve your date we ask for a 50% deposit; the balance is due on the event day.

You can see the full setlist here: zikofranco.com/show
Do you have any must-play songs or special moments (first dance, entrance, surprise)? Happy to jump on a quick call.

${SIGNATURE}`,
  },
  {
    id: "two",
    label: "Quote · Two Sets (2h)",
    subject: () => "Your quote — ZikoFranco Two-Set Celebration",
    body: (c) => `Hi ${firstName(c.name)},

Thanks for thinking of ZikoFranco for your ${c.eventType.toLowerCase()}!

For your event I recommend our Two-Set Celebration:
• 2 sets of 50 minutes with a 15-minute break
• Your pick of blocks: Funk, Pop & Dance · Miami Latin & Sing-Along · Rock Party Finale
${INCLUDES}

Total: $[PRICE]
A 50% deposit reserves the date; the balance is due on the event day.

Setlist and show details: zikofranco.com/show
Let me know if you have song requests or questions — I'm happy to help.

${SIGNATURE}`,
  },
  {
    id: "one",
    label: "Quote · Party Set (1h)",
    subject: () => "Your quote — ZikoFranco Party Set",
    body: (c) => `Hi ${firstName(c.name)},

Thanks for reaching out about your ${c.eventType.toLowerCase()}!

Our Party Set is a great fit:
• One 50-minute high-energy set built around your crowd
${INCLUDES}

Total: $[PRICE]
A 50% deposit reserves the date; the balance is due on the event day.

If you'd like more music, we also offer 2-set and full 3-hour shows: zikofranco.com/show

${SIGNATURE}`,
  },
  {
    id: "info",
    label: "Need more info",
    subject: () => "A few quick questions about your event — ZikoFranco",
    body: (c) => `Hi ${firstName(c.name)},

Thanks for your interest in ZikoFranco! To send you an accurate quote, could you share:

1. Event date and start/end time
2. Venue name and city
3. Approximate number of guests
4. How much live music you'd like (1 set, 2 sets or our full 3-hour show)
5. Does the venue have a sound system (PA)?

Once I have this I'll get back to you right away with availability and pricing.

${SIGNATURE}`,
  },
  {
    id: "followup",
    label: "Follow-up (no reply)",
    subject: () => "Following up — ZikoFranco for your event",
    body: (c) => `Hi ${firstName(c.name)},

Just following up on the quote I sent for your ${c.eventType.toLowerCase()}. Dates fill up quickly, so I wanted to make sure you had everything you need.

Happy to adjust the package, answer questions or hop on a quick call.

${SIGNATURE}`,
  },
  {
    id: "unavailable",
    label: "Date not available",
    subject: () => "About your date — ZikoFranco",
    body: (c) => `Hi ${firstName(c.name)},

Thank you so much for thinking of ZikoFranco! Unfortunately we're already booked on that date.

If your date is flexible, we'd love to make it work — just let us know other options and we'll check right away.

${SIGNATURE}`,
  },
  {
    id: "es",
    label: "Cotización (español)",
    subject: () => "Tu cotización — ZikoFranco Miami Live Show",
    body: (c) => `Hola ${firstName(c.name)},

¡Gracias por escribirnos! Nos encantaría ser parte de tu evento.

Te recomiendo nuestro Miami Live Show:
• [1 set de 50 min / 2 sets / show completo de 3 horas]
• Power trio: Ziko (voz), JCConcepcion (guitarra líder) y batería en vivo, con pistas profesionales
• Repertorio bilingüe (inglés / español) adaptado a tus invitados — baile, latino y rock

Total: $[PRICE]
Para reservar la fecha pedimos un 50% de depósito; el resto se paga el día del evento.

Setlist completo: zikofranco.com/show
¿Tienes canciones especiales o momentos importantes (primer baile, entrada, sorpresa)? Con gusto hablamos.

Saludos,
Ziko & JCConcepcion
ZikoFranco — Miami Live Show
zikofranco.com`,
  },
];
