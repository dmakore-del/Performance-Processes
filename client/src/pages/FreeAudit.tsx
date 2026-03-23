import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { ArrowRight, CheckCircle2, Calendar, AlertTriangle, ClipboardCheck, Users, Settings, BarChart3, Download, Mail } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import heroAbstractImg from "@assets/generated/hero-abstract-new.png";
import analyticsDashboardImg from "@assets/generated/analytics-dashboard-new.png";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

export default function FreeAudit() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ fullName: "", email: "", company: "", role: "" });
  const [downloaded, setDownloaded] = useState(false);

  const checklistMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/audit-checklist", data);
      return res.json();
    },
    onSuccess: () => {
      setDownloaded(true);
      toast({
        title: language === "en" ? "Request received!" : "Demande reçue !",
        description: language === "en"
          ? "We'll send you the checklist shortly. Keep an eye on your inbox."
          : "Nous vous enverrons la liste sous peu. Surveillez votre boîte de réception.",
      });
    },
    onError: () => {
      toast({
        title: language === "en" ? "Something went wrong" : "Une erreur est survenue",
        description: language === "en" ? "Please try again or contact us directly." : "Veuillez réessayer ou nous contacter directement.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;
    checklistMutation.mutate(formData);
  };

  const problems = language === "en" ? [
    { icon: <AlertTriangle size={20} />, text: "Teams lack clear accountability structures" },
    { icon: <Settings size={20} />, text: "Processes aren't documented or standardized" },
    { icon: <Users size={20} />, text: "Leaders are overwhelmed and stretched thin" },
    { icon: <BarChart3 size={20} />, text: "Operations don't scale with growth" },
    { icon: <AlertTriangle size={20} />, text: "Staff performance is inconsistent" },
    { icon: <Settings size={20} />, text: "Hiring decisions are based on gut feeling" },
  ] : [
    { icon: <AlertTriangle size={20} />, text: "Les équipes manquent de structures de responsabilité claires" },
    { icon: <Settings size={20} />, text: "Les processus ne sont pas documentés ou standardisés" },
    { icon: <Users size={20} />, text: "Les dirigeants sont débordés" },
    { icon: <BarChart3 size={20} />, text: "Les opérations ne s'adaptent pas à la croissance" },
    { icon: <AlertTriangle size={20} />, text: "La performance du personnel est incohérente" },
    { icon: <Settings size={20} />, text: "Les décisions d'embauche sont basées sur l'intuition" },
  ];

  const auditIncludes = language === "en" ? [
    "Operations efficiency assessment",
    "Team workflow evaluation",
    "Leadership & accountability review",
    "People management gap analysis",
    "Hiring process assessment",
    "Custom improvement recommendations",
  ] : [
    "Évaluation de l'efficacité opérationnelle",
    "Évaluation des flux de travail d'équipe",
    "Revue du leadership et de la responsabilité",
    "Analyse des lacunes en gestion des personnes",
    "Évaluation du processus de recrutement",
    "Recommandations d'amélioration personnalisées",
  ];

  const audienceTypes = language === "en" ? [
    "Law firms & professional services",
    "Accounting firms & financial advisors",
    "Nonprofit organizations",
    "Growing small businesses",
    "Scaling organizations",
    "Independent professionals",
  ] : [
    "Cabinets d'avocats et services professionnels",
    "Cabinets comptables et conseillers financiers",
    "Organismes à but non lucratif",
    "Petites entreprises en croissance",
    "Organisations en expansion",
    "Professionnels indépendants",
  ];

  const funnelSteps = language === "en" ? [
    { step: "01", title: "Get Your Checklist", desc: "Download the Process & People Management Audit Checklist and start identifying gaps." },
    { step: "02", title: "Book Your Free Audit", desc: "Schedule a 20-minute consultation where we walk through the checklist together." },
    { step: "03", title: "Receive Your Recommendations", desc: "Get a clear picture of what's working, what's not, and where to focus first." },
    { step: "04", title: "Take Action", desc: "Decide if you want to implement the improvements on your own or with our support." },
  ] : [
    { step: "01", title: "Obtenez votre liste", desc: "Téléchargez la liste de vérification et commencez à identifier les lacunes." },
    { step: "02", title: "Réservez votre audit gratuit", desc: "Planifiez une consultation de 20 minutes où nous parcourons la liste ensemble." },
    { step: "03", title: "Recevez vos recommandations", desc: "Obtenez une image claire de ce qui fonctionne et de ce qui doit être amélioré." },
    { step: "04", title: "Passez à l'action", desc: "Décidez si vous voulez implémenter les améliorations seul ou avec notre soutien." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden">
      <SEOHead title="Free Process & People Management Audit" description="Get a free audit checklist to evaluate your organization's processes and people management. Identify gaps, improve efficiency, and build accountability with Performance Processes." path="/free-audit" />
      <Navbar />

      <main className="flex-grow">
        <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden bg-primary" data-testid="section-audit-hero">
          <div className="absolute inset-0 z-0">
            <img src={heroAbstractImg} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
          </div>
          <div className="absolute bottom-0 right-0 w-2/5 h-full hidden lg:block z-[1]">
            <img src={analyticsDashboardImg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent z-20" />
          <div className="container mx-auto px-4 md:px-8 py-24 lg:py-32 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.08]" data-testid="text-audit-hero-title">
                {language === "en" ? (
                  <>Improve Your Processes. <span className="text-accent">Empower Your People.</span></>
                ) : (
                  <>Améliorez vos processus. <span className="text-accent">Renforcez vos équipes.</span></>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto" data-testid="text-audit-hero-subtitle">
                {language === "en"
                  ? "Discover the hidden inefficiencies slowing down your organization. Get a free Process & People Management Audit and actionable recommendations in just 20 minutes."
                  : "Découvrez les inefficacités cachées qui ralentissent votre organisation. Obtenez un audit gratuit avec des recommandations concrètes en seulement 20 minutes."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-audit-hero-book">
                  <Calendar size={16} />
                  {language === "en" ? "Book Your Free Audit" : "Réservez votre audit gratuit"}
                </a>
                <button onClick={() => document.getElementById('checklist-section')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300" data-testid="button-get-checklist">
                  <Download size={16} />
                  {language === "en" ? "Get the Checklist" : "Obtenir la liste"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 bg-white" data-testid="section-problems">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "Common challenges we solve" : "Les défis que nous résolvons"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "Most organizations and professionals struggle with the same core issues. If any of these sound familiar, the free audit can help."
                  : "La plupart des organisations font face aux mêmes défis fondamentaux. Si cela vous semble familier, l'audit gratuit peut aider."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {problems.map((problem, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100" data-testid={`problem-card-${i}`}>
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                    {problem.icon}
                  </div>
                  <p className="text-primary font-medium">{problem.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What the Audit Includes */}
        <section className="py-24 bg-[#F8FAFC]" data-testid="section-audit-includes">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                    {language === "en" ? "Free Process & People Management Audit" : "Audit gratuit de processus et de gestion des personnes"}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {language === "en"
                      ? "In just 20 minutes, we'll walk through a structured assessment of your operations, team structure, and leadership processes to identify the biggest opportunities for improvement."
                      : "En seulement 20 minutes, nous parcourons une évaluation structurée de vos opérations, de votre structure d'équipe et de vos processus de leadership."}
                  </p>
                  <div className="space-y-4">
                    {auditIncludes.map((item, i) => (
                      <div key={i} className="flex items-center gap-3" data-testid={`audit-item-${i}`}>
                        <CheckCircle2 size={20} className="text-accent shrink-0" />
                        <span className="text-primary font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10">
                    <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-accent/90 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-accent/20" data-testid="link-audit-book-inline">
                      <Calendar size={16} />
                      {language === "en" ? "Book Your Free Audit" : "Réservez votre audit gratuit"}
                    </a>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl p-10 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.15),transparent_70%)]" />
                  <div className="relative z-10">
                    <ClipboardCheck size={40} className="text-accent mb-6" />
                    <h3 className="text-2xl font-bold mb-2">
                      {language === "en" ? "20-Minute Consultation" : "Consultation de 20 minutes"}
                    </h3>
                    <p className="text-white/60 mb-8">
                      {language === "en" ? "Here's what happens during your free audit:" : "Voici ce qui se passe lors de votre audit gratuit :"}
                    </p>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 text-sm font-bold">1</div>
                        <div>
                          <p className="font-semibold">{language === "en" ? "We diagnose" : "Nous diagnostiquons"}</p>
                          <p className="text-white/50 text-sm">{language === "en" ? "Quick review of your processes, team structure, and pain points." : "Revue rapide de vos processus et points de douleur."}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 text-sm font-bold">2</div>
                        <div>
                          <p className="font-semibold">{language === "en" ? "We identify gaps" : "Nous identifions les lacunes"}</p>
                          <p className="text-white/50 text-sm">{language === "en" ? "Spot operational and people management inefficiencies." : "Repérer les inefficacités opérationnelles et de gestion."}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 text-sm font-bold">3</div>
                        <div>
                          <p className="font-semibold">{language === "en" ? "We recommend" : "Nous recommandons"}</p>
                          <p className="text-white/50 text-sm">{language === "en" ? "Actionable improvements you can start implementing immediately." : "Améliorations concrètes à mettre en œuvre immédiatement."}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-24 bg-white" data-testid="section-who-for">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "This audit works especially well for" : "Cet audit fonctionne particulièrement bien pour"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {audienceTypes.map((type, i) => (
                <div key={i} className="flex items-center gap-3 p-5 bg-gradient-to-br from-[#F8FAFC] to-white rounded-2xl border border-border" data-testid={`audience-${i}`}>
                  <CheckCircle2 size={18} className="text-accent shrink-0" />
                  <span className="text-primary font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist Download / Email Capture */}
        <section id="checklist-section" className="py-24 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden" data-testid="section-checklist">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.08),transparent_60%)]" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-6">
                {language === "en" ? "Get the Audit Checklist" : "Obtenez la liste de vérification"}
              </h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                {language === "en"
                  ? "Download the Process & People Management Audit Checklist used by leaders to identify operational and leadership inefficiencies. It's free — no obligation."
                  : "Téléchargez la liste de vérification utilisée par les dirigeants pour identifier les inefficacités opérationnelles et de leadership. C'est gratuit — sans obligation."}
              </p>

              {!downloaded ? (
                <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-left space-y-4" data-testid="form-checklist">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        {language === "en" ? "Full Name *" : "Nom complet *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/50"
                        placeholder={language === "en" ? "Your name" : "Votre nom"}
                        data-testid="input-checklist-name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        {language === "en" ? "Email *" : "Courriel *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/50"
                        placeholder={language === "en" ? "you@company.com" : "vous@entreprise.com"}
                        data-testid="input-checklist-email"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        {language === "en" ? "Company / Organization" : "Entreprise / Organisation"}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/50"
                        placeholder={language === "en" ? "Your company" : "Votre entreprise"}
                        data-testid="input-checklist-company"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        {language === "en" ? "Your Role" : "Votre rôle"}
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/50"
                        placeholder={language === "en" ? "e.g. Founder, Director, Manager" : "ex. Fondateur, Directeur, Gestionnaire"}
                        data-testid="input-checklist-role"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={checklistMutation.isPending}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-accent/90 h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-accent/20 disabled:opacity-50"
                    data-testid="button-download-checklist"
                  >
                    <Mail size={16} />
                    {checklistMutation.isPending
                      ? (language === "en" ? "Sending..." : "Envoi en cours...")
                      : (language === "en" ? "Send Me the Checklist" : "Envoyez-moi la liste")}
                  </button>
                  <p className="text-white/30 text-xs text-center">
                    {language === "en" ? "No spam. No obligation. Just a useful tool." : "Pas de spam. Pas d'obligation. Juste un outil utile."}
                  </p>
                </form>
              ) : (
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/10 text-center" data-testid="checklist-success">
                  <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {language === "en" ? "You're on the list!" : "Vous êtes inscrit !"}
                  </h3>
                  <p className="text-white/60 mb-8">
                    {language === "en"
                      ? "We'll send the Process & People Management Audit Checklist to your inbox shortly. In the meantime, why not book your free audit?"
                      : "Nous vous enverrons la liste de vérification à votre boîte de réception sous peu. En attendant, pourquoi ne pas réserver votre audit gratuit ?"}
                  </p>
                  <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-post-download-book">
                    <Calendar size={16} />
                    {language === "en" ? "Book Your Free Audit" : "Réservez votre audit gratuit"}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How It Works / Funnel Steps */}
        <section className="py-24 bg-white" data-testid="section-how-it-works">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-6">
                {language === "en" ? "From checklist to clarity in 4 steps" : "De la liste à la clarté en 4 étapes"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {funnelSteps.map((step, i) => (
                <div key={i} className="relative" data-testid={`funnel-step-${i}`}>
                  <div className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-3xl border border-border p-8 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center font-bold text-lg mb-6">{step.step}</div>
                    <h3 className="text-lg font-bold text-primary mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                  {i < funnelSteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight size={20} className="text-accent/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-[#F8FAFC] border-t" data-testid="section-audit-final-cta">
          <div className="container mx-auto px-4 md:px-8">
            <div className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-[2rem] p-12 lg:p-20 text-center max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
                  {language === "en"
                    ? "Book your free Process & People Management Audit"
                    : "Réservez votre audit gratuit de processus et de gestion des personnes"}
                </h2>
                <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
                  {language === "en"
                    ? "In 20 minutes, you'll have a clear picture of what's slowing your organization down and exactly where to focus to improve performance, leadership, and operations."
                    : "En 20 minutes, vous aurez une image claire de ce qui ralentit votre organisation et de ce sur quoi vous concentrer pour améliorer la performance."}
                </p>
                <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-white hover:text-primary h-14 px-12 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105" data-testid="link-audit-final-book">
                  <Calendar size={16} />
                  {language === "en" ? "Schedule Your Free Audit" : "Planifiez votre audit gratuit"}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}