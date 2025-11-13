import React from 'react';
import type { ComparisonMetric } from '../../types';

interface SummaryCardProps {
    title: string;
    metric: ComparisonMetric;
    format: 'currency' | 'percentage';
}

const formatValue = (value: number, format: 'currency' | 'percentage') => {
    if (format === 'currency') {
        return `₹${(value / 1000000).toFixed(2)}L Cr`;
    }
    return `${value.toFixed(1)}%`;
};

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, metric, format }) => {
    const isPositiveChange = metric.change > 0;
    // For deficit, a decrease is good.
    const isGood = format === 'percentage' ? metric.change < 0 : metric.change > 0;
    
    const changeColor = isGood ? 'text-green-600' : 'text-red-600';
    const arrow = isGood ? '↑' : '↓';

    return (
        <div className="p-5 bg-white rounded-xl border border-gray-200">
            <h3 className="text-base font-semibold text-gray-600">{title}</h3>
            <div className="mt-2 flex justify-between items-baseline">
                <p className="text-2xl font-bold text-gray-900">{formatValue(metric.second, format)}</p>
                <div className={`flex items-center font-bold text-lg ${changeColor}`}>
                    <span>{arrow}</span>
                    <span>{Math.abs(metric.percentChange).toFixed(1)}%</span>
                </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">vs {formatValue(metric.first, format)}</p>
        </div>
    );
};