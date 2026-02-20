import { PortalLayout } from "@/components/layout/PortalLayout";
import { BookOpen, PlayCircle, Download, ExternalLink } from "lucide-react";

export default function Resources() {
  const resources = [
    { title: "Leadership Communication Guide", type: "PDF Guide", icon: <BookOpen size={24} className="text-blue-500" /> },
    { title: "Effective 1-on-1s Framework", type: "Template", icon: <Download size={24} className="text-green-500" /> },
    { title: "Managing Change Resistance", type: "Video Masterclass", icon: <PlayCircle size={24} className="text-red-500" /> },
    { title: "Annual Planning Checklist", type: "Checklist", icon: <BookOpen size={24} className="text-orange-500" /> },
    { title: "Strategy Execution Toolkit", type: "Toolkit", icon: <ExternalLink size={24} className="text-purple-500" /> },
    { title: "Navigating Difficult Conversations", type: "PDF Guide", icon: <BookOpen size={24} className="text-blue-500" /> },
  ];

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2">Resource Library</h1>
          <p className="text-lg text-muted-foreground">Exclusive educational materials, templates, and guides to support your growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-all group flex flex-col justify-between min-h-[200px] cursor-pointer">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 border border-border">
                  {res.icon}
                </div>
                <h3 className="font-bold text-primary text-lg leading-tight mb-2 group-hover:text-accent transition-colors">{res.title}</h3>
                <span className="inline-block bg-secondary text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-border">
                  {res.type}
                </span>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                Access Resource
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary text-white p-10 rounded-3xl shadow-xl mt-12 text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
           <h3 className="text-2xl font-bold mb-4 relative z-10">Looking for something specific?</h3>
           <p className="text-primary-foreground/80 mb-6 relative z-10 max-w-xl mx-auto">Our consultants can curate specific resources or templates based on your current organizational challenges.</p>
           <button className="relative z-10 bg-accent hover:bg-white hover:text-primary text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full transition-all">
             Request a Resource
           </button>
        </div>
      </div>
    </PortalLayout>
  );
}