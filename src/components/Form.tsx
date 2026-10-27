import LeadForm from "./LeadForm";
import { website } from "@/config/website";

export default function Form({ serviceType }: { serviceType?: string }) {
  return (
    <section className="quote-section section" id="quote-form">
      <div className="shell quote-grid">
        <div className="quote-copy">
          <p className="eyebrow">LET&apos;S GET YOUR ROOF SORTED</p>
          <h2>
            {serviceType ? (
              "Your " + serviceType.toLowerCase() + " quote starts here."
            ) : (
              <>
                One quick enquiry.
                <br />
                One less thing to worry about.
              </>
            )}
          </h2>
          <p>
            Tell us a few details and our roofing team will be in touch to
            discuss your property and arrange the next step.
          </p>
          <ul className="check-list">
            <li>A free, no-obligation quote</li>
            <li>Clear advice about the work you need</li>
            <li>Guarantees explained before work starts</li>
          </ul>
          <div className="quote-phone">
            <span>Need help sooner? Give us a call.</span>
            <a href={website.phoneHref} data-placement="quote-section">
              {website.phoneDisplay}
            </a>
            <small>24/7 emergency roofing service</small>
          </div>
        </div>
        <div className="quote-card">
          <div className="quote-card-heading">
            <h3>Get your free quote</h3>
            <p>No pressure. Just a conversation about your roof.</p>
          </div>
          <LeadForm serviceType={serviceType} />
        </div>
      </div>
    </section>
  );
}
