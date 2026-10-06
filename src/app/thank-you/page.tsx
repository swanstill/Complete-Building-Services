import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/SiteConfig";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Thank You for Your Enquiry",
  description:
    "Thanks for getting in touch with Complete Complete Roofing & Building Services. Our team will be in touch shortly with your free, no-obligation quote.",
  robots: { index: false, follow: false },
};

const nextSteps = [
  {
    title: "We review your enquiry",
    description:
      "Our team checks the details you sent and makes sure we have everything we need.",
  },
  {
    title: "We get in touch",
    description:
      "One of our specialists will call or email you, usually within one working day.",
  },
  {
    title: "Free site visit & quote",
    description:
      "We arrange a convenient time to inspect your property and provide a detailed, no-obligation quote.",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <section
        className="py-16 px-4 md:py-24"
        style={{ backgroundColor: siteConfig.brand.primary }}
      >
        <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl px-6 py-12 md:px-12 md:py-16 text-center shadow-xl">
          <svg
            className="mx-auto h-20 w-20 mb-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            We&apos;ve received your details.
          </p>
          <p className="text-gray-600 mb-8">
            Our team will be in touch with you shortly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/"
              className="w-full sm:w-auto py-4 px-8 rounded-full font-bold text-white text-base transition-all hover:opacity-90"
              style={{ backgroundColor: siteConfig.brand.secondary }}
            >
              Back to Home
            </Link>
            <Link
              href={`tel:${siteConfig.phoneNumber.replace(/\s/g, "")}`}
              className="w-full sm:w-auto py-4 px-8 rounded-full font-bold text-base transition-all border-2 hover:bg-gray-50"
              style={{
                color: siteConfig.brand.secondary,
                borderColor: siteConfig.brand.secondary,
              }}
            >
              Call {siteConfig.phoneNumber}
            </Link>
          </div>

          <div className="text-left border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              What happens next?
            </h2>
            <ol className="flex flex-col gap-5">
              {nextSteps.map((step, index) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: siteConfig.brand.primary }}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {step.title}
                    </p>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
