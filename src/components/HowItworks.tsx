import { siteConfig } from "@/config/SiteConfig";
export default function HowItworks({ steps }: { steps?: string[] }) {
  return (
    <section className="section process-section" id="how-it-works">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FROM FIRST CALL TO FINISHED ROOF</p>
            <h2>
              Getting your roof
              <br />
              sorted is simple.
            </h2>
          </div>
          <p>Know what happens next, before you commit to anything.</p>
        </div>
        <ol className="process-grid">
          {siteConfig.howItWorks.steps.map((s, i) => (
            <li key={s.title}>
              <span className="process-number">0{i + 1}</span>
              <h3>
                {steps
                  ? [
                      "Tell us about your roof",
                      "Assess the options",
                      "Agree the work",
                      "Completion and aftercare",
                    ][i]
                  : s.title}
              </h3>
              <p>{steps?.[i] || s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
