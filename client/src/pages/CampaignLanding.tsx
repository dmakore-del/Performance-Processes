import { Link, useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { AcquisitionForm } from "@/components/AcquisitionForm";
import { bookingHref, trackAcquisition } from "@/lib/acquisition";
import { useLanguage } from "@/hooks/use-language";
import launchImage from "@assets/image_search/web-digital-7876895.jpg";
import growthImage from "@assets/image_search/web-digital-7698712.jpg";

type CampaignCopy = {
  title: string;
  intro: string;
  action: string;
  audience: string;
  audienceText: string;
  servicesHeading: string;
  services: { title: string; text: string; href: string }[];
  offersHeading: string;
  offers: { title: string; text: string; detail: string; service: string }[];
  processHeading: string;
  process: { title: string; text: string }[];
  faqHeading: string;
  faqs: { question: string; answer: string }[];
  finalTitle: string;
  finalText: string;
  formTitle: string;
  imageAlt: string;
};

const CONTENT: Record<"en" | "fr", Record<"launch" | "growth", CampaignCopy>> = {
  en: {
    launch: {
      title: "Starting a Business? Let’s Build It Right From the Start.",
      intro: "Starting a business involves more than a good idea. You need a clear structure, a professional presence, and practical systems to begin operating. We help bring those essentials together, one considered step at a time.",
      action: "Book a Business Launch Consultation",
      audience: "For new founders finding their footing",
      audienceText: "For first-time entrepreneurs, side-hustle founders, newcomers starting a business, and professionals moving into self-employment. We help you understand the steps, decide what belongs in scope, and prepare for your first customers.",
      servicesHeading: "Everything your launch needs to take shape",
      services: [
        { title: "Business registration & formation support", text: "Understand common setup options, organize registration requirements, and map the administrative steps. We do not provide legal, tax, or accounting advice.", href: "/business-setup" },
        { title: "Business setup & organization", text: "Prepare essential business information, define practical ways of working, and establish the tools needed for day-to-day activity.", href: "/business-setup" },
        { title: "Website & digital launch", text: "Create a professional website and online presence that introduces your business, explains your services, and helps customers reach you.", href: "/websites-digital" },
        { title: "Funding readiness", text: "Explore relevant funding opportunities and organize information that may be requested by a program. Eligibility and approval remain with funders.", href: "/grants-financing" },
      ],
      offersHeading: "Four ways we can shape the work",
      offers: [
        { title: "Business Setup Essentials", text: "For entrepreneurs who need guidance establishing their business foundations.", detail: "An initial consultation, a personalized setup checklist, registration process guidance, and a business launch action plan.", service: "business-setup-essentials" },
        { title: "Complete Business Launch", text: "For founders seeking coordinated support across setup, web presence, and essential operating systems.", detail: "The final scope is tailored to your business requirements and may bring setup, website, email, and operating tools together.", service: "complete-business-launch" },
        { title: "Website & Digital Presence", text: "For a new business that needs a clear digital home and a customer-ready enquiry path.", detail: "Website strategy and development, domain and hosting coordination, contact or booking integrations, and launch guidance as agreed.", service: "website-digital-presence" },
        { title: "Business Systems & Growth", text: "For founders who want a more organized way to manage recurring business work.", detail: "Review priorities and establish appropriate workflows, tools, templates, and operating practices within an agreed scope.", service: "business-systems-growth" },
      ],
      processHeading: "A clear path from idea to opening",
      process: [
        { title: "Tell us about your idea", text: "Share what you are planning and where you want support." },
        { title: "Get a clear plan", text: "We identify relevant services, deliverables, and practical next steps." },
        { title: "Build your foundations", text: "We work through the setup and digital implementation activities agreed together." },
        { title: "Prepare to launch", text: "Review deliverables and get ready to begin operating." },
      ],
      faqHeading: "Questions about starting a business",
      faqs: [
        { question: "Do I need to incorporate before starting?", answer: "Not every business needs to incorporate. The appropriate structure depends on your circumstances, activities, and goals. We can clarify the setup process and when professional legal or tax advice may be needed." },
        { question: "Can you help create a website for my new business?", answer: "Yes. Website development and digital launch support can be part of an agreed project scope." },
        { question: "Can you help me apply for grants?", answer: "We can discuss funding research and application-readiness support, depending on the program and your business circumstances. Eligibility and approval are determined by the funding organization." },
        { question: "How much does business setup support cost?", answer: "Fees depend on the services, requirements, and complexity of your project. We explain the proposed scope and fees before work begins." },
        { question: "How long will a launch project take?", answer: "Timing depends on the agreed deliverables, decision points, and the information needed from you. We discuss a practical schedule during scope planning." },
      ],
      finalTitle: "Turn your business idea into a practical next step.",
      finalText: "Tell us where you are in your launch journey. We will discuss your priorities and whether there is a suitable project scope.",
      formTitle: "Tell us what you are planning",
      imageAlt: "A small business team reviewing a launch plan and financial documents together",
    },
    growth: {
      title: "Your Business Is Growing. Are Your Systems Keeping Up?",
      intro: "A growing business needs more than customers. It needs reliable processes, a professional digital presence, and systems that make everyday work easier. We help improve how your business operates and connects with customers.",
      action: "Book a Business Growth Assessment",
      audience: "For established businesses ready to improve",
      audienceText: "For local service businesses, consultants, contractors, retailers, and growing small companies. We look at how your website, customer journey, workflows, and tools fit together before recommending work.",
      servicesHeading: "Solutions designed for growing businesses",
      services: [
        { title: "Website design & improvement", text: "Build or improve a website that represents your business, communicates your services, and makes customer enquiries easier.", href: "/websites-digital" },
        { title: "Business process improvement", text: "Review how work gets done, identify unnecessary steps, and create clearer workflows for recurring activities.", href: "/business-setup" },
        { title: "Digital systems & automation", text: "Assess appropriate tools for enquiries, scheduling, customer information, and routine administrative tasks.", href: "/business-setup" },
        { title: "Business operations support", text: "Develop practical processes, templates, and systems that make operations easier to manage as your business evolves.", href: "/consulting" },
      ],
      offersHeading: "Choose a useful place to begin",
      offers: [
        { title: "Business Setup Essentials", text: "For a business that needs clearer foundations before adding more complexity.", detail: "A focused review of setup needs, practical guidance, and an action plan shaped to the agreed priorities.", service: "business-setup-essentials" },
        { title: "Complete Business Launch", text: "For a newer operation coordinating core business foundations and customer-facing tools.", detail: "A tailored scope may connect setup, a website, business email, and essential operating systems.", service: "complete-business-launch" },
        { title: "Website & Digital Presence", text: "For businesses planning a new website or a stronger online customer experience.", detail: "Review the current presence or plan a new build, including content structure, enquiry paths, and relevant integrations.", service: "website-digital-presence" },
        { title: "Business Systems & Growth", text: "For businesses that need to streamline workflows, improve internal organization, or implement digital tools.", detail: "Assess current processes and priorities, then define suitable workflow, systems, and implementation support.", service: "business-systems-growth" },
      ],
      processHeading: "Assess what is happening, then improve what matters",
      process: [
        { title: "Discover", text: "Understand your business, current challenges, and priorities." },
        { title: "Assess", text: "Identify opportunities across your website, systems, and workflows." },
        { title: "Implement", text: "Deliver the agreed improvements and practical solutions." },
        { title: "Review", text: "Check that new systems and processes support the way you intend to work." },
      ],
      faqHeading: "Questions about business improvement",
      faqs: [
        { question: "Do I need to replace my existing website?", answer: "Not necessarily. We can review your current website and discuss whether targeted improvements or a new build may be appropriate." },
        { question: "Can you help automate manual business tasks?", answer: "We can assess repetitive workflows and recommend suitable tools and automation opportunities based on your existing systems." },
        { question: "Do you work with small businesses?", answer: "Yes. Our support is designed for entrepreneurs and businesses at different stages of development." },
        { question: "How does the assessment work?", answer: "We discuss your business goals, current challenges, and priorities, then determine whether there is a suitable project scope to explore." },
        { question: "How are fees determined?", answer: "Fees depend on the project scope, requirements, and complexity. We explain the proposed work and fees before anything begins." },
      ],
      finalTitle: "Make your business easier to run.",
      finalText: "Whether you need a stronger website, better processes, or more organized systems, start with a conversation about what is getting in the way.",
      formTitle: "Tell us what you want to improve",
      imageAlt: "A diverse business team reviewing strategy and operating plans",
    },
  },
  fr: {
    launch: {
      title: "Vous démarrez une entreprise? Bâtissons-la sur de bonnes bases.",
      intro: "Démarrer une entreprise demande plus qu’une bonne idée. Il faut une structure claire, une présence professionnelle et des systèmes pratiques pour commencer à fonctionner. Nous réunissons ces éléments, une étape réfléchie à la fois.",
      action: "Réserver une consultation de lancement",
      audience: "Pour les fondateurs qui prennent leurs repères",
      audienceText: "Pour les entrepreneurs débutants, les projets à temps partiel, les nouveaux arrivants qui lancent une entreprise et les professionnels qui deviennent travailleurs autonomes. Nous clarifions les étapes et préparons vos premiers clients.",
      servicesHeading: "Les éléments essentiels pour concrétiser votre lancement",
      services: [
        { title: "Soutien à l’enregistrement et à la formation", text: "Comprendre les options courantes, organiser les exigences et planifier les étapes administratives. Nous n’offrons pas de conseils juridiques, fiscaux ou comptables.", href: "/business-setup" },
        { title: "Mise en place et organisation", text: "Préparer les renseignements essentiels, définir des façons pratiques de travailler et établir les outils nécessaires aux activités quotidiennes.", href: "/business-setup" },
        { title: "Site web et lancement numérique", text: "Créer un site professionnel qui présente votre entreprise, explique vos services et facilite la prise de contact.", href: "/websites-digital" },
        { title: "Préparation au financement", text: "Explorer des possibilités et organiser les renseignements demandés par les programmes. L’admissibilité et l’approbation relèvent des bailleurs de fonds.", href: "/grants-financing" },
      ],
      offersHeading: "Quatre façons de structurer le travail",
      offers: [
        { title: "Essentiels de mise en place", text: "Pour les entrepreneurs qui ont besoin d’orientation pour établir les fondations de leur entreprise.", detail: "Consultation initiale, liste de mise en place personnalisée, orientation sur le processus d’enregistrement et plan d’action de lancement.", service: "business-setup-essentials" },
        { title: "Lancement complet d’entreprise", text: "Pour les fondateurs qui souhaitent coordonner la mise en place, le site web et les systèmes essentiels.", detail: "Le périmètre final est adapté aux besoins et peut réunir la mise en place, le site, le courriel et les outils opérationnels.", service: "complete-business-launch" },
        { title: "Site web et présence numérique", text: "Pour une nouvelle entreprise qui a besoin d’un espace numérique clair et d’un parcours de demande efficace.", detail: "Stratégie et développement web, coordination du domaine et de l’hébergement, intégrations convenues et conseils de lancement.", service: "website-digital-presence" },
        { title: "Systèmes d’entreprise et croissance", text: "Pour les fondateurs qui souhaitent mieux organiser les tâches récurrentes.", detail: "Établir les priorités et mettre en place des flux de travail, outils, modèles et pratiques selon le périmètre convenu.", service: "business-systems-growth" },
      ],
      processHeading: "Un parcours clair de l’idée à l’ouverture",
      process: [
        { title: "Parlez-nous de votre idée", text: "Présentez votre projet et le soutien dont vous avez besoin." },
        { title: "Obtenez un plan clair", text: "Nous ciblons les services, livrables et prochaines étapes utiles." },
        { title: "Bâtissez vos fondations", text: "Nous réalisons les activités de mise en place et de mise en œuvre convenues." },
        { title: "Préparez le lancement", text: "Examinez les livrables et préparez-vous à commencer vos activités." },
      ],
      faqHeading: "Questions sur le démarrage d’entreprise",
      faqs: [
        { question: "Dois-je incorporer avant de démarrer?", answer: "Toutes les entreprises n’ont pas besoin d’être incorporées. La structure appropriée dépend de votre situation, de vos activités et de vos objectifs. Nous pouvons clarifier les étapes et les moments où un avis juridique ou fiscal est nécessaire." },
        { question: "Pouvez-vous créer un site pour ma nouvelle entreprise?", answer: "Oui. Le développement web et le soutien au lancement numérique peuvent faire partie du périmètre convenu." },
        { question: "Pouvez-vous m’aider à demander des subventions?", answer: "Nous pouvons discuter de la recherche de financement et de la préparation aux demandes selon le programme et votre situation. L’admissibilité et l’approbation sont déterminées par l’organisme concerné." },
        { question: "Combien coûte le soutien à la mise en place?", answer: "Les honoraires dépendent des services, des exigences et de la complexité du projet. Le périmètre proposé et les honoraires sont expliqués avant le début du travail." },
        { question: "Combien de temps dure un lancement?", answer: "Le délai dépend des livrables convenus, des décisions et des renseignements nécessaires. Nous établissons un échéancier réaliste lors de la planification." },
      ],
      finalTitle: "Transformez votre idée en prochaine étape concrète.",
      finalText: "Parlez-nous de votre parcours de lancement. Nous discuterons de vos priorités et d’un périmètre de projet approprié.",
      formTitle: "Parlez-nous de votre projet",
      imageAlt: "Une petite équipe examine un plan de lancement et des documents financiers",
    },
    growth: {
      title: "Votre entreprise grandit. Vos systèmes suivent-ils?",
      intro: "Une entreprise en croissance a besoin de plus que de clients. Elle a besoin de processus fiables, d’une présence numérique professionnelle et de systèmes qui facilitent le travail quotidien.",
      action: "Réserver une évaluation de croissance",
      audience: "Pour les entreprises établies prêtes à s’améliorer",
      audienceText: "Pour les services locaux, consultants, entrepreneurs, commerces et petites entreprises en croissance. Nous examinons les liens entre site web, expérience client, flux de travail et outils avant de proposer des pistes.",
      servicesHeading: "Des solutions pour les entreprises en croissance",
      services: [
        { title: "Conception et amélioration web", text: "Créer ou améliorer un site qui représente votre entreprise, présente vos services et facilite les demandes.", href: "/websites-digital" },
        { title: "Amélioration des processus", text: "Examiner le travail, repérer les étapes inutiles et clarifier les flux de travail récurrents.", href: "/business-setup" },
        { title: "Systèmes numériques et automatisation", text: "Évaluer les outils de demande, de planification, de gestion des clients et des tâches administratives.", href: "/business-setup" },
        { title: "Soutien aux opérations", text: "Développer des processus, modèles et systèmes pratiques adaptés à l’évolution de l’entreprise.", href: "/consulting" },
      ],
      offersHeading: "Choisissez un point de départ utile",
      offers: [
        { title: "Essentiels de mise en place", text: "Pour une entreprise qui a besoin de fondations plus claires.", detail: "Examen ciblé des besoins, orientation pratique et plan d’action selon les priorités convenues.", service: "business-setup-essentials" },
        { title: "Lancement complet d’entreprise", text: "Pour une jeune entreprise qui coordonne ses fondations et ses outils destinés aux clients.", detail: "Un périmètre adapté peut relier mise en place, site web, courriel professionnel et systèmes essentiels.", service: "complete-business-launch" },
        { title: "Site web et présence numérique", text: "Pour les entreprises qui préparent un nouveau site ou une meilleure expérience numérique.", detail: "Examen de la présence actuelle ou planification d’un nouveau site, de la structure du contenu et des intégrations pertinentes.", service: "website-digital-presence" },
        { title: "Systèmes d’entreprise et croissance", text: "Pour simplifier les flux, l’organisation interne ou la mise en place d’outils numériques.", detail: "Évaluer les processus et priorités, puis définir les systèmes et le soutien à la mise en œuvre appropriés.", service: "business-systems-growth" },
      ],
      processHeading: "Comprendre la situation, puis améliorer l’essentiel",
      process: [
        { title: "Découvrir", text: "Comprendre votre entreprise, ses défis et ses priorités." },
        { title: "Évaluer", text: "Repérer les possibilités liées au site web, aux systèmes et aux flux." },
        { title: "Mettre en œuvre", text: "Réaliser les améliorations et solutions convenues." },
        { title: "Examiner", text: "Vérifier que les processus soutiennent votre façon de travailler." },
      ],
      faqHeading: "Questions sur l’amélioration d’entreprise",
      faqs: [
        { question: "Dois-je remplacer mon site actuel?", answer: "Pas nécessairement. Nous pouvons examiner le site et discuter de l’intérêt d’améliorations ciblées ou d’une nouvelle création." },
        { question: "Pouvez-vous automatiser des tâches manuelles?", answer: "Nous pouvons examiner les tâches répétitives et recommander des outils et possibilités d’automatisation adaptés à vos systèmes." },
        { question: "Travaillez-vous avec de petites entreprises?", answer: "Oui. Nos services soutiennent les entrepreneurs et les entreprises à différentes étapes." },
        { question: "Comment se déroule l’évaluation?", answer: "Nous discutons de vos objectifs, défis et priorités, puis déterminons s’il existe un périmètre de projet à explorer." },
        { question: "Comment les honoraires sont-ils établis?", answer: "Ils dépendent du périmètre, des exigences et de la complexité. Le travail proposé et les honoraires sont présentés avant le début." },
      ],
      finalTitle: "Rendez votre entreprise plus facile à gérer.",
      finalText: "Pour un meilleur site, des processus plus clairs ou des systèmes mieux organisés, commençons par ce qui vous ralentit.",
      formTitle: "Parlez-nous de ce que vous souhaitez améliorer",
      imageAlt: "Une équipe diversifiée examine sa stratégie et ses opérations",
    },
  },
};

export default function CampaignLanding() {
  const [location] = useLocation();
  const { language } = useLanguage();
  const customerType = location.startsWith("/grow-your-business") ? "growth" : "launch";
  const fr = language === "fr";
  const page = CONTENT[fr ? "fr" : "en"][customerType];
  const image = customerType === "launch" ? launchImage : growthImage;
  const pageTitle = customerType === "launch"
    ? (fr ? "Démarrer une entreprise au Canada | Performance Processes" : "Start a Business in Canada | Performance Processes")
    : (fr ? "Améliorer votre entreprise | Performance Processes" : "Website & Business Systems Support | Performance Processes");

  return (
    <div className="min-h-[100dvh] bg-background">
      <SEOHead title={pageTitle} description={page.intro} path={customerType === "launch" ? "/start-a-business" : "/grow-your-business"} />
      <Navbar />
      <main>
        <section className="grid border-b border-primary/10 bg-secondary lg:min-h-[590px] lg:grid-cols-2">
          <div className="mx-auto flex w-full max-w-3xl flex-col justify-center px-5 py-14 md:px-10 lg:py-20">
            <h1 className="text-display max-w-2xl text-5xl leading-[.98] md:text-7xl">{page.title}</h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{page.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={bookingHref(customerType)} onClick={() => trackAcquisition("booking_started", { customerType })} className="bg-primary px-6 py-4 text-sm text-primary-foreground transition-colors hover:bg-accent hover:text-primary">{page.action}</Link>
              <a href="#services" className="border-b border-primary pb-1 text-sm">{fr ? "Voir les services" : "Explore the services"}</a>
            </div>
          </div>
          <div className="relative min-h-[300px] overflow-hidden sm:min-h-[420px] lg:min-h-full"><img src={image} alt={page.imageAlt} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" /></div>
        </section>

        {customerType === "growth" && <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 md:px-8 lg:grid-cols-2">
          <video autoPlay muted loop playsInline preload="metadata" aria-label={fr ? "Une équipe diversifiée examine des documents de planification" : "A diverse team reviewing business planning documents"} className="aspect-video w-full object-cover"><source src="/assets/videos/team-collab.mp4" type="video/mp4" /></video>
          <div><h2 className="text-display text-4xl">{fr ? "Des outils qui soutiennent votre équipe." : "Systems that support your team."}</h2><p className="mt-5 text-base leading-7 text-muted-foreground">{fr ? "Nous examinons les étapes, les responsabilités et les outils de vos opérations pour définir des améliorations adaptées à votre façon de travailler." : "We review the steps, responsibilities, and tools behind your operations to define improvements that fit how your team works."}</p></div>
        </section>}

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[.8fr_1.2fr]">
          <h2 className="text-display max-w-xl text-4xl md:text-5xl">{page.audience}</h2>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{page.audienceText}</p>
        </section>

        <section id="services" className="bg-secondary py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="text-display max-w-3xl text-4xl md:text-5xl">{page.servicesHeading}</h2>
            <div className="mt-9 grid border-l border-t border-primary/15 sm:grid-cols-2">
              {page.services.map((service) => <Link key={service.title} href={service.href} onClick={() => trackAcquisition("select_service", { customerType })} className="border-b border-r border-primary/15 bg-background p-6 transition-colors hover:bg-[#fbf2f3] sm:p-8"><h3 className="text-display text-2xl">{service.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{service.text}</p><span className="mt-5 inline-block border-b border-primary pb-1 text-xs">{fr ? "En savoir plus" : "Learn more"}</span></Link>)}
            </div>
            <Link href="/grants-financing" className="mt-7 inline-block border-b border-primary pb-1 text-sm">{fr ? "Explorer les subventions et le financement" : "Explore Grants & Financing"}</Link>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-col justify-between gap-5 border-b border-primary/15 pb-7 md:flex-row md:items-end"><h2 className="text-display max-w-2xl text-4xl md:text-5xl">{page.offersHeading}</h2><p className="max-w-md text-sm leading-6 text-muted-foreground">{fr ? "Le périmètre et les honoraires sont établis selon vos besoins, après consultation." : "Scope and fees are defined around your needs after consultation."}</p></div>
            <div className="mt-2 divide-y divide-primary/15">
              {page.offers.map((offer) => <article key={offer.title} className="grid gap-4 py-7 md:grid-cols-[.75fr_1.25fr_auto] md:items-start md:gap-8">
                <h3 className="text-display text-2xl">{offer.title}</h3>
                <div><p className="text-sm font-medium leading-6">{offer.text}</p><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{offer.detail}</p></div>
                <Link href={bookingHref(customerType, offer.service)} onClick={() => trackAcquisition("select_service", { customerType })} className="mt-1 w-fit border-b border-primary pb-1 text-xs font-medium">{fr ? "Discuter de ce service" : "Discuss this service"}</Link>
              </article>)}
            </div>
            <p className="mt-4 max-w-3xl border-l-2 border-accent pl-4 text-xs leading-6 text-muted-foreground">{fr ? "Chaque projet est défini après discussion. Les honoraires proposés sont communiqués avant le début du travail." : "Each project is scoped after discussion. Proposed fees are shared before work begins."}</p>
          </div>
        </section>

        <section className="bg-primary py-20 text-primary-foreground md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8"><h2 className="text-display text-4xl md:text-5xl">{page.processHeading}</h2><div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{page.process.map((step) => <div key={step.title} className="border-t border-primary-foreground/35 pt-5"><h3 className="text-display text-2xl">{step.title}</h3><p className="mt-3 text-sm leading-6 text-primary-foreground/75">{step.text}</p></div>)}</div></div>
        </section>

        <section className="bg-secondary py-20 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[.7fr_1.3fr]"><h2 className="text-display text-4xl md:text-5xl">{page.faqHeading}</h2><div className="border-t border-primary/20">{page.faqs.map((faq) => <details key={faq.question} className="group border-b border-primary/20 py-5"><summary className="cursor-pointer list-none text-lg font-medium">{faq.question}</summary><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{faq.answer}</p></details>)}</div></div>
        </section>

        <section id="enquiry" className="py-20 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[.75fr_1.25fr]">
            <div><h2 className="text-display text-4xl md:text-5xl">{page.formTitle}</h2><p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">{page.finalText}</p><Link href={bookingHref(customerType)} onClick={() => trackAcquisition("booking_started", { customerType })} className="mt-6 inline-block border-b border-primary pb-1 text-sm">{page.action}</Link></div>
            <div className="border border-primary/15 bg-secondary p-5 sm:p-8"><AcquisitionForm key={customerType} customerType={customerType} /></div>
          </div>
        </section>

        <section className="bg-accent px-5 py-16 md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 md:flex-row md:items-end md:px-3"><div><h2 className="text-display max-w-3xl text-4xl md:text-5xl">{page.finalTitle}</h2><p className="mt-4 max-w-2xl text-sm leading-7">{page.finalText}</p></div><Link href={bookingHref(customerType)} onClick={() => trackAcquisition("booking_started", { customerType })} className="w-fit bg-primary px-6 py-4 text-sm text-primary-foreground transition-colors hover:bg-background hover:text-primary">{page.action}</Link></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
