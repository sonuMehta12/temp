
import type React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {}

// --- Sector Simulator Types ---

export interface Sector {
    id: string;
    name: string;
    description: string;
    icon: React.FC<IconProps>;
}

export interface Role {
    id: string;
    name: string;
    icon: React.FC<IconProps>;
}

export interface QuestionnaireAnswers {
    companySize: string;
    primaryConcern: string;
    geographicFocus: string;
    plannedPurchase: string;
    investmentArea: string;
}

export interface CheaperItem {
    name: string;
    reason: string;
    icon: string;
}

export interface CheaperCategory {
    categoryName: string;
    items: CheaperItem[];
}

export interface BriefData {
    keyChanges: string[];
    risks: string[];
    opportunities: string[];
    schemesAndIncentives: string[];
    nextSteps: string[];
    whatGotCheaper: CheaperCategory[];
}


// --- Budget Moodboard Types ---

export type Sentiment = "positive" | "neutral" | "negative";

export interface OverallMood {
    emoji: string;
    score: number;
    sentiment: Sentiment;
    headline: string;
}

export interface Breakdown {
    positive: number;
    neutral: number;
    negative: number;
}

export interface SampleQuotes {
    positive: string;
    neutral: string;
    negative: string;
}

export interface Topic {
    name: string;
    sentiment: Sentiment;
    score: number;
    keywords: string[];
}

export interface Reaction {
    text: string;
    platform: "twitter" | "linkedin" | "et-comments";
    time: string;
    sentiment: Sentiment;
}

export interface MoodData {
    overall: OverallMood;
    breakdown: Breakdown;
    sampleQuotes: SampleQuotes;
    topics: Topic[];
    reactions: Reaction[];
}

// --- Budget Tracker Types ---

export type PromiseStatus = 'on-track' | 'delayed' | 'missed';
export type MilestoneStatus = 'completed' | 'in-progress' | 'upcoming' | 'delayed' | 'missed';

export interface Milestone {
    date: string;
    milestone: string;
    status: MilestoneStatus;
}

export interface Promise {
    id: number;
    title: string;
    description: string;
    sector: string;
    ministry: string;
    budgeted: number; // in Crores
    spent: number; // in Crores
    status: PromiseStatus;
    timeline: Milestone[];
    editorialNote: string;
    lastUpdated: string; // ISO date string
}

// --- Budget War Room Types ---

export interface EconomicMetrics {
    gdpGrowth: string;
    inflation: string;
    fiscalDeficit: string;
    recentShock: string;
}

export interface Advisor {
    id: 'eco' | 'soc' | 'pol';
    name: string;
    title: string;
    philosophy: string;
    priority: string;
    icon: React.FC<IconProps>;
}

export interface DecisionImpacts {
    economicStability: number;
    publicApproval: number;
    fiscalHealth: number;
}

export interface AdvisorOpinion {
    advisor: 'eco' | 'soc' | 'pol';
    stance: 'strongly supports' | 'supports' | 'neutral' | 'opposes' | 'strongly opposes';
    quote: string;
}

export type DecisionId = 'capex' | 'welfare' | 'tax_cut';

export interface DecisionOption {
    id: DecisionId;
    title: string;
    icon: string;
    description: string;
    cost: string;
    impacts: DecisionImpacts;
    advisorOpinions: AdvisorOpinion[];
}

export type CrisisResponseId = 'bailout' | 'austerity' | 'stimulus' | 'reform' | 'ignore';

export interface CrisisResponseOption {
    id: CrisisResponseId;
    title: string;
    impact: string;
}

export interface CrisisEvent {
    title: string;
    description: string;
    options: CrisisResponseOption[];
}

export interface Metrics {
    economicStability: number;
    publicApproval: number;
    fiscalHealth: number;
}

export interface Decisions {
    round1: DecisionId | null;
    round2: CrisisResponseId | null;
    round3: { [key: string]: number } | null;
}

export interface FinalScores {
    economic: number;
    social: number;
    political: number;
    overall: string;
    philosophy: string;
    whatWentWell: string[];
    criticalMistakes: string[];
}

export interface GameState {
    screen: 'welcome' | 'briefing' | 'round1' | 'round2' | 'round3' | 'scorecard';
    round: number;
    metrics: Metrics;
    decisions: Decisions;
    triggeredEvent: CrisisEvent | null;
    finalScores: FinalScores | null;
}


// --- Budget AI Assistant Types ---

export interface UserProfile {
    role: string;
    incomeBracket: string;
    primaryConcern: string;
}

export interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: string;
}

// --- Budget Compare Types ---

export interface BudgetMetadata {
    year: string;
    theme: string;
    totalSize: number; // in Crores
    revenue: number; // in Crores
    deficit: number; // as percentage of GDP
}

export interface SectorAllocation {
    id: string;
    name: string;
    allocation: number; // in Crores
}

export interface BudgetYearData {
    metadata: BudgetMetadata;
    sectors: SectorAllocation[];
}

export interface ComparisonMetric {
    first: number;
    second: number;
    change: number;
    percentChange: number;
}

export type TrendCategory =
    | "significant-increase"
    | "moderate-increase"
    | "small-increase"
    | "no-change"
    | "small-decrease"
    | "moderate-decrease"
    | "significant-decrease";

export interface SectorComparison extends ComparisonMetric {
    id: string;
    name: string;
    trend: TrendCategory;
}

export interface ComparisonInsight {
    topGainers: { sector: string; change: number }[];
    topLosers: { sector: string; change: number }[];
    narrativeInsights: string[];
    editorialNote: string;
}

export interface ComparisonResult {
    budgets: {
        first: BudgetMetadata;
        second: BudgetMetadata;
    };
    summary: {
        totalSize: ComparisonMetric;
        revenue: ComparisonMetric;
        deficit: ComparisonMetric;
    };
    sectors: SectorComparison[];
    insights: ComparisonInsight;
}
