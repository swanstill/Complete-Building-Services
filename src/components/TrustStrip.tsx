import Image from "next/image";
import { siteConfig } from "@/config/SiteConfig";
import { website } from "@/config/website";

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Reviews and reassurance">
      <div className="shell trust-inner">
        <div className="trust-intro">
          <span className="stars" aria-hidden="true">
            ★★★★★
          </span>
          <strong>{website.reviewSummary}</strong>
          <span>on {website.reviewSource}</span>
        </div>
        <a
          href={siteConfig.reviewsData.reviewsUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="View Complete Building Services on Checkatrade"
        >
          <Image
            src="/icons/check-trade.png"
            alt="Checkatrade"
            width={180}
            height={70}
          />
        </a>
        <a
          href={website.trustatraderUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Read Complete Building Services reviews on TrustATrader"
        >
          <Image
            src="/icons/trust-trader.png"
            alt="TrustATrader"
            width={180}
            height={70}
          />
        </a>
        <div className="trust-assurance">
          <strong>Local team. Personal service.</strong>
          <span>Free quotes · Work guaranteed</span>
        </div>
      </div>
    </section>
  );
}
