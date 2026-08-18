# Zikofranco

Website and back office for the Zikofranco music project —
[zikofranco.com](https://zikofranco.com).

**Stack:** Next.js 16, React, TypeScript, Tailwind, Resend

---

## Structure

The app is split with Next.js route groups, so the public site and the admin area have
separate layouts and separate auth without separate deployments:

```
src/app/(public)/          shows, media, epk, merch, booking
src/app/admin/login/       sign-in, outside the protected layout
src/app/admin/(protected)/ dashboard, content, shows, merch, requests
```

Putting `login` outside `(protected)` is deliberate: the protected layout can then assume a
session exists instead of every page re-checking, and there is no route that half-authenticates.

---

## What it does

| Area | Purpose |
|---|---|
| Shows, media, EPK | Public face of the project |
| Merch | Store front |
| Booking | Enquiries, delivered by email through Resend |
| Admin dashboard | Overview of requests and content |
| Admin content / shows / merch | Editable without a deploy |
| Admin requests | Incoming booking and contact enquiries |

---

## Notes

Booking and contact both go out through Resend rather than a mailto link, so the address is
never exposed in markup and a failed send is visible server-side instead of silently lost.

The admin area is content management, not a CMS: it edits exactly the fields the site
renders, which keeps the shapes in sync and avoids a schema nobody maintains.

---

## Running it

```bash
npm install
npm run dev
```

Environment variables are not committed; the app expects a Resend key from the deployment
environment.

---

## License

None. Published as a portfolio piece: the source is here to be read, not reused.
All rights reserved.
