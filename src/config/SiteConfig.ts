import { SiteConfig } from "@/lib/types";

export const siteConfig: SiteConfig = {
  companyName: "Complete Roofing & Building Services",
  logoImage: "/icons/logo.jpg",
  logoAltText: "Complete Roofing & Building Services",
  heroSloganPrimary: "Your local roofing team",
  heroSloganSecondary: "A family-run roofing business",
  locationPrimary: "Swindon & Royal Wootton Bassett",
  foundedYear: "Experienced local roofers",
  // Historical landing-page claims are documented in docs/AUDIT.md.
  // Do not restore numerical claims until the client confirms them.
  reviewScore: "",
  reviewCount: "",
  guaranteeYears: "All work guaranteed",
  insurredInfo: "Insurance verified on TrustATrader",
  jobsCompleted: "",
  phoneNumber: "+44 1793 239742",
  emailAddress: "info@completebuilding-services.co.uk",
  address: "15 Shaftesbury Centre, Percy Street, Swindon, SN2 2AZ",
  ctaTextPrimary: "Get My Free Quote",
  ctaTextSecondary: "Call Us",
  heroImage: "/images/hero-image.jpg",
  heroImageAltText:
    "Completed tiled roof from Complete Roofing's project gallery",
  heroTitle: "Roofers in Swindon & Royal Wootton Bassett",
  heroDescription:
    "Roof repairs, replacements and flat roofing from your local team. Clear advice, a free quote and workmanship you can see.",
  galleryImages: [
    "/gallery/project-3.jpg",
    "/gallery/project-8.jpg",
    "/gallery/project-12.jpg",
  ],
  checkatradeRatingImage: "/icons/check-trade.png",
  faqData: [
    {
      question: "How do I know if my roof needs repairing?",
      answer:
        "Leaks, water stains, missing or cracked tiles and damaged flashing are all reasons to arrange an inspection. We assess the roof and explain what needs attention.",
    },
    {
      question: "Do you offer emergency roof repairs?",
      answer:
        "Yes. Our emergency roofing service operates 24 hours a day, seven days a week across Swindon and Royal Wootton Bassett. Call 01793 239742 to discuss the problem and check availability.",
    },
    {
      question: "Do you offer guarantees?",
      answer:
        "Yes. We explain the workmanship and applicable material guarantees with your quote. Ask the team to confirm the cover, duration and conditions for your particular project.",
    },
    {
      question: "What areas do you cover?",
      answer:
        "Our core areas are Swindon and Royal Wootton Bassett, with work also undertaken in the surrounding Wiltshire towns and villages. Contact us to check your postcode.",
    },
    {
      question: "Will I have to commit when I request a quote?",
      answer:
        "No. Quotes are free and without obligation. We explain the recommended work and cost so you can decide whether to go ahead.",
    },
  ],
  brand: { primary: "#FA6237", secondary: "#010203" },
  seo: {
    baseUrl: "https://complete-building-services-tau.vercel.app",
    titleTemplate: "%s | Complete Roofing & Building Services",
    defaultTitle: "Roofers in Swindon & Royal Wootton Bassett",
    description:
      "Local roof repairs, roof replacements and flat roofing in Swindon and Royal Wootton Bassett. Request your free, no-obligation quote.",
    ogImage: "/images/hero-image.jpg",
    twitterHandle: "",
  },
  reviewsData: {
    source: "Checkatrade",
    sourceImage: "/icons/checkatrade.png",
    reviewsUrl:
      "https://www.checkatrade.com/trades/CompleteBuildingServices985447",
    reviews: [
      {
        name: "Kevin N",
        serviceType: "Polycarbonate Roofing Installation",
        rating: 5,
        review:
          "Absolutely phenomenal service. I asked for help on check a trade. I booked with the first company to reply but then they let me down, and I'm glad they did because the moment I asked Layton to quote, I knew this was the right company to book. My (asbestos) garage roof was replaced about 6 years ago and already developed cracks. Layton immediately knew how to fix, was given a quote to fix the damaged part and another quote to sort the whole lot, and went with the latter so I don't have to think about it again anytime soon. Immediately identified what was wrong with previous install and fixed that on top of what was quoted. I am over the moon, team were on time to the minute, clearly experienced professionals who take pride in their work, my only regret is not finding you 6 years ago! I'll be recommending you to everyone... Cheers gents, you're all fabulous!",
        date: "22 July 2026",
        postalCode: "SN3",
      },
      {
        name: "Lee",
        serviceType: "Pitched Roofing Repair",
        rating: 5,
        review:
          "Fantastic contractors. Excellent communication, turned up early, polite to myself and the neighbours, and did a professional quality job. Couldn't recommend enough.",
        date: "17 July 2026",
        postalCode: "SN25",
      },
      {
        name: "Claire C",
        serviceType: "Chimney Cowlings Installation",
        rating: 5,
        review:
          "Quick to respond. Visited to discuss requirements and options. Competitive price and sorted in two days of visit.",
        date: "25 June 2026",
        postalCode: "SN6",
      },
      {
        name: "Anonymous",
        serviceType: "Slate / Tiled Roofing Installation",
        rating: 5,
        review:
          "Arrived on time and replaced my complete roof in the time Layton said he would and left everything clean at the end of each day they were here. I have already recommended Layton to my mum.",
        date: "16 March 2026",
        postalCode: "SN1",
      },
      {
        name: "Anonymous",
        serviceType: "Ridged Tiles Repair",
        rating: 5,
        review:
          "We had a leak due to the recent rain I got in touch with Layton he came and found the problem and we arranged a date for the work to be completed. Everything was done as planned and we have not had a leak since.",
        date: "09 March 2026",
        postalCode: "SN3",
      },
      {
        name: "Anonymous",
        serviceType: "Roof Repair",
        rating: 5,
        review:
          "I had water stains on my bedroom ceiling got in touch with Layton he came out found the problem was broken tiles had put a hole in my felt and letting water in when it rained we booked Layton in to fix the roof he turned up repaired the felt and replaced the broken tiles. Thanks for a quick professional response.",
        date: "02 July 2026",
        postalCode: "SN3",
      },
    ],
  },

  mjqrReviewsData: {
    source: "My Job Quote",
    sourceImage: "/icons/myjobquote-review.png",
    reviewsUrl: "",
    reviews: [],
  },
  formData: {
    formHeading: "Get a Free No-Obligation Quote",
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Your full name",
        autoComplete: "name",
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "you@example.co.uk",
        autoComplete: "email",
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        type: "tel",
        placeholder: "Your phone number",
        autoComplete: "tel",
        hint: "e.g. 07911 123456 (UK number)",
      },
      {
        name: "postcode",
        label: "Post Code",
        type: "text",
        placeholder: "Your property postcode",
        autoComplete: "postal-code",
        hint: "e.g. SN2 2AZ",
      },
    ],
  },
  howItWorks: {
    headline: "Getting your roof sorted is simple",
    steps: [
      {
        icon: "/icons/receipt.svg",
        title: "Get in touch",
        description:
          "Tell us about your roof. We'll arrange a convenient time to take a look.",
      },
      {
        icon: "/icons/search-check.svg",
        title: "Get a clear quote",
        description:
          "We explain what we've found, the work needed and what it will cost.",
      },
      {
        icon: "/icons/clipboard-check.svg",
        title: "We get to work",
        description:
          "Our team carries out the agreed work and leaves your property tidy.",
      },
      {
        icon: "/icons/handshake.svg",
        title: "Feel looked after",
        description:
          "We explain the aftercare and guarantees, and answer your questions.",
      },
    ],
  },
  workGallery: {
    headline: "Local roofs. Real craftsmanship.",
    caption: "Projects from our existing company gallery",
    images: Array.from({ length: 12 }, (_, i) =>
      i === 1
        ? "/gallery/roof-ridge-tiling.webp"
        : "/gallery/project-" + (i + 1) + ".jpg",
    ),
  },
  ownerInfo: {
    headline: "Meet Layton and the team",
    text: "A local, family-run roofing business.",
    bulletPoints: [
      "Our own in-house team",
      "Free, no-obligation quotes",
      "Work guaranteed",
    ],
    ownerImage: "/images/owner-image.jpg",
  },
  cta: {
    headline: "Let's take care of your roof.",
    subtitle: "Start with a free, no-obligation quote.",
    buttonPrimary: "Get My Free Quote",
    buttonSecondary: "Call Us",
    buttonPrimaryUrl: "#quote-form",
    buttonSecondaryUrl: "tel:+441793239742",
    caption: "Free quotes · Work guaranteed",
  },
};
