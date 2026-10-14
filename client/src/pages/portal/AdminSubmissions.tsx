import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePortalI18n } from "@/lib/portal-i18n";
import type { GrantApplication } from "@shared/schema";

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
  const { t, formatDate } = usePortalI18n();
  const queryClient = useQueryClient();
  const [contactSearch, setContactSearch] = useState("");
  const [appSearch, setAppSearch] = useState("");
  const [fundingSearch, setFundingSearch] = useState("");

  const { data: contacts = [], isLoading: contactsLoading, isError: contactsError } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contacts"],
  });

  const { data: applications = [], isLoading: appsLoading, isError: appsError } = useQuery<JobApplication[]>({
    queryKey: ["/api/admin/applications"],
  });

  const { data: fundingSubmissions = [], isLoading: fundingLoading, isError: fundingError } = useQuery<GrantApplication[]>({
    queryKey: ["/api/admin/grant-applications"],
  });

  const updateFundingStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/admin/grant-applications/${id}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update funding submission");
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/grant-applications"] }),
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

  const filteredFunding = fundingSubmissions.filter((submission) =>
    [submission.fullName, submission.email, submission.companyOrOrg || "", submission.industry, submission.focusArea]
      .some((value) => value.toLowerCase().includes(fundingSearch.toLowerCase()))
  );
  const fundingStatuses = ["new", "reviewing", "contacted", "scheduled", "accepted", "declined"];
  const fundingStatusLabel: Record<string, string> = {
    new: t("New"),
    reviewing: t("Reviewing"),
    contacted: t("Contacted"),
    scheduled: t("Scheduled"),
    accepted: t("Accepted"),
    declined: t("Declined"),
  };

  if (contactsError || appsError || fundingError) {
    return <PortalLayout><div className="flex min-h-[400px] items-center justify-center"><p className="text-sm font-bold uppercase tracking-[0.2em] text-destructive">{t("Error")}</p></div></PortalLayout>;
  }

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-primary" data-testid="text-submissions-title">
            {t("Submissions Tracker")}
          </h1>
          <p className="text-muted-foreground mt-1">{t("View and manage all form submissions")}</p>
        </div>

        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="contacts" className="flex items-center gap-2" data-testid="tab-contacts">
              {t("Contact")} ({contacts.length})
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2" data-testid="tab-applications">
              {t("Jobs")} ({applications.length})
            </TabsTrigger>
            <TabsTrigger value="funding" className="flex items-center gap-2" data-testid="tab-funding">
              {t("Funding")} ({fundingSubmissions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="mt-6">
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="relative max-w-sm">
                  <Input
                    placeholder={t("Search contacts...")}
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    data-testid="input-search-contacts"
                  />
                </div>
              </div>
              {contactsLoading ? (
                <div className="p-8 text-center text-muted-foreground">{t("Loading...")}</div>
              ) : filteredContacts.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">{t("No contact submissions found")}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-testid="table-contacts">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Date")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Name")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Email")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Message")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Status")}</th>
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
                              {c.read ? t("Read") : t("New")}
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

          <TabsContent value="funding" className="mt-6">
            {updateFundingStatus.isError && (
              <p role="alert" className="mb-4 text-sm text-destructive">{t("Unable to update funding status. Please try again.")}</p>
            )}
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <Input
                  className="max-w-sm"
                  placeholder={t("Search funding submissions...")}
                  value={fundingSearch}
                  onChange={(event) => setFundingSearch(event.target.value)}
                  data-testid="input-search-funding"
                />
              </div>
              {fundingLoading ? (
                <div className="p-8 text-center text-muted-foreground">{t("Loading...")}</div>
              ) : filteredFunding.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">{t("No funding submissions found")}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-testid="table-funding-submissions">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Date")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Applicant")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Business")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Funding focus")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Status")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Details")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFunding.map((submission) => (
                        <tr key={submission.id} className="border-b border-border align-top" data-testid={`row-funding-${submission.id}`}>
                          <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                            {submission.createdAt ? formatDate(submission.createdAt) : "—"}
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-primary">{submission.fullName}</p>
                            <a href={`mailto:${submission.email}`} className="text-accent hover:underline">{submission.email}</a>
                            <p className="text-xs text-muted-foreground">{submission.phone}</p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium">{submission.companyOrOrg || "—"}</p>
                            <p className="text-xs text-muted-foreground">{submission.city}, {submission.province}</p>
                            <p className="text-xs text-muted-foreground">{submission.industry}</p>
                          </td>
                          <td className="px-4 py-3 min-w-40">{submission.focusArea}</td>
                          <td className="px-4 py-3 min-w-40">
                            <select
                              aria-label={`${t("Funding submission status")} ${submission.fullName}`}
                              className="h-9 w-full border border-border bg-background px-2 text-sm"
                              value={submission.status}
                              disabled={updateFundingStatus.isPending}
                              onChange={(event) => updateFundingStatus.mutate({ id: submission.id, status: event.target.value })}
                              data-testid={`select-funding-status-${submission.id}`}
                            >
                              {fundingStatuses.map((status) => (
                                <option key={status} value={status}>{fundingStatusLabel[status]}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3 min-w-56">
                            <details>
                              <summary className="cursor-pointer text-primary underline underline-offset-4">{t("View details")}</summary>
                              <div className="mt-3 space-y-2 text-xs leading-5 text-muted-foreground">
                                <p><strong>{t("Goals")}:</strong> {submission.goals}</p>
                                <p><strong>{t("Challenges")}:</strong> {submission.challenges}</p>
                                <p><strong>{t("Hopes to achieve")}:</strong> {submission.hopeToAchieve}</p>
                                <p><strong>{t("Current systems")}:</strong> {submission.currentSystems}</p>
                                {submission.additionalInfo && <p><strong>{t("Additional information")}:</strong> {submission.additionalInfo}</p>}
                              </div>
                            </details>
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
                  <Input
                    placeholder={t("Search applications...")}
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    data-testid="input-search-applications"
                  />
                </div>
              </div>
              {appsLoading ? (
                <div className="p-8 text-center text-muted-foreground">{t("Loading...")}</div>
              ) : filteredApps.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">{t("No job applications found")}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-testid="table-applications">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Date")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Name")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Email")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Phone")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Position")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("LinkedIn")}</th>
                        <th className="text-left px-4 py-3 font-bold text-muted-foreground">{t("Resume")}</th>
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
                                {t("View")}
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
