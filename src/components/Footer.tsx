import { siteConfig } from "@/config/SiteConfig";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black py-10 px-10 tracking-wide">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center md:justify-between max-md:flex-col gap-6">
          <div>
            <Image
              src={siteConfig.logoImage}
              alt={siteConfig.logoAltText}
              className="h-15 w-auto shrink-0 object-left object-contain"
              height={200}
              width={370}
            />
          </div>

          <ul className="flex items-center justify-center flex-wrap gap-y-2 md:justify-end space-x-6 text-white">
            <Link
              href={`tel:${siteConfig.phoneNumber}`}
              className="flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-phone-icon lucide-phone"
              >
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
              <li>{siteConfig.phoneNumber}</li>
            </Link>

          </ul>
        </div>

        <hr className="my-6 border-gray-500" />
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/3"></div>
          <p className="text-center text-gray-300 text-base md:w-1/3">
            © {siteConfig.companyName}. All rights reserved.
          </p>
          <Link
            href="https://www.tradesgrow.co.uk/"
            target="_blank"
            className="md:w-1/3 flex justify-end"
          >
            <p className="text-white underline">
              Website design with ♥ by Trades Grow
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
