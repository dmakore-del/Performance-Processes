import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { usePortalI18n } from "@/lib/portal-i18n";
import { PORTAL_SERVICES } from "@shared/portal-services";

export interface UserIntakeProfile {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  contactPhone?: string;
  businessLocation?: string;
  businessWebsite?: string;
  industry?: string;
  businessStage?: string;
  requestedServices?: string[];
  supportGoals?: string;
}
const formFromProfile = (profile: UserIntakeProfile) => ({
  fullName: profile.fullName, companyName: profile.companyName,
  contactPhone: profile.contactPhone || "", businessLocation: profile.businessLocation || "",
  businessWebsite: profile.businessWebsite || "", industry: profile.industry || "", supportGoals: profile.supportGoals || "",
});

export function UserProfileDialog({ profile }: { profile: UserIntakeProfile }) {
  const { fr } = usePortalI18n();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => formFromProfile(profile));
  const [error, setError] = useState("");
  const c = fr ? {
    profile: "Profil", title: "Renseignements du client", name: "Nom du contact", company: "Entreprise",
    email: "Courriel du compte", phone: "Téléphone", location: "Lieu d’activité", website: "Site web", industry: "Secteur",
    goals: "Priorités et besoins", stage: "Étape de l’entreprise", interests: "Services demandés à l’inscription",
    empty: "Non fourni", help: "À déterminer avec notre équipe", note: "Ces intérêts ne constituent pas une affectation de service ni une autorisation de travail.",
    edit: "Modifier le profil", save: "Enregistrer", saving: "Enregistrement…", cancel: "Annuler", failed: "Impossible de modifier le profil.",
  } : {
    profile: "Profile", title: "Client details", name: "Contact name", company: "Business name",
    email: "Account email", phone: "Phone", location: "Business location", website: "Website", industry: "Industry",
    goals: "Priorities and support needs", stage: "Business stage", interests: "Services requested at signup",
    empty: "Not provided", help: "Help deciding", note: "These interests do not assign a service or authorize work.",
    edit: "Edit profile", save: "Save changes", saving: "Saving…", cancel: "Cancel", failed: "Unable to update the profile.",
  };
  const stages: Record<string, string> = fr
    ? { planning: "En préparation", "pre-launch": "Prête à démarrer", operating: "En activité", growing: "En croissance", nonprofit: "Organisme sans but lucratif" }
    : { planning: "Planning", "pre-launch": "Preparing to launch", operating: "Operating", growing: "Growing", nonprofit: "Non-profit organization" };
  const save = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("PATCH", `/api/admin/users/${profile.id}/profile`, form);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portal/engagements"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setEditing(false);
      setOpen(false);
    },
    onError: (err: Error) => {
      try { setError(JSON.parse(err.message.replace(/^\d+:\s*/, "")).message || c.failed); }
      catch { setError(c.failed); }
    },
  });
  const fields = [
    ["fullName", c.name], ["companyName", c.company], ["contactPhone", c.phone],
    ["businessLocation", c.location], ["businessWebsite", c.website], ["industry", c.industry],
  ] as const;
  return (
    <Dialog open={open} onOpenChange={(next) => {
      setOpen(next); setEditing(false); setError(""); setForm(formFromProfile(profile));
    }}>
      <DialogTrigger asChild><Button size="sm" variant="outline" data-testid={`button-user-profile-${profile.id}`}>{c.profile}</Button></DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader><DialogTitle className="text-2xl font-heading font-normal">{c.title}</DialogTitle></DialogHeader>
        <form onSubmit={(event) => { event.preventDefault(); setError(""); save.mutate(); }} className="space-y-5">
          <div className="border-b border-border pb-3"><p className="text-xs text-muted-foreground">{c.email}</p><p className="break-all text-sm">{profile.email}</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(([key, label]) => (
              <div key={key}>
                {editing ? <><Label htmlFor={`profile-${profile.id}-${key}`} className="mb-1.5 block">{label}</Label>
                  <Input id={`profile-${profile.id}-${key}`} value={form[key]} type={key === "businessWebsite" ? "url" : key === "contactPhone" ? "tel" : "text"} required={key === "fullName" || key === "companyName"} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} /></>
                  : <><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 break-words text-sm">{profile[key] || c.empty}</p></>}
              </div>
            ))}
            <div><p className="text-xs text-muted-foreground">{c.stage}</p><p className="mt-1 text-sm">{stages[profile.businessStage || ""] || c.empty}</p></div>
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground">{c.interests}</p>
            <ul className="mt-2 space-y-1 text-sm">
              {profile.requestedServices?.length ? profile.requestedServices.map((id) => {
                const service = PORTAL_SERVICES.find((s) => s.id === id);
                return <li key={id}>{id === "not-sure-yet" ? c.help : service ? (fr ? service.fr : service.name) : id}</li>;
              }) : <li>{c.empty}</li>}
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">{c.note}</p>
          </div>
          <div>{editing ? <><Label htmlFor={`profile-goals-${profile.id}`} className="mb-1.5 block">{c.goals}</Label><textarea id={`profile-goals-${profile.id}`} value={form.supportGoals} maxLength={1200} rows={4} onChange={(event) => setForm((current) => ({ ...current, supportGoals: event.target.value }))} className="w-full border border-input px-3 py-2 text-sm" /></>
            : <><p className="text-xs text-muted-foreground">{c.goals}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6">{profile.supportGoals || c.empty}</p></>}</div>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <div className="flex flex-wrap gap-2 border-t border-border pt-4">
            {editing ? <><Button type="submit" disabled={save.isPending}>{save.isPending ? c.saving : c.save}</Button><Button type="button" variant="outline" disabled={save.isPending} onClick={() => { setEditing(false); setError(""); setForm(formFromProfile(profile)); }}>{c.cancel}</Button></>
              : <Button type="button" variant="outline" onClick={() => setEditing(true)}>{c.edit}</Button>}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
