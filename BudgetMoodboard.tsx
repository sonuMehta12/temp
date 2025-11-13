import React, { useState, useEffect } from 'react';
import { MOOD_DATA } from './constants';
import { MoodCard } from './components/MoodCard';
import { SentimentBreakdown } from './components/SentimentBreakdown';
import { TopicClusters } from './components/TopicClusters';
import { ReactionsStream } from './components/ReactionsStream';
import { Share2 } from './components/icons';

export const BudgetMoodboard: React.FC = () => {
    const [moodData, setMoodData] = useState(MOOD_DATA);
    const [timeAgo, setTimeAgo] = useState(2); 

    useEffect(() => {
        // This effect simulates the "Last updated" timer.
        const timerInterval = setInterval(() => {
            setTimeAgo(prev => prev + 1);
        }, 60000); 

        return () => {
            clearInterval(timerInterval);
        };
    }, []);

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="text-center">
                 <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-cyan-500">
                    Budget Moodboard
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                   A real-time sentiment visualization of public reaction to budget announcements.
                </p>
            </header>
            
            <MoodCard 
                overall={moodData.overall}
                lastUpdated={timeAgo === 0 ? "just now" : `${timeAgo} mins ago`}
            />

            <SentimentBreakdown 
                breakdown={moodData.breakdown}
                sampleQuotes={moodData.sampleQuotes}
            />

            <TopicClusters topics={moodData.topics} />

            <ReactionsStream reactions={moodData.reactions} />

            <div className="flex justify-center pt-4">
                <button className="flex items-center space-x-2 py-3 px-6 rounded-lg bg-white hover:bg-gray-100 border border-gray-300 transition-colors text-gray-800 font-semibold text-lg">
                    <Share2 className="w-5 h-5"/>
                    <span>Share Mood Card</span>
                </button>
            </div>
        </div>
    );
};