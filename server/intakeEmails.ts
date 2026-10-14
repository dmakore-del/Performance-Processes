import nodemailer from "nodemailer";
import { intakeFields, type IntakeInput } from "@shared/intake";

const TEAM_EMAIL = "contact@performanceprocesses.com";
const APP_URL = "https://performanceprocesses.com";
let transport: nodemailer.Transporter | undefined;

function getTransport() {
  if (transport) return transport;
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) throw new Error("SMTP is not configured");
  const port = Number(process.env.SMTP_PORT || 587);
  transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transport;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]!);
}

export async function sendIntakeInvitation(input: {
  id: string; email: string; name: string; organization: string; callAt: Date;
  token: string;
}) {
  const date = input.callAt.toLocaleString("en-CA", {
    dateStyle: "long", timeStyle: "short", timeZone: "America/Toronto",
  });
  const url = `${APP_URL}/intake?kind=discovery#token=${encodeURIComponent(input.token)}`;
  const name = escapeHtml(input.name || "there");
  const organization = escapeHtml(input.organization || "your organization");
  const dateHtml = escapeHtml(date);
  await getTransport().sendMail({
    from: `"Performance Processes" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to: input.email,
    subject: "A short preparation form for your Performance Processes discovery call",
    text: `Hello ${input.name || "there"},\n\nThanks for booking a discovery call with Performance Processes for ${organization}. Please complete this short preparation form before we speak: ${url}\n\nCall time: ${date}\n\nPlease do not submit passwords, government ID numbers, bank account details or sensitive documents through this form.\n\nPerformance Processes\ncontact@performanceprocesses.com`,
    html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:32px auto;color:#191719;line-height:1.65"><h1 style="font-weight:500">Prepare for your discovery call</h1><p>Hello ${name},</p><p>Thanks for booking a discovery call with Performance Processes for ${organization}.</p><p><strong>Call time:</strong> ${dateHtml} (Toronto time)</p><p>Please complete the secure preparation form before we speak:</p><p><a href="${escapeHtml(url)}" style="display:inline-block;background:#e8b7c4;color:#191719;padding:14px 20px;text-decoration:none">Open the preparation form</a></p><p>Please do not submit passwords, government ID numbers, bank account details or sensitive documents through this form.</p><p>Questions? Contact <a href="mailto:${TEAM_EMAIL}">${TEAM_EMAIL}</a>.</p><p>Performance Processes</p></div>`,
  });
}

export async function sendIntakeSubmission(input: IntakeInput) {
  const labels = input.language === "fr" ? intakeFields[input.kind].map((field) => ({
    label: field.label.fr,
    section: field.section.fr,
    answer: input.answers[field.id] ?? "",
    option: field.options?.find((item) => item.value === input.answers[field.id])?.label.fr,
  })) : intakeFields[input.kind].map((field) => ({
    label: field.label.en,
    section: field.section.en,
    answer: input.answers[field.id] ?? "",
    option: field.options?.find((item) => item.value === input.answers[field.id])?.label.en,
  }));
  const sections = new Map<string, typeof labels>();
  for (const row of labels) {
    if (!row.answer) continue;
    sections.set(row.section, [...(sections.get(row.section) || []), row]);
  }
  const bodyText = [
    `Form: ${input.kind}`, `Name: ${input.name}`, `Email: ${input.email}`,
    `Organization: ${input.organization}`, `Phone: ${input.phone || "Not provided"}`,
    ...Array.from(sections.entries()).flatMap(([section, rows]) => [
      "", section, ...rows.map((row: typeof labels[number]) => `${row.label}: ${row.option || row.answer}`),
    ]),
  ].join("\n");
  const sectionHtml = Array.from(sections.entries()).map(([section, rows]) =>
    `<h2 style="font-size:17px;margin:24px 0 8px">${escapeHtml(section)}</h2><dl>${rows.map((row: typeof labels[number]) =>
      `<dt style="font-weight:bold">${escapeHtml(row.label)}</dt><dd style="margin:3px 0 14px;white-space:pre-wrap">${escapeHtml(row.option || row.answer)}</dd>`
    ).join("")}</dl>`
  ).join("");
  const subjectLabel = { discovery: "Discovery call", funding: "Funding readiness", health: "Business health check" }[input.kind];
  await getTransport().sendMail({
    from: `"Performance Processes Website" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to: TEAM_EMAIL,
    replyTo: input.email,
    subject: `New ${subjectLabel} form — ${input.organization}`,
    text: bodyText,
    html: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:24px auto;color:#191719;line-height:1.55"><h1>New ${escapeHtml(subjectLabel)} form</h1><p><strong>Name:</strong> ${escapeHtml(input.name)}<br><strong>Email:</strong> ${escapeHtml(input.email)}<br><strong>Organization:</strong> ${escapeHtml(input.organization)}<br><strong>Phone:</strong> ${escapeHtml(input.phone || "Not provided")}</p>${sectionHtml}<hr><p style="font-size:12px;color:#666">Submitted using the Performance Processes website. Treat these answers as confidential.</p></div>`,
  });
}
