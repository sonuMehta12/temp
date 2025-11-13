import React from 'react';

interface MetricsDisplayProps {
    metrics: {
        economicStability: number;
        publicApproval: number;
        fiscalHealth: number;
    };
}

const Meter: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-1 text-sm">
                <span className="font-semibold text-gray-600">{label}</span>
                <span className="font-bold text-gray-900">{value}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className={`${color} h-2.5 rounded-full`} 
                    style={{ width: `${value}%`, transition: 'width 0.5s ease-out' }}
                ></div>
            </div>
        </div>
    )
}

export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ metrics }) => {
    return (
        <div className="p-4 bg-white/80 rounded-xl border border-gray-200 sticky top-4 z-20 backdrop-blur-sm shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Meter label="Economic Stability" value={metrics.economicStability} color="bg-blue-500" />
                <Meter label="Public Approval" value={metrics.publicApproval} color="bg-green-500" />
                <Meter label="Fiscal Health" value={metrics.fiscalHealth} color="bg-red-500" />
            </div>
        </div>
    );
};