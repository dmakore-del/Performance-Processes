import { PortalLayout } from "@/components/layout/PortalLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, CheckCircle2, Clock, ShieldAlert, Users, Shield, UserCheck, UserX, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  companyName: string;
  role: string;
  status: string;
  twoFactorEnabled: boolean;
  createdAt: string;
}

export default function AdminUsers() {
  const [filter, setFilter] = useState<"all" | "pending_approval" | "active" | "suspended">("all");
  const [roleDropdownId, setRoleDropdownId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: users, isLoading } = useQuery<AdminUser[]>({
    queryKey: ["/api/admin/users"],
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${id}/status`, { status });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: `User ${data.fullName} status updated to ${data.status}` });
    },
  });

  const roleMutation = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${id}/role`, { role });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setRoleDropdownId(null);
      toast({ title: `User ${data.fullName} role updated to ${data.role}` });
    },
  });

  const filteredUsers = users?.filter(u => filter === "all" || u.status === filter) || [];
  const pendingCount = users?.filter(u => u.status === "pending_approval").length || 0;
  const activeCount = users?.filter(u => u.status === "active").length || 0;
  const suspendedCount = users?.filter(u => u.status === "suspended").length || 0;

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-accent" size={40} />
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 data-testid="text-admin-users-title" className="text-3xl md:text-4xl font-heading font-extrabold text-primary mb-2">User Management</h1>
          <p className="text-lg text-muted-foreground">Manage user accounts, approve staff, and control access.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button onClick={() => setFilter("all")} data-testid="filter-all" className={cn("p-5 rounded-2xl border shadow-sm text-left transition-all", filter === "all" ? "bg-primary text-white border-primary" : "bg-white border-border hover:border-accent/30")}>
            <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-1", filter === "all" ? "text-white/70" : "text-muted-foreground")}>All Users</p>
            <p className="text-3xl font-black">{users?.length || 0}</p>
          </button>
          <button onClick={() => setFilter("pending_approval")} data-testid="filter-pending" className={cn("p-5 rounded-2xl border shadow-sm text-left transition-all", filter === "pending_approval" ? "bg-orange-500 text-white border-orange-500" : "bg-white border-border hover:border-orange-300")}>
            <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-1", filter === "pending_approval" ? "text-white/70" : "text-orange-500")}>Pending</p>
            <p className="text-3xl font-black">{pendingCount}</p>
          </button>
          <button onClick={() => setFilter("active")} data-testid="filter-active" className={cn("p-5 rounded-2xl border shadow-sm text-left transition-all", filter === "active" ? "bg-green-500 text-white border-green-500" : "bg-white border-border hover:border-green-300")}>
            <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-1", filter === "active" ? "text-white/70" : "text-green-600")}>Active</p>
            <p className="text-3xl font-black">{activeCount}</p>
          </button>
          <button onClick={() => setFilter("suspended")} data-testid="filter-suspended" className={cn("p-5 rounded-2xl border shadow-sm text-left transition-all", filter === "suspended" ? "bg-red-500 text-white border-red-500" : "bg-white border-border hover:border-red-300")}>
            <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-1", filter === "suspended" ? "text-white/70" : "text-red-500")}>Suspended</p>
            <p className="text-3xl font-black">{suspendedCount}</p>
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border bg-secondary/30">
            <h3 className="text-lg font-bold text-primary">
              {filter === "all" ? "All Users" : filter === "pending_approval" ? "Pending Approval" : filter === "active" ? "Active Users" : "Suspended Users"}
            </h3>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center">
              <Users size={48} className="text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No users found in this category.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-secondary/10">
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">User</th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Company</th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Role</th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">2FA</th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Joined</th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => {
                    const initials = u.fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
                    return (
                      <tr key={u.id} data-testid={`row-user-${u.id}`} className="border-b border-border hover:bg-secondary/20 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">{initials}</div>
                            <div>
                              <p className="font-bold text-primary text-sm">{u.fullName}</p>
                              <p className="text-xs text-muted-foreground">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">{u.companyName}</td>
                        <td className="py-4 px-6 relative">
                          <button
                            onClick={() => setRoleDropdownId(roleDropdownId === u.id ? null : u.id)}
                            className={cn(
                              "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border flex items-center gap-1",
                              u.role === "admin" ? "bg-purple-50 text-purple-600 border-purple-200" :
                              u.role === "staff" ? "bg-blue-50 text-blue-600 border-blue-200" :
                              "bg-secondary text-primary border-border"
                            )}
                          >
                            {u.role} <ChevronDown size={10} />
                          </button>
                          {roleDropdownId === u.id && (
                            <div className="absolute top-full left-6 z-50 mt-1 bg-white rounded-xl border border-border shadow-lg p-1 min-w-[120px]">
                              {["client", "staff", "admin"].map(role => (
                                <button
                                  key={role}
                                  onClick={() => roleMutation.mutate({ id: u.id, role })}
                                  className={cn("w-full text-left px-3 py-2 text-xs font-bold rounded-lg hover:bg-secondary transition-colors capitalize", u.role === role && "bg-secondary")}
                                >
                                  {role}
                                </button>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <span className={cn(
                            "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border",
                            u.status === "active" ? "bg-green-50 text-green-600 border-green-200" :
                            u.status === "pending_approval" ? "bg-orange-50 text-orange-600 border-orange-200" :
                            "bg-red-50 text-red-600 border-red-200"
                          )}>
                            {u.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          {u.twoFactorEnabled ? (
                            <Shield size={16} className="text-green-500" />
                          ) : (
                            <span className="text-xs text-muted-foreground">Off</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-sm text-muted-foreground">
                          {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-end gap-2">
                            {u.status === "pending_approval" && (
                              <Button
                                size="sm"
                                data-testid={`button-approve-${u.id}`}
                                onClick={() => statusMutation.mutate({ id: u.id, status: "active" })}
                                disabled={statusMutation.isPending}
                                className="bg-green-500 hover:bg-green-600 text-white text-xs h-8 rounded-lg"
                              >
                                <UserCheck size={14} className="mr-1" /> Approve
                              </Button>
                            )}
                            {u.status === "active" && u.role !== "admin" && (
                              <Button
                                size="sm"
                                variant="outline"
                                data-testid={`button-suspend-${u.id}`}
                                onClick={() => statusMutation.mutate({ id: u.id, status: "suspended" })}
                                disabled={statusMutation.isPending}
                                className="text-red-500 border-red-200 hover:bg-red-50 text-xs h-8 rounded-lg"
                              >
                                <UserX size={14} className="mr-1" /> Suspend
                              </Button>
                            )}
                            {u.status === "suspended" && (
                              <Button
                                size="sm"
                                data-testid={`button-activate-${u.id}`}
                                onClick={() => statusMutation.mutate({ id: u.id, status: "active" })}
                                disabled={statusMutation.isPending}
                                className="bg-blue-500 hover:bg-blue-600 text-white text-xs h-8 rounded-lg"
                              >
                                <UserCheck size={14} className="mr-1" /> Activate
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
