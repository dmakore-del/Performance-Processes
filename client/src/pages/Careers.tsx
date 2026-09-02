import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PageHero } from "@/components/layout/PageHero";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import collaborationImg from "@assets/generated/collaboration.png";
import leadershipImg from "@assets/generated/leadership.png";

export default function Careers() {
  const { language } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to submit");
      }
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) return;

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("linkedIn", linkedIn);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resumeFile);
    formData.append("position", "Business Development Consultant");

    mutation.mutate(formData);
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setLinkedIn("");
    setCoverLetter("");
    setResumeFile(null);
    setSubmitted(false);
    mutation.reset();
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setTimeout(resetForm, 300);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <SEOHead
        title={language === "en" ? "Careers | Performance Processes" : "Carrières | Performance Processes"}
        description={language === "en" ? "Explore career opportunities at Performance Processes and help Canadian businesses establish, organize, and launch." : "Découvrez les possibilités de carrière chez Performance Processes et aidez les entreprises canadiennes à s’établir, s’organiser et se lancer."}
        path="/careers"
      />
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={<>{language === "en" ? "Join Our" : "Rejoignez Notre"} <span className="text-accent italic">{language === "en" ? "Team" : "Équipe"}</span></>}
          subtitle={language === "en" 
            ? "Build a career aligning strategy with measurable impact."
            : "Construisez une carrière en alignant la stratégie sur un impact mesurable."}
        />
        
        <section className="py-20 bg-white" data-testid="section-why-work-with-us">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                  {language === "en" ? "Why Work With Us" : "Pourquoi travailler avec nous"}
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                  {language === "en" ? (
                    <>Build Your Career With <span className="text-accent italic">Purpose</span></>
                  ) : (
                    <>Bâtissez votre carrière avec <span className="text-accent italic">sens</span></>
                  )}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "en"
                    ? "At Performance Processes, we believe that exceptional consulting starts with exceptional people. We're not just building a team, we're cultivating a community of driven professionals who share a passion for helping organizations unlock their full potential."
                    : "Chez Performance Processes, nous croyons qu'un conseil exceptionnel commence par des personnes exceptionnelles. Nous ne bâtissons pas seulement une équipe, nous cultivons une communauté de professionnels motivés qui partagent la passion d'aider les organisations à réaliser leur plein potentiel."}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "en"
                    ? "Our culture is built on trust, autonomy, and a relentless focus on results. We empower our team members to take ownership, think strategically, and deliver transformative outcomes for our clients. Every engagement is an opportunity to make a real difference."
                    : "Notre culture repose sur la confiance, l'autonomie et une concentration constante sur les résultats. Nous donnons à nos membres d'équipe les moyens de prendre les rênes, de penser stratégiquement et de livrer des résultats transformateurs pour nos clients. Chaque mandat est une occasion de faire une réelle différence."}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "en"
                    ? "Whether you're an experienced consultant or a rising professional looking to break into the advisory space, Performance Processes offers a platform where your skills, ambition, and network can translate into meaningful impact, and meaningful income."
                    : "Que vous soyez un consultant expérimenté ou un professionnel en devenir souhaitant percer dans le domaine du conseil, Performance Processes offre une plateforme où vos compétences, votre ambition et votre réseau peuvent se traduire par un impact significatif, et un revenu significatif."}
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={collaborationImg} alt="Team collaboration at Performance Processes" className="w-full h-[400px] object-cover" data-testid="img-culture" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#FAFAFA]" data-testid="section-benefits">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-14">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                {language === "en" ? "Benefits & Perks" : "Avantages"}
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                {language === "en" ? (
                  <>What You'll <span className="text-accent italic">Gain</span></>
                ) : (
                  <>Ce que vous <span className="text-accent italic">gagnerez</span></>
                )}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === "en"
                  ? "We offer a comprehensive set of benefits designed to support your professional growth, personal well-being, and financial success."
                  : "Nous offrons un ensemble complet d'avantages conçus pour soutenir votre croissance professionnelle, votre bien-être personnel et votre réussite financière."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(language === "en" ? [
                { title: "Flexible Schedule", desc: "Work on your own terms. Set your own hours and manage your pipeline with full autonomy over your time." },
                { title: "Remote Work", desc: "Operate from anywhere. Our team is fully distributed, allowing you to work from the location that suits you best." },
                { title: "Professional Development", desc: "Access training resources, mentorship from senior consultants, and opportunities to expand your expertise." },
                { title: "Uncapped Earnings", desc: "No salary caps. Your compensation is directly tied to your performance, with competitive commission structures." },
                { title: "Mentorship", desc: "Learn from experienced industry professionals who are invested in your growth and long-term success." },
                { title: "Industry Exposure", desc: "Gain experience across diverse sectors including government, healthcare, finance, nonprofit, and technology." },
              ] : [
                { title: "Horaire flexible", desc: "Travaillez selon vos conditions. Fixez vos propres heures et gérez votre pipeline avec une autonomie complète sur votre temps." },
                { title: "Télétravail", desc: "Travaillez de n'importe où. Notre équipe est entièrement répartie, ce qui vous permet de travailler à l'endroit qui vous convient le mieux." },
                { title: "Perfectionnement professionnel", desc: "Accédez à des ressources de formation, au mentorat de consultants chevronnés et à des occasions d'élargir votre expertise." },
                { title: "Revenus sans plafond", desc: "Aucun plafond salarial. Votre rémunération est directement liée à votre rendement, avec des structures de commission concurrentielles." },
                { title: "Mentorat", desc: "Apprenez auprès de professionnels expérimentés de l'industrie qui s'investissent dans votre croissance et votre réussite à long terme." },
                { title: "Exposition à l'industrie", desc: "Acquérez de l'expérience dans divers secteurs, notamment le gouvernement, la santé, la finance, le secteur sans but lucratif et la technologie." },
              ]).map((benefit, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-shadow" data-testid={`card-benefit-${i}`}>
                  <div className="w-10 h-px bg-accent mb-5" />
                  <h3 className="text-lg font-bold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white" data-testid="section-life-at-pp">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-xl">
                <img src={leadershipImg} alt="Life at Performance Processes" className="w-full h-[400px] object-cover" data-testid="img-life-at-pp" />
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                  {language === "en" ? "Life at Performance Processes" : "La vie chez Performance Processes"}
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                  {language === "en" ? (
                    <>A Team Built on <span className="text-accent italic">Excellence</span></>
                  ) : (
                    <>Une équipe bâtie sur <span className="text-accent italic">l'excellence</span></>
                  )}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "en"
                    ? "Our team is made up of professionals who bring diverse backgrounds, deep expertise, and a shared commitment to driving meaningful change. We foster an environment where ideas are valued, collaboration is natural, and every contribution matters."
                    : "Notre équipe est composée de professionnels aux parcours variés, dotés d'une expertise approfondie et d'un engagement commun à générer un changement significatif. Nous favorisons un environnement où les idées sont valorisées, la collaboration est naturelle et chaque contribution compte."}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {language === "en"
                    ? "From day one, you'll have the tools and support you need to succeed. Our onboarding process ensures you understand our service offerings, methodology, and client engagement approach so you can hit the ground running with confidence."
                    : "Dès le premier jour, vous disposerez des outils et du soutien nécessaires pour réussir. Notre processus d'intégration vous assure de comprendre nos offres de services, notre méthodologie et notre approche de la relation client, afin de démarrer en toute confiance."}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "en"
                    ? "Growth is not just encouraged, it's built into everything we do. As Performance Processes expands, so do the opportunities for our team members to take on greater responsibilities, develop new capabilities, and shape the direction of the firm."
                    : "La croissance n'est pas seulement encouragée, elle est intégrée à tout ce que nous faisons. À mesure que Performance Processes prend de l'ampleur, les occasions se multiplient pour nos membres d'équipe d'assumer de plus grandes responsabilités, de développer de nouvelles compétences et de façonner l'orientation de la firme."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary" data-testid="section-our-promise">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <h3 className="text-2xl md:text-3xl text-white font-heading font-extrabold mb-6 italic" data-testid="text-promise-title">
              {language === "en" ? "Our Promise to Our Team" : "Notre promesse à notre équipe"}
            </h3>
            <p className="text-xl text-white/80 leading-relaxed mb-4">
              {language === "en"
                ? "We believe that when our people succeed, our clients succeed. That's why we're committed to providing every team member with the support, autonomy, and resources they need to thrive."
                : "Nous croyons que lorsque nos gens réussissent, nos clients réussissent. C'est pourquoi nous nous engageons à offrir à chaque membre de l'équipe le soutien, l'autonomie et les ressources dont il a besoin pour s'épanouir."}
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              {language === "en"
                ? "At Performance Processes, you're not just joining a firm, you're joining a mission to help organizations reach their full potential."
                : "Chez Performance Processes, vous ne rejoignez pas seulement une firme, vous rejoignez une mission visant à aider les organisations à réaliser leur plein potentiel."}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 py-20 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-xl space-y-8">
            <div className="border-b border-border pb-8">
              <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                {language === "en" ? "Open Role" : "Poste ouvert"}
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                {language === "en" ? "Business Development Consultant" : "Conseiller en développement des affaires"}
              </h2>
              <div className="flex gap-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> {language === "en" ? "Remote / Flexible" : "À distance / Flexible"}</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent"></div> {language === "en" ? "Commission-Based" : "À commission"}</span>
              </div>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                {language === "en"
                  ? "We are seeking a results-driven Consultant to support business development and client acquisition efforts. This commission-based role is ideal for a motivated professional with strong networks, consultative selling skills, and a passion for helping organizations improve performance and strategic alignment."
                  : "Nous recherchons un conseiller axé sur les résultats pour soutenir les efforts de développement des affaires et d'acquisition de clients. Ce poste à commission est idéal pour un professionnel motivé doté de solides réseaux, de compétences en vente consultative et d'une passion pour aider les organisations à améliorer leur rendement et leur alignement stratégique."}
              </p>
              <p>
                {language === "en"
                  ? "The Consultant will identify potential clients, initiate conversations with decision-makers, and represent our consulting services with professionalism and credibility. This role offers flexible engagement and uncapped earning potential based on successful client conversions."
                  : "Le conseiller repérera les clients potentiels, amorcera des conversations avec les décideurs et représentera nos services de consultation avec professionnalisme et crédibilité. Ce poste offre un engagement flexible et un potentiel de gains sans plafond en fonction des conversions de clients réussies."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">{language === "en" ? "Key Responsibilities" : "Principales responsabilités"}</h3>
              <ul className="space-y-3">
                {(language === "en" ? [
                  "Identify and engage prospective clients aligned with our service offerings",
                  "Build relationships with organizational leaders and decision-makers",
                  "Present consulting solutions tailored to client needs",
                  "Facilitate introductions and initial strategy discussions",
                  "Support proposal follow-up and deal progression",
                  "Maintain a pipeline of qualified leads"
                ] : [
                  "Repérer et mobiliser des clients potentiels alignés sur nos offres de services",
                  "Bâtir des relations avec les dirigeants et les décideurs des organisations",
                  "Présenter des solutions de consultation adaptées aux besoins des clients",
                  "Faciliter les présentations et les premières discussions stratégiques",
                  "Soutenir le suivi des propositions et la progression des ententes",
                  "Maintenir un pipeline de prospects qualifiés"
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0 mt-1 leading-none">·</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">{language === "en" ? "Ideal Candidate Profile" : "Profil du candidat idéal"}</h3>
              <ul className="space-y-3">
                {(language === "en" ? [
                  "Strong professional network within corporate, nonprofit, or SME sectors",
                  "Experience in consulting, advisory services, or business development",
                  "Excellent communication and relationship-building skills",
                  "Self-motivated and target-driven",
                  "High level of professionalism and integrity"
                ] : [
                  "Solide réseau professionnel dans les secteurs corporatif, sans but lucratif ou des PME",
                  "Expérience en consultation, en services-conseils ou en développement des affaires",
                  "Excellentes compétences en communication et en établissement de relations",
                  "Autonome et axé sur les objectifs",
                  "Haut niveau de professionnalisme et d'intégrité"
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0 mt-1 leading-none">·</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">{language === "en" ? "Compensation Structure" : "Structure de rémunération"}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "This is a commission-based role with earnings tied directly to closed consulting engagements. Commission percentages are competitive and structured to reward performance and long-term client relationships."
                  : "Il s’agit d’un poste à commission dont les revenus sont directement liés aux mandats de conseil conclus. Les pourcentages de commission sont concurrentiels et récompensent le rendement ainsi que les relations durables avec les clients."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">{language === "en" ? "What We Offer" : "Ce que nous offrons"}</h3>
              <ul className="space-y-3">
                {(language === "en" ? [
                  "Flexible, remote engagement",
                  "High-value consulting services with strong market demand",
                  "Uncapped commission potential",
                  "Opportunity to align with a performance-focused consulting brand"
                ] : [
                  "Mandat flexible à distance",
                  "Services-conseils à forte valeur répondant à une demande réelle",
                  "Potentiel de commission sans plafond",
                  "Possibilité de collaborer avec une marque axée sur la performance"
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0 mt-1 leading-none">·</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground italic mt-6 border-l-4 border-accent pl-4 py-2 bg-secondary/30">
                {language === "en"
                  ? "This role is well-suited for independent consultants, industry professionals, or business advisors looking to expand their income through strategic referrals and client acquisition."
                  : "Ce poste convient aux consultants indépendants, aux professionnels de l’industrie et aux conseillers d’affaires qui souhaitent accroître leurs revenus grâce aux recommandations stratégiques et à l’acquisition de clients."}
              </p>
            </div>

            <div className="pt-8 border-t border-border">
              <Button 
                className="w-full md:w-auto rounded-full bg-accent text-white hover:bg-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-accent/20"
                onClick={() => setIsFormOpen(true)}
                data-testid="button-apply"
              >
                {language === "en" ? "Apply for this role" : "Postuler à ce poste"}
              </Button>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-xl space-y-8 mt-12" data-testid="section-hiring-policy">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                {language === "en" ? "Our Commitment" : "Notre Engagement"}
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                {language === "en" ? "Hiring Policy" : "Politique d'embauche"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "Performance Processes is committed to building a diverse, inclusive, and equitable workplace. Our hiring practices reflect our core values of fairness, transparency, and respect for every individual."
                  : "Performance Processes s'engage à bâtir un milieu de travail diversifié, inclusif et équitable. Nos pratiques d'embauche reflètent nos valeurs fondamentales d'équité, de transparence et de respect de chaque individu."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">
                {language === "en" ? "Equal Opportunity Employer" : "Employeur offrant l'égalité des chances"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "We are an equal opportunity employer. All qualified applicants will receive consideration for employment without regard to race, colour, religion, sex, sexual orientation, gender identity, national origin, age, disability, veteran status, or any other characteristic protected by applicable law."
                  : "Nous sommes un employeur offrant l'égalité des chances. Tous les candidats qualifiés seront pris en considération sans égard à la race, la couleur, la religion, le sexe, l'orientation sexuelle, l'identité de genre, l'origine nationale, l'âge, le handicap, le statut d'ancien combattant ou toute autre caractéristique protégée par la loi applicable."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">
                {language === "en" ? "Merit-Based Selection" : "Sélection fondée sur le mérite"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "All hiring decisions are based on qualifications, demonstrated skills, relevant experience, and alignment with our organizational values. We evaluate every candidate fairly and consistently through a structured review process."
                  : "Toutes les décisions d'embauche sont fondées sur les qualifications, les compétences démontrées, l'expérience pertinente et l'alignement avec nos valeurs organisationnelles. Nous évaluons chaque candidat de manière équitable et cohérente à travers un processus de révision structuré."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">
                {language === "en" ? "Accommodation" : "Accommodement"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "We are committed to providing accessible employment practices in compliance with the Accessibility for Ontarians with Disabilities Act (AODA). If you require accommodation during the application or hiring process, please contact us and we will work with you to meet your needs."
                  : "Nous nous engageons à offrir des pratiques d'emploi accessibles conformément à la Loi sur l'accessibilité pour les personnes handicapées de l'Ontario (LAPHO). Si vous avez besoin d'un accommodement pendant le processus de candidature ou d'embauche, veuillez nous contacter et nous travaillerons avec vous pour répondre à vos besoins."}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">
                {language === "en" ? "Our Hiring Process" : "Notre processus d'embauche"}
              </h3>
              <ul className="space-y-3">
                {(language === "en" ? [
                  "Application Review, We carefully review every submission received",
                  "Initial Screening, Qualified candidates are contacted for a brief introductory conversation",
                  "Interview, Selected candidates participate in a focused interview with our team",
                  "Decision & Offer, Successful candidates receive a formal offer outlining terms and next steps"
                ] : [
                  "Examen des candidatures, Nous examinons attentivement chaque soumission reçue",
                  "Présélection, Les candidats qualifiés sont contactés pour une brève conversation d'introduction",
                  "Entrevue, Les candidats sélectionnés participent à une entrevue ciblée avec notre équipe",
                  "Décision et offre, Les candidats retenus reçoivent une offre formelle décrivant les conditions et les prochaines étapes"
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3" data-testid={`text-hiring-step-${i}`}>
                    <div className="w-7 h-7 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">
                {language === "en" ? "Privacy & Confidentiality" : "Confidentialité et vie privée"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "All personal information collected during the hiring process is kept strictly confidential and used solely for recruitment purposes. We handle your data in accordance with applicable privacy legislation."
                  : "Toutes les informations personnelles recueillies pendant le processus d'embauche sont gardées strictement confidentielles et utilisées uniquement à des fins de recrutement. Nous traitons vos données conformément à la législation applicable en matière de protection de la vie privée."}
              </p>
            </div>

            <p className="text-sm text-muted-foreground italic border-l-4 border-primary pl-4 py-2 bg-secondary/30">
              {language === "en"
                ? "Performance Processes values the unique skills and experiences each candidate brings. We encourage all qualified individuals to apply."
                : "Performance Processes valorise les compétences et expériences uniques que chaque candidat apporte. Nous encourageons toutes les personnes qualifiées à postuler."}
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-xl space-y-6 mt-12" data-testid="section-future-roles">
            <div className="flex items-start gap-4">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                  {language === "en" ? "Coming Soon" : "À venir"}
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-4">
                  {language === "en" ? "Additional Roles on the Horizon" : "D’autres postes à venir"}
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {language === "en"
                ? "As Performance Processes continues to grow, we anticipate expanding our team across several areas including project management, research analysis, and client success. We're always looking for talented individuals who align with our mission and values."
                : "À mesure que Performance Processes grandit, nous prévoyons élargir notre équipe dans plusieurs domaines, notamment la gestion de projets, l’analyse de recherche et la réussite client. Nous cherchons des personnes talentueuses qui partagent notre mission et nos valeurs."}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {language === "en"
                ? "Don't see a role that fits? We welcome general applications from professionals who believe they can contribute to our mission. Submit your resume and a brief introduction, and we'll keep your information on file for future opportunities."
                : "Aucun poste ne correspond à votre profil? Nous acceptons les candidatures spontanées de professionnels qui souhaitent contribuer à notre mission. Envoyez votre CV et une brève présentation; nous conserverons vos renseignements pour de futures possibilités."}
            </p>
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                className="rounded-full bg-primary text-white hover:bg-primary/90 h-12 px-8 font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2"
                onClick={() => setIsFormOpen(true)}
                data-testid="button-general-application"
              >
                {language === "en" ? "Submit General Application" : "Envoyer une candidature spontanée"}
              </Button>
              <span className="text-sm text-muted-foreground">{language === "en" ? "or email us at" : "ou écrivez-nous à"} <a href="mailto:careers@performanceprocesses.com" className="text-accent hover:underline font-medium">careers@performanceprocesses.com</a></span>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={isFormOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center gap-6">
              <h3 className="text-2xl font-bold text-primary" data-testid="text-application-success">
                {language === "en" ? "Application Submitted!" : "Candidature envoyée!"}
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {language === "en" ? "Thank you for your interest in joining Performance Processes. We'll review your application and get back to you soon." : "Merci de votre intérêt pour Performance Processes. Nous examinerons votre candidature et communiquerons bientôt avec vous."}
              </p>
              <Button 
                onClick={handleClose} 
                variant="outline" 
                className="rounded-full px-8 mt-4"
                data-testid="button-close-success"
              >
                {language === "en" ? "Close" : "Fermer"}
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-2xl font-bold text-primary uppercase italic">
                  {language === "en" ? "Apply: Business Development Consultant" : "Postuler : conseiller en développement des affaires"}
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {language === "en" ? "Fields marked with" : "Les champs marqués d’un"} <span className="text-red-500">*</span> {language === "en" ? "are required" : "sont obligatoires"}
                </p>
              </DialogHeader>
              
              {mutation.isError && (
                <div className="mx-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium" data-testid="text-apply-error">
                  {language === "en" ? (mutation.error?.message || "Something went wrong. Please try again.") : "Une erreur s’est produite. Veuillez réessayer."}
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                      {language === "en" ? "First Name" : "Prénom"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full bg-[#FAFAFA] border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent font-medium text-sm"
                      placeholder={language === "en" ? "First name" : "Prénom"}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      data-testid="input-first-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                      {language === "en" ? "Last Name" : "Nom"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full bg-[#FAFAFA] border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent font-medium text-sm"
                      placeholder={language === "en" ? "Last name" : "Nom"}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      data-testid="input-last-name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#FAFAFA] border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent font-medium text-sm"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      data-testid="input-apply-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                       {language === "en" ? "Phone" : "Téléphone"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-[#FAFAFA] border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent font-medium text-sm"
                      placeholder="+1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      data-testid="input-phone"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                     {language === "en" ? "LinkedIn Profile" : "Profil LinkedIn"}
                  </label>
                  <input
                    className="w-full bg-[#FAFAFA] border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent font-medium text-sm"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    data-testid="input-linkedin"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                     {language === "en" ? "Resume / CV" : "Curriculum vitæ"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setResumeFile(e.target.files[0]);
                      }
                    }}
                    data-testid="input-resume"
                  />
                  {resumeFile ? (
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-3.5">
                      <span className="text-sm font-medium text-green-800 flex-1 truncate">{resumeFile.name}</span>
                      <button
                        type="button"
                        onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        className="text-xs font-bold uppercase tracking-wider text-green-700 hover:text-red-500 transition-colors"
                        data-testid="button-remove-resume"
                      >
                         {language === "en" ? "Remove" : "Retirer"}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-border rounded-xl px-5 py-8 flex flex-col items-center gap-3 hover:border-accent hover:bg-accent/5 transition-all cursor-pointer"
                      data-testid="button-upload-resume"
                    >
                       <span className="text-sm font-bold text-muted-foreground">{language === "en" ? "Click to upload your resume" : "Cliquez pour téléverser votre CV"}</span>
                       <span className="text-xs text-muted-foreground/60">{language === "en" ? "PDF, DOC, or DOCX (max 10MB)" : "PDF, DOC ou DOCX (10 Mo maximum)"}</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                     {language === "en" ? "Cover Letter" : "Lettre de présentation"}
                  </label>
                  <textarea
                    className="w-full bg-[#FAFAFA] border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent font-medium text-sm h-32 resize-none"
                     placeholder={language === "en" ? "Tell us why you'd be a great fit..." : "Expliquez-nous pourquoi votre profil convient..."}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    data-testid="input-cover-letter"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={mutation.isPending || !resumeFile}
                  className="w-full rounded-full bg-accent text-white hover:bg-primary h-14 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  data-testid="button-submit-application"
                >
                   {mutation.isPending ? (language === "en" ? "Submitting..." : "Envoi en cours...") : (language === "en" ? "Submit Application" : "Envoyer la candidature")}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
