import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const BOOKINGS_URL = "https://calendar.app.google/XPzjxpJxMn1MjCqN7";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) {
      throw new Error('SMTP credentials not configured.');
    }
    transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  }
  return transporter;
}

function emailWrapper(content: string): string {
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #1e3a5f; padding: 24px 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">Performance Processes</h1>
        <p style="color: #a8c4e0; margin: 5px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Management Consulting</p>
      </div>
      <div style="padding: 30px 30px 20px;">
        ${content}
      </div>
      <div style="padding: 20px 30px; border-top: 1px solid #eee;">
        <p style="font-size: 13px; color: #333; margin: 0 0 4px;">Best regards,</p>
        <p style="font-size: 13px; color: #333; margin: 0 0 4px;"><strong>Danai Makore</strong></p>
        <p style="font-size: 12px; color: #666; margin: 0 0 2px;">Founder & Principal Consultant</p>
        <p style="font-size: 12px; color: #666; margin: 0;">Performance Processes</p>
      </div>
      <div style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 11px; color: #999;">
        <p style="margin: 0;">Performance Processes | Management Consulting</p>
        <p style="margin: 4px 0 0;"><a href="https://www.performanceprocesses.com" style="color: #1e3a5f; text-decoration: none;">www.performanceprocesses.com</a> | <a href="mailto:contact@performanceprocesses.com" style="color: #1e3a5f; text-decoration: none;">contact@performanceprocesses.com</a></p>
        <p style="margin: 4px 0 0;">+1 (437) 425-4844</p>
      </div>
    </div>
  `;
}

function ctaButton(text: string, url: string): string {
  return `<div style="text-align: center; margin: 24px 0;"><a href="${url}" style="display: inline-block; background: #ec4899; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; letter-spacing: 0.5px;">${text}</a></div>`;
}

async function sendEmail(to: string, subject: string, html: string, attachments?: nodemailer.SendMailOptions['attachments']): Promise<void> {
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
  const transport = getTransporter();
  await transport.sendMail({
    from: `"Performance Processes" <${fromEmail}>`,
    to,
    subject,
    html,
    attachments,
  });
  console.log(`Email sent to ${to}: ${subject}`);
}

export async function sendAuditChecklistEmail(recipientEmail: string, recipientName: string): Promise<void> {
  const checklistPath = path.resolve(process.cwd(), 'attached_assets/Process_&_People_Management_Audit_Checklist_1773432261017.pdf');
  let attachments: nodemailer.SendMailOptions['attachments'] = [];

  if (fs.existsSync(checklistPath)) {
    attachments = [{
      filename: 'Process_People_Management_Audit_Checklist.pdf',
      path: checklistPath,
      contentType: 'application/pdf',
    }];
  } else {
    console.error('Checklist PDF not found at:', checklistPath);
  }

  const firstName = recipientName.split(' ')[0];
  const html = emailWrapper(`
    <h2 style="color: #1e3a5f; font-size: 20px; margin: 0 0 16px;">Your Process & People Management Audit Checklist</h2>
    <p style="color: #333; font-size: 14px; line-height: 1.7;">Hi ${firstName},</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">Thank you for requesting the free Process & People Management Audit Checklist. Your checklist is attached to this email.</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">This checklist covers six critical areas of operational performance:</p>
    <ul style="color: #555; font-size: 14px; line-height: 1.9; padding-left: 20px;">
      <li><strong>Process Clarity</strong> — Are your workflows documented and consistent?</li>
      <li><strong>Operational Efficiency</strong> — Are there bottlenecks or redundancies?</li>
      <li><strong>Roles & Responsibilities</strong> — Are expectations and decision-making clear?</li>
      <li><strong>People Management Systems</strong> — Do managers have structured leadership processes?</li>
      <li><strong>Communication & Collaboration</strong> — Are teams aligned and meetings productive?</li>
      <li><strong>Leadership & Organizational Alignment</strong> — Do leaders have visibility into performance?</li>
    </ul>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">Take your time reviewing each section. If you'd like expert guidance on any areas where you identify gaps, we offer a <strong>free consultation</strong> to walk through your results and discuss improvement strategies.</p>
    ${ctaButton('Book Your Free Consultation', BOOKINGS_URL)}
    <p style="color: #888; font-size: 12px; line-height: 1.6; margin-top: 20px;">Over the next few days, I'll share additional insights on process improvement and people management that you may find valuable.</p>
  `);

  await sendEmail(recipientEmail, 'Your Process & People Management Audit Checklist', html, attachments);
}

export async function sendNurtureEmail2(recipientEmail: string, recipientName: string): Promise<void> {
  const firstName = recipientName.split(' ')[0];
  const html = emailWrapper(`
    <h2 style="color: #1e3a5f; font-size: 20px; margin: 0 0 16px;">Why Many Professionals Struggle with Processes</h2>
    <p style="color: #333; font-size: 14px; line-height: 1.7;">Hi ${firstName},</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">I hope you've had a chance to review the audit checklist. Today, I wanted to share some patterns we consistently see when working with organizations on their operational performance.</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">Most professionals and teams face three common challenges:</p>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 16px 0;">
      <p style="color: #333; font-size: 14px; line-height: 1.7; margin: 0 0 12px;"><strong>1. Unclear Workflows</strong></p>
      <p style="color: #555; font-size: 13px; line-height: 1.6; margin: 0 0 16px;">When processes evolve organically instead of being intentionally designed, teams end up with inconsistent methods for completing the same tasks. This leads to confusion, rework, and frustration.</p>
      <p style="color: #333; font-size: 14px; line-height: 1.7; margin: 0 0 12px;"><strong>2. Lack of Documentation</strong></p>
      <p style="color: #555; font-size: 13px; line-height: 1.6; margin: 0 0 16px;">When key processes live only in people's heads, the organization becomes dependent on specific individuals. Knowledge leaves when people do — creating operational risk.</p>
      <p style="color: #333; font-size: 14px; line-height: 1.7; margin: 0 0 12px;"><strong>3. Leadership Gaps</strong></p>
      <p style="color: #555; font-size: 13px; line-height: 1.6; margin: 0;">Without structured leadership and accountability systems, managers lack visibility into team performance. Feedback becomes reactive instead of proactive.</p>
    </div>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">The good news is that these are exactly the kinds of challenges that can be resolved with structured process design and people management systems.</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">If any of these patterns sound familiar, I'd be happy to explore what a structured improvement approach could look like for your situation.</p>
    ${ctaButton('Schedule a Free Consultation', BOOKINGS_URL)}
  `);

  await sendEmail(recipientEmail, 'Why many professionals struggle with processes', html);
}

export async function sendNurtureEmail3(recipientEmail: string, recipientName: string): Promise<void> {
  const firstName = recipientName.split(' ')[0];
  const html = emailWrapper(`
    <h2 style="color: #1e3a5f; font-size: 20px; margin: 0 0 16px;">The Hidden Cost of Inefficient Processes</h2>
    <p style="color: #333; font-size: 14px; line-height: 1.7;">Hi ${firstName},</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">One of the most common things we hear from clients is: <em>"We didn't realize how much inefficiency was costing us until we measured it."</em></p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">Inefficient processes don't just slow things down — they create compounding problems:</p>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 16px 0;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; vertical-align: top; width: 40px;"><span style="font-size: 20px;">⏱</span></td>
          <td style="padding: 10px 0 10px 12px; border-bottom: 1px solid #eee;"><strong style="color: #333; font-size: 14px;">Wasted Time</strong><br><span style="color: #555; font-size: 13px;">Teams spend hours on tasks that could take minutes with clearer processes and better systems.</span></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; vertical-align: top;"><span style="font-size: 20px;">😤</span></td>
          <td style="padding: 10px 0 10px 12px; border-bottom: 1px solid #eee;"><strong style="color: #333; font-size: 14px;">Leadership Frustration</strong><br><span style="color: #555; font-size: 13px;">Leaders can't improve what they can't see. Without structured systems, management decisions are based on assumptions rather than data.</span></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; vertical-align: top;"><span style="font-size: 20px;">❓</span></td>
          <td style="padding: 10px 0 10px 12px;"><strong style="color: #333; font-size: 14px;">Employee Confusion</strong><br><span style="color: #555; font-size: 13px;">When expectations aren't clear and processes are inconsistent, employees disengage. Clarity drives confidence and performance.</span></td>
        </tr>
      </table>
    </div>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">When workflows, accountability systems, and leadership structures are aligned, teams usually experience significant improvements in efficiency, clarity, and morale.</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">We help professionals and organizations design structured processes and people-management systems that create lasting results.</p>
    ${ctaButton('Book a Free Consultation', BOOKINGS_URL)}
  `);

  await sendEmail(recipientEmail, 'The hidden cost of inefficient processes', html);
}

export async function sendNurtureEmail4(recipientEmail: string, recipientName: string): Promise<void> {
  const firstName = recipientName.split(' ')[0];
  const html = emailWrapper(`
    <h2 style="color: #1e3a5f; font-size: 20px; margin: 0 0 16px;">What We'll Review in Your Free Audit</h2>
    <p style="color: #333; font-size: 14px; line-height: 1.7;">Hi ${firstName},</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">I wanted to give you a preview of what a free Process & People Management Audit consultation looks like — so you know exactly what to expect.</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">The session is a focused 20–30 minute conversation designed to:</p>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 16px 0;">
      <p style="color: #333; font-size: 14px; margin: 0 0 12px;"><strong>Step 1 — Understand Your Situation</strong></p>
      <p style="color: #555; font-size: 13px; line-height: 1.6; margin: 0 0 16px;">We'll discuss your current workflows, operational challenges, and how your team manages accountability and performance.</p>
      <p style="color: #333; font-size: 14px; margin: 0 0 12px;"><strong>Step 2 — Identify Pain Points</strong></p>
      <p style="color: #555; font-size: 13px; line-height: 1.6; margin: 0 0 16px;">I'll summarize what I hear and confirm the key areas where processes and systems can be strengthened.</p>
      <p style="color: #333; font-size: 14px; margin: 0 0 12px;"><strong>Step 3 — Provide Expert Insight</strong></p>
      <p style="color: #555; font-size: 13px; line-height: 1.6; margin: 0 0 16px;">I'll share observations based on what we've seen across organizations and professionals in similar situations.</p>
      <p style="color: #333; font-size: 14px; margin: 0 0 12px;"><strong>Step 4 — Outline Next Steps</strong></p>
      <p style="color: #555; font-size: 13px; line-height: 1.6; margin: 0;">If there's a fit, I'll propose a tailored approach for addressing the areas we discussed — with clear scope, timeline, and expected outcomes.</p>
    </div>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">There's no obligation and no pressure. The goal is to help you understand where improvements are possible and what structured solutions could look like.</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">If you're ready, you can book your free consultation at a time that works for you:</p>
    ${ctaButton('Book Your Free Consultation Now', BOOKINGS_URL)}
    <p style="color: #555; font-size: 14px; line-height: 1.7;">Looking forward to connecting with you.</p>
  `);

  await sendEmail(recipientEmail, 'What we will review in your free audit', html);
}

export async function sendContactConfirmation(recipientEmail: string, recipientName: string): Promise<void> {
  const firstName = recipientName.split(' ')[0];
  const html = emailWrapper(`
    <h2 style="color: #1e3a5f; font-size: 20px; margin: 0 0 16px;">Thank You for Reaching Out</h2>
    <p style="color: #333; font-size: 14px; line-height: 1.7;">Hi ${firstName},</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">Thank you for contacting Performance Processes. We've received your message and appreciate you taking the time to reach out.</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">Our team reviews every inquiry personally. You can expect a response within <strong>one business day</strong>.</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">In the meantime, if you'd like to book a free consultation to discuss your operational challenges, you can schedule a time that works for you:</p>
    ${ctaButton('Book a Free Consultation', BOOKINGS_URL)}
    <p style="color: #555; font-size: 14px; line-height: 1.7;">We look forward to learning more about how we can help.</p>
  `);

  await sendEmail(recipientEmail, 'Thank you for contacting Performance Processes', html);
}

export async function sendJobApplicationConfirmation(recipientEmail: string, firstName: string, lastName: string, position: string): Promise<void> {
  const html = emailWrapper(`
    <h2 style="color: #1e3a5f; font-size: 20px; margin: 0 0 16px;">Application Received — ${position}</h2>
    <p style="color: #333; font-size: 14px; line-height: 1.7;">Hi ${firstName},</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">Thank you for applying for the <strong>${position}</strong> position at Performance Processes. We've received your application and resume.</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">Our team will review your application carefully. If your background aligns with what we're looking for, we'll reach out to schedule a conversation.</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">We appreciate your interest in joining our team and will be in touch soon.</p>
  `);

  await sendEmail(recipientEmail, `Application Received — ${position} at Performance Processes`, html);
}

export async function sendSubscriberWelcome(recipientEmail: string): Promise<void> {
  const html = emailWrapper(`
    <h2 style="color: #1e3a5f; font-size: 20px; margin: 0 0 16px;">Welcome to Leadership Insights</h2>
    <p style="color: #333; font-size: 14px; line-height: 1.7;">Thank you for subscribing to Performance Processes insights.</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">You'll receive actionable frameworks, performance management strategies, and practical resources to help you and your organization perform at your best.</p>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">Here's a preview of what you can expect:</p>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 16px 0;">
      <ul style="color: #555; font-size: 14px; line-height: 1.9; padding-left: 16px; margin: 0;">
        <li>Process improvement strategies for professionals and teams</li>
        <li>Leadership and people management best practices</li>
        <li>Operational efficiency frameworks</li>
        <li>Accountability systems that drive performance</li>
        <li>Case studies from real consulting engagements</li>
      </ul>
    </div>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">When you're ready to discuss how we can support your business directly, book a complimentary strategy call:</p>
    ${ctaButton('Book a Strategy Call', BOOKINGS_URL)}
    <p style="color: #555; font-size: 14px; line-height: 1.7;">We're glad to have you with us.</p>
  `);

  await sendEmail(recipientEmail, 'Welcome to Performance Processes — Leadership Insights', html);
}
