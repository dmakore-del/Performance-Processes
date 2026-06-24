import { useState } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import type { Meeting } from "@shared/schema";

const MS_BOOKINGS_URL = "https://outlook.office.com/book/PerformanceProcesses1@performanceprocesses.com/?ismsaljsauthenabled";

interface BookingEvent {
  id: string;
  title: string;
  startDateTime: string;
  startTimeZone: string;
  endDateTime: string;
  endTimeZone: string;
  location: string;
  meetingLink: string;
  isOnline: boolean;
  bodyPreview: string;
  organizer: string;
  attendees: { name: string; email: string; status: string }[];
  webLink: string;
}

export default function Meetings() {
  const { engagementId, isLoading: engLoading } = usePortalEngagement();
  const { data: meetings, isLoading: meetingsLoading } = usePortalData<Meeting[]>("meetings", engagementId);
  const { user } = useAuth();
  const [notesOpen, setNotesOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookingEvent | null>(null);
  const [bookingDetailOpen, setBookingDetailOpen] = useState(false);

  const [bookingsError, setBookingsError] = useState(false);
  const { data: bookings, isLoading: bookingsLoading } = useQuery<BookingEvent[]>({
    queryKey: ["/api/portal/bookings"],
    queryFn: async () => {
      const res = await fetch("/api/portal/bookings");
      if (!res.ok) {
        setBookingsError(true);
        return [];
      }
      setBookingsError(false);
      return res.json();
    },
    staleTime: 60000,
    retry: 1,
  });

  const isLoading = engLoading || meetingsLoading;

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center py-20" data-testid="meetings-loading">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary animate-pulse">Loading</span>
        </div>
      </PortalLayout>
    );
  }

  if (!engagementId && !engLoading) {
    return (
      <PortalLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center" data-testid="meetings-empty-state">
          <h2 className="text-xl font-bold text-primary mb-2">No Active Engagement</h2>
          <p className="text-muted-foreground mb-6">Your consultant will set up your engagement shortly.</p>
          <a href={MS_BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full bg-accent text-white hover:bg-primary font-bold uppercase tracking-wider text-xs px-6" data-testid="button-schedule-consultation">
              Schedule a Consultation
            </Button>
          </a>
        </div>
      </PortalLayout>
    );
  }

  const allMeetings = meetings || [];
  const upcomingMeetings = allMeetings.filter((m) => m.status === "upcoming");
  const completedMeetings = allMeetings.filter((m) => m.status === "completed");

  const now = new Date();
  const allBookings = bookings || [];
  const upcomingBookings = allBookings.filter((b) => new Date(b.startDateTime) >= now);
  const pastBookings = allBookings.filter((b) => new Date(b.startDateTime) < now);

  const openNotes = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setNotesOpen(true);
  };

  const openBookingDetail = (booking: BookingEvent) => {
    setSelectedBooking(booking);
    setBookingDetailOpen(true);
  };

  const formatBookingDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  };

  const formatBookingTime = (startStr: string, endStr: string) => {
    const s = new Date(startStr);
    const e = new Date(endStr);
    const fmt = (d: Date) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    return `${fmt(s)} , ${fmt(e)}`;
  };

  const getBookingDay = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.getDate().toString();
  };

  const getBookingMonth = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short" });
  };

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2" data-testid="text-meetings-title">Meeting Hub</h1>
            <p className="text-lg text-muted-foreground" data-testid="text-meetings-subtitle">View your scheduled bookings and past meeting notes.</p>
          </div>
          <a href={MS_BOOKINGS_URL} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full bg-accent text-white hover:bg-primary font-bold uppercase tracking-wider text-xs px-6" data-testid="button-schedule-meeting">
              Schedule a Meeting
            </Button>
          </a>
        </div>

        {bookingsLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Syncing bookings from your calendar...
          </div>
        )}

        {bookingsError && !bookingsLoading && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-sm text-yellow-800" data-testid="text-bookings-error">
            Calendar sync is temporarily unavailable. Your manually scheduled meetings are still shown below.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-primary border-b border-border pb-4" data-testid="text-upcoming-header">Upcoming Sessions</h3>
            <div className="space-y-4">
              {upcomingBookings.length === 0 && upcomingMeetings.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl border border-border text-center text-muted-foreground" data-testid="text-no-upcoming">
                  No upcoming meetings scheduled. Click "Schedule a Meeting" to book a session.
                </div>
              ) : (
                <>
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between" data-testid={`card-booking-${booking.id}`}>
                      <div className="flex gap-6 items-center">
                        <div className="w-16 h-16 rounded-2xl bg-secondary flex flex-col items-center justify-center border border-border flex-shrink-0">
                          <span className="text-[10px] font-bold uppercase text-accent leading-none mb-1">{getBookingMonth(booking.startDateTime)}</span>
                          <span className="text-2xl font-black text-primary leading-none">{getBookingDay(booking.startDateTime)}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-primary" data-testid={`text-booking-title-${booking.id}`}>{booking.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            {formatBookingDate(booking.startDateTime)} • {formatBookingTime(booking.startDateTime, booking.endDateTime)}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {booking.isOnline && (
                              <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-semibold text-primary" data-testid={`badge-online-${booking.id}`}>
                                Online
                              </span>
                            )}
                            {booking.location && (
                              <span className="text-xs text-muted-foreground">{booking.location}</span>
                            )}
                          </div>
                          {booking.attendees.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              {booking.attendees.map(a => a.name || a.email).join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full md:w-auto flex gap-3">
                        <Button variant="outline" className="rounded-xl border-border hover:bg-secondary text-xs font-bold" onClick={() => openBookingDetail(booking)} data-testid={`button-detail-${booking.id}`}>
                          Details
                        </Button>
                        {booking.meetingLink && (
                          <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer" data-testid={`link-join-booking-${booking.id}`}>
                            <Button className="rounded-xl bg-primary text-white hover:bg-accent font-bold text-xs">
                              Join Meeting
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}

                  {upcomingMeetings.map((meeting) => {
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
                              {meeting.meetingDate} • {meeting.meetingTime}
                            </div>
                            {meeting.duration && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                {meeting.duration}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="w-full md:w-auto flex gap-3">
                          {meeting.agendaItems && (
                            <Button variant="outline" className="rounded-xl border-border hover:bg-secondary" onClick={() => openNotes(meeting)} data-testid={`button-agenda-${meeting.id}`}>
                              Agenda
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary border-b border-border pb-4" data-testid="text-past-header">Past Meetings</h3>
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
              {pastBookings.length === 0 && completedMeetings.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground" data-testid="text-no-past">
                  No past meetings yet.
                </div>
              ) : (
                <>
                  {pastBookings.map((booking) => (
                    <div key={booking.id} className="p-5 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer" onClick={() => openBookingDetail(booking)} data-testid={`card-past-booking-${booking.id}`}>
                      <h4 className="font-bold text-primary text-sm mb-1" data-testid={`text-past-booking-title-${booking.id}`}>{booking.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {formatBookingDate(booking.startDateTime)} • {formatBookingTime(booking.startDateTime, booking.endDateTime)}
                      </p>
                      {booking.bodyPreview && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{booking.bodyPreview}</p>
                      )}
                    </div>
                  ))}
                  {completedMeetings.map((meeting) => (
                    <div key={meeting.id} className="p-5 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors" data-testid={`card-past-meeting-${meeting.id}`}>
                      <h4 className="font-bold text-primary text-sm mb-1" data-testid={`text-past-title-${meeting.id}`}>{meeting.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{meeting.meetingDate}{meeting.duration ? ` • ${meeting.duration}` : ""}</p>
                      {meeting.notes ? (
                        <div
                          className="flex items-center gap-2 text-xs font-bold text-accent hover:text-primary cursor-pointer transition-colors"
                          onClick={() => openNotes(meeting)}
                          data-testid={`button-view-notes-${meeting.id}`}
                        >
                          View Notes & Action Items
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">No notes available</span>
                      )}
                    </div>
                  ))}
                </>
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

      <Dialog open={bookingDetailOpen} onOpenChange={setBookingDetailOpen}>
        <DialogContent data-testid="dialog-booking-detail">
          <DialogHeader>
            <DialogTitle>{selectedBooking?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {selectedBooking && (
              <>
                <div className="text-sm text-muted-foreground">
                  {formatBookingDate(selectedBooking.startDateTime)} • {formatBookingTime(selectedBooking.startDateTime, selectedBooking.endDateTime)}
                </div>
                {selectedBooking.location && (
                  <div className="text-sm">
                    <span className="font-bold text-primary">Location:</span> {selectedBooking.location}
                  </div>
                )}
                {selectedBooking.organizer && (
                  <div className="text-sm">
                    <span className="font-bold text-primary">Organizer:</span> {selectedBooking.organizer}
                  </div>
                )}
                {selectedBooking.attendees.length > 0 && (
                  <div>
                    <h4 className="font-bold text-primary text-sm mb-2">Attendees</h4>
                    <div className="space-y-1">
                      {selectedBooking.attendees.map((a, i) => (
                        <div key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span>{a.name || a.email}</span>
                          {a.status !== "none" && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${a.status === "accepted" ? "bg-green-100 text-green-700" : a.status === "declined" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                              {a.status}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {selectedBooking.bodyPreview && (
                  <div>
                    <h4 className="font-bold text-primary text-sm mb-2">Details</h4>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{selectedBooking.bodyPreview}</p>
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  {selectedBooking.meetingLink && (
                    <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer">
                      <Button className="rounded-xl bg-primary text-white hover:bg-accent font-bold text-xs" data-testid="button-join-from-detail">
                        Join Meeting
                      </Button>
                    </a>
                  )}
                  {selectedBooking.webLink && (
                    <a href={selectedBooking.webLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="rounded-xl border-border hover:bg-secondary text-xs font-bold" data-testid="button-open-outlook">
                        Open in Outlook
                      </Button>
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
