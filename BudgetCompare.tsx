import React, { useState, useMemo } from 'react';
import { BUDGET_DATA } from './constants';
import type { BudgetYearData, ComparisonResult, SectorComparison, TrendCategory } from './types';
import { ComparisonSelector } from './components/compare/ComparisonSelector';
import { ComparisonResults } from './components/compare/ComparisonResults';

const calculateChange = (val1: number, val2: number) => {
    const change = val2 - val1;
    const percentChange = val1 !== 0 ? (change / val1) * 100 : (val2 > 0 ? Infinity : 0);
    return { first: val1, second: val2, change, percentChange };
};

const categorizeTrend = (percentChange: number): TrendCategory => {
    if (percentChange > 25) return "significant-increase";
    if (percentChange > 10) return "moderate-increase";
    if (percentChange > 2) return "small-increase";
    if (percentChange >= -2) return "no-change";
    if (percentChange > -10) return "small-decrease";
    if (percentChange > -25) return "moderate-decrease";
    return "significant-decrease";
};

const generateInsights = (sectors: SectorComparison[], summary: ComparisonResult['summary']) => {
    const sortedByPercent = [...sectors].sort((a, b) => b.percentChange - a.percentChange);
    
    const topGainers = sortedByPercent.filter(s => s.percentChange > 0).slice(0, 3).map(s => ({ sector: s.name, change: s.percentChange }));
    const topLosers = sortedByPercent.filter(s => s.percentChange < 0).reverse().slice(0, 3).map(s => ({ sector: s.name, change: s.percentChange }));

    const narratives = [];
    if (summary.deficit.change < 0) {
        narratives.push(`Fiscal deficit improved by ${Math.abs(summary.deficit.change).toFixed(1)} percentage points.`);
    } else if (summary.deficit.change > 0) {
        narratives.push(`Fiscal deficit widened by ${summary.deficit.change.toFixed(1)} percentage points.`);
    }

    if (topGainers.length > 0) {
        narratives.push(`${topGainers[0].sector} sees the largest proportional increase at ${topGainers[0].change.toFixed(1)}%.`);
    }

    return {
        topGainers,
        topLosers,
        narrativeInsights: narratives,
        editorialNote: "This budget appears to shift focus towards certain sectors while reducing or maintaining others, reflecting new economic priorities."
    };
};

const compareBudgets = (budget1: BudgetYearData, budget2: BudgetYearData): ComparisonResult => {
    const summary = {
        totalSize: calculateChange(budget1.metadata.totalSize, budget2.metadata.totalSize),
        revenue: calculateChange(budget1.metadata.revenue, budget2.metadata.revenue),
        deficit: calculateChange(budget1.metadata.deficit, budget2.metadata.deficit),
    };

    const sectors: SectorComparison[] = budget1.sectors.map(sector1 => {
        const sector2 = budget2.sectors.find(s => s.id === sector1.id);
        const allocation2 = sector2 ? sector2.allocation : 0;
        const changeData = calculateChange(sector1.allocation, allocation2);

        return {
            id: sector1.id,
            name: sector1.name,
            ...changeData,
            trend: categorizeTrend(changeData.percentChange),
        };
    }).sort((a, b) => b.first - a.first);

    const insights = generateInsights(sectors, summary);

    return {
        budgets: { first: budget1.metadata, second: budget2.metadata },
        summary,
        sectors,
        insights
    };
};

export const BudgetCompare: React.FC = () => {
    const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

    const budgetYears = useMemo(() => Object.keys(BUDGET_DATA), []);

    const handleCompare = (year1: string, year2: string) => {
        const budget1 = BUDGET_DATA[year1];
        const budget2 = BUDGET_DATA[year2];
        if (budget1 && budget2) {
            setComparisonResult(compareBudgets(budget1, budget2));
        }
    };
    
    const handleReset = () => {
        setComparisonResult(null);
    }

    return (
        <div className="animate-fade-in">
            <header className="text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-sky-500">
                    Budget Compare
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                    An interactive tool to analyze and visualize differences between Union Budgets.
                </p>
            </header>
            <main className="mt-8">
                {!comparisonResult ? (
                    <ComparisonSelector budgetYears={budgetYears} onCompare={handleCompare} />
                ) : (
                    <ComparisonResults result={comparisonResult} onReset={handleReset} />
                )}
            </main>
        </div>
    );
};