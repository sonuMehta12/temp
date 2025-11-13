import React, { useState, useMemo, useEffect } from 'react';
// FIX: Import PROMISES constant and Promise type from their respective modules.
import { PROMISES } from './constants';
import type { Promise } from './types';
import { FilterBar } from './components/FilterBar';
import { PromiseGallery } from './components/PromiseGallery';
import { PromiseDetailModal } from './components/PromiseDetailModal';
import { WatchlistPage } from './components/WatchlistPage';

export const BudgetTracker: React.FC = () => {
    const [filters, setFilters] = useState({ status: 'all', sector: 'all', search: '' });
    const [selectedPromise, setSelectedPromise] = useState<Promise | null>(null);
    const [watchlist, setWatchlist] = useState<number[]>(() => {
        const saved = localStorage.getItem('promiseWatchlist');
        return saved ? JSON.parse(saved) : [];
    });
    const [showWatchlist, setShowWatchlist] = useState(false);

    useEffect(() => {
        localStorage.setItem('promiseWatchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const sectors = useMemo(() => ['all', ...Array.from(new Set(PROMISES.map(p => p.sector)))], []);
    const statuses = ['all', 'on-track', 'delayed', 'missed'];

    const filteredPromises = useMemo(() => {
        return PROMISES.filter(p => {
            const statusMatch = filters.status === 'all' || p.status === filters.status;
            const sectorMatch = filters.sector === 'all' || p.sector === filters.sector;
            const searchMatch = filters.search === '' || p.title.toLowerCase().includes(filters.search.toLowerCase()) || p.description.toLowerCase().includes(filters.search.toLowerCase());
            return statusMatch && sectorMatch && searchMatch;
        });
    }, [filters]);

    const watchlistPromises = useMemo(() => {
        return PROMISES.filter(p => watchlist.includes(p.id));
    }, [watchlist]);

    const handleToggleWatchlist = (promiseId: number) => {
        setWatchlist(prev =>
            prev.includes(promiseId)
                ? prev.filter(id => id !== promiseId)
                : [...prev, promiseId]
        );
    };

    const handleViewDetails = (promise: Promise) => {
        setSelectedPromise(promise);
    };

    return (
        <div className="animate-fade-in">
            <header className="text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                    Budget Promise Tracker
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                    An editorial tracker monitoring the execution status of key promises from the Union Budget.
                </p>
            </header>

            <div className="mt-8">
                <FilterBar
                    filters={filters}
                    setFilters={setFilters}
                    sectors={sectors}
                    statuses={statuses}
                    showWatchlist={showWatchlist}
                    setShowWatchlist={setShowWatchlist}
                    watchlistCount={watchlist.length}
                />

                {showWatchlist ? (
                    <WatchlistPage
                        watchlistPromises={watchlistPromises}
                        onViewDetails={handleViewDetails}
                    />
                ) : (
                    <PromiseGallery
                        promises={filteredPromises}
                        onViewDetails={handleViewDetails}
                    />
                )}
            </div>

            {selectedPromise && (
                <PromiseDetailModal
                    promise={selectedPromise}
                    onClose={() => setSelectedPromise(null)}
                    isInWatchlist={watchlist.includes(selectedPromise.id)}
                    onToggleWatchlist={handleToggleWatchlist}
                />
            )}
        </div>
    );
};