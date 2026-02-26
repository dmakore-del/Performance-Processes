import { useState, useRef, useEffect } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Send, User, Hash, MessageCircle, Loader2 } from "lucide-react";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Message } from "@shared/schema";

export default function Messages() {
  const { engagement, engagementId, isLoading: engLoading } = usePortalEngagement();
  const { data: messages, isLoading: msgsLoading } = usePortalData<Message[]>("messages", engagementId);
  const { user } = useAuth();
  const [activeChannel, setActiveChannel] = useState("general");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channels = [
    { id: "general", label: "Project Channel", icon: Hash },
    { id: "direct", label: "Direct", icon: MessageCircle },
  ];

  const filteredMessages = (messages ?? []).filter((m) => m.channel === activeChannel);

  const sendMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await apiRequest("POST", "/api/portal/messages", {
        engagementId,
        channel: activeChannel,
        senderName: user?.fullName ?? "Unknown",
        senderRole: user?.role ?? "client",
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
    if (!trimmed || !engagementId) return;
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

  const isCurrentUser = (msg: Message) => msg.senderName === user?.fullName;

  const lastMessageByChannel = (channelId: string) => {
    const channelMsgs = (messages ?? []).filter((m) => m.channel === channelId);
    return channelMsgs.length > 0 ? channelMsgs[channelMsgs.length - 1] : null;
  };

  const isLoading = engLoading || msgsLoading;

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-accent" data-testid="spinner-loading" />
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
          <div className="w-80 border-r border-border hidden md:flex flex-col bg-secondary/10" data-testid="sidebar-channels">
            <div className="p-4 border-b border-border">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full bg-white border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-accent"
                data-testid="input-search-messages"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {channels.map((ch) => {
                const lastMsg = lastMessageByChannel(ch.id);
                const isActive = activeChannel === ch.id;
                return (
                  <div
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`p-4 border-b border-border cursor-pointer transition-colors border-l-4 ${
                      isActive ? "bg-white border-l-accent" : "border-l-transparent hover:bg-white"
                    }`}
                    data-testid={`channel-${ch.id}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-primary text-sm flex items-center gap-2">
                        <ch.icon size={14} />
                        {ch.label}
                      </span>
                      {lastMsg && (
                        <span className="text-[10px] text-muted-foreground">{formatTime(lastMsg.sentAt)}</span>
                      )}
                    </div>
                    {lastMsg && (
                      <p className="text-xs text-muted-foreground truncate">
                        {lastMsg.senderName}: {lastMsg.content}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold" data-testid="avatar-channel">
                  {activeChannel === "general" ? "PC" : "DM"}
                </div>
                <div>
                  <h3 className="font-bold text-primary" data-testid="text-channel-name">
                    {channels.find((c) => c.id === activeChannel)?.label}
                  </h3>
                  <p className="text-xs text-muted-foreground" data-testid="text-message-count">
                    {filteredMessages.length} message{filteredMessages.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex md:hidden gap-2">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      activeChannel === ch.id ? "bg-accent text-white" : "bg-secondary text-primary"
                    }`}
                    data-testid={`btn-channel-mobile-${ch.id}`}
                  >
                    {ch.label}
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
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              mine ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                            }`}
                          >
                            <User size={16} />
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
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
