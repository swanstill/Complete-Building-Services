import Image from "next/image";
import { siteConfig } from "@/config/SiteConfig";
import { website } from "@/config/website";

export default function Hero() {
  return (
    <section className="home-hero">
      <Image
        src={siteConfig.heroImage}
        alt="Completed tiled roof by Complete Roofing & Building Services"
        fill
        sizes="100vw"
        priority
        className="hero-background"
      />
      <div className="hero-shade" />
      <div className="shell hero-content">
        <p className="eyebrow light">
          <span className="status-dot" /> YOUR LOCAL ROOFING TEAM
        </p>
        <h1>
          Your home.
          <br />
          Our expertise.
          <br />
          <span>A roof you can rely on.</span>
        </h1>
        <p className="hero-intro">
          Roof repairs, replacements and flat roofing in Swindon & Royal Wootton
          Bassett. Straightforward advice from the people who do the work.
        </p>
        <div className="button-row">
          <a href="#quote-form" className="button button-primary">
            Get my free quote <span aria-hidden="true">↗</span>
          </a>
          <a
            href={website.phoneHref}
            className="hero-call"
            data-placement="hero"
          >
            <span>Prefer to talk?</span>
            {website.phoneDisplay}
          </a>
        </div>
        <div className="hero-checks">
          <span>✓ Free, no-obligation quotes</span>
          <span>✓ All work guaranteed</span>
        </div>
      </div>
      <div className="hero-caption">
        <span>REAL WORK. LOCAL HOMES.</span>
        <span>Complete Roofing & Building Services</span>
      </div>
    </section>
  );
}
