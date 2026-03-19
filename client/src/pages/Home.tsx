import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Tag,
  ChevronRight,
  TrendingUp,
  Target,
  ClipboardCheck,
  Zap,
  Users,
  BarChart3,
  Settings,
  Heart,
  Handshake,
  Sparkles,
  Shield,
} from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/use-language";
import { AnimateOnScroll, FloatingShape, GradientOrb, GeometricAccent } from "@/components/ui/animate-on-scroll";
import { SEOHead } from "@/components/SEOHead";

import communityCollaborationImg from "@assets/generated/community-collaboration.png";
import handsPartnershipImg from "@assets/generated/hands-together-partnership.png";
import communityWorkspaceImg from "@assets/generated/community-workspace.png";
import mentorshipConnectionImg from "@assets/generated/mentorship-connection.png";
import communityNetworkImg from "@assets/generated/community-network-abstract.png";
import empoweredOwnerImg from "@assets/generated/empowered-business-owner.png";
import communityTownhallImg from "@assets/generated/community-townhall.png";
import milestoneImg from "@assets/generated/milestone-celebration.png";
import growthSeedlingImg from "@assets/generated/growth-seedling.png";
import teamMovingForwardImg from "@assets/generated/team-moving-forward.png";

import heroAbstractImg from "@assets/generated/hero-abstract-new.png";
import geoPatternImg from "@assets/generated/geo-pattern-new.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

const subtitles = [
  { start: 0, end: 2, text: "The leaders who create lasting change aren't doing it alone..." },
  { start: 2, end: 4.5, text: "They're part of a community that holds them accountable and lifts them higher." },
  { start: 4.5, end: 6, text: "That's the kind of partnership we build." },
];

function VideoWithSubtitles() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSub, setCurrentSub] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      const t = video.currentTime;
      const match = subtitles.find(s => t >= s.start && t < s.end);
      setCurrentSub(match?.text || "");
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, []);

  return (
    <div className="relative">
      <video ref={videoRef} src="/ted-talk-speaker.mp4" autoPlay muted loop playsInline className="w-full h-auto object-cover aspect-[4/3]" data-testid="video-measurable-results" />
      {currentSub && (
        <div className="absolute bottom-4 left-4 right-4 flex justify-end pointer-events-none">
          <div className="bg-black/75 backdrop-blur-sm text-white text-sm md:text-base font-medium px-5 py-2.5 rounded-lg text-right max-w-[65%] leading-snug">
            {currentSub}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { t, language } = useLanguage();

  const valuePromises = [
    {
      icon: <Heart size={24} />,
      image: communityCollaborationImg,
      title: language === "en" ? "A Partner Who Truly Cares" : "Un partenaire qui se soucie vraiment",
      desc: language === "en"
        ? "You're not just another client. We invest in understanding your story, your goals, and the legacy you want to build — then we walk beside you every step of the way."
        : "Vous n'êtes pas qu'un simple client. Nous investissons pour comprendre votre histoire, vos objectifs et l'héritage que vous souhaitez bâtir.",
    },
    {
      icon: <Handshake size={24} />,
      image: handsPartnershipImg,
      title: language === "en" ? "A Community That Lifts You Up" : "Une communauté qui vous soutient",
      desc: language === "en"
        ? "Join a growing network of professionals and business owners who share insights, celebrate wins, and support each other through the hard parts of growth."
        : "Rejoignez un réseau croissant de professionnels qui partagent des idées, célèbrent les victoires et se soutiennent mutuellement.",
    },
    {
      icon: <Sparkles size={24} />,
      image: milestoneImg,
      title: language === "en" ? "Real Results You Can Feel" : "Des résultats concrets que vous ressentez",
      desc: language === "en"
        ? "Less stress, clearer direction, and the confidence that comes from knowing your business is built on solid ground. Our clients don't just grow — they thrive."
        : "Moins de stress, une direction plus claire et la confiance de savoir que votre entreprise repose sur des bases solides.",
    },
    {
      icon: <Shield size={24} />,
      image: growthSeedlingImg,
      title: language === "en" ? "Tools You Keep Forever" : "Des outils que vous gardez pour toujours",
      desc: language === "en"
        ? "We don't create dependency. Every framework, system, and strategy we build together becomes yours to keep, use, and grow with long after our engagement ends."
        : "Nous ne créons pas de dépendance. Chaque cadre et stratégie que nous construisons ensemble vous appartient pour toujours.",
    },
  ];

  const communityMembers = [
    {
      image: mentorshipConnectionImg,
      title: language === "en" ? "Professionals Ready to Level Up" : "Professionnels prêts à évoluer",
      desc: language === "en"
        ? "Lawyers, consultants, coaches, and advisors who want more than just productivity — they want purpose-driven careers and a community that gets it."
        : "Avocats, consultants, coaches et conseillers qui veulent plus que de la productivité — ils veulent des carrières motivées par un but.",
    },
    {
      image: empoweredOwnerImg,
      title: language === "en" ? "Business Owners Building Their Vision" : "Entrepreneurs construisant leur vision",
      desc: language === "en"
        ? "Founders and CEOs who are tired of doing it all alone. They join us for the systems and stay for the support, accountability, and shared wisdom."
        : "Fondateurs et PDG fatigués de tout faire seuls. Ils nous rejoignent pour les systèmes et restent pour le soutien et la sagesse partagée.",
    },
    {
      image: teamMovingForwardImg,
      title: language === "en" ? "Teams Moving Forward Together" : "Des équipes qui avancent ensemble",
      desc: language === "en"
        ? "Leadership teams seeking alignment, shared purpose, and the kind of operational clarity that turns good organizations into great ones."
        : "Des équipes de direction qui cherchent l'alignement, un objectif commun et la clarté opérationnelle.",
    },
  ];

  const journeySteps = [
    {
      step: "01",
      label: language === "en" ? "Listen" : "Écouter",
      image: mentorshipConnectionImg,
      title: language === "en" ? "We Start by Listening" : "Nous commençons par écouter",
      desc: language === "en"
        ? "Before we prescribe anything, we learn your story. What's working, what keeps you up at night, and what success looks like for you."
        : "Avant de prescrire quoi que ce soit, nous apprenons votre histoire. Ce qui fonctionne, ce qui vous préoccupe et ce que le succès signifie pour vous.",
    },
    {
      step: "02",
      label: language === "en" ? "Align" : "Aligner",
      image: communityTownhallImg,
      title: language === "en" ? "We Get Everyone on the Same Page" : "Nous alignons tout le monde",
      desc: language === "en"
        ? "Together, we build shared clarity around your priorities so your team moves as one — with purpose, direction, and mutual accountability."
        : "Ensemble, nous construisons une clarté partagée autour de vos priorités pour que votre équipe avance comme une seule.",
    },
    {
      step: "03",
      label: language === "en" ? "Build" : "Construire",
      image: communityWorkspaceImg,
      title: language === "en" ? "We Build What You Need" : "Nous construisons ce dont vous avez besoin",
      desc: language === "en"
        ? "Custom frameworks, processes, and tools designed around your reality — not cookie-cutter templates. Everything we create, you own."
        : "Des cadres, processus et outils personnalisés conçus autour de votre réalité — pas des modèles génériques.",
    },
    {
      step: "04",
      label: language === "en" ? "Thrive" : "Prospérer",
      image: milestoneImg,
      title: language === "en" ? "You Grow With Confidence" : "Vous grandissez avec confiance",
      desc: language === "en"
        ? "With the right systems in place and a community behind you, growth stops feeling overwhelming and starts feeling inevitable."
        : "Avec les bons systèmes en place et une communauté derrière vous, la croissance cesse d'être accablante et devient inévitable.",
    },
  ];

  const services = [
    {
      image: communityCollaborationImg,
      title: language === "en" ? "Executive Advisory" : "Conseil exécutif",
      desc: language === "en"
        ? "A trusted partner for leaders who want strategic clarity, performance systems that actually work, and someone in their corner who tells it like it is."
        : "Un partenaire de confiance pour les leaders qui veulent la clarté stratégique et des systèmes de performance qui fonctionnent.",
    },
    {
      image: handsPartnershipImg,
      title: language === "en" ? "Recruiting & Talent" : "Recrutement et talent",
      desc: language === "en"
        ? "Finding the right people changes everything. We help companies attract talent that fits their culture — and help professionals find roles where they'll truly belong."
        : "Trouver les bonnes personnes change tout. Nous aidons les entreprises à attirer des talents qui correspondent à leur culture.",
    },
    {
      image: empoweredOwnerImg,
      title: language === "en" ? "Small Business Growth" : "Croissance PME",
      desc: language === "en"
        ? "A dedicated growth partner who helps you stop firefighting and start building — with structure, strategy, and a community of fellow founders cheering you on."
        : "Un partenaire de croissance dédié qui vous aide à arrêter de gérer les urgences et à commencer à construire.",
    },
    {
      image: mentorshipConnectionImg,
      title: language === "en" ? "Coaching & Development" : "Coaching et développement",
      desc: language === "en"
        ? "Personal coaching that goes beyond performance metrics. We help you grow as a leader, find your voice, and build the confidence to lead with impact."
        : "Un coaching personnel qui va au-delà des métriques. Nous vous aidons à grandir en tant que leader.",
    },
    {
      image: growthSeedlingImg,
      title: language === "en" ? "Programs & Toolkits" : "Programmes et outils",
      desc: language === "en"
        ? "Self-paced programs and ready-to-use templates designed by consultants who've been in your shoes. Start building better systems today, at your own pace."
        : "Des programmes à votre rythme et des modèles prêts à l'emploi conçus par des consultants qui comprennent votre réalité.",
    },
  ];

  const industries = [
    { label: language === "en" ? "Corporate" : "Entreprises" },
    { label: language === "en" ? "Nonprofit" : "OBNL" },
    { label: language === "en" ? "Government" : "Gouvernement" },
    { label: language === "en" ? "Startups & SMBs" : "Startups et PME" },
    { label: language === "en" ? "Education" : "Éducation" },
    { label: language === "en" ? "Professional Services" : "Services professionnels" },
  ];

  const insights = [
    {
      title: language === "en" ? "Why Growth Feels Hard (And How Community Changes That)" : "Pourquoi la croissance semble difficile",
      category: language === "en" ? "Community" : "Communauté",
      date: language === "en" ? "January 15, 2026" : "15 janvier 2026",
      excerpt: language === "en"
        ? "The biggest challenge in business isn't strategy — it's isolation. Here's why the most successful leaders surround themselves with the right people."
        : "Le plus grand défi en affaires n'est pas la stratégie — c'est l'isolement.",
    },
    {
      title: language === "en" ? "Building Systems That Set You Free" : "Construire des systèmes qui vous libèrent",
      category: language === "en" ? "Growth" : "Croissance",
      date: language === "en" ? "January 8, 2026" : "8 janvier 2026",
      excerpt: language === "en"
        ? "The right systems don't add complexity — they remove it. How our clients went from overwhelmed to in control, and how you can too."
        : "Les bons systèmes ne rajoutent pas de complexité — ils l'éliminent.",
    },
    {
      title: language === "en" ? "Your People Are Your Strategy" : "Vos gens sont votre stratégie",
      category: language === "en" ? "Leadership" : "Leadership",
      date: language === "en" ? "December 20, 2025" : "20 décembre 2025",
      excerpt: language === "en"
        ? "Behind every successful organization is a team that feels valued, heard, and empowered. Here's how to build that culture from the inside out."
        : "Derrière chaque organisation prospère se trouve une équipe qui se sent valorisée et responsabilisée.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden">
      <SEOHead title="Performance Processes | Your Growth Partner & Community" description="Performance Processes is more than a consulting firm — we're a community of professionals and business owners building something meaningful together. Join us for strategic support, accountability, and lasting growth." path="/" />
      <Navbar />

      <main className="flex-grow">
        <section className="relative min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden bg-primary" data-testid="section-hero">
          <div className="absolute inset-0 z-0">
            <img src={communityNetworkImg} alt="" className="w-full h-full object-cover opacity-20 animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/98 to-primary/70" />
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-full hidden lg:block z-[1]">
            <img src={communityCollaborationImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
          <GradientOrb className="w-96 h-96 bg-accent/10 -top-20 -right-20 z-[2]" />
          <FloatingShape className="w-16 h-16 top-[20%] right-[10%] z-[3]" variant="ring" />
          <FloatingShape className="w-8 h-8 bottom-[30%] right-[35%] z-[3]" variant="dot" />
          <GeometricAccent className="bottom-[15%] right-[5%] text-white z-[2]" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-36 relative z-10">
            <div className="max-w-2xl lg:max-w-[55%]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <Heart size={14} />
                {language === "en" ? "Your Growth Community" : "Votre communauté de croissance"}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08] animate-fade-in-up" style={{ animationDelay: "0.2s" }} data-testid="text-hero-title">
                {language === "en" ? (
                  <>You Don't Have to Build It Alone. <span className="text-accent">Grow With Us.</span></>
                ) : (
                  <>Vous n'avez pas à le construire seul. <span className="text-accent">Grandissez avec nous.</span></>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: "0.35s" }} data-testid="text-hero-subtitle">
                {language === "en"
                  ? "Performance Processes is more than consulting — we're a community of professionals and business owners who support each other, share what works, and grow together."
                  : "Performance Processes est plus que du conseil — nous sommes une communauté de professionnels qui se soutiennent mutuellement et grandissent ensemble."}
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <Link href="/free-audit" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-hero-audit">
                  <Sparkles size={16} />
                  {language === "en" ? "Start Your Journey" : "Commencez votre parcours"}
                </Link>
                <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-hero-services">
                  {language === "en" ? "See How We Help" : "Voir comment nous aidons"}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
        </section>

        <section className="py-8 bg-white border-b" data-testid="section-trusted-by">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 shrink-0">
                {language === "en" ? "Trusted By Our Community" : "Confiance de notre communauté"}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
                <div className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors" data-testid="logo-nextup">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-bold tracking-wide">NextUp Canada</span>
                </div>
                <div className="w-px h-6 bg-border hidden md:block"></div>
                <div className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors" data-testid="logo-truenorth">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-bold tracking-wide">TrueNorth Property & Facilities</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white relative overflow-hidden" data-testid="section-outcomes">
          <GeometricAccent className="top-20 -right-10 text-primary" />
          <GradientOrb className="w-80 h-80 bg-accent/5 -bottom-40 -left-40" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <AnimateOnScroll animation="fade-left">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                  {language === "en" ? "The Value We Bring" : "La valeur que nous apportons"}
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  {language === "en" ? "More than consulting. A partnership built on trust." : "Plus que du conseil. Un partenariat bâti sur la confiance."}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                  {language === "en"
                    ? "When you join Performance Processes, you're not hiring a firm — you're gaining a team that genuinely cares about your success and a community that has your back."
                    : "Quand vous rejoignez Performance Processes, vous ne recrutez pas une firme — vous gagnez une équipe qui se soucie vraiment de votre succès."}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { val: "100+", label: language === "en" ? "Community members" : "Membres de la communauté" },
                    { val: "97%", label: language === "en" ? "Client satisfaction" : "Satisfaction client" },
                    { val: "∞", label: language === "en" ? "Ongoing support" : "Soutien continu" },
                    { val: "24/7", label: language === "en" ? "Portal access" : "Accès portail" },
                  ].map((stat, i) => (
                    <div key={i} className="text-left" data-testid={`stat-hero-${i}`}>
                      <p className="text-3xl md:text-4xl font-extrabold text-accent mb-1">{stat.val}</p>
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200}>
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                    <VideoWithSubtitles />
                  </div>
                  <FloatingShape className="w-20 h-20 -top-5 -right-5 z-[-1]" variant="square" />
                  <FloatingShape className="w-12 h-12 -bottom-3 right-10 z-[-1]" variant="ring" />
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-border max-w-[240px] hidden md:block animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Heart size={20} className="text-accent" />
                      </div>
                      <p className="text-sm font-bold text-primary">{language === "en" ? "Built on Trust" : "Bâti sur la confiance"}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{language === "en" ? "Every relationship starts with understanding your story" : "Chaque relation commence par comprendre votre histoire"}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {valuePromises.map((item, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                  <div className="relative flex gap-6 p-8 rounded-2xl border border-border bg-white hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 group overflow-hidden h-full" data-testid={`outcome-card-${i}`}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent/0 group-hover:bg-accent transition-all duration-300" />
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 bg-[#F8FAFC] relative overflow-hidden" data-testid="section-who-we-help">
          <FloatingShape className="w-24 h-24 top-20 -left-8" variant="ring" />
          <FloatingShape className="w-10 h-10 top-40 right-20" variant="dot" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "Our Community" : "Notre communauté"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "You belong here" : "Vous avez votre place ici"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "Whether you're a solo professional, a growing business owner, or leading a team — you'll find people who understand your journey and want to see you succeed."
                  : "Que vous soyez un professionnel solo, un entrepreneur en croissance ou un leader d'équipe — vous trouverez des gens qui comprennent votre parcours."}
              </p>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {communityMembers.map((item, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 150}>
                  <div className="group cursor-pointer" data-testid={`who-card-${i}`}>
                    <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[4/3]">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent group-hover:from-primary/90 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white group-hover:translate-x-2 transition-transform duration-300">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed px-1">{item.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            <div className="mt-20 pt-16 border-t border-border/60">
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-10">
                {language === "en" ? "Industries We Serve" : "Industries que nous desservons"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                {industries.map((ind, i) => (
                  <div key={i} className="px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 text-primary/70" data-testid={`industry-${i}`}>
                    <span className="text-sm font-semibold">{ind.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-28 overflow-hidden" data-testid="section-mid-cta">
          <div className="absolute inset-0">
            <img src={communityWorkspaceImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-white mb-4">
              {language === "en" ? "Wondering if this is right for you?" : "Vous vous demandez si c'est fait pour vous ?"}
            </h3>
            <p className="text-white/60 mb-10 max-w-xl mx-auto text-lg">
              {language === "en"
                ? "Let's have an honest conversation. No pressure, no pitch — just a chance to understand your situation and see if we can genuinely help."
                : "Ayons une conversation honnête. Pas de pression, pas de pitch — juste une chance de comprendre votre situation."}
            </p>
            <Link href="/free-audit" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-mid-cta-audit">
              <ClipboardCheck size={16} />
              {language === "en" ? "Book a Free Conversation" : "Réservez une conversation gratuite"}
            </Link>
          </div>
        </section>

        <section id="framework" className="py-32 bg-white relative overflow-hidden" data-testid="section-framework">
          <GeometricAccent className="-left-10 top-40 text-primary" />
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <AnimateOnScroll animation="fade-left">
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img src={communityTownhallImg} alt="Community collaboration" className="w-full h-auto aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <FloatingShape className="w-24 h-24 -top-4 -right-4 z-[-1]" variant="square" />
                  <FloatingShape className="w-32 h-32 -bottom-4 -left-4 z-[-1]" variant="ring" />
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200}>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                  {language === "en" ? "Your Journey With Us" : "Votre parcours avec nous"}
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  {language === "en" ? "A partnership, not a project" : "Un partenariat, pas un projet"}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                  {language === "en"
                    ? "We don't believe in one-size-fits-all approaches. Your journey with us is personal, collaborative, and designed to create lasting change you can feel."
                    : "Nous ne croyons pas aux approches universelles. Votre parcours avec nous est personnel, collaboratif et conçu pour créer un changement durable."}
                </p>
                <Link href="/approach" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors group" data-testid="link-learn-approach">
                  {language === "en" ? "See how we work together" : "Découvrir comment nous travaillons ensemble"}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </AnimateOnScroll>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative max-w-6xl mx-auto">
              <div className="hidden lg:block absolute top-[100px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent z-0" />
              {journeySteps.map((step, i) => (
                <div key={i} className="relative z-10" data-testid={`framework-step-${i}`}>
                  <div className="mx-2 h-full flex flex-col items-center group">
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 shadow-lg">
                      <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white text-sm font-black shadow-lg shadow-accent/30">
                        {step.step}
                      </div>
                    </div>
                    <div className="text-center px-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2">{step.label}</p>
                      <h3 className="text-base font-bold text-primary mb-3">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < journeySteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-[50px] -right-1 transform z-20">
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-accent flex items-center justify-center shadow-sm">
                        <ChevronRight size={12} className="text-accent" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 bg-[#F8FAFC] relative overflow-hidden" data-testid="section-services">
          <FloatingShape className="w-20 h-20 top-32 right-10" variant="ring" />
          <GradientOrb className="w-72 h-72 bg-accent/5 -bottom-32 right-20" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                {language === "en" ? "How We Help" : "Comment nous aidons"}
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "Support designed around your needs" : "Un soutien conçu autour de vos besoins"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "Whether you need a strategic partner, a sounding board, or practical tools to run your business better — we meet you where you are and help you get where you want to go."
                  : "Que vous ayez besoin d'un partenaire stratégique, d'un interlocuteur de confiance ou d'outils pratiques — nous vous accompagnons là où vous êtes."}
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
              {services.slice(0, 3).map((s, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 150}>
                  <Link href="/services" className="block h-full group" data-testid={`link-service-${i}`}>
                    <div className="relative rounded-2xl overflow-hidden h-full min-h-[400px] shadow-lg" data-testid={`service-card-${i}`}>
                      <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/10 group-hover:from-primary/95 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{s.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-4">{s.desc}</p>
                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent group-hover:translate-x-2 transition-transform">
                          {language === "en" ? "Learn more" : "En savoir plus"} <ArrowRight size={14} className="ml-2" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {services.slice(3).map((s, i) => (
                <AnimateOnScroll key={i + 3} animation="fade-up" delay={(i + 3) * 100}>
                  <Link href="/services" className="block h-full group" data-testid={`link-service-${i + 3}`}>
                    <div className="relative rounded-2xl overflow-hidden h-full min-h-[350px] shadow-lg" data-testid={`service-card-${i + 3}`}>
                      <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/10 group-hover:from-primary/95 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{s.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-4">{s.desc}</p>
                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-accent group-hover:translate-x-2 transition-transform">
                          {language === "en" ? "Learn more" : "En savoir plus"} <ArrowRight size={14} className="ml-2" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 bg-primary relative overflow-hidden" data-testid="section-results">
          <div className="absolute inset-0">
            <img src={handsPartnershipImg} alt="" className="w-full h-full object-cover opacity-10 animate-ken-burns" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.12),transparent_60%)]" />
          <FloatingShape className="w-16 h-16 top-20 right-[15%]" variant="ring" />
          <FloatingShape className="w-8 h-8 bottom-32 left-[10%]" variant="dot" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimateOnScroll animation="fade-left">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                  {language === "en" ? "What Our Clients Experience" : "Ce que nos clients vivent"}
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6">
                  {language === "en" ? "The difference you'll feel" : "La différence que vous ressentirez"}
                </h2>
                <p className="text-lg text-white/60 leading-relaxed mb-10">
                  {language === "en"
                    ? "Our clients don't just get better systems — they get peace of mind, clarity, and the confidence that comes from knowing they're not doing this alone."
                    : "Nos clients n'obtiennent pas seulement de meilleurs systèmes — ils obtiennent la tranquillité d'esprit et la confiance de savoir qu'ils ne sont pas seuls."}
                </p>

                <div className="grid grid-cols-3 gap-8 mb-10">
                  <div data-testid="stat-alignment">
                    <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">97%</p>
                    <p className="text-white/50 text-sm">{language === "en" ? "Feel more confident" : "Se sentent plus confiants"}</p>
                  </div>
                  <div data-testid="stat-execution">
                    <p className="text-4xl md:text-5xl font-extrabold text-accent mb-2">100+</p>
                    <p className="text-white/50 text-sm">{language === "en" ? "Community members" : "Membres"}</p>
                  </div>
                  <div data-testid="stat-sustainable">
                    <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">∞</p>
                    <p className="text-white/50 text-sm">{language === "en" ? "Lasting impact" : "Impact durable"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    language === "en" ? "Clarity on what matters most" : "Clarté sur ce qui compte le plus",
                    language === "en" ? "A team that moves together with purpose" : "Une équipe qui avance ensemble avec un but",
                    language === "en" ? "Less stress, more strategic focus" : "Moins de stress, plus de concentration stratégique",
                    language === "en" ? "Systems that run without you babysitting them" : "Des systèmes qui fonctionnent sans surveillance constante",
                    language === "en" ? "A community that celebrates your wins" : "Une communauté qui célèbre vos victoires",
                    language === "en" ? "Confidence that growth is sustainable" : "Confiance que la croissance est durable",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 py-2" data-testid={`result-item-${i}`}>
                      <CheckCircle2 size={16} className="text-accent shrink-0" />
                      <span className="text-white/80 text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-right" delay={200} className="relative hidden lg:block">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                  <img src={teamMovingForwardImg} alt="Team moving forward together" className="w-full h-auto aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <FloatingShape className="w-28 h-28 -top-6 -right-6 z-[-1]" variant="square" />
                <FloatingShape className="w-20 h-20 -bottom-6 -left-6 z-[-1]" variant="ring" />
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white relative overflow-hidden" data-testid="section-insights">
          <GeometricAccent className="top-10 right-20 text-primary" />
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">
                  {language === "en" ? "From Our Community" : "De notre communauté"}
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-2">
                  {language === "en" ? "Ideas Worth Sharing" : "Des idées qui méritent d'être partagées"}
                </h2>
              </div>
              <Link href="/insights" className="inline-flex items-center gap-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all mt-6 md:mt-0 group" data-testid="link-view-all-insights">
                {language === "en" ? "View all insights" : "Voir toutes les perspectives"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insights.map((insight, i) => (
                <AnimateOnScroll key={i} animation="fade-up" delay={i * 150}>
                  <Link href="/insights" className="block h-full" data-testid={`link-insight-${i}`}>
                    <div className="bg-white rounded-2xl border border-border hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 cursor-pointer group h-full flex flex-col overflow-hidden" data-testid={`insight-card-${i}`}>
                      <div className="h-48 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-30">
                          <img src={geoPatternImg} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <span className="relative z-10 text-5xl font-extrabold text-primary/10 group-hover:text-accent/20 transition-colors">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                            <Tag size={10} /> {insight.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar size={10} /> {insight.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-primary mb-4 group-hover:text-accent transition-colors line-clamp-2">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-3">{insight.excerpt}</p>
                        <div className="mt-6 flex items-center text-sm font-bold uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                          {language === "en" ? "Read more" : "Lire la suite"} <ArrowRight size={14} className="ml-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 bg-[#F8FAFC] border-t" data-testid="section-cta">
          <div className="container mx-auto px-4 md:px-8">
            <AnimateOnScroll animation="fade-scale">
              <div className="relative rounded-[2rem] overflow-hidden max-w-5xl mx-auto">
                <div className="absolute inset-0">
                  <img src={communityCollaborationImg} alt="" className="w-full h-full object-cover animate-ken-burns" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
                </div>
                <FloatingShape className="w-14 h-14 top-10 right-10 z-[5]" variant="ring" />
                <div className="relative z-10 p-12 lg:p-20 max-w-2xl">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-6">
                    {language === "en" ? "Join Our Community" : "Rejoignez notre communauté"}
                  </p>
                  <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
                    {language === "en"
                      ? "Ready to stop going it alone?"
                      : "Prêt à arrêter de faire cavalier seul ?"}
                  </h2>
                  <p className="text-lg text-white/70 mb-12">
                    {language === "en"
                      ? "Whether you're looking for strategic clarity, better systems, or simply people who get what you're going through — the first step is a conversation. Let's figure it out together."
                      : "Que vous cherchiez de la clarté stratégique, de meilleurs systèmes ou simplement des gens qui comprennent ce que vous traversez — la première étape est une conversation."}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/free-audit" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-cta-audit">
                      <Sparkles size={16} />
                      {language === "en" ? "Start Your Journey" : "Commencez votre parcours"}
                    </Link>
                    <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="link-cta-services">
                      {language === "en" ? "Explore how we help" : "Découvrir comment nous aidons"}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
