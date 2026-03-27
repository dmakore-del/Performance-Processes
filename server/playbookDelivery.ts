import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';

interface PlaybookContent {
  name: string;
  tagline: string;
  description: string;
  idealFor: string;
  included: string[];
  tier: string;
  sections: PlaybookSection[];
}

interface PlaybookSection {
  title: string;
  content: string;
  tips?: string[];
}

const PLAYBOOK_DATA: Record<string, PlaybookContent> = {
  "The Performance Kickstart Kit": {
    name: "The Performance Kickstart Kit",
    tagline: "Start strong. Stay consistent.",
    description: "Everything you need to set meaningful goals, build weekly momentum, and track what matters.",
    idealFor: "New managers, solo founders, and professionals who want structure without complexity.",
    included: ["Goal-setting templates", "Weekly planning tools", "Personal performance scorecard", "Progress tracking guide"],
    tier: "Foundations",
    sections: [
      { title: "Goal-Setting Framework", content: "Define your top 3-5 goals using the SMART framework. Each goal should have a clear outcome, measurable indicator, and timeline. Start with your 90-day priorities, then break them into monthly and weekly milestones.", tips: ["Focus on outcomes, not activities", "Limit yourself to 5 goals maximum", "Review and adjust monthly"] },
      { title: "Weekly Planning Template", content: "Each week, identify your top 3 priorities that move your goals forward. Block time for deep work on these priorities before scheduling meetings. End each week with a 15-minute reflection on what moved the needle.", tips: ["Plan your week on Sunday evening or Monday morning", "Protect at least 2 hours of uninterrupted focus time daily", "Say no to anything that doesn't serve your top 3"] },
      { title: "Personal Performance Scorecard", content: "Track your key metrics weekly using a simple scorecard. Rate each goal area on a 1-5 scale for effort and progress. Look for patterns — where are you consistently strong, and where do you need support?", tips: ["Be honest in your self-assessment", "Track leading indicators, not just results", "Share your scorecard with an accountability partner"] },
      { title: "Progress Tracking Guide", content: "Use the monthly review template to assess your trajectory. Compare planned vs. actual progress, identify blockers, and adjust your approach. Celebrate wins — even small ones build momentum.", tips: ["Schedule your monthly review as a non-negotiable calendar event", "Document lessons learned, not just results", "Adjust goals if circumstances change — flexibility is not failure"] },
    ],
  },
  "The Hiring Right Playbook": {
    name: "The Hiring Right Playbook",
    tagline: "Better hires. Fewer regrets.",
    description: "Hire with confidence using structured templates that reduce bias and improve outcomes.",
    idealFor: "Growing teams, first-time hiring managers, and HR professionals building repeatable processes.",
    included: ["Job description templates", "Interview scorecards", "Onboarding checklists", "Candidate evaluation rubrics"],
    tier: "Foundations",
    sections: [
      { title: "Job Description Templates", content: "Write job descriptions that attract the right candidates. Start with the outcome the role exists to achieve, not a list of tasks. Include must-have vs. nice-to-have qualifications, and be transparent about compensation range and working conditions.", tips: ["Lead with impact, not responsibilities", "Remove gendered or exclusionary language", "Include your team culture and values"] },
      { title: "Structured Interview Scorecards", content: "Use consistent evaluation criteria for every candidate. Define 4-6 competencies essential for the role, create behavioral questions for each, and score responses on a 1-5 scale with clear anchors for each level.", tips: ["Ask every candidate the same core questions", "Score immediately after each interview, not at the end of the day", "Include a diverse interview panel"] },
      { title: "Candidate Evaluation Rubrics", content: "Compare candidates objectively using a weighted rubric. Assign weights to each competency based on role importance, aggregate scores from all interviewers, and make decisions based on data, not gut feeling.", tips: ["Weight technical skills and cultural contribution equally", "Flag any candidate where interviewers disagree significantly", "Document your decision rationale for future reference"] },
      { title: "Onboarding Checklists", content: "Set new hires up for success from day one. Cover pre-boarding logistics, first-week orientation, 30-60-90 day milestones, and ongoing check-ins. Assign a buddy and ensure the manager has regular 1:1s scheduled.", tips: ["Send a welcome package before the start date", "Have their workspace and tools ready on day one", "Schedule a 90-day check-in to assess mutual fit"] },
    ],
  },
  "The SOPs That Scale Starter Pack": {
    name: "The SOPs That Scale Starter Pack",
    tagline: "Build once. Scale forever.",
    description: "Document your processes so your team can execute without you in the room.",
    idealFor: "Operations leads, growing teams, and founders preparing to delegate.",
    included: ["SOP templates", "Process mapping guide", "Team accountability tracker", "Quality checklist framework"],
    tier: "Foundations",
    sections: [
      { title: "SOP Writing Templates", content: "Document your key processes using a consistent format: Purpose, Scope, Steps, Quality Checks, and Owner. Start with your most repeated processes — the ones you explain to people over and over.", tips: ["Write at the level of someone doing the task for the first time", "Include screenshots or visuals where possible", "Version-control your SOPs with dates and change logs"] },
      { title: "Process Mapping Guide", content: "Map your workflows visually before writing SOPs. Identify inputs, outputs, decision points, and handoffs. Look for bottlenecks, redundancies, and steps that could be automated or eliminated.", tips: ["Start with your revenue-generating processes", "Include time estimates for each step", "Mark steps that require approval or review"] },
      { title: "Team Accountability Tracker", content: "Assign clear ownership for each process and SOP. Track who is responsible, who reviews, and when each SOP was last updated. Use this tracker in team meetings to ensure processes stay current.", tips: ["Every process needs one owner, not a committee", "Review SOPs quarterly at minimum", "Include backup owners for critical processes"] },
      { title: "Quality Checklist Framework", content: "Build quality checks into every process. Define what 'done right' looks like, create simple checklists for each step, and establish escalation procedures for when things go wrong.", tips: ["Make checklists short — 5-7 items maximum", "Test your checklists with someone unfamiliar with the process", "Track error rates to identify which processes need improvement"] },
    ],
  },
  "The Manager's First 90 Days": {
    name: "The Manager's First 90 Days",
    tagline: "Lead with clarity from day one.",
    description: "Hit the ground running in a new leadership role with a clear plan for your first three months.",
    idealFor: "Newly promoted managers, leaders transitioning to new teams, and first-time people managers.",
    included: ["Transition plan template", "Team assessment framework", "Quick-win action planner", "Stakeholder mapping tool"],
    tier: "Foundations",
    sections: [
      { title: "Transition Plan Template", content: "Structure your first 90 days into three phases: Listen (Days 1-30), Learn (Days 31-60), and Lead (Days 61-90). In each phase, define your priorities, key meetings, and deliverables. Share your plan with your manager for alignment.", tips: ["Don't make big changes in the first 30 days", "Schedule 1:1s with every direct report in week one", "Identify the team's biggest pain point and address it early"] },
      { title: "Team Assessment Framework", content: "Assess your team's strengths, gaps, and dynamics. Use structured 1:1 conversations to understand each person's role, aspirations, and challenges. Map the team's capabilities against what the organization needs.", tips: ["Ask open-ended questions and listen more than you talk", "Look for both skill gaps and motivation gaps", "Identify your highest-potential and highest-risk team members"] },
      { title: "Quick-Win Action Planner", content: "Identify 2-3 quick wins you can deliver in your first 60 days. Choose wins that are visible, meaningful to the team, and achievable without major resources. Quick wins build credibility and momentum.", tips: ["Fix something that has been broken for a long time", "Remove a bureaucratic barrier that frustrates the team", "Celebrate the team's existing wins publicly"] },
      { title: "Stakeholder Mapping Tool", content: "Map your key stakeholders by influence and interest. Identify who you need to build relationships with, who can help you succeed, and who might resist change. Create a communication plan for each stakeholder group.", tips: ["Meet with peers and cross-functional leaders, not just your direct reports", "Understand what success looks like from your manager's perspective", "Build alliances before you need them"] },
    ],
  },
  "The Strategic Planning Blueprint": {
    name: "The Strategic Planning Blueprint",
    tagline: "From vision to execution.",
    description: "A complete strategic planning system to align your team, set priorities, and build a roadmap that sticks.",
    idealFor: "Leadership teams, department heads, and organizations entering a new growth phase.",
    included: ["Strategic planning workbook", "SWOT analysis framework", "OKR setting templates", "1-3 year roadmap builder", "Quarterly review guide"],
    tier: "Systems",
    sections: [
      { title: "Strategic Planning Workbook", content: "Begin with your organization's purpose and vision. Define what success looks like in 1, 3, and 5 years. Identify the strategic pillars that will get you there, and the capabilities you need to build.", tips: ["Involve your leadership team in the planning process", "Ground your strategy in market reality, not just aspiration", "Keep your strategic pillars to 3-5 maximum"] },
      { title: "SWOT Analysis Framework", content: "Conduct a thorough analysis of your Strengths, Weaknesses, Opportunities, and Threats. Use this to identify strategic priorities: leverage strengths against opportunities, shore up weaknesses that threaten your position, and build defenses against external threats.", tips: ["Be brutally honest about weaknesses", "Validate your assumptions with data", "Prioritize the intersections — strengths that match opportunities"] },
      { title: "OKR Setting Templates", content: "Translate your strategy into Objectives and Key Results for each quarter. Each objective should be ambitious and inspiring. Each key result should be measurable and time-bound. Cascade OKRs from company to team to individual.", tips: ["Set 3-5 objectives per quarter, no more", "Key results should be outcomes, not activities", "Score OKRs at the end of each quarter — 70% completion is healthy"] },
      { title: "Roadmap Builder & Quarterly Review", content: "Build your 1-3 year roadmap with quarterly milestones. Each quarter, review progress against your roadmap, celebrate wins, learn from misses, and adjust your plan. Strategy is a living document, not a one-time exercise.", tips: ["Make your roadmap visible to the entire organization", "Dedicate a full day each quarter to strategic review", "Kill initiatives that aren't delivering — don't just add new ones"] },
    ],
  },
  "The Performance Management System": {
    name: "The Performance Management System",
    tagline: "Measure what matters. Manage with intention.",
    description: "A ready-to-deploy performance management system with KPIs, review cycles, and feedback frameworks.",
    idealFor: "HR leaders, COOs, and organizations building or overhauling their performance infrastructure.",
    included: ["KPI library (100+ metrics)", "Review cycle templates", "Feedback frameworks", "Performance dashboard template", "Calibration guide"],
    tier: "Systems",
    sections: [
      { title: "KPI Library & Selection Guide", content: "Choose from 100+ KPIs across finance, operations, people, and customer dimensions. For each role, select 3-5 KPIs that directly connect individual performance to organizational outcomes. Define targets, measurement frequency, and data sources.", tips: ["Less is more — 3-5 KPIs per role is ideal", "Include both leading and lagging indicators", "Ensure every KPI has a clear owner and data source"] },
      { title: "Review Cycle Templates", content: "Design your annual review cycle with quarterly check-ins. Include self-assessments, manager evaluations, and peer feedback. Use calibration sessions to ensure consistency across the organization.", tips: ["Replace annual reviews with continuous feedback plus quarterly summits", "Train managers on how to have effective performance conversations", "Separate development discussions from compensation discussions"] },
      { title: "Feedback Frameworks", content: "Build a culture of continuous feedback using structured frameworks. Implement regular 1:1s, peer recognition programs, and 360-degree feedback for leaders. Make feedback specific, timely, and actionable.", tips: ["Use the SBI model: Situation, Behavior, Impact", "Balance positive recognition with developmental feedback", "Create psychological safety before asking for upward feedback"] },
      { title: "Performance Dashboard & Calibration", content: "Create a visual dashboard that tracks team and individual performance. Use calibration sessions to ensure fair and consistent ratings across the organization. Identify high performers, steady contributors, and those needing support.", tips: ["Update dashboards monthly, not just at review time", "Use a 9-box grid for talent discussions", "Calibrate across teams to prevent manager bias"] },
    ],
  },
  "The Culture & Engagement Toolkit": {
    name: "The Culture & Engagement Toolkit",
    tagline: "Culture by design, not by default.",
    description: "Understand and shape your workplace culture with practical tools for engagement and alignment.",
    idealFor: "People & culture teams, founders building intentional culture, and HR professionals.",
    included: ["Engagement survey templates", "Culture audit framework", "Values alignment workshop guide", "Action planning templates"],
    tier: "Systems",
    sections: [
      { title: "Engagement Survey Templates", content: "Measure employee engagement across key dimensions: purpose, autonomy, growth, recognition, and belonging. Use a mix of scaled questions and open-ended responses. Survey quarterly for trends, not just annually.", tips: ["Keep surveys under 15 minutes", "Share results transparently with the team", "Act on at least one finding within 30 days of each survey"] },
      { title: "Culture Audit Framework", content: "Assess your current culture against your desired culture. Examine artifacts (what people see), behaviors (what people do), and beliefs (what people value). Identify gaps between stated values and lived experience.", tips: ["Include voices from all levels of the organization", "Look for subcultures across teams and locations", "Be honest about the gap between aspiration and reality"] },
      { title: "Values Alignment Workshop Guide", content: "Facilitate a workshop to define or refresh your organizational values. Move beyond generic words to specific behaviors that demonstrate each value. Create accountability mechanisms for living your values.", tips: ["Involve employees in defining values, not just leadership", "For each value, define 3-4 observable behaviors", "Integrate values into hiring, reviews, and recognition"] },
      { title: "Action Planning Templates", content: "Turn culture insights into concrete action plans. Prioritize initiatives by impact and effort, assign owners, and set timelines. Track progress and communicate wins to maintain momentum.", tips: ["Start with 2-3 high-impact initiatives, not a 20-item list", "Assign executive sponsors for culture initiatives", "Celebrate culture wins publicly and regularly"] },
    ],
  },
  "The Organizational Design Playbook": {
    name: "The Organizational Design Playbook",
    tagline: "Design the organization your strategy demands.",
    description: "Redesign your organization for clarity, efficiency, and growth with proven structural frameworks.",
    idealFor: "CEOs, COOs, and leadership teams navigating restructuring, rapid growth, or role confusion.",
    included: ["Org structure templates", "Role clarity matrices", "RACI charts", "Restructuring guide", "Span of control analysis", "Communication flow mapping"],
    tier: "Advanced",
    sections: [
      { title: "Organizational Structure Templates", content: "Evaluate and design your org structure to support your strategy. Compare functional, divisional, matrix, and flat structures. Choose the model that best balances efficiency, agility, and clarity for your stage of growth.", tips: ["Structure follows strategy — don't reorganize without strategic clarity", "Consider hybrid models that combine the strengths of different structures", "Every restructuring needs a clear communication plan"] },
      { title: "Role Clarity & RACI Frameworks", content: "Eliminate confusion about who does what. Use RACI charts (Responsible, Accountable, Consulted, Informed) for key processes. Create role clarity matrices that define decision rights, boundaries, and handoffs.", tips: ["Every decision should have exactly one 'A' (Accountable)", "Review RACI charts when roles or processes change", "Use role clarity workshops to resolve turf conflicts"] },
      { title: "Span of Control Analysis", content: "Optimize your management layers and spans of control. Analyze how many direct reports each manager has, whether layers add value or bureaucracy, and where you need more or less management oversight.", tips: ["Optimal span varies by role complexity — 5-8 for complex roles, 10-15 for standardized roles", "Reduce layers to speed decision-making", "Ensure every management layer adds distinct value"] },
      { title: "Communication Flow Mapping", content: "Map how information flows through your organization. Identify bottlenecks, silos, and shadow structures. Design communication channels that ensure the right information reaches the right people at the right time.", tips: ["Map both formal and informal communication channels", "Look for information that gets stuck at management layers", "Create cross-functional forums for strategic alignment"] },
    ],
  },
  "The Executive Transition Toolkit": {
    name: "The Executive Transition Toolkit",
    tagline: "Set the tone. Build trust. Deliver early wins.",
    description: "Navigate senior leadership transitions with a structured approach to the critical first 100 days.",
    idealFor: "Incoming executives, board members overseeing transitions, and HR supporting C-suite changes.",
    included: ["Leadership transition roadmap", "Stakeholder mapping tool", "First 100 days plan", "Board reporting templates", "Team alignment framework"],
    tier: "Advanced",
    sections: [
      { title: "Leadership Transition Roadmap", content: "Structure your executive transition into four phases: Prepare (pre-start), Orient (days 1-30), Immerse (days 31-60), and Shape (days 61-100). Each phase has specific objectives, key activities, and success criteria.", tips: ["Start your transition before your official start date", "Understand the organizational context — why was the role open?", "Identify the 3 things your board/CEO expects in the first year"] },
      { title: "Stakeholder Mapping & Engagement", content: "Map all stakeholders by their influence on your success and their current disposition toward you. Create tailored engagement strategies for supporters, skeptics, and fence-sitters. Build relationships proactively.", tips: ["Meet with every board member individually", "Identify the informal power brokers in the organization", "Listen for what people are NOT saying — that's where the real issues are"] },
      { title: "First 100 Days Plan", content: "Define your agenda for the first 100 days with clear deliverables. Balance quick wins with long-term strategic priorities. Communicate your vision early, but earn the right to make big changes through listening first.", tips: ["Deliver 2-3 visible quick wins in the first 60 days", "Don't announce a new strategy until you've listened to the organization", "Build your leadership team — the right people in the right seats"] },
      { title: "Board Reporting Templates", content: "Create professional board reporting templates that demonstrate strategic thinking and execution. Include dashboards for key metrics, narrative updates on strategic priorities, and forward-looking risk assessments.", tips: ["Know your board's preferred communication style", "Lead with the 'so what' — implications and recommendations", "Flag risks early — boards hate surprises"] },
    ],
  },
  "The Change Management Playbook": {
    name: "The Change Management Playbook",
    tagline: "Change happens. Lead it.",
    description: "Lead organizational change with confidence using proven frameworks for communication, adoption, and resistance.",
    idealFor: "Change leaders, project managers, and organizations undergoing transformation or integration.",
    included: ["Change readiness assessment", "Communication plan templates", "Resistance management guide", "Adoption tracker", "Stakeholder engagement playbook"],
    tier: "Advanced",
    sections: [
      { title: "Change Readiness Assessment", content: "Assess your organization's readiness for change across four dimensions: leadership alignment, organizational capacity, change fatigue, and cultural receptivity. Use this assessment to calibrate your approach and identify risks.", tips: ["Assess readiness honestly — underestimating resistance is the #1 change failure", "Involve middle managers — they make or break change initiatives", "If readiness is low, invest in building it before launching the change"] },
      { title: "Communication Plan Templates", content: "Design a multi-channel communication plan for your change initiative. Define key messages for each stakeholder group, choose appropriate channels, and establish a cadence. Address the 'why' before the 'what' and 'how'.", tips: ["Communicate 7x more than you think is necessary", "Use multiple channels — email alone is never enough", "Create two-way communication channels, not just broadcasts"] },
      { title: "Resistance Management Guide", content: "Anticipate and address resistance constructively. Understand the root causes of resistance (fear, loss, confusion, distrust) and develop targeted strategies for each. Convert resisters into advocates by involving them early.", tips: ["Resistance is information — listen to it, don't dismiss it", "Address emotional concerns before logical ones", "Identify and empower change champions at every level"] },
      { title: "Adoption Tracking & Sustainability", content: "Measure adoption across awareness, understanding, commitment, and behavior change. Track leading indicators weekly, adjust your approach based on data, and plan for sustaining the change beyond the initial implementation.", tips: ["Define what 'adoption' looks like in observable behaviors", "Celebrate early adopters publicly", "Plan for the 'valley of despair' — the dip in performance that comes before improvement"] },
    ],
  },
};

export function generatePlaybookPDF(productName: string, customerName: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const playbook = PLAYBOOK_DATA[productName];
      if (!playbook) {
        reject(new Error(`No playbook content found for: ${productName}`));
        return;
      }

      const doc = new PDFDocument({ size: 'LETTER', margin: 60 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const logoPath = path.join(process.cwd(), 'client', 'src', 'assets', 'logo.png');
      const hasLogo = fs.existsSync(logoPath);

      const navy = '#1e3a5f';
      const pink = '#ec4899';
      const gray = '#555555';
      const lightGray = '#f0f4f8';

      doc.rect(0, 0, doc.page.width, doc.page.height).fill(navy);

      if (hasLogo) {
        doc.image(logoPath, 60, 60, { width: 180 });
      }

      doc.fontSize(12).fillColor('#ffffff').opacity(0.7);
      doc.text(`${playbook.tier} Playbook`, 60, hasLogo ? 140 : 80);

      doc.opacity(1).fontSize(32).fillColor('#ffffff');
      doc.text(playbook.name, 60, hasLogo ? 180 : 120, { width: doc.page.width - 120 });

      doc.moveDown(1);
      doc.fontSize(16).fillColor(pink);
      doc.text(playbook.tagline, 60, doc.y, { width: doc.page.width - 120 });

      doc.moveDown(2);
      doc.fontSize(12).fillColor('#ffffff').opacity(0.8);
      doc.text(playbook.description, 60, doc.y, { width: doc.page.width - 120 });

      doc.opacity(1);
      doc.moveDown(3);
      doc.fontSize(11).fillColor('#a8c4e0');
      doc.text(`Prepared for: ${customerName}`, 60, doc.y);
      doc.text(`Date: ${new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}`, 60, doc.y + 18);

      doc.moveDown(4);
      doc.fontSize(9).fillColor('#ffffff').opacity(0.5);
      doc.text('© Performance Processes. All rights reserved.', 60, doc.page.height - 80, { width: doc.page.width - 120, align: 'center' });
      doc.text('www.performanceprocesses.com', { align: 'center' });

      doc.addPage();
      doc.opacity(1);

      doc.fontSize(20).fillColor(navy).text('Table of Contents', 60, 60);
      doc.moveDown(1.5);

      playbook.sections.forEach((section, i) => {
        doc.fontSize(13).fillColor(navy).text(`${i + 1}. ${section.title}`, 80, doc.y, { continued: false });
        doc.moveDown(0.5);
      });

      doc.moveDown(2);
      doc.fontSize(14).fillColor(navy).text("What's Included:", 60, doc.y);
      doc.moveDown(0.5);
      playbook.included.forEach((item) => {
        doc.fontSize(11).fillColor(gray).text(`  •  ${item}`, 80, doc.y);
        doc.moveDown(0.3);
      });

      doc.moveDown(2);
      doc.fontSize(12).fillColor(navy).text('Ideal For:', 60, doc.y);
      doc.moveDown(0.3);
      doc.fontSize(11).fillColor(gray).text(playbook.idealFor, 80, doc.y, { width: doc.page.width - 160 });

      playbook.sections.forEach((section, i) => {
        doc.addPage();

        doc.rect(0, 0, doc.page.width, 100).fill(navy);
        doc.fontSize(12).fillColor(pink).text(`Section ${i + 1}`, 60, 30);
        doc.fontSize(22).fillColor('#ffffff').text(section.title, 60, 50, { width: doc.page.width - 120 });

        let currentY = 130;

        doc.fontSize(11).fillColor('#333333');
        doc.text(section.content, 60, currentY, {
          width: doc.page.width - 120,
          lineGap: 4,
        });

        currentY = doc.y + 20;

        if (section.tips && section.tips.length > 0) {
          doc.rect(50, currentY, doc.page.width - 100, 20 + section.tips.length * 22).fill(lightGray);

          currentY += 10;
          doc.fontSize(11).fillColor(navy).text('Key Tips:', 70, currentY, { underline: true });
          currentY += 18;

          section.tips.forEach((tip) => {
            doc.fontSize(10).fillColor(gray).text(`→  ${tip}`, 80, currentY, { width: doc.page.width - 160 });
            currentY += 20;
          });
        }

        currentY = doc.y + 30;
        if (currentY < doc.page.height - 200) {
          doc.rect(60, currentY, doc.page.width - 120, 80).fill('#fdf2f8');
          doc.fontSize(10).fillColor(navy).text('Action Item:', 75, currentY + 12, { underline: true });
          doc.fontSize(10).fillColor(gray).text(
            `Apply the framework from "${section.title}" to your organization this week. Document your observations and share with your team.`,
            75, currentY + 30, { width: doc.page.width - 150 }
          );
        }
      });

      doc.addPage();
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(navy);

      const centerY = doc.page.height / 2 - 100;
      doc.fontSize(24).fillColor('#ffffff').text('Ready for More?', 60, centerY, { width: doc.page.width - 120, align: 'center' });
      doc.moveDown(1);
      doc.fontSize(13).fillColor('#a8c4e0').text(
        'This playbook gives you the frameworks. If you want hands-on help implementing them, our consulting team is here for you.',
        60, doc.y, { width: doc.page.width - 120, align: 'center' }
      );
      doc.moveDown(2);
      doc.fontSize(12).fillColor(pink).text('Book a Free Audit', 60, doc.y, { width: doc.page.width - 120, align: 'center', link: 'https://www.performanceprocesses.com/free-audit' });
      doc.moveDown(1);
      doc.fontSize(11).fillColor('#ffffff').opacity(0.7).text('www.performanceprocesses.com', 60, doc.y, { width: doc.page.width - 120, align: 'center' });
      doc.text('contact@performanceprocesses.com', { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

let emailTransporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!emailTransporter) {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) {
      throw new Error('SMTP credentials not configured.');
    }
    emailTransporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  }
  return emailTransporter;
}

interface PlaybookDeliveryOptions {
  to: string;
  customerName: string;
  playbookNames: string[];
  pdfBuffers: Buffer[];
}

export async function sendPlaybookDeliveryEmail(options: PlaybookDeliveryOptions): Promise<void> {
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
  const transport = getTransporter();

  const playbookList = options.playbookNames.map(name => `<li style="padding: 4px 0; color: #333;">${name}</li>`).join('');
  const isSingle = options.playbookNames.length === 1;

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #1e3a5f; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Performance Processes</h1>
        <p style="color: #ec4899; margin: 8px 0 0; font-size: 14px; font-weight: bold;">Your Playbook${isSingle ? '' : 's'} ${isSingle ? 'is' : 'are'} Ready</p>
      </div>
      <div style="padding: 30px;">
        <p style="font-size: 16px; color: #333;">Hi ${options.customerName},</p>
        <p style="color: #555; line-height: 1.6;">Thank you for your purchase! Your ${isSingle ? 'playbook is' : 'playbooks are'} attached to this email as PDF${isSingle ? '' : 's'}.</p>
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #ec4899;">
          <p style="font-weight: bold; color: #1e3a5f; margin: 0 0 10px;">Your ${isSingle ? 'Playbook' : 'Playbooks'}:</p>
          <ul style="margin: 0; padding-left: 20px;">${playbookList}</ul>
        </div>
        <p style="color: #555; line-height: 1.6;">Each playbook includes practical frameworks, templates, and action items you can start using immediately.</p>
        <div style="background: #fdf2f8; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="font-weight: bold; color: #1e3a5f; margin: 0 0 8px;">Need hands-on support?</p>
          <p style="color: #555; margin: 0 0 12px; font-size: 14px;">Our consulting team can help you implement these frameworks with your organization.</p>
          <a href="https://www.performanceprocesses.com/free-audit" style="display: inline-block; background: #ec4899; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px;">Book a Free Audit</a>
        </div>
        <p style="color: #555; line-height: 1.6;">If you have any questions, reply to this email or reach out at <a href="mailto:contact@performanceprocesses.com" style="color: #1e3a5f;">contact@performanceprocesses.com</a>.</p>
        <p style="color: #333; margin-top: 25px;">Best regards,<br><strong>Danai Makore</strong><br><span style="color: #666; font-size: 13px;">Founder & Principal Consultant</span></p>
      </div>
      <div style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #999;">
        <p style="margin: 0;">Performance Processes | Management Consulting</p>
        <p style="margin: 5px 0 0;"><a href="https://www.performanceprocesses.com" style="color: #1e3a5f;">www.performanceprocesses.com</a></p>
      </div>
    </div>
  `;

  const attachments = options.pdfBuffers.map((buffer, i) => ({
    filename: `${options.playbookNames[i].replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-')}.pdf`,
    content: buffer,
    contentType: 'application/pdf' as const,
  }));

  await transport.sendMail({
    from: `"Performance Processes" <${fromEmail}>`,
    to: options.to,
    subject: `Your Playbook${isSingle ? '' : 's'}: ${options.playbookNames.join(', ')}`,
    html,
    attachments,
  });

  console.log(`Playbook delivery email sent to ${options.to}: ${options.playbookNames.join(', ')}`);
}

export function isPlaybookProduct(productName: string): boolean {
  return productName in PLAYBOOK_DATA;
}

export function getAvailablePlaybookNames(): string[] {
  return Object.keys(PLAYBOOK_DATA);
}
