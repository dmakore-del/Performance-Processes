import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, TrendingUp, Users, Target, Quote, Shield, Lightbulb, Handshake, Star, Award, Heart, BookOpen, GraduationCap, Globe, Clock, Milestone, Rocket, Building } from "lucide-react";
import founderImage from "@/assets/founder.png";
import seanImage from "@/assets/ChatGPT_Image_Feb_20,_2026,_04_07_16_PM_1771621735605.png";
import collaborationImg from "@assets/stock_images/collaboration.jpg";
import trainingImg from "@assets/stock_images/training.jpg";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";

import { PageHero } from "@/components/layout/PageHero";

export default function About() {
  const { t } = useLanguage();

  const timelineItems = [
    { year: "2026", title: "Performance Processes Founded", description: "Danai Makore launches Performance Processes with a vision to help organizations align strategy with measurable performance.", icon: <Rocket className="text-accent" size={20} /> },
    { year: "2026", title: "Core Team Assembled", description: "Sean Ogbonnaya joins as Director of Business Development, bringing expertise in relationship development and strategic advisory to strengthen the leadership team.", icon: <Users className="text-accent" size={20} /> },
    { year: "2026", title: "Service Portfolio Launch", description: "Launching a comprehensive suite of consulting services spanning strategic planning, performance management, governance advisory, and digital transformation.", icon: <Building className="text-accent" size={20} /> },
    { year: "2026–2027", title: "Building Multi-Industry Expertise", description: "Targeting engagements across government, nonprofit, healthcare, financial services, and technology sectors with tailored, sector-specific solutions.", icon: <Globe className="text-accent" size={20} /> },
    { year: "2027", title: "National Expansion", description: "Growing our footprint beyond Toronto to serve organizations across Canada, expanding our network of consultants and deepening our regional expertise.", icon: <Target className="text-accent" size={20} /> },
    { year: "2028+", title: "Scaling Impact", description: "Establishing Performance Processes as a leading Canadian consultancy, expanding into international markets, and building a platform for knowledge-sharing and thought leadership.", icon: <Milestone className="text-accent" size={20} /> },
  ];

  const values = [
    { icon: <Shield className="text-accent" size={28} />, title: "Integrity", description: "We operate with unwavering honesty and transparency. Every recommendation we make is grounded in what's truly best for our clients, not what's easiest or most profitable. Our reputation is built on trust, and we protect it fiercely." },
    { icon: <Star className="text-accent" size={28} />, title: "Excellence", description: "We pursue the highest standards in everything we do, from the quality of our research and analysis to the clarity of our deliverables. Mediocrity is never an option when organizations depend on our guidance for critical decisions." },
    { icon: <Handshake className="text-accent" size={28} />, title: "Collaboration", description: "We believe the best solutions emerge from partnership. We work alongside our clients, not above them, combining our expertise with their deep organizational knowledge to create strategies that truly fit." },
    { icon: <Lightbulb className="text-accent" size={28} />, title: "Innovation", description: "We continuously evolve our methodologies and embrace new frameworks, technologies, and approaches. The business landscape changes rapidly, and our clients deserve advisors who stay ahead of the curve." },
    { icon: <TrendingUp className="text-accent" size={28} />, title: "Impact", description: "Every engagement must produce measurable, meaningful results. We don't measure success by hours billed, we measure it by the tangible improvements our clients experience in their operations, culture, and bottom line." },
    { icon: <Award className="text-accent" size={28} />, title: "Accountability", description: "We hold ourselves to the same high standards we help our clients achieve. We set clear expectations, track our commitments, and take responsibility for the outcomes of our work." },
  ];

  const competitiveAdvantages = [
    { title: "People-Centered Approach", description: "We prioritize the human element in every engagement, understanding that sustainable change requires buy-in, trust, and genuine connection." },
    { title: "Measurable Outcomes", description: "Every project includes clear KPIs and success metrics. We don't leave results to chance, we track, measure, and report on impact." },
    { title: "Cross-Industry Expertise", description: "Our team brings diverse experience across sectors, allowing us to apply proven best practices and innovative solutions from multiple industries." },
    { title: "End-to-End Partnership", description: "From initial discovery through implementation and beyond, we stay engaged to ensure strategies translate into real-world performance improvements." },
    { title: "Tailored Solutions", description: "No cookie-cutter frameworks. Every engagement is custom-designed to address your organization's specific challenges, culture, and goals." },
    { title: "Knowledge Transfer", description: "We build internal capacity so your team can sustain improvements long after our engagement ends. We teach, coach, and empower." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          title={<>{t("nav.about")} <span className="text-accent italic">Performance Processes</span></>}
          subtitle={t("hero.subtitle")}
        />

        <section className="py-24 bg-white border-b">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-8">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10 italic border-l-4 border-accent pl-8">
                  "To empower organizations to reach their full potential by aligning strategic direction with measurable performance systems."
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We support leaders in clarifying strategic direction, strengthening leadership capability, and optimizing performance systems that connect goals with execution. Our collaborative, results-focused approach ensures sustainable performance improvements that drive clarity, accountability, and long-term impact.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "Founded", val: "2026", icon: <Target className="text-accent" /> },
                  { label: "Expert Consultants", val: "3+", icon: <Users className="text-accent" /> },
                  { label: "Service Categories", val: "6+", icon: <CheckCircle2 className="text-accent" /> },
                  { label: "Industries Served", val: "8+", icon: <TrendingUp className="text-accent" /> }
                ].map((s, i) => (
                  <div key={i} className="bg-[#F8FAFC] p-8 rounded-2xl border border-border flex flex-col items-center text-center" data-testid={`stat-card-${i}`}>
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">{s.icon}</div>
                    <div className="text-3xl font-black text-primary mb-1">{s.val}</div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#F8FAFC] border-b" data-testid="section-timeline">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                Our Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                Our Story & <span className="text-accent italic">Milestones</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From a bold vision to a growing consultancy, here's how Performance Processes has evolved to serve organizations across industries.
              </p>
            </div>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/20 -translate-x-1/2"></div>
              {timelineItems.map((item, i) => (
                <div key={i} className={`relative flex items-start mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`} data-testid={`timeline-item-${i}`}>
                  <div className="hidden md:block md:w-1/2"></div>
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-accent flex items-center justify-center z-10 shadow-md">
                    {item.icon}
                  </div>
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{item.year}</div>
                      <h3 className="text-xl font-heading font-extrabold text-primary mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white border-b" data-testid="section-values">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                What Drives Us
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                Our Core <span className="text-accent italic">Values</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                These principles guide every decision we make, every engagement we lead, and every relationship we build.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {values.map((value, i) => (
                <div key={i} className="bg-[#F8FAFC] p-8 rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg transition-all group" data-testid={`value-card-${i}`}>
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-heading font-extrabold text-primary mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#F8FAFC] border-b" data-testid="section-what-sets-us-apart">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent/20 rounded-2xl -z-10"></div>
                <img
                  src={collaborationImg}
                  alt="Team collaboration at Performance Processes"
                  className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[4/3]"
                  data-testid="img-collaboration"
                />
              </div>
              <div>
                <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                  Our Difference
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  What Sets Us <span className="text-accent italic">Apart</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  In a crowded consulting landscape, Performance Processes stands out through our unwavering commitment to partnership, measurable impact, and genuine care for our clients' long-term success.
                </p>
                <div className="space-y-5">
                  {competitiveAdvantages.map((adv, i) => (
                    <div key={i} className="flex gap-4" data-testid={`advantage-${i}`}>
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="text-accent" size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary mb-1">{adv.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-2/5 relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-accent/20 rounded-2xl -z-10 translate-x-4 translate-y-4"></div>
                <img 
                  src={founderImage} 
                  alt="Danai Makore - Principal Consultant at Performance Processes" 
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl border border-border hidden md:block max-w-[280px]">
                  <Quote className="text-accent mb-4" size={32} fill="currentColor" fillOpacity={0.1} />
                  <p className="text-primary font-bold italic text-lg leading-tight mb-2">
                    "To help people build organizations that truly change lives."
                  </p>
                  <p className="text-accent font-black text-[10px] uppercase tracking-widest">— Danai Makore</p>
                </div>
              </div>
              <div className="lg:w-3/5">
                <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                  Principal Consultant
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-8 leading-tight">
                  Danai <span className="text-accent italic">Makore</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Danai Makore is a people-centered leader, strategist, and consultant whose work spans nonprofit leadership, financial services, and mental health advocacy.
                  </p>
                  <p>
                    With academic training in Psychology and Human Resource Management and a deep commitment to equity, access, and sustainable impact, Danai founded Performance Processes to help visionaries, entrepreneurs, and organizations transform meaningful ideas into strong, lasting institutions.
                  </p>
                  <p>
                    Her approach blends human insight with practical systems, guiding clients from business formation and strategic development to performance management and long-term growth.
                  </p>
                  <p className="font-medium text-primary italic">
                    Grounded in purpose and driven by results, Danai's mission is simple, "to help people build organizations that truly change lives."
                  </p>
                </div>
                <div className="mt-12 flex flex-wrap gap-4 items-center">
                  <a href="https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer">
                    <Button className="rounded-full bg-accent text-white hover:bg-primary h-14 px-8 font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-accent/20" data-testid="button-schedule-consultation">
                      Schedule Consultation
                    </Button>
                  </a>
                  <a href="https://danaimakore.com" target="_blank" rel="noopener noreferrer">
                    <Button className="rounded-full bg-primary text-white hover:bg-accent h-14 px-8 font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-primary/20" data-testid="button-learn-founder">
                      Learn More About Danai
                    </Button>
                  </a>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-border shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm font-bold text-primary">Strategist</span>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-border shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm font-bold text-primary">Leader</span>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-border shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm font-bold text-primary">Consultant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white border-t border-border">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                Our Team
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                Leadership
              </h2>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start max-w-6xl mx-auto">
              <div className="lg:w-1/3">
                <div className="relative">
                  <div className="absolute top-4 -right-4 w-full h-full border-2 border-accent/20 rounded-2xl -z-10"></div>
                  <img 
                    src={seanImage} 
                    alt="Sean Ogbonnaya - Director of Business Development" 
                    className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[3/4]"
                  />
                </div>
              </div>
              <div className="lg:w-2/3">
                <h3 className="text-3xl font-heading font-extrabold text-primary mb-2">
                  Sean <span className="text-accent italic">Ogbonnaya</span>
                </h3>
                <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
                  Director of Business Development
                </div>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Sean Ogbonnaya serves as the Director of Business Development at Performance Processes, where he leads strategic growth initiatives and builds lasting partnerships with organizations committed to operational excellence.
                  </p>
                  <p>
                    With a strong background in relationship development and strategic advisory, Sean specializes in identifying opportunities to help businesses streamline operations, strengthen accountability, and improve performance outcomes. He works closely with executive teams to understand their challenges, align solutions with business objectives, and ensure engagements deliver measurable impact.
                  </p>
                  <p>
                    Sean is known for his consultative approach, prioritizing trust, clarity, and long-term value over transactional growth. His ability to connect strategic vision with practical execution makes him a key driver of Performance Processes' expanding client relationships and market presence.
                  </p>
                  <p className="font-medium text-primary italic border-l-4 border-accent pl-6 py-2 bg-[#F8FAFC]">
                    Passionate about helping organizations unlock their full potential, Sean is committed to fostering partnerships that create sustainable improvement and long-term success.
                  </p>
                </div>
                
                <div className="mt-10 flex flex-wrap gap-4 items-center">
                  <a href="https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer">
                    <Button className="rounded-full bg-accent text-white hover:bg-primary h-14 px-8 font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-accent/20">
                      Schedule Consultation
                    </Button>
                  </a>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-3 px-6 py-3 bg-[#F8FAFC] rounded-xl border border-border">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">Relationship Development</span>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 bg-[#F8FAFC] rounded-xl border border-border">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">Strategic Advisory</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white border-t border-border" data-testid="section-community">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                  Giving Back
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  Community <span className="text-accent italic">Involvement</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    At Performance Processes, we believe that business excellence and community responsibility go hand in hand. We're committed to using our expertise to create positive change beyond the boardroom.
                  </p>
                  <p>
                    Through pro-bono consulting engagements, we support emerging nonprofits and social enterprises that lack the resources to access professional strategic guidance. We've helped grassroots organizations develop governance frameworks, build operational capacity, and create sustainable growth plans.
                  </p>
                  <p>
                    Our mentorship programs connect aspiring consultants and young professionals with experienced leaders, providing career guidance, skill development, and real-world project exposure. We believe in investing in the next generation of strategic thinkers and change-makers.
                  </p>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-primary mb-4">Sponsor Pro-Bono Consulting</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Your sponsorship directly funds consulting engagements for nonprofits and social enterprises that lack the resources for professional strategic guidance.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { tier: "supporter", name: "Supporter", price: "$150", desc: "1 hour of pro-bono consulting" },
                      { tier: "champion", name: "Champion", price: "$500", desc: "Half-day engagement" },
                      { tier: "catalyst", name: "Catalyst", price: "$1,500", desc: "Full consulting project" },
                    ].map((t) => (
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
                              alert("Unable to start checkout. Please try again later.");
                            }
                          } catch (err) {
                            console.error("Sponsor checkout error:", err);
                            alert("Something went wrong. Please try again later.");
                          }
                        }}
                        className="bg-white p-5 rounded-xl border-2 border-border hover:border-accent hover:shadow-lg transition-all text-center group cursor-pointer"
                        data-testid={`button-sponsor-${t.tier}`}
                      >
                        <div className="text-2xl font-black text-primary group-hover:text-accent transition-colors mb-1">{t.price}</div>
                        <div className="text-sm font-bold text-primary mb-1">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full border-2 border-accent/20 rounded-2xl -z-10"></div>
                <img
                  src={trainingImg}
                  alt="Performance Processes community engagement and training"
                  className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[4/3]"
                  data-testid="img-community"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#F8FAFC] border-t border-border" data-testid="section-partnerships">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div>
                <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                  How We Work Together
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6">
                  Our Approach to <span className="text-accent italic">Partnerships</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    We don't believe in one-size-fits-all consulting. Every client relationship begins with deep listening and understanding, because meaningful change starts with trust and mutual respect.
                  </p>
                  <p>
                    Our partnership model is built on three pillars: transparency, co-creation, and accountability. We share our thinking openly, develop strategies collaboratively with your team, and hold ourselves responsible for delivering results that matter to your organization.
                  </p>
                  <p>
                    From the first discovery conversation to final implementation, we embed ourselves within your team as a trusted extension of your leadership. We celebrate your wins, navigate challenges alongside you, and ensure that the strategies we develop together become part of your organization's DNA.
                  </p>
                  <p className="font-medium text-primary italic">
                    Our goal isn't just to deliver a project, it's to build a lasting relationship that drives continuous improvement and enduring success.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl border border-border shadow-sm">
                    <Clock className="text-accent" size={16} />
                    <span className="text-sm font-bold text-primary">Long-Term Focus</span>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl border border-border shadow-sm">
                    <Handshake className="text-accent" size={16} />
                    <span className="text-sm font-bold text-primary">Co-Creation</span>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl border border-border shadow-sm">
                    <Shield className="text-accent" size={16} />
                    <span className="text-sm font-bold text-primary">Trust-Based</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}