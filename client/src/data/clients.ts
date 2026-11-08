export type ClientProfile = {
  name: string;
  href: string;
  logo: string;
  logoClass: string;
  description: { en: string; fr: string };
};

export const CLIENTS: ClientProfile[] = [
  {
    name: "Vibes Lounge",
    href: "https://vibeslounge.ca",
    logo: "/clients/vibes-lounge-mark.png",
    logoClass: "client-logo-vibes",
    description: {
      en: "Vibes Lounge is a Toronto nightlife venue for events, celebrations and private bookings. Performance Processes supported a revamp of its website and improvements to business operations, helping the venue present its offering more clearly online and strengthen the way day-to-day work is carried out.",
      fr: "Vibes Lounge est un établissement de vie nocturne à Toronto qui accueille des événements, des célébrations et des réservations privées. Performance Processes a accompagné la refonte de son site Web et l’amélioration de ses opérations, afin de mieux présenter son offre en ligne et de soutenir le travail quotidien.",
    },
  },
  {
    name: "Maison Sparkle Living",
    href: "https://maisonsparkleliving.com",
    logo: "/clients/maison-sparkle-mark.png",
    logoClass: "client-logo-maison",
    description: {
      en: "Maison Sparkle Living provides premium home-cleaning services in Canada. Performance Processes supported the business launch and built its website, giving the new service a clear, professional online presence where prospective clients can understand what it offers.",
      fr: "Maison Sparkle Living offre des services de nettoyage résidentiel haut de gamme au Canada. Performance Processes a accompagné le lancement de l’entreprise et créé son site Web, lui donnant une présence en ligne claire et professionnelle pour présenter ses services à sa clientèle potentielle.",
    },
  },
  {
    name: "NextUp Foundation for Canadian Youth",
    href: "https://nextupcan.ca",
    logo: "/clients/nextup-mark.png",
    logoClass: "client-logo-nextup",
    description: {
      en: "NextUp Foundation for Canadian Youth supports young people in Canada through programs and community. Performance Processes created a modern, user-friendly website that communicates the foundation’s mission and helps it engage youth, donors and community partners.",
      fr: "NextUp Foundation for Canadian Youth soutient les jeunes au Canada par ses programmes et son engagement communautaire. Performance Processes a créé un site Web moderne et convivial qui présente la mission de la fondation et favorise les échanges avec les jeunes, les donateurs et les partenaires communautaires.",
    },
  },
  {
    name: "TrueNorth Property & Facilities",
    href: "https://truenorthpf.ca",
    logo: "/clients/truenorth-mark.png",
    logoClass: "client-logo-truenorth",
    description: {
      en: "TrueNorth Property & Facilities manages property and facilities. Performance Processes designed and developed a client portal and human resource management system around the organization’s workflows. By bringing records, client communications and administrative work into more centralized tools, the systems improved access to information and gave management stronger operational visibility.",
      fr: "TrueNorth Property & Facilities assure la gestion immobilière et des installations. Performance Processes a conçu et développé un portail client et un système de gestion des ressources humaines adaptés aux flux de travail de l’organisation. En centralisant davantage les dossiers, les communications avec les clients et les tâches administratives, ces outils ont facilité l’accès à l’information et amélioré la visibilité opérationnelle de la direction.",
    },
  },
  {
    name: "OGB Supreme Records",
    href: "https://ogbsupremerecords.com",
    logo: "/clients/ogb-supreme-mark.png",
    logoClass: "client-logo-ogb",
    description: {
      en: "OGB Supreme Records brings together creative education, music and media, with studios and coaching. Performance Processes supported the business launch and built its website, establishing an online home that introduces its creative work and services to the people it aims to reach.",
      fr: "OGB Supreme Records réunit l’éducation créative, la musique et les médias, avec des studios et du coaching. Performance Processes a accompagné le lancement de l’entreprise et créé son site Web, établissant un espace en ligne qui présente ses activités et ses services à son public.",
    },
  },
];
