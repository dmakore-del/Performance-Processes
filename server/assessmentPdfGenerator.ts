import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

const BRAND_PRIMARY = '#1e3a5f';
const BRAND_ACCENT = '#ec4899';
const TEXT_DARK = '#333333';
const TEXT_MEDIUM = '#555555';
const TEXT_LIGHT = '#888888';
const BRAND_BG = '#f0f4f8';

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

interface AssessmentData {
  firstName: string;
  email: string;
  organizationName?: string;
  organizationType?: string;
  roleTitle?: string;
  totalScore: number;
  foundationScore: number;
  buildScore: number;
  runScore: number;
  scoreLabel: string;
  recommendedPath: string;
  submittedAt: string;
}

function getScoreColor(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100;
  if (pct <= 40) return '#ef4444';
  if (pct <= 70) return '#f59e0b';
  return '#22c55e';
}

function getInterpretation(label: string): string {
  switch (label) {
    case 'Needs Structure':
      return 'Your organization may be operating without the systems needed for consistent execution. Clarifying structure, process, and accountability should be the first priority.';
    case 'Developing Systems':
      return 'You have some important systems in place, but there are still gaps affecting consistency, efficiency, and growth. Focused implementation can strengthen execution.';
    case 'Growth Ready':
      return 'You have a solid base for growth, with systems already in place. The next opportunity is to optimize performance, alignment, and long-term scalability.';
    default:
      return '';
  }
}

function getRecommendation(path: string): string {
  switch (path) {
    case 'playbooks':
      return 'We recommend starting with our Playbooks, self-paced frameworks that help you build the foundational systems your organization needs. For faster results, consider Guided Implementation where our team works alongside yours.';
    case 'guided':
      return 'We recommend Guided Implementation, where our team works alongside yours to close the gaps identified in this assessment. Focused sprints can rapidly strengthen your systems and execution.';
    case 'full-build':
      return 'Your organization is well positioned for a Full System Build engagement. We can help you optimize and scale with comprehensive, hands-on support across your entire growth infrastructure.';
    default:
      return '';
  }
}

export async function generateAssessmentPDF(data: AssessmentData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const logoPath = getLogoPath();
    const pageWidth = doc.page.width - 100;

    doc.rect(0, 0, doc.page.width, 140).fill(BRAND_PRIMARY);
    if (logoPath) {
      try { doc.image(logoPath, 50, 25, { width: 40 }); } catch {}
    }
    doc.fontSize(22).fillColor('#ffffff').font('Helvetica-Bold')
      .text('Growth Infrastructure Assessment', 100, 35, { width: pageWidth - 50 });
    doc.fontSize(11).fillColor('#a8c4e0').font('Helvetica')
      .text('Results Report', 100, 62);
    doc.fontSize(10).fillColor('#a8c4e0')
      .text(`Prepared for: ${data.firstName}`, 50, 95)
      .text(`Date: ${data.submittedAt}`, 50, 110);
    if (data.organizationName) {
      doc.text(`Organization: ${data.organizationName}`, 300, 95);
    }
    if (data.roleTitle) {
      doc.text(`Role: ${data.roleTitle}`, 300, 110);
    }

    let y = 160;

    doc.rect(50, y, pageWidth, 80).fill(BRAND_BG);
    doc.fontSize(14).fillColor(BRAND_PRIMARY).font('Helvetica-Bold')
      .text('Overall Score', 70, y + 12);
    const scoreColor = getScoreColor(data.totalScore, 100);
    doc.fontSize(36).fillColor(scoreColor).font('Helvetica-Bold')
      .text(`${data.totalScore}`, 70, y + 32, { continued: true });
    doc.fontSize(14).fillColor(TEXT_MEDIUM).font('Helvetica')
      .text(' / 100', { continued: false });
    doc.fontSize(16).fillColor(BRAND_PRIMARY).font('Helvetica-Bold')
      .text(data.scoreLabel, 300, y + 30);
    y += 100;

    doc.fontSize(11).fillColor(TEXT_DARK).font('Helvetica')
      .text(getInterpretation(data.scoreLabel), 50, y, { width: pageWidth, lineGap: 4 });
    y += 60;

    doc.fontSize(14).fillColor(BRAND_PRIMARY).font('Helvetica-Bold')
      .text('Category Breakdown', 50, y);
    y += 25;

    const categories = [
      { name: 'Foundation', score: data.foundationScore, desc: 'Business direction, structure, leadership alignment, and KPIs' },
      { name: 'Build', score: data.buildScore, desc: 'Processes, hiring, onboarding, marketing, and lead systems' },
      { name: 'Run', score: data.runScore, desc: 'Accountability, execution, performance monitoring, and optimization' },
    ];

    for (const cat of categories) {
      doc.rect(50, y, pageWidth, 55).fill(BRAND_BG);
      doc.fontSize(12).fillColor(BRAND_PRIMARY).font('Helvetica-Bold')
        .text(cat.name, 70, y + 8);
      
      const barWidth = 200;
      const barHeight = 12;
      const barX = 200;
      const barY = y + 10;
      const pct = (cat.score / 100) * barWidth;
      doc.rect(barX, barY, barWidth, barHeight).fill('#e5e7eb');
      doc.rect(barX, barY, pct, barHeight).fill(getScoreColor(cat.score, 100));
      doc.fontSize(12).fillColor(TEXT_DARK).font('Helvetica-Bold')
        .text(`${cat.score}%`, barX + barWidth + 10, barY - 1);
      
      doc.fontSize(9).fillColor(TEXT_MEDIUM).font('Helvetica')
        .text(cat.desc, 70, y + 30, { width: pageWidth - 40 });
      y += 65;
    }

    y += 15;
    doc.rect(50, y, pageWidth, 2).fill(BRAND_ACCENT);
    y += 20;

    doc.fontSize(14).fillColor(BRAND_PRIMARY).font('Helvetica-Bold')
      .text('Recommended Next Step', 50, y);
    y += 22;
    doc.fontSize(11).fillColor(TEXT_DARK).font('Helvetica')
      .text(getRecommendation(data.recommendedPath), 50, y, { width: pageWidth, lineGap: 4 });
    y += 70;

    doc.fontSize(12).fillColor(BRAND_PRIMARY).font('Helvetica-Bold')
      .text('Ready to take the next step?', 50, y);
    y += 20;
    doc.fontSize(10).fillColor(TEXT_DARK).font('Helvetica')
      .text('Visit www.performanceprocesses.com or book a strategy call to discuss your results.', 50, y);
    y += 15;
    doc.fontSize(10).fillColor(BRAND_ACCENT).font('Helvetica')
      .text('https://calendar.app.google/XPzjxpJxMn1MjCqN7', 50, y);

    const footerY = doc.page.height - 50;
    doc.moveTo(50, footerY).lineTo(doc.page.width - 50, footerY).strokeColor('#cccccc').lineWidth(0.5).stroke();
    doc.fontSize(8).fillColor(TEXT_LIGHT).font('Helvetica')
      .text('Performance Processes | www.performanceprocesses.com | contact@performanceprocesses.com', 50, footerY + 8, {
        width: doc.page.width - 100,
        align: 'center',
      });

    doc.end();
  });
}
