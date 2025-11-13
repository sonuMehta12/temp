import React from 'react';
import type { ComparisonInsight } from '../../types';

interface InsightsPanelProps {
    insights: ComparisonInsight;
}

const InsightItem: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <li className="flex justify-between items-baseline">
        <span className="text-gray-700">{label}</span>
        <span className={`font-bold ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {value > 0 ? '+' : ''}{value.toFixed(1)}%
        </span>
    </li>
);

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
    return (
        <div className="p-6 bg-white rounded-xl border border-gray-200 sticky top-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🔍 Key Insights</h3>

            <div className="space-y-5">
                {insights.topGainers.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-green-600 mb-2">✅ BIGGEST GAINERS</h4>
                        <ul className="space-y-1.5 text-sm">
                            {insights.topGainers.map(item => (
                                <InsightItem key={item.sector} label={item.sector} value={item.change} />
                            ))}
                        </ul>
                    </div>
                )}

                {insights.topLosers.length > 0 && (
                     <div>
                        <h4 className="font-semibold text-red-600 mb-2">⚠️ BIGGEST LOSERS</h4>
                        <ul className="space-y-1.5 text-sm">
                             {insights.topLosers.map(item => (
                                <InsightItem key={item.sector} label={item.sector} value={item.change} />
                            ))}
                        </ul>
                    </div>
                )}
                
                {insights.narrativeInsights.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-sky-600 mb-2">📊 NOTABLE CHANGES</h4>
                        <ul className="space-y-1.5 text-sm list-disc list-inside text-gray-700">
                            {insights.narrativeInsights.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="pt-3 border-t border-gray-200">
                     <h4 className="font-semibold text-gray-800 mb-2">💡 EDITORIAL NOTE</h4>
                     <p className="text-sm text-gray-600 italic">"{insights.editorialNote}"</p>
                </div>
            </div>
        </div>
    );
};