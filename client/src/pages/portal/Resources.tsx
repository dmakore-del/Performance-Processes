import { useState } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { BookOpen, PlayCircle, Download, ExternalLink, CheckSquare, Loader2, MessageSquare, Plus } from "lucide-react";
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

function getResourceIcon(resourceType: string) {
  const t = resourceType.toLowerCase();
  if (t.includes("pdf") || t.includes("guide")) return <BookOpen size={24} className="text-blue-500" />;
  if (t.includes("template")) return <Download size={24} className="text-green-500" />;
  if (t.includes("toolkit")) return <ExternalLink size={24} className="text-purple-500" />;
  if (t.includes("checklist")) return <CheckSquare size={24} className="text-orange-500" />;
  if (t.includes("video")) return <PlayCircle size={24} className="text-red-500" />;
  return <BookOpen size={24} className="text-blue-500" />;
}

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

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
    fileUrl: "",
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof createForm) => {
      const res = await apiRequest("POST", "/api/portal/resources", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portal/resources"] });
      toast({ title: "Resource created", description: "The resource has been added successfully." });
      setCreateOpen(false);
      setCreateForm({ title: "", description: "", content: "", category: "", resourceType: "", fileUrl: "" });
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
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2" data-testid="text-resources-title">Resource Library</h1>
            <p className="text-lg text-muted-foreground" data-testid="text-resources-description">Exclusive educational materials, templates, and guides to support your growth.</p>
          </div>
          {isStaffOrAdmin && (
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-add-resource" className="gap-2">
                  <Plus size={16} />
                  Add Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add Resource</DialogTitle>
                </DialogHeader>
                <form
                  className="space-y-4 pt-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    createMutation.mutate(createForm);
                  }}
                >
                  <div>
                    <Label htmlFor="create-title">Title</Label>
                    <Input
                      id="create-title"
                      data-testid="input-resource-title"
                      value={createForm.title}
                      onChange={(e) => setCreateForm((f) => ({ ...f, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="create-description">Description</Label>
                    <Input
                      id="create-description"
                      data-testid="input-resource-description"
                      value={createForm.description}
                      onChange={(e) => setCreateForm((f) => ({ ...f, description: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="create-content">Content</Label>
                    <Textarea
                      id="create-content"
                      data-testid="input-resource-content"
                      value={createForm.content}
                      onChange={(e) => setCreateForm((f) => ({ ...f, content: e.target.value }))}
                      rows={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="create-category">Category</Label>
                    <Input
                      id="create-category"
                      data-testid="input-resource-category"
                      value={createForm.category}
                      onChange={(e) => setCreateForm((f) => ({ ...f, category: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="create-type">Resource Type</Label>
                    <Input
                      id="create-type"
                      data-testid="input-resource-type"
                      value={createForm.resourceType}
                      onChange={(e) => setCreateForm((f) => ({ ...f, resourceType: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="create-fileUrl">File URL (optional)</Label>
                    <Input
                      id="create-fileUrl"
                      data-testid="input-resource-fileurl"
                      value={createForm.fileUrl}
                      onChange={(e) => setCreateForm((f) => ({ ...f, fileUrl: e.target.value }))}
                    />
                  </div>
                  <Button type="submit" data-testid="button-submit-resource" disabled={createMutation.isPending} className="w-full">
                    {createMutation.isPending ? "Creating..." : "Create Resource"}
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
              {cat}
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
                  {getResourceIcon(res.resourceType)}
                </div>
                <h3 className="font-bold text-primary text-lg leading-tight mb-2 group-hover:text-accent transition-colors" data-testid={`text-resource-title-${res.id}`}>{res.title}</h3>
                {res.description && (
                  <p className="text-sm text-muted-foreground mb-3" data-testid={`text-resource-description-${res.id}`}>{res.description}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block bg-secondary text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-border" data-testid={`badge-resource-type-${res.id}`}>
                    {res.resourceType}
                  </span>
                  <span className="inline-block bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-blue-200" data-testid={`badge-resource-category-${res.id}`}>
                    {res.category}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                Access Resource
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground" data-testid="text-no-resources">
              No resources found in this category.
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
                  {selectedResource.content && (
                    <div className="prose prose-sm max-w-none" data-testid="text-detail-content">
                      {selectedResource.content.split("\n").map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block bg-secondary text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-border">
                      {selectedResource.resourceType}
                    </span>
                    <span className="inline-block bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-blue-200">
                      {selectedResource.category}
                    </span>
                  </div>
                  <div className="flex gap-3 pt-2">
                    {selectedResource.fileUrl && (
                      <Button asChild data-testid="button-download-resource">
                        <a href={selectedResource.fileUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                          <Download size={16} />
                          Download
                        </a>
                      </Button>
                    )}
                    {selectedResource.accessUrl && (
                      <Button variant="outline" asChild data-testid="button-access-resource">
                        <a href={selectedResource.accessUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                          <ExternalLink size={16} />
                          Access
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
          <h3 className="text-2xl font-bold mb-4 relative z-10">Looking for something specific?</h3>
          <p className="text-primary-foreground/80 mb-6 relative z-10 max-w-xl mx-auto">Our consultants can curate specific resources or templates based on your current organizational challenges.</p>
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="relative z-10 bg-accent hover:bg-white hover:text-primary text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full transition-all"
                data-testid="button-request-resource"
              >
                Request a Resource
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request a Resource</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <p className="text-muted-foreground">To request a specific resource, please send a message to your consultant through the Messages page describing what you're looking for.</p>
                <a
                  href="/portal/messages"
                  className="inline-flex items-center gap-2 bg-primary text-white font-bold uppercase tracking-widest text-sm px-6 py-3 rounded-full hover:bg-primary/90 transition-all"
                  data-testid="link-go-to-messages"
                >
                  <MessageSquare size={16} />
                  Go to Messages
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </PortalLayout>
  );
}
