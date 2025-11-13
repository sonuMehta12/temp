import React from 'react';
// FIX: Import missing types.
import type { CrisisEvent, CrisisResponseId } from '../../types';

interface CrisisModalProps {
    event: CrisisEvent;
    onRespond: (responseId: CrisisResponseId) => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ event, onRespond }) => {
    return (
        <div className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl border border-red-300 w-full max-w-lg p-6 text-center shadow-2xl shadow-red-500/20 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-red-600">{event.title}</h2>
                <p className="text-gray-600 mt-4">{event.description}</p>

                <div className="mt-6 space-y-3 text-left">
                     <p className="text-sm font-semibold text-gray-800 text-center">You must respond immediately:</p>
                    {event.options.map(option => (
                        <button
                            key={option.id}
                            onClick={() => onRespond(option.id)}
                            className="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors group"
                        >
                            <p className="font-semibold text-gray-900 group-hover:text-white">{option.title}</p>
                            <p className="text-xs text-gray-500 group-hover:text-indigo-200">Impact: {option.impact}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};