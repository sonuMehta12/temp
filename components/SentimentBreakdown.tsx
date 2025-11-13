import type React from 'react';
import type { Breakdown, SampleQuotes, Sentiment } from '../types';
import { AlertTriangle, CheckCircle } from './icons'; // Using existing icons for sentiment

interface SentimentBreakdownProps {
    breakdown: Breakdown;
    sampleQuotes: SampleQuotes;
}

const sentimentStyles: { [key in Sentiment]: { bar: string; text: string; icon: React.ReactNode } } = {
    positive: { bar: 'bg-green-500', text: 'text-green-600', icon: <CheckCircle className="w-5 h-5" /> },
    neutral: { bar: 'bg-slate-500', text: 'text-gray-600', icon: <div className="w-5 h-5 flex items-center justify-center"><div className="w-2 h-2 bg-slate-400 rounded-full"/></div> },
    negative: { bar: 'bg-red-500', text: 'text-red-600', icon: <AlertTriangle className="w-5 h-5" /> },
};


const SentimentRow: React.FC<{ sentiment: Sentiment; percentage: number; quote: string; }> = ({ sentiment, percentage, quote }) => {
    const styles = sentimentStyles[sentiment];
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between text-sm font-semibold">
                <div className={`flex items-center space-x-2 ${styles.text}`}>
                    {styles.icon}
                    <span className="capitalize">{sentiment}</span>
                </div>
                <span className="text-gray-800">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className={`${styles.bar} h-2.5 rounded-full`} style={{ width: `${percentage}%`, transition: 'width 0.5s ease-out' }}></div>
            </div>
            <p className="text-sm text-gray-500 italic pl-2 border-l-2 border-gray-200">"{quote}"</p>
        </div>
    );
}

export const SentimentBreakdown: React.FC<SentimentBreakdownProps> = ({ breakdown, sampleQuotes }) => {
    return (
        <div className="p-6 bg-white rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Sentiment Breakdown</h3>
            <div className="space-y-6">
                <SentimentRow sentiment="positive" percentage={breakdown.positive} quote={sampleQuotes.positive} />
                <SentimentRow sentiment="neutral" percentage={breakdown.neutral} quote={sampleQuotes.neutral} />
                <SentimentRow sentiment="negative" percentage={breakdown.negative} quote={sampleQuotes.negative} />
            </div>
        </div>
    );
};