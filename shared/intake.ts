import { z } from "zod";

export type IntakeKind = "discovery" | "funding" | "health";
export type Localized = { en: string; fr: string };
export type IntakeField = {
  id: string; label: Localized; section: Localized; type: "textarea" | "select" | "score";
  required: boolean; options?: { value: string; label: Localized }[];
};
const text = (en: string, fr: string): Localized => ({ en, fr });
const f = (id: string, en: string, fr: string, section: Localized, required = false): IntakeField =>
  ({ id, label: text(en, fr), section, type: "textarea", required });
const business = text("Business overview", "Votre entreprise");
const goals = text("Challenges and goals", "Défis et objectifs");
const practical = text("Tools, team and next steps", "Outils, équipe et prochaines étapes");
const readiness = text("Funding readiness", "Préparation au financement");
const project = text("Projects and funding preferences", "Projets et préférences de financement");
const select = (id: string, en: string, fr: string, section: Localized, options: [string, string, string][], required = false): IntakeField =>
  ({ ...f(id, en, fr, section, required), type: "select", options: options.map(([value, en, fr]) => ({ value, label: text(en, fr) })) });
const yesNo: [string,string,string][] = [["yes","Yes","Oui"],["partly","Partly / unsure","En partie / incertain"],["no","No","Non"],["discuss","Discuss privately","En discuter en privé"]];

export const discoveryFields: IntakeField[] = [
  f("overview","What does your organization do, and who are your customers or members?","Que fait votre organisation et qui sont vos clients ou membres?",business,true),
  f("teamSize","How many people work on marketing, operations, the website or growth?","Combien de personnes travaillent au marketing, aux opérations, au site web ou à la croissance?",business),
  f("challenges","What are your biggest current challenges?","Quels sont vos principaux défis actuels?",goals,true),
  f("inefficiencies","Where are time or money being spent inefficiently?","Où perdez-vous du temps ou de l’argent?",goals),
  f("tried","What have you already tried?","Qu’avez-vous déjà essayé?",goals),
  f("success","What would success look like in 3, 6 and 12 months?","À quoi ressemblerait la réussite dans 3, 6 et 12 mois?",goals,true),
  f("priorities","What quick wins or urgent priorities should come first?","Quelles améliorations rapides ou priorités urgentes faut-il aborder d’abord?",goals),
  f("tools","Which website, marketing, CRM, project management or HR tools do you use?","Quels outils web, marketing, CRM, de gestion de projets ou RH utilisez-vous?",practical),
  f("decisionMaker","Who will be the main contact and decision-maker?","Qui sera la personne-ressource et qui prendra les décisions?",practical),
  f("timeline","When would you ideally like to start?","Quand souhaitez-vous commencer?",practical),
  f("budget","What monthly or project budget range are you considering? (Optional)","Quelle fourchette de budget mensuel ou par projet envisagez-vous? (Facultatif)",practical),
  f("additional","Anything else we should know before the call?","Que devrions-nous savoir d’autre avant l’appel?",practical),
];
export const fundingFields: IntakeField[] = [
  f("legalName","Registered legal name and operating name","Dénomination sociale et nom commercial",business,true),
  select("structure","Business structure","Structure de l’entreprise",business,[["federal","Federal corporation","Société fédérale"],["provincial","Provincial corporation","Société provinciale"],["sole","Sole proprietor","Entreprise individuelle"],["partnership","Partnership","Société de personnes"],["nonprofit","Nonprofit","Organisme sans but lucratif"],["other","Other / unsure","Autre / incertain"]],true),
  f("location","Operating city, province and location type (leased, owned or shared)","Ville, province et type de locaux (loués, possédés ou partagés)",business,true),
  f("industry","Industry, products or services, and NAICS code if known","Secteur, produits ou services et code SCIAN si connu",business,true),
  f("operatingHistory","Year incorporated, year operations began and current operating status","Année de constitution, début des activités et situation actuelle",business),
  select("targetedPrograms","Would you like to discuss eligibility for targeted ownership programs privately?","Souhaitez-vous discuter en privé de votre admissibilité aux programmes de propriété ciblée?",business,yesNo),
  select("employees","Full-time equivalent employees","Employés équivalents temps plein",readiness,[["0-4","0–4","0–4"],["5-19","5–19","5–19"],["20-49","20–49","20–49"],["50+","50+","50+"],["unknown","Unknown","Inconnu"]]),
  select("revenue","Annual gross revenue range (optional)","Fourchette de revenus bruts annuels (facultatif)",readiness,[["under100","Under $100,000","Moins de 100 000 $"],["100-499","$100,000–$499,999","100 000 $ à 499 999 $"],["500-999","$500,000–$999,999","500 000 $ à 999 999 $"],["1m-5m","$1 million–$4.9 million","1 à 4,9 millions $"],["5m+","$5 million+","5 millions $ et plus"],["discuss","Prefer to discuss","Je préfère en discuter"]]),
  f("records","Years of filed tax returns / financial statements (do not attach records)","Années de déclarations fiscales ou d’états financiers disponibles (ne joignez aucun document)",readiness),
  select("documents","Could you supply registration, payroll and financial records securely if needed?","Pourriez-vous fournir de façon sécurisée les documents d’enregistrement, de paie et financiers au besoin?",readiness,yesNo),
  select("matchingFunds","Could you provide matching funds or pay costs before reimbursement?","Pourriez-vous fournir une mise de fonds ou payer avant remboursement?",readiness,yesNo),
  select("compliance","Are licences, permits and compliance requirements current?","Vos permis, licences et obligations de conformité sont-ils à jour?",readiness,yesNo),
  f("projects","Your top three projects, with estimated budgets and start / completion dates","Vos trois projets prioritaires, budgets estimés et dates de début et de fin",project,true),
  f("projectStatus","Project status and available quotes, job descriptions or training plans","État des projets et disponibilité de devis, descriptions de postes ou plans de formation",project),
  select("approvalFirst","Can you wait for program approval before incurring costs if required?","Pouvez-vous attendre l’approbation du programme avant d’engager les dépenses, au besoin?",project,yesNo),
  f("screening","Hiring or training plans, site upgrades, digital adoption, accessibility, expansion or other project categories","Embauche, formation, amélioration des locaux, adoption numérique, accessibilité, expansion ou autres catégories de projets",project),
  select("fundingTypes","Which funding types should we consider?","Quels types de financement devons-nous envisager?",project,[["grants","Grants only","Subventions seulement"],["subsidies","Grants, wage subsidies and rebates","Subventions, subventions salariales et remises"],["financing","Grants and financing","Subventions et financement"],["all","All relevant options","Toutes les options pertinentes"]],true),
  f("previousFunding","Previous public funding for the same project, if any (approximate amounts only)","Financement public antérieur du même projet, le cas échéant (montants approximatifs seulement)",project),
  f("criteria","Minimum funding amount, preferred timing and conditions or programs to exclude","Montant minimal, échéancier souhaité et conditions ou programmes à exclure",project),
  select("partnership","Would you consider a partnership with another eligible organization?","Envisageriez-vous un partenariat avec une autre organisation admissible?",project,yesNo),
  select("nextStep","What would you prefer next?","Quelle prochaine étape préférez-vous?",project,[["shortlist","Send a preliminary shortlist first","Recevoir d’abord une présélection"],["call","Discuss priorities before shortlisting","Discuter des priorités avant la présélection"]],true),
];
const healthGroups: {section: Localized; items: [string,string][]}[] = [
  {section:text("Website and digital presence","Site web et présence numérique"),items:[
    ["Website speed, accessibility and mobile experience","Vitesse, accessibilité et expérience mobile"],
    ["Clear value proposition and useful calls to action","Proposition de valeur claire et appels à l’action utiles"],
    ["Content updates, security patches and tested backups","Mises à jour, correctifs de sécurité et sauvegardes testées"],
    ["Accurate analytics and regular performance reviews","Analytique exacte et revues régulières des résultats"],
    ["Search visibility, metadata and indexation basics","Visibilité dans les moteurs de recherche, métadonnées et indexation"]]},
  {section:text("Marketing and lead generation","Marketing et génération de prospects"),items:[
    ["Documented content and offer strategy","Stratégie de contenu et d’offres documentée"],
    ["Effective lead capture forms and landing pages","Formulaires et pages de destination efficaces"],
    ["Relevant, permission-based follow-up sequences","Séquences de suivi pertinentes fondées sur le consentement"],
    ["Campaign measurement and return-on-investment reviews","Mesure des campagnes et examen du rendement"],
    ["Marketing and sales alignment on lead quality","Alignement du marketing et des ventes sur la qualité des prospects"]]},
  {section:text("CRM and sales systems","CRM et systèmes de vente"),items:[
    ["Centralized, accurate and deduplicated CRM records","Données CRM centralisées, exactes et dédoublonnées"],
    ["Timely lead routing and follow-up","Acheminement et suivi rapides des prospects"],
    ["Clear pipeline stages and forecasting","Étapes de vente claires et prévisions"],
    ["Connected marketing tools, forms and CRM","Connexion des outils marketing, formulaires et CRM"],
    ["Regular sales process and conversion reviews","Revue régulière du processus de vente et des conversions"]]},
  {section:text("Operations and automation","Opérations et automatisation"),items:[
    ["Accessible, documented standard operating procedures","Procédures opérationnelles documentées et accessibles"],
    ["Monitored automation of repetitive tasks","Automatisation surveillée des tâches répétitives"],
    ["Integrated tools with minimal duplicate data entry","Outils intégrés limitant la double saisie"],
    ["Reliable onboarding and offboarding processes","Processus fiables d’intégration et de départ"],
    ["Measured bottlenecks and assigned improvements","Points de blocage mesurés et améliorations attribuées"]]},
  {section:text("Team and growth capacity","Équipe et capacité de croissance"),items:[
    ["Clear KPIs and accountability rhythms","Indicateurs clairs et suivis des responsabilités"],
    ["Protected leadership time for strategic work","Temps réservé de la direction pour la stratégie"],
    ["Sufficient team capacity and skills","Capacité et compétences suffisantes de l’équipe"],
    ["Regular planning with clear owners and resources","Planification régulière avec responsables et ressources"],
    ["Access to external expertise when needed","Accès à une expertise externe au besoin"]]},
];
export const healthFields: IntakeField[] = healthGroups.flatMap((group, gi) => group.items.map(([en,fr], i) =>
  ({...f(`health_${gi}_${i}`,en,fr,group.section,true),type:"score" as const})));
export const intakeFields: Record<IntakeKind,IntakeField[]> = {discovery:discoveryFields,funding:fundingFields,health:healthFields};
export const intakeSchema = z.object({
  kind:z.enum(["discovery","funding","health"]), language:z.enum(["en","fr"]).default("en"),
  name:z.string().trim().min(2).max(120), email:z.string().trim().email().max(254),
  organization:z.string().trim().min(1).max(200), phone:z.string().trim().max(60).default(""),
  answers:z.record(z.string().max(2000)), consent:z.literal(true),
  invitationToken:z.string().max(200).optional(), requestId:z.string().uuid(),
  website:z.string().max(0).default(""),
}).superRefine((data,ctx)=>{
  const fields=intakeFields[data.kind];
  for (const key of Object.keys(data.answers)) if (!fields.some(f=>f.id===key)) ctx.addIssue({code:"custom",path:["answers",key],message:"Unknown field"});
  for(const field of fields) {
    const value=data.answers[field.id]?.trim() || "";
    if(field.required && !value) ctx.addIssue({code:"custom",path:["answers",field.id],message:"Required"});
    if(value && field.type==="score" && !/^[1-5]$/.test(value)) ctx.addIssue({code:"custom",path:["answers",field.id],message:"Choose a score from 1 to 5"});
    if(value && field.options && !field.options.some(o=>o.value===value)) ctx.addIssue({code:"custom",path:["answers",field.id],message:"Invalid choice"});
  }
});
export type IntakeInput = z.infer<typeof intakeSchema>;
export function healthResults(answers:Record<string,string>) {
  return healthGroups.map((group,gi)=> {
    const score=group.items.reduce((n,_,i)=>n+Number(answers[`health_${gi}_${i}`]||0),0);
    return {section:group.section,score,level:score<15?"priority":score<20?"foundation":"strong"};
  });
}
