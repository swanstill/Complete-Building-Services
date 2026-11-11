# Website expansion audit and handover

Audited 27 October 2026. Base commit: `0c5d4cf` in `swanstill/Complete-Building-Services`.

## Existing project and lead delivery

- Next.js App Router, TypeScript, React and Tailwind, deployed to Vercel. No tracked Vercel configuration or environment files. No credentials were fetched, changed or committed.
- The live landing page and repository match, including the four-field `LeadForm`, `/api/lead`, thank-you page, logo, original project gallery and sticky call strip.
- `LeadForm` sends `fullName`, `email`, `phoneNumber` and `postcode` to `/api/lead`. Required fields, email/UK phone/postcode validation and the endpoint remain. Service pages append optional `serviceType`; the SMS includes it when present. Existing optional `propertyType` and `timeframe` remain accepted.
- `/api/lead` resolves credentials through the existing `src/lib/twilio-auth.ts`, calls `client.messages.create` once, and returns `{ok:true,sid}` only after Twilio accepts the message. Accepted by Twilio is not proof of delivery to the handset. Sender and recipient still come from `TWILIO_NUMBER` and `CLIENT_SMS_TO`.
- Original environment names preserved: `TWILIO_ACCOUNT_SID` / legacy `TWILIO_SID`, `TWILIO_AUTH_TOKEN` / legacy `TWILIO_AUTH`, `TWILIO_NUMBER`, `CLIENT_SMS_TO`. The credential resolver is unchanged.
- No Zapier or webhook integration was found in tracked code. Account-side Twilio configuration cannot be audited from source. No live notifications were sent during testing.
- The separate `/api/send-email` route and all `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_FROM` references remain unchanged. It is not called by the active quote form. Its pre-existing arbitrary-recipient API and disabled TLS certificate check deserve a separate security review before exposing it more widely.
- No existing server rate limiting, captcha or honeypot was found on the active lead route. Immediate duplicate submissions are now blocked by a synchronous client ref and disabled inputs/button. There is no new distributed server deduplication store.

## Google and conversion tracking

- The original Google Tag Manager script and noscript iframe, container `GTM-M97CMPQK`, remain on every page in the root layout. No second Google tag/container was added.
- Previously `Lead` fired on form mount and `SubmitForm` fired before the API request. Those were not evidence of a successful enquiry.
- `form_start` is now an engagement event on the first edit. The existing `SubmitForm` name fires only after a successful HTTP response containing `{ok:true,sid}`. It includes `event_id`, `service_type`, `form_name` and `content_name`; contact details are excluded.
- Conversions use the confirmed Twilio message ID for a module-level and session-storage guard. Storage or analytics errors do not block the thank-you redirect. Direct visits/reloads of `/thank-you/` do not fire a lead conversion.
- The Facebook helper is retained; a successful submission triggers its existing `Lead` event only if a pixel is already present. A new Facebook pixel was not introduced.
- All `tel:` actions emit `call_click`, with page path and placement. These measure clicks, not connected calls. Client-side route changes emit `virtual_page_view`.
- In GTM Preview, inspect existing GA4 and Google Ads tags before publishing changes. Use `SubmitForm` as the single confirmed-lead trigger; map `event_id` to a Google Ads transaction ID if supported. Keep `form_start`, raw clicks, submit clicks and generic thank-you page views out of lead-conversion triggers. Avoid duplicating GA4 page views if history/enhanced measurement already handles SPA navigation. Only map `virtual_page_view` when needed. Existing Ads/GA4 IDs, conversion labels, consent settings and live tag mappings are not readable from this source and require account-side verification.

## Evidence and content decisions

Sources inspected:

- [Current landing page](https://complete-building-services-tau.vercel.app/)
- [Company homepage](https://completebuilding-services.co.uk/)
- [Company contact page](https://completebuilding-services.co.uk/contact/)
- [Company flat roofing page](https://completebuilding-services.co.uk/services/flat-roofs/)
- [TrustATrader profile](https://www.trustatrader.com/traders/complete-building-services-roofers-roofing-swindon)
- [Existing Checkatrade profile link](https://www.checkatrade.com/trades/CompleteBuildingServices985447)

The company contact page confirms 01793 239742 and info@completebuilding-services.co.uk. The landing-page address is retained. Both company sources confirm Swindon and Royal Wootton Bassett; wider villages are described generally and visitors are asked to check their postcode. The company website confirms emergency roofing 24/7, an in-house family-run team, EPDM and felt systems and free no-obligation quotes.

TrustATrader displayed 4.96/5 from 24 reviews and insurance verified 7 July 2026. This is the independently checked summary used in new copy. Checkatrade blocked automated verification. Original Checkatrade testimonial content, review loading and both review badge assets remain; the Checkatrade badge is a historical landing-page snapshot showing 9.81/10 and 49 reviews. Confirm that figure and review provenance with the client before release. No new aggregate rating structured data was added.

The 4,160-project total and blanket 20-year guarantee were not corroborated. The original site also had conflicting experience claims, a wrong SEO domain, unrelated Roofex contact information, Peakdale/MyJobQuote reviews and a Pat/Layton mismatch. Refreshed copy removes the unrelated content and unverified numerical claims. Guarantees are explained as project-specific cover to be confirmed with the written quote. Check the full address, exact legal trading identity and guarantee terms with the client before release.

## Photography

Original landing-page logo, hero, owner photo and project gallery remain in the repository. Images render through Next Image with responsive sizes and lazy loading below the fold. DM Sans is self-hosted by Next's font loader.

Two additional genuine flat-roof images came from the company's verified public TrustATrader project gallery:

- `complete-epdm-flat-roof.jpg`: https://assets.trustatrader.com/file.q9ev6o.view.g9s.jpg (caption: New epdm rubber roof).
- `complete-epdm-roof-skylights.jpg`: https://assets.trustatrader.com/9a445f45-4b19-4612-84a5-d91f3d1d0897.6rogkh.view.udd.jpg (caption: New epdm rubber with 2 sky lights).

`roof-ridge-tiling.webp` is an orientation-corrected, compressed derivative of existing `project-2.jpg`. Originals remain. No stock photos or AI roofing images were introduced.

## Routes, SEO and reuse

Completed routes: `/`, `/roof-repairs/`, `/roof-replacement/`, `/flat-roofing/`, `/contact/`, `/thank-you/`.

Shared header, footer, service template, form, trust strip, reviews, process, gallery, CTA and mobile call bar. Business/contact data is in `src/config/SiteConfig.ts`; services, navigation and verified evidence are in `src/config/website.ts`.

Each public page has its own metadata, canonical and Open Graph data. Sitemap excludes thank-you, robots excludes API/thank-you, and thank-you has noindex metadata. RoofingContractor, Service and BreadcrumbList data use confirmed fields without rating/guarantee inventions. The canonical base remains the current Vercel landing-page URL. Change `siteConfig.seo.baseUrl` to the approved production domain when the actual domain migration is authorised; previews intentionally canonicalise to that configured base.

## Validation and release limits

`npm run lint`, `npm run typecheck`, `npm test` and `npm run build` are the handover checks. Nine tests exercise rendered form validation, original payload compatibility, success, failures, double submit, redirect, analytics failure, conversion deduplication, Twilio calls and credential aliases. All integrations are mocked. Production credentials and handset delivery have not been tested.

Browser QA covers mobile navigation, form validation, responsive layout, images and linked routes at 375px/390px plus tablet/desktop. There is no claim of physical iPhone/Android testing or field Core Web Vitals.

Dependency installation surfaced inherited advisories. Compatible updates brought Next to 15.5.28, Twilio to 6.2.0 and Nodemailer to 7.0.13, removing the critical finding without a framework major upgrade. `npm audit --omit=dev` still reports 9 high and 2 moderate findings in the inherited dependency tree. Plan a separate dependency/security review; do not force-upgrade the framework or replace lead-delivery integrations without compatibility testing.

No production deployment or credential changes are authorised by this work. Review the PR, verify preview environment configuration without printing secret values, use GTM Preview, and arrange an explicitly approved real delivery test before production release.
