import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/config/website";
import { website } from "@/config/website";
import { siteConfig } from "@/config/SiteConfig";
import Form from "./Form";
import TrustStrip from "./TrustStrip";
import Reviews from "./Reviews";
import HowItworks from "./HowItworks";
import FaqSection from "./Faq-Section";
import Services from "./Services";
import CTA from "./CTA";

export default function ServicePage({ service: s }: { service: Service }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.name,
        serviceType: s.name,
        description: s.description,
        url: `${siteConfig.seo.baseUrl}/${s.slug}/`,
        provider: { "@id": `${siteConfig.seo.baseUrl}/#business` },
        areaServed: website.areas,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.seo.baseUrl + "/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: s.name,
            item: `${siteConfig.seo.baseUrl}/${s.slug}/`,
          },
        ],
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <section className="service-hero">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{s.name}</span>
          </nav>
          <div className="service-hero-grid">
            <div>
              <p className="eyebrow">{s.eyebrow}</p>
              <h1>{s.headline}</h1>
              <p className="intro">{s.intro}</p>
              <div className="button-row">
                <a href="#quote-form" className="button button-primary">
                  Get my free quote <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="hero-call"
                  href={website.phoneHref}
                  data-placement="service-hero"
                >
                  <span>Talk to our team</span>
                  {website.phoneDisplay}
                </a>
              </div>
              <div className="hero-checks">
                <span>✓ Free, no-obligation quote</span>
                <span>✓ Work guaranteed</span>
              </div>
            </div>
            <figure className="service-hero-photo">
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
                priority
              />
              <figcaption>From our real project gallery</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <TrustStrip />
      <section className="section">
        <div className="shell">
          <div className="service-problem">
            <div>
              <p className="eyebrow">CLEAR ADVICE. PRACTICAL SOLUTIONS.</p>
              <h2>{s.problem}</h2>
            </div>
            <div>
              <p>{s.solution}</p>
              <ul className="check-list">
                {s.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="detail-grid">
            {s.details.map((d) => (
              <div key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Form serviceType={s.name} />
      <section className="section gallery-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SEE THE WORK FOR YOURSELF</p>
              <h2>Care in the details.</h2>
            </div>
            <p>
              Photographs from Complete Roofing & Building Services projects.
            </p>
          </div>
          <div className="service-gallery">
            {s.gallery.map((p) => (
              <figure key={p.src}>
                <div className="photo">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                </div>
                <figcaption>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="service-guarantee">
            <h3>Know where you stand before work begins.</h3>
            <p>
              {website.guarantee} We confirm the cover, duration and conditions
              for your project so you can make an informed choice.
            </p>
          </div>
        </div>
      </section>
      <Reviews />
      <HowItworks steps={s.process} />
      <FaqSection faqs={s.faqs} />
      <Services exclude={s.slug} />
      <CTA />
    </>
  );
}
