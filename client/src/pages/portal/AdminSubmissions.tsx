import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Mail, Briefcase, Award, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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

interface GrantApplication {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  province: string;
  occupation: string;
  companyOrOrg: string | null;
  industry: string;
  yearsExperience: string;
  focusArea: string;
  currentRole: string;
  teamSize: string | null;
  goals: string;
  challenges: string;
  hopeToAchieve: string;
  currentSystems: string;
  previousCoaching: string;
  commitment: string;
  howHeard: string;
  additionalInfo: string | null;
  status: string;
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

const focusAreaLabels: Record<string, string> = {
  leadership: "Leadership Development",
  "business-growth": "Business Growth",
  "career-advancement": "Career Advancement",
  productivity: "Productivity & Focus",
  "strategic-execution": "Strategic Goal Execution",
};

const statusColors: Record<string, string> = {
  new: "default",
  reviewing: "secondary",
  shortlisted: "outline",
  accepted: "default",
  declined: "destructive",
};

export default function AdminSubmissions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [contactSearch, setContactSearch] = useState("");
  const [appSearch, setAppSearch] = useState("");
  const [grantSearch, setGrantSearch] = useState("");
  const [expandedGrant, setExpandedGrant] = useState<number | null>(null);

  const { data: contacts = [], isLoading: contactsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contacts"],
  });

  const { data: applications = [], isLoading: appsLoading } = useQuery<JobApplication[]>({
    queryKey: ["/api/admin/applications"],
  });

  const { data: grantApps = [], isLoading: grantsLoading } = useQuery<GrantApplication[]>({
    queryKey: ["/api/admin/grant-applications"],
  });

  const updateGrantStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/grant-applications/${id}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/grant-applications"] });
      toast({ title: "Status updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update status", description: error.message, variant: "destructive" });
    },
  });

  const regularContacts = contacts.filter(
    (c) => !c.message.includes("[WOMEN'S PERFORMANCE GRANT APPLICATION]")
  );

  const filteredContacts = regularContacts.filter(
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

  const filteredGrants = grantApps.filter(
    (g) =>
      g.fullName.toLowerCase().includes(grantSearch.toLowerCase()) ||
      g.email.toLowerCase().includes(grantSearch.toLowerCase()) ||
      g.occupation.toLowerCase().includes(grantSearch.toLowerCase()) ||
      g.focusArea.toLowerCase().includes(grantSearch.toLowerCase())
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
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="contacts" className="flex items-center gap-2" data-testid="tab-contacts">
              <Mail size={16} />
              Contact ({regularContacts.length})
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2" data-testid="tab-applications">
              <Briefcase size={16} />
              Jobs ({applications.length})
            </TabsTrigger>
            <TabsTrigger value="grants" className="flex items-center gap-2" data-testid="tab-grants">
              <Award size={16} />
              Grants ({grantApps.length})
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
                              <span className="text-muted-foreground">—</span>
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

          <TabsContent value="grants" className="mt-6">
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="relative max-w-sm">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search grant applications..."
                    value={grantSearch}
                    onChange={(e) => setGrantSearch(e.target.value)}
                    className="pl-9"
                    data-testid="input-search-grants"
                  />
                </div>
              </div>
              {grantsLoading ? (
                <div className="p-8 text-center text-muted-foreground">Loading...</div>
              ) : filteredGrants.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No grant applications found</div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredGrants.map((g) => (
                    <div key={g.id} data-testid={`row-grant-${g.id}`}>
                      <div
                        className="flex items-center gap-4 px-4 py-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                        onClick={() => setExpandedGrant(expandedGrant === g.id ? null : g.id)}
                      >
                        <div className="shrink-0">
                          {expandedGrant === g.id ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-medium text-primary">{g.fullName}</span>
                            <a href={`mailto:${g.email}`} className="text-accent hover:underline text-sm" onClick={(e) => e.stopPropagation()}>{g.email}</a>
                          </div>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <span className="text-xs text-muted-foreground">{formatDate(g.createdAt)}</span>
                            <Badge variant="outline" className="text-xs">{focusAreaLabels[g.focusArea] || g.focusArea}</Badge>
                            <span className="text-xs text-muted-foreground">{g.occupation}</span>
                          </div>
                        </div>
                        <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                          <Select
                            value={g.status}
                            onValueChange={(status) => updateGrantStatus.mutate({ id: g.id, status })}
                          >
                            <SelectTrigger className="w-[130px] h-8 text-xs" data-testid={`select-grant-status-${g.id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="reviewing">Reviewing</SelectItem>
                              <SelectItem value="shortlisted">Shortlisted</SelectItem>
                              <SelectItem value="accepted">Accepted</SelectItem>
                              <SelectItem value="declined">Declined</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {expandedGrant === g.id && (
                        <div className="px-4 pb-6 pt-2 bg-secondary/20">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Personal Information</h4>
                                <div className="text-sm space-y-1">
                                  <p><span className="font-medium">Phone:</span> {g.phone}</p>
                                  <p><span className="font-medium">Location:</span> {g.city}, {g.province}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Professional Background</h4>
                                <div className="text-sm space-y-1">
                                  <p><span className="font-medium">Occupation:</span> {g.occupation}</p>
                                  {g.companyOrOrg && <p><span className="font-medium">Company:</span> {g.companyOrOrg}</p>}
                                  <p><span className="font-medium">Industry:</span> {g.industry}</p>
                                  <p><span className="font-medium">Experience:</span> {g.yearsExperience} years</p>
                                  {g.teamSize && <p><span className="font-medium">Team Size:</span> {g.teamSize}</p>}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Current Role</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{g.currentRole}</p>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">How They Heard About the Grant</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{g.howHeard}</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Goals</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{g.goals}</p>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Challenges</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{g.challenges}</p>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">What They Hope to Achieve</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{g.hopeToAchieve}</p>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Current Performance Systems</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{g.currentSystems}</p>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Previous Coaching Experience</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{g.previousCoaching}</p>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Commitment & Availability</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{g.commitment}</p>
                              </div>
                              {g.additionalInfo && (
                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Additional Information</h4>
                                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{g.additionalInfo}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
}
