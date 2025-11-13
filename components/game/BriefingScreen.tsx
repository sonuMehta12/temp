import React from 'react';
import { AdvisorCard } from './AdvisorCard';
import { EconomicDashboard } from './EconomicDashboard';
// FIX: Import missing constants.
import { ADVISORS, INITIAL_ECONOMIC_METRICS } from '../../constants';
import { LoaderCircle } from '../icons';

interface BriefingScreenProps {}

export const BriefingScreen: React.FC<BriefingScreenProps> = () => {
    // This component automatically continues after a delay, controlled in BudgetWarRoom.tsx
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Your Pre-Budget Briefing</h2>
                <p className="text-gray-600 mt-2">November 2025. Your decisions will shape the upcoming budget.</p>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Meet Your Advisors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ADVISORS.map(advisor => (
                        <AdvisorCard key={advisor.id} advisor={advisor} />
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Economic Dashboard</h3>
                <EconomicDashboard metrics={INITIAL_ECONOMIC_METRICS} />
            </div>

            <div className="pt-4 text-center flex items-center justify-center space-x-3 text-lg text-gray-600">
                <LoaderCircle className="w-6 h-6 animate-spin" />
                <span>Entering the War Room...</span>
            </div>
        </div>
    );
};