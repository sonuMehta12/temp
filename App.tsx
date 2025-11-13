import React, { useState } from 'react';
import { SectorSimulator } from './SectorSimulator';
import { BudgetMoodboard } from './BudgetMoodboard';
import { Navigation } from './components/Navigation';

export type AppName = 'simulator' | 'moodboard';

const App: React.FC = () => {
    const [activeApp, setActiveApp] = useState<AppName>('simulator');

    const renderApp = () => {
        switch (activeApp) {
            case 'simulator':
                return <SectorSimulator />;
            case 'moodboard':
                return <BudgetMoodboard />;
            default:
                return <SectorSimulator />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-2 sm:p-4 lg:p-6">
            <div className="max-w-6xl mx-auto">
                <Navigation activeApp={activeApp} setActiveApp={setActiveApp} />
                <main className="mt-6 sm:mt-8">
                    {renderApp()}
                </main>
            </div>
        </div>
    );
};

export default App;