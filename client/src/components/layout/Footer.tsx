import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#2e2e2e] text-white pt-24 pb-12 border-t-8 border-accent">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            <Link href="/">
              <a className="flex items-center gap-2 mb-8">
                <div className="h-10 w-10 bg-accent text-primary flex items-center justify-center font-heading font-black text-xl italic">
                  PP
                </div>
                <span className="font-heading font-black text-2xl tracking-tighter italic uppercase leading-none">
                  Performance<br/>Processes
                </span>
              </a>
            </Link>
          </div>

          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-gray-600 pb-4">Our Services</h3>
            <ul className="space-y-4 text-sm font-bold text-gray-300">
              <li><a href="#" className="hover:text-accent transition-colors">Strategic Planning</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Leadership Development</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Governance Guidance</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Process Improvement</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-gray-600 pb-4">About Us</h3>
            <ul className="space-y-4 text-sm font-bold text-gray-300">
              <li><a href="#" className="hover:text-accent transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Our Approach</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Insights</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-gray-600 pb-4">Contact</h3>
            <ul className="space-y-4 text-sm font-bold text-gray-300">
              <li>contact@performanceprocesses.com</li>
              <li>+1 (555) 123-4567</li>
              <div className="flex gap-4 pt-4">
                <a href="#" className="hover:text-accent">LinkedIn</a>
                <a href="#" className="hover:text-accent">Twitter</a>
              </div>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          <div className="flex flex-wrap gap-8">
            <p>© {new Date().getFullYear()} Performance Processes Consulting</p>
            <a href="#" className="hover:text-white transition-colors">Legal & Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
