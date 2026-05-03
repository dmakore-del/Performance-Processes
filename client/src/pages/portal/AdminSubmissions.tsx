import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Briefcase, ExternalLink } from "lucide-react";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean | null;
  createdAt: string;
}

interface JobApplication {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedIn: string | null;
  coverLetter: string | null;
  resumeFilename: string;
  resumePath: string;
  position: string;
  createdAt: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminSubmissions() {
  const [contactSearch, setContactSearch] = useState("");
  const [appSearch, setAppSearch] = useState("");

  const { data: contacts = [], isLoading: contactsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contacts"],
  });

  const { data: applications = [], isLoading: appsLoading } = useQuery<JobApplication[]>({
    queryKey: ["/api/admin/applications"],
  });

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.message.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const filteredApps = applications.filter(
    (a) =>
      `${a.firstName} ${a.lastName}`.toLowerCase().includes(appSearch.toLowerCase()) ||
      a.email.toLowerCase().includes(appSearch.toLowerCase()) ||
      a.position.toLowerCase().includes(appSearch.toLowerCase())
  );

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-primary" data-testid="text-submissions-title">
            Submissions Tracker
          </h1>
          <p className="text-muted-foreground mt-1">View and manage all form submissions</p>
        </div>

        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-lg">
            <TabsTrigger value="contacts" className="flex items-center gap-2" data-testid="tab-contacts">
              <Mail size={16} />
              Contact ({contacts.length})
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2" data-testid="tab-applications">
              <Briefcase size={16} />
              Jobs ({applications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="mt-6">
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="relative max-w-sm">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search contacts..."
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    className="pl-9"
                    data-testid="input-search-contacts"
                  />
                </div>
              </div>
              {contactsLoading ? (
                <div className="p-8 text-center text-muted-foreground">Loading...</div>
              ) : filteredContacts.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No contact submissions found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-testid="table-contacts">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">Date</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">Name</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">Email</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">Message</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.map((c) => (
                        <tr key={c.id} className="border-b border-border hover:bg-secondary/30 transition-colors" data-testid={`row-contact-${c.id}`}>
                          <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{formatDate(c.createdAt)}</td>
                          <td className="px-4 py-3 font-medium text-primary">{c.name}</td>
                          <td className="px-4 py-3">
                            <a href={`mailto:${c.email}`} className="text-accent hover:underline">{c.email}</a>
                          </td>
                          <td className="px-4 py-3 max-w-md">
                            <p className="truncate text-muted-foreground">{c.message}</p>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={c.read ? "secondary" : "default"} data-testid={`badge-status-${c.id}`}>
                              {c.read ? "Read" : "New"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="mt-6">
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="relative max-w-sm">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search applications..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    className="pl-9"
                    data-testid="input-search-applications"
                  />
                </div>
              </div>
              {appsLoading ? (
                <div className="p-8 text-center text-muted-foreground">Loading...</div>
              ) : filteredApps.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No job applications found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-testid="table-applications">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">Date</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">Name</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">Email</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">Phone</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">Position</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">LinkedIn</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">Resume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApps.map((a) => (
                        <tr key={a.id} className="border-b border-border hover:bg-secondary/30 transition-colors" data-testid={`row-application-${a.id}`}>
                          <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{formatDate(a.createdAt)}</td>
                          <td className="px-4 py-3 font-medium text-primary">{a.firstName} {a.lastName}</td>
                          <td className="px-4 py-3">
                            <a href={`mailto:${a.email}`} className="text-accent hover:underline">{a.email}</a>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{a.phone}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline">{a.position}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            {a.linkedIn ? (
                              <a href={a.linkedIn} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-1">
                                <ExternalLink size={14} /> View
                              </a>
                            ) : (
                              <span className="text-muted-foreground">,</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-muted-foreground text-xs">{a.resumeFilename}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </PortalLayout>
  );
}
