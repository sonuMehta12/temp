import React, { useState } from 'react';
import { QUESTIONNAIRE_OPTIONS } from '../constants';
import type { QuestionnaireAnswers } from '../types';

interface QuestionnaireProps {
    onSubmit: (answers: QuestionnaireAnswers) => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onSubmit }) => {
    const [answers, setAnswers] = useState<QuestionnaireAnswers>({
        companySize: QUESTIONNAIRE_OPTIONS.companySize[0],
        primaryConcern: QUESTIONNAIRE_OPTIONS.primaryConcern[0],
        geographicFocus: QUESTIONNAIRE_OPTIONS.geographicFocus[0],
        plannedPurchase: QUESTIONNAIRE_OPTIONS.plannedPurchase[0],
        investmentArea: QUESTIONNAIRE_OPTIONS.investmentArea[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAnswers(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(answers);
    };

    const SelectInput: React.FC<{
        label: string;
        name: keyof QuestionnaireAnswers;
        options: string[];
    }> = ({ label, name, options }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <select
                id={name}
                name={name}
                value={answers[name]}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );


    return (
        <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">3. A Few More Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <SelectInput label="Company Size / Stage" name="companySize" options={QUESTIONNAIRE_OPTIONS.companySize} />
                <SelectInput label="Primary Concern" name="primaryConcern" options={QUESTIONNAIRE_OPTIONS.primaryConcern} />
                <SelectInput label="Geographic Focus" name="geographicFocus" options={QUESTIONNAIRE_OPTIONS.geographicFocus} />
                <SelectInput label="What is your next planned big purchase?" name="plannedPurchase" options={QUESTIONNAIRE_OPTIONS.plannedPurchase} />
                <SelectInput label="What is your primary investment area?" name="investmentArea" options={QUESTIONNAIRE_OPTIONS.investmentArea} />
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
                    >
                        Generate My Brief
                    </button>
                </div>
            </form>
        </div>
    );
};