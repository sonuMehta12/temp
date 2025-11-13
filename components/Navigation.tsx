import type React from 'react';
import type { AppName } from '../App';

interface NavigationProps {
    activeApp: AppName;
    setActiveApp: (appName: AppName) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeApp, setActiveApp }) => {
    const navItems = [
        { id: 'simulator', name: 'Sector Simulator' },
        { id: 'moodboard', name: 'Moodboard' },
    ];

    return (
        <header>
            <div className="text-center mb-4">
                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">The Economic Times</h1>
                 <p className="text-indigo-600 font-semibold">Budget Analysis Suite</p>
            </div>
            <nav className="p-1.5 bg-white rounded-xl border border-gray-200 grid grid-cols-2 gap-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveApp(item.id as AppName)}
                        className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white
                            ${activeApp === item.id 
                                ? 'bg-indigo-600 text-white shadow-md' 
                                : 'text-gray-600 font-medium hover:bg-gray-100'
                            }`}
                    >
                        {item.name}
                    </button>
                ))}
            </nav>
        </header>
    );
};