import { PortalLayout } from "@/components/layout/PortalLayout";
import { Video, Calendar as CalendarIcon, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Meetings() {
  const upcomingMeetings = [
    { title: "Strategy Review Session", date: "Oct 12, 2026", time: "10:00 AM - 11:30 AM EST", type: "Zoom", link: "https://zoom.us/j/123456789" },
    { title: "Executive Coaching: CEO", date: "Oct 14, 2026", time: "2:00 PM - 3:00 PM EST", type: "Zoom", link: "https://zoom.us/j/987654321" },
  ];

  const pastMeetings = [
    { title: "Vision & Mission Workshop", date: "Oct 5, 2026", duration: "3 hours", notes: "Available" },
    { title: "Assessment Findings Presentation", date: "Oct 2, 2026", duration: "1.5 hours", notes: "Available" },
    { title: "Project Kickoff", date: "Sep 15, 2026", duration: "1 hour", notes: "Available" },
  ];

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2">Meeting Hub</h1>
            <p className="text-lg text-muted-foreground">Manage your schedule, access meeting links, and review past notes.</p>
          </div>
          <Button className="rounded-full bg-accent text-white hover:bg-primary font-bold uppercase tracking-wider text-xs px-6">
            Schedule New Meeting
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-primary border-b border-border pb-4">Upcoming Sessions</h3>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                  <div className="flex gap-6 items-center">
                     <div className="w-16 h-16 rounded-2xl bg-secondary flex flex-col items-center justify-center border border-border flex-shrink-0">
                       <span className="text-[10px] font-bold uppercase text-accent leading-none mb-1">{meeting.date.split(' ')[0]}</span>
                       <span className="text-2xl font-black text-primary leading-none">{meeting.date.split(' ')[1].replace(',', '')}</span>
                     </div>
                     <div>
                       <h4 className="text-lg font-bold text-primary">{meeting.title}</h4>
                       <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                         <CalendarIcon size={14} /> {meeting.date} • {meeting.time}
                       </div>
                     </div>
                  </div>
                  <div className="w-full md:w-auto flex gap-3">
                     <Button className="w-full md:w-auto rounded-xl bg-primary text-white hover:bg-accent font-bold text-xs">
                       <Video size={16} className="mr-2" /> Join {meeting.type}
                     </Button>
                     <Button variant="outline" className="rounded-xl border-border hover:bg-secondary">
                       Agenda
                     </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary border-b border-border pb-4">Past Meetings & Notes</h3>
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
              {pastMeetings.map((meeting, i) => (
                <div key={i} className="p-5 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <h4 className="font-bold text-primary text-sm mb-1">{meeting.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{meeting.date} • {meeting.duration}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-accent hover:text-primary cursor-pointer transition-colors">
                    <FileText size={14} /> View Notes & Action Items
                  </div>
                </div>
              ))}
              <div className="p-4 bg-secondary/50 text-center border-t border-border">
                <button className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">
                  View Full History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}