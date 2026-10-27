import { siteConfig } from "@/config/SiteConfig";
type Faq = { question: string; answer: string };
export default function FaqSection({
  faqs = siteConfig.faqData,
}: {
  faqs?: Faq[];
}) {
  return (
    <section id="faq" className="section faq-section">
      <div className="shell faq-grid">
        <div>
          <p className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</p>
          <h2>
            Your roofing
            <br />
            questions, answered.
          </h2>
        </div>
        <div>
          {faqs.map((f) => (
            <details className="faq-item" key={f.question}>
              <summary>
                {f.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
