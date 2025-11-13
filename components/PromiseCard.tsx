import type React from 'react';
// FIX: Import Promise and PromiseStatus types.
import type { Promise, PromiseStatus } from '../types';

interface PromiseCardProps {
    promise: Promise;
    onViewDetails: (promise: Promise) => void;
}

const statusStyles: { [key in PromiseStatus]: { badge: string; text: string; progress: string } } = {
    'on-track': { badge: 'bg-green-100 text-green-800', text: 'On Track', progress: 'bg-green-500' },
    'delayed': { badge: 'bg-yellow-100 text-yellow-800', text: 'Delayed', progress: 'bg-yellow-500' },
    'missed': { badge: 'bg-red-100 text-red-800', text: 'Missed', progress: 'bg-red-500' },
};

export const PromiseCard: React.FC<PromiseCardProps> = ({ promise, onViewDetails }) => {
    const styles = statusStyles[promise.status];
    const percentage = Math.round((promise.spent / promise.budgeted) * 100);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col h-full hover:border-amber-500 shadow-sm transition-colors duration-300">
            <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-semibold text-gray-500">{promise.sector}</p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${styles.badge}`}>{styles.text}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 flex-grow">{promise.title}</h3>
            
            <div className="mt-4">
                <div className="flex justify-between items-baseline mb-1">
                     <p className="text-sm text-gray-600">Budget</p>
                     <p className="text-lg font-bold text-amber-500">₹{promise.budgeted.toLocaleString('en-IN')} Cr</p>
                </div>
                <div className="flex justify-between items-baseline">
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="text-sm font-semibold text-gray-800">{percentage}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className={`${styles.progress} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
                </div>
            </div>

            <button
                onClick={() => onViewDetails(promise)}
                className="w-full mt-6 bg-white hover:bg-amber-500 text-amber-700 hover:text-white font-bold py-2 px-4 rounded-lg border border-amber-500 transition-colors"
            >
                View Details
            </button>
        </div>
    );
};