import { PortalLayout } from "@/components/layout/PortalLayout";
import { Send, User } from "lucide-react";

export default function Messages() {
  return (
    <PortalLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2">Communication Center</h1>
          <p className="text-lg text-muted-foreground">Secure messaging with your consulting team.</p>
        </div>

        <div className="flex-1 bg-white rounded-3xl border border-border shadow-sm flex overflow-hidden">
          {/* Contacts Sidebar */}
          <div className="w-80 border-r border-border hidden md:flex flex-col bg-secondary/10">
            <div className="p-4 border-b border-border">
              <input type="text" placeholder="Search messages..." className="w-full bg-white border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-accent" />
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 border-b border-border bg-white cursor-pointer border-l-4 border-l-accent">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-primary text-sm">Project Channel</span>
                  <span className="text-[10px] text-muted-foreground">10:42 AM</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">Danai: The draft is ready for review.</p>
              </div>
              <div className="p-4 border-b border-border hover:bg-white cursor-pointer transition-colors border-l-4 border-l-transparent">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-primary text-sm">Danai Makore</span>
                  <span className="text-[10px] text-muted-foreground">Yesterday</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">Looking forward to our meeting.</p>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">PC</div>
                <div>
                  <h3 className="font-bold text-primary">Project Channel</h3>
                  <p className="text-xs text-muted-foreground">3 participants</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-[#F8FAFC] space-y-6">
              <div className="flex justify-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-border px-3 py-1 rounded-full">Today</span>
              </div>
              
              <div className="flex gap-4 max-w-2xl">
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0">
                  <User size={16} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-sm text-primary">Danai Makore</span>
                    <span className="text-[10px] text-muted-foreground">10:42 AM</span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-border shadow-sm text-sm text-primary">
                    Hi team, I've just uploaded the initial draft of the Strategic Objectives document to the Deliverables folder. Please review before our session tomorrow.
                  </div>
                </div>
              </div>

              <div className="flex gap-4 max-w-2xl ml-auto flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                  <User size={16} />
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline gap-2 mb-1 flex-row-reverse">
                    <span className="font-bold text-sm text-primary">John Doe (You)</span>
                    <span className="text-[10px] text-muted-foreground">11:15 AM</span>
                  </div>
                  <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-sm text-sm">
                    Thanks Danai. I will take a look this afternoon and add my comments directly to the document.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-border">
              <div className="flex items-center gap-3 bg-secondary/50 border border-border rounded-2xl p-2 focus-within:border-accent transition-colors">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 bg-transparent px-4 outline-none text-sm font-medium"
                />
                <button className="w-10 h-10 bg-accent text-white rounded-xl flex items-center justify-center hover:bg-primary transition-colors flex-shrink-0">
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