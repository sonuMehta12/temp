
// FIX: Add React import to resolve 'Cannot find namespace React' error.
import type React from 'react';
// FIX: Add imports for newly defined types.
import type { Sector, Role, BriefData, MoodData, Promise, BudgetYearData, EconomicMetrics, Advisor, DecisionOption, CrisisEvent, GameState, UserProfile } from './types';
import { BrainCircuit, HeartPulse, GraduationCap, Leaf, Factory, Store, User, Briefcase, TrendingUp, BookOpen, Smartphone, Car, Tv, PiggyBank, Coins, Landmark, DollarSign } from './components/icons';

export const SECTORS: Sector[] = [
    { id: 'tech-ai', name: 'Tech/AI', description: 'Innovation in software, hardware, and artificial intelligence.', icon: BrainCircuit },
    { id: 'healthcare', name: 'Healthcare', description: 'Pharmaceuticals, biotech, and medical services.', icon: HeartPulse },
    { id: 'education', name: 'Education', description: 'Ed-tech, institutions, and skill development.', icon: GraduationCap },
    { id: 'agriculture', name: 'Agriculture', description: 'Farming, agri-tech, and food processing.', icon: Leaf },
    { id: 'manufacturing', name: 'Manufacturing', description: 'Production of goods and industrial machinery.', icon: Factory },
    { id: 'msme', name: 'MSME', description: 'Micro, Small, and Medium Enterprises ecosystem.', icon: Store },
];

export const ROLES: Role[] = [
    { id: 'founder', name: 'Founder', icon: User },
    { id: 'employee', name: 'Employee', icon: Briefcase },
    { id: 'investor', name: 'Investor', icon: TrendingUp },
    { id: 'student', name: 'Student', icon: BookOpen },
];

export const QUESTIONNAIRE_OPTIONS = {
    companySize: ['Startup (1-50)', 'SME (51-500)', 'Large Corp (500+)'],
    primaryConcern: ['Accelerating Growth', 'Managing Costs', 'Navigating Policy'],
    geographicFocus: ['Metro Cities', 'Tier-2 & Tier-3 Cities', 'Rural Areas'],
    plannedPurchase: ['Electronics (Phone, TV)', 'Vehicle (Car, 2-Wheeler)', 'Home Appliances', 'None of these'],
    investmentArea: ['Personal Savings (FD, Gold)', 'Market Investments (Stocks)', 'Real Estate', 'Not applicable'],
};

export const MOCK_BRIEF_DATA: BriefData = {
    keyChanges: [
      "PLI scheme extended to AI hardware manufacturing, boosting domestic production.",
      "R&D tax credits significantly increased from 100% to 150% for deep tech startups."
    ],
    risks: [
      "A 5% increase in import duties on critical semiconductor components could raise hardware costs.",
      "Higher TDS (Tax Deducted at Source) on digital services might impact cash flow for early-stage companies."
    ],
    opportunities: [
      "Launch of a ₹10,000 Crore 'AI Innovation Fund' for seed and early-stage investments.",
      "The tax holiday for eligible startups has been extended by an additional two years, providing fiscal relief."
    ],
    schemesAndIncentives: [
      "Enhanced benefits under DPIIT's Startup Recognition program, including easier public procurement.",
      "Increased allocation to the 'Fund of Funds for Startups' (FFS) to support venture capital."
    ],
    nextSteps: [
      "Evaluate eligibility and apply for the newly expanded PLI scheme before the December 2025 deadline.",
      "Meticulously document all R&D expenses to maximize the benefits of the new 150% tax credit.",
      "Prepare a pitch deck and business plan aligned with the criteria of the new AI Innovation Fund."
    ],
    whatGotCheaper: [
        {
            categoryName: "Consumer Electronics",
            items: [
                { name: "Smartphones & Laptops", reason: "Reduced customs duty on display assembly and camera lens.", icon: "Smartphone" },
                { name: "Smart TVs", reason: "PLI scheme for domestic manufacturing of TV components.", icon: "Tv" }
            ]
        },
        {
            categoryName: "Personal Finance",
            items: [
                { name: "Fixed Deposits", reason: "Increased interest rates on small savings schemes.", icon: "PiggyBank" },
                { name: "Gold Investment", reason: "Reduction in import duty on gold and silver findings.", icon: "Coins" }
            ]
        }
    ]
};

export const MOOD_DATA: MoodData = {
  overall: {
    emoji: "😊",
    score: 68,
    sentiment: "positive",
    headline: "Middle class cheers tax relief, while concerns over deficit linger",
  },
  breakdown: {
    positive: 45,
    neutral: 35,
    negative: 20
  },
  sampleQuotes: {
    positive: "Finally, some real relief for the salaried class! This is a welcome move. #Budget2026",
    neutral: "The infrastructure spending plans are ambitious. A wait-and-watch approach is needed to see the execution.",
    negative: "Deeply disappointed with the lack of meaningful support for startups this year. A missed opportunity. #BudgetLetdown"
  },
  topics: [
    { name: "Tax Relief", sentiment: "positive", score: 75, keywords: ["income tax", "slab", "relief", "middle class", "80C", "standard deduction"] },
    { name: "Fiscal Deficit", sentiment: "negative", score: 35, keywords: ["deficit", "borrowing", "debt", "rating", "concern", "economy"] },
    { name: "Infrastructure", sentiment: "neutral", score: 60, keywords: ["highways", "railways", "ports", "spending", "investment", "infra"] },
    { name: "Agriculture", sentiment: "positive", score: 70, keywords: ["farmers", "MSP", "kisan", "credit", "subsidies", "rural"] },
    { name: "Startups", sentiment: "negative", score: 40, keywords: ["funding", "tax holiday", "angel tax", "innovation", "disappointment", "ecosystem"] },
    { name: "Healthcare", sentiment: "neutral", score: 55, keywords: ["health", "hospitals", "insurance", "pharma", "research", "budget"] },
  ],
  reactions: [
    { text: "This budget prioritizes long-term growth over short-term populism. A bold and necessary step for the economy.", platform: "linkedin", time: "1m ago", sentiment: "positive" },
    { text: "The new income tax slabs are a huge win! More disposable income for me and my family.", platform: "twitter", time: "3m ago", sentiment: "positive" },
    { text: "What about job creation? I don't see any concrete plans to address unemployment.", platform: "et-comments", time: "5m ago", sentiment: "negative" },
    { text: "The market seems to be reacting positively so far. Let's see if it holds.", platform: "twitter", time: "8m ago", sentiment: "neutral" },
    { text: "Another budget with no significant relief for small business owners. We are always forgotten.", platform: "linkedin", time: "12m ago", sentiment: "negative" },
  ]
};

// --- Budget Tracker Constants ---
export const PROMISES: Promise[] = [
    {
        id: 1,
        title: "National Highway Expansion Program Phase II",
        description: "To construct an additional 15,000 km of national highways, focusing on economic corridors and border connectivity.",
        sector: "Infrastructure",
        ministry: "Ministry of Road Transport and Highways",
        budgeted: 75000,
        spent: 45000,
        status: "on-track",
        timeline: [
            { date: "Q2 2025", milestone: "Project tenders finalized", status: "completed" },
            { date: "Q4 2025", milestone: "Land acquisition 50% complete", status: "in-progress" },
            { date: "Q2 2026", milestone: "5,000 km construction complete", status: "upcoming" }
        ],
        editorialNote: "The project is proceeding as planned, but land acquisition in some states remains a challenge. Timely completion is crucial for logistics cost reduction.",
        lastUpdated: "2025-11-15T10:00:00Z"
    },
    {
        id: 2,
        title: "Semiconductor Fab Plant Subsidies",
        description: "Provide capital subsidies and incentives for setting up at least two large-scale semiconductor fabrication plants in the country.",
        sector: "Electronics",
        ministry: "Ministry of Electronics and Information Technology",
        budgeted: 50000,
        spent: 10000,
        status: "delayed",
        timeline: [
            { date: "Q1 2025", milestone: "Policy framework announced", status: "completed" },
            { date: "Q3 2025", milestone: "First proposal approved", status: "delayed" },
            { date: "Q1 2026", milestone: "Ground-breaking for first plant", status: "upcoming" }
        ],
        editorialNote: "While the policy is in place, attracting a leading global player has taken longer than anticipated. Geopolitical factors and negotiations on technology transfer are key hurdles.",
        lastUpdated: "2025-10-28T14:30:00Z"
    }
];

// --- Budget War Room Constants ---
export const INITIAL_ECONOMIC_METRICS: EconomicMetrics = {
    gdpGrowth: "6.5% (slowing)",
    inflation: "4.8% (stable)",
    fiscalDeficit: "5.8% (high)",
    recentShock: "Global supply chain disruption",
};

export const ADVISORS: Advisor[] = [
    { id: 'eco', name: "Dr. Arvind Gupta", title: "Chief Economic Advisor", philosophy: "Fiscal Prudence", priority: "Control the deficit and boost private investment. Growth is paramount.", icon: TrendingUp },
    { id: 'soc', name: "Ms. Priya Sharma", title: "Social Policy Expert", philosophy: "Inclusive Growth", priority: "Strengthen the social safety net. Focus on healthcare, education, and rural welfare.", icon: HeartPulse },
    { id: 'pol', name: "Mr. Rajnath Singh Sr.", title: "Political Strategist", philosophy: "Populist Measures", priority: "Keep the electorate happy. We need visible benefits and popular schemes before the next cycle.", icon: Landmark },
];

export const ROUND_1_OPTIONS: DecisionOption[] = [
    { id: 'capex', title: "Boost Capital Expenditure", icon: "🏗️", description: "Announce a massive 30% increase in infrastructure spending on roads, ports, and railways to create assets and jobs.", cost: "High Fiscal Outlay", impacts: { economicStability: 20, publicApproval: 5, fiscalHealth: -15 }, advisorOpinions: [{ advisor: 'eco', stance: 'strongly supports', quote: "This is the only way to crowd-in private investment and ensure long-term growth." }, { advisor: 'pol', stance: 'opposes', quote: "The benefits are too slow. People want money in their pockets now, not five years from now." }] },
    { id: 'welfare', title: "Expand Welfare Schemes", icon: "🌾", description: "Double the outlay for rural employment schemes and announce a universal basic income pilot for 10 million households.", cost: "Significant Revenue Expense", impacts: { economicStability: -10, publicApproval: 20, fiscalHealth: -10 }, advisorOpinions: [{ advisor: 'soc', stance: 'strongly supports', quote: "This directly addresses rural distress and inequality, boosting consumption." }, { advisor: 'eco', stance: 'strongly opposes', quote: "This is a fiscally irresponsible handout that will spike inflation." }] },
    { id: 'tax_cut', title: "Middle-Class Tax Cut", icon: "💰", description: "Introduce new income tax slabs, providing significant relief to salaried individuals to boost consumption.", cost: "Major Revenue Loss", impacts: { economicStability: 5, publicApproval: 15, fiscalHealth: -20 }, advisorOpinions: [{ advisor: 'pol', stance: 'supports', quote: "A masterstroke! This will win us the support of the urban middle class." }, { advisor: 'soc', stance: 'neutral', quote: "It helps a segment, but a targeted welfare scheme would be more equitable." }] }
];

export const CRISIS_EVENTS: { [key in 'capex' | 'welfare' | 'tax_cut']: CrisisEvent } = {
    capex: { title: "Global Rating Agency Downgrade", description: "Citing your high capex and borrowing, Moody's has downgraded India's sovereign rating, triggering capital flight.", options: [{ id: 'austerity', title: "Announce spending cuts", impact: "Calms markets but hurts public sentiment." }, { id: 'ignore', title: "Defend your strategy", impact: "Risks further market panic." }] },
    welfare: { title: "Unforeseen Drought", description: "A severe drought hits western India, causing crop failure and spiking food inflation. Your welfare schemes are insufficient.", options: [{ id: 'stimulus', title: "Announce emergency relief package", impact: "Strains fiscal health further." }, { id: 'reform', title: "Focus on long-term irrigation projects", impact: "Slower, but more sustainable." }] },
    tax_cut: { title: "Unexpected Oil Price Spike", description: "Due to geopolitical tensions, crude oil prices have doubled to $150/barrel, wrecking your fiscal math and stoking inflation.", options: [{ id: 'bailout', title: "Subsidize fuel prices", impact: "Massively increases deficit." }, { id: 'austerity', title: "Pass on costs to consumers", impact: "Causes widespread public anger." }] }
};

export const INITIAL_GAME_STATE: GameState = {
    screen: 'welcome',
    round: 0,
    metrics: { economicStability: 50, publicApproval: 50, fiscalHealth: 50 },
    decisions: { round1: null, round2: null, round3: null },
    triggeredEvent: null,
    finalScores: null,
};

// --- Budget AI Assistant Constants ---
export const ONBOARDING_QUESTIONS: { key: keyof UserProfile; question: string; icon: React.FC<any>; options: string[]; }[] = [
    { key: 'role', question: "Which of these best describes you?", icon: User, options: ['Salaried Employee', 'Business Owner', 'Investor', 'Student'] },
    { key: 'incomeBracket', question: "What is your approximate annual income?", icon: DollarSign, options: ['Below ₹5 Lakh', '₹5 - ₹15 Lakh', '₹15 - ₹30 Lakh', 'Above ₹30 Lakh'] },
    { key: 'primaryConcern', question: "What's your primary financial focus right now?", icon: BrainCircuit, options: ['Saving Tax', 'Long-term Investment', 'Managing Expenses', 'Understanding Policy'] }
];

// --- Budget Compare Constants ---
export const BUDGET_DATA: { [key: string]: BudgetYearData } = {
    "2025-26": {
        metadata: { year: "2025-26", theme: "Foundation for Growth", totalSize: 4500000, revenue: 2800000, deficit: 5.8 },
        sectors: [
            { id: 'defense', name: 'Defense', allocation: 590000 },
            { id: 'infra', name: 'Infrastructure', allocation: 750000 },
            { id: 'agriculture', name: 'Agriculture', allocation: 125000 },
            { id: 'education', name: 'Education', allocation: 112000 },
            { id: 'health', name: 'Health', allocation: 89000 },
            { id: 'tech', name: 'Technology & IT', allocation: 45000 },
        ]
    },
    "2026-27": {
        metadata: { year: "2026-27", theme: "Tech-Driven Future", totalSize: 4800000, revenue: 3100000, deficit: 5.1 },
        sectors: [
            { id: 'defense', name: 'Defense', allocation: 620000 },
            { id: 'infra', name: 'Infrastructure', allocation: 700000 },
            { id: 'agriculture', name: 'Agriculture', allocation: 130000 },
            { id: 'education', name: 'Education', allocation: 120000 },
            { id: 'health', name: 'Health', allocation: 95000 },
            { id: 'tech', name: 'Technology & IT', allocation: 90000 },
        ]
    }
};
