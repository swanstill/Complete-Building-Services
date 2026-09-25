export interface SiteConfig {
  companyName: string;
  logoImage: string;
  logoAltText: string;
  heroSloganPrimary: string;
  heroSloganSecondary: string;
  locationPrimary: string;
  foundedYear: string;
  reviewScore: string;
  reviewCount: string;
  guaranteeYears: string;
  jobsCompleted: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  ctaTextPrimary: string;
  ctaTextSecondary: string;
  heroImage: string;
  heroImageAltText: string;
  heroTitle: string;
  heroDescription: string;
  galleryImages: string[];
  insurredInfo: string;
  checkatradeRatingImage: string;
  faqData: { question: string; answer: string }[];
  brand: { primary: string; secondary: string };
  seo: {
    baseUrl: string;
    titleTemplate: string;
    defaultTitle: string;
    description: string;
    ogImage: string;
    twitterHandle: string;
  };
  reviewsData: {
    source: string;
    sourceImage: string;
    reviewsUrl: string;
    reviews: {
      name: string;
      serviceType: string;
      rating: number;
      review: string;
      date: string;
      postalCode: string;
    }[];
  };
  mjqrReviewsData: {
    source: string;
    sourceImage: string;
    reviewsUrl: string;
    reviews: {
      name: string;
      serviceType: string;
      rating: number;
      review: string;
      date: string;
      postalCode: string;
    }[];
  };
  formData: {
    formHeading: string;
    formSteps: string[];
    steps: {
      question: string;
      type: string;
      placeholder?: string;
      options?: {
        label: string;
        icon?: string;
      }[];
    }[];
  };
  howItWorks: {
    headline: string;
    steps: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  workGallery: {
    headline: string;
    caption: string;
    images: string[];
  };
  ownerInfo: {
    headline: string;
    text: string;
    bulletPoints: string[];
    ownerImage: string;
  };
  cta: {
    headline: string;
    subtitle: string;
    buttonPrimary: string;
    buttonSecondary: string;
    buttonPrimaryUrl: string;
    buttonSecondaryUrl: string;
    caption: string;
  };
}
