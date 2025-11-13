import React from 'react';
// FIX: Import missing types.
import type { DecisionOption, DecisionId, AdvisorOpinion } from '../../types';
// FIX: Import missing constant.
import { ADVISORS } from '../../constants';
import { TrendingUp } from '../icons';

const StanceIcon: React.FC<{ stance: AdvisorOpinion['stance'] }> = ({ stance }) => {
    if (stance.includes('support')) return <span className="text-green-500">✅</span>;
    if (stance.includes('oppose')) return <span className="text-red-500">❌</span>;
    return <span className="text-yellow-500">🤔</span>;
};

const ImpactPreview: React.FC<{ label: string, value: number }> = ({ label, value }) => {
    const color = value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-gray-500';
    const sign = value > 0 ? '+' : '';
    return (
        <div className="text-xs">
            <span>{label}: </span>
            <span className={`font-bold ${color}`}>{sign}{value}</span>
        </div>
    )
}

export const DecisionCard: React.FC<{ option: DecisionOption; onSelect: (id: DecisionId) => void; }> = ({ option, onSelect }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col h-full hover:border-indigo-500 transition-colors duration-300 shadow-sm">
            <div className="text-center mb-4">
                <div className="text-4xl">{option.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mt-2">{option.title}</h3>
            </div>
            <p className="text-sm text-gray-600 text-center flex-grow">{option.description}</p>
            
            <div className="my-4 space-y-2">
                <div className="p-2 bg-gray-50 rounded text-center">
                    <p className="text-xs text-gray-500">Cost</p>
                    <p className="text-sm font-semibold text-amber-600">{option.cost}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500 text-center mb-1">Impact Preview</p>
                    <div className="flex justify-around">
                        <ImpactPreview label="Econ" value={option.impacts.economicStability} />
                        <ImpactPreview label="Public" value={option.impacts.publicApproval} />
                        <ImpactPreview label="Fiscal" value={option.impacts.fiscalHealth} />
                    </div>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                 <p className="text-xs text-gray-500 font-semibold text-center">💬 Advisors Weigh In:</p>
                 {option.advisorOpinions.map(opinion => {
                     const advisor = ADVISORS.find(a => a.id === opinion.advisor);
                     return (
                         <div key={opinion.advisor} className="text-xs text-gray-700 p-1.5 bg-gray-100 rounded">
                             <StanceIcon stance={opinion.stance} /> <span className="font-bold">{advisor?.name.split(' ')[1]}:</span> "{opinion.quote}"
                         </div>
                     )
                 })}
            </div>

            <button
                onClick={() => onSelect(option.id)}
                className="w-full mt-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
                Select This Option
            </button>
        </div>
    );
};