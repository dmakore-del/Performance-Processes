import { PortalLayout } from "@/components/layout/PortalLayout";
import { FileText, Download, FileSpreadsheet, FileIcon, FolderOpen, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Documents() {
  const folders = [
    { name: "01_Discovery_Assessment", count: 4 },
    { name: "02_Strategic_Design", count: 2 },
    { name: "03_Governance_Templates", count: 5 },
    { name: "04_Meeting_Notes", count: 8 },
  ];

  const files = [
    { name: "Organizational_Assessment_Report_Final.pdf", type: "pdf", date: "Oct 2, 2026", size: "3.4 MB", version: "v1.2" },
    { name: "Strategic_Objectives_Draft_Review.docx", type: "doc", date: "Oct 8, 2026", size: "1.1 MB", version: "v0.9" },
    { name: "Stakeholder_Interview_Synthesis.pdf", type: "pdf", date: "Sep 28, 2026", size: "2.1 MB", version: "v1.0" },
    { name: "KPI_Framework_Template.xlsx", type: "xls", date: "Oct 1, 2026", size: "850 KB", version: "v1.0" },
    { name: "Vision_Mission_Workshop_Deck.pptx", type: "doc", date: "Oct 5, 2026", size: "5.6 MB", version: "v1.1" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-500" size={24} />;
      case 'xls': return <FileSpreadsheet className="text-green-500" size={24} />;
      case 'doc': return <FileIcon className="text-blue-500" size={24} />;
      default: return <FileText className="text-gray-500" size={24} />;
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2">Deliverables & Documents</h1>
            <p className="text-lg text-muted-foreground">Centralized access to all project materials and final reports.</p>
          </div>
          <Button className="rounded-full bg-primary text-white hover:bg-accent font-bold uppercase tracking-wider text-xs px-6">
            Upload Document
          </Button>
        </div>

        {/* Folders */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Folders</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {folders.map((folder, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-accent/30 transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <FolderOpen className="text-accent group-hover:fill-accent/10 transition-colors" size={28} />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-primary text-sm truncate">{folder.name}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{folder.count} Files</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Files */}
        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border bg-secondary/30 flex justify-between items-center">
            <h3 className="text-lg font-bold text-primary">All Files</h3>
            <div className="flex gap-2">
              {/* Filter/Sort could go here */}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
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
                {files.map((file, i) => (
                  <tr key={i} className="border-b border-border hover:bg-secondary/20 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        {getIcon(file.type)}
                        <span className="font-bold text-primary text-sm">{file.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{file.date}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{file.size}</td>
                    <td className="py-4 px-6">
                      <span className="bg-secondary px-2 py-1 rounded-md text-xs font-bold text-primary border border-border">{file.version}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-secondary rounded-lg text-primary hover:text-accent transition-colors">
                          <Download size={18} />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}