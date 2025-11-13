import type React from 'react';
import type { OverallMood, Sentiment } from '../types';

interface MoodCardProps {
    overall: OverallMood;
    lastUpdated: string;
}

const sentimentStyles: { [key in Sentiment]: { gradient: string; text: string; ring: string } } = {
    positive: { gradient: 'from-green-100/50 to-white', text: 'text-green-700', ring: 'ring-green-500' },
    neutral: { gradient: 'from-gray-200/50 to-white', text: 'text-gray-700', ring: 'ring-gray-500' },
    negative: { gradient: 'from-red-100/50 to-white', text: 'text-red-700', ring: 'ring-red-500' },
};


export const MoodCard: React.FC<MoodCardProps> = ({ overall, lastUpdated }) => {
    const styles = sentimentStyles[overall.sentiment];
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (overall.score / 100) * circumference;

    return (
        <div className={`p-6 sm:p-8 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden relative bg-gradient-to-br ${styles.gradient}`}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex-shrink-0 text-7xl sm:text-8xl ">{overall.emoji}</div>

                <div className="flex-grow">
                    <p className={`font-bold text-lg uppercase ${styles.text}`}>Overall Sentiment</p>
                    <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-gray-900">{overall.headline}</h2>
                    <p className="text-sm text-gray-500 mt-2">Last updated: {lastUpdated}</p>
                </div>
                
                <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                        <circle
                            className={styles.text}
                            strokeWidth="8"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="45" cx="50" cy="50"
                            style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className={`text-3xl font-bold ${styles.text}`}>{overall.score}</span>
                        <span className="text-sm text-gray-500">/ 100</span>
                    </div>
                </div>

            </div>
        </div>
    );
};