import React from 'react';
// FIX: Import Promise type.
import type { Promise } from '../types';
// FIX: Removed unused 'Mail' icon import as it does not exist in './icons'. Import FileText icon.
import { FileText } from './icons';

interface WatchlistPageProps {
    watchlistPromises: Promise[];
    onViewDetails: (promise: Promise) => void;
}

export const WatchlistPage: React.FC<WatchlistPageProps> = ({ watchlistPromises, onViewDetails }) => {
    if (watchlistPromises.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-white border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900">Your Watchlist is Empty</h3>
                <p className="text-gray-600 mt-2">Add promises to your watchlist to track them here.</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                 <h2 className="text-2xl font-bold text-gray-900">My Watchlist ({watchlistPromises.length})</h2>
                 <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <button className="flex items-center space-x-2 py-2 px-3 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors text-gray-700 text-sm">
                        <FileText className="w-4 h-4" />
                        <span>Export All as CSV</span>
                    </button>
                 </div>
            </div>
           
            <div className="space-y-4">
                {watchlistPromises.map(promise => (
                     <div key={promise.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center">
                        <div>
                            <p className="text-xs text-amber-600 font-semibold">{promise.sector}</p>
                            <h4 className="font-bold text-gray-800">{promise.title}</h4>
                        </div>
                        <button 
                            onClick={() => onViewDetails(promise)}
                            className="mt-3 sm:mt-0 bg-gray-100 hover:bg-amber-500 text-gray-800 hover:text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

             <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-200 flex flex-col sm:flex-row items-center justify-between">
                <div>
                    <h4 className="font-bold text-indigo-900">Get Notified</h4>
                    <p className="text-sm text-indigo-800">Receive email updates for promises on your watchlist.</p>
                </div>
                 <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                    <input type="checkbox" id="email-notify" className="h-4 w-4 rounded bg-gray-50 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="email-notify" className="text-sm text-gray-800">Email me updates</label>
                </div>
            </div>
        </div>
    );
};