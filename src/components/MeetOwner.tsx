import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/SiteConfig";

const MeetOwner = () => {
  return (
    <section id="meet-team" className="py-12 md:py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-md">
          {/* LEFT — Full photo */}
          <div className="relative min-h-100 lg:min-h-145">
              <Image
              src="/images/owner-image.jpg"
              alt="Pat"
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="bg-gray-50 flex flex-col justify-center px-8 md:px-12 py-10 gap-5">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                Meet Layton — Director of Complete Complete Roofing & Building Services
              </h2>
              <p className="text-lg md:text-xl font-semibold text-gray-700 mt-1">
                We&apos;re Your Local Roofing Company across{" "}
                <span style={{ color: siteConfig.brand.primary }}>
                  Swindon, Royal Wootton Bassett, and nearby towns.
                </span>
              </p>
            </div>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              At Complete Complete Roofing & Building Services we are more than just a roofing
              company, we pride ourselves on being your trusted experts for all
              things roofing. Whether you&apos;re refurbishing your home, repairing
              damage, or in need of a brand-new roof, our team of skilled
              professionals has you covered. With years of experience and a
              commitment to excellence, we ensure every job is completed to the
              highest standards, giving you peace of mind that your property is in
              safe hands. No matter the size or scale of the project, we deliver
              reliable, top-quality workmanship tailored to your needs.
            </p>

            <ul className="flex flex-col gap-3">
              {siteConfig.ownerInfo.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: siteConfig.brand.primary }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-base md:text-lg font-medium">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="#quote-form" className="w-full mt-2">
              <button
                className="w-full py-4 rounded-full text-white font-bold text-lg md:text-xl transition-opacity hover:opacity-90"
                style={{ backgroundColor: siteConfig.brand.primary }}
              >
                {siteConfig.cta.buttonPrimary}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetOwner;
