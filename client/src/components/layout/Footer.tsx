import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-1">
            <Link href="/">
              <a className="flex items-center gap-2 mb-8 group">
                <div className="h-10 w-10 bg-accent text-white flex items-center justify-center font-heading font-black text-xl italic">
                  PP
                </div>
                <span className="font-heading font-black text-2xl tracking-tighter italic uppercase leading-none">
                  Performance<br/>Processes
                </span>
              </a>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Aligning strategy with measurable impact through collaborative, results-focused consulting.
            </p>
          </div>

          <div>
            <h3 className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-8">Quick Links</h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-accent transition-colors">Our Services</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Industries</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Insights</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-8">Support</h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Legal</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-accent text-xs font-black uppercase tracking-[0.3em] mb-8">Follow</h3>
            <div className="flex gap-6">
              <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-accent">LI</a>
              <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-accent">TW</a>
              <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-accent">FB</a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          <p>© {new Date().getFullYear()} Performance Processes. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
