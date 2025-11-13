import React from 'react';
import type { ComparisonResult } from '../../types';
import { SummaryCard } from './SummaryCard';
import { ComparisonTable } from './ComparisonTable';
import { InsightsPanel } from './InsightsPanel';
// FIX: Import the FileText icon.
import { FileText, Share2 } from '../icons';

interface ComparisonResultsProps {
    result: ComparisonResult;
    onReset: () => void;
}

export const ComparisonResults: React.FC<ComparisonResultsProps> = ({ result, onReset }) => {
    const { budgets, summary } = result;
    return (
        <div className="space-y-8">
            <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <p className="text-sm font-semibold text-teal-600">COMPARING</p>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-gray-900">
                            {budgets.first.year} <span className="text-gray-400 font-normal mx-2">vs</span> {budgets.second.year}
                        </h2>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                        <button className="flex items-center space-x-2 py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-sm">
                            <FileText className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                         <button className="flex items-center space-x-2 py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-sm">
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                        </button>
                        <button onClick={onReset} className="py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-sm font-semibold">
                            &larr; New Comparison
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SummaryCard title="Total Budget Size" metric={summary.totalSize} format="currency" />
                <SummaryCard title="Revenue" metric={summary.revenue} format="currency" />
                <SummaryCard title="Fiscal Deficit" metric={summary.deficit} format="percentage" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <ComparisonTable sectors={result.sectors} budgetYears={[budgets.first.year, budgets.second.year]} />
                </div>
                <div>
                    <InsightsPanel insights={result.insights} />
                </div>
            </div>
        </div>
    );
};