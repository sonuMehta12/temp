import React, { useState, useMemo } from 'react';

interface AllocationSlidersProps {
    onSubmit: (allocations: { [key: string]: number }) => void;
}

const ALLOCATION_AREAS = [
    { id: 'education', name: 'Education' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'defense', name: 'Defense' },
    { id: 'greenEnergy', name: 'Green Energy' },
    { id: 'digital', name: 'Digital Infra' },
];
const TOTAL_BUDGET = 15000;

export const AllocationSliders: React.FC<AllocationSlidersProps> = ({ onSubmit }) => {
    const [allocations, setAllocations] = useState<{ [key: string]: number }>({
        education: 3000,
        healthcare: 3000,
        defense: 3000,
        greenEnergy: 3000,
        digital: 3000,
    });

    const totalAllocated = useMemo(() => {
// FIX: Add explicit types to the reduce function's accumulator and value to prevent TypeScript from inferring them as 'unknown'.
        return Object.values(allocations).reduce((sum: number, val: number) => sum + val, 0);
    }, [allocations]);

    const remaining = TOTAL_BUDGET - totalAllocated;

    const handleChange = (id: string, value: number) => {
        setAllocations(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        if (remaining !== 0) {
            alert(`You must allocate the entire ₹${TOTAL_BUDGET} Cr. You have ₹${remaining} Cr remaining.`);
            return;
        }
        onSubmit(allocations);
    };

    return (
        <div className="p-6 bg-white rounded-xl border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">Round 3: Final Allocation</h2>
            <p className="text-center text-gray-600 mb-6">You have a ₹{TOTAL_BUDGET.toLocaleString()} Cr surplus. Allocate it wisely.</p>

            <div className="space-y-6 mb-6">
                {ALLOCATION_AREAS.map(area => (
                    <div key={area.id}>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor={area.id} className="font-semibold text-gray-800">{area.name}</label>
                            <span className="text-lg font-bold text-indigo-600">₹{allocations[area.id].toLocaleString()} Cr</span>
                        </div>
                        <input
                            type="range"
                            id={area.id}
                            min="0"
                            max={TOTAL_BUDGET}
                            step="500"
                            value={allocations[area.id]}
                            onChange={e => handleChange(area.id, parseInt(e.target.value, 10))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>
                ))}
            </div>
            
            <div className={`p-3 rounded-lg text-center font-bold ${remaining === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {remaining === 0 ? "Total Budget Allocated!" : `Remaining: ₹${remaining.toLocaleString()} Cr`}
            </div>

            <button
                onClick={handleSubmit}
                disabled={remaining !== 0}
                className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Finalize Budget
            </button>
        </div>
    );
};