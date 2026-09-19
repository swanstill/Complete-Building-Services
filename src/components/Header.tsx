import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/SiteConfig";

const Header = () => {
  return (
    <>
      {/* Top Bar - White background */}
      <section className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:px-16 md:py-4" style={{ backgroundColor: "#4A4645" }}>
        {/* Mobile: 2 rows x 2 cols */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          <Link href="/" aria-label={siteConfig.logoAltText}>
            <Image
              src={siteConfig.logoImage}
              alt={siteConfig.logoAltText}
              className="h-15 w-auto shrink-0 object-left object-contain"
              height={200}
              width={370}
            />
          </Link>
          <a
            target="_blank"
            href="https://www.checkatrade.com/trades/checktrade"
          >
            <div className="flex h-[60px] w-full items-center justify-center">
              <Image
                src="/icons/check-trade.png"
                alt="Check Trade"
                className="h-full w-auto object-contain"
                width={180}
                height={60}
              />
            </div>
          </a>
          <a
            target="_blank"
            href="https://www.trustatrader.com/traders/complete-building-services-roofers-roofing-swindon"
          >
            <div className="flex h-[60px] w-full items-center justify-center">
              <Image
                src="/icons/trust-trader.png"
                alt="Trust Trader Reviews"
                className="h-full w-auto object-contain"
                width={180}
                height={60}
              />
            </div>
          </a>
        </div>

        {/* Desktop: 3 cols - logo left, phone middle, widgets right */}
        <div className="hidden items-center justify-between md:flex md:w-full">
          <div className="flex items-center">
            <Link href="/" aria-label={siteConfig.logoAltText}>
              <Image
                src={siteConfig.logoImage}
                alt={siteConfig.logoAltText}
                className="h-15 w-auto shrink-0 object-left object-contain"
                height={200}
                width={370}
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Image
              src="/images/headphone.svg"
              alt="Headphone"
              className="h-5 w-5 md:h-7.5 md:w-7.5 brightness-0 invert"
              width={20}
              height={20}
            />
            <div className="flex flex-col">
              <span>Prefer to Talk? Call Us</span>
              <a target="_blank" href={`tel:${siteConfig.phoneNumber}`}>
                <span className="text-sm font-bold md:text-lg">
                  {siteConfig.phoneNumber}
                </span>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 md:flex-wrap">
            <a
              target="_blank"
              className="hidden min-w-0 md:flex"
              href="https://www.checkatrade.com/trades/checktrade"
            >
              <div className="flex h-[60px] w-full items-center justify-center md:w-[180px]">
                <Image
                  src="/icons/check-trade.png"
                  alt="Check Trade"
                  className="h-full w-auto object-contain"
                  width={180}
                  height={60}
                />
              </div>
            </a>
            <a
              target="_blank"
              className="hidden min-w-0 md:flex"
              href="https://www.trustatrader.com/traders/complete-building-services-roofers-roofing-swindon"
            >
              <div className="flex h-[60px] w-full items-center justify-center md:w-[180px]">
                <Image
                  src="/icons/trust-trader.png"
                  alt="Trust Trader Reviews"
                  className="h-full w-auto object-contain"
                  width={180}
                  height={60}
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges Row - Black background */}
      <section
        className="text-white py-2 md:py-4 px-4 md:px-16 grid grid-cols-[1fr_140px] gap-4 items-start md:flex md:flex-wrap md:justify-between md:gap-0 md:items-center"
        style={{ backgroundColor: "#010203" }}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <path d="M10 12h4"></path>
            <path d="M10 8h4"></path>
            <path d="M14 21v-3a2 2 0 0 0-4 0v3"></path>
            <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path>
            <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>
          </svg>
          <span className="text-sm md:text-base">{siteConfig.foundedYear}</span>
        </div>
        <div className="flex items-center gap-2 w-[140px] md:w-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span className="text-sm md:text-base">{siteConfig.guaranteeYears}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
            <path d="M9 15l2 2 4-4"></path>
          </svg>
          <span className="text-sm md:text-base">Fully Accredited</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span className="text-sm md:text-base">Emergency 24/7</span>
        </div>
      </section>
    </>
  );
};

export default Header;
