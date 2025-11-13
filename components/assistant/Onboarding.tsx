import React, { useState } from 'react';
import { ONBOARDING_QUESTIONS } from '../../constants';
import type { UserProfile } from '../../types';

interface OnboardingProps {
    onComplete: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Partial<UserProfile>>({});

    const currentQuestion = ONBOARDING_QUESTIONS[currentStep];
    const { key, question, icon: Icon, options } = currentQuestion;

    const handleSelectOption = (option: string) => {
        const newAnswers = { ...answers, [key]: option };
        setAnswers(newAnswers);
        if (currentStep < ONBOARDING_QUESTIONS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete(newAnswers as UserProfile);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    const progressPercentage = ((currentStep + 1) / ONBOARDING_QUESTIONS.length) * 100;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl border border-gray-200">
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-indigo-600">
                        Step {currentStep + 1} of {ONBOARDING_QUESTIONS.length}
                    </p>
                    {currentStep > 0 && (
                        <button onClick={handleBack} className="text-sm text-gray-500 hover:text-gray-800">&larr; Back</button>
                    )}
                </div>
                 <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.3s ease-in-out' }}></div>
                </div>
            </div>

            <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-indigo-600 mb-4">
                    <Icon className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{question}</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleSelectOption(option)}
                        className="w-full text-center p-4 bg-white rounded-lg border border-gray-300 hover:border-indigo-500 hover:bg-gray-50/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <span className="font-semibold text-gray-800">{option}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};