import React, { useState } from 'react';

interface ComparisonSelectorProps {
    budgetYears: string[];
    onCompare: (year1: string, year2: string) => void;
}

const defaultYears = (years: string[]) => {
    if (years.length >= 2) {
        return [years[0], years[1]];
    }
    if (years.length === 1) {
        return [years[0], years[0]];
    }
    return ['', ''];
};

export const ComparisonSelector: React.FC<ComparisonSelectorProps> = ({ budgetYears, onCompare }) => {
    const [selection, setSelection] = useState({
        first: defaultYears(budgetYears)[0],
        second: defaultYears(budgetYears)[1],
    });

    const handleSelect = (budget: 'first' | 'second', year: string) => {
        setSelection(prev => ({ ...prev, [budget]: year }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selection.first && selection.second) {
            onCompare(selection.first, selection.second);
        }
    };

    const BudgetPicker: React.FC<{ label: string, selected: string, onSelect: (year: string) => void }> = ({ label, selected, onSelect }) => (
        <div className="flex-1">
            <label className="block text-sm font-bold text-gray-800 mb-2">{label}</label>
            <div className="grid grid-cols-2 gap-3">
                {budgetYears.map(year => (
                    <button
                        type="button"
                        key={year}
                        onClick={() => onSelect(year)}
                        className={`p-4 rounded-lg font-semibold transition-all duration-200 text-center
                            ${selected === year
                                ? 'bg-teal-500 text-white ring-2 ring-teal-300 shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {year}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Select Budgets to Compare</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-8 mb-8">
                    <BudgetPicker label="SELECT FIRST BUDGET" selected={selection.first} onSelect={(year) => handleSelect('first', year)} />
                    <div className="flex items-center justify-center text-gray-400 font-bold text-2xl">vs</div>
                    <BudgetPicker label="SELECT SECOND BUDGET" selected={selection.second} onSelect={(year) => handleSelect('second', year)} />
                </div>
                <button
                    type="submit"
                    disabled={!selection.first || !selection.second}
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Compare Now
                </button>
            </form>
        </div>
    );
};