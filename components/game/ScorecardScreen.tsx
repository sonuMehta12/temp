import React from 'react';
// FIX: Import the FinalScores type.
import type { FinalScores } from '../../types';
import { Share2 } from '../icons';

interface ScorecardScreenProps {
    scores: FinalScores;
    onRestart: () => void;
}

const ScoreBox: React.FC<{ label: string, value: number }> = ({ label, value }) => (
    <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
);

export const ScorecardScreen: React.FC<ScorecardScreenProps> = ({ scores, onRestart }) => {
    return (
        <div className="p-6 bg-white rounded-xl border border-gray-200 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">Budget 2026-27 Results</h2>
            <p className="text-lg text-gray-600 mt-1">Your Performance Scorecard</p>
            
            <div className="my-6">
                <p className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">{scores.overall}</p>
                <p className="mt-2 text-xl font-semibold text-amber-600">🏆 {scores.philosophy} 🏆</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <ScoreBox label="Economic" value={scores.economic} />
                <ScoreBox label="Social" value={scores.social} />
                <ScoreBox label="Political" value={scores.political} />
            </div>

            <div className="text-left space-y-4 mb-8">
                <div>
                    <h4 className="font-bold text-green-600">✅ What Went Well</h4>
                    <ul className="list-disc list-inside text-gray-700 mt-1 text-sm">
                        {scores.whatWentWell.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-red-600">⚠️ Critical Mistakes</h4>
                     <ul className="list-disc list-inside text-gray-700 mt-1 text-sm">
                        {scores.criticalMistakes.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
            </div>
            
            <div className="p-3 bg-gray-100 rounded-lg text-sm text-gray-700 mb-6">
                <p>58% of players chose a different opening strategy than you.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={onRestart}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
                >
                    Play Again
                </button>
                 <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-800 border border-gray-300 font-semibold text-lg">
                    <Share2 className="w-5 h-5"/>
                    <span>Share Scorecard</span>
                </button>
            </div>
        </div>
    );
};