import type React from 'react';

interface CardProps {
    title: string;
    description?: string;
    icon: React.ReactNode;
    onClick: () => void;
}

export const Card: React.FC<CardProps> = ({ title, description, icon, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full text-left p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-gray-50/50 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 group"
        >
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 text-indigo-600 group-hover:text-indigo-500 transition-colors">
                    {icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
                </div>
            </div>
        </button>
    );
};