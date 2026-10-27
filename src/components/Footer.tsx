import { siteConfig } from "@/config/SiteConfig";
import { navigation, website } from "@/config/website";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <Link href="/">
              <Image
                src={siteConfig.logoImage}
                alt={siteConfig.logoAltText}
                width={280}
                height={108}
                className="footer-logo"
              />
            </Link>
            <p>
              Roofing for the place
              <br />
              you call home.
            </p>
          </div>
          <div>
            <h2>Explore</h2>
            <nav aria-label="Footer navigation">
              {navigation.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h2>Get in touch</h2>
            <a
              className="footer-phone"
              href={website.phoneHref}
              data-placement="footer"
            >
              {website.phoneDisplay}
            </a>
            <a
              className="footer-email"
              href={"mailto:" + siteConfig.emailAddress}
            >
              {siteConfig.emailAddress}
            </a>
            <address>{siteConfig.address}</address>
          </div>
          <div>
            <h2>Our local area</h2>
            {website.areas.map((a) => (
              <p key={a}>{a}</p>
            ))}
            <Link href="/contact/#emergency-roofing">
              24/7 emergency roofing ↗
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {siteConfig.companyName}
          </span>
          <a
            href="https://www.tradesgrow.co.uk/"
            target="_blank"
            rel="noreferrer"
          >
            Website by Trades Grow ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
