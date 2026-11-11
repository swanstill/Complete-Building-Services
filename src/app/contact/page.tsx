import Link from "next/link";
import { siteConfig } from "@/config/SiteConfig";
import { website } from "@/config/website";
import { pageMetadata } from "@/lib/metadata";
import Form from "@/components/Form";
import TrustStrip from "@/components/TrustStrip";

export const metadata = pageMetadata(
  "Contact Your Local Roofers in Swindon",
  "Contact Complete Roofing & Building Services for roof repairs, replacements and flat roofs in Swindon and Royal Wootton Bassett. Call 01793 239742 or request a free quote.",
  "/contact/",
);
export default function Contact() {
  return (
    <>
      <section className="contact-intro">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>
          <div className="contact-layout">
            <div>
              <p className="eyebrow">A LOCAL TEAM, READY TO HELP</p>
              <h1>
                Let&apos;s talk
                <br />
                about your roof.
              </h1>
              <p className="intro">
                A question, a persistent leak or plans for a new roof? Call us
                or leave your details. We&apos;ll help you work out the next
                step.
              </p>
            </div>
            <div className="contact-details">
              <div>
                <h2>Call the roofing team</h2>
                <a href={website.phoneHref} data-placement="contact">
                  {website.phoneDisplay}
                </a>
                <p>24/7 emergency roofing service</p>
              </div>
              <div>
                <h2>Email us</h2>
                <a href={`mailto:${siteConfig.emailAddress}`}>
                  {siteConfig.emailAddress}
                </a>
              </div>
              <div>
                <h2>Based in Swindon</h2>
                <address>{siteConfig.address}</address>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TrustStrip />
      <Form />
      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CLOSE TO HOME</p>
              <h2>
                Roofing across Swindon
                <br />& Royal Wootton Bassett.
              </h2>
            </div>
            <p>
              We also work in surrounding Wiltshire towns and villages. Send
              your postcode and we&apos;ll confirm whether we cover your
              property.
            </p>
          </div>
          <div className="areas-row">
            {website.areas.map((a) => (
              <span key={a}>✓ {a}</span>
            ))}
          </div>
          <div className="detail-grid">
            <div id="emergency-roofing">
              <h3>Emergency roofing</h3>
              <p>
                Active leaks or damage after a storm? Call us to discuss urgent
                roof repairs and availability.
              </p>
              <a
                href={website.phoneHref}
                className="text-link"
                data-placement="emergency"
              >
                Call for urgent help ↗
              </a>
            </div>
            <div id="chimney-repairs">
              <h3>Chimney repairs</h3>
              <p>
                Chimney work, repointing and flashing repairs to help protect
                the roof around your chimney.
              </p>
              <a href="#quote-form" className="text-link">
                Ask about chimney work ↗
              </a>
            </div>
            <div id="guttering">
              <h3>Guttering & roofline</h3>
              <p>
                Fascias, soffits and guttering repairs to help keep water moving
                away from your property.
              </p>
              <a href="#quote-form" className="text-link">
                Ask about your roofline ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
