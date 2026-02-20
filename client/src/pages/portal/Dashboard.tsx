import { PortalLayout } from "@/components/layout/PortalLayout";
import { CheckCircle2, Clock, AlertCircle, FileText, Calendar, ArrowRight } from "lucide-react";

export default function Dashboard() {
  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary">Welcome back, John</h1>
            <p className="text-lg text-muted-foreground mt-2">Here is the latest overview of your consulting engagement.</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-border shadow-sm">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-bold text-sm uppercase tracking-wider text-primary">Project Status: On Track</span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-3xl font-black text-primary mb-1">32%</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Overall Completion</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-3xl font-black text-primary mb-1">2</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Upcoming Milestones</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-3xl font-black text-primary mb-1">1</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Action Required</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Updates */}
          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
            <h3 className="text-xl font-bold text-primary mb-6">Recent Updates</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-bold text-primary">Stakeholder Interviews Completed</p>
                  <p className="text-sm text-muted-foreground mt-1">We have concluded all 12 stakeholder interviews. Findings are being compiled.</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-3">2 Days Ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-bold text-primary">Strategic Framework Draft Uploaded</p>
                  <p className="text-sm text-muted-foreground mt-1">Initial draft of the strategic framework is available for your review.</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-3">4 Days Ago</p>
                </div>
              </div>
            </div>
            <button className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">
              View all updates <ArrowRight size={16} className="ml-2" />
            </button>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
            <h3 className="text-xl font-bold text-primary mb-6">Upcoming Schedule</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-transparent hover:border-border transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white flex flex-col items-center justify-center shadow-sm flex-shrink-0">
                  <span className="text-[10px] font-bold uppercase text-accent leading-none mb-1">OCT</span>
                  <span className="text-lg font-black text-primary leading-none">12</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-primary">Strategy Review Session</p>
                  <p className="text-sm text-muted-foreground">10:00 AM - 11:30 AM EST • Zoom</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-transparent hover:border-border transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white flex flex-col items-center justify-center shadow-sm flex-shrink-0">
                  <span className="text-[10px] font-bold uppercase text-accent leading-none mb-1">OCT</span>
                  <span className="text-lg font-black text-primary leading-none">15</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-primary">Milestone 2 Sign-off</p>
                  <p className="text-sm text-muted-foreground">Due by 5:00 PM EST</p>
                </div>
              </div>
            </div>
            <button className="mt-6 flex items-center text-sm font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">
              View full calendar <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>

        {/* Quick Links to Documents */}
        <div className="bg-primary text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <h3 className="text-2xl font-bold mb-8 relative z-10">Recent Deliverables</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
            <a href="#" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors border border-white/10">
              <FileText size={24} className="text-accent" />
              <div>
                <p className="font-bold text-sm line-clamp-1">Assessment Report v1.pdf</p>
                <p className="text-[10px] uppercase tracking-widest opacity-70 mt-1">2.4 MB</p>
              </div>
            </a>
            <a href="#" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors border border-white/10">
              <FileText size={24} className="text-accent" />
              <div>
                <p className="font-bold text-sm line-clamp-1">Interview Synthesis.docx</p>
                <p className="text-[10px] uppercase tracking-widest opacity-70 mt-1">1.1 MB</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}