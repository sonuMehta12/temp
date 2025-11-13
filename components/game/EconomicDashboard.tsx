import React from 'react';
// FIX: Import the EconomicMetrics type.
import type { EconomicMetrics } from '../../types';
import { CheckCircle, AlertTriangle } from '../icons';

const MetricItem: React.FC<{ label: string; value: string; status: 'good' | 'warning' | 'bad' }> = ({ label, value, status }) => {
    const statusClasses = {
        good: 'text-green-500',
        warning: 'text-yellow-500',
        bad: 'text-red-500',
    };
    const Icon = status === 'good' ? CheckCircle : AlertTriangle;
    
    return (
        <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <p className="text-sm text-gray-500">{label}</p>
            <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-bold text-gray-900">{value.split('(')[0]}</p>
                <Icon className={`w-6 h-6 ${statusClasses[status]}`} />
            </div>
            {value.includes('(') && <p className="text-xs text-gray-400">{`(${value.split('(')[1]}`}</p>}
        </div>
    );
};


export const EconomicDashboard: React.FC<{ metrics: EconomicMetrics }> = ({ metrics }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricItem label="GDP Growth" value={metrics.gdpGrowth} status="warning" />
            <MetricItem label="Inflation" value={metrics.inflation} status="good" />
            <MetricItem label="Fiscal Deficit" value={metrics.fiscalDeficit} status="bad" />
            <MetricItem label="Recent Shock" value={metrics.recentShock} status="warning" />
        </div>
    );
};