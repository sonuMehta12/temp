import React from 'react';
// FIX: Import Promise and MilestoneStatus types.
import type { Promise, MilestoneStatus } from '../types';
// FIX: Import missing icons X, Bookmark, and FileText.
import { X, Bookmark, FileText, CheckCircle, LoaderCircle, AlertTriangle } from './icons';

interface PromiseDetailModalProps {
    promise: Promise;
    onClose: () => void;
    isInWatchlist: boolean;
    onToggleWatchlist: (promiseId: number) => void;
}

// FIX: Added styles for 'delayed' and 'missed' milestone statuses to render them correctly in the UI.
const milestoneStatusStyles: { [key in MilestoneStatus]: { icon: React.ReactNode; line: string; text: string } } = {
    completed: { icon: <CheckCircle className="w-5 h-5 text-green-500" />, line: 'border-green-500', text: 'text-gray-700' },
    'in-progress': { icon: <LoaderCircle className="w-5 h-5 text-blue-500 animate-spin" />, line: 'border-blue-500', text: 'text-gray-900 font-semibold' },
    upcoming: { icon: <div className="w-5 h-5 flex items-center justify-center"><div className="w-2.5 h-2.5 bg-gray-400 rounded-full"/></div>, line: 'border-gray-300 border-dashed', text: 'text-gray-500' },
    delayed: { icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />, line: 'border-yellow-500', text: 'text-gray-900 font-semibold' },
    missed: { icon: <X className="w-5 h-5 text-red-500" />, line: 'border-red-500', text: 'text-gray-900 font-semibold line-through' },
};

export const PromiseDetailModal: React.FC<PromiseDetailModalProps> = ({ promise, onClose, isInWatchlist, onToggleWatchlist }) => {
    const percentage = Math.round((promise.spent / promise.budgeted) * 100);

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-gray-50 rounded-2xl border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-semibold text-amber-600">{promise.ministry}</p>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{promise.title}</h2>
                        </div>
                        <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors">
                            <X className="w-6 h-6"/>
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-6 space-y-6">
                    {/* Stats Section */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-3">Financials</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            <div className="bg-white p-3 rounded-lg border border-gray-200"><p className="text-xs text-gray-500">Budgeted</p><p className="text-xl font-bold text-amber-600">₹{promise.budgeted.toLocaleString('en-IN')} Cr</p></div>
                            <div className="bg-white p-3 rounded-lg border border-gray-200"><p className="text-xs text-gray-500">Spent</p><p className="text-xl font-bold text-gray-900">₹{promise.spent.toLocaleString('en-IN')} Cr</p></div>
                            <div className="bg-white p-3 rounded-lg border border-gray-200"><p className="text-xs text-gray-500">Completion</p><p className="text-xl font-bold text-gray-900">{percentage}%</p></div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                            <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                    </div>

                     {/* Description Section */}
                     <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Promise Details</h3>
                        <p className="text-gray-600">{promise.description}</p>
                    </div>


                    {/* Timeline Section */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Timeline</h3>
                        <div className="relative pl-6">
                            {promise.timeline.map((item, index) => (
                                <div key={index} className="relative flex items-start pb-6 last:pb-0">
                                    <div className={`absolute left-0 top-0 -translate-x-1/2 w-px h-full ${milestoneStatusStyles[item.status].line}`}></div>
                                    <div className="absolute left-0 top-0 -translate-x-1/2 bg-gray-50 p-1 rounded-full">
                                        {milestoneStatusStyles[item.status].icon}
                                    </div>
                                    <div className={`pl-6 ${milestoneStatusStyles[item.status].text}`}>
                                        <p className="text-sm">{item.date}</p>
                                        <p>{item.milestone}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                     {/* Editorial Note Section */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">ET Editorial Note</h3>
                        <p className="text-gray-600 italic">{promise.editorialNote}</p>
                        <p className="text-xs text-gray-400 mt-3">Last Updated: {new Date(promise.lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 flex flex-col sm:flex-row gap-3 border-t border-gray-200 sticky bottom-0 bg-gray-50/80 backdrop-blur-sm">
                    <button 
                        onClick={() => onToggleWatchlist(promise.id)}
                        className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-semibold transition-colors ${isInWatchlist ? 'bg-amber-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100 text-gray-700'}`}
                    >
                        <Bookmark className="w-5 h-5" />
                        <span>{isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold transition-colors">
                        <FileText className="w-5 h-5" />
                        <span>Export as PDF</span>
                    </button>
                </div>
            </div>
        </div>
    );
};