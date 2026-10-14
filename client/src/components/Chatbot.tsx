import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";

const FAQ_DATA = [
  {
    keywords: ["what is", "performance processes", "about", "who are you", "company"],
    answer: "Performance Processes helps professionals, businesses, and organizations turn ambition into consistent execution, building systems that deliver measurable, repeatable results."
  },
  {
    keywords: ["who do you work with", "clients", "work with", "target", "audience"],
    answer: "We work with leaders and organizations, small businesses and startups, professionals and freelancers, and entrepreneurs, anyone looking to build systems that improve performance."
  },
  {
    keywords: ["services", "what do you offer", "offer", "provide", "help with"],
    answer: "We help Canadian entrepreneurs with business setup, websites and digital services, grant research, and financing application support. Our public grant and financing service fees are listed at /grants-financing."
  },
  {
    keywords: ["different", "unique", "why choose", "stand out", "differentiator"],
    answer: "We focus on connecting vision to measurable outcomes through structured systems, accountability frameworks, and leadership alignment."
  },
  {
    keywords: ["large organizations", "small", "size", "startup", "sme"],
    answer: "We support everyone, from individuals and freelancers to small businesses and large enterprises. Our services start at just $49 for self-serve tools, $100/mo for personal coaching, $500/mo for small business programs, and scale up to full enterprise consulting."
  },
  {
    keywords: ["strategic alignment", "alignment", "what is strategic"],
    answer: "Strategic alignment ensures that leadership, operations, and performance systems all support the organization's long-term goals."
  },
  {
    keywords: ["how long", "duration", "timeline", "engagement last", "time"],
    answer: "Timelines depend on your goals and the agreed scope. We start by understanding your priorities and recommending a practical next step."
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
    keywords: ["leadership coaching", "coaching", "executive coaching", "leadership development", "personal coaching", "career coaching"],
    answer: "We tailor advisory and implementation support to the organization’s goals. Contact us to discuss priorities and an appropriate scope."
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
    answer: "We build professional websites and digital experiences tailored to each organization. Share your goals on a discovery call and we will send a written scope and project-specific pricing by email."
  },
  {
    keywords: ["hands-on", "approach", "collaborative", "how do you work"],
    answer: "Yes, we work collaboratively with leadership teams to implement practical, actionable solutions."
  },
  {
    keywords: ["get started", "start", "begin", "first step", "consultation", "discovery"],
    answer: "Start with a discovery call to discuss your organization, goals and possible next steps. After booking, you will receive a fillable preparation form by email. We will send any proposed scope and pricing by email after the call and before paid work begins."
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
    answer: "We provide administrative support for business name registration, Ontario or federal incorporation, business-number and relevant CRA account setup, launch systems, websites, and digital services. We do not provide legal, tax, or accounting advice."
  },
  {
    keywords: ["price", "cost", "pricing", "how much", "fee", "rate", "payment", "pay"],
    answer: "Project-specific pricing is shared by email after a discovery call. You can review the scope and costs before deciding whether to authorize any paid work."
  },
  {
    keywords: ["grant", "grants", "funding", "financing", "loan", "loans", "line of credit"],
    answer: "We help identify suitable grant and business-financing opportunities, assess project readiness, and prepare applications. Book a discovery call to discuss your project; we share a recommended scope and its costs by email before paid work begins. Funders and lenders make the final decisions. See /grants-financing for the process."
  },
  {
    keywords: ["retainer", "monthly support", "ongoing support", "cancel retainer", "retainer terms"],
    answer: "Ongoing support is scoped to the work your organization needs. Contact us to discuss the right scope and pricing before work begins."
  },
  {
    keywords: ["contact", "email", "phone", "reach"],
    answer: "You can reach us at contact@performanceprocesses.com or call +1 (437) 425-4844. We'd love to hear from you!"
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon"],
    answer: "Hello! Welcome to Performance Processes. How can I help you today? Feel free to ask about our services, approach, or anything else."
  }
];

const FAQ_DATA_FR = [
  {
    keywords: ["qui êtes-vous", "performance processes", "à propos", "entreprise"],
    answer: "Performance Processes aide les entrepreneurs canadiens à incorporer, établir, organiser et lancer leur entreprise avec une stratégie, des systèmes et une présence numérique professionnels."
  },
  {
    keywords: ["services", "offrez", "proposez", "aidez", "aide"],
    answer: "Nous offrons du soutien à la formation d'entreprise, à l'incorporation et à la configuration de comptes de l'ARC, ainsi que des services de stratégie, de systèmes d'affaires, de sites web, de CRM et de présence numérique."
  },
  {
    keywords: ["incorporation", "incorporer", "enregistrer", "démarrer une entreprise", "numéro d'entreprise", "arc"],
    answer: "Nous offrons un soutien administratif pour l'incorporation en Ontario ou au fédéral, l'enregistrement d'un nom d'entreprise, le numéro d'entreprise de l'ARC et les comptes de programme pertinents. Les frais gouvernementaux sont distincts, et nous ne fournissons pas de conseils juridiques, fiscaux ou comptables."
  },
  {
    keywords: ["site web", "numérique", "présence en ligne", "marketing", "crm"],
    answer: "Nous concevons des sites web professionnels, configurons les outils de demande, de réservation, de paiement et de CRM, et aidons les nouvelles entreprises à bâtir une présence numérique prête pour leurs clients."
  },
  {
    keywords: ["prix", "coût", "tarifs", "combien", "paiement", "payer"],
    answer: "Les frais propres à chaque projet sont communiqués par courriel après un appel découverte. Vous pouvez examiner la portée et les coûts avant d’autoriser tout travail payant."
  },
  {
    keywords: ["subvention", "subventions", "financement", "prêt", "prêts", "marge de crédit"],
    answer: "Nous aidons à repérer les possibilités de subvention et de financement pertinentes, à évaluer la préparation du projet et à préparer les demandes. Réservez un appel découverte pour discuter du projet; nous transmettrons par courriel la portée recommandée et ses frais avant tout travail payant. Les bailleurs de fonds et prêteurs prennent la décision finale. Consultez /grants-financing pour voir notre démarche."
  },
  {
    keywords: ["mandat", "soutien mensuel", "résilier", "conditions du mandat"],
    answer: "Le soutien continu est défini selon les besoins de l’organisation. Communiquez avec nous pour discuter de la portée et des frais avant le début des travaux."
  },
  {
    keywords: ["commencer", "première étape", "consultation", "rendez-vous", "réserver"],
    answer: "La meilleure première étape est de réserver une consultation. Nous discuterons de votre idée, de votre stade actuel et des éléments à mettre en place en priorité."
  },
  {
    keywords: ["contact", "courriel", "téléphone", "joindre"],
    answer: "Vous pouvez nous écrire à contact@performanceprocesses.com ou nous appeler au +1 (437) 425-4844."
  },
  {
    keywords: ["bonjour", "salut", "bonsoir", "allo"],
    answer: "Bonjour! Bienvenue chez Performance Processes. Comment puis-je vous aider avec le lancement ou la mise en place de votre entreprise?"
  }
];

interface Message {
  role: "bot" | "user";
  text: string;
}

function findAnswer(input: string, language: "en" | "fr"): string | null {
  const lower = input.toLowerCase().trim();
  if (lower.length < 2) return null;

  let bestMatch: { score: number; answer: string } | null = null;
  const data = language === "fr" ? FAQ_DATA_FR : FAQ_DATA;

  for (const faq of data) {
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

const FALLBACK_MESSAGE = {
  en: "I'm not sure I can answer that one. For more detailed questions, please email us at contact@performanceprocesses.com and our team will be happy to help!",
  fr: "Je ne suis pas certain de pouvoir répondre à cette question. Pour une réponse détaillée, écrivez-nous à contact@performanceprocesses.com et notre équipe se fera un plaisir de vous aider."
};

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
  }, [isOpen, language]);

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
    const answer = findAnswer(trimmed, language);
    const botMsg: Message = { role: "bot", text: answer || FALLBACK_MESSAGE[language] };

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
          className="fixed bottom-6 right-6 z-50 h-14 px-6 rounded-full bg-accent text-white shadow-lg shadow-accent/30 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-xs font-bold uppercase tracking-widest"
          data-testid="button-open-chatbot"
        >
          {language === "fr" ? "Clavardage" : "Chat"}
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden" data-testid="chatbot-window">
          <div className="bg-primary px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-white text-xs font-black tracking-tight">PP</span>
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
              aria-label={language === "fr" ? "Fermer le clavardage" : "Close chat"}
            >
              <span aria-hidden="true" className="text-xl leading-none">&times;</span>
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
                  {msg.role === "bot" && msg.text === FALLBACK_MESSAGE[language] && (
                    <a
                      href="mailto:contact@performanceprocesses.com"
                      className="flex items-center gap-2 mt-3 text-accent font-bold text-xs hover:underline"
                      data-testid="link-chatbot-email"
                    >
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
                className="flex-1 bg-[#FAFAFA] border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:border-accent"
                data-testid="input-chatbot"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="h-10 px-4 rounded-full bg-accent text-white flex items-center justify-center hover:bg-primary transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed flex-shrink-0 text-[11px] font-bold uppercase tracking-widest"
                data-testid="button-send-chatbot"
                aria-label={language === "fr" ? "Envoyer le message" : "Send message"}
              >
                {language === "fr" ? "Envoyer" : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
