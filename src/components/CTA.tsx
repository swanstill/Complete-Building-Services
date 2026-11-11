import { website } from "@/config/website";
export default function CTA() {
  return (
    <section className="cta-section">
      <div className="shell cta-inner">
        <div>
          <p className="eyebrow light">
            GOOD ADVICE STARTS WITH A CONVERSATION
          </p>
          <h2>Let&apos;s take care of your roof.</h2>
        </div>
        <div className="button-row">
          <a href="#quote-form" className="button button-white">
            Get my free quote <span aria-hidden="true">↗</span>
          </a>
          <a
            href={website.phoneHref}
            className="cta-phone"
            data-placement="cta"
          >
            {website.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
