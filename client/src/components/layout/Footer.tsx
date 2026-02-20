import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/">
              <a className="flex items-center gap-2 mb-6 text-white" data-testid="link-footer-logo">
                <div className="h-10 w-10 bg-white text-primary flex items-center justify-center font-heading font-bold text-xl leading-none">
                  PP
                </div>
                <span className="font-heading font-bold text-2xl tracking-tight">
                  Performance
                  <br />
                  Processes
                </span>
              </a>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              A registered business consulting firm helping organizations align strategy with measurable impact.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4 text-lg">Services</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">Strategic Planning & Alignment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Organizational Assessment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Performance Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Leadership Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Process Improvement</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business Registration & Governance</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4 text-lg">Company</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Approach</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">News & Insights</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4 text-lg">Connect</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <span className="font-semibold text-white">A:</span> 
                <span>123 Business Avenue, Suite 400<br/>Corporate District, CD 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-semibold text-white">P:</span> 
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-semibold text-white">E:</span> 
                <span>contact@performanceprocesses.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Performance Processes. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Legal Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
