import type React from 'react';
// FIX: Import the Promise type.
import type { Promise } from '../types';
import { PromiseCard } from './PromiseCard';

interface PromiseGalleryProps {
    promises: Promise[];
    onViewDetails: (promise: Promise) => void;
}

export const PromiseGallery: React.FC<PromiseGalleryProps> = ({ promises, onViewDetails }) => {
    if (promises.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-white border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900">No Promises Found</h3>
                <p className="text-gray-600 mt-2">Try adjusting your search or filter criteria.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promises.map(promise => (
                <PromiseCard key={promise.id} promise={promise} onViewDetails={onViewDetails} />
            ))}
        </div>
    );
};