import React from 'react';
// FIX: Import the Bookmark icon.
import { Bookmark } from './icons';

interface FilterBarProps {
    filters: { status: string; sector: string; search: string };
    setFilters: React.Dispatch<React.SetStateAction<{ status: string; sector: string; search: string }>>;
    sectors: string[];
    statuses: string[];
    showWatchlist: boolean;
    setShowWatchlist: (show: boolean) => void;
    watchlistCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    filters,
    setFilters,
    sectors,
    statuses,
    showWatchlist,
    setShowWatchlist,
    watchlistCount
}) => {
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const inputBaseClasses = "bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base";

    return (
        <div className="p-4 bg-white/80 rounded-xl border border-gray-200 mb-8 sticky top-4 z-10 backdrop-blur-sm shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="lg:col-span-2">
                    <label htmlFor="search" className="block text-xs font-medium text-gray-600 mb-1">Search Promises</label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="e.g., Highway, Semiconductor..."
                        value={filters.search}
                        onChange={handleFilterChange}
                        className={`w-full ${inputBaseClasses}`}
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                    <select name="status" id="status" value={filters.status} onChange={handleFilterChange} className={`w-full ${inputBaseClasses}`}>
                        {statuses.map(s => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="sector" className="block text-xs font-medium text-gray-600 mb-1">Sector</label>
                    <select name="sector" id="sector" value={filters.sector} onChange={handleFilterChange} className={`w-full ${inputBaseClasses}`}>
                        {sectors.map(s => <option key={s} value={s}>{s === 'all' ? 'All Sectors' : s}</option>)}
                    </select>
                </div>
            </div>
             <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center">
                 <button
                    onClick={() => setShowWatchlist(!showWatchlist)}
                    className={`flex items-center space-x-2 py-2 px-4 rounded-lg font-semibold transition-colors ${showWatchlist ? 'bg-amber-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'}`}
                >
                    <Bookmark className="w-5 h-5" />
                    <span>My Watchlist</span>
                    <span className="bg-amber-100 text-amber-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{watchlistCount}</span>
                </button>
            </div>
        </div>
    );
};