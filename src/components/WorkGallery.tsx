import { siteConfig } from "@/config/SiteConfig";
import Image from "next/image";

const captions = [
  "Roof windows",
  "Roof ridge and tiling",
  "Tiled roof detail",
  "Chimney repairs",
  "Slate roof installation",
  "Completed roofing",
  "Before and after",
  "Membrane and battens",
  "Dry ridge detail",
  "Safe access for roof work",
  "Valley repairs",
  "Roof renewal",
];
export default function WorkGallery() {
  return (
    <section id="work-gallery" className="section gallery-section">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR WORK, UP CLOSE</p>
            <h2>
              Local roofs.
              <br />
              Real craftsmanship.
            </h2>
          </div>
          <p>
            A closer look at projects from our existing gallery, from the
            preparation underneath to the finishing details.
          </p>
        </div>
        <div className="project-grid">
          {siteConfig.workGallery.images.map((src, i) => (
            <figure key={src}>
              <div>
                <Image
                  src={src}
                  alt={captions[i] + " from Complete Roofing's project gallery"}
                  fill
                  sizes="(max-width: 600px) 50vw, 25vw"
                />
              </div>
              <figcaption>{captions[i]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
