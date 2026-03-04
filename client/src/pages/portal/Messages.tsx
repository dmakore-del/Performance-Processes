import { useState, useRef, useEffect } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Send, User, Loader2, MessageSquare } from "lucide-react";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Message } from "@shared/schema";

interface Participant {
  id: string;
  fullName: string;
  role: string;
}

export default function Messages() {
  const { engagement, engagementId, isLoading: engLoading } = usePortalEngagement();
  const { data: messages, isLoading: msgsLoading } = usePortalData<Message[]>("messages", engagementId);
  const { user } = useAuth();
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: participants, isLoading: participantsLoading } = useQuery<Participant[]>({
    queryKey: [`/api/portal/engagements/${engagementId}/participants`],
    enabled: !!engagementId,
  });

  const otherParticipants = (participants ?? []).filter((p) => p.id !== user?.id);

  const filteredMessages = (messages ?? []).filter(
    (m) =>
      (m.senderId === selectedRecipientId && m.recipientId === user?.id) ||
      (m.senderId === user?.id && m.recipientId === selectedRecipientId)
  );

  const sendMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await apiRequest("POST", "/api/portal/messages", {
        engagementId,
        recipientId: selectedRecipientId,
        content,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/messages`] });
    },
  });

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || !engagementId || !selectedRecipientId) return;
    sendMutation.mutate(trimmed);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages.length]);

  const formatTime = (dateStr: string | Date | null) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDateLabel = (dateStr: string | Date | null) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return "Today";
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
    return d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
  };

  const groupedByDate: { label: string; msgs: Message[] }[] = [];
  let lastLabel = "";
  for (const msg of filteredMessages) {
    const label = formatDateLabel(msg.sentAt);
    if (label !== lastLabel) {
      groupedByDate.push({ label, msgs: [msg] });
      lastLabel = label;
    } else {
      groupedByDate[groupedByDate.length - 1].msgs.push(msg);
    }
  }

  const isCurrentUser = (msg: Message) => msg.senderId === user?.id;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getLastMessageForParticipant = (participantId: string) => {
    const msgs = (messages ?? []).filter(
      (m) =>
        (m.senderId === participantId && m.recipientId === user?.id) ||
        (m.senderId === user?.id && m.recipientId === participantId)
    );
    return msgs.length > 0 ? msgs[msgs.length - 1] : null;
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700";
      case "staff":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const selectedParticipant = otherParticipants.find((p) => p.id === selectedRecipientId);

  const isLoading = engLoading || msgsLoading || participantsLoading;

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-accent" data-testid="spinner-loading" />
        </div>
      </PortalLayout>
    );
  }

  if (!engagement && !engLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center" data-testid="empty-state-no-engagement">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold text-primary mb-2">No Active Engagement</h2>
            <p className="text-muted-foreground">Your consultant will set up your engagement shortly.</p>
          </div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2" data-testid="text-page-title">Communication Center</h1>
          <p className="text-lg text-muted-foreground" data-testid="text-page-subtitle">Secure messaging with your consulting team.</p>
        </div>

        <div className="flex-1 bg-white rounded-3xl border border-border shadow-sm flex overflow-hidden">
          <div className="w-80 border-r border-border hidden md:flex flex-col bg-secondary/10" data-testid="sidebar-participants">
            <div className="p-4 border-b border-border">
              <h3 className="font-bold text-primary text-sm">Conversations</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              {otherParticipants.length === 0 && (
                <div className="p-4 text-center">
                  <p className="text-sm text-muted-foreground" data-testid="text-no-participants">No participants yet</p>
                </div>
              )}
              {otherParticipants.map((participant) => {
                const lastMsg = getLastMessageForParticipant(participant.id);
                const isActive = selectedRecipientId === participant.id;
                return (
                  <div
                    key={participant.id}
                    onClick={() => setSelectedRecipientId(participant.id)}
                    className={`p-4 border-b border-border cursor-pointer transition-colors border-l-4 ${
                      isActive ? "bg-white border-l-accent" : "border-l-transparent hover:bg-white"
                    }`}
                    data-testid={`participant-${participant.id}`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {getInitials(participant.fullName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary text-sm truncate" data-testid={`text-participant-name-${participant.id}`}>
                            {participant.fullName}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${getRoleBadgeColor(participant.role)}`} data-testid={`badge-role-${participant.id}`}>
                            {participant.role}
                          </span>
                        </div>
                        {lastMsg && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {lastMsg.senderName}: {lastMsg.content}
                          </p>
                        )}
                      </div>
                      {lastMsg && (
                        <span className="text-[10px] text-muted-foreground flex-shrink-0">{formatTime(lastMsg.sentAt)}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {!selectedRecipientId ? (
              <div className="flex-1 flex items-center justify-center bg-[#F8FAFC]">
                <div className="text-center" data-testid="text-select-conversation">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm font-medium">Select a conversation</p>
                  <p className="text-muted-foreground text-xs mt-1">Choose a participant from the sidebar to start messaging</p>
                </div>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-border flex items-center justify-between bg-white z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold" data-testid="avatar-recipient">
                      {selectedParticipant ? getInitials(selectedParticipant.fullName) : "?"}
                    </div>
                    <div>
                      <h3 className="font-bold text-primary" data-testid="text-recipient-name">
                        {selectedParticipant?.fullName ?? "Unknown"}
                      </h3>
                      <p className="text-xs text-muted-foreground" data-testid="text-message-count">
                        {filteredMessages.length} message{filteredMessages.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex md:hidden gap-2">
                    {otherParticipants.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedRecipientId(p.id)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedRecipientId === p.id ? "bg-accent text-white" : "bg-secondary text-primary"
                        }`}
                        data-testid={`btn-participant-mobile-${p.id}`}
                      >
                        {p.fullName.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto bg-[#F8FAFC] space-y-6" data-testid="container-messages">
                  {filteredMessages.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground text-sm" data-testid="text-no-messages">No messages yet. Start the conversation!</p>
                    </div>
                  )}

                  {groupedByDate.map((group) => (
                    <div key={group.label}>
                      <div className="flex justify-center mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-border px-3 py-1 rounded-full">
                          {group.label}
                        </span>
                      </div>
                      <div className="space-y-4">
                        {group.msgs.map((msg) => {
                          const mine = isCurrentUser(msg);
                          return (
                            <div
                              key={msg.id}
                              className={`flex gap-4 max-w-2xl ${mine ? "ml-auto flex-row-reverse" : ""}`}
                              data-testid={`message-${msg.id}`}
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                                  mine ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                                }`}
                              >
                                {getInitials(msg.senderName)}
                              </div>
                              <div className={mine ? "flex flex-col items-end" : ""}>
                                <div className={`flex items-baseline gap-2 mb-1 ${mine ? "flex-row-reverse" : ""}`}>
                                  <span className="font-bold text-sm text-primary" data-testid={`text-sender-${msg.id}`}>
                                    {msg.senderName}{mine ? " (You)" : ""}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground" data-testid={`text-time-${msg.id}`}>
                                    {formatTime(msg.sentAt)}
                                  </span>
                                </div>
                                <div
                                  className={`p-4 shadow-sm text-sm ${
                                    mine
                                      ? "bg-primary text-white rounded-2xl rounded-tr-none"
                                      : "bg-white text-primary rounded-2xl rounded-tl-none border border-border"
                                  }`}
                                  data-testid={`text-content-${msg.id}`}
                                >
                                  {msg.content}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-white border-t border-border">
                  <div className="flex items-center gap-3 bg-secondary/50 border border-border rounded-2xl p-2 focus-within:border-accent transition-colors">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-transparent px-4 outline-none text-sm font-medium"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      data-testid="input-message"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || sendMutation.isPending}
                      className="w-10 h-10 bg-accent text-white rounded-xl flex items-center justify-center hover:bg-primary transition-colors flex-shrink-0 disabled:opacity-50"
                      data-testid="btn-send-message"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
