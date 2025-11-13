import type React from 'react';
import { Card } from './Card';
import { SECTORS } from '../constants';
import type { Sector } from '../types';

interface SectorGridProps {
    onSelect: (sector: Sector) => void;
}

export const SectorGrid: React.FC<SectorGridProps> = ({ onSelect }) => {
    return (
        <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">1. Select Your Sector</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SECTORS.map((sector) => (
                    <Card
                        key={sector.id}
                        title={sector.name}
                        description={sector.description}
                        icon={<sector.icon className="w-8 h-8" />}
                        onClick={() => onSelect(sector)}
                    />
                ))}
            </div>
        </div>
    );
};