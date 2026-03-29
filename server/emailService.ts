import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      throw new Error('SMTP credentials not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.');
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

interface PdfAttachment {
  filename: string;
  content: Buffer;
}

interface ReceiptEmailOptions {
  to: string;
  customerName: string;
  serviceName: string;
  amount: string;
  receiptPdfBuffer: Buffer;
  receiptNumber: string;
  isSubscription: boolean;
  playbookPdfs?: PdfAttachment[];
}

export async function sendReceiptEmail(options: ReceiptEmailOptions): Promise<void> {
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
  const transport = getTransporter();

  const hasPlaybooks = options.playbookPdfs && options.playbookPdfs.length > 0;

  const subscriptionNote = options.isSubscription
    ? '<p style="color: #666; font-size: 13px;">This is a recurring subscription charge. You will continue to be billed automatically until cancelled.</p>'
    : '';

  const playbookCount = options.playbookPdfs?.length || 0;

  const subjectLine = hasPlaybooks
    ? `Your Playbook${playbookCount > 1 ? 's are' : ' is'} Ready! (${options.receiptNumber})`
    : `Payment Receipt - ${options.serviceName} (${options.receiptNumber})`;

  const headerSubtitle = hasPlaybooks ? 'Playbook Delivery' : 'Payment Receipt';

  const greeting = hasPlaybooks
    ? `<p style="color: #555; line-height: 1.6;">Great news — your playbook${playbookCount > 1 ? 's are' : ' is'} ready! You'll find ${playbookCount > 1 ? 'them' : 'it'} attached to this email as PDF${playbookCount > 1 ? 's' : ''}, ready to use right away.</p>`
    : '<p style="color: #555; line-height: 1.6;">Thank you for your purchase. Your payment has been processed successfully.</p>';

  const playbookSection = hasPlaybooks
    ? `<div style="background: #e8f0f8; border-left: 4px solid #1e3a5f; border-radius: 4px; padding: 16px; margin: 20px 0;">
        <p style="margin: 0 0 8px; color: #1e3a5f; font-weight: bold; font-size: 14px;">📘 Attached Playbook${playbookCount > 1 ? 's' : ''}:</p>
        ${options.playbookPdfs!.map(p => `<p style="margin: 4px 0; color: #333; font-size: 13px;">• ${p.filename.replace('.pdf', '').replace(/-/g, ' ')}</p>`).join('')}
      </div>
      <p style="color: #555; line-height: 1.6;">Your payment receipt is also attached for your records.</p>`
    : '<p style="color: #555; line-height: 1.6;">Your detailed receipt is attached as a PDF for your records.</p>';

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #1e3a5f; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Performance Processes</h1>
        <p style="color: #a8c4e0; margin: 5px 0 0; font-size: 14px;">${headerSubtitle}</p>
      </div>
      <div style="padding: 30px;">
        <p style="font-size: 16px; color: #333;">Dear ${options.customerName},</p>
        ${greeting}
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Service:</td>
              <td style="padding: 8px 0; color: #333; font-weight: bold; text-align: right; font-size: 14px;">${options.serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Amount:</td>
              <td style="padding: 8px 0; color: #1e3a5f; font-weight: bold; text-align: right; font-size: 16px;">${options.amount}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Receipt #:</td>
              <td style="padding: 8px 0; color: #333; text-align: right; font-size: 14px;">${options.receiptNumber}</td>
            </tr>
          </table>
        </div>
        ${subscriptionNote}
        ${playbookSection}
        <p style="color: #555; line-height: 1.6;">If you have any questions about your purchase, please don't hesitate to contact us at <a href="mailto:info@performanceprocesses.com" style="color: #1e3a5f;">info@performanceprocesses.com</a>.</p>
        <p style="color: #333; margin-top: 25px;">Best regards,<br><strong>Performance Processes Team</strong></p>
      </div>
      <div style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #999;">
        <p style="margin: 0;">Performance Processes | Ottawa, Ontario, Canada</p>
        <p style="margin: 5px 0 0;"><a href="https://www.performanceprocesses.com" style="color: #1e3a5f;">www.performanceprocesses.com</a></p>
      </div>
    </div>
  `;

  const attachments: nodemailer.SendMailOptions['attachments'] = [
    {
      filename: `receipt-${options.receiptNumber}.pdf`,
      content: options.receiptPdfBuffer,
      contentType: 'application/pdf',
    },
  ];

  if (options.playbookPdfs) {
    for (const pb of options.playbookPdfs) {
      attachments.push({
        filename: pb.filename,
        content: pb.content,
        contentType: 'application/pdf',
      });
    }
  }

  await transport.sendMail({
    from: `"Performance Processes" <${fromEmail}>`,
    to: options.to,
    subject: subjectLine,
    html,
    attachments,
  });

  console.log(`Receipt email sent to ${options.to} for ${options.receiptNumber}${hasPlaybooks ? ` with ${playbookCount} playbook PDF(s)` : ''}`);
}
