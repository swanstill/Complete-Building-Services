import Image from "next/image";
export default function MeetOwner() {
  return (
    <section className="section about-section" id="meet-team">
      <div className="shell about-grid">
        <div className="about-image">
          <Image
            src="/images/owner-image.jpg"
            alt="Layton from Complete Roofing & Building Services"
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">COMPLETE BY NAME. COMPLETE BY NATURE.</p>
          <h2>
            A local team.
            <br />A personal approach.
          </h2>
          <p>
            When you get in touch, you&apos;re speaking to a small, family-run
            roofing business serving Swindon, Royal Wootton Bassett and the
            surrounding area.
          </p>
          <p>
            Layton and the team bring practical experience to repairs, new roofs
            and flat roofing. We take the time to explain the work, answer your
            questions and help you make the right decision for your home.
          </p>
          <ul className="check-list">
            <li>Our own in-house team</li>
            <li>Clear advice and no-obligation quotes</li>
            <li>Workmanship and material cover explained</li>
          </ul>
          <a href="#quote-form" className="text-link">
            Tell us about your roof <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
