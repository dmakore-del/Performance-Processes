import nodemailer from 'nodemailer';

const ADMIN_EMAIL = 'contact@performanceprocesses.com';

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

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return transporter;
}

async function sendNotificationEmail(subject: string, htmlBody: string) {
  try {
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
    const transport = getTransporter();

    await transport.sendMail({
      from: `"Performance Processes" <${fromEmail}>`,
      to: ADMIN_EMAIL,
      subject,
      html: htmlBody,
    });

    console.log(`Notification email sent to ${ADMIN_EMAIL}: ${subject}`);
  } catch (error: any) {
    console.error(`Failed to send notification email (${subject}):`, error?.message || error);
  }
}

function wrapHtml(title: string, content: string): string {
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #1e3a5f; padding: 24px 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Performance Processes</h1>
        <p style="color: #a8c4e0; margin: 5px 0 0; font-size: 13px;">${title}</p>
      </div>
      <div style="padding: 30px;">
        ${content}
      </div>
      <div style="background: #f0f0f0; padding: 12px; text-align: center; font-size: 11px; color: #999;">
        <p style="margin: 0;">This is an automated notification from your website.</p>
      </div>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[char] || char);
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
  await getTransporter().sendMail({
    from: `"Performance Processes" <${fromEmail}>`,
    to,
    subject: "Reset your Performance Processes portal password",
    text: `Use this link to reset your password. It expires in one hour.\n\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`,
    html: wrapHtml("Password Reset", `
      <p style="font-size:14px;line-height:1.6;color:#222">Use the secure link below to reset your portal password. It expires in one hour.</p>
      <p style="margin:24px 0"><a href="${escapeHtml(resetUrl)}" style="display:inline-block;padding:13px 20px;background:#171717;color:#fff;text-decoration:none">Reset password</a></p>
      <p style="font-size:12px;line-height:1.6;color:#666">If you did not request this, you can ignore this email.</p>
    `),
  });
}

function row(label: string, value: string): string {
  return `<tr><td style="padding: 6px 0; color: #666; font-size: 13px; vertical-align: top; width: 140px;">${label}:</td><td style="padding: 6px 0; color: #333; font-size: 13px;">${value}</td></tr>`;
}

export async function notifyContactForm(data: { name: string; email: string; message: string }) {
  const subject = `New Contact Form Submission — ${data.name}`;
  const title = 'Contact Form Submission';

  const messageHtml = data.message.replace(/\n/g, '<br>');
  const content = `
    <table style="width: 100%; border-collapse: collapse;">
      ${row('Name', data.name)}
      ${row('Email', `<a href="mailto:${data.email}" style="color: #1e3a5f;">${data.email}</a>`)}
    </table>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin: 16px 0; font-size: 13px; color: #333; line-height: 1.6;">
      ${messageHtml}
    </div>
  `;

  await sendNotificationEmail(subject, wrapHtml(title, content));
}

export async function notifyJobApplication(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  linkedIn?: string;
  coverLetter?: string;
  resumeFilename: string;
}) {
  const subject = `New Job Application — ${data.firstName} ${data.lastName} (${data.position})`;

  const content = `
    <table style="width: 100%; border-collapse: collapse;">
      ${row('Name', `${data.firstName} ${data.lastName}`)}
      ${row('Email', `<a href="mailto:${data.email}" style="color: #1e3a5f;">${data.email}</a>`)}
      ${row('Phone', data.phone)}
      ${row('Position', data.position)}
      ${data.linkedIn ? row('LinkedIn', `<a href="${data.linkedIn}" style="color: #1e3a5f;">${data.linkedIn}</a>`) : ''}
      ${row('Resume', data.resumeFilename)}
    </table>
    ${data.coverLetter ? `
      <div style="margin-top: 16px;">
        <p style="font-size: 13px; font-weight: bold; color: #333; margin-bottom: 8px;">Cover Letter:</p>
        <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; font-size: 13px; color: #333; line-height: 1.6;">
          ${data.coverLetter.replace(/\n/g, '<br>')}
        </div>
      </div>
    ` : ''}
  `;

  await sendNotificationEmail(subject, wrapHtml('Job Application Received', content));
}

export async function notifyPaymentReceived(data: {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  amount: string;
  receiptNumber: string;
  isSubscription: boolean;
}) {
  const subject = `Payment Received — ${data.customerName} (${data.amount})`;

  const content = `
    <p style="font-size: 14px; color: #333; margin-bottom: 16px;">A new payment has been processed on the website.</p>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <table style="width: 100%; border-collapse: collapse;">
        ${row('Customer', data.customerName)}
        ${row('Email', `<a href="mailto:${data.customerEmail}" style="color: #1e3a5f;">${data.customerEmail}</a>`)}
        ${row('Service', data.serviceName)}
        ${row('Amount', `<strong style="color: #1e3a5f;">${data.amount}</strong>`)}
        ${row('Receipt #', data.receiptNumber)}
        ${row('Type', data.isSubscription ? 'Subscription' : 'One-time payment')}
      </table>
    </div>
  `;

  await sendNotificationEmail(subject, wrapHtml('Payment Notification', content));
}
