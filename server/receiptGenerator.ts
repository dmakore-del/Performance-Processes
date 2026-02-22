import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

interface ReceiptData {
  receiptNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  amount: number;
  currency: string;
  isSubscription: boolean;
  interval?: string;
}

export function generateReceiptPDF(data: ReceiptData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'LETTER', margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const logoPath = path.join(process.cwd(), 'client', 'src', 'assets', 'logo.png');
      const hasLogo = fs.existsSync(logoPath);

      if (hasLogo) {
        doc.image(logoPath, 50, 40, { width: 160 });
        doc.moveDown(4);
      }

      const startY = hasLogo ? 130 : 50;

      doc.fontSize(10).fillColor('#555555');
      doc.text('Performance Processes', 350, startY, { align: 'right' });
      doc.text('Ottawa, Ontario, Canada', { align: 'right' });
      doc.text('info@performanceprocesses.com', { align: 'right' });
      doc.text('www.performanceprocesses.com', { align: 'right' });

      doc.moveDown(2);

      const lineY = doc.y;
      doc.moveTo(50, lineY).lineTo(562, lineY).strokeColor('#1e3a5f').lineWidth(2).stroke();
      doc.moveDown(1);

      doc.fontSize(22).fillColor('#1e3a5f').text('RECEIPT', 50, doc.y, { align: 'center' });
      doc.moveDown(1.5);

      const detailsY = doc.y;
      doc.fontSize(10).fillColor('#333333');

      doc.font('Helvetica-Bold').text('Receipt Number:', 50, detailsY);
      doc.font('Helvetica').text(data.receiptNumber, 180, detailsY);

      doc.font('Helvetica-Bold').text('Date:', 50, detailsY + 20);
      doc.font('Helvetica').text(data.date, 180, detailsY + 20);

      doc.font('Helvetica-Bold').text('Customer:', 50, detailsY + 40);
      doc.font('Helvetica').text(data.customerName, 180, detailsY + 40);

      doc.font('Helvetica-Bold').text('Email:', 50, detailsY + 60);
      doc.font('Helvetica').text(data.customerEmail, 180, detailsY + 60);

      if (data.isSubscription && data.interval) {
        doc.font('Helvetica-Bold').text('Billing:', 50, detailsY + 80);
        doc.font('Helvetica').text(`Recurring (${data.interval})`, 180, detailsY + 80);
      }

      doc.moveDown(6);

      const tableTop = doc.y + 10;
      doc.rect(50, tableTop, 512, 30).fill('#1e3a5f');
      doc.fontSize(11).fillColor('#ffffff').font('Helvetica-Bold');
      doc.text('Service', 60, tableTop + 8, { width: 320 });
      doc.text('Amount', 400, tableTop + 8, { width: 150, align: 'right' });

      const rowY = tableTop + 30;
      doc.rect(50, rowY, 512, 35).fill('#f8f9fa');
      doc.fontSize(10).fillColor('#333333').font('Helvetica');
      doc.text(data.serviceName, 60, rowY + 10, { width: 320 });

      const formattedAmount = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: data.currency.toUpperCase(),
      }).format(data.amount / 100);

      doc.font('Helvetica-Bold').text(formattedAmount, 400, rowY + 10, { width: 150, align: 'right' });

      const totalY = rowY + 50;
      doc.moveTo(350, totalY).lineTo(562, totalY).strokeColor('#1e3a5f').lineWidth(1).stroke();
      doc.fontSize(13).fillColor('#1e3a5f').font('Helvetica-Bold');
      doc.text('Total:', 350, totalY + 10);
      doc.text(formattedAmount, 400, totalY + 10, { width: 150, align: 'right' });

      if (data.isSubscription && data.interval) {
        doc.fontSize(9).fillColor('#666666').font('Helvetica');
        doc.text(`This is a recurring ${data.interval} charge. You will be billed automatically.`, 50, totalY + 45, { align: 'center' });
      }

      doc.moveDown(6);
      const thankY = doc.y + 20;
      doc.fontSize(12).fillColor('#1e3a5f').font('Helvetica-Bold');
      doc.text('Thank you for choosing Performance Processes!', 50, thankY, { align: 'center' });

      doc.fontSize(9).fillColor('#888888').font('Helvetica');
      doc.text(
        'This receipt confirms your payment has been processed successfully. If you have any questions, please contact us at info@performanceprocesses.com.',
        50,
        thankY + 25,
        { align: 'center', width: 512 }
      );

      const footerY = 700;
      doc.moveTo(50, footerY).lineTo(562, footerY).strokeColor('#cccccc').lineWidth(0.5).stroke();
      doc.fontSize(8).fillColor('#999999');
      doc.text('Performance Processes | Professional Business Consulting', 50, footerY + 10, { align: 'center', width: 512 });
      doc.text('Ottawa, Ontario, Canada | www.performanceprocesses.com', 50, footerY + 22, { align: 'center', width: 512 });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
