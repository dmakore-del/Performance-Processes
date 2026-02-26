import { useState } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Video, Calendar as CalendarIcon, FileText, Loader2, Plus, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Meeting } from "@shared/schema";

export default function Meetings() {
  const { engagementId, isLoading: engLoading } = usePortalEngagement();
  const { data: meetings, isLoading: meetingsLoading } = usePortalData<Meeting[]>("meetings", engagementId);
  const { toast } = useToast();
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    meetingDate: "",
    meetingTime: "",
    duration: "",
    meetingType: "Zoom",
    meetingLink: "",
    agendaItems: "",
  });

  const scheduleMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/portal/meetings", {
        ...data,
        engagementId,
        status: "upcoming",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/meetings`] });
      setScheduleOpen(false);
      setFormData({ title: "", meetingDate: "", meetingTime: "", duration: "", meetingType: "Zoom", meetingLink: "", agendaItems: "" });
      toast({ title: "Meeting Scheduled", description: "Your new meeting has been added." });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const isLoading = engLoading || meetingsLoading;

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center py-20" data-testid="meetings-loading">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PortalLayout>
    );
  }

  const allMeetings = meetings || [];
  const upcomingMeetings = allMeetings.filter((m) => m.status === "upcoming");
  const completedMeetings = allMeetings.filter((m) => m.status === "completed");

  const handleSchedule = () => {
    if (!formData.title || !formData.meetingDate || !formData.meetingTime) {
      toast({ title: "Missing fields", description: "Please fill in title, date, and time.", variant: "destructive" });
      return;
    }
    scheduleMutation.mutate(formData);
  };

  const openNotes = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setNotesOpen(true);
  };

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2" data-testid="text-meetings-title">Meeting Hub</h1>
            <p className="text-lg text-muted-foreground" data-testid="text-meetings-subtitle">Manage your schedule, access meeting links, and review past notes.</p>
          </div>
          <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-accent text-white hover:bg-primary font-bold uppercase tracking-wider text-xs px-6" data-testid="button-schedule-meeting">
                <Plus size={16} className="mr-2" /> Schedule New Meeting
              </Button>
            </DialogTrigger>
            <DialogContent data-testid="dialog-schedule-meeting">
              <DialogHeader>
                <DialogTitle>Schedule New Meeting</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" data-testid="input-meeting-title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Meeting title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" data-testid="input-meeting-date" value={formData.meetingDate} onChange={(e) => setFormData({ ...formData, meetingDate: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" data-testid="input-meeting-time" value={formData.meetingTime} onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })} placeholder="10:00 AM EST" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" data-testid="input-meeting-duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="1 hour" />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Input id="type" data-testid="input-meeting-type" value={formData.meetingType} onChange={(e) => setFormData({ ...formData, meetingType: e.target.value })} placeholder="Zoom" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="link">Meeting Link</Label>
                  <Input id="link" data-testid="input-meeting-link" value={formData.meetingLink} onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })} placeholder="https://zoom.us/j/..." />
                </div>
                <div>
                  <Label htmlFor="agenda">Agenda Items</Label>
                  <Textarea id="agenda" data-testid="input-meeting-agenda" value={formData.agendaItems} onChange={(e) => setFormData({ ...formData, agendaItems: e.target.value })} placeholder="Meeting agenda..." rows={3} />
                </div>
                <Button onClick={handleSchedule} disabled={scheduleMutation.isPending} className="w-full bg-primary text-white hover:bg-accent" data-testid="button-submit-meeting">
                  {scheduleMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Schedule Meeting
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-primary border-b border-border pb-4" data-testid="text-upcoming-header">Upcoming Sessions</h3>
            <div className="space-y-4">
              {upcomingMeetings.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl border border-border text-center text-muted-foreground" data-testid="text-no-upcoming">
                  No upcoming meetings scheduled.
                </div>
              ) : (
                upcomingMeetings.map((meeting) => {
                  const dateParts = meeting.meetingDate.split(/[-/,\s]+/);
                  const monthLabel = dateParts[0] || "";
                  const dayLabel = dateParts[1] || dateParts[0] || "";

                  return (
                    <div key={meeting.id} className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between" data-testid={`card-meeting-${meeting.id}`}>
                      <div className="flex gap-6 items-center">
                        <div className="w-16 h-16 rounded-2xl bg-secondary flex flex-col items-center justify-center border border-border flex-shrink-0">
                          <span className="text-[10px] font-bold uppercase text-accent leading-none mb-1">{monthLabel}</span>
                          <span className="text-2xl font-black text-primary leading-none">{dayLabel.replace(",", "")}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-primary" data-testid={`text-meeting-title-${meeting.id}`}>{meeting.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <CalendarIcon size={14} /> {meeting.meetingDate} • {meeting.meetingTime}
                          </div>
                          {meeting.duration && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <Clock size={12} /> {meeting.duration}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full md:w-auto flex gap-3">
                        {meeting.meetingLink ? (
                          <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer" data-testid={`link-join-${meeting.id}`}>
                            <Button className="w-full md:w-auto rounded-xl bg-primary text-white hover:bg-accent font-bold text-xs">
                              <Video size={16} className="mr-2" /> Join {meeting.meetingType}
                            </Button>
                          </a>
                        ) : (
                          <Button className="w-full md:w-auto rounded-xl bg-primary text-white hover:bg-accent font-bold text-xs" disabled data-testid={`button-join-disabled-${meeting.id}`}>
                            <Video size={16} className="mr-2" /> No Link
                          </Button>
                        )}
                        {meeting.agendaItems && (
                          <Button variant="outline" className="rounded-xl border-border hover:bg-secondary" onClick={() => openNotes(meeting)} data-testid={`button-agenda-${meeting.id}`}>
                            Agenda
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary border-b border-border pb-4" data-testid="text-past-header">Past Meetings & Notes</h3>
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
              {completedMeetings.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground" data-testid="text-no-past">
                  No past meetings yet.
                </div>
              ) : (
                completedMeetings.map((meeting) => (
                  <div key={meeting.id} className="p-5 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors" data-testid={`card-past-meeting-${meeting.id}`}>
                    <h4 className="font-bold text-primary text-sm mb-1" data-testid={`text-past-title-${meeting.id}`}>{meeting.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{meeting.meetingDate}{meeting.duration ? ` • ${meeting.duration}` : ""}</p>
                    {meeting.notes ? (
                      <div
                        className="flex items-center gap-2 text-xs font-bold text-accent hover:text-primary cursor-pointer transition-colors"
                        onClick={() => openNotes(meeting)}
                        data-testid={`button-view-notes-${meeting.id}`}
                      >
                        <FileText size={14} /> View Notes & Action Items
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">No notes available</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
        <DialogContent data-testid="dialog-meeting-notes">
          <DialogHeader>
            <DialogTitle>{selectedMeeting?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="text-sm text-muted-foreground">
              {selectedMeeting?.meetingDate} • {selectedMeeting?.meetingTime}
              {selectedMeeting?.duration ? ` • ${selectedMeeting.duration}` : ""}
            </div>
            {selectedMeeting?.agendaItems && (
              <div>
                <h4 className="font-bold text-primary text-sm mb-2">Agenda</h4>
                <p className="text-sm text-foreground whitespace-pre-wrap" data-testid="text-agenda-content">{selectedMeeting.agendaItems}</p>
              </div>
            )}
            {selectedMeeting?.notes && (
              <div>
                <h4 className="font-bold text-primary text-sm mb-2">Notes</h4>
                <p className="text-sm text-foreground whitespace-pre-wrap" data-testid="text-notes-content">{selectedMeeting.notes}</p>
              </div>
            )}
            {!selectedMeeting?.notes && !selectedMeeting?.agendaItems && (
              <p className="text-sm text-muted-foreground">No notes or agenda available for this meeting.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
