import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import MobileStickyBar from "@/components/MobileStickyBar";
import { DM_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { siteConfig } from "@/config/SiteConfig";
import { website } from "@/config/website";
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.baseUrl),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        {/* Google Tag Manager: retain the existing snippet and container. */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M97CMPQK');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${dmSans.className} ${dmSans.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-M97CMPQK`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RoofingContractor",
              "@id": `${siteConfig.seo.baseUrl}/#business`,
              name: siteConfig.companyName,
              url: siteConfig.seo.baseUrl,
              telephone: siteConfig.phoneNumber,
              email: siteConfig.emailAddress,
              image: `${siteConfig.seo.baseUrl}${siteConfig.heroImage}`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "15 Shaftesbury Centre, Percy Street",
                addressLocality: "Swindon",
                postalCode: "SN2 2AZ",
                addressCountry: "GB",
              },
              areaServed: website.areas,
              sameAs: [
                website.trustatraderUrl,
                siteConfig.reviewsData.reviewsUrl,
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <MobileStickyBar />
      </body>
    </html>
  );
}
