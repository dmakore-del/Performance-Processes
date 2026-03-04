import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const FAQ_DATA = [
  {
    keywords: ["what is", "performance processes", "about", "who are you", "company"],
    answer: "Performance Processes is a business consulting firm that helps organizations align strategy with execution to achieve measurable, sustainable results."
  },
  {
    keywords: ["who do you work with", "clients", "work with", "target", "audience"],
    answer: "We work with startups, SMEs, nonprofits, and established organizations seeking to strengthen strategy, leadership, and performance systems."
  },
  {
    keywords: ["services", "what do you offer", "offer", "provide", "help with"],
    answer: "We offer outcome-focused consulting across six service areas: Discovery & Assessment, Strategy & Alignment, Systems & Implementation, Executive Advisory, Business Registration, and Website & Digital Presence. Visit our Services page for detailed pricing and packages."
  },
  {
    keywords: ["different", "unique", "why choose", "stand out", "differentiator"],
    answer: "We focus on connecting vision to measurable outcomes through structured systems, accountability frameworks, and leadership alignment."
  },
  {
    keywords: ["large organizations", "small", "size", "startup", "sme"],
    answer: "No, we support organizations of all sizes — from emerging ventures to established enterprises."
  },
  {
    keywords: ["strategic alignment", "alignment", "what is strategic"],
    answer: "Strategic alignment ensures that leadership, operations, and performance systems all support the organization's long-term goals."
  },
  {
    keywords: ["how long", "duration", "timeline", "engagement last", "time"],
    answer: "Our Strategy & Alignment engagements run 6–12 weeks. Systems & Implementation projects vary by scope. Executive Advisory retainers have a 3-month minimum. Every engagement starts with our Discovery & Assessment phase."
  },
  {
    keywords: ["customized", "custom", "tailored", "personalized"],
    answer: "Yes, every engagement is tailored to the organization's specific needs, goals, and structure."
  },
  {
    keywords: ["industries", "sectors", "industry", "which industries"],
    answer: "We serve organizations across Government, Nonprofit, Healthcare, Financial Services, Technology, Education, Manufacturing, and Professional Services sectors."
  },
  {
    keywords: ["leadership coaching", "coaching", "executive coaching", "leadership development"],
    answer: "Yes, we offer leadership development programs and executive coaching to strengthen capability and accountability."
  },
  {
    keywords: ["governance", "board", "policies", "governance structures"],
    answer: "Yes, we provide guidance on governance frameworks, policies, and organizational readiness."
  },
  {
    keywords: ["performance management", "kpi", "metrics", "reporting", "accountability"],
    answer: "Performance management design involves building KPI frameworks, accountability systems, and reporting structures that connect strategy to measurable results."
  },
  {
    keywords: ["change management", "transition", "change"],
    answer: "Yes, we guide organizations through transitions with structured change frameworks and stakeholder alignment strategies."
  },
  {
    keywords: ["website", "marketing", "digital", "online presence"],
    answer: "Yes! Our Website & Digital Presence service builds professional, performance-driven websites starting from $1,200. We offer packages from basic sites (5 pages) up to premium enterprise solutions ($12,000+) with full integrations, plus ongoing management at $780/month."
  },
  {
    keywords: ["hands-on", "approach", "collaborative", "how do you work"],
    answer: "Yes, we work collaboratively with leadership teams to implement practical, actionable solutions."
  },
  {
    keywords: ["get started", "start", "begin", "first step", "consultation", "discovery"],
    answer: "Every engagement begins with our Discovery & Assessment phase ($750–$1,500), where we conduct an organizational intake, needs assessment, and scope definition to build a clear proposal roadmap. Discovery fees can be credited toward your full engagement. You can also book a free consultation through our website."
  },
  {
    keywords: ["workshop", "one-time", "retreat", "session"],
    answer: "Yes, we provide standalone strategy sessions, leadership workshops, and alignment retreats."
  },
  {
    keywords: ["outcomes", "results", "expect", "benefits", "what do i get"],
    answer: "Clients typically gain clearer direction, stronger accountability, improved operational efficiency, and measurable performance improvements."
  },
  {
    keywords: ["remote", "in-person", "location", "where", "virtual", "online"],
    answer: "We operate primarily as a remote consulting firm, with flexibility for in-person engagements where appropriate."
  },
  {
    keywords: ["measure success", "success", "measure", "track"],
    answer: "We measure success through defined KPIs, goal progression, leadership alignment, and sustainable operational improvements."
  },
  {
    keywords: ["business registration", "register", "incorporate", "incorporation", "start a business", "new business", "register a company"],
    answer: "Yes! We offer Business Registration services starting at $3,500. Our packages cover everything from basic incorporation and name search to full setup with governance documents, shareholder agreements, and compliance frameworks. Visit our Services page for details."
  },
  {
    keywords: ["price", "cost", "pricing", "how much", "fee", "rate", "payment", "pay"],
    answer: "We sell outcomes, not hours. Discovery & Assessment starts at $750, Strategy & Alignment from $5,000, Systems & Implementation from $8,000, Executive Advisory from $2,500/month, Business Registration from $3,500, and Website & Digital Presence from $1,200. Visit our Services page for full package details."
  },
  {
    keywords: ["contact", "email", "phone", "reach"],
    answer: "You can reach us at contact@performanceprocesses.com or call +1 (905) 823-1324. We'd love to hear from you!"
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon"],
    answer: "Hello! Welcome to Performance Processes. How can I help you today? Feel free to ask about our services, approach, or anything else."
  }
];

interface Message {
  role: "bot" | "user";
  text: string;
}

function findAnswer(input: string): string | null {
  const lower = input.toLowerCase().trim();
  if (lower.length < 2) return null;

  let bestMatch: { score: number; answer: string } | null = null;

  for (const faq of FAQ_DATA) {
    let score = 0;
    for (const keyword of faq.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.split(" ").length;
      }
    }
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { score, answer: faq.answer };
    }
  }

  return bestMatch ? bestMatch.answer : null;
}

const FALLBACK_MESSAGE = "I'm not sure I can answer that one. For more detailed questions, please email us at contact@performanceprocesses.com and our team will be happy to help!";

export function Chatbot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: "bot",
        text: language === "en"
          ? "Hi there! I'm the Performance Processes assistant. Ask me anything about our services, approach, or how we can help your organization."
          : "Bonjour! Je suis l'assistant de Performance Processes. Posez-moi vos questions sur nos services, notre approche ou comment nous pouvons aider votre organisation."
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { role: "user", text: trimmed };
    const answer = findAnswer(trimmed);
    const botMsg: Message = { role: "bot", text: answer || FALLBACK_MESSAGE };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-white shadow-lg shadow-accent/30 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
          data-testid="button-open-chatbot"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden" data-testid="chatbot-window">
          <div className="bg-primary px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Performance Processes</h3>
                <p className="text-white/60 text-[10px] font-medium uppercase tracking-widest">
                  {language === "en" ? "Ask us anything" : "Posez-nous vos questions"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
              data-testid="button-close-chatbot"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-white rounded-br-md"
                      : "bg-[#F1F5F9] text-foreground rounded-bl-md"
                  }`}
                  data-testid={`text-chat-message-${i}`}
                >
                  {msg.text}
                  {msg.role === "bot" && msg.text === FALLBACK_MESSAGE && (
                    <a
                      href="mailto:contact@performanceprocesses.com"
                      className="flex items-center gap-2 mt-3 text-accent font-bold text-xs hover:underline"
                      data-testid="link-chatbot-email"
                    >
                      <Mail size={14} />
                      contact@performanceprocesses.com
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border p-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={language === "en" ? "Type your question..." : "Tapez votre question..."}
                className="flex-1 bg-[#F8FAFC] border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:border-accent"
                data-testid="input-chatbot"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-primary transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed flex-shrink-0"
                data-testid="button-send-chatbot"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
