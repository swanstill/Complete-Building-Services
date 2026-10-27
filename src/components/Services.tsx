import Image from "next/image";
import Link from "next/link";
import { services } from "@/config/website";

export default function Services({ exclude }: { exclude?: string }) {
  return (
    <section className="section" id="services">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE RIGHT HELP FOR YOUR ROOF</p>
            <h2>
              {exclude ? (
                "More ways we can help."
              ) : (
                <>
                  From a small repair
                  <br />
                  to a complete new roof.
                </>
              )}
            </h2>
          </div>
          <p>
            Whatever your roof needs, start with a clear assessment and a free
            quote from our local team.
          </p>
        </div>
        <div className={exclude ? "service-grid related" : "service-grid"}>
          {services
            .filter((s) => s.slug !== exclude)
            .map((s, i) => (
              <Link
                href={"/" + s.slug + "/"}
                className="service-card"
                key={s.slug}
              >
                <div className="service-image">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                  <span className="image-number">0{i + 1}</span>
                </div>
                <div className="service-card-content">
                  <h3>
                    {s.name}
                    <span aria-hidden="true">↗</span>
                  </h3>
                  <p>
                    {s.slug === "roof-repairs"
                      ? "Leaks, slipped tiles and storm damage. Find the fault and get it fixed."
                      : s.slug === "roof-replacement"
                        ? "A fresh start for an ageing roof. Slate and tile roofs built around your home."
                        : "Repairs and new installations. EPDM and felt systems for lasting protection."}
                  </p>
                  <span className="text-link">
                    Explore {s.name.toLowerCase()}{" "}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
        </div>
        {!exclude && (
          <div className="additional-services">
            <span>Also here to help with</span>
            <Link href="/contact/#emergency-roofing">Emergency roofing ↗</Link>
            <Link href="/contact/#chimney-repairs">Chimney repairs ↗</Link>
            <Link href="/contact/#guttering">Guttering & roofline ↗</Link>
          </div>
        )}
      </div>
    </section>
  );
}
