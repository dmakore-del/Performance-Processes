import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/hooks/use-language";
import founderImage from "@/assets/founder.png";
import ebukaImage from "@/assets/ebuka-portrait.jpg";

export default function About() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const values = fr ? [["Clarté", "Des conseils pratiques, sans jargon."], ["Structure", "Des fondations qui facilitent l’exécution."], ["Partenariat", "Un soutien adapté à votre prochaine étape."]] : [["Clarity", "Practical guidance without jargon."], ["Structure", "Foundations that make execution easier."], ["Partnership", "Support matched to your next step."]];
  const services = fr ? [
    ["Incorporation et mise en place", "Soutien administratif à l’incorporation et à l’enregistrement, avec une orientation sur les premières étapes pour structurer et lancer l’entreprise."],
    ["Conseil et stratégie d’affaires", "Conseils pratiques pour clarifier les priorités, affiner les offres et organiser le travail nécessaire à la prochaine étape de l’entreprise."],
    ["Plans d’affaires et prévisions financières", "Élaboration de plans d’affaires, de projections financières et de prévisions de trésorerie pour appuyer la planification et la prise de décision."],
    ["Subventions et financement", "Recherche d’occasions de financement, préparation des demandes et accompagnement du processus. Les décisions de financement appartiennent aux organismes et prêteurs."],
    ["Sites web et présence numérique", "Conception et développement de sites web, courriels professionnels et parcours numériques pour les demandes et les réservations."],
    ["Systèmes et outils opérationnels", "Mise en place d’outils de paiement, de réservation, de CRM et d’administration qui relient les activités quotidiennes."],
    ["Soutien continu aux entreprises", "Accompagnement au fur et à mesure que l’entreprise évolue, avec une aide pratique pour mettre en œuvre les prochaines priorités."],
  ] : [
    ["Incorporation and business setup", "Administrative incorporation and registration support, with guidance on the early steps to structure and launch the business."],
    ["Business consulting and advisory", "Practical advice to clarify priorities, refine offers, and organize the work needed for the business’s next stage."],
    ["Business plans and financial forecasts", "Business plans, financial projections, and cash-flow forecasts to support planning and informed decisions."],
    ["Grants and business financing", "Funding opportunity research, application preparation, and process support. Funding decisions remain with funders and lenders."],
    ["Websites and digital presence", "Website design and development, professional email, and digital paths for enquiries and bookings."],
    ["Operational systems and tools", "Payment, booking, CRM, and administrative tools that connect the business’s day-to-day work."],
    ["Ongoing business support", "Practical guidance as the business evolves and implements its next priorities."],
  ];
  return <div className="min-h-[100dvh] bg-background"><SEOHead title={fr ? "À propos | Performance Processes" : "About | Performance Processes"} description={fr ? "Un partenaire de lancement pratique pour les entrepreneurs canadiens." : "A practical launch partner for Canadian entrepreneurs."} path="/about"/><Navbar/><main>
        <section className="relative overflow-hidden border-t-4 border-accent bg-background px-5 py-14 md:py-20"><div className="relative mx-auto max-w-[1100px]"><p className="eyebrow mb-5 text-muted-foreground">{fr ? "Performance Processes Soleria Inc. · Toronto, Canada" : "Performance Processes Soleria Inc. · Toronto, Canada"}</p><h1 className="text-display max-w-4xl text-5xl leading-[.96] md:text-7xl">{fr ? "L’espace entre une idée et une entreprise établie mérite un meilleur soutien." : "The space between an idea and an established business deserves better support."}</h1></div></section>
        <section className="border-y border-primary/10 bg-secondary px-5 py-20 md:py-24"><div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start"><div><p className="eyebrow mb-4 text-muted-foreground">{fr ? "Notre rôle" : "Our role"}</p><h2 className="text-display text-4xl leading-tight md:text-5xl">{fr ? "Qui nous sommes : un partenaire d’affaires pour chaque étape de la croissance." : "Who we are: a business-building partner for every stage of growth."}</h2></div><div className="space-y-5 text-lg leading-8 text-muted-foreground">{fr ? <><p>Performance Processes Soleria Inc. est une entreprise canadienne de création d’entreprise et de conseil en croissance. Nous aidons les entrepreneurs et les petites organisations à passer d’une idée à une entreprise structurée, organisée et prête pour le marché. Notre rôle est de relier les décisions d’affaires, les démarches administratives, les systèmes opérationnels et la présence numérique afin que chaque étape soutienne la suivante.</p><p>Nous commençons par comprendre le point de départ, les objectifs et les contraintes de chaque entreprise. Nous recommandons ensuite une voie concrète et les services adaptés, qu’il s’agisse d’un besoin ponctuel ou d’un accompagnement continu à mesure que l’entreprise évolue.</p><p>Notre travail couvre la constitution et la mise en place de l’entreprise, le conseil stratégique, les plans d’affaires, les prévisions financières et de trésorerie, ainsi que la recherche de subventions et le soutien aux demandes de financement. Nous concevons aussi des sites web, des outils numériques et des systèmes administratifs pratiques qui aident les entreprises à servir leurs clients et à gérer leurs activités.</p></> : <><p>Performance Processes Soleria Inc. is a Canadian business formation and growth advisory company. We help entrepreneurs and small organizations move from an early idea to a structured, organized business ready to serve its market. We connect business decisions, administrative steps, operational systems, and digital presence so that each part supports the next.</p><p>We start by understanding each business’s stage, goals, and constraints. Then we recommend a practical path and the services that fit, whether the need is focused or calls for ongoing guidance as the business develops.</p><p>Our work spans incorporation and company setup, business consulting, business plans, financial projections and cash-flow forecasting, grant research and application support, and business financing assistance. We also design websites, digital tools, and administrative systems that help organizations serve customers and manage their day-to-day work.</p></>}</div></div></section>
      <section className="mx-auto grid max-w-[1100px] gap-14 px-5 py-24 lg:grid-cols-[.8fr_1.2fr]">
        <div>
           <img src={founderImage} alt={fr ? "Danai Makore, fondatrice et consultante principale" : "Danai Makore, Founder and Principal Consultant"} loading="lazy" className="w-full object-cover"/>
          <div className="bg-accent p-5 text-sm">Danai Makore<br/><span className="text-primary/70">{fr ? "Fondatrice et consultante principale" : "Founder & Principal Consultant"}</span></div>
        </div>
        <div>
          <h2 className="text-display text-4xl leading-tight md:text-5xl">{fr ? "Une partenaire de lancement qui comprend le poids de chaque premier pas." : "A launch partner who understands that every first step carries weight."}</h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted-foreground">
            {fr ? <>
              <p>Performance Processes a été créée pour combler l’écart entre une idée d’entreprise et la connaissance nécessaire pour l’établir et la lancer correctement.</p>
              <p>Danai réunit la stratégie, le soutien à la formation, les systèmes pratiques et l’exécution numérique dans un processus connecté. Le but n’est pas de vous remettre une autre liste de tâches : c’est de faire avancer les bonnes pièces, dans un ordre qui convient à votre entreprise.</p>
              <p>Le travail est destiné aux entrepreneurs canadiens qui partent d’une idée, préparent leur enregistrement ou souhaitent transformer une activité naissante en entreprise organisée et prête pour ses clients.</p>
            </> : <>
              <p>Performance Processes was created to close the gap between having a business idea and knowing how to establish and launch it properly.</p>
              <p>Danai brings strategy, formation support, practical systems, and digital execution into one connected process. The aim is not to hand you another list of tasks; it is to move the right pieces forward in an order that fits your business.</p>
              <p>The work is for Canadian entrepreneurs starting with an idea, preparing to register, or turning an early business into an organized operation ready for its clients.</p>
            </>}
          </div>
          <Link href="/contact" className="mt-10 inline-block bg-accent px-7 py-4 text-xs font-semibold tracking-[.08em] text-primary transition hover:bg-primary hover:text-primary-foreground">{fr ? "Commencer une conversation" : "Start a conversation"}</Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1100px] gap-14 px-5 py-24 lg:grid-cols-[.8fr_1.2fr]">
        <div>
           <img
            src={ebukaImage}
            alt={fr ? "Ebuka Ogbonnaya, directeur du développement des affaires" : "Ebuka Ogbonnaya, Director of Business Development"}
             loading="eager"
            className="w-full object-cover"
          />
          <div className="bg-accent p-5 text-sm">
            Ebuka Ogbonnaya<br/>
            <span className="text-primary/70">{fr ? "Directeur du développement des affaires" : "Director of Business Development"}</span>
          </div>
        </div>
        <div>
          <h2 className="text-display text-4xl leading-tight md:text-5xl">
            {fr ? "Le développement des affaires, fondé sur des relations durables." : "Business development built on lasting relationships."}
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted-foreground">
            {fr ? <>
              <p>Ebuka Ogbonnaya est directeur du développement des affaires chez Performance Processes. Il compte plus de dix ans d’expérience en développement des affaires et en gestion, notamment en acquisition de clients, en partenariats stratégiques, en négociation et en développement de marchés.</p>
              <p>Son parcours professionnel international s’étend au Canada, en Malaisie, aux Émirats arabes unis et en Türkiye, avec de l’expérience dans le conseil, le divertissement, l’immobilier et des organisations multinationales.</p>
              <p>Chez Performance Processes, Ebuka dirige le développement des affaires, les relations clients, les partenariats et les occasions de croissance. Il accompagne les clients potentiels de la première conversation aux recommandations, aux propositions et à l’intégration.</p>
            </> : <>
              <p>Ebuka Ogbonnaya is Director of Business Development at Performance Processes. He brings more than ten years of experience in business development and management, including client acquisition, strategic partnerships, negotiation, and market growth.</p>
              <p>His international career spans Canada, Malaysia, the United Arab Emirates, and Türkiye, with experience in consulting, entertainment, real estate, and multinational corporate environments.</p>
              <p>At Performance Processes, Ebuka leads business development, client relationships, partnerships, and growth opportunities. He supports prospective clients from initial conversations through recommendations, proposals, and onboarding.</p>
            </>}
          </div>
          <Link href="/contact" className="mt-10 inline-block bg-accent px-7 py-4 text-xs font-semibold tracking-[.08em] text-primary transition hover:bg-primary hover:text-primary-foreground">
            {fr ? "Commencer une conversation" : "Start a conversation"}
          </Link>
        </div>
      </section>
      <section className="border-y border-primary/10 bg-secondary px-5 py-20 md:py-24"><div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[.65fr_1.35fr]"><div><p className="eyebrow mb-4 text-muted-foreground">{fr ? "De la formation au fonctionnement" : "From formation to day-to-day"}</p><h2 className="text-display text-4xl md:text-5xl">{fr ? "Des services pour bâtir et faire progresser votre entreprise." : "Services to build and move your business forward."}</h2><Link href="/contact" className="mt-7 inline-block border-b border-primary pb-1 text-sm">{fr ? "Discuter de vos besoins" : "Talk through what you need"}</Link></div><div className="border-t border-primary/20">{services.map(([title, description])=><article key={title} className="grid gap-2 border-b border-primary/15 py-5 sm:grid-cols-[.65fr_1fr] sm:items-start sm:gap-5"><h3 className="text-lg font-medium">{title}</h3><p className="text-sm leading-6 text-muted-foreground">{description}</p></article>)}</div></div></section>
     <section className="mx-auto max-w-[760px] px-5 py-24"><h2 className="text-display text-4xl md:text-5xl">{fr ? "Un accompagnement direct, avec des limites professionnelles claires." : "Direct support, with clear professional boundaries."}</h2><div className="mt-8 space-y-5 leading-8 text-muted-foreground">{fr ? <><p>Chaque engagement commence par une conversation sur votre étape, vos priorités et ce que vous avez déjà en place. Nous pouvons ensuite définir une voie pratique : un service précis, un forfait de lancement ou une progression par étapes.</p><p>Performance Processes fournit du soutien administratif à l’incorporation et une orientation générale. Nous ne fournissons pas de conseils juridiques, fiscaux ou comptables et nous orientons vers des professionnels qualifiés lorsque ces conseils sont nécessaires.</p><p>Nous croyons aussi qu’une entreprise mieux outillée renforce sa communauté. Notre soutien au travail communautaire de NextUp reflète cet engagement à rendre les possibilités plus concrètes pour les jeunes et les organisations qu’ils servent.</p></> : <><p>Every engagement starts with a conversation about your stage, priorities, and what you already have in place. From there, we can define a practical route: a focused service, a launch package, or a phased progression.</p><p>Performance Processes provides administrative incorporation support and general guidance. We do not provide legal, tax, or accounting advice, and refer to qualified professionals when that advice is needed.</p><p>We also believe a better equipped business strengthens its community. Our support of NextUp’s community work reflects that commitment to making opportunity more practical for young people and the organizations they serve.</p></>}</div></section>
     <section className="bg-secondary px-5 py-24"><div className="mx-auto max-w-[1100px]"><h2 className="text-display text-4xl">{fr ? "Ce qui guide notre travail" : "What guides the work"}</h2><div className="mt-10 grid gap-8 md:grid-cols-3">{values.map(([title, description])=><div key={title} className="border-t border-primary pt-5"><h3 className="text-display text-3xl">{title}</h3><p className="mt-4 leading-7 text-muted-foreground">{description}</p></div>)}</div></div></section>
  </main><Footer/></div>;
}