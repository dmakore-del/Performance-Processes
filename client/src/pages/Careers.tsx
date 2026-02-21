import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { useLanguage } from "@/hooks/use-language";
import { CheckCircle2, Upload, Loader2, CheckCircle, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={<>{language === "en" ? "Join Our" : "Rejoignez Notre"} <span className="text-accent italic">{language === "en" ? "Team" : "Équipe"}</span></>}
          subtitle={language === "en" 
            ? "Build a career aligning strategy with measurable impact."
            : "Construisez une carrière en alignant la stratégie sur un impact mesurable."}
        />
        
        <div className="container mx-auto px-4 md:px-8 py-20 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-xl space-y-8">
            <div className="border-b border-border pb-8">
              <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                Open Role
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-4">
                Business Development Consultant
              </h2>
              <div className="flex gap-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Remote / Flexible</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent"></div> Commission-Based</span>
              </div>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                We are seeking a results-driven Consultant to support business development and client acquisition efforts. This commission-based role is ideal for a motivated professional with strong networks, consultative selling skills, and a passion for helping organizations improve performance and strategic alignment.
              </p>
              <p>
                The Consultant will identify potential clients, initiate conversations with decision-makers, and represent our consulting services with professionalism and credibility. This role offers flexible engagement and uncapped earning potential based on successful client conversions.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Key Responsibilities</h3>
              <ul className="space-y-3">
                {[
                  "Identify and engage prospective clients aligned with our service offerings",
                  "Build relationships with organizational leaders and decision-makers",
                  "Present consulting solutions tailored to client needs",
                  "Facilitate introductions and initial strategy discussions",
                  "Support proposal follow-up and deal progression",
                  "Maintain a pipeline of qualified leads"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Ideal Candidate Profile</h3>
              <ul className="space-y-3">
                {[
                  "Strong professional network within corporate, nonprofit, or SME sectors",
                  "Experience in consulting, advisory services, or business development",
                  "Excellent communication and relationship-building skills",
                  "Self-motivated and target-driven",
                  "High level of professionalism and integrity"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Compensation Structure</h3>
              <p className="text-muted-foreground leading-relaxed">
                This is a commission-based role with earnings tied directly to closed consulting engagements. Commission percentages are competitive and structured to reward performance and long-term client relationships.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">What We Offer</h3>
              <ul className="space-y-3">
                {[
                  "Flexible, remote engagement",
                  "High-value consulting services with strong market demand",
                  "Uncapped commission potential",
                  "Opportunity to align with a performance-focused consulting brand"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground italic mt-6 border-l-4 border-accent pl-4 py-2 bg-secondary/30">
                This role is well-suited for independent consultants, industry professionals, or business advisors looking to expand their income through strategic referrals and client acquisition.
              </p>
            </div>

            <div className="pt-8 border-t border-border">
              <Button 
                className="w-full md:w-auto rounded-full bg-accent text-white hover:bg-primary h-14 px-10 font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-accent/20"
                onClick={() => setIsFormOpen(true)}
                data-testid="button-apply"
              >
                Apply for this role
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={isFormOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center gap-6">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-primary" data-testid="text-application-success">
                Application Submitted!
              </h3>
              <p className="text-muted-foreground max-w-sm">
                Thank you for your interest in joining Performance Processes. We'll review your application and get back to you soon.
              </p>
              <Button 
                onClick={handleClose} 
                variant="outline" 
                className="rounded-full px-8 mt-4"
                data-testid="button-close-success"
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-2xl font-bold text-primary uppercase italic">
                  Apply: Business Development Consultant
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Fields marked with <span className="text-red-500">*</span> are required
                </p>
              </DialogHeader>
              
              {mutation.isError && (
                <div className="mx-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium" data-testid="text-apply-error">
                  {mutation.error?.message || "Something went wrong. Please try again."}
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full bg-[#F8FAFC] border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent font-medium text-sm"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      data-testid="input-first-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full bg-[#F8FAFC] border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent font-medium text-sm"
                      placeholder="Last name"
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
                      className="w-full bg-[#F8FAFC] border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent font-medium text-sm"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      data-testid="input-apply-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-[#F8FAFC] border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent font-medium text-sm"
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
                    LinkedIn Profile
                  </label>
                  <input
                    className="w-full bg-[#F8FAFC] border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent font-medium text-sm"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    data-testid="input-linkedin"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                    Resume / CV <span className="text-red-500">*</span>
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
                      <FileText size={20} className="text-green-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-green-800 flex-1 truncate">{resumeFile.name}</span>
                      <button
                        type="button"
                        onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        className="text-green-600 hover:text-red-500 transition-colors"
                        data-testid="button-remove-resume"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-border rounded-xl px-5 py-8 flex flex-col items-center gap-3 hover:border-accent hover:bg-accent/5 transition-all cursor-pointer"
                      data-testid="button-upload-resume"
                    >
                      <Upload size={28} className="text-muted-foreground" />
                      <span className="text-sm font-bold text-muted-foreground">Click to upload your resume</span>
                      <span className="text-xs text-muted-foreground/60">PDF, DOC, or DOCX (max 10MB)</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                    Cover Letter
                  </label>
                  <textarea
                    className="w-full bg-[#F8FAFC] border border-border rounded-xl px-5 py-3.5 outline-none focus:border-accent font-medium text-sm h-32 resize-none"
                    placeholder="Tell us why you'd be a great fit..."
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
                  {mutation.isPending ? (
                    <><Loader2 size={18} className="animate-spin" /> Submitting...</>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
