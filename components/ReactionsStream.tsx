import type React from 'react';
import type { Reaction, Sentiment } from '../types';
import { Twitter, Linkedin, MessageSquare } from './icons';

const sentimentStyles: { [key in Sentiment]: { border: string } } = {
    positive: { border: 'border-green-500' },
    neutral: { border: 'border-gray-300' },
    negative: { border: 'border-red-500' },
};

const platformIcons = {
    twitter: <Twitter className="w-5 h-5 text-sky-400" />,
    linkedin: <Linkedin className="w-5 h-5 text-blue-400" />,
    'et-comments': <MessageSquare className="w-5 h-5 text-gray-500" />,
}

const ReactionCard: React.FC<{ reaction: Reaction }> = ({ reaction }) => {
    const styles = sentimentStyles[reaction.sentiment];
    return (
        <div className={`p-4 bg-white rounded-lg border border-gray-200 border-l-4 ${styles.border}`}>
            <p className="text-gray-800">{reaction.text}</p>
            <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                    {platformIcons[reaction.platform]}
                    <span className="capitalize">{reaction.platform === 'et-comments' ? 'ET Comments' : reaction.platform}</span>
                </div>
                <span>{reaction.time}</span>
            </div>
        </div>
    );
};

export const ReactionsStream: React.FC<{ reactions: Reaction[] }> = ({ reactions }) => {
    return (
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 px-2">Trending Reactions</h3>
            <div className="space-y-4">
                {reactions.map((reaction, index) => (
                    <ReactionCard key={index} reaction={reaction} />
                ))}
            </div>
        </div>
    );
};