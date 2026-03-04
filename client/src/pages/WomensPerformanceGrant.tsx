import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/layout/PageHero";
import {
  Heart, Target, Users, Calendar, CheckCircle2, ArrowRight,
  Sparkles, TrendingUp, Award, Send, Loader2, Star
} from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function WomensPerformanceGrant() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    occupation: "",
    goals: "",
    challenges: "",
    hopeToAchieve: "",
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof form) => {
      const message = [
        `[WOMEN'S PERFORMANCE GRANT APPLICATION]`,
        ``,
        `Full Name: ${data.fullName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Occupation/Role: ${data.occupation}`,
        ``,
        `--- Goals ---`,
        data.goals,
        ``,
        `--- Current Challenges ---`,
        data.challenges,
        ``,
        `--- What They Hope to Achieve ---`,
        data.hopeToAchieve,
      ].join("\n");

      const res = await apiRequest("POST", "/api/contact", {
        name: data.fullName,
        email: data.email,
        message,
      });
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({ title: "Application submitted!", description: "Thank you for applying. We'll be in touch soon." });
    },
    onError: (error: Error) => {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(form);
  };

  const grantIncludes = [
    "3 months of Performance Coaching",
    "Performance Systems Setup (goal tracking, accountability structure)",
    "Monthly strategy sessions",
    "Performance planning framework",
  ];

  const focusAreas = [
    { label: "Leadership Development", icon: <Award size={20} /> },
    { label: "Business Growth", icon: <TrendingUp size={20} /> },
    { label: "Career Advancement", icon: <ArrowRight size={20} /> },
    { label: "Productivity & Focus", icon: <Target size={20} /> },
    { label: "Strategic Goal Execution", icon: <Sparkles size={20} /> },
  ];

  const whoShouldApply = [
    "Entrepreneurs or small business owners",
    "Professionals seeking career growth",
    "Leaders managing teams or projects",
    "Individuals working toward meaningful goals",
  ];

  const timeline = [
    { label: "Recipients", value: "3-5 women" },
    { label: "Program Duration", value: "3 months" },
    { label: "Application Deadline", value: "March 31" },
    { label: "Recipients Announced", value: "Early April" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <PageHero
          title={<>Women's <span className="text-accent">Performance</span> Grant</>}
          subtitle="Supporting women who are building businesses, advancing careers, and leading teams with professional coaching and performance systems."
        />

        <section className="py-20 bg-white" data-testid="section-grant-overview">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Heart className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">International Women's Month Initiative</p>
                  <h2 className="text-2xl font-heading font-extrabold text-primary">Initiative Overview</h2>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                In recognition of International Women's Month, Performance Processes is launching a Women's Performance Grant to support women who are building businesses, advancing their careers, or leading teams. The grant will provide professional coaching and performance systems support to help recipients turn their goals into measurable results.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-border" data-testid="card-grant-includes">
                  <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                    <Star className="text-accent" size={20} />
                    What the Grant Includes
                  </h3>
                  <ul className="space-y-3">
                    {grantIncludes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-primary font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-border" data-testid="card-focus-areas">
                  <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                    <Target className="text-accent" size={20} />
                    Focus Areas
                  </h3>
                  <div className="space-y-3">
                    {focusAreas.map((area, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-border">
                        <span className="text-accent">{area.icon}</span>
                        <span className="text-sm font-bold text-primary">{area.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20" data-testid="section-who-should-apply">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Eligibility</p>
                  <h2 className="text-3xl font-heading font-extrabold text-primary mb-6">Who Should Apply</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    This grant is intended for women who are driven, committed to growth, and ready to build the systems that support sustainable success.
                  </p>
                  <ul className="space-y-4">
                    {whoShouldApply.map((item, i) => (
                      <li key={i} className="flex items-center gap-3" data-testid={`eligibility-item-${i}`}>
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={16} className="text-accent" />
                        </div>
                        <span className="text-primary font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground mt-6 italic">
                    Applicants should demonstrate ambition, commitment to growth, and a desire to improve their performance systems.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 text-white" data-testid="card-grant-structure">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Calendar className="text-accent" size={22} />
                    Grant Structure
                  </h3>
                  <div className="space-y-4">
                    {timeline.map((item, i) => (
                      <div key={i} className="flex justify-between items-center bg-white/10 rounded-xl px-5 py-4" data-testid={`timeline-item-${i}`}>
                        <span className="text-sm font-medium text-white/80">{item.label}</span>
                        <span className="font-bold text-accent">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-accent/5 border-y border-accent/10" data-testid="section-why-matters">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="text-accent mx-auto mb-4" size={32} />
              <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-primary mb-4">Why This Matters</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Many talented women have clear goals but lack structured systems, accountability, and strategic support. The Women's Performance Grant is designed to help bridge that gap by providing tools and guidance that support sustainable growth and leadership development.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white" data-testid="section-application-form" id="apply">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Apply Now</p>
                <h2 className="text-3xl font-heading font-extrabold text-primary mb-4">Grant Application</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Complete the form below to apply for the Women's Performance Grant. Selected recipients will be contacted in early April.
                </p>
              </div>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center" data-testid="grant-application-success">
                  <CheckCircle2 className="text-green-500 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-primary mb-2">Application Submitted!</h3>
                  <p className="text-muted-foreground">
                    Thank you for applying to the Women's Performance Grant. We'll review your application and contact you by early April.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-grant-application">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="grant-name">Full Name</Label>
                      <Input
                        id="grant-name"
                        data-testid="input-grant-name"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="grant-email">Email Address</Label>
                      <Input
                        id="grant-email"
                        type="email"
                        data-testid="input-grant-email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="grant-phone">Phone Number</Label>
                      <Input
                        id="grant-phone"
                        data-testid="input-grant-phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="grant-occupation">Occupation / Role</Label>
                      <Input
                        id="grant-occupation"
                        data-testid="input-grant-occupation"
                        value={form.occupation}
                        onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                        placeholder="e.g. Entrepreneur, Manager, Freelancer"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="grant-goals">What are your goals?</Label>
                    <Textarea
                      id="grant-goals"
                      data-testid="input-grant-goals"
                      value={form.goals}
                      onChange={(e) => setForm({ ...form, goals: e.target.value })}
                      placeholder="Describe your professional or business goals..."
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="grant-challenges">What are your current challenges?</Label>
                    <Textarea
                      id="grant-challenges"
                      data-testid="input-grant-challenges"
                      value={form.challenges}
                      onChange={(e) => setForm({ ...form, challenges: e.target.value })}
                      placeholder="What obstacles are you facing right now?"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="grant-achieve">What do you hope to achieve through this program?</Label>
                    <Textarea
                      id="grant-achieve"
                      data-testid="input-grant-achieve"
                      value={form.hopeToAchieve}
                      onChange={(e) => setForm({ ...form, hopeToAchieve: e.target.value })}
                      placeholder="What outcomes are you looking for?"
                      rows={4}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="w-full rounded-full bg-accent text-white hover:bg-primary h-14 text-lg font-bold uppercase tracking-widest"
                    data-testid="button-submit-grant"
                  >
                    {submitMutation.isPending ? (
                      <><Loader2 size={20} className="animate-spin mr-2" /> Submitting...</>
                    ) : (
                      <><Send size={18} className="mr-2" /> Submit Application</>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Application deadline: March 31. Recipients will be announced in early April.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
