export interface PlaybookSection {
  title: string;
  description: string;
  steps: string[];
  tips: string[];
}

export interface PlaybookData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  idealFor: string;
  tier: string;
  sections: PlaybookSection[];
}

export const PLAYBOOK_CONTENT: PlaybookData[] = [
  {
    id: "performance-kickstart",
    name: "The Performance Kickstart Kit",
    tagline: "Start strong. Stay consistent.",
    description: "Everything you need to set meaningful goals, build weekly momentum, and track what matters.",
    idealFor: "New managers, solo founders, and professionals who want structure without complexity.",
    tier: "foundations",
    sections: [
      {
        title: "Goal-Setting Templates",
        description: "A structured framework for setting goals that are specific, measurable, and aligned with your bigger vision. These templates help you move from vague ambitions to concrete action items.",
        steps: [
          "Define your 90-day vision by identifying 3-5 key outcomes you want to achieve",
          "Break each outcome into monthly milestones with clear success criteria",
          "Use the SMART goal worksheet to refine each goal with specificity and deadlines",
          "Assign ownership and priority levels to each goal using the priority matrix",
          "Set up a weekly review cadence to track progress against your goals"
        ],
        tips: [
          "Limit yourself to 3-5 goals per quarter to maintain focus and avoid spreading too thin",
          "Write goals as outcomes, not activities — focus on results rather than effort",
          "Review and adjust goals monthly to stay aligned with changing priorities",
          "Share your goals with an accountability partner or manager for added commitment"
        ]
      },
      {
        title: "Weekly Planning Tools",
        description: "A structured weekly planning system that helps you prioritize your most important work, manage your energy, and maintain focus throughout the week.",
        steps: [
          "Begin each week with a 15-minute planning session using the weekly planner template",
          "Identify your top 3 priorities for the week that align with your quarterly goals",
          "Time-block your calendar using the energy management guide to match tasks to peak hours",
          "Schedule buffer time for unexpected tasks and reactive work",
          "End each week with a 10-minute reflection using the weekly review checklist"
        ],
        tips: [
          "Protect your first two hours each day for deep, focused work",
          "Batch similar tasks together to reduce context-switching costs",
          "Use the 'Must Do / Should Do / Could Do' framework to ruthlessly prioritize",
          "Keep a parking lot list for ideas that arise mid-week but aren't urgent"
        ]
      },
      {
        title: "Personal Performance Scorecard",
        description: "A visual tracking tool that helps you measure your personal performance across multiple dimensions, ensuring balanced progress toward your goals.",
        steps: [
          "Select 4-6 performance categories that matter most to your role and goals",
          "Define 1-2 measurable indicators for each category using the scorecard template",
          "Set baseline measurements and target levels for each indicator",
          "Update your scorecard weekly with actual performance data",
          "Use the trend analysis section to identify patterns and areas for improvement"
        ],
        tips: [
          "Include both leading indicators (inputs) and lagging indicators (results)",
          "Use a simple red/yellow/green system for quick visual assessment",
          "Review your scorecard with your manager monthly for alignment and support",
          "Celebrate consistent green metrics — sustained performance deserves recognition"
        ]
      },
      {
        title: "Progress Tracking Guide",
        description: "A comprehensive guide to building a progress tracking habit that keeps you motivated, informed, and accountable over the long term.",
        steps: [
          "Set up your tracking system using the provided digital or printable templates",
          "Define your tracking frequency for each goal (daily, weekly, or monthly)",
          "Record both quantitative metrics and qualitative observations in your tracker",
          "Conduct monthly progress reviews using the structured review template",
          "Adjust your approach based on trend data and lessons learned"
        ],
        tips: [
          "Track consistently even when progress is slow — data from plateaus is valuable",
          "Use the habit stacking technique to attach tracking to an existing daily routine",
          "Focus on trends over individual data points to avoid overreacting to single days",
          "Share progress updates with stakeholders to build trust and transparency"
        ]
      }
    ]
  },
  {
    id: "hiring-right",
    name: "The Hiring Right Playbook",
    tagline: "Better hires. Fewer regrets.",
    description: "Hire with confidence using structured templates that reduce bias and improve outcomes.",
    idealFor: "Growing teams, first-time hiring managers, and HR professionals building repeatable processes.",
    tier: "foundations",
    sections: [
      {
        title: "Job Description Templates",
        description: "Ready-to-use templates for crafting clear, compelling job descriptions that attract the right candidates and set accurate expectations for the role.",
        steps: [
          "Start with the role impact statement — describe why this role matters to the organization",
          "Define 5-7 key responsibilities using the structured responsibility framework",
          "List required qualifications separately from preferred qualifications",
          "Include information about team culture, growth opportunities, and benefits",
          "Review the description using the inclusive language checklist to remove biased wording"
        ],
        tips: [
          "Focus on outcomes and impact rather than years of experience requirements",
          "Keep descriptions under 700 words to maximize candidate engagement",
          "Use the competency-based format to attract candidates who can demonstrate skills",
          "Include salary ranges when possible to respect candidates' time and increase applications"
        ]
      },
      {
        title: "Interview Scorecards",
        description: "Structured evaluation tools that ensure consistent, fair, and thorough candidate assessment across all interviews and interviewers.",
        steps: [
          "Define 4-6 core competencies for the role using the competency mapping template",
          "Create behavioral interview questions aligned to each competency",
          "Set clear rating criteria (1-5 scale) with descriptions for each level",
          "Train all interviewers on the scorecard before the interview process begins",
          "Aggregate scores across interviewers using the consensus scoring template"
        ],
        tips: [
          "Score candidates immediately after each interview to avoid recency bias",
          "Use the same scorecard for all candidates to ensure fair comparison",
          "Include a 'cultural add' section rather than 'cultural fit' to promote diversity",
          "Debrief as a panel only after individual scores are submitted to avoid groupthink"
        ]
      },
      {
        title: "Onboarding Checklists",
        description: "Comprehensive checklists covering the first 30, 60, and 90 days to ensure new hires feel welcomed, equipped, and productive from day one.",
        steps: [
          "Complete the pre-arrival checklist: equipment, access, and welcome materials",
          "Follow the Day 1 agenda template for a structured and positive first impression",
          "Use the 30-day checklist to cover role training, key relationships, and early wins",
          "Implement the 60-day checkpoint for feedback exchange and goal alignment",
          "Complete the 90-day review using the structured performance conversation guide"
        ],
        tips: [
          "Assign an onboarding buddy separate from the direct manager",
          "Schedule one-on-ones weekly for the first month, then bi-weekly",
          "Use the social integration checklist to help new hires build relationships",
          "Collect onboarding feedback at 30 and 90 days to continuously improve the process"
        ]
      },
      {
        title: "Candidate Evaluation Rubrics",
        description: "A standardized rubric system for evaluating candidates across technical skills, cultural alignment, and growth potential.",
        steps: [
          "Map each role requirement to a specific evaluation criterion",
          "Define 'strong yes,' 'yes,' 'neutral,' 'no,' and 'strong no' benchmarks for each criterion",
          "Use the reference check template to validate top candidates' strengths",
          "Complete the final comparison matrix to objectively rank your top candidates",
          "Document your hiring decision rationale for future reference and compliance"
        ],
        tips: [
          "Weight criteria based on role priorities — not all competencies are equally important",
          "Use work samples or simulations where possible for more accurate assessment",
          "Consider growth trajectory alongside current skills for junior roles",
          "Keep evaluation notes factual and behavior-based to support defensible decisions"
        ]
      }
    ]
  },
  {
    id: "sops-that-scale",
    name: "The SOPs That Scale Starter Pack",
    tagline: "Build once. Scale forever.",
    description: "Document your processes so your team can execute without you in the room.",
    idealFor: "Operations leads, growing teams, and founders preparing to delegate.",
    tier: "foundations",
    sections: [
      {
        title: "SOP Templates",
        description: "Ready-to-customize Standard Operating Procedure templates that make it easy to document any process in a clear, consistent, and actionable format.",
        steps: [
          "Choose the appropriate SOP template based on process complexity (simple, moderate, or complex)",
          "Fill in the process header: purpose, scope, owner, and review frequency",
          "Document each step using the action-based writing framework",
          "Add decision points, exceptions, and escalation paths where needed",
          "Review the completed SOP with the team and incorporate feedback before finalizing"
        ],
        tips: [
          "Write SOPs at the level of detail needed for someone with basic training to follow",
          "Include visual aids (screenshots, diagrams) for complex procedures",
          "Version-control all SOPs and schedule quarterly reviews",
          "Start with your most critical or most frequently asked-about processes"
        ]
      },
      {
        title: "Process Mapping Guide",
        description: "A step-by-step guide to visually mapping your business processes, identifying bottlenecks, and finding opportunities for improvement.",
        steps: [
          "Select a process to map and define its start and end points",
          "List all steps in the process from start to finish using the process inventory template",
          "Identify inputs, outputs, and handoffs between people or systems",
          "Map the process visually using the provided flowchart framework",
          "Analyze the map for bottlenecks, redundancies, and improvement opportunities"
        ],
        tips: [
          "Walk through the process with the people who actually do the work",
          "Map the process as-is before designing the ideal to-be state",
          "Use color coding to distinguish between value-adding and non-value-adding steps",
          "Keep maps simple — if it's too complex to understand at a glance, break it into sub-processes"
        ]
      },
      {
        title: "Team Accountability Tracker",
        description: "A tracking tool that creates clear ownership, deadlines, and follow-up structures so nothing falls through the cracks.",
        steps: [
          "Define all recurring tasks and responsibilities using the task inventory template",
          "Assign clear ownership for each task with the RACI assignment matrix",
          "Set deadlines and review frequencies for each accountability item",
          "Implement the weekly check-in format to review progress and address blockers",
          "Use the escalation framework when accountability gaps are identified"
        ],
        tips: [
          "Make accountability visible — use shared dashboards or trackers the whole team can see",
          "Focus on outcomes, not micromanaging activities",
          "Celebrate follow-through publicly to reinforce the accountability culture",
          "Address missed commitments promptly using the constructive feedback template"
        ]
      },
      {
        title: "Quality Checklist Framework",
        description: "A framework for creating quality checklists that ensure consistency and catch errors before they reach customers.",
        steps: [
          "Identify quality-critical steps in each process using the quality mapping template",
          "Define clear pass/fail criteria for each quality checkpoint",
          "Create checklists using the provided templates for pre-work, in-process, and final checks",
          "Train team members on using checklists consistently",
          "Track checklist compliance and error rates to measure quality improvement"
        ],
        tips: [
          "Keep checklists short and focused — 5-10 items per checklist is ideal",
          "Update checklists whenever a new type of error is discovered",
          "Use digital checklists where possible for better tracking and compliance data",
          "Conduct periodic audits to ensure checklists are being followed consistently"
        ]
      }
    ]
  },
  {
    id: "managers-first-90",
    name: "The Manager's First 90 Days",
    tagline: "Lead with clarity from day one.",
    description: "Hit the ground running in a new leadership role with a clear plan for your first three months.",
    idealFor: "Newly promoted managers, leaders transitioning to new teams, and first-time people managers.",
    tier: "foundations",
    sections: [
      {
        title: "Transition Plan Template",
        description: "A structured plan for navigating the first 90 days in a new management role, broken into three phases: Listen, Learn, and Lead.",
        steps: [
          "Complete the pre-start preparation checklist before your first day",
          "Phase 1 (Days 1-30): Focus on listening — schedule 1-on-1s with every team member and key stakeholders",
          "Phase 2 (Days 31-60): Focus on learning — understand systems, processes, and team dynamics",
          "Phase 3 (Days 61-90): Focus on leading — implement your initial changes and establish your leadership rhythm",
          "Document your transition insights using the learning journal template"
        ],
        tips: [
          "Resist the urge to make big changes in the first 30 days — listen first",
          "Build relationships before building strategy",
          "Identify 2-3 quick wins that demonstrate value without disrupting the team",
          "Communicate your leadership philosophy early and authentically"
        ]
      },
      {
        title: "Team Assessment Framework",
        description: "Tools for understanding your team's strengths, gaps, dynamics, and development needs so you can lead effectively.",
        steps: [
          "Conduct individual skills assessments using the competency mapping template",
          "Map team dynamics using the team health assessment survey",
          "Identify skill gaps and development priorities for each team member",
          "Create individual development plans using the growth planning template",
          "Assess team culture and morale using the anonymous pulse survey"
        ],
        tips: [
          "Approach assessment with curiosity, not judgment",
          "Look for strengths to leverage, not just gaps to fill",
          "Consider team composition and balance, not just individual capabilities",
          "Share your assessment findings with the team to build trust and transparency"
        ]
      },
      {
        title: "Quick-Win Action Planner",
        description: "A framework for identifying and executing quick wins that build credibility, momentum, and team confidence in your leadership.",
        steps: [
          "Identify potential quick wins using the opportunity assessment matrix",
          "Evaluate each opportunity for impact, feasibility, and visibility",
          "Select 2-3 quick wins to pursue in your first 60 days",
          "Create action plans for each quick win using the execution template",
          "Communicate wins and learnings to stakeholders using the progress update format"
        ],
        tips: [
          "Choose wins that benefit the team, not just your visibility",
          "Involve team members in executing quick wins to build ownership",
          "Document the process and results for future reference",
          "Use quick wins to demonstrate your values and approach to leadership"
        ]
      },
      {
        title: "Stakeholder Mapping Tool",
        description: "A visual tool for identifying, prioritizing, and managing relationships with key stakeholders during your transition.",
        steps: [
          "List all stakeholders using the stakeholder identification worksheet",
          "Map stakeholders on the influence/interest matrix to prioritize engagement",
          "Define your relationship strategy for each stakeholder quadrant",
          "Schedule initial meetings with high-priority stakeholders in your first two weeks",
          "Track relationship health and engagement using the stakeholder log"
        ],
        tips: [
          "Don't overlook informal influencers who may not have formal authority",
          "Adapt your communication style to each stakeholder's preferences",
          "Build alliances early — you'll need support when implementing changes later",
          "Revisit your stakeholder map monthly as relationships and priorities evolve"
        ]
      }
    ]
  },
  {
    id: "strategic-planning-blueprint",
    name: "The Strategic Planning Blueprint",
    tagline: "From vision to execution.",
    description: "A complete strategic planning system to align your team, set priorities, and build a roadmap that sticks.",
    idealFor: "Leadership teams, department heads, and organizations entering a new growth phase.",
    tier: "systems",
    sections: [
      {
        title: "Strategic Planning Workbook",
        description: "A comprehensive workbook that guides you through the entire strategic planning process, from vision setting to execution planning.",
        steps: [
          "Define or refine your organization's mission, vision, and values using the alignment workshop template",
          "Conduct an environmental scan using the provided market analysis framework",
          "Identify strategic themes and priorities based on your analysis",
          "Develop strategic objectives for each theme using the objective-setting template",
          "Create an implementation timeline with milestones and accountability"
        ],
        tips: [
          "Involve key stakeholders in the planning process for buy-in and diverse perspectives",
          "Keep your strategy document concise — if people can't remember it, they can't execute it",
          "Build in flexibility for changing market conditions",
          "Connect every strategic objective to measurable outcomes"
        ]
      },
      {
        title: "SWOT Analysis Framework",
        description: "A structured approach to assessing your organization's Strengths, Weaknesses, Opportunities, and Threats with actionable insights.",
        steps: [
          "Gather data using the pre-SWOT research checklist (financial data, market trends, team feedback)",
          "Facilitate a SWOT workshop using the provided facilitation guide and templates",
          "Prioritize SWOT items by impact and likelihood using the scoring matrix",
          "Generate strategic options by crossing strengths with opportunities and weaknesses with threats",
          "Translate the top insights into strategic initiatives using the initiative planning template"
        ],
        tips: [
          "Be honest about weaknesses — a SWOT is only useful if it's truthful",
          "Focus on the top 3-5 items in each quadrant rather than creating exhaustive lists",
          "Update your SWOT analysis annually or when major market shifts occur",
          "Use the competitive SWOT comparison template to benchmark against competitors"
        ]
      },
      {
        title: "OKR Setting Templates",
        description: "Templates and frameworks for setting Objectives and Key Results that drive focus, alignment, and measurable progress.",
        steps: [
          "Define 3-5 organizational objectives for the upcoming quarter or year",
          "Create 2-4 measurable key results for each objective using the KR writing guide",
          "Cascade OKRs from organizational level to team and individual levels",
          "Set up a tracking system using the OKR dashboard template",
          "Implement the weekly check-in and quarterly scoring process"
        ],
        tips: [
          "Set ambitious but achievable objectives — aim for 70% completion as a healthy target",
          "Key results should be measurable and time-bound — if you can't measure it, rewrite it",
          "Separate OKRs from compensation to encourage stretch goals",
          "Review and adjust OKRs mid-quarter if circumstances change significantly"
        ]
      },
      {
        title: "1-3 Year Roadmap Builder",
        description: "A visual planning tool for mapping your strategic priorities across a 1-3 year horizon with clear phases and dependencies.",
        steps: [
          "Define your strategic horizons: Now (0-6 months), Next (6-18 months), Later (18-36 months)",
          "Map strategic initiatives to each horizon using the roadmap canvas",
          "Identify dependencies and sequencing between initiatives",
          "Assign resources and budget estimates to each initiative",
          "Create quarterly milestones for the first year using the milestone planner"
        ],
        tips: [
          "Be most detailed about the near-term and more directional about the long-term",
          "Build in review points to reassess and adjust the roadmap quarterly",
          "Communicate the roadmap visually to maximize stakeholder understanding",
          "Use the scenario planning templates to prepare for major uncertainties"
        ]
      },
      {
        title: "Quarterly Review Guide",
        description: "A structured process for reviewing strategic progress, celebrating wins, learning from gaps, and adjusting course for the next quarter.",
        steps: [
          "Gather data on all strategic metrics and OKR scores before the review",
          "Use the quarterly review agenda template to structure the session",
          "Assess each strategic initiative against its milestones and success criteria",
          "Identify key learnings and adjust the strategic plan as needed",
          "Set priorities and action items for the next quarter"
        ],
        tips: [
          "Make quarterly reviews a safe space for honest assessment — avoid blame",
          "Celebrate progress and wins before diving into gaps and challenges",
          "Keep reviews focused — 2-3 hours maximum with a clear agenda",
          "Document decisions and share them with the broader team within 48 hours"
        ]
      }
    ]
  },
  {
    id: "performance-management-system",
    name: "The Performance Management System",
    tagline: "Measure what matters. Manage with intention.",
    description: "A ready-to-deploy performance management system with KPIs, review cycles, and feedback frameworks.",
    idealFor: "HR leaders, COOs, and organizations building or overhauling their performance infrastructure.",
    tier: "systems",
    sections: [
      {
        title: "KPI Library (100+ Metrics)",
        description: "A comprehensive library of key performance indicators organized by function and role, ready to be customized for your organization.",
        steps: [
          "Review the KPI library organized by department: Sales, Marketing, Operations, HR, Finance, and more",
          "Select 5-8 KPIs per role or team using the KPI selection worksheet",
          "Customize each KPI with your specific targets, data sources, and measurement frequency",
          "Create KPI scorecards using the provided templates for individual and team views",
          "Implement the KPI reporting cadence with the dashboard setup guide"
        ],
        tips: [
          "Less is more — too many KPIs dilute focus and overwhelm teams",
          "Balance leading indicators (predictive) with lagging indicators (results-based)",
          "Ensure every KPI has a clear owner and data source",
          "Review and refresh KPIs annually to keep them relevant"
        ]
      },
      {
        title: "Review Cycle Templates",
        description: "Complete templates for structuring annual, semi-annual, and quarterly performance review cycles that are fair, consistent, and development-focused.",
        steps: [
          "Choose your review cycle frequency using the decision framework guide",
          "Customize the self-assessment template for employees to complete before reviews",
          "Use the manager assessment template to evaluate each direct report",
          "Conduct review conversations using the structured dialogue guide",
          "Document outcomes and development plans using the review summary template"
        ],
        tips: [
          "Reviews should not contain surprises — give feedback continuously throughout the cycle",
          "Use calibration sessions to ensure consistent standards across managers",
          "Focus 60% on future development and 40% on past performance",
          "Train managers on giving constructive feedback before launching the review cycle"
        ]
      },
      {
        title: "Feedback Frameworks",
        description: "Practical frameworks for giving, receiving, and embedding feedback into your organization's daily operations.",
        steps: [
          "Introduce the SBI (Situation-Behavior-Impact) feedback framework to your team",
          "Set up regular feedback touchpoints using the 1-on-1 meeting template",
          "Implement peer feedback using the 360-degree feedback survey template",
          "Create a feedback culture using the team feedback norms workshop guide",
          "Track feedback frequency and quality using the feedback health dashboard"
        ],
        tips: [
          "Give feedback close to the event — timeliness increases impact",
          "Balance positive and constructive feedback — aim for a 3:1 ratio",
          "Make feedback specific and actionable, not vague and general",
          "Model receiving feedback well as a leader to normalize the practice"
        ]
      },
      {
        title: "Performance Dashboard Template",
        description: "A visual dashboard template for tracking team and organizational performance at a glance, designed for weekly and monthly review.",
        steps: [
          "Set up the dashboard using the provided spreadsheet or digital template",
          "Configure data feeds for your selected KPIs and metrics",
          "Customize the visual layout to highlight the most important metrics",
          "Set up automated alerts for metrics that fall outside acceptable ranges",
          "Use the dashboard in weekly team meetings and monthly leadership reviews"
        ],
        tips: [
          "Keep the dashboard focused on 8-12 key metrics for maximum clarity",
          "Use color coding (green/yellow/red) for instant visual assessment",
          "Include trend lines to show direction, not just current performance",
          "Make the dashboard accessible to everyone who needs to see it"
        ]
      },
      {
        title: "Calibration Guide",
        description: "A guide to running effective calibration sessions that ensure performance ratings are fair, consistent, and defensible across the organization.",
        steps: [
          "Prepare for calibration by gathering all manager assessments and performance data",
          "Use the calibration session facilitation guide to structure the discussion",
          "Apply the rating distribution framework to identify outliers and inconsistencies",
          "Discuss and adjust ratings using evidence-based criteria from the rubric",
          "Document calibration decisions and communicate outcomes to managers"
        ],
        tips: [
          "Require managers to bring specific examples to support their ratings",
          "Use a neutral facilitator to keep discussions objective",
          "Calibrate across similar roles and levels for the most meaningful comparisons",
          "Keep calibration sessions confidential and focused on fairness"
        ]
      }
    ]
  },
  {
    id: "culture-engagement-toolkit",
    name: "The Culture & Engagement Toolkit",
    tagline: "Culture by design, not by default.",
    description: "Understand and shape your workplace culture with practical tools for engagement and alignment.",
    idealFor: "People & culture teams, founders building intentional culture, and HR professionals.",
    tier: "systems",
    sections: [
      {
        title: "Engagement Survey Templates",
        description: "Ready-to-deploy employee engagement surveys with validated questions, analysis frameworks, and action planning templates.",
        steps: [
          "Select the appropriate survey from the library: annual comprehensive, quarterly pulse, or onboarding check-in",
          "Customize questions using the question bank organized by engagement driver",
          "Deploy the survey using the communication and launch template",
          "Analyze results using the provided analysis framework and benchmarking data",
          "Create action plans for each key finding using the improvement planning template"
        ],
        tips: [
          "Keep surveys under 15 minutes to maximize completion rates",
          "Guarantee anonymity and communicate it clearly to build trust in the process",
          "Act on results visibly — the fastest way to kill engagement surveys is to ignore findings",
          "Share results transparently with the team, including areas that need improvement"
        ]
      },
      {
        title: "Culture Audit Framework",
        description: "A systematic approach to understanding your current culture — what's working, what's not, and where the gaps are between stated and actual values.",
        steps: [
          "Document your stated culture (values, mission, espoused behaviors) using the culture inventory template",
          "Assess actual culture through observation, interviews, and the culture assessment survey",
          "Map the gap between stated and actual culture using the alignment matrix",
          "Identify cultural strengths to amplify and gaps to address",
          "Create a culture transformation plan with specific initiatives and timelines"
        ],
        tips: [
          "Culture is what people do when no one is watching — observe behavior, not just words",
          "Include diverse voices in the assessment to get a complete picture",
          "Focus on 2-3 cultural shifts at a time — trying to change everything changes nothing",
          "Leadership behavior is the strongest signal of culture — start culture change at the top"
        ]
      },
      {
        title: "Values Alignment Workshop Guide",
        description: "A facilitation guide for running workshops that help teams define, refine, and operationalize their core values.",
        steps: [
          "Prepare for the workshop using the pre-work template and participant briefing guide",
          "Facilitate the values discovery exercise using the provided activity cards and prompts",
          "Narrow down to 3-5 core values using the prioritization framework",
          "Define behavioral indicators for each value using the values-in-action template",
          "Create an integration plan to embed values into hiring, reviews, and daily operations"
        ],
        tips: [
          "Values should differentiate you — avoid generic values like 'integrity' without specific meaning",
          "Define what each value looks like in practice with concrete behavioral examples",
          "Test values against real scenarios — would this value guide a difficult decision?",
          "Revisit and validate values every 2-3 years to ensure they still resonate"
        ]
      },
      {
        title: "Action Planning Templates",
        description: "Structured templates for turning culture and engagement insights into concrete action plans with owners, timelines, and success measures.",
        steps: [
          "Prioritize focus areas using the impact-effort matrix from the engagement results",
          "Define specific initiatives for each focus area using the initiative planning template",
          "Assign owners, timelines, and resources for each initiative",
          "Set up progress tracking using the culture initiative dashboard",
          "Schedule quarterly reviews to assess progress and adjust the plan"
        ],
        tips: [
          "Start with 2-3 high-impact, low-effort initiatives for quick momentum",
          "Involve employees in designing solutions — they know what will work best",
          "Communicate progress regularly to maintain trust and momentum",
          "Measure both activity (did we do it?) and impact (did it make a difference?)"
        ]
      }
    ]
  },
  {
    id: "organizational-design",
    name: "The Organizational Design Playbook",
    tagline: "Design the organization your strategy demands.",
    description: "Redesign your organization for clarity, efficiency, and growth with proven structural frameworks.",
    idealFor: "CEOs, COOs, and leadership teams navigating restructuring, rapid growth, or role confusion.",
    tier: "advanced",
    sections: [
      {
        title: "Org Structure Templates",
        description: "Templates for the most common organizational structures — functional, divisional, matrix, and flat — with guidance on selecting the right model for your context.",
        steps: [
          "Assess your current org structure using the structural assessment template",
          "Evaluate structure options using the decision matrix (functional, divisional, matrix, flat, hybrid)",
          "Design your target org structure using the org chart builder template",
          "Define reporting relationships and spans of control for each level",
          "Create a transition plan from current to target structure"
        ],
        tips: [
          "Structure should follow strategy — design around what you need to achieve",
          "Consider span of control (5-8 direct reports is typically optimal)",
          "Plan for the org you'll need in 12-18 months, not just today",
          "Communicate structural changes clearly and explain the 'why' behind them"
        ]
      },
      {
        title: "Role Clarity Matrices",
        description: "Tools for defining clear roles, responsibilities, and boundaries that eliminate confusion and overlap.",
        steps: [
          "Audit existing roles using the role inventory template",
          "Define each role's purpose, key responsibilities, and decision authority",
          "Map role interdependencies using the collaboration matrix",
          "Identify and resolve role overlaps and gaps using the gap analysis template",
          "Document finalized roles using the role profile template"
        ],
        tips: [
          "Involve role holders in defining their roles for accuracy and buy-in",
          "Focus on outcomes and accountability, not just tasks and activities",
          "Review role definitions when strategy shifts or new roles are created",
          "Use role clarity conversations as development opportunities"
        ]
      },
      {
        title: "RACI Charts",
        description: "Templates and guides for creating RACI (Responsible, Accountable, Consulted, Informed) charts that clarify decision-making and accountability.",
        steps: [
          "Identify the key processes and decisions that need RACI clarification",
          "List all relevant roles and stakeholders for each process",
          "Assign RACI designations using the provided template and decision guide",
          "Validate RACI assignments with stakeholders to ensure accuracy",
          "Communicate and display RACI charts where teams can easily reference them"
        ],
        tips: [
          "Every task should have exactly one 'A' (Accountable) — no more, no less",
          "Minimize the number of 'C' (Consulted) roles to avoid bottlenecks",
          "Review RACIs when processes change or new team members join",
          "Use RACIs to resolve confusion and conflicts, not to create bureaucracy"
        ]
      },
      {
        title: "Restructuring Guide",
        description: "A step-by-step guide for planning and executing organizational restructuring with minimal disruption and maximum effectiveness.",
        steps: [
          "Define the business case for restructuring using the assessment template",
          "Design the target organization using the org design principles framework",
          "Create a detailed transition plan with phases, timelines, and milestones",
          "Develop the communication plan using the stakeholder messaging templates",
          "Execute the transition with the change management checklist"
        ],
        tips: [
          "Over-communicate during restructuring — silence breeds anxiety and rumors",
          "Take care of people first — restructuring affects livelihoods and morale",
          "Plan for a productivity dip during transition and build in buffer time",
          "Celebrate the new structure's early wins to build confidence"
        ]
      },
      {
        title: "Span of Control Analysis",
        description: "Tools for analyzing and optimizing spans of control across your organization to improve management effectiveness.",
        steps: [
          "Calculate current spans of control for every manager using the analysis spreadsheet",
          "Compare against benchmarks for your industry and role complexity",
          "Identify managers with spans that are too wide or too narrow",
          "Develop recommendations for adjustments using the optimization template",
          "Create implementation plans for span of control changes"
        ],
        tips: [
          "Optimal span depends on role complexity, manager experience, and team maturity",
          "Wide spans work well for experienced, autonomous teams with clear processes",
          "Narrow spans are appropriate for complex, developing, or high-stakes work",
          "Consider managerial capacity for coaching and development, not just oversight"
        ]
      },
      {
        title: "Communication Flow Mapping",
        description: "Tools for mapping and optimizing how information flows through your organization to reduce silos and improve coordination.",
        steps: [
          "Map current communication flows using the communication audit template",
          "Identify bottlenecks, silos, and information gaps in the current flow",
          "Design the ideal communication architecture using the flow design template",
          "Implement improvements with the communication cadence planner",
          "Monitor and adjust using the communication effectiveness survey"
        ],
        tips: [
          "Map both formal (meetings, reports) and informal (hallway conversations, chat) channels",
          "Look for information that passes through too many layers before reaching decision-makers",
          "Simplify meeting structures — most organizations have too many meetings",
          "Use the right channel for the right type of communication"
        ]
      }
    ]
  },
  {
    id: "executive-transition",
    name: "The Executive Transition Toolkit",
    tagline: "Set the tone. Build trust. Deliver early wins.",
    description: "Navigate senior leadership transitions with a structured approach to the critical first 100 days.",
    idealFor: "Incoming executives, board members overseeing transitions, and HR supporting C-suite changes.",
    tier: "advanced",
    sections: [
      {
        title: "Leadership Transition Roadmap",
        description: "A comprehensive 100-day roadmap for incoming executives, structured into phases that build understanding, relationships, and credibility.",
        steps: [
          "Phase 0 (Pre-Start): Complete the executive onboarding prep checklist",
          "Phase 1 (Days 1-30): Immersion — conduct listening tours, review financials, and assess culture",
          "Phase 2 (Days 31-60): Diagnosis — identify priorities, build your leadership team, and define quick wins",
          "Phase 3 (Days 61-100): Action — launch key initiatives, establish governance, and communicate your vision",
          "Document insights and decisions using the executive transition journal template"
        ],
        tips: [
          "Your first impression is formed in the first two weeks — be intentional about it",
          "Balance confidence with humility — demonstrate competence while showing respect for what exists",
          "Build relationships across all levels, not just with your direct reports",
          "Resist the pressure to have all the answers immediately — ask great questions instead"
        ]
      },
      {
        title: "Stakeholder Mapping Tool",
        description: "An advanced stakeholder analysis framework designed for executive-level complexity, including board members, investors, and key external partners.",
        steps: [
          "Identify all stakeholders using the executive stakeholder inventory (internal, board, external)",
          "Assess each stakeholder's influence, interest, and current disposition toward you",
          "Map stakeholders on the power-interest grid using the provided template",
          "Develop personalized engagement strategies for your top 15-20 stakeholders",
          "Track relationship development using the stakeholder relationship dashboard"
        ],
        tips: [
          "Pay special attention to your board chair and key board members in the first 30 days",
          "Identify potential allies and potential resistors early and engage both proactively",
          "Understand each stakeholder's priorities and concerns before your first meeting",
          "Build credibility through listening and small commitments before making big asks"
        ]
      },
      {
        title: "First 100 Days Plan",
        description: "A detailed action plan template for the first 100 days that balances learning, relationship-building, and delivering early results.",
        steps: [
          "Set 3-5 objectives for your first 100 days using the priority setting framework",
          "Plan your calendar and key meetings using the 100-day calendar template",
          "Identify 2-3 quick wins that are achievable within 60 days",
          "Build your leadership team rhythm (meeting cadence, reporting, communication norms)",
          "Prepare your 100-day review presentation for the board or leadership team"
        ],
        tips: [
          "Don't try to fix everything in 100 days — focus on the vital few priorities",
          "Balance short-term wins with long-term strategic groundwork",
          "Keep a log of decisions made and rationale for future reference",
          "Request formal feedback at day 30 and day 60 to course-correct if needed"
        ]
      },
      {
        title: "Board Reporting Templates",
        description: "Professional templates for executive board reporting that demonstrate strategic thinking, progress, and transparency.",
        steps: [
          "Review the board reporting best practices guide for your organization type",
          "Customize the board report template with your organization's KPIs and strategic initiatives",
          "Prepare your first board update using the executive summary format",
          "Set up the recurring board reporting cadence using the planning calendar",
          "Use the board meeting preparation checklist before each board session"
        ],
        tips: [
          "Lead with insights and recommendations, not just data — boards want your perspective",
          "Keep board reports concise — 5-8 pages maximum for the main report",
          "Flag risks and challenges proactively — boards dislike surprises",
          "Build a consistent reporting format so board members know where to find information"
        ]
      },
      {
        title: "Team Alignment Framework",
        description: "Tools for assessing, aligning, and developing your leadership team during the transition period.",
        steps: [
          "Assess your inherited team using the leadership team evaluation template",
          "Conduct individual alignment conversations using the structured 1-on-1 guide",
          "Identify team strengths, gaps, and development needs",
          "Establish team norms and operating agreements using the team charter template",
          "Create individual development plans for each leadership team member"
        ],
        tips: [
          "Give existing team members a fair chance to demonstrate their capabilities",
          "Make people decisions thoughtfully but don't delay them beyond 90 days if needed",
          "Be transparent about your expectations and leadership style",
          "Build team trust through vulnerability and consistency"
        ]
      }
    ]
  },
  {
    id: "change-management",
    name: "The Change Management Playbook",
    tagline: "Change happens. Lead it.",
    description: "Lead organizational change with confidence using proven frameworks for communication, adoption, and resistance.",
    idealFor: "Change leaders, project managers, and organizations undergoing transformation or integration.",
    tier: "advanced",
    sections: [
      {
        title: "Change Readiness Assessment",
        description: "A diagnostic tool for assessing your organization's readiness for change, identifying potential barriers, and planning mitigation strategies.",
        steps: [
          "Distribute the change readiness survey to key stakeholders using the provided template",
          "Analyze results across the five readiness dimensions: leadership, culture, capacity, history, and urgency",
          "Score your organization's overall readiness using the readiness scoring matrix",
          "Identify the top barriers to change adoption and their root causes",
          "Create a readiness enhancement plan for areas scoring below the threshold"
        ],
        tips: [
          "Assess readiness before announcing the change, not after",
          "Include people at all levels in the assessment, not just leadership",
          "Low readiness doesn't mean you can't change — it means you need to invest more in preparation",
          "Use historical change data (past successes and failures) to inform your approach"
        ]
      },
      {
        title: "Communication Plan Templates",
        description: "Strategic communication templates for every phase of the change journey, from initial announcement to post-implementation reinforcement.",
        steps: [
          "Map your communication audiences and their information needs using the audience analysis template",
          "Create key messages for each audience using the message framework template",
          "Design the communication timeline aligned to change milestones",
          "Select appropriate channels for each audience and message type",
          "Monitor communication effectiveness using the feedback and survey templates"
        ],
        tips: [
          "Communicate the 'why' before the 'what' — people need to understand the reason for change",
          "Repeat key messages through multiple channels — people need to hear things 5-7 times",
          "Create two-way communication opportunities, not just top-down announcements",
          "Address the 'what's in it for me?' question directly for each audience"
        ]
      },
      {
        title: "Resistance Management Guide",
        description: "A practical guide for understanding, preventing, and addressing resistance to change at individual, team, and organizational levels.",
        steps: [
          "Identify potential sources of resistance using the resistance mapping template",
          "Categorize resistance types (logical, psychological, sociological) for each source",
          "Develop targeted strategies for each resistance type using the intervention guide",
          "Train managers to have effective resistance conversations using the dialogue templates",
          "Monitor resistance levels throughout the change using the pulse survey tracker"
        ],
        tips: [
          "Resistance is a normal response to change — don't take it personally or try to suppress it",
          "Listen to resistance carefully — it often contains valuable information about real risks",
          "Involve resistors in solution design when possible — they often become the strongest advocates",
          "Address concerns directly and honestly — avoid dismissing or minimizing people's worries"
        ]
      },
      {
        title: "Adoption Tracker",
        description: "A tracking system for measuring change adoption across your organization, from awareness to full integration into daily operations.",
        steps: [
          "Define adoption milestones using the ADKAR model (Awareness, Desire, Knowledge, Ability, Reinforcement)",
          "Create adoption metrics for each milestone using the metrics template",
          "Set up the adoption tracking dashboard with baseline measurements",
          "Conduct regular adoption assessments using the provided survey tools",
          "Implement reinforcement strategies for areas with low adoption scores"
        ],
        tips: [
          "Track both behavioral adoption (doing the new thing) and attitudinal adoption (believing in the new thing)",
          "Celebrate adoption milestones publicly to build momentum",
          "Identify and leverage champions — people who adopt early and influence others",
          "Plan for the 'valley of despair' where productivity dips before new skills are mastered"
        ]
      },
      {
        title: "Stakeholder Engagement Playbook",
        description: "A comprehensive guide to engaging stakeholders throughout the change process to build support, maintain momentum, and ensure sustainable adoption.",
        steps: [
          "Map change stakeholders using the stakeholder impact assessment",
          "Classify stakeholders by their level of impact and influence",
          "Develop engagement strategies for each stakeholder group using the engagement matrix",
          "Create a champion network using the change champion recruitment and training guide",
          "Monitor stakeholder engagement using the engagement health dashboard"
        ],
        tips: [
          "Invest disproportionately in middle managers — they are the key to change success or failure",
          "Create formal and informal channels for stakeholder input and feedback",
          "Recognize and reward change champions visibly",
          "Be prepared to adjust your engagement approach based on feedback and changing dynamics"
        ]
      }
    ]
  }
];

export function getPlaybookByName(productName: string): PlaybookData | undefined {
  return PLAYBOOK_CONTENT.find(p => p.name === productName);
}

export function getPlaybookById(id: string): PlaybookData | undefined {
  return PLAYBOOK_CONTENT.find(p => p.id === id);
}
