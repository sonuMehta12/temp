import type React from 'react';
import type { Topic, Sentiment } from '../types';

const sentimentStyles: { [key in Sentiment]: { bg: string; text: string; border: string } } = {
    positive: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    neutral: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' },
    negative: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

const wordStyles = [
  { size: 'text-xl', opacity: 'opacity-100', top: '25%', left: '30%', transform: 'rotate(-5deg)' },
  { size: 'text-lg', opacity: 'opacity-90', top: '55%', left: '40%', transform: 'rotate(3deg)' },
  { size: 'text-md', opacity: 'opacity-80', top: '10%', left: '50%', transform: 'rotate(8deg)' },
  { size: 'text-lg', opacity: 'opacity-90', top: '40%', left: '10%', transform: 'rotate(-8deg)' },
  { size: 'text-md', opacity: 'opacity-70', top: '70%', left: '20%', transform: 'rotate(5deg)' },
  { size: 'text-sm', opacity: 'opacity-60', top: '15%', left: '5%', transform: 'rotate(10deg)' },
];


const TopicCard: React.FC<{ topic: Topic }> = ({ topic }) => {
    const styles = sentimentStyles[topic.sentiment];
    return (
        <div className={`p-4 rounded-lg border ${styles.border} ${styles.bg} flex flex-col`}>
             <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-gray-900">{topic.name}</h4>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles.bg} ${styles.text}`}>{topic.sentiment}</span>
            </div>
            <div className={`relative h-28 flex-grow ${styles.text}`}>
                {topic.keywords.slice(0, 6).map((word, index) => (
                    <span 
                        key={index}
                        className={`absolute font-bold ${wordStyles[index % wordStyles.length].size} ${wordStyles[index % wordStyles.length].opacity}`}
                        style={{
                            top: wordStyles[index % wordStyles.length].top,
                            left: wordStyles[index % wordStyles.length].left,
                            transform: wordStyles[index % wordStyles.length].transform,
                        }}
                    >
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
}

export const TopicClusters: React.FC<{ topics: Topic[] }> = ({ topics }) => {
    return (
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 px-2">Top Topic Clusters</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {topics.map(topic => (
                    <TopicCard key={topic.name} topic={topic} />
                ))}
            </div>
        </div>
    );
};