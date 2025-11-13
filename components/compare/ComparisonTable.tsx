import React from 'react';
import type { SectorComparison, TrendCategory } from '../../types';

interface ComparisonTableProps {
    sectors: SectorComparison[];
    budgetYears: string[];
}

const trendStyles: { [key in TrendCategory]: string } = {
    'significant-increase': 'bg-green-100/75 hover:bg-green-100',
    'moderate-increase': 'bg-green-50/75 hover:bg-green-100/75',
    'small-increase': 'bg-green-50/50 hover:bg-green-100/50',
    'no-change': 'hover:bg-gray-50/50',
    'small-decrease': 'bg-red-50/50 hover:bg-red-100/50',
    'moderate-decrease': 'bg-red-50/75 hover:bg-red-100/75',
    'significant-decrease': 'bg-red-100/75 hover:bg-red-100',
};

const formatCurrency = (value: number) => `₹${(value / 100000).toFixed(2)}L Cr`;

const ChangeIndicator: React.FC<{ value: number }> = ({ value }) => {
    if (Math.abs(value) < 0.01) return <span className="text-gray-500">-</span>;
    const isPositive = value > 0;
    const color = isPositive ? 'text-green-600' : 'text-red-600';
    const arrow = isPositive ? '↑' : '↓';

    return (
        <span className={`font-semibold ${color}`}>
            {arrow} {Math.abs(value).toFixed(1)}%
        </span>
    );
};

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ sectors, budgetYears }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">Sector</th>
                            <th scope="col" className="px-6 py-3 text-right">{budgetYears[0]}</th>
                            <th scope="col" className="px-6 py-3 text-right">{budgetYears[1]}</th>
                            <th scope="col" className="px-6 py-3 text-right">% Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sectors.map((sector) => (
                            <tr
                                key={sector.id}
                                className={`border-b border-gray-200 transition-colors duration-200 ${trendStyles[sector.trend]}`}
                            >
                                <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                                    {sector.name}
                                </th>
                                <td className="px-6 py-4 text-right text-gray-600 font-mono">{formatCurrency(sector.first)}</td>
                                <td className="px-6 py-4 text-right text-gray-900 font-mono font-semibold">{formatCurrency(sector.second)}</td>
                                <td className="px-6 py-4 text-right font-mono">
                                    <ChangeIndicator value={sector.percentChange} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};