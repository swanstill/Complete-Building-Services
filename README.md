# Complete Roofing & Building Services

Expansion of the existing Next.js landing page into a six-page roofing website. Existing form fields, lead endpoint, Twilio credentials, Google Tag Manager container, review assets and project photography are retained.

## Development

Requires Node.js 20+.

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
node tests/site-smoke.cjs
```

The smoke check expects the site at http://127.0.0.1:3100 by default; use `SITE_TEST_URL` for another local URL. Start on that port with `npm start -- --port 3100`. All lead-flow tests mock integrations and send no real SMS or email.

## Pages and configuration

- Home: `/`
- Roof repairs: `/roof-repairs/`
- Roof replacement: `/roof-replacement/`
- Flat roofing: `/flat-roofing/`
- Contact: `/contact/`
- Successful enquiry: `/thank-you/`

Business details and form fields: `src/config/SiteConfig.ts`.
Service content, navigation and verified review summary: `src/config/website.ts`.
Shared service layout: `src/components/ServicePage.tsx`.
Reusable form: `src/components/LeadForm.tsx`.
Existing server endpoint: `src/app/api/lead/route.ts`.

## Existing environment contract

Keep deployment values in Vercel. Never commit credentials.

- `TWILIO_ACCOUNT_SID` (legacy alias `TWILIO_SID`)
- `TWILIO_AUTH_TOKEN` (legacy alias `TWILIO_AUTH`)
- `TWILIO_NUMBER`
- `CLIENT_SMS_TO`
- Existing separate email route: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_FROM`.

The active quote form sends SMS through Twilio, not the separate email route. A successful API response means Twilio accepted the message; check Twilio delivery status in an approved live test.

## Tracking and release

The original `GTM-M97CMPQK` script and noscript iframe remain in the root layout. Confirmed success emits the existing `SubmitForm` event once per message ID, then redirects to `/thank-you/`. Form starts and call clicks are separate engagement events. No lead event fires on a direct thank-you visit.

See [the audit and release handover](docs/AUDIT.md) for source evidence, tracking setup, verification limits, dependency findings and claims requiring confirmation. Do not deploy to production or change live credentials without client approval.
