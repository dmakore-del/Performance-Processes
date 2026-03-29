import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import { PlaybookData } from './playbookContent';

const BRAND_PRIMARY = '#1e3a5f';
const BRAND_LIGHT = '#a8c4e0';
const BRAND_BG = '#f8f9fa';
const TEXT_DARK = '#333333';
const TEXT_MEDIUM = '#555555';
const TEXT_LIGHT = '#888888';

function getLogoPath(): string | null {
  const paths = [
    path.join(process.cwd(), 'client', 'src', 'assets', 'generated', 'logo.png'),
    path.join(process.cwd(), 'client', 'src', 'assets', 'logo.png'),
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function addFooter(doc: PDFKit.PDFDocument, pageNum: number, totalPages: number) {
  const footerY = doc.page.height - 50;
  doc.save();
  doc.moveTo(50, footerY).lineTo(doc.page.width - 50, footerY).strokeColor('#cccccc').lineWidth(0.5).stroke();
  doc.fontSize(8).fillColor(TEXT_LIGHT).font('Helvetica');
  doc.text('Performance Processes | www.performanceprocesses.com', 50, footerY + 8, {
    width: doc.page.width - 100,
    align: 'center',
  });
  doc.text(`Page ${pageNum} of ${totalPages}`, 50, footerY + 20, {
    width: doc.page.width - 100,
    align: 'center',
  });
  doc.restore();
}

function addHeader(doc: PDFKit.PDFDocument, logoPath: string | null, playbookName: string) {
  if (logoPath) {
    doc.image(logoPath, 50, 25, { width: 100 });
  }
  doc.fontSize(8).fillColor(TEXT_LIGHT).font('Helvetica');
  doc.text(playbookName, 160, 30, {
    width: doc.page.width - 210,
    align: 'right',
  });
  doc.moveTo(50, 55).lineTo(doc.page.width - 50, 55).strokeColor(BRAND_LIGHT).lineWidth(0.5).stroke();
}

export function generatePlaybookPDF(playbook: PlaybookData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'LETTER', margin: 50, bufferPages: true });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const logoPath = getLogoPath();
      const contentTop = 80;

      // === COVER PAGE ===
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(BRAND_PRIMARY);

      if (logoPath) {
        doc.image(logoPath, (doc.page.width - 200) / 2, 120, { width: 200 });
      }

      const titleY = logoPath ? 280 : 200;
      doc.fontSize(32).fillColor('#ffffff').font('Helvetica-Bold');
      doc.text(playbook.name, 60, titleY, {
        width: doc.page.width - 120,
        align: 'center',
      });

      doc.moveDown(0.5);
      doc.fontSize(16).fillColor(BRAND_LIGHT).font('Helvetica');
      doc.text(playbook.tagline, 60, doc.y, {
        width: doc.page.width - 120,
        align: 'center',
      });

      doc.moveDown(2);
      doc.fontSize(12).fillColor('#ffffff').font('Helvetica');
      doc.text(playbook.description, 80, doc.y, {
        width: doc.page.width - 160,
        align: 'center',
      });

      doc.moveDown(2);
      doc.fontSize(10).fillColor(BRAND_LIGHT).font('Helvetica-Bold');
      doc.text('IDEAL FOR:', 80, doc.y, {
        width: doc.page.width - 160,
        align: 'center',
      });
      doc.moveDown(0.3);
      doc.fontSize(10).fillColor('#ffffff').font('Helvetica');
      doc.text(playbook.idealFor, 80, doc.y, {
        width: doc.page.width - 160,
        align: 'center',
      });

      doc.fontSize(10).fillColor(BRAND_LIGHT).font('Helvetica');
      doc.text('Performance Processes', 60, doc.page.height - 80, {
        width: doc.page.width - 120,
        align: 'center',
      });
      doc.text('www.performanceprocesses.com', 60, doc.page.height - 65, {
        width: doc.page.width - 120,
        align: 'center',
      });

      // === TABLE OF CONTENTS ===
      doc.addPage();
      addHeader(doc, logoPath, playbook.name);

      doc.fontSize(22).fillColor(BRAND_PRIMARY).font('Helvetica-Bold');
      doc.text('Table of Contents', 50, contentTop, { align: 'left' });
      doc.moveDown(1.5);

      playbook.sections.forEach((section, index) => {
        const num = index + 1;
        doc.fontSize(13).fillColor(BRAND_PRIMARY).font('Helvetica-Bold');
        doc.text(`${num}. ${section.title}`, 70, doc.y, { continued: false });
        doc.moveDown(0.2);
        doc.fontSize(10).fillColor(TEXT_MEDIUM).font('Helvetica');
        doc.text(section.description.substring(0, 120) + '...', 90, doc.y, {
          width: doc.page.width - 140,
        });
        doc.moveDown(0.8);
      });

      // === SECTION PAGES ===
      playbook.sections.forEach((section, index) => {
        doc.addPage();
        addHeader(doc, logoPath, playbook.name);

        const chapterNum = index + 1;

        doc.fontSize(11).fillColor(BRAND_LIGHT).font('Helvetica-Bold');
        doc.text(`CHAPTER ${chapterNum}`, 50, contentTop);
        doc.moveDown(0.3);

        doc.fontSize(22).fillColor(BRAND_PRIMARY).font('Helvetica-Bold');
        doc.text(section.title, 50, doc.y);
        doc.moveDown(0.5);

        doc.moveTo(50, doc.y).lineTo(200, doc.y).strokeColor(BRAND_PRIMARY).lineWidth(2).stroke();
        doc.moveDown(1);

        doc.fontSize(11).fillColor(TEXT_DARK).font('Helvetica');
        doc.text(section.description, 50, doc.y, { width: doc.page.width - 100 });
        doc.moveDown(1.5);

        doc.fontSize(14).fillColor(BRAND_PRIMARY).font('Helvetica-Bold');
        doc.text('Step-by-Step Instructions', 50, doc.y);
        doc.moveDown(0.7);

        section.steps.forEach((step, stepIdx) => {
          if (doc.y > doc.page.height - 120) {
            doc.addPage();
            addHeader(doc, logoPath, playbook.name);
            doc.y = contentTop;
          }

          doc.fontSize(10).fillColor('#ffffff').font('Helvetica-Bold');
          const circleX = 62;
          const circleY = doc.y + 5;
          doc.circle(circleX, circleY, 8).fill(BRAND_PRIMARY);
          doc.text(`${stepIdx + 1}`, circleX - 4, circleY - 4, { width: 8, align: 'center' });

          doc.fontSize(10).fillColor(TEXT_DARK).font('Helvetica');
          doc.text(step, 80, circleY - 5, { width: doc.page.width - 130 });
          doc.moveDown(0.6);
        });

        doc.moveDown(1);

        if (doc.y > doc.page.height - 180) {
          doc.addPage();
          addHeader(doc, logoPath, playbook.name);
          doc.y = contentTop;
        }

        const tipBoxY = doc.y;
        const tipBoxWidth = doc.page.width - 100;

        let tipTextHeight = 0;
        section.tips.forEach(tip => {
          tipTextHeight += 18;
        });
        const tipBoxHeight = tipTextHeight + 50;

        doc.rect(50, tipBoxY, tipBoxWidth, tipBoxHeight).fill(BRAND_BG);

        doc.fontSize(12).fillColor(BRAND_PRIMARY).font('Helvetica-Bold');
        doc.text('Pro Tips', 65, tipBoxY + 12);

        let tipY = tipBoxY + 32;
        section.tips.forEach(tip => {
          if (tipY > doc.page.height - 80) {
            doc.addPage();
            addHeader(doc, logoPath, playbook.name);
            tipY = contentTop;
          }
          doc.fontSize(9).fillColor(BRAND_PRIMARY).font('Helvetica');
          doc.text('▸', 65, tipY);
          doc.fontSize(9).fillColor(TEXT_MEDIUM).font('Helvetica');
          doc.text(tip, 80, tipY, { width: tipBoxWidth - 45 });
          tipY += 18;
        });

        doc.y = tipY + 10;
      });

      // === BACK COVER ===
      doc.addPage();
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(BRAND_PRIMARY);

      doc.fontSize(20).fillColor('#ffffff').font('Helvetica-Bold');
      doc.text('Thank you for your purchase!', 60, 200, {
        width: doc.page.width - 120,
        align: 'center',
      });

      doc.moveDown(1.5);
      doc.fontSize(12).fillColor(BRAND_LIGHT).font('Helvetica');
      doc.text(
        'We hope this playbook helps you build better systems, lead with confidence, and achieve your goals.',
        80,
        doc.y,
        { width: doc.page.width - 160, align: 'center' }
      );

      doc.moveDown(2);
      doc.fontSize(11).fillColor('#ffffff').font('Helvetica-Bold');
      doc.text('Need more support?', 80, doc.y, {
        width: doc.page.width - 160,
        align: 'center',
      });
      doc.moveDown(0.5);
      doc.fontSize(10).fillColor(BRAND_LIGHT).font('Helvetica');
      doc.text('Contact us at info@performanceprocesses.com', 80, doc.y, {
        width: doc.page.width - 160,
        align: 'center',
      });
      doc.text('Visit www.performanceprocesses.com for consulting services', 80, doc.y + 18, {
        width: doc.page.width - 160,
        align: 'center',
      });

      if (logoPath) {
        doc.image(logoPath, (doc.page.width - 150) / 2, doc.page.height - 150, { width: 150 });
      }

      const totalPages = doc.bufferedPageRange().count;
      for (let i = 1; i < totalPages - 1; i++) {
        doc.switchToPage(i);
        addFooter(doc, i, totalPages - 2);
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
