import nodemailer from 'nodemailer';

const BOOKINGS_URL = "https://calendar.app.google/XPzjxpJxMn1MjCqN7";
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
      </div>
    </div>
  `;
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
  console.log(`Assessment email sent to ${to}: ${subject}`);
}

export async function sendAssessmentConfirmation(
  recipientEmail: string,
  firstName: string,
  totalScore: number,
  scoreLabel: string
): Promise<void> {
  const html = emailWrapper(`
    <h2 style="color: #1e3a5f; font-size: 18px; margin: 0 0 15px;">Thank you for completing the Growth Infrastructure Assessment, ${firstName}.</h2>
    <p style="font-size: 14px; color: #333; line-height: 1.6; margin: 0 0 12px;">
      We have received your assessment results. Our team will review your responses and prepare a detailed analysis of your growth infrastructure.
    </p>
    <div style="background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="font-size: 14px; color: #1e3a5f; margin: 0 0 8px;"><strong>Your Score:</strong> ${totalScore}/100</p>
      <p style="font-size: 14px; color: #1e3a5f; margin: 0;"><strong>Status:</strong> ${scoreLabel}</p>
    </div>
    <p style="font-size: 14px; color: #333; line-height: 1.6; margin: 0 0 12px;">
      You can expect to receive your full results report within 2 to 5 business days. In the meantime, feel free to explore our resources or book a strategy call to discuss your growth infrastructure.
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="${BOOKINGS_URL}" target="_blank" style="display: inline-block; background: #ec4899; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; letter-spacing: 0.5px;">Book a Strategy Call</a>
    </div>
    <p style="font-size: 13px; color: #666; line-height: 1.5; margin: 0;">
      If you have any questions in the meantime, reply to this email or reach out to us at contact@performanceprocesses.com.
    </p>
  `);

  await sendEmail(recipientEmail, 'Your Growth Infrastructure Assessment Results', html);
}

export async function sendAssessmentAdminPdf(
  firstName: string,
  email: string,
  totalScore: number,
  scoreLabel: string,
  recommendedPath: string,
  pdfBuffer: Buffer
): Promise<void> {
  const pathLabel = recommendedPath === 'full-build' ? 'Full System Build' :
    recommendedPath === 'guided' ? 'Guided Implementation' : 'Playbooks';

  const html = emailWrapper(`
    <h2 style="color: #1e3a5f; font-size: 18px; margin: 0 0 15px;">New Assessment Submission</h2>
    <div style="background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 0 0 20px;">
      <p style="font-size: 14px; color: #333; margin: 0 0 8px;"><strong>Name:</strong> ${firstName}</p>
      <p style="font-size: 14px; color: #333; margin: 0 0 8px;"><strong>Email:</strong> ${email}</p>
      <p style="font-size: 14px; color: #333; margin: 0 0 8px;"><strong>Score:</strong> ${totalScore}/100 (${scoreLabel})</p>
      <p style="font-size: 14px; color: #333; margin: 0;"><strong>Recommended Path:</strong> ${pathLabel}</p>
    </div>
    <p style="font-size: 14px; color: #333; line-height: 1.6;">
      The full assessment report is attached as a PDF. Review the results and follow up with this lead within the recommended timeframe.
    </p>
  `);

  await sendEmail(ADMIN_EMAIL, `Growth Assessment: ${firstName} (${totalScore}/100, ${scoreLabel})`, html, [
    {
      filename: `Growth-Assessment-${firstName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf',
    },
  ]);
}
