/* @section: authority-platform-fallback-content */
export const siteIdentity = {
  name: "Zeeshan Sabri",
  role: "Crisis-to-Clarity Architect",
  methodology: "ClarityOS",
  tagline: "The Human OS before the System OS.",
  canonicalOrigin: "https://architect.global-mkts.com",
  email: "zeeshan@global-mkts.com",
  youtube: "https://www.youtube.com/@ZeeshanSabri83",
  instagram: "https://www.instagram.com/zsabri/",
} as const;

export type RouteMeta = {
  title: string;
  description: string;
  path: string;
  indexable?: boolean;
};

export const routeMetadata: Record<string, RouteMeta> = {
  "/": {
    title: "Zeeshan Sabri | Crisis-to-Clarity Architect",
    description: "Zeeshan Sabri, founder of ClarityOS, strengthens the human layer beneath governance, technology, and transformation.",
    path: "/",
  },
  "/the-architect": {
    title: "The Architect | Zeeshan Sabri",
    description: "Meet Zeeshan Sabri, founder of ClarityOS, and follow the lived and institutional path behind the Crisis-to-Clarity methodology.",
    path: "/the-architect",
  },
  "/clarityos": {
    title: "ClarityOS | Pre-Governance Methodology",
    description: "Explore ClarityOS, the proprietary methodology for strengthening human readiness before governance, technology, and transformation.",
    path: "/clarityos",
  },
  "/book": {
    title: "From Exile to Transformation | The Book",
    description: "Explore Zeeshan Sabri’s forthcoming memoir, its six editorial pillars, confirmed chapters, and links to the ClarityOS framework library.",
    path: "/book",
  },
  "/frameworks": {
    title: "ClarityOS Framework Library | 14 Pillars",
    description: "Explore fourteen ClarityOS framework pillars for resilience, governance, leadership, AI readiness, and institutional transformation.",
    path: "/frameworks",
  },
  "/services": {
    title: "ClarityOS Services | Personal to Enterprise",
    description: "Choose a ClarityOS Personal Session, 90-Day Enterprise Program, board advisory, or speaking engagement based on the consequence at stake.",
    path: "/services",
  },
  "/insights": {
    title: "ClarityOS Insights | Human-Layer Transformation",
    description: "Read six launch essays connecting human readiness, governance, crisis, AI adoption, GCC leadership, and the ClarityOS frameworks.",
    path: "/insights",
  },
  "/media": {
    title: "Media & Executive Profile | Zeeshan Sabri",
    description: "Access verified speaking evidence, approved channels, recovered media references, and Zeeshan Sabri’s 2026 Executive Advisory Profile.",
    path: "/media",
  },
  "/newsletter": {
    title: "The Clarity Dispatch | Zeeshan Sabri",
    description: "The Clarity Dispatch delivers one pattern, one decision, and one next step across leadership, governance, crisis, and transformation.",
    path: "/newsletter",
  },
  "/contact": {
    title: "Contact Zeeshan Sabri | Qualified Inquiry",
    description: "Start a qualified conversation about a ClarityOS session, enterprise program, board advisory, speaking, or an institutional need.",
    path: "/contact",
  },
};

export const recoveredAssets = {
  hero: "/images/recovered/hero-zeeshan.png",
  origin: "/images/recovered/origin-portrait.jpg",
  portraitSuit: "/images/recovered/portrait-suit.jpg",
  book: "/images/recovered/book-cover.png",
  compass: "/images/recovered/clarityos-compass.jpg",
  mirror: "/images/recovered/clarity-mirror.jpg",
  stage: "/images/recovered/speaking-stage.jpg",
  profile: "/executive-advisory-profile-2026.pdf",
} as const;

export const clarityComponents = [
  { number: "01", name: "Clarity", line: "Name the real problem before the system names it for you.", diagnostic: "What is actually happening beneath the visible issue?" },
  { number: "02", name: "Conditions", line: "Read the human, cultural, and operating conditions underneath change.", diagnostic: "Which conditions will support or resist the intended change?" },
  { number: "03", name: "Control", line: "Make decision rights and accountability visible.", diagnostic: "Who can decide, intervene, and own the consequence?" },
  { number: "04", name: "Capability", line: "Build the capacity required to carry the intended transformation.", diagnostic: "Can the people and institution perform what the plan assumes?" },
  { number: "05", name: "Calibration", line: "Test the system against evidence, context, and consequence.", diagnostic: "What must be adjusted before momentum becomes drift?" },
  { number: "06", name: "Correction", line: "Intervene before drift becomes institutional failure.", diagnostic: "Which action restores alignment without creating new fragility?" },
  { number: "07", name: "Continuity", line: "Protect what must endure through disruption and transition.", diagnostic: "What cannot be allowed to disappear during change?" },
  { number: "08", name: "Coaching", line: "Turn the operating logic into repeatable leadership behavior.", diagnostic: "How will leaders carry the new logic after the intervention ends?" },
] as const;

export const engagementRoadmap = [
  { number: "01", name: "Foundation", line: "Establish the human conditions the system will depend on." },
  { number: "02", name: "Operational", line: "Translate clarity into roles, routines, and decision discipline." },
  { number: "03", name: "Transformation", line: "Sequence change without outrunning organizational capacity." },
  { number: "04", name: "Integration", line: "Embed the new operating logic so it can hold under pressure." },
] as const;

export const bookParts = [
  "Roots & Resilience",
  "Fortune 500 Foundations",
  "The GCC Odyssey",
  "Frameworks & Playbooks",
  "Building Movements",
  "The Leader & The Self",
] as const;

export const bookPartRecords = bookParts.map((title, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title,
  purpose: [
    "Origins, displacement, identity, and the resilience formed before the methodology had a name.",
    "Operating discipline, institutional exposure, and the foundations that made transformation legible.",
    "Cross-cultural leadership and institution-building across the Gulf Cooperation Council context.",
    "The methods, models, and practical playbooks developed from lived and executive experience.",
    "The passage from individual work to ecosystems, institutions, and movements that outlast a founder.",
    "Character, self-governance, coaching, and the inner conditions required to carry authority responsibly.",
  ][index],
}));

export type Faq = { question: string; answer: string };

export type FrameworkRecord = {
  index: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  definition: string;
  useCases: string[];
  parameters: string[];
  process: string[];
  impact: string;
  leadMagnetSlug?: string;
  relatedChapterSlug?: string;
  relatedArticleSlug: string;
  serviceTitle: string;
  faqs: Faq[];
};

export const frameworks: FrameworkRecord[] = [
  {
    index: "01",
    slug: "exile-resilience-framework",
    title: "Exile Resilience Framework",
    category: "Resilience & identity",
    summary: "Convert displacement and discontinuity into a disciplined source of adaptive strength without romanticizing crisis.",
    definition: "A lens for examining how identity, memory, belonging, and agency can be preserved and reorganized when familiar structures disappear.",
    useCases: ["Leadership after forced or sudden transition", "Teams operating through loss of certainty", "Institutions rebuilding trust after disruption"],
    parameters: ["Identity continuity", "Sources of agency", "Loss and adaptation", "Belonging and contribution"],
    process: ["Name what was lost", "Separate identity from circumstance", "Identify retained capabilities", "Choose the next constructive contribution"],
    impact: "Used carefully, the framework can help leaders treat resilience as an operating capacity rather than a motivational slogan.",
    leadMagnetSlug: "exile-resilience-framework-pdf",
    relatedArticleSlug: "what-crisis-reveals-before-the-dashboard-does",
    serviceTitle: "ClarityOS Personal Session",
    faqs: [{ question: "Is this a therapeutic model?", answer: "No. It is a leadership and reflection framework, not clinical care or a substitute for qualified mental-health support." }],
  },
  {
    index: "02",
    slug: "cultural-ecosystem-mapping",
    title: "Cultural Ecosystem Mapping",
    category: "Cross-cultural leadership",
    summary: "Map authority, trust, influence, context, and informal decision paths before attempting to lead across a system.",
    definition: "A structured way to read the formal and informal cultural ecosystem surrounding a decision, transformation, or market entry.",
    useCases: ["GCC leadership transitions", "Cross-border programs", "Multi-stakeholder institutional change"],
    parameters: ["Formal authority", "Informal influence", "Trust routes", "Context and protocol"],
    process: ["Identify actors", "Map authority and influence", "Trace trust and information flows", "Adapt the engagement sequence"],
    impact: "The map can reduce avoidable cultural friction and improve the quality of leadership judgment before action is taken.",
    leadMagnetSlug: "cultural-ecosystem-mapping-canvas",
    relatedArticleSlug: "cross-cultural-authority-in-the-gcc",
    serviceTitle: "Board Advisory",
    faqs: [{ question: "Does the map reduce culture to stereotypes?", answer: "It should do the opposite: replace broad assumptions with observed relationships, context, and decision behavior." }],
  },
  {
    index: "03",
    slug: "identity-preservation-under-change",
    title: "Identity Preservation Under Change",
    category: "Resilience & identity",
    summary: "Protect the meaning and commitments that must endure while roles, systems, and structures change.",
    definition: "A framework for distinguishing essential identity from legacy habits so transformation can move without erasing what gives a person or institution coherence.",
    useCases: ["Organizational redesign", "Founder-to-institution transition", "Leadership role change"],
    parameters: ["Core commitments", "Symbols and rituals", "Legacy behaviors", "Future identity"],
    process: ["Name the enduring core", "Audit inherited behavior", "Retire what no longer serves", "Translate identity into new operating choices"],
    impact: "The framework can help preserve continuity while making room for change, particularly when transformation threatens belonging or meaning.",
    relatedArticleSlug: "what-crisis-reveals-before-the-dashboard-does",
    serviceTitle: "ClarityOS Personal Session",
    faqs: [{ question: "Is preservation the same as resisting change?", answer: "No. It identifies what deserves continuity so that other elements can change more deliberately." }],
  },
  {
    index: "04",
    slug: "constraint-based-innovation",
    title: "Constraint-Based Innovation",
    category: "Innovation & execution",
    summary: "Use real limits as design intelligence instead of treating every constraint only as a barrier.",
    definition: "A decision framework for converting limits in time, capability, governance, market access, or resources into a clearer innovation brief.",
    useCases: ["Crisis response", "Resource-constrained programs", "New-market execution"],
    parameters: ["Non-negotiable limits", "Available capability", "Decision window", "Acceptable consequence"],
    process: ["Inventory constraints", "Separate fixed from assumed limits", "Reframe the design question", "Test the smallest responsible move"],
    impact: "Applied with discipline, constraints can sharpen priorities and expose options that unconstrained planning overlooks.",
    relatedArticleSlug: "what-crisis-reveals-before-the-dashboard-does",
    serviceTitle: "ClarityOS Enterprise",
    faqs: [{ question: "Does this celebrate under-resourcing?", answer: "No. It makes constraints explicit so leaders can challenge false limits and design responsibly around real ones." }],
  },
  {
    index: "05",
    slug: "governance-as-accelerator",
    title: "Governance as Accelerator",
    category: "Governance & control",
    summary: "Design control, decision rights, and escalation so responsible action becomes faster rather than slower.",
    definition: "A governance lens that treats clear authority and bounded autonomy as enablers of execution, not administrative friction.",
    useCases: ["Transformation governance", "Executive decision forums", "High-consequence delivery"],
    parameters: ["Decision rights", "Control thresholds", "Escalation paths", "Evidence cadence"],
    process: ["Map recurring decisions", "Assign authority", "Define thresholds", "Create rapid correction loops"],
    impact: "Clear governance can reduce hesitation and repeated approval cycles when roles, thresholds, and consequences are designed together.",
    leadMagnetSlug: "governance-as-accelerator-playbook",
    relatedArticleSlug: "governance-as-an-accelerator",
    serviceTitle: "ClarityOS Enterprise",
    faqs: [{ question: "Is more governance always better?", answer: "No. The aim is proportionate governance: enough control to protect consequence, with enough clarity to enable action." }],
  },
  {
    index: "06",
    slug: "market-volatility-navigation",
    title: "Market Volatility Navigation",
    category: "Crisis & markets",
    summary: "Keep decision quality intact when markets compress time, amplify noise, and weaken institutional confidence.",
    definition: "A framework for separating signal, exposure, decision horizon, and controllable action under volatile conditions.",
    useCases: ["Market disruption", "Strategic reprioritization", "Executive crisis rooms"],
    parameters: ["Signal quality", "Exposure", "Decision horizon", "Reversibility"],
    process: ["Stabilize the decision frame", "Separate signal from noise", "Rank exposures", "Choose reversible and irreversible moves deliberately"],
    impact: "The method can support calmer, more explicit judgment when speed matters and certainty is unavailable.",
    relatedArticleSlug: "what-crisis-reveals-before-the-dashboard-does",
    serviceTitle: "Board Advisory",
    faqs: [{ question: "Does the framework predict markets?", answer: "No. It structures leadership decisions under volatility; it is not financial advice or a forecasting model." }],
  },
  {
    index: "07",
    slug: "crisis-as-audit",
    title: "Crisis as Audit",
    category: "Crisis & markets",
    summary: "Read crisis as a live audit of hidden dependencies, weak ownership, and ungoverned behavior.",
    definition: "A diagnostic approach that examines what pressure reveals about the system before rushing to restore its previous appearance.",
    useCases: ["Post-incident review", "Leadership transitions", "Operational disruption"],
    parameters: ["Failure signals", "Hidden dependencies", "Ownership gaps", "Recovery choices"],
    process: ["Capture what pressure exposed", "Trace the underlying condition", "Distinguish symptom from system", "Correct before normalizing"],
    impact: "Crisis can produce useful evidence when leaders resist the urge to restore appearances before learning from the breakdown.",
    relatedArticleSlug: "what-crisis-reveals-before-the-dashboard-does",
    serviceTitle: "ClarityOS Enterprise",
    faqs: [{ question: "Does this imply crisis is desirable?", answer: "No. It means that when crisis occurs, its evidence should not be wasted." }],
  },
  {
    index: "08",
    slug: "the-pyramid-framework",
    title: "The Pyramid Framework",
    category: "Transformation architecture",
    summary: "Sequence transformation through Foundation, Structure, Alignment, Optimization, and Transformation.",
    definition: "A five-level maturity model that prevents leaders from scaling ambition before the underlying human and operating layers can hold it.",
    useCases: ["Enterprise transformation sequencing", "Capability-roadmap design", "Program recovery"],
    parameters: ["Foundation", "Structure", "Alignment", "Optimization", "Transformation"],
    process: ["Test the foundation", "Make structure explicit", "Align authority and behavior", "Optimize only what can hold", "Transform from a stable base"],
    impact: "The sequence can expose premature optimization and help institutions match transformation ambition to actual readiness.",
    leadMagnetSlug: "the-pyramid-framework-guide",
    relatedChapterSlug: "chapter-09-the-pyramid-a-framework-for-everything",
    relatedArticleSlug: "foundation-before-scale",
    serviceTitle: "ClarityOS Enterprise",
    faqs: [{ question: "Is this the ClarityOS Engagement Roadmap?", answer: "No. The Pyramid is a five-level transformation model; the four-stage roadmap describes how a ClarityOS engagement progresses." }],
  },
  {
    index: "09",
    slug: "function-reframing",
    title: "Function Reframing",
    category: "Leadership & execution",
    summary: "Shift a function from inherited activity and labels toward the outcome it must make possible.",
    definition: "A framework for redefining a team or function by its institutional contribution, decision role, and value under changing conditions.",
    useCases: ["Operating-model redesign", "Procurement or support-function elevation", "Role clarity"],
    parameters: ["Current identity", "Required outcome", "Decision contribution", "Capability gap"],
    process: ["Describe the inherited frame", "Name the required contribution", "Redesign decision interfaces", "Align capability and measures"],
    impact: "Reframing can move a function from activity defense to a clearer institutional mandate.",
    relatedArticleSlug: "the-investment-paradox",
    serviceTitle: "ClarityOS Enterprise",
    faqs: [{ question: "Is reframing only a communications exercise?", answer: "No. The new frame must change decision rights, interfaces, capability, and evidence—not only language." }],
  },
  {
    index: "10",
    slug: "cross-cultural-authority",
    title: "Cross-Cultural Authority",
    category: "Cross-cultural leadership",
    summary: "Earn the right to influence across cultures by reading context before performing certainty.",
    definition: "A leadership framework for aligning competence, protocol, trust, and local legitimacy when formal title alone cannot carry authority.",
    useCases: ["GCC executive leadership", "International partnerships", "Cross-cultural facilitation"],
    parameters: ["Context literacy", "Competence", "Relational trust", "Legitimate authority"],
    process: ["Read the ecosystem", "Separate title from influence", "Build trust through contribution", "Exercise authority proportionately"],
    impact: "The framework can help leaders avoid importing assumptions that weaken trust and execution across cultures.",
    relatedArticleSlug: "cross-cultural-authority-in-the-gcc",
    serviceTitle: "Board Advisory",
    faqs: [{ question: "Does local adaptation require abandoning standards?", answer: "No. It requires translating standards into a context where people understand, trust, and can enact them." }],
  },
  {
    index: "11",
    slug: "super-labor-framework",
    title: "Super-Labor Framework",
    category: "Capability & future of work",
    summary: "Examine how human judgment, AI, tools, and institutional design combine into a stronger unit of work.",
    definition: "A framework for designing augmented capability around accountable human judgment rather than treating automation as a simple labor substitute.",
    useCases: ["AI-enabled workforce design", "Role and capability redesign", "Productivity transformation"],
    parameters: ["Human judgment", "Machine capability", "Workflow design", "Accountability"],
    process: ["Map the unit of work", "Identify judgment points", "Assign machine and human roles", "Protect accountability and learning"],
    impact: "The model can help leaders pursue augmentation without losing the ownership and judgment the institution still needs.",
    relatedArticleSlug: "ai-adoption-vs-human-readiness",
    serviceTitle: "ClarityOS Enterprise",
    faqs: [{ question: "Is this a job-reduction model?", answer: "No. It is a capability-design lens. Workforce consequences require separate, evidence-led and ethically governed decisions." }],
  },
  {
    index: "12",
    slug: "digital-nation-building",
    title: "Digital Nation Building",
    category: "Governance & institutions",
    summary: "Connect digital ambition to public trust, institutional capability, governance, and continuity.",
    definition: "A systems lens for examining the human and institutional foundations beneath national-scale digital programs.",
    useCases: ["Public-sector transformation", "National digital programs", "Institutional capacity building"],
    parameters: ["Public value", "Institutional capability", "Trust and inclusion", "Continuity"],
    process: ["Define the public outcome", "Map institutional dependencies", "Test trust and inclusion", "Sequence capability before scale"],
    impact: "The framework can help keep digital progress connected to the institutions and people responsible for sustaining it.",
    relatedArticleSlug: "the-investment-paradox",
    serviceTitle: "Board Advisory",
    faqs: [{ question: "Is this a technology architecture?", answer: "No. It complements technical architecture by focusing on public value, institutional readiness, and governance." }],
  },
  {
    index: "13",
    slug: "ai-governance-integration",
    title: "AI Governance Integration",
    category: "AI & governance",
    summary: "Connect AI ambition to human readiness, decision logic, accountability, and the governance conditions needed to sustain it.",
    definition: "A pre-governance framework for testing whether people, authority, capability, and correction mechanisms can carry an AI initiative responsibly.",
    useCases: ["Enterprise AI adoption", "AI governance design", "Executive readiness reviews"],
    parameters: ["Decision ownership", "Human readiness", "Data and model consequence", "Correction and continuity"],
    process: ["Define the decision affected", "Map human and institutional readiness", "Assign governance and escalation", "Test correction before scale"],
    impact: "The framework can expose readiness gaps before an AI initiative becomes a governance problem at scale.",
    leadMagnetSlug: "ai-governance-integration-checklist",
    relatedArticleSlug: "ai-adoption-vs-human-readiness",
    serviceTitle: "ClarityOS Enterprise",
    faqs: [{ question: "Is this a complete technical AI-risk standard?", answer: "No. It is a human-readiness and operating-governance layer designed to work alongside qualified legal, security, data, and technical controls." }],
  },
  {
    index: "14",
    slug: "character-compass",
    title: "Character Compass",
    category: "Leadership & self-governance",
    summary: "Orient consequential decisions around character, responsibility, and the leader one chooses to become under pressure.",
    definition: "A reflective leadership framework for examining values, conduct, consequence, and consistency when authority is tested.",
    useCases: ["Executive reflection", "Leadership transitions", "Decision coaching"],
    parameters: ["Values", "Conduct", "Consequence", "Consistency"],
    process: ["Name the pressure", "Identify the value at stake", "Examine likely conduct and consequence", "Choose the action that can be owned"],
    impact: "Used as a reflection tool, the compass can make the character dimension of leadership decisions explicit.",
    leadMagnetSlug: "character-compass-assessment",
    relatedArticleSlug: "governance-as-an-accelerator",
    serviceTitle: "ClarityOS Personal Session",
    faqs: [{ question: "Is the assessment clinically validated?", answer: "No assessment is published yet. Any future instrument requires approved scoring, instructions, consent, and legal wording before release." }],
  },
];

const featuredFrameworkSlugs = ["the-pyramid-framework", "cultural-ecosystem-mapping", "ai-governance-integration", "constraint-based-innovation"];
export const featuredFrameworks = featuredFrameworkSlugs.map((slug) => {
  const framework = frameworks.find((item) => item.slug === slug)!;
  return { index: framework.index, title: framework.title, description: framework.summary, bridge: framework.category, slug: framework.slug };
});

export const leadMagnets = [
  { slug: "the-pyramid-framework-guide", title: "The Pyramid Framework Guide", frameworkSlug: "the-pyramid-framework", format: "Guide concept" },
  { slug: "cultural-ecosystem-mapping-canvas", title: "Cultural Ecosystem Mapping Canvas", frameworkSlug: "cultural-ecosystem-mapping", format: "Canvas concept" },
  { slug: "exile-resilience-framework-pdf", title: "Exile Resilience Framework PDF", frameworkSlug: "exile-resilience-framework", format: "PDF concept" },
  { slug: "ai-governance-integration-checklist", title: "AI Governance Integration Checklist", frameworkSlug: "ai-governance-integration", format: "Checklist concept" },
  { slug: "governance-as-accelerator-playbook", title: "Governance as Accelerator Playbook", frameworkSlug: "governance-as-accelerator", format: "Playbook concept" },
  { slug: "character-compass-assessment", title: "Character Compass Assessment", frameworkSlug: "character-compass", format: "Assessment concept" },
] as const;

export type ChapterRecord = {
  number: number;
  title: string | null;
  slug: string | null;
  status: "confirmed" | "pending-manuscript";
  public: boolean;
  summary?: string;
  keyLesson?: string;
  relatedFrameworkSlug?: string;
  relatedArticleSlug?: string;
};

export const chapters: ChapterRecord[] = Array.from({ length: 15 }, (_, index) => {
  const number = index + 1;
  if (number === 1) return {
    number,
    title: "Born Between Worlds",
    slug: "chapter-01-born-between-worlds",
    status: "confirmed" as const,
    public: true,
    summary: "The confirmed opening chapter enters the memoir through identity, place, and the experience of being formed across worlds.",
    keyLesson: "Identity can become an operating source of perspective when it is neither denied nor reduced to circumstance.",
    relatedFrameworkSlug: "exile-resilience-framework",
    relatedArticleSlug: "cross-cultural-authority-in-the-gcc",
  };
  if (number === 9) return {
    number,
    title: "The Pyramid: A Framework for Everything",
    slug: "chapter-09-the-pyramid-a-framework-for-everything",
    status: "confirmed" as const,
    public: true,
    summary: "The confirmed ninth chapter introduces the Pyramid as a way to sequence transformation from foundation to maturity.",
    keyLesson: "Scale and optimization cannot compensate for a foundation that was never made ready.",
    relatedFrameworkSlug: "the-pyramid-framework",
    relatedArticleSlug: "foundation-before-scale",
  };
  return { number, title: null, slug: null, status: "pending-manuscript" as const, public: false };
});

export type ArticleSection = { heading: string; paragraphs: string[] };
export type ArticleRecord = {
  number: string;
  slug: string;
  title: string;
  category: string;
  dek: string;
  publishedLabel: string;
  relatedFrameworkSlug: string;
  relatedChapterSlug?: string;
  leadMagnetSlug?: string;
  serviceTitle: string;
  sections: ArticleSection[];
};

export const launchArticles: ArticleRecord[] = [
  {
    number: "01",
    slug: "the-investment-paradox",
    title: "The Investment Paradox: Why Transformation Spending Fails at the Human Layer",
    category: "Human readiness",
    dek: "Transformation investment can purchase systems, expertise, and momentum. It cannot bypass the human conditions required to hold the change.",
    publishedLabel: "Launch essay",
    relatedFrameworkSlug: "function-reframing",
    serviceTitle: "ClarityOS Enterprise",
    sections: [
      { heading: "Investment is not installation readiness", paragraphs: ["A transformation budget can make the intended future visible long before the institution is ready to carry it. New platforms, governance structures, and advisory programs may all be rational. The paradox begins when their presence is treated as proof that the underlying operating conditions have changed.", "The human layer is where authority, capability, identity, trust, and correction become behavior. When those conditions remain unclear, investment accelerates activity without creating institutional readiness."] },
      { heading: "The hidden cost is interpretive", paragraphs: ["People do not encounter transformation as a neutral plan. They interpret what it means for status, competence, belonging, and consequence. If leadership does not make those meanings discussable, the organization fills the gap with private narratives and protective behavior.", "This is why visible resistance is often a late signal. The earlier signal is ambiguity: unclear ownership, duplicated decisions, quiet workarounds, and capability assumptions that nobody has tested."] },
      { heading: "Diagnose before adding momentum", paragraphs: ["ClarityOS begins before the upgrade. It asks whether the institution can name the real problem, read its conditions, assign control, build capability, calibrate evidence, correct drift, preserve continuity, and coach the new behavior.", "The practical decision is not to spend less by default. It is to sequence investment so the human operating system is strengthened at the same time as the technical and governance system it must hold."] },
    ],
  },
  {
    number: "02",
    slug: "ai-adoption-vs-human-readiness",
    title: "AI Adoption vs. Human Readiness: The Pre-Governance Gap",
    category: "AI governance",
    dek: "AI governance begins too late when institutions write controls before clarifying who can judge, intervene, learn, and remain accountable.",
    publishedLabel: "Launch essay",
    relatedFrameworkSlug: "ai-governance-integration",
    leadMagnetSlug: "ai-governance-integration-checklist",
    serviceTitle: "ClarityOS Enterprise",
    sections: [
      { heading: "Governance cannot substitute for readiness", paragraphs: ["Policies and committees are necessary in consequential AI adoption. They are not sufficient. A governance document cannot decide whether a team understands the affected decision, whether leaders can challenge an output, or whether ownership survives when work moves across human and machine boundaries.", "The pre-governance gap sits beneath the formal layer. It includes decision clarity, capability, escalation, cultural permission to question, and the continuity required when a model or workflow changes."] },
      { heading: "Start with the decision, not the tool", paragraphs: ["The useful unit of analysis is the decision being changed. Who owns it now? What evidence shapes it? Which consequences can be reversed? Where does judgment remain human, and how will that judgment be trained rather than assumed?", "These questions make AI adoption concrete. They also expose where technical ambition is outrunning the institution’s ability to govern its own behavior."] },
      { heading: "Integrate correction before scale", paragraphs: ["A responsible operating model defines how uncertainty is surfaced, how exceptions move, how human review works, and how learning changes the system. Correction is not a final safeguard; it is part of the design.", "ClarityOS positions this readiness work as the prerequisite to governance at scale. It complements legal, security, data, and technical controls rather than claiming to replace them."] },
    ],
  },
  {
    number: "03",
    slug: "foundation-before-scale",
    title: "Foundation Before Scale: How the Pyramid Framework Sequences Transformation",
    category: "Transformation architecture",
    dek: "The Pyramid distinguishes five levels of maturity so leaders can stop asking optimization to repair a missing foundation.",
    publishedLabel: "Launch essay",
    relatedFrameworkSlug: "the-pyramid-framework",
    relatedChapterSlug: "chapter-09-the-pyramid-a-framework-for-everything",
    leadMagnetSlug: "the-pyramid-framework-guide",
    serviceTitle: "ClarityOS Enterprise",
    sections: [
      { heading: "A sequence is a strategic constraint", paragraphs: ["Transformation programs often contain the right ingredients in the wrong order. Optimization begins before roles are stable. Alignment workshops begin before authority is visible. Technology scales a process whose purpose is still disputed.", "The Pyramid Framework introduces sequence as a discipline: Foundation, Structure, Alignment, Optimization, and Transformation. Each level asks a different question and creates the conditions for the next."] },
      { heading: "Five levels, not five slogans", paragraphs: ["Foundation tests the human and operating conditions. Structure makes roles, decisions, and interfaces explicit. Alignment connects those structures to a shared direction. Optimization improves what is already coherent. Transformation becomes possible when the preceding levels can carry a different system.", "The model does not imply that institutions move in a perfect line. It gives leaders a way to diagnose where pressure is being applied at the wrong level."] },
      { heading: "Do not confuse maturity with engagement", paragraphs: ["The five-level Pyramid remains distinct from the four-stage ClarityOS Engagement Roadmap: Foundation, Operational, Transformation, and Integration. The Pyramid describes transformation maturity. The roadmap describes the progression of an engagement.", "Keeping the two models separate protects their usefulness. One diagnoses the system; the other organizes the work."] },
    ],
  },
  {
    number: "04",
    slug: "what-crisis-reveals-before-the-dashboard-does",
    title: "What Crisis Reveals Before the Dashboard Does",
    category: "Crisis & continuity",
    dek: "Pressure exposes ownership, trust, hidden dependencies, and correction capacity before formal reporting can explain what changed.",
    publishedLabel: "Launch essay",
    relatedFrameworkSlug: "crisis-as-audit",
    leadMagnetSlug: "exile-resilience-framework-pdf",
    serviceTitle: "Board Advisory",
    sections: [
      { heading: "Crisis compresses the truth", paragraphs: ["Under pressure, institutions reveal how they actually work. Informal decision paths become visible. Teams discover which dependencies were never owned. Leaders learn whether escalation creates clarity or simply moves anxiety upward.", "A dashboard may later describe the event. The behavior in the room shows the operating system in real time."] },
      { heading: "Restore function, not appearance", paragraphs: ["The instinct to return quickly to normal can erase the evidence crisis provides. If the institution restores familiar reporting and routines without examining the conditions that failed, recovery becomes a reset to the same fragility.", "Crisis as Audit asks what pressure exposed, which hidden condition produced it, and what must be corrected before normal operations are declared."] },
      { heading: "Continuity is a choice", paragraphs: ["Not everything should survive disruption. Continuity means deciding what must endure—mission, duty, critical knowledge, legitimate authority—and redesigning the surrounding system so those elements can hold.", "The next step is not endless diagnosis. It is a proportionate correction that protects the essential while making future failure less likely."] },
    ],
  },
  {
    number: "05",
    slug: "cross-cultural-authority-in-the-gcc",
    title: "Cross-Cultural Authority in the GCC: Map the Ecosystem Before You Lead It",
    category: "GCC leadership",
    dek: "Authority travels through context, trust, protocol, and contribution—not title alone. Map the ecosystem before importing a leadership script.",
    publishedLabel: "Launch essay",
    relatedFrameworkSlug: "cultural-ecosystem-mapping",
    leadMagnetSlug: "cultural-ecosystem-mapping-canvas",
    serviceTitle: "Board Advisory",
    sections: [
      { heading: "Formal authority is only one layer", paragraphs: ["A role may provide the right to convene a meeting without providing the trust required to move a consequential decision. In cross-cultural environments, the distance between title and influence becomes especially important.", "Leaders need to understand who carries formal authority, who shapes interpretation, where trust sits, and how protocol protects relationships and legitimacy."] },
      { heading: "Map before you perform certainty", paragraphs: ["Cultural Ecosystem Mapping replaces broad stereotypes with observed relationships. It asks how information moves, who can challenge safely, which histories matter, and what contribution earns the right to influence.", "This is not a request to abandon standards or avoid directness. It is a requirement to translate leadership into a context where people can trust and enact it."] },
      { heading: "Authority is accumulated through consequence", paragraphs: ["Cross-cultural authority grows when competence, respect, and useful contribution align. The leader becomes legible not because every local code is mastered, but because decisions demonstrate responsibility for people, institutions, and outcomes.", "The practical sequence is simple: read the ecosystem, separate title from influence, build trust through contribution, and exercise authority proportionately."] },
    ],
  },
  {
    number: "06",
    slug: "governance-as-an-accelerator",
    title: "Governance as an Accelerator: Designing Control That Enables Action",
    category: "Governance & control",
    dek: "Governance accelerates execution when authority, thresholds, evidence, and correction are designed as one operating system.",
    publishedLabel: "Launch essay",
    relatedFrameworkSlug: "governance-as-accelerator",
    leadMagnetSlug: "governance-as-accelerator-playbook",
    serviceTitle: "ClarityOS Enterprise",
    sections: [
      { heading: "Control fails when it is detached from action", paragraphs: ["Governance becomes friction when it adds approval without clarifying judgment. People wait because decision rights are ambiguous, thresholds are invisible, and escalation is treated as a sign of failure rather than part of the operating design.", "The result is not control. It is hesitation, duplication, and hidden workarounds."] },
      { heading: "Bounded autonomy is faster", paragraphs: ["Effective governance makes clear what can be decided locally, what evidence is required, when consequence crosses a threshold, and who must intervene. That clarity gives teams room to act without guessing what will later be challenged.", "Control and speed are not opposites when both are designed around the same decision architecture."] },
      { heading: "Correction completes the design", paragraphs: ["No governance system is correct forever. It needs a cadence for testing assumptions, examining exceptions, and changing the control when evidence shows that the system has drifted.", "Governance as Accelerator therefore connects decision rights to calibration and correction. The aim is not more governance. It is governance proportionate to consequence and useful to action."] },
    ],
  },
];

export const launchInsights = launchArticles.slice(0, 3).map(({ number, title, category, slug }) => ({ number, title, category, slug }));

export const serviceRecords = [
  {
    slug: "personal-session",
    label: "Focused intervention",
    title: "ClarityOS Personal Session",
    meta: "$79 · 90 minutes",
    description: "A focused session for one defined decision, transition, or leadership constraint.",
    fit: ["A consequential decision needs a clearer frame", "A transition is exposing conflicting priorities", "A leader needs an independent diagnostic conversation"],
    outcome: "A clarified problem frame, a proportionate next move, and the framework path most relevant to the situation.",
    cta: "Request session access",
    href: "mailto:zeeshan@global-mkts.com?subject=ClarityOS%20Personal%20Session",
  },
  {
    slug: "enterprise-90-day-program",
    label: "Institutional transformation",
    title: "ClarityOS Enterprise",
    meta: "90-Day Program",
    description: "A structured engagement to diagnose, sequence, and strengthen the human layer beneath transformation.",
    fit: ["Transformation ambition is outrunning readiness", "Governance and decision rights are unclear", "A program needs recovery, integration, or institutional ownership"],
    outcome: "A context-specific diagnostic, operating roadmap, leadership alignment, and integration path shaped by the four-stage engagement sequence.",
    cta: "Discuss enterprise fit",
    href: "mailto:zeeshan@global-mkts.com?subject=ClarityOS%20Enterprise%20Inquiry",
  },
  {
    slug: "board-advisory",
    label: "Strategic counsel",
    title: "Board Advisory",
    meta: "Proposal-based",
    description: "Independent counsel for boards and executive teams navigating consequential change, governance, crisis, or cross-cultural complexity.",
    fit: ["The decision has institutional consequence", "Leadership needs a challenge function", "The context requires continuity and discretion"],
    outcome: "A tailored advisory format defined by scope, governance, cadence, and the decision responsibility involved.",
    cta: "Start a board inquiry",
    href: "mailto:zeeshan@global-mkts.com?subject=Board%20Advisory%20Inquiry",
  },
  {
    slug: "speaking",
    label: "Ideas in the room",
    title: "Speaking",
    meta: "Proposal-based",
    description: "Keynotes, executive sessions, and facilitated leadership formats built around crisis, clarity, governance, AI readiness, and transformation.",
    fit: ["An audience needs a decisive shared frame", "A leadership forum needs practical language", "An event requires a relevant, evidence-led contribution"],
    outcome: "A format shaped to the audience, setting, and approved subject—without decorative or unsupported authority claims.",
    cta: "Discuss a speaking brief",
    href: "mailto:zeeshan@global-mkts.com?subject=Speaking%20Inquiry",
  },
] as const;

export const services = [
  serviceRecords[0],
  serviceRecords[1],
  {
    label: "Strategic access",
    title: "Board Advisory & Speaking",
    meta: "Proposal-based",
    description: "Board counsel, executive advisory, keynote, and facilitated leadership formats for consequential moments.",
    cta: "Start a qualified inquiry",
    href: "mailto:zeeshan@global-mkts.com?subject=Board%20Advisory%20or%20Speaking%20Inquiry",
  },
] as const;

export const inquiryTypes = ["ClarityOS Personal Session", "ClarityOS Enterprise 90-Day Program", "Board Advisory", "Speaking", "Other qualified inquiry"] as const;
export const budgetOptions = ["Under $1,000", "$1,000–$10,000", "$10,000–$50,000", "$50,000+", "Prefer to discuss"] as const;
export const timelineOptions = ["Within 30 days", "1–3 months", "3–6 months", "6+ months", "Exploratory"] as const;

export const clarityFaqs: Faq[] = [
  { question: "What is ClarityOS?", answer: "ClarityOS is Zeeshan Sabri’s proprietary methodology for diagnosing and strengthening the human conditions beneath governance, technology, and transformation." },
  { question: "Why call it pre-governance?", answer: "The positioning emphasizes that decision clarity, readiness, capability, accountability, and correction must exist before formal governance can work as intended." },
  { question: "Is ClarityOS a software product?", answer: "No. It is an operating methodology and engagement architecture, not a software platform." },
  { question: "How does the 8C Framework relate to the fourteen pillars?", answer: "The 8C sequence is the core operating methodology. The fourteen pillars are focused frameworks that apply its logic to specific leadership and institutional problems." },
  { question: "Is the Engagement Roadmap the same as the Pyramid Framework?", answer: "No. The four-stage roadmap organizes an engagement; the five-level Pyramid sequences transformation maturity." },
];

export const mediaReferences = [
  { type: "Speaking evidence", title: "The Secret of Successful Transformation", description: "Recovered current-site stage image retained as first-build evidence, subject to final rights confirmation.", href: null },
  { type: "Verified channel", title: "YouTube", description: "The verified channel reference recovered from the current site.", href: siteIdentity.youtube },
  { type: "Verified channel", title: "Instagram", description: "The verified profile reference recovered from the current site.", href: siteIdentity.instagram },
  { type: "Source document", title: "Executive Advisory Profile — 2026 Edition", description: "Recovered 12-page A4 profile available as the current boardroom reference document.", href: recoveredAssets.profile },
] as const;
