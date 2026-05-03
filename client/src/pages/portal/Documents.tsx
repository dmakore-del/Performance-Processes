import { PortalLayout } from "@/components/layout/PortalLayout";
import { FileText, Download, FileSpreadsheet, FileIcon, FolderOpen, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePortalEngagement, usePortalData } from "@/hooks/use-portal";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import type { Document } from "@shared/schema";
import { useState, useRef } from "react";

export default function Documents() {
  const { engagementId, isLoading: engLoading } = usePortalEngagement();
  const { data: documents, isLoading: docsLoading } = usePortalData<Document[]>("documents", engagementId);
  const { toast } = useToast();
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [folderName, setFolderName] = useState("General");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLoading = engLoading || docsLoading;

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/portal/documents/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) {
        const text = (await res.text()) || res.statusText;
        throw new Error(`${res.status}: ${text}`);
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/portal/engagements/${engagementId}/documents`] });
      toast({ title: "Document uploaded", description: "Your file has been uploaded successfully." });
      setUploadOpen(false);
      setFolderName("General");
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    onError: (error: Error) => {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    },
  });

  const handleUploadSubmit = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast({ title: "No file selected", description: "Please select a file to upload.", variant: "destructive" });
      return;
    }
    if (!engagementId) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("engagementId", String(engagementId));
    formData.append("folder", folderName);
    uploadMutation.mutate(formData);
  };

  const handleDownload = (doc: Document) => {
    window.open(`/api/portal/documents/${doc.id}/download`, '_blank');
  };

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="text-red-500" size={24} />;
      case 'xlsx':
      case 'xls': return <FileSpreadsheet className="text-green-500" size={24} />;
      case 'docx':
      case 'doc': return <FileIcon className="text-blue-500" size={24} />;
      case 'pptx':
      case 'ppt': return <FileIcon className="text-orange-500" size={24} />;
      default: return <FileText className="text-gray-500" size={24} />;
    }
  };

  const folders = documents
    ? Object.entries(
        documents.reduce<Record<string, number>>((acc, doc) => {
          acc[doc.folder] = (acc[doc.folder] || 0) + 1;
          return acc;
        }, {})
      ).map(([name, count]) => ({ name, count }))
    : [];

  const filteredFiles = selectedFolder
    ? (documents || []).filter((d) => d.folder === selectedFolder)
    : documents || [];

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[400px]" data-testid="documents-loading">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PortalLayout>
    );
  }

  if (!engagementId && !engLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[400px]" data-testid="documents-empty-state">
          <div className="text-center space-y-4">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
            <h2 className="text-xl font-bold text-primary" data-testid="text-no-engagement">No active engagement</h2>
            <p className="text-muted-foreground" data-testid="text-no-engagement-desc">Your consultant will set up your engagement shortly.</p>
          </div>
        </div>
      </PortalLayout>
    );
  }

  const folderSuggestions = ["General", "Discovery Phase", "Strategic Engagement"];

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2" data-testid="text-documents-title">Deliverables & Documents</h1>
            <p className="text-lg text-muted-foreground" data-testid="text-documents-subtitle">Centralized access to all project materials and final reports.</p>
          </div>
          <Button
            className="rounded-full bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-xs px-6"
            onClick={() => setUploadOpen(true)}
            data-testid="button-upload-document"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>

        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogContent data-testid="dialog-upload">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-input">File</Label>
                <Input
                  id="file-input"
                  type="file"
                  ref={fileInputRef}
                  data-testid="input-file"
                />
              </div>
              <div>
                <Label htmlFor="folder-input">Folder</Label>
                <Input
                  id="folder-input"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="Enter folder name"
                  data-testid="input-folder"
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {folderSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`text-xs px-3 py-1 rounded-full border transition-colors ${folderName === s ? "bg-primary text-white border-primary" : "bg-secondary text-primary border-border hover:border-accent"}`}
                      onClick={() => setFolderName(s)}
                      data-testid={`button-folder-suggestion-${s.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                onClick={handleUploadSubmit}
                disabled={uploadMutation.isPending}
                className="w-full"
                data-testid="button-submit-upload"
              >
                {uploadMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Folders</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {folders.map((folder, i) => (
              <div
                key={i}
                className={`bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md hover:border-accent/30 transition-all cursor-pointer group ${
                  selectedFolder === folder.name ? "border-accent ring-2 ring-accent/20" : "border-border"
                }`}
                onClick={() => setSelectedFolder(selectedFolder === folder.name ? null : folder.name)}
                data-testid={`card-folder-${i}`}
              >
                <div className="flex items-center gap-3">
                  <FolderOpen className="text-accent group-hover:fill-accent/10 transition-colors" size={28} />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-primary text-sm truncate" data-testid={`text-folder-name-${i}`}>{folder.name}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1" data-testid={`text-folder-count-${i}`}>{folder.count} Files</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border bg-secondary/30 flex justify-between items-center">
            <h3 className="text-lg font-bold text-primary" data-testid="text-files-header">
              {selectedFolder ? selectedFolder : "All Files"}
            </h3>
            {selectedFolder && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedFolder(null)} data-testid="button-clear-folder-filter">
                Show All
              </Button>
            )}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" data-testid="table-documents">
              <thead>
                <tr className="border-b border-border bg-secondary/10">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground w-1/2">Name</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Date Uploaded</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Size</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Version</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted-foreground" data-testid="text-no-documents">
                      No documents found.
                    </td>
                  </tr>
                ) : (
                  filteredFiles.map((file) => (
                    <tr key={file.id} className="border-b border-border hover:bg-secondary/20 transition-colors group" data-testid={`row-document-${file.id}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          {getIcon(file.fileType)}
                          <span className="font-bold text-primary text-sm" data-testid={`text-document-name-${file.id}`}>{file.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-muted-foreground" data-testid={`text-document-date-${file.id}`}>
                        {file.uploadedAt ? new Date(file.uploadedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ","}
                      </td>
                      <td className="py-4 px-6 text-sm text-muted-foreground" data-testid={`text-document-size-${file.id}`}>{file.size}</td>
                      <td className="py-4 px-6">
                        <span className="bg-secondary px-2 py-1 rounded-md text-xs font-bold text-primary border border-border" data-testid={`text-document-version-${file.id}`}>{file.version}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-2 hover:bg-secondary rounded-lg text-primary hover:text-accent transition-colors"
                            onClick={() => handleDownload(file)}
                            data-testid={`button-download-${file.id}`}
                          >
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
