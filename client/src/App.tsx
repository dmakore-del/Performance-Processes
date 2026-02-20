import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Approach from "./pages/Approach";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Sitemap from "./pages/Sitemap";
import Accessibility from "./pages/Accessibility";
import Careers from "./pages/Careers";

import Dashboard from "./pages/portal/Dashboard";
import Roadmap from "./pages/portal/Roadmap";
import Documents from "./pages/portal/Documents";
import Meetings from "./pages/portal/Meetings";
import Actions from "./pages/portal/Actions";
import Performance from "./pages/portal/Performance";
import Messages from "./pages/portal/Messages";
import Resources from "./pages/portal/Resources";
import Billing from "./pages/portal/Billing";

import { LanguageProvider } from "./hooks/use-language";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/approach" component={Approach} />
      <Route path="/contact" component={Contact} />
      <Route path="/legal" component={Legal} />
      <Route path="/sitemap" component={Sitemap} />
      <Route path="/accessibility" component={Accessibility} />
      <Route path="/careers" component={Careers} />
      
      {/* Portal Routes */}
      <Route path="/portal" component={Dashboard} />
      <Route path="/portal/roadmap" component={Roadmap} />
      <Route path="/portal/documents" component={Documents} />
      <Route path="/portal/meetings" component={Meetings} />
      <Route path="/portal/actions" component={Actions} />
      <Route path="/portal/performance" component={Performance} />
      <Route path="/portal/messages" component={Messages} />
      <Route path="/portal/resources" component={Resources} />
      <Route path="/portal/billing" component={Billing} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
