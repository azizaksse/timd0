export interface TranslationItem {
  title: string;
  desc: string;
}

export interface PlanTranslation {
  name: string;
  subtitle: string;
  desc: string;
  price: string;
  priceAnnual: string;
  perSeat?: string;
  perSeatAnnual?: string;
  features: string[];
}

export interface TestimonialTranslation {
  name: string;
  role: string;
  company: string;
  comment: string;
}

export interface MetricTranslation {
  label: string;
  sub: string;
}

export interface Translations {
  nav: {
    produit: string;
    pourQui: string;
    tarifs: string;
    clients: string;
    preuve: string;
    vision: string;
    demo: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    targetBadge: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  problems: {
    title: string;
    subtitle: string;
    items: TranslationItem[];
  };
  solution: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    features: string[];
    diffTitle: string;
    differentiators: string[];
  };
  pourQui: {
    title: string;
    subtitle: string;
    segments: TranslationItem[];
  };
  pricing: {
    title: string;
    subtitle: string;
    popular: string;
    currency: string;
    currencyAnnual: string;
    perSeatLabel: string;
    startingFrom: string;
    cta: string;
    monthly: string;
    annual: string;
    annualSave: string;
    plans: PlanTranslation[];
  };
  clients: {
    title: string;
    subtitle: string;
    testimonials: TestimonialTranslation[];
  };
  preuve: {
    title: string;
    subtitle: string;
    metrics: MetricTranslation[];
    bottomText: {
      part1: string;
      text1: string;
      part2: string;
      text2: string;
    };
  };
  accompagnement: {
    title: string;
    items: TranslationItem[];
  };
  vision: {
    title: string;
    visionTitle: string;
    engagementsTitle: string;
    visionItems: string[];
    engagements: string[];
  };
  dashboard: {
    title: string;
    subtitle: string;
    study: string;
    caLabel: string;
    growthLabel: string;
    marginLabel: string;
    vsQuarter: string;
    stable: string;
    salesChart: string;
    stockChart: string;
  };
  footer: {
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
    brandDesc: string;
    navTitle: string;
    navLinks: { produit: string; tarifs: string; vision: string; contact: string };
    complianceTitle: string;
    complianceText: string;
    partnersText: string;
    socialTitle: string;
    copyright: string;
  };
}
