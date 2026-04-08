import { useState, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import {
  ArrowRight, ArrowLeft, CheckCircle2, Target, Layers, Rocket,
  BarChart3, Building2, Briefcase, BookOpen, Calendar, TrendingUp
} from "lucide-react";

const BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

interface Question {
  id: string;
  text: string;
  category: "foundation" | "build" | "run";
  options: { label: string; value: number }[];
}

const QUESTIONS: Question[] = [
  { id: "f1", text: "Does your organization have a clearly defined mission, vision, and strategic direction?", category: "foundation", options: [{ label: "Yes, clearly documented and communicated", value: 3 }, { label: "Somewhat, but not fully formalized", value: 2 }, { label: "No, this is unclear or undefined", value: 1 }] },
  { id: "f2", text: "Are roles and responsibilities clearly defined across your team?", category: "foundation", options: [{ label: "Yes, every role has clear expectations", value: 3 }, { label: "Partially, some roles overlap or lack clarity", value: 2 }, { label: "No, roles are loosely defined", value: 1 }] },
  { id: "f3", text: "Do you have an organizational structure that supports growth and accountability?", category: "foundation", options: [{ label: "Yes, the structure is designed for scale", value: 3 }, { label: "Somewhat, but it has not been reviewed recently", value: 2 }, { label: "No, the structure is informal or reactive", value: 1 }] },
  { id: "f4", text: "Is your leadership team aligned on priorities and decision-making?", category: "foundation", options: [{ label: "Yes, we have regular alignment and clear decision rights", value: 3 }, { label: "Somewhat, but alignment varies by situation", value: 2 }, { label: "No, there are frequent disagreements or misalignment", value: 1 }] },
  { id: "f5", text: "Do you have Key Performance Indicators (KPIs) defined for each business function?", category: "foundation", options: [{ label: "Yes, KPIs are tracked and reviewed regularly", value: 3 }, { label: "Partially, some KPIs exist but are not consistently tracked", value: 2 }, { label: "No, we do not have formal KPIs", value: 1 }] },
  { id: "f6", text: "Is there a documented strategic plan that the team actively follows?", category: "foundation", options: [{ label: "Yes, we have a current plan with milestones", value: 3 }, { label: "We had one, but it is outdated or not actively used", value: 2 }, { label: "No, we operate without a formal plan", value: 1 }] },

  { id: "b1", text: "Are your core business processes documented and standardized?", category: "build", options: [{ label: "Yes, processes are documented and followed consistently", value: 3 }, { label: "Partially, some are documented but not all", value: 2 }, { label: "No, most processes are informal or ad hoc", value: 1 }] },
  { id: "b2", text: "Do you have a structured hiring and talent acquisition system?", category: "build", options: [{ label: "Yes, with defined stages, criteria, and tools", value: 3 }, { label: "Somewhat, but it is inconsistent", value: 2 }, { label: "No, hiring is reactive and unstructured", value: 1 }] },
  { id: "b3", text: "Is there a formal onboarding process for new employees?", category: "build", options: [{ label: "Yes, with structured onboarding plans and check-ins", value: 3 }, { label: "Partially, but it varies by role or manager", value: 2 }, { label: "No, onboarding is informal", value: 1 }] },
  { id: "b4", text: "Does your website effectively generate leads or convert visitors?", category: "build", options: [{ label: "Yes, it is optimized for conversions and lead capture", value: 3 }, { label: "Somewhat, but performance could improve", value: 2 }, { label: "No, it is mostly informational with no clear funnel", value: 1 }] },
  { id: "b5", text: "Do you have a marketing funnel or lead generation system in place?", category: "build", options: [{ label: "Yes, with clear stages from awareness to conversion", value: 3 }, { label: "Partially, but it is not fully built out", value: 2 }, { label: "No, lead generation is inconsistent", value: 1 }] },
  { id: "b6", text: "Are you using a CRM or lead tracking tool to manage prospects?", category: "build", options: [{ label: "Yes, actively used and up to date", value: 3 }, { label: "We have one but it is not consistently used", value: 2 }, { label: "No, we track leads manually or not at all", value: 1 }] },
  { id: "b7", text: "Do you have systems in place for employee performance reviews and feedback?", category: "build", options: [{ label: "Yes, regular reviews with clear frameworks", value: 3 }, { label: "Somewhat, but reviews are inconsistent", value: 2 }, { label: "No, there is no formal review process", value: 1 }] },

  { id: "r1", text: "Do you have accountability systems that ensure follow-through on commitments?", category: "run", options: [{ label: "Yes, with regular check-ins and tracking", value: 3 }, { label: "Somewhat, but accountability gaps exist", value: 2 }, { label: "No, follow-through is inconsistent", value: 1 }] },
  { id: "r2", text: "Is there a regular rhythm for reviewing KPIs and performance data?", category: "run", options: [{ label: "Yes, weekly or monthly reviews are standard", value: 3 }, { label: "Occasionally, but not on a consistent schedule", value: 2 }, { label: "No, data is rarely reviewed systematically", value: 1 }] },
  { id: "r3", text: "Does your team execute consistently against plans and deadlines?", category: "run", options: [{ label: "Yes, execution is reliable and predictable", value: 3 }, { label: "Somewhat, but delays and missed targets occur", value: 2 }, { label: "No, execution is unpredictable", value: 1 }] },
  { id: "r4", text: "Do you have systems for monitoring performance across departments or teams?", category: "run", options: [{ label: "Yes, dashboards or reports are reviewed regularly", value: 3 }, { label: "Partially, but visibility is limited", value: 2 }, { label: "No, performance is not tracked systematically", value: 1 }] },
  { id: "r5", text: "Is there a process for continuous improvement and optimization?", category: "run", options: [{ label: "Yes, we regularly identify and implement improvements", value: 3 }, { label: "Sometimes, but it is not a structured practice", value: 2 }, { label: "No, we rarely step back to optimize", value: 1 }] },
  { id: "r6", text: "Does your organization have a clear meeting cadence that drives execution?", category: "run", options: [{ label: "Yes, with structured agendas and action items", value: 3 }, { label: "We meet regularly but meetings lack structure", value: 2 }, { label: "No, meetings are infrequent or unproductive", value: 1 }] },
];

const CATEGORIES = {
  foundation: { label: "Foundation", icon: Target, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", description: "Business direction, structure, and alignment" },
  build: { label: "Build", icon: Layers, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", description: "Processes, systems, and infrastructure" },
  run: { label: "Run", icon: Rocket, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", description: "Execution, accountability, and optimization" },
};

type Step = "landing" | "foundation" | "build" | "run" | "capture" | "results";
const ASSESSMENT_STEPS: Step[] = ["landing", "foundation", "build", "run", "capture", "results"];

function getQuestionsByCategory(cat: "foundation" | "build" | "run") {
  return QUESTIONS.filter(q => q.category === cat);
}

function calculateScores(answers: Record<string, number>) {
  const catScores = { foundation: { total: 0, max: 0 }, build: { total: 0, max: 0 }, run: { total: 0, max: 0 } };
  for (const q of QUESTIONS) {
    const val = answers[q.id];
    const maxVal = Math.max(...q.options.map(o => o.value));
    catScores[q.category].max += maxVal;
    if (val !== undefined) catScores[q.category].total += val;
  }
  const foundationPct = Math.round((catScores.foundation.total / catScores.foundation.max) * 100);
  const buildPct = Math.round((catScores.build.total / catScores.build.max) * 100);
  const runPct = Math.round((catScores.run.total / catScores.run.max) * 100);
  const overallMax = catScores.foundation.max + catScores.build.max + catScores.run.max;
  const overallTotal = catScores.foundation.total + catScores.build.total + catScores.run.total;
  const totalPct = Math.round((overallTotal / overallMax) * 100);
  let scoreLabel = "Needs Structure";
  let recommendedPath = "playbooks";
  if (totalPct >= 71) { scoreLabel = "Growth Ready"; recommendedPath = "full-build"; }
  else if (totalPct >= 41) { scoreLabel = "Developing Systems"; recommendedPath = "guided"; }
  return { totalScore: totalPct, foundationScore: foundationPct, buildScore: buildPct, runScore: runPct, scoreLabel, recommendedPath };
}

function ScoreBar({ score, label, color }: { score: number; label: string; color: string }) {
  const barColor = score <= 40 ? "bg-red-500" : score <= 70 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-semibold ${color}`}>{label}</span>
        <span className="text-sm font-bold text-foreground">{score}%</span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-1000`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default function Assessment() {
  const [step, setStep] = useState<Step>("landing");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [contactInfo, setContactInfo] = useState({ firstName: "", email: "", organizationName: "", organizationType: "", roleTitle: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scores, setScores] = useState<ReturnType<typeof calculateScores> | null>(null);
  const { toast } = useToast();

  const stepIndex = ASSESSMENT_STEPS.indexOf(step);
  const totalSteps = ASSESSMENT_STEPS.length;

  const handleAnswer = useCallback((questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const getCurrentQuestions = () => {
    if (step === "foundation" || step === "build" || step === "run") return getQuestionsByCategory(step);
    return [];
  };

  const canProceed = () => {
    if (step === "landing") return true;
    if (step === "capture") return contactInfo.firstName.trim() && contactInfo.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email);
    const questions = getCurrentQuestions();
    return questions.every(q => answers[q.id] !== undefined);
  };

  const goNext = async () => {
    if (step === "capture") {
      await submitAssessment();
      return;
    }
    const idx = ASSESSMENT_STEPS.indexOf(step);
    if (idx < ASSESSMENT_STEPS.length - 1) setStep(ASSESSMENT_STEPS[idx + 1]);
  };

  const goBack = () => {
    const idx = ASSESSMENT_STEPS.indexOf(step);
    if (idx > 0) setStep(ASSESSMENT_STEPS[idx - 1]);
  };

  const submitAssessment = async () => {
    setIsSubmitting(true);
    const computed = calculateScores(answers);
    try {
      await apiRequest("POST", "/api/assessment", {
        ...contactInfo,
        ...computed,
        answers: JSON.stringify(answers),
      });
      setScores(computed);
      setStep("results");
      toast({ title: "Assessment submitted", description: "Your results are ready." });
    } catch (err: any) {
      toast({ title: "Submission failed", description: err?.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderLanding = () => (
    <div className="min-h-[70vh]">
      <section className="relative bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#0d2137] text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <BarChart3 className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white/90">Free Diagnostic Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight" data-testid="text-assessment-title">
            Growth Infrastructure Assessment
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-3xl mx-auto leading-relaxed">
            Assess the systems, structure, and performance gaps limiting your growth.
          </p>
          <p className="text-base text-white/60 mb-10 max-w-2xl mx-auto">
            Identify what is working, where the gaps are, and what your next step should be.
          </p>
          <Button
            onClick={() => setStep("foundation")}
            className="bg-accent hover:bg-accent/90 text-white px-10 py-6 text-lg font-bold rounded-full shadow-lg shadow-accent/30 uppercase tracking-wider"
            data-testid="button-start-assessment"
          >
            Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">What This Assessment Covers</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Three critical areas that determine whether your organization is set up for consistent growth.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {(["foundation", "build", "run"] as const).map(cat => {
              const c = CATEGORIES[cat];
              const Icon = c.icon;
              const questionCount = getQuestionsByCategory(cat).length;
              return (
                <div key={cat} className={`${c.bg} ${c.border} border rounded-2xl p-8 text-center`}>
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${c.bg} mb-4`}>
                    <Icon className={`w-7 h-7 ${c.color}`} />
                  </div>
                  <h3 className={`text-xl font-bold ${c.color} mb-2`}>{c.label}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{c.description}</p>
                  <span className="text-xs font-medium text-muted-foreground">{questionCount} questions</span>
                </div>
              );
            })}
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
              <p className="text-sm text-muted-foreground">Answer 19 diagnostic questions</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
              <p className="text-sm text-muted-foreground">Get your score and category breakdown</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
              <p className="text-sm text-muted-foreground">Receive a recommended next step</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderQuestionStep = (category: "foundation" | "build" | "run") => {
    const cat = CATEGORIES[category];
    const Icon = cat.icon;
    const questions = getQuestionsByCategory(category);
    const answeredCount = questions.filter(q => answers[q.id] !== undefined).length;

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1e3a5f]/5 to-background">
        <div className="bg-[#0a1628] py-8">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${cat.color}`} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{cat.label}</h2>
                <p className="text-sm text-white/60">{cat.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${((stepIndex - 1) / (totalSteps - 2)) * 100}%` }}
                />
              </div>
              <span className="text-sm text-white/60 whitespace-nowrap">
                Section {stepIndex} of 3 · {answeredCount}/{questions.length} answered
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-3xl py-10">
          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm" data-testid={`card-question-${q.id}`}>
                <div className="flex items-start gap-3 mb-5">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {idx + 1}
                  </span>
                  <p className="text-base font-medium text-foreground leading-relaxed">{q.text}</p>
                </div>
                <div className="space-y-3 ml-11">
                  {q.options.map(opt => {
                    const isSelected = answers[q.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleAnswer(q.id, opt.value)}
                        className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all duration-200 text-sm ${
                          isSelected
                            ? "border-accent bg-accent/5 text-foreground font-medium shadow-sm"
                            : "border-border hover:border-accent/40 hover:bg-accent/5 text-muted-foreground"
                        }`}
                        data-testid={`button-answer-${q.id}-${opt.value}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected ? "border-accent bg-accent" : "border-muted-foreground/30"
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          </div>
                          {opt.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-10 pb-10">
            <Button variant="outline" onClick={goBack} className="gap-2 rounded-full px-6" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button
              onClick={goNext}
              disabled={!canProceed()}
              className="bg-accent hover:bg-accent/90 text-white gap-2 rounded-full px-8 font-bold"
              data-testid="button-next"
            >
              {step === "run" ? "Enter Your Details" : "Next Section"} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderCapture = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1e3a5f]/5 to-background">
      <div className="bg-[#0a1628] py-8">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: "90%" }} />
            </div>
            <span className="text-sm text-white/60 whitespace-nowrap">Almost done</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-xl py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Assessment Complete</h2>
          <p className="text-muted-foreground">Enter your details below to see your results and receive a copy by email.</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-5">
          <div>
            <Label htmlFor="firstName" className="text-sm font-semibold text-foreground">First Name *</Label>
            <Input
              id="firstName"
              placeholder="Your first name"
              value={contactInfo.firstName}
              onChange={e => setContactInfo(prev => ({ ...prev, firstName: e.target.value }))}
              className="mt-1.5"
              data-testid="input-first-name"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={contactInfo.email}
              onChange={e => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              className="mt-1.5"
              data-testid="input-email"
            />
          </div>
          <div>
            <Label htmlFor="orgName" className="text-sm font-semibold text-foreground">Organization Name <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <Input
              id="orgName"
              placeholder="Your company or organization"
              value={contactInfo.organizationName}
              onChange={e => setContactInfo(prev => ({ ...prev, organizationName: e.target.value }))}
              className="mt-1.5"
              data-testid="input-org-name"
            />
          </div>
          <div>
            <Label htmlFor="orgType" className="text-sm font-semibold text-foreground">Organization Type <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <select
              id="orgType"
              value={contactInfo.organizationType}
              onChange={e => setContactInfo(prev => ({ ...prev, organizationType: e.target.value }))}
              className="w-full mt-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              data-testid="select-org-type"
            >
              <option value="">Select type</option>
              <option value="Professional / Solopreneur">Professional / Solopreneur</option>
              <option value="Small Business">Small Business</option>
              <option value="Nonprofit">Nonprofit</option>
              <option value="Growing Organization">Growing Organization</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor="roleTitle" className="text-sm font-semibold text-foreground">Your Role/Title <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <Input
              id="roleTitle"
              placeholder="e.g. CEO, Operations Manager"
              value={contactInfo.roleTitle}
              onChange={e => setContactInfo(prev => ({ ...prev, roleTitle: e.target.value }))}
              className="mt-1.5"
              data-testid="input-role-title"
            />
          </div>

          <div className="pt-3">
            <Button
              onClick={goNext}
              disabled={!canProceed() || isSubmitting}
              className="w-full bg-accent hover:bg-accent/90 text-white py-6 text-base font-bold rounded-full shadow-lg uppercase tracking-wider"
              data-testid="button-submit-assessment"
            >
              {isSubmitting ? "Submitting..." : "See My Results"}
            </Button>
          </div>
        </div>

        <div className="text-center mt-6">
          <button onClick={goBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="button-back-capture">
            <ArrowLeft className="w-3 h-3 inline mr-1" /> Go back to questions
          </button>
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    if (!scores) return null;
    const { totalScore, foundationScore, buildScore, runScore, scoreLabel, recommendedPath } = scores;
    const scoreColor = totalScore <= 40 ? "text-red-500" : totalScore <= 70 ? "text-amber-500" : "text-emerald-500";
    const scoreBg = totalScore <= 40 ? "bg-red-50" : totalScore <= 70 ? "bg-amber-50" : "bg-emerald-50";

    const interpretations: Record<string, string> = {
      "Needs Structure": "Your organization may be operating without the systems needed for consistent execution. Clarifying structure, process, and accountability should be the first priority.",
      "Developing Systems": "You have some important systems in place, but there are still gaps affecting consistency, efficiency, and growth. Focused implementation can strengthen execution.",
      "Growth Ready": "You have a solid base for growth, with systems already in place. The next opportunity is to optimize performance, alignment, and long-term scalability.",
    };

    const gapAreas: string[] = [];
    if (foundationScore <= 50) gapAreas.push("Business direction, role clarity, and KPI setup");
    if (buildScore <= 50) gapAreas.push("Process documentation, hiring systems, and marketing funnels");
    if (runScore <= 50) gapAreas.push("Accountability, performance monitoring, and continuous improvement");
    if (gapAreas.length === 0 && totalScore < 100) {
      if (foundationScore < buildScore && foundationScore < runScore) gapAreas.push("Foundation systems could be further strengthened");
      else if (buildScore < runScore) gapAreas.push("Build systems could be further developed");
      else gapAreas.push("Run systems have room for optimization");
    }

    return (
      <div className="min-h-screen bg-background">
        <section className="bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#0d2137] text-white py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-white/90">Assessment Complete</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-results-title">Your Growth Infrastructure Score</h1>
            <div className={`inline-flex items-center gap-4 ${scoreBg} rounded-2xl px-10 py-6 mt-4`}>
              <span className={`text-6xl md:text-7xl font-black ${scoreColor}`} data-testid="text-total-score">{totalScore}</span>
              <div className="text-left">
                <span className="text-sm text-muted-foreground">/100</span>
                <p className={`text-lg font-bold ${scoreColor}`} data-testid="text-score-label">{scoreLabel}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-4xl py-12">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 mb-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-4">What This Means</h2>
            <p className="text-muted-foreground leading-relaxed">{interpretations[scoreLabel]}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 mb-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6">Category Breakdown</h2>
            <div className="space-y-6">
              <ScoreBar score={foundationScore} label="Foundation" color="text-blue-600" />
              <ScoreBar score={buildScore} label="Build" color="text-purple-600" />
              <ScoreBar score={runScore} label="Run" color="text-emerald-600" />
            </div>
          </div>

          {gapAreas.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10 mb-8 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-4">Key Gap Areas</h2>
              <ul className="space-y-3">
                {gapAreas.map((g, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-accent/20 rounded-2xl p-8 md:p-10 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Recommended Next Step</h2>
            {recommendedPath === "playbooks" && (
              <>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We recommend starting with our Playbooks or Training Programs. Playbooks give you self-paced frameworks, while Training Programs provide structured, guided learning to help you and your team implement real systems together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/playbooks" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-all font-bold px-8 py-3 uppercase tracking-wider text-sm" data-testid="link-cta-playbooks">
                    <BookOpen className="w-4 h-4" /> Explore Playbooks
                  </Link>
                  <Link href="/training" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all font-bold px-8 py-3 uppercase tracking-wider text-sm" data-testid="link-cta-training">
                    <TrendingUp className="w-4 h-4" /> Explore Training Programs
                  </Link>
                </div>
              </>
            )}
            {recommendedPath === "guided" && (
              <>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We recommend Guided Implementation, where our team works alongside yours to close the gaps identified in this assessment. Focused sprints can rapidly strengthen your systems and execution.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/solutions" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-all font-bold px-8 py-3 uppercase tracking-wider text-sm" data-testid="link-cta-guided">
                    <Briefcase className="w-4 h-4" /> Explore Guided Implementation
                  </Link>
                  <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all font-bold px-8 py-3 uppercase tracking-wider text-sm" data-testid="link-cta-strategy-call">
                    <Calendar className="w-4 h-4" /> Book a Strategy Call
                  </a>
                </div>
              </>
            )}
            {recommendedPath === "full-build" && (
              <>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Your organization is well positioned for a Full System Build engagement. We can help you optimize and scale with comprehensive, hands-on support across your entire growth infrastructure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-all font-bold px-8 py-3 uppercase tracking-wider text-sm" data-testid="link-cta-strategy-call">
                    <Calendar className="w-4 h-4" /> Book a Strategy Call
                  </a>
                  <Link href="/solutions" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all font-bold px-8 py-3 uppercase tracking-wider text-sm" data-testid="link-cta-full-build">
                    <Building2 className="w-4 h-4" /> Learn About Full System Build
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm">
            <p className="text-sm text-muted-foreground mb-2">
              A copy of your results will be sent to <strong>{contactInfo.email}</strong> within 2 to 5 business days.
            </p>
            <p className="text-sm text-muted-foreground">
              Questions? Contact us at{" "}
              <a href="mailto:contact@performanceprocesses.com" className="text-accent hover:underline">contact@performanceprocesses.com</a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const showNavFooter = step === "landing" || step === "results";

  return (
    <div className="min-h-screen flex flex-col">
      {showNavFooter && <Navbar />}
      <main className="flex-1">
        {step === "landing" && renderLanding()}
        {(step === "foundation" || step === "build" || step === "run") && renderQuestionStep(step)}
        {step === "capture" && renderCapture()}
        {step === "results" && renderResults()}
      </main>
      {showNavFooter && <Footer />}
    </div>
  );
}
