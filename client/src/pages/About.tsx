import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import founderImage from "@/assets/founder.png";
import seanImage from "@/assets/ChatGPT_Image_Feb_20,_2026,_04_07_16_PM_1771621735605.png";
import collaborationImg from "@assets/generated/collaboration.png";
import trainingImg from "@assets/generated/training.png";
import teamStrategyImg from "@assets/generated/team-strategy-new.png";
import cityAerialImg from "@assets/generated/city-aerial-new.png";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { AnimateOnScroll, FloatingShape, GradientOrb, GeometricAccent } from "@/components/ui/animate-on-scroll";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

export default function About() {
  const { language } = useLanguage();

  const values = language === "en" ? [
    {
      title: "Integrity",
      description: "We operate with unwavering honesty and transparency.",
      practice: "Every recommendation is grounded in what's truly best for our clients, not what generates the most revenue.",
    },
    {
      title: "Excellence",
      description: "We pursue the highest standards in everything we do.",
      practice: "From research and analysis to the clarity of our deliverables, we hold ourselves to the same bar we set for clients.",
    },
    {
      title: "Collaboration",
      description: "We work alongside our clients, not above them.",
      practice: "We combine our expertise with your organizational knowledge to create strategies that genuinely fit your context.",
    },
    {
      title: "Innovation",
      description: "We continuously evolve our methodologies.",
      practice: "Embracing new frameworks, technologies, and approaches to keep our clients ahead of the curve.",
    },
    {
      title: "Impact",
      description: "Every engagement must produce measurable results.",
      practice: "We track outcomes with clear KPIs and success metrics, because sustainable change requires proof.",
    },
    {
      title: "Accountability",
      description: "We hold ourselves to the same standards we set.",
      practice: "We track our commitments, take ownership of results, and course-correct when needed.",
    },
  ] : [
    {
      title: "Intégrité",
      description: "Nous agissons avec une honnêteté et une transparence indéfectibles.",
      practice: "Chaque recommandation repose sur ce qui est réellement le mieux pour nos clients, et non sur ce qui génère le plus de revenus.",
    },
    {
      title: "Excellence",
      description: "Nous visons les plus hauts standards dans tout ce que nous faisons.",
      practice: "De la recherche et l'analyse à la clarté de nos livrables, nous nous imposons la même exigence que celle que nous fixons à nos clients.",
    },
    {
      title: "Collaboration",
      description: "Nous travaillons aux côtés de nos clients, pas au-dessus d'eux.",
      practice: "Nous combinons notre expertise à votre connaissance de l'organisation pour créer des stratégies véritablement adaptées à votre contexte.",
    },
    {
      title: "Innovation",
      description: "Nous faisons continuellement évoluer nos méthodologies.",
      practice: "Nous adoptons de nouveaux cadres, technologies et approches pour garder nos clients une longueur d'avance.",
    },
    {
      title: "Impact",
      description: "Chaque mandat doit produire des résultats mesurables.",
      practice: "Nous suivons les résultats avec des indicateurs clairs et des mesures de succès, car un changement durable exige des preuves.",
    },
    {
      title: "Responsabilité",
      description: "Nous nous imposons les mêmes standards que ceux que nous fixons.",
      practice: "Nous suivons nos engagements, assumons nos résultats et corrigeons le tir au besoin.",
    },
  ];

  const credentials = language === "en" ? [
    { label: "Psychology", detail: "Academic Training" },
    { label: "HR Management", detail: "Academic Training" },
    { label: "Small Business Systems", detail: "Sector Expertise" },
    { label: "Marketing & CRM", detail: "Sector Expertise" },
    { label: "Training & Coaching", detail: "Service Area" },
  ] : [
    { label: "Psychologie", detail: "Formation académique" },
    { label: "Gestion des RH", detail: "Formation académique" },
    { label: "Systèmes de petites entreprises", detail: "Expertise sectorielle" },
    { label: "Marketing et CRM", detail: "Expertise sectorielle" },
    { label: "Formation et coaching", detail: "Domaine de service" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <SEOHead title="About Us, Our Story & Mission" description="Performance Processes is a growth infrastructure studio founded by Danai Makore in 2023. We install websites, marketing, CRM, business systems, training, and ongoing support as one integrated system for professionals, nonprofits, and small businesses." path="/about" />
      <Navbar />
      <main className="flex-grow">

        <section className="relative min-h-[550px] lg:min-h-[700px] flex items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              {...{ "webkit-playsinline": "true" } as any}
              className="w-full h-full object-cover opacity-40"
              poster={teamStrategyImg}
            >
              <source src="/assets/videos/architecture-rise.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
          </div>
          <div className="absolute bottom-0 right-0 w-2/5 h-full hidden lg:block z-[1]">
            <img src={cityAerialImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
          </div>
          <GradientOrb className="w-80 h-80 bg-accent/10 -top-20 -right-20 z-[2]" />
          <FloatingShape className="w-14 h-14 top-[25%] right-[12%] z-[3]" variant="ring" />
          <FloatingShape className="w-8 h-8 bottom-[25%] right-[30%] z-[3]" variant="dot" />
          <GeometricAccent className="bottom-[10%] right-[5%] text-white z-[2]" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-32 relative z-10">
            <div className="max-w-3xl lg:max-w-[55%]">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-accent mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }} data-testid="text-hero-label">
                {language === "en" ? "Who We Are" : "Qui nous sommes"}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08] animate-fade-in-up" style={{ animationDelay: "0.2s" }} data-testid="text-hero-title">
                {language === "en" ? (
                  <>A growth infrastructure studio for <span className="text-accent">businesses ready to scale</span></>
                ) : (
                  <>Un studio d'infrastructure de croissance pour les <span className="text-accent">entreprises prêtes à croître</span></>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.35s" }} data-testid="text-hero-subtitle">
                {language === "en"
                  ? "Performance Processes was founded on a simple belief: small businesses, nonprofits, and growing teams deserve partners who don't just advise, they design, build, and run the systems that move the business forward."
                  : "Performance Processes a été fondée sur une conviction simple : les petites entreprises, les organismes sans but lucratif et les équipes en croissance méritent des partenaires qui ne se contentent pas de conseiller, mais qui conçoivent, construisent et exploitent les systèmes qui font avancer l'entreprise."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105 w-full sm:w-auto" data-testid="button-hero-book">
                    {language === "en" ? "Book a Discovery Call" : "Réservez un appel de découverte"}
                </a>
                <Link href="/services" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto" data-testid="button-hero-services">
                    {language === "en" ? "Explore Our Services" : "Explorez nos services"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-28 bg-white border-b relative overflow-hidden" data-testid="section-founder">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <GradientOrb className="w-72 h-72 bg-accent/5 -bottom-36 -left-36" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <AnimateOnScroll animation="fade-left" className="lg:w-2/5 relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-accent/20 rounded-2xl -z-10 translate-x-4 translate-y-4"></div>
                <img
                  src={founderImage}
                  alt="Danai Makore - Principal Consultant at Performance Processes"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
                  data-testid="img-founder"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl border border-border hidden md:block max-w-[280px]">
                  <span className="text-accent text-4xl font-serif mb-4 block leading-none">"</span>
                  <p className="text-primary font-bold italic text-lg leading-tight mb-2">
                    {language === "en"
                      ? "\"To help people build organizations that truly change lives.\""
                      : "« Aider les gens à bâtir des organisations qui changent véritablement des vies. »"}
                  </p>
                  <p className="text-accent font-black text-[10px] uppercase tracking-widest">, Danai Makore</p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200} className="lg:w-3/5">
                <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                  {language === "en" ? "Meet Our Founder" : "Rencontrez notre fondatrice"}
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4 leading-tight">
                  Danai <span className="text-accent italic">Makore</span>
                </h2>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
                  {language === "en" ? "Founder & Principal" : "Fondatrice et associée principale"}
                </p>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed max-w-[640px]">
                  {language === "en" ? (
                    <>
                      <p>
                        Danai Makore is a builder, strategist, and
                        operator whose work spans website design,
                        marketing, CRM, and business systems for
                        professionals, nonprofits, and growing businesses.
                      </p>
                      <p>
                        With academic training in Psychology and
                        Human Resource Management, and currently
                        pursuing a Masters of Science in Management
                        Practice at York University, Danai brings a deep
                        commitment to equity, access, and sustainable
                        impact. She founded Performance Processes
                        to install the growth infrastructure small
                        businesses need to scale with confidence.
                      </p>
                      <p>
                        Her approach blends human insight with
                        practical execution, designing the website,
                        setting up the CRM, launching the marketing,
                        and training the team that will run it all
                        long after the engagement ends.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Danai Makore est une bâtisseuse, une stratège et
                        une opératrice dont le travail couvre la conception
                        de sites web, le marketing, le CRM et les systèmes
                        d'affaires pour les professionnels, les organismes sans
                        but lucratif et les entreprises en croissance.
                      </p>
                      <p>
                        Forte d'une formation académique en psychologie et
                        en gestion des ressources humaines, et poursuivant
                        actuellement une maîtrise en sciences de la gestion
                        (Management Practice) à l'Université York, Danai apporte
                        un engagement profond envers l'équité, l'accès et l'impact
                        durable. Elle a fondé Performance Processes pour installer
                        l'infrastructure de croissance dont les petites entreprises
                        ont besoin pour croître en toute confiance.
                      </p>
                      <p>
                        Son approche allie compréhension humaine et exécution
                        concrète : concevoir le site web, configurer le CRM,
                        lancer le marketing et former l'équipe qui gérera le tout,
                        bien après la fin du mandat.
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {credentials.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-[#FAFAFA] to-white rounded-xl border border-border shadow-sm" data-testid={`credential-${i}`}>
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-xs font-bold text-primary">{c.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4 items-center">
                  <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-accent text-white hover:bg-primary h-14 px-8 font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-accent/20" data-testid="button-schedule-consultation">
                      {language === "en" ? "Schedule Consultation" : "Planifier une consultation"}
                  </a>
                  <a href="https://danaimakore.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white h-14 px-8 font-bold uppercase tracking-widest text-xs transition-all" data-testid="button-learn-founder">
                      {language === "en" ? "Learn More About Danai" : "En savoir plus sur Danai"}
                  </a>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-28 bg-gradient-to-b from-[#FAFAFA] to-white border-b relative overflow-hidden" data-testid="section-philosophy">
          <FloatingShape className="w-20 h-20 top-16 -left-6" variant="ring" />
          <FloatingShape className="w-10 h-10 bottom-20 right-16" variant="dot" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="max-w-5xl mx-auto text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-8">
                {language === "en" ? "Our Philosophy" : "Notre philosophie"}
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-primary mb-8 leading-tight">
                {language === "en" ? (
                  <>One growth system for<br />
                  <span className="text-accent italic">every stage of business</span></>
                ) : (
                  <>Un seul système de croissance pour<br />
                  <span className="text-accent italic">chaque étape de l'entreprise</span></>
                )}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-16">
                {language === "en"
                  ? "Whether you're a professional building your first website, a nonprofit launching a campaign, or a small business installing CRM, training, and ongoing support, we integrate the six practices most firms sell separately into one execution system designed for measurable growth."
                  : "Que vous soyez un professionnel qui construit son premier site web, un organisme sans but lucratif qui lance une campagne, ou une petite entreprise qui installe un CRM, de la formation et un soutien continu, nous intégrons les six pratiques que la plupart des firmes vendent séparément en un seul système d'exécution conçu pour une croissance mesurable."}
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        <section className="py-28 bg-white border-b border-border relative overflow-hidden">
          <FloatingShape className="w-16 h-16 top-20 right-20" variant="ring" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                {language === "en" ? "Our Team" : "Notre équipe"}
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "Leadership" : "Direction"}
              </h2>
            </AnimateOnScroll>

            <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start max-w-6xl mx-auto">
              <AnimateOnScroll animation="fade-left" className="lg:w-1/3">
                <div className="relative">
                  <div className="absolute top-4 -right-4 w-full h-full border-2 border-accent/20 rounded-2xl -z-10"></div>
                  <img
                    src={seanImage}
                    alt="Sean Ogbonnaya - Director of Business Development"
                    className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[3/4] hover:scale-[1.02] transition-transform duration-700"
                    data-testid="img-sean"
                  />
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200} className="lg:w-2/3">
                <h3 className="text-3xl font-heading font-extrabold text-primary mb-2">
                  Sean <span className="text-accent italic">Ogbonnaya</span>
                </h3>
                <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
                  {language === "en" ? "Director of Business Development" : "Directeur du développement des affaires"}
                </div>

                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed max-w-[600px]">
                  {language === "en" ? (
                    <>
                      <p>
                        Sean Ogbonnaya leads strategic growth initiatives
                        and builds lasting partnerships with small
                        businesses, nonprofits, and professionals
                        committed to building better systems.
                      </p>
                      <p>
                        With degrees in Computer Science and the
                        Creative Arts, and a strong background in
                        relationship development and strategic advisory,
                        Sean specializes in helping clients pick the right
                        starting point, whether that's a new website,
                        a CRM, or a full growth-infrastructure bundle.
                      </p>
                      <p className="font-medium text-primary italic border-l-4 border-accent pl-6 py-2 bg-gradient-to-r from-[#FAFAFA] to-transparent rounded-r-lg">
                        Passionate about matching clients with the right
                        productized offer, from a single-practice engagement
                        to a fully integrated growth-infrastructure build.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Sean Ogbonnaya dirige les initiatives de croissance
                        stratégique et bâtit des partenariats durables avec des
                        petites entreprises, des organismes sans but lucratif et
                        des professionnels déterminés à bâtir de meilleurs systèmes.
                      </p>
                      <p>
                        Titulaire de diplômes en informatique et en arts créatifs,
                        et fort d'une solide expérience en développement de relations
                        et en conseil stratégique, Sean se spécialise dans l'aide aux
                        clients pour choisir le bon point de départ, qu'il s'agisse
                        d'un nouveau site web, d'un CRM ou d'un forfait complet
                        d'infrastructure de croissance.
                      </p>
                      <p className="font-medium text-primary italic border-l-4 border-accent pl-6 py-2 bg-gradient-to-r from-[#FAFAFA] to-transparent rounded-r-lg">
                        Passionné par l'idée de jumeler les clients avec la bonne offre
                        productisée, d'un mandat à pratique unique à une infrastructure
                        de croissance entièrement intégrée.
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-10 flex flex-wrap gap-4 items-center">
                  <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-accent text-white hover:bg-primary h-14 px-8 font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-accent/20" data-testid="button-schedule-sean">
                      {language === "en" ? "Schedule Consultation" : "Planifier une consultation"}
                  </a>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-[#FAFAFA] to-white rounded-xl border border-border">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">{language === "en" ? "Relationship Development" : "Développement de relations"}</span>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-[#FAFAFA] to-white rounded-xl border border-border">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">{language === "en" ? "Strategic Advisory" : "Conseil stratégique"}</span>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-28 bg-gradient-to-b from-[#FAFAFA] to-white border-b relative overflow-hidden" data-testid="section-values">
          <GeometricAccent className="-left-10 top-32 text-primary" />
          <FloatingShape className="w-12 h-12 bottom-20 right-16" variant="dot" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                {language === "en" ? "What Drives Us" : "Ce qui nous anime"}
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? (
                  <>Our Core <span className="text-accent italic">Values</span></>
                ) : (
                  <>Nos <span className="text-accent italic">valeurs</span> fondamentales</>
                )}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === "en"
                  ? "These principles guide every decision we make and every relationship we build."
                  : "Ces principes guident chaque décision que nous prenons et chaque relation que nous bâtissons."}
              </p>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {values.map((value, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 120}>
                  <div className="bg-gradient-to-br from-white via-white to-accent/5 p-8 rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg transition-all group hover:scale-[1.02] duration-300 h-full" data-testid={`value-card-${i}`}>
                    <h3 className="text-xl font-heading font-extrabold text-primary mb-2">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 bg-white border-b relative overflow-hidden" data-testid="section-what-sets-us-apart">
          <GradientOrb className="w-72 h-72 bg-accent/5 -top-32 -right-32" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <AnimateOnScroll animation="fade-left">
                  <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                    {language === "en" ? "Our Difference" : "Notre différence"}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                    {language === "en" ? (
                      <>What Sets Us <span className="text-accent italic">Apart</span></>
                    ) : (
                      <>Ce qui nous <span className="text-accent italic">distingue</span></>
                    )}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
                    {language === "en"
                      ? "Most firms sell hours and slide decks. We install infrastructure that compounds, long after the engagement ends."
                      : "La plupart des firmes vendent des heures et des présentations. Nous installons une infrastructure qui prend de la valeur, bien après la fin du mandat."}
                  </p>
                  <div className="space-y-5">
                    {(language === "en" ? [
                      { title: "One Integrated System", desc: "Web, marketing, CRM, business systems, training, and ongoing support, built to work together, not stitched after the fact." },
                      { title: "Productized Engagements", desc: "Clear scope, fixed pricing, defined timelines. You always know what you're getting and when." },
                      { title: "We Build, We Don't Just Advise", desc: "We design, build, and operate the systems alongside your team, not just hand over recommendations." },
                      { title: "Built to Run Without Us", desc: "Every engagement leaves behind documented playbooks, dashboards, and trained operators you keep." },
                      { title: "Right-Sized for Small Business", desc: "Frameworks adapted for professionals, nonprofits, and growing teams, not bloated overhead built for someone else." },
                      { title: "Ongoing Support When You Need It", desc: "Optional monthly retainers keep your marketing, CRM, and systems running and improving over time." },
                    ] : [
                      { title: "Un système intégré", desc: "Web, marketing, CRM, systèmes d'affaires, formation et soutien continu, conçus pour fonctionner ensemble, et non assemblés après coup." },
                      { title: "Des mandats productisés", desc: "Portée claire, prix fixe, échéanciers définis. Vous savez toujours ce que vous obtenez et quand." },
                      { title: "Nous construisons, nous ne faisons pas que conseiller", desc: "Nous concevons, construisons et exploitons les systèmes aux côtés de votre équipe, sans nous limiter à remettre des recommandations." },
                      { title: "Conçu pour fonctionner sans nous", desc: "Chaque mandat laisse derrière lui des guides documentés, des tableaux de bord et des opérateurs formés que vous conservez." },
                      { title: "À l'échelle des petites entreprises", desc: "Des cadres adaptés aux professionnels, aux organismes sans but lucratif et aux équipes en croissance, sans les frais généraux excessifs conçus pour d'autres." },
                      { title: "Un soutien continu au besoin", desc: "Des forfaits mensuels optionnels maintiennent votre marketing, votre CRM et vos systèmes en fonction et en amélioration au fil du temps." },
                    ]).map((adv, i) => (
                      <div key={i} className="flex items-start gap-4 group" data-testid={`advantage-${i}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5" />
                        <div>
                          <h4 className="text-base font-bold text-primary mb-1">{adv.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{adv.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll animation="fade-right" delay={200}>
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent/20 rounded-2xl -z-10"></div>
                    <img
                      src={collaborationImg}
                      alt="Team collaboration at Performance Processes"
                      className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[4/3] hover:scale-[1.02] transition-transform duration-700"
                      data-testid="img-collaboration"
                    />
                    <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-border">
                      <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                          <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                            <span className="text-xs font-bold text-primary">{language === "en" ? "Long-Term Focus" : "Vision à long terme"}</span>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                            <span className="text-xs font-bold text-primary">{language === "en" ? "Trust-Based" : "Fondé sur la confiance"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </section>

        <section className="py-28 bg-white border-b border-border relative overflow-hidden" data-testid="section-community">
          <GeometricAccent className="-right-10 top-20 text-accent" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <AnimateOnScroll animation="fade-left">
                <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                  {language === "en" ? "Giving Back" : "Redonner"}
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  {language === "en" ? (
                    <>Community <span className="text-accent italic">Involvement</span></>
                  ) : (
                    <>Engagement <span className="text-accent italic">communautaire</span></>
                  )}
                </h2>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed max-w-[560px]">
                  <p>
                    {language === "en"
                      ? "We believe that business excellence and community responsibility go hand in hand. We use our expertise to create positive change beyond the boardroom."
                      : "Nous croyons que l'excellence en affaires et la responsabilité communautaire vont de pair. Nous mettons notre expertise au service d'un changement positif au-delà de la salle de conseil."}
                  </p>
                </div>
                <div className="mt-8 space-y-4">
                  {(language === "en" ? [
                    { text: "Pro-bono consulting for emerging nonprofits and social enterprises" },
                    { text: "Mentorship programs connecting aspiring consultants with experienced leaders" },
                    { text: "Community workshops on leadership and organizational development" },
                  ] : [
                    { text: "Consultation bénévole pour les organismes sans but lucratif et entreprises sociales émergents" },
                    { text: "Programmes de mentorat reliant les consultants en devenir à des dirigeants expérimentés" },
                    { text: "Ateliers communautaires sur le leadership et le développement organisationnel" },
                  ]).map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5" />
                      <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <h3 className="text-lg font-bold text-primary mb-5">{language === "en" ? "Sponsor Pro-Bono Consulting" : "Parrainer une consultation bénévole"}</h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-[480px]">
                    {language === "en"
                      ? "Your sponsorship directly funds consulting engagements for nonprofits and social enterprises."
                      : "Votre parrainage finance directement des mandats de consultation pour les organismes sans but lucratif et les entreprises sociales."}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(language === "en" ? [
                      { tier: "supporter", name: "Supporter", price: "$150", desc: "1 hour of pro-bono consulting" },
                      { tier: "champion", name: "Champion", price: "$500", desc: "Half-day engagement" },
                      { tier: "catalyst", name: "Catalyst", price: "$1,500", desc: "Full consulting project" },
                    ] : [
                      { tier: "supporter", name: "Soutien", price: "150 $", desc: "1 heure de consultation bénévole" },
                      { tier: "champion", name: "Champion", price: "500 $", desc: "Mandat d'une demi-journée" },
                      { tier: "catalyst", name: "Catalyseur", price: "1 500 $", desc: "Projet de consultation complet" },
                    ]).map((t) => (
                      <button
                        key={t.tier}
                        onClick={async () => {
                          try {
                            const res = await fetch("/api/sponsor-checkout", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ tier: t.tier }),
                            });
                            const data = await res.json();
                            if (data.url) {
                              window.location.href = data.url;
                            } else {
                              alert(language === "en" ? "Unable to start checkout. Please try again later." : "Impossible de démarrer le paiement. Veuillez réessayer plus tard.");
                            }
                          } catch (err) {
                            console.error("Sponsor checkout error:", err);
                            alert(language === "en" ? "Something went wrong. Please try again later." : "Une erreur est survenue. Veuillez réessayer plus tard.");
                          }
                        }}
                        className="bg-gradient-to-br from-white to-accent/5 p-6 rounded-2xl border-2 border-border hover:border-accent hover:shadow-lg transition-all text-center group cursor-pointer"
                        data-testid={`button-sponsor-${t.tier}`}
                      >
                        <div className="text-2xl font-black text-primary group-hover:text-accent transition-colors mb-1">{t.price}</div>
                        <div className="text-sm font-bold text-primary mb-1">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200}>
                <div className="relative">
                  <div className="absolute -top-4 -right-4 w-full h-full border-2 border-accent/20 rounded-2xl -z-10"></div>
                  <img
                    src={trainingImg}
                    alt="Performance Processes community engagement and training"
                    className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[4/3] hover:scale-[1.02] transition-transform duration-700"
                    data-testid="img-community"
                  />
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="bg-primary py-32 text-white relative overflow-hidden" data-testid="section-final-cta">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              {...{ "webkit-playsinline": "true" } as any}
              className="w-full h-full object-cover opacity-50"
              poster={teamStrategyImg}
            >
              <source src="/assets/videos/navy-particles.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/80 to-primary/95" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
          <FloatingShape className="w-20 h-20 top-16 left-16 opacity-20" variant="ring" />
          <FloatingShape className="w-12 h-12 bottom-20 right-24 opacity-20" variant="dot" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <AnimateOnScroll className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8 leading-tight">
                {language === "en" ? (
                  <>Let's build something <span className="text-accent">meaningful</span> together</>
                ) : (
                  <>Bâtissons ensemble quelque chose de <span className="text-accent">significatif</span></>
                )}
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto">
                {language === "en"
                  ? "Whether you need a new website, a CRM you'll actually use, or a full growth infrastructure installed end-to-end, we're ready to partner with you."
                  : "Que vous ayez besoin d'un nouveau site web, d'un CRM que vous utiliserez vraiment ou d'une infrastructure de croissance complète installée de bout en bout, nous sommes prêts à nous associer à vous."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-accent text-white hover:bg-white hover:text-primary h-16 px-14 text-lg font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-2xl hover:scale-105 w-full sm:w-auto" data-testid="button-final-cta">
                    {language === "en" ? "Book a Discovery Call" : "Réservez un appel de découverte"}
                </a>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-16 px-12 text-lg font-bold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto" data-testid="button-contact-cta">
                    {language === "en" ? "Contact Us" : "Contactez-nous"}
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
