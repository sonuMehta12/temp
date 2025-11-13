import type React from 'react';
import type { BriefData } from '../types';
import { BarChart, AlertTriangle, CheckCircle, Landmark, ArrowRightCircle, Share2 } from './icons';

interface ResultsBriefProps {
    briefData: BriefData;
    sector: string;
    role: string;
}

const Section: React.FC<{ title: string; icon: React.ReactNode; items: string[] }> = ({ title, icon, items }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center mb-4">
            <div className="text-indigo-600">{icon}</div>
            <h3 className="ml-3 text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <ul className="space-y-3 list-disc list-inside text-gray-600">
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </div>
);

export const ResultsBrief: React.FC<ResultsBriefProps> = ({ briefData, sector, role }) => {
    const { keyChanges, risks, opportunities, schemesAndIncentives, nextSteps } = briefData;
    const sections = [
        { title: 'Key Changes', icon: <BarChart className="w-6 h-6"/>, items: keyChanges },
        { title: 'Risks', icon: <AlertTriangle className="w-6 h-6"/>, items: risks },
        { title: 'Opportunities', icon: <CheckCircle className="w-6 h-6"/>, items: opportunities },
        { title: 'Schemes & Incentives', icon: <Landmark className="w-6 h-6"/>, items: schemesAndIncentives },
        { title: 'Next Steps', icon: <ArrowRightCircle className="w-6 h-6"/>, items: nextSteps },
    ];
    
    return (
        <div>
            <div className="p-6 bg-white rounded-xl border border-gray-200 mb-8">
                 <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-semibold text-indigo-600">YOUR PERSONALIZED BRIEF</p>
                        <h2 className="text-3xl font-bold mt-1 text-gray-900">{sector} &ndash; {role}</h2>
                    </div>
                    <button className="flex items-center space-x-2 py-2 px-4 rounded-lg bg-white hover:bg-gray-100 transition-colors text-gray-700 border border-gray-300">
                        <Share2 className="w-4 h-4"/>
                        <span>Share</span>
                    </button>
                 </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                {sections.map(section => (
                    <Section key={section.title} {...section} />
                ))}
            </div>
        </div>
    );
};