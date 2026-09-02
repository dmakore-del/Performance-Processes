import { useState, useRef } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { cn } from "@/lib/utils";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Resource } from "@shared/schema";
import { usePortalI18n } from "@/lib/portal-i18n";

function getResourceLabel(resourceType: string) {
  const t = resourceType.toLowerCase();
  if (t.includes("pdf") || t.includes("guide")) return { label: "Guide", color: "text-zinc-700 border-zinc-200" };
  if (t.includes("template")) return { label: "Tmpl", color: "text-green-600 border-green-200" };
  if (t.includes("toolkit")) return { label: "Kit", color: "text-zinc-700 border-zinc-200" };
  if (t.includes("checklist")) return { label: "List", color: "text-orange-600 border-orange-200" };
  if (t.includes("video")) return { label: "Video", color: "text-red-600 border-red-200" };
  return { label: "Guide", color: "text-zinc-700 border-zinc-200" };
}

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { t } = usePortalI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isStaffOrAdmin = user?.role === "staff" || user?.role === "admin";

  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/portal/resources"],
  });

  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    resourceType: "",
    accessUrl: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [requestForm, setRequestForm] = useState({
    name: user?.fullName || "",
    email: user?.email || "",
    subject: "",
    message: "",
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof createForm) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("content", data.content);
      formData.append("category", data.category);
      formData.append("resourceType", data.resourceType);
      if (data.accessUrl) formData.append("accessUrl", data.accessUrl);
      if (selectedFile) formData.append("file", selectedFile);

      const res = await fetch("/api/portal/resources", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Failed to create resource" }));
        throw new Error(err.message);
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portal/resources"] });
      toast({ title: t("Resource created"), description: t("The resource has been added successfully.") });
      setCreateOpen(false);
      setCreateForm({ title: "", description: "", content: "", category: "", resourceType: "", accessUrl: "" });
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const requestMutation = useMutation({
    mutationFn: async (data: typeof requestForm) => {
      const res = await apiRequest("POST", "/api/contact", {
        name: data.name,
        email: data.email,
        subject: `Resource Request: ${data.subject}`,
        message: data.message,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: t("Request Sent"), description: t("Your resource request has been sent to the team. We'll get back to you soon.") });
      setRequestOpen(false);
      setRequestForm({ name: user?.fullName || "", email: user?.email || "", subject: "", message: "" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category)))];
  const filtered = selectedCategory === "All" ? resources : resources.filter((r) => r.category === selectedCategory);

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[400px]" data-testid="loading-resources">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary animate-pulse">{t("Loading")}</span>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2" data-testid="text-resources-title">{t("Resource Library")}</h1>
            <p className="text-lg text-muted-foreground" data-testid="text-resources-description">{t("Exclusive educational materials, templates, and guides to support your growth.")}</p>
          </div>
          {isStaffOrAdmin && (
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-add-resource" className="gap-2">
                  {t("Add Resource")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{t("Add Resource")}</DialogTitle>
                </DialogHeader>
                <form
                  className="space-y-4 pt-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    createMutation.mutate(createForm);
                  }}
                >
                  <div>
                    <Label htmlFor="create-title">{t("Title")}</Label>
                    <Input
                      id="create-title"
                      data-testid="input-resource-title"
                      value={createForm.title}
                      onChange={(e) => setCreateForm((f) => ({ ...f, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="create-description">{t("Description")}</Label>
                    <Input
                      id="create-description"
                      data-testid="input-resource-description"
                      value={createForm.description}
                      onChange={(e) => setCreateForm((f) => ({ ...f, description: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="create-content">{t("Content")}</Label>
                    <Textarea
                      id="create-content"
                      data-testid="input-resource-content"
                      value={createForm.content}
                      onChange={(e) => setCreateForm((f) => ({ ...f, content: e.target.value }))}
                      rows={5}
                      placeholder={t("Full resource content that users will see when they click the resource...")}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="create-category">{t("Category")}</Label>
                      <Input
                        id="create-category"
                        data-testid="input-resource-category"
                        value={createForm.category}
                        onChange={(e) => setCreateForm((f) => ({ ...f, category: e.target.value }))}
                        placeholder={t("e.g. Strategy, Leadership")}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="create-type">{t("Resource Type")}</Label>
                      <Input
                        id="create-type"
                        data-testid="input-resource-type"
                        value={createForm.resourceType}
                        onChange={(e) => setCreateForm((f) => ({ ...f, resourceType: e.target.value }))}
                        placeholder={t("e.g. PDF Guide, Template")}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="create-file">{t("Attach PDF or File")}</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <input
                        ref={fileInputRef}
                        id="create-file"
                        type="file"
                        accept=".pdf,.doc,.docx,.xlsx,.pptx"
                        className="hidden"
                        data-testid="input-resource-file"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={() => fileInputRef.current?.click()}
                        data-testid="button-choose-file"
                      >
                        {selectedFile ? t("Change File") : t("Choose File")}
                      </Button>
                      {selectedFile && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          {selectedFile.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="create-accessUrl">{t("External Link (optional)")}</Label>
                    <Input
                      id="create-accessUrl"
                      data-testid="input-resource-accessurl"
                      value={createForm.accessUrl}
                      onChange={(e) => setCreateForm((f) => ({ ...f, accessUrl: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  <Button type="submit" data-testid="button-submit-resource" disabled={createMutation.isPending} className="w-full">
                    {createMutation.isPending ? t("Creating...") : t("Create Resource")}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="flex flex-wrap gap-2" data-testid="filter-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              data-testid={`filter-category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest border transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
                 {cat === "All" ? t("All") : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="resources-grid">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="bg-white p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-all group flex flex-col justify-between min-h-[200px] cursor-pointer"
              data-testid={`card-resource-${res.id}`}
              onClick={() => {
                setSelectedResource(res);
                setDetailOpen(true);
              }}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 border border-border">
                  {(() => { const r = getResourceLabel(res.resourceType); return <span className={cn("text-[10px] font-black uppercase tracking-wider", r.color.split(" ")[0])}>{r.label}</span>; })()}
                </div>
                <h3 className="font-bold text-primary text-lg leading-tight mb-2 group-hover:text-accent transition-colors" data-testid={`text-resource-title-${res.id}`}>{res.title}</h3>
                {res.description && (
                  <p className="text-sm text-muted-foreground mb-3" data-testid={`text-resource-description-${res.id}`}>{res.description}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block bg-secondary text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-border" data-testid={`badge-resource-type-${res.id}`}>
                    {res.resourceType}
                  </span>
                  <span className="inline-block bg-zinc-100 text-zinc-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-zinc-200" data-testid={`badge-resource-category-${res.id}`}>
                    {res.category}
                  </span>
                  {res.fileUrl && (
                    <span className="inline-block bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-green-200">
                      PDF
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                 {t("Access Resource")}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground" data-testid="text-no-resources">
              {t("No resources found in this category.")}
            </div>
          )}
        </div>

        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedResource && (
              <>
                <DialogHeader>
                  <DialogTitle data-testid="text-detail-title">{selectedResource.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  {selectedResource.description && (
                    <p className="text-muted-foreground" data-testid="text-detail-description">{selectedResource.description}</p>
                  )}
                  {selectedResource.content ? (
                    <div className="bg-secondary/30 rounded-2xl p-6 border border-border" data-testid="text-detail-content">
                      <div className="prose prose-sm max-w-none text-primary">
                        {selectedResource.content.split("\n").map((paragraph, i) => (
                          paragraph.trim() ? <p key={i} className="mb-3 last:mb-0">{paragraph}</p> : <br key={i} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-secondary/30 rounded-2xl p-6 border border-border text-center">
                      {selectedResource.fileUrl ? (
                        <p className="text-sm text-muted-foreground">{t("Download the attached file to view the full content.")}</p>
                      ) : selectedResource.accessUrl ? (
                        <p className="text-sm text-muted-foreground">{t("Click the link below to access this resource.")}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">{t("Content is being prepared for this resource. Please check back soon or contact your consultant.")}</p>
                      )}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block bg-secondary text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-border">
                      {selectedResource.resourceType}
                    </span>
                    <span className="inline-block bg-zinc-100 text-zinc-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-zinc-200">
                      {selectedResource.category}
                    </span>
                  </div>
                  <div className="flex gap-3 pt-2">
                    {selectedResource.fileUrl && (
                      <Button asChild data-testid="button-download-resource">
                        <a href={selectedResource.fileUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                          {t("Download PDF")}
                        </a>
                      </Button>
                    )}
                    {selectedResource.accessUrl && (
                      <Button variant="outline" asChild data-testid="button-access-resource">
                        <a href={selectedResource.accessUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                          {t("Open Link")}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <div className="bg-primary text-white p-10 rounded-3xl shadow-xl mt-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <h3 className="text-2xl font-bold mb-4 relative z-10">{t("Looking for something specific?")}</h3>
          <p className="text-primary-foreground/80 mb-6 relative z-10 max-w-xl mx-auto">{t("Our consultants can curate specific resources or templates based on your current organizational challenges.")}</p>
          <button
            onClick={() => {
              setRequestForm({ name: user?.fullName || "", email: user?.email || "", subject: "", message: "" });
              setRequestOpen(true);
            }}
            className="relative z-10 bg-accent hover:bg-white hover:text-primary text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full transition-all"
            data-testid="button-request-resource"
          >
            {t("Request a Resource")}
          </button>
        </div>
      </div>

      <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
        <DialogContent className="max-w-md" data-testid="request-resource-dialog">
          <DialogHeader>
            <DialogTitle>{t("Request a Resource")}</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4 pt-2"
            onSubmit={(e) => {
              e.preventDefault();
              requestMutation.mutate(requestForm);
            }}
          >
            <div>
              <Label htmlFor="req-name">{t("Your Name")}</Label>
              <Input
                id="req-name"
                data-testid="input-request-name"
                value={requestForm.name}
                onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="req-email">{t("Your Email")}</Label>
              <Input
                id="req-email"
                type="email"
                data-testid="input-request-email"
                value={requestForm.email}
                onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="req-subject">{t("Resource Topic")}</Label>
              <Input
                id="req-subject"
                data-testid="input-request-subject"
                value={requestForm.subject}
                onChange={(e) => setRequestForm({ ...requestForm, subject: e.target.value })}
                placeholder={t("e.g. Change Management Framework, KPI Dashboard Template")}
                required
              />
            </div>
            <div>
              <Label htmlFor="req-message">{t("Details")}</Label>
              <Textarea
                id="req-message"
                data-testid="input-request-message"
                value={requestForm.message}
                onChange={(e) => setRequestForm({ ...requestForm, message: e.target.value })}
                placeholder={t("Describe what type of resource you're looking for and how you plan to use it...")}
                rows={4}
                required
              />
            </div>
            <Button
              type="submit"
              data-testid="button-submit-request"
              disabled={requestMutation.isPending}
              className="w-full bg-accent text-white hover:bg-primary gap-2"
            >
              {requestMutation.isPending ? t("Sending...") : t("Send Request")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
