import React from 'react';
// FIX: Import the Advisor type.
import type { Advisor } from '../../types';

interface AdvisorCardProps {
    advisor: Advisor;
}

export const AdvisorCard: React.FC<AdvisorCardProps> = ({ advisor }) => {
    const Icon = advisor.icon;
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-indigo-600">
                <Icon className="w-8 h-8" />
            </div>
            <h4 className="mt-3 font-bold text-lg text-gray-900">{advisor.name}</h4>
            <p className="text-sm text-gray-500">{advisor.title}</p>
            <p className="mt-1 text-sm font-semibold text-indigo-600">{advisor.philosophy}</p>
            <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 italic">"{advisor.priority}"</p>
            </div>
        </div>
    );
};