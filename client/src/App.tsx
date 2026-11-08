import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/use-auth";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import About from "./pages/About";
import { Redirect } from "wouter";
import Approach from "./pages/Approach";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Sitemap from "./pages/Sitemap";
import Accessibility from "./pages/Accessibility";
import Careers from "./pages/Careers";
import NextUpPartnership from "./pages/NextUpPartnership";
import Consulting from "./pages/Consulting";
import Recruiting from "./pages/Recruiting";
import Marketing from "./pages/Marketing";
import Solutions from "./pages/Solutions";
import ServiceLanding from "./pages/ServiceLanding";
import Results from "./pages/Results";
import LaunchService from "./pages/LaunchService";
import GrantsFinancing from "./pages/GrantsFinancing";
import ClientIntake from "./pages/ClientIntake";
import CampaignLanding from "./pages/CampaignLanding";
import PublicResources from "./pages/PublicResources";
import OurWork from "./pages/OurWork";
import BookConsultation from "./pages/BookConsultation";
import { acquisitionAttribution } from "./lib/acquisition";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import Dashboard from "./pages/portal/Dashboard";
import Roadmap from "./pages/portal/Roadmap";
import Documents from "./pages/portal/Documents";
import Meetings from "./pages/portal/Meetings";
import Actions from "./pages/portal/Actions";
import Performance from "./pages/portal/Performance";
import Messages from "./pages/portal/Messages";
import Resources from "./pages/portal/Resources";
import Billing from "./pages/portal/Billing";
import ProgressHub from "./pages/portal/ProgressHub";
import AdminUsers from "./pages/portal/AdminUsers";
import AdminSubmissions from "./pages/portal/AdminSubmissions";
import AdminReceipts from "./pages/portal/AdminReceipts";
import AdminBilling from "./pages/portal/AdminBilling";
import Leads from "./pages/portal/Leads";

function StaffOnlyPortalPage({ children, clientDestination }: { children: React.ReactNode; clientDestination: string }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  return user?.role === "client" ? <Redirect to={clientDestination} /> : <>{children}</>;
}

import { LanguageProvider } from "./hooks/use-language";
import { EngagementProvider } from "./hooks/use-portal";
import { Chatbot } from "./components/Chatbot";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (!location.startsWith("/portal") && location !== "/intake") acquisitionAttribution();
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo(0, 0);
        }
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
    <ScrollToTop />
    <Switch>
      <Route path="/">
        {() => window.location.hostname === "portal.performanceprocesses.com"
          ? <Redirect to="/portal/login" />
          : <Home />}
      </Route>
      <Route path="/about" component={About} />
      <Route path="/start-a-business" component={CampaignLanding} />
      <Route path="/grow-your-business" component={CampaignLanding} />
      <Route path="/our-work" component={OurWork} />
      <Route path="/resources" component={PublicResources} />
      <Route path="/book-consultation" component={BookConsultation} />
      <Route path="/business-setup" component={LaunchService} />
      <Route path="/websites-digital" component={LaunchService} />
      <Route path="/packages">{() => <Redirect to="/business-setup" />}</Route>
      <Route path="/funding-retainers">{() => <Redirect to="/grants-financing" />}</Route>
      <Route path="/grants-financing" component={GrantsFinancing} />
      <Route path="/intake" component={ClientIntake} />
      <Route path="/solutions">{() => <Redirect to="/business-setup" />}</Route>
      <Route path="/services">{() => <Redirect to="/" />}</Route>
      <Route path="/services/:slug">{() => <Redirect to="/business-setup" />}</Route>
      <Route path="/results">{() => <Redirect to="/our-work" />}</Route>
      <Route path="/approach">{() => <Redirect to="/about" />}</Route>
      <Route path="/contact" component={Contact} />
      <Route path="/legal" component={Legal} />
      <Route path="/sitemap" component={Sitemap} />
      <Route path="/accessibility" component={Accessibility} />
      <Route path="/careers" component={Careers} />
      <Route path="/news">{() => <Redirect to="/" />}</Route>
      <Route path="/insights">{() => <Redirect to="/" />}</Route>
      <Route path="/nextup-partnership" component={NextUpPartnership} />
      <Route path="/playbooks">{() => <Redirect to="/" />}</Route>
      <Route path="/assessment">{() => <Redirect to="/contact" />}</Route>
      <Route path="/training">{() => <Redirect to="/" />}</Route>
      <Route path="/consulting">{() => <Redirect to="/business-setup" />}</Route>
      <Route path="/recruiting">{() => <Redirect to="/business-setup" />}</Route>
      <Route path="/marketing">{() => <Redirect to="/websites-digital" />}</Route>
      <Route path="/pricing">{() => <Redirect to="/business-setup" />}</Route>
      <Route path="/free-audit">{() => <Redirect to="/contact" />}</Route>
      <Route path="/womens-performance-grant">{() => <Redirect to="/nextup-partnership" />}</Route>

      {/* Auth Routes */}
      <Route path="/portal/login" component={Login} />
      <Route path="/portal/register" component={Register} />
      <Route path="/portal/forgot-password" component={ForgotPassword} />

      {/* Protected Portal Routes */}
      <Route path="/portal">
        {() => <ProtectedRoute><Dashboard /></ProtectedRoute>}
      </Route>
      <Route path="/portal/progress">
        {() => <ProtectedRoute><ProgressHub /></ProtectedRoute>}
      </Route>
      <Route path="/portal/payments">
        {() => <ProtectedRoute><Billing /></ProtectedRoute>}
      </Route>
      <Route path="/portal/reports">
        {() => <ProtectedRoute><Performance /></ProtectedRoute>}
      </Route>
      <Route path="/portal/roadmap">
        {() => <ProtectedRoute><StaffOnlyPortalPage clientDestination="/portal/progress"><Roadmap /></StaffOnlyPortalPage></ProtectedRoute>}
      </Route>
      <Route path="/portal/documents">
        {() => <ProtectedRoute><StaffOnlyPortalPage clientDestination="/portal/progress"><Documents /></StaffOnlyPortalPage></ProtectedRoute>}
      </Route>
      <Route path="/portal/meetings">
        {() => <ProtectedRoute><Meetings /></ProtectedRoute>}
      </Route>
      <Route path="/portal/actions">
        {() => <ProtectedRoute><StaffOnlyPortalPage clientDestination="/portal/progress"><Actions /></StaffOnlyPortalPage></ProtectedRoute>}
      </Route>
      <Route path="/portal/performance">
        {() => <ProtectedRoute><StaffOnlyPortalPage clientDestination="/portal/reports"><Performance /></StaffOnlyPortalPage></ProtectedRoute>}
      </Route>
      <Route path="/portal/messages">
        {() => <ProtectedRoute><StaffOnlyPortalPage clientDestination="/portal/progress"><Messages /></StaffOnlyPortalPage></ProtectedRoute>}
      </Route>
      <Route path="/portal/resources">
        {() => <ProtectedRoute><StaffOnlyPortalPage clientDestination="/portal/progress"><Resources /></StaffOnlyPortalPage></ProtectedRoute>}
      </Route>
      <Route path="/portal/billing">
        {() => <Redirect to="/portal/payments" />}
      </Route>
      <Route path="/portal/admin/users">
        {() => <ProtectedRoute><AdminUsers /></ProtectedRoute>}
      </Route>
      <Route path="/portal/admin/submissions">
        {() => <ProtectedRoute><AdminSubmissions /></ProtectedRoute>}
      </Route>
      <Route path="/portal/admin/receipts">
        {() => <ProtectedRoute><AdminReceipts /></ProtectedRoute>}
      </Route>
      <Route path="/portal/admin/billing">
        {() => <ProtectedRoute><AdminBilling /></ProtectedRoute>}
      </Route>
      <Route path="/portal/leads">
        {() => <ProtectedRoute><Leads /></ProtectedRoute>}
      </Route>

      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function PublicChatbot() {
  const [path] = useLocation();
  return path.startsWith("/portal") ? null : <Chatbot />;
}

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <EngagementProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <PublicChatbot />
          </TooltipProvider>
        </EngagementProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
