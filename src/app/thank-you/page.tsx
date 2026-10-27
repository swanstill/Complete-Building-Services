import type { Metadata } from "next";
import Link from "next/link";
import { website } from "@/config/website";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata(
    "Thank You for Your Enquiry",
    "Thank you for contacting Complete Roofing & Building Services. Our roofing team will be in touch to discuss your enquiry.",
    "/thank-you/",
  ),
  robots: { index: false, follow: false },
};
const nextSteps = [
  {
    title: "We review your enquiry",
    text: "Our roofing team checks the details you've sent.",
  },
  {
    title: "Keep an eye on your phone",
    text: "We'll be in touch to discuss your roof and answer your questions.",
  },
  {
    title: "Arrange the next step",
    text: "We'll discuss a convenient inspection and a free, no-obligation quote.",
  },
];
export default function ThankYouPage() {
  return (
    <section className="thank-you-section">
      <div className="shell">
        <div className="thank-you-card">
          <span className="success-icon" aria-hidden="true">
            ✓
          </span>
          <p className="eyebrow">THANK YOU FOR GETTING IN TOUCH</p>
          <h1>
            Your enquiry is
            <br />
            in good hands.
          </h1>
          <p>
            We&apos;ve received your details. Our roofing team will be in touch
            to discuss your property. Please keep an eye on your phone.
          </p>
          <ol className="next-steps">
            {nextSteps.map((s, i) => (
              <li key={s.title}>
                <span>0{i + 1}</span>
                <div>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="button-row">
            <a
              href={website.phoneHref}
              className="button button-primary"
              data-placement="thank-you"
            >
              Call {website.phoneDisplay} <span aria-hidden="true">↗</span>
            </a>
            <Link href="/" className="text-link">
              Back to home →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
