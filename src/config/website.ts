import { siteConfig } from "./SiteConfig";

export const website = {
  phoneHref: `tel:${siteConfig.phoneNumber.replace(/\s/g, "")}`,
  phoneDisplay: "01793 239742",
  areas: [
    "Swindon",
    "Royal Wootton Bassett",
    "Surrounding Wiltshire towns and villages",
  ],
  trustatraderUrl:
    "https://www.trustatrader.com/traders/complete-building-services-roofers-roofing-swindon",
  // Verified against the public TrustATrader profile on 27 October 2026.
  reviewSummary: "4.96/5 from 24 reviews",
  reviewSource: "TrustATrader",
  guarantee: "Workmanship and material guarantees explained with your quote.",
};

export type Service = {
  slug: string;
  name: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  problem: string;
  solution: string;
  benefits: string[];
  details: { title: string; text: string }[];
  gallery: { src: string; alt: string; caption: string }[];
  process: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "roof-repairs",
    name: "Roof Repairs",
    title: "Roof Repairs Swindon | Leaking Roof & Storm Damage",
    description:
      "Leaking roof, slipped tiles or storm damage? Local roof repairs in Swindon and Royal Wootton Bassett. Free inspections and no-obligation quotes.",
    eyebrow: "ROOF REPAIRS · SWINDON & SURROUNDING AREAS",
    headline: "A small roof problem shouldn't become a big worry.",
    intro:
      "A leak, a loose tile or damage after a storm? Get the problem checked by a local roofer and understand exactly what needs fixing.",
    image: "/gallery/project-9.jpg",
    imageAlt:
      "Tiled roof and ridge detail from Complete Roofing's project gallery",
    problem: "Water getting in? Let's find out why.",
    solution:
      "A stain on the ceiling doesn't always tell you where the fault starts. We inspect the roof, explain the cause and recommend the repair it needs. You get a clear quote before work begins.",
    benefits: [
      "Leaks and damaged roofing felt",
      "Slipped, cracked or missing tiles",
      "Storm damage and loose ridge tiles",
      "Roof maintenance and flashing repairs",
    ],
    details: [
      {
        title: "Stop the leak at its source",
        text: "We check the roof covering, valleys and junctions to identify where water is entering, rather than relying on a surface patch.",
      },
      {
        title: "Keep the roof you have",
        text: "Where a repair is suitable, we explain that option. If the damage is more extensive, we'll show you what we find and discuss the next steps.",
      },
      {
        title: "Urgent help after a storm",
        text: "For active leaks or storm damage, call our team. Our emergency roofing service is available 24 hours a day, seven days a week.",
      },
    ],
    gallery: [
      {
        src: "/gallery/project-11.jpg",
        alt: "Roof valley detail between two tiled roof slopes",
        caption: "Roof valleys and weatherproofing",
      },
      {
        src: "/gallery/project-4.jpg",
        alt: "Chimney pot, cowl and repaired chimney crown",
        caption: "Chimney and roof junctions",
      },
      {
        src: "/gallery/project-12.jpg",
        alt: "Before and after photographs of a tiled roof",
        caption: "Roof repairs and renewal",
      },
    ],
    process: [
      "Tell us what you've noticed and where the property is.",
      "We inspect the roof and explain the fault and repair options.",
      "You receive a clear quote and an agreed plan for the repair.",
      "We complete the work, tidy up and explain the aftercare.",
    ],
    faqs: [
      {
        question: "Can you repair a leaking roof?",
        answer:
          "Yes. We investigate leaks on pitched and flat roofs, including damaged tiles, felt, flashing and valleys. The repair depends on the condition of the roof and the cause of the leak.",
      },
      {
        question: "Do you offer emergency roof repairs in Swindon?",
        answer:
          "Yes, our existing emergency roofing service operates 24/7 across Swindon and Royal Wootton Bassett. Call 01793 239742 to explain the situation and check availability.",
      },
      {
        question: "How much will a roof repair cost?",
        answer:
          "Access, materials and the extent of the fault all affect the cost. We assess the roof and give you a free, no-obligation quote before you decide.",
      },
    ],
  },
  {
    slug: "roof-replacement",
    name: "Roof Replacement",
    title: "Roof Replacement Swindon | New Roofs & Free Quotes",
    description:
      "Considering a new roof in Swindon or Royal Wootton Bassett? Slate and tile roof replacements from a local team. Arrange a free inspection and new roof quote.",
    eyebrow: "NEW ROOFS · SWINDON & ROYAL WOOTTON BASSETT",
    headline: "A new roof. A home you can feel confident in.",
    intro:
      "When repairs are becoming a regular expense, it helps to know your options. Get practical advice, a clear installation plan and a quote for a roof built around your home.",
    image: "/images/hero-image.jpg",
    imageAlt:
      "Completed tiled pitched roof from the existing Complete Roofing landing page",
    problem: "Is your ageing roof costing you more than it should?",
    solution:
      "Repeated leaks, widespread tile damage and a worn roof covering can make another repair a short-term answer. We assess the whole roof and explain whether replacement is the right next step, including materials, access and the work involved.",
    benefits: [
      "Slate and tile roof replacements",
      "Roof coverings, membrane and battens",
      "Ridge, hip and roof junction details",
      "A clear scope, schedule and quote",
    ],
    details: [
      {
        title: "Protect the structure beneath",
        text: "Replacement gives us the opportunity to assess the supporting roof structure and discuss any defects before the new covering goes on.",
      },
      {
        title: "Choose a finish that suits your home",
        text: "We talk you through suitable slate or tile options and the details that make the roof work with your property.",
      },
      {
        title: "Know what your quote covers",
        text: "Materials, access, removal of the existing covering and the installation plan are discussed before work starts, along with the applicable guarantees.",
      },
    ],
    gallery: [
      {
        src: "/gallery/project-8.jpg",
        alt: "New roofing membrane and timber battens ready for roof tiles",
        caption: "The preparation beneath the tiles",
      },
      {
        src: "/gallery/project-5.jpg",
        alt: "Slate roof installation in progress and completed",
        caption: "Slate roofing in progress",
      },
      {
        src: "/gallery/project-3.jpg",
        alt: "Completed tiled roof with dry ridge fixings",
        caption: "A finished tiled roof",
      },
    ],
    process: [
      "We inspect the existing roof and discuss your priorities.",
      "You receive material options, a written scope and your quote.",
      "We agree access, scheduling and how your home will be protected.",
      "Our team installs the roof, clears the site and explains the guarantees.",
    ],
    faqs: [
      {
        question: "Do I need a new roof or another repair?",
        answer:
          "That depends on the condition of the covering and the structure beneath it. We inspect the roof and explain the options so you can make an informed decision.",
      },
      {
        question: "How long will a roof replacement take?",
        answer:
          "The size, roof shape, access and weather all affect the programme. We'll discuss an expected schedule with your quote and keep you informed during the work.",
      },
      {
        question: "What guarantee comes with a new roof?",
        answer:
          "We offer guarantees on new roofs and use materials covered by manufacturer warranties where applicable. Ask us to confirm the precise cover, duration and conditions in your written quote.",
      },
    ],
  },
  {
    slug: "flat-roofing",
    name: "Flat Roofing",
    title: "Flat Roofers Swindon | Flat Roof Repair & Replacement",
    description:
      "EPDM rubber and felt flat roofing in Swindon and Royal Wootton Bassett. Flat roof repairs, installations and replacements for garages, extensions and homes.",
    eyebrow: "FLAT ROOFING · LOCAL SPECIALISTS",
    headline: "Keep the weather outside. And your flat roof worry-free.",
    intro:
      "From a leaking garage roof to a new extension, get a flat roofing system that suits the building. Local repairs, installations and replacements in Swindon and Royal Wootton Bassett.",
    image: "/gallery/complete-epdm-flat-roof.jpg",
    imageAlt:
      "Complete Building Services EPDM rubber flat roof shown in its TrustATrader project gallery",
    problem: "Leaks, splits or water that won't drain away?",
    solution:
      "Flat roof problems often start around joints, edges and drainage points. We inspect the surface and the details around it, then explain whether a targeted repair or a replacement system makes more sense.",
    benefits: [
      "Flat roof leak repairs",
      "EPDM rubber roofing",
      "Felt roofing systems",
      "Garage, extension and commercial roofs",
    ],
    details: [
      {
        title: "EPDM rubber roofs",
        text: "A flexible membrane used for garages, extensions and other flat roofs. We assess the shape and detailing of your roof to recommend a suitable installation.",
      },
      {
        title: "Felt roofing",
        text: "Layered felt roofing offers another option for a new flat roof or replacement. We'll discuss the system, finish and maintenance needs with you.",
      },
      {
        title: "Repairs and replacements",
        text: "Leaks, worn edges and damaged flashing need careful inspection. Where replacement is needed, we also consider drainage and the condition of the roof deck.",
      },
    ],
    gallery: [
      {
        src: "/gallery/complete-epdm-flat-roof.jpg",
        alt: "EPDM rubber flat roof installed by Complete Building Services",
        caption: "EPDM rubber flat roofing",
      },
      {
        src: "/gallery/complete-epdm-roof-skylights.jpg",
        alt: "Complete Building Services flat roof with two skylights",
        caption: "Flat roof with skylight details",
      },
    ],
    process: [
      "Tell us about your roof, leak or planned extension.",
      "We inspect the covering, roof edges and drainage.",
      "You receive suitable system options and a clear quote.",
      "We carry out the agreed work and explain the aftercare and cover.",
    ],
    faqs: [
      {
        question: "Do you install EPDM and felt flat roofs?",
        answer:
          "Yes. Our company website lists both EPDM rubber and felt roofing for domestic and commercial properties. We'll recommend a suitable option after assessing the roof.",
      },
      {
        question: "Can you repair my flat roof instead of replacing it?",
        answer:
          "In some cases, yes. We check the condition of the covering, joints and underlying deck before recommending a repair or replacement.",
      },
      {
        question: "Do you work on garage and extension roofs?",
        answer:
          "Yes. We work on flat roofs for garages, extensions and commercial properties across Swindon, Royal Wootton Bassett and the surrounding area.",
      },
    ],
  },
];

export const navigation = [
  { href: "/", label: "Home" },
  ...services.map((s) => ({ href: `/${s.slug}/`, label: s.name })),
  { href: "/contact/", label: "Contact" },
];
