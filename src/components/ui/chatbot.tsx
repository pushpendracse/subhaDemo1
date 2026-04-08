"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  ts: Date;
  quickReplies?: string[];
}

const KB: { keywords: string[]; response: string; quickReplies?: string[] }[] = [
  {
    keywords: ["menu", "food", "dish", "price", "what do you serve", "cuisine", "eat"],
    response: "Our menu is composed across four acts:\n\n**Tasting Menus**\n• Grand Dégustation (8 courses) — $295 pp\n• Menu Découverte (5 courses) — $185 pp\n\n**Entrées**\n• Foie Gras Poêlé — $48\n• Carpaccio de Saint-Jacques — $42\n• Soupe à la Truffe Noire — $52\n\n**Plats Principaux**\n• Filet de Bœuf Rossini — $125\n• Homard Thermidor — $145\n• Sole Meunière Classique — $88\n\n**Desserts**\n• Soufflé au Chocolat Valrhona — $32\n• Mille-Feuille Caramel — $28\n\nAll dishes are prepared à la minute by Chef Dubois.",
    quickReplies: ["Book a Table", "Tasting Menu Details", "Wine Pairing", "Dietary Requirements"]
  },
  {
    keywords: ["reserve", "reservation", "book", "table", "booking", "available"],
    response: "We would be honoured to welcome you.\n\n**Dinner Service**\nTuesday – Sunday, 6:00 PM – 11:00 PM\n\n**Lunch Service**\nFriday – Sunday, 12:00 PM – 3:00 PM\n\n**To Reserve:**\n• Telephone: +1 (212) 555-0197\n• Email: reservations@maisondoree.com\n• Or use our online reservation system\n\nWe recommend reserving 2–4 weeks in advance for weekends. For the Chef's Table, please allow 4–6 weeks.",
    quickReplies: ["Call Reception", "Email Us", "Private Dining", "Cancellation Policy"]
  },
  {
    keywords: ["hours", "open", "close", "timing", "when", "monday", "weekend"],
    response: "**Our Hours**\n\nDinner: Tuesday – Sunday, 6:00 PM – 11:00 PM\nLunch: Friday – Sunday, 12:00 PM – 3:00 PM\n\nWe are closed on Mondays.\n\nThe kitchen accepts last orders 45 minutes before closing. The bar remains open until midnight on Fridays and Saturdays.",
    quickReplies: ["Reserve a Table", "Location Details", "Special Events"]
  },
  {
    keywords: ["location", "address", "where", "directions", "parking", "city"],
    response: "**Our Three Houses**\n\n🗽 **New York — Flagship**\n14 Rue de la Paix, Midtown Manhattan\n+1 (212) 555-0197\n\n🇬🇧 **London — Mayfair**\n8 Mount Street, Mayfair, W1K 3NF\n+44 20 7000 0197\n\n🇫🇷 **Paris — 8ème**\n22 Avenue Montaigne, 75008\n+33 1 55 00 01 97\n\nValet parking is available at all locations. We recommend arriving by taxi or private car service.",
    quickReplies: ["Get Directions", "Reserve New York", "Reserve London", "Reserve Paris"]
  },
  {
    keywords: ["private", "chef's table", "experience", "event", "celebration", "occasion"],
    response: "**Private Dining Experiences**\n\n🔥 **Chef's Table** — $450 pp\nAn intimate 6-seat evening in our kitchen with a bespoke 10-course menu. Friday & Saturday.\n\n🍷 **Cave Privée Dinner** — $380 pp\nOur 1920s wine cellar, seats up to 12 guests, guided cellar tour included.\n\n☀️ **Sunday Garden Brunch** — $145 pp\nTerrace dining with free-flow Laurent-Perrier champagne and a live string quartet.\n\n✨ **Carte Blanche** — $220 pp\nSurrender entirely to Chef Dubois — no menu, only the finest ingredients of the day.\n\nAll experiences are by appointment.",
    quickReplies: ["Book Chef's Table", "Wine Cellar Dinner", "Sunday Brunch", "Enquire"]
  },
  {
    keywords: ["membership", "member", "loyalty", "programme", "les amis"],
    response: "**Les Amis de la Maison**\n\nOur private circle of distinguished guests.\n\n⭐ **Membre** — Complimentary\nPriority reservations, birthday meal, 10% on private events.\n\n🥇 **Habitué** — $250/year\nReserved table, sommelier consultation, seasonal gift, dedicated concierge.\n\n💎 **Connaisseur** — $1,200/year\nPermanent alcove table, annual private dinner with Chef Dubois, quarterly wine cases, VIP access to all events.\n\nMembership applications are reviewed by our hospitality team.",
    quickReplies: ["Apply for Membership", "Habitué Details", "Connaisseur Benefits"]
  },
  {
    keywords: ["wine", "sommelier", "cellar", "pairing", "champagne", "bottle"],
    response: "**Our Cellar**\n\nClaire Moreau, our Head Sommelier, oversees a collection of 2,000 bottles — earning us the Wine Spectator Grand Award.\n\nWe offer:\n• Curated wine pairing with every tasting menu\n• À la carte selection spanning 14 countries\n• Champagne list featuring Dom Pérignon, Krug, and Taittinger\n• Rare vertical collections of Pomerol and Gevrey-Chambertin\n• Private cellar tours for Habitué and Connaisseur members\n\nOur sommelier is pleased to guide any selection.",
    quickReplies: ["Wine Pairing Menu", "Book Cellar Tour", "Private Dinner"]
  },
  {
    keywords: ["allergen", "allergy", "dietary", "vegetarian", "vegan", "gluten", "nut", "halal", "kosher"],
    response: "**Dietary & Allergen Information**\n\nChef Dubois and our kitchen take every allergy with the utmost seriousness.\n\nPlease inform us of any dietary requirements at the time of reservation. We are able to accommodate:\n• Vegetarian adaptations of the tasting menu\n• Gluten-free variations of several dishes\n• Nut allergies (complete kitchen protocol in place)\n• Halal requests (with 72 hours' notice)\n\nFull allergen information is available on request. Severe allergies should be communicated before arrival so our chef may prepare appropriately.",
    quickReplies: ["Reserve & Inform", "Speak to the Kitchen", "Menu Details"]
  },
  {
    keywords: ["cancel", "cancellation", "policy", "refund", "change"],
    response: "**Cancellation Policy**\n\nWe respectfully request:\n• Cancellations made 48+ hours in advance: No charge\n• Cancellations within 24–48 hours: 50% of the tasting menu price per guest\n• Same-day cancellations or no-shows: Full tasting menu price per guest\n\nFor private dining and chef's table reservations, a deposit of $150 per guest is required, refundable with 72 hours' notice.\n\nTo cancel or amend a reservation, please contact us at reservations@maisondoree.com or +1 (212) 555-0197.",
    quickReplies: ["Contact Reception", "Modify Reservation", "Policy Details"]
  },
  {
    keywords: ["dress", "code", "attire", "smart", "casual", "formal"],
    response: "**Dress Code**\n\nWe maintain a smart-elegant dress code in keeping with the atmosphere of Maison Dorée.\n\n• Gentlemen: Jacket required; tie encouraged for the main dining room\n• Ladies: Cocktail attire or elegant evening dress\n• Business casual is accepted for our Friday–Sunday lunch service\n• Sportswear, denim, and trainers are respectfully not permitted\n\nWe maintain a small selection of gentleman's jackets at the cloakroom for guests who require one.",
    quickReplies: ["Reserve a Table", "Our Story", "Other Questions"]
  },
  {
    keywords: ["chef", "dubois", "edouard", "team", "cook", "kitchen"],
    response: "**Chef Édouard Dubois**\n\nChef-Patron and founder of Maison Dorée, Édouard Dubois trained under Joël Robuchon in Paris and Heston Blumenthal in Bray before returning to New York in 1997 with a singular vision.\n\nFirst Michelin star: 2003\nSecond Michelin star: 2011\n\n*\"I do not cook for critics or awards. I cook for the moment when a guest closes their eyes at the first bite.\"*\n\nChef Dubois cooks every dinner service himself — an extraordinary commitment rarely maintained at this level.",
    quickReplies: ["Our Philosophy", "Tasting Menu", "Chef's Table"]
  },
  {
    keywords: ["human", "agent", "person", "speak", "talk", "call", "help", "manager"],
    response: "Of course — I will connect you with our hospitality team immediately.\n\n📞 **Telephone:** +1 (212) 555-0197\n📧 **Email:** reservations@maisondoree.com\n\nOur team is available:\nMonday – Sunday, 10:00 AM – 11:00 PM\n\nFor urgent matters outside these hours, please leave a message and we will respond within two hours.",
    quickReplies: ["Call Now", "Send Email", "Continue Chatting"]
  }
];

function findReply(input: string): { response: string; quickReplies?: string[] } {
  const lower = input.toLowerCase();
  for (const item of KB) {
    if (item.keywords.some((k) => lower.includes(k))) {
      return { response: item.response, quickReplies: item.quickReplies };
    }
  }
  return {
    response: "I am delighted to assist you. I can answer questions about:\n\n• Our menu and tasting experiences\n• Reservations and availability\n• Private dining and events\n• Wine and sommelier service\n• Membership — Les Amis de la Maison\n• Dietary requirements\n• Our team and philosophy\n\nWhat may I assist you with?",
    quickReplies: ["View Menu", "Reserve a Table", "Private Dining", "Membership", "Speak to Team"]
  };
}

function renderText(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <React.Fragment key={i}>
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
        {i < text.split("\n").length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export function Chatbot() {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState<Message[]>([]);
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  useEffect(() => {
    if (open && msgs.length === 0) {
      setTimeout(() => {
        setMsgs([{
          id: "welcome",
          text: "Welcome to Maison Dorée.\n\nI am your personal concierge, available around the clock. I can assist with reservations, menu enquiries, private dining, membership and anything else you may need.\n\nHow may I assist you this evening?",
          isBot: true,
          ts: new Date(),
          quickReplies: ["Reserve a Table", "View Menu", "Private Experiences", "Membership", "Our Story"]
        }]);
      }, 400);
    }
  }, [open, msgs.length]);

  const send = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text, isBot: false, ts: new Date() };
    setMsgs((p) => [...p, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = findReply(text);
      setMsgs((p) => [...p, { id: (Date.now() + 1).toString(), text: reply.response, isBot: true, ts: new Date(), quickReplies: reply.quickReplies }]);
      setTyping(false);
    }, 1200);
  }, []);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[var(--obsidian)] border border-[var(--gold)]/40 hover:border-[var(--gold)] shadow-2xl flex items-center justify-center transition-all duration-300 group"
        aria-label="Open concierge chat"
      >
        <MessageCircle className="w-5 h-5 text-[var(--gold)] group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--obsidian)]" />
      </button>

      {/* Chat panel */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[560px] bg-[var(--warm-white)] shadow-2xl flex flex-col overflow-hidden border border-[var(--parchment)]">
            {/* Header */}
            <div className="bg-[var(--obsidian)] px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 border border-[var(--gold)]/40 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[var(--gold)]" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-[var(--obsidian)]" />
                </div>
                <div>
                  <p className="text-white text-xs tracking-[0.2em] uppercase font-body">Concierge</p>
                  <p className="text-white/40 text-[0.55rem] tracking-widest">Maison Dorée · Always Available</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-px bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)]" />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
              {msgs.map((m) => (
                <div key={m.id} className={`flex ${m.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[85%]`}>
                    {m.isBot && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <Bot className="w-3 h-3 text-[var(--gold)]" />
                        <span className="text-[0.55rem] tracking-widest uppercase text-[var(--text-muted)]">Concierge</span>
                      </div>
                    )}
                    <div className={`px-4 py-3 text-xs leading-relaxed ${
                      m.isBot
                        ? "bg-white border border-[var(--parchment)] text-[var(--text-primary)]"
                        : "bg-[var(--obsidian)] text-white"
                    }`}>
                      {renderText(m.text)}
                    </div>
                    {m.quickReplies && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {m.quickReplies.map((r) => (
                          <button
                            key={r}
                            onClick={() => send(r)}
                            className="text-[0.58rem] tracking-[0.15em] uppercase px-3 py-1.5 border border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--obsidian)] transition-colors"
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    )}
                    <p className="text-[0.55rem] text-[var(--text-muted)]/50 mt-1 text-right">
                      {m.ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[var(--parchment)] px-4 py-3">
                    <div className="flex gap-1.5 items-center h-3">
                      {[0, 150, 300].map((d) => (
                        <span key={d} className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 border-t border-[var(--parchment)] bg-[var(--ivory)] px-4 py-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  placeholder="Ask anything…"
                  disabled={typing}
                  className="flex-1 bg-white border border-[var(--parchment)] px-3 py-2.5 text-xs placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || typing}
                  className="w-10 h-10 bg-[var(--obsidian)] flex items-center justify-center disabled:opacity-30 hover:bg-[var(--gold)] hover:text-[var(--obsidian)] transition-colors group"
                >
                  <Send className="w-3.5 h-3.5 text-[var(--gold)] group-hover:text-[var(--obsidian)]" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2 text-[0.55rem] text-[var(--text-muted)]/50">
                <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" />24/7 Available</span>
                <span className="flex items-center gap-1"><Phone className="w-2.5 h-2.5" />+1 (212) 555-0197</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
