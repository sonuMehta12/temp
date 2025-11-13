import React, { useState, useCallback } from 'react';
import { Hero } from './components/Hero';
import { SectorGrid } from './components/SectorGrid';
import { RoleGrid } from './components/RoleGrid';
import { Questionnaire } from './components/Questionnaire';
import { ResultsBrief } from './components/ResultsBrief';
import { ResourceLinks } from './components/ResourceLinks';
import { generateBrief } from './services/geminiService';
import type { Sector, Role, QuestionnaireAnswers, BriefData } from './types';
import { MOCK_BRIEF_DATA } from './constants';
import { LoaderCircle, AlertTriangle } from './components/icons';
import { WhatGotCheaper } from './components/WhatGotCheaper';

type Step = 'sector' | 'role' | 'questions' | 'results';
type ResultTab = 'brief' | 'deals';

export const SectorSimulator: React.FC = () => {
    const [step, setStep] = useState<Step>('sector');
    const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers | null>(null);

    const [briefData, setBriefData] = useState<BriefData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<ResultTab>('brief');

    const handleSelectSector = (sector: Sector) => {
        setSelectedSector(sector);
        setStep('role');
    };

    const handleSelectRole = (role: Role) => {
        setSelectedRole(role);
        setStep('questions');
    };

    const handleBack = () => {
        if (step === 'results') setStep('questions');
        if (step === 'questions') setStep('role');
        if (step === 'role') setStep('sector');
    };

    const handleReset = () => {
        setStep('sector');
        setSelectedSector(null);
        setSelectedRole(null);
        setQuestionnaireAnswers(null);
        setBriefData(null);
        setIsLoading(false);
        setError(null);
        setActiveTab('brief');
    };

    const handleSubmitQuestions = useCallback(async (answers: QuestionnaireAnswers) => {
        setQuestionnaireAnswers(answers);
        setStep('results');
        setIsLoading(true);
        setError(null);
        
        if (!selectedSector || !selectedRole) {
            setError("Sector and Role must be selected.");
            setIsLoading(false);
            return;
        }

        try {
            const data = await generateBrief(selectedSector, selectedRole, answers);
            setBriefData(data);
        } catch (e) {
            console.error("Gemini API call failed, falling back to mock data.", e);
            setError("Could not generate a live brief. Showing sample data for a Tech Founder.");
            setBriefData(MOCK_BRIEF_DATA);
        } finally {
            setIsLoading(false);
        }
    }, [selectedSector, selectedRole]);

    const renderStep = () => {
        switch (step) {
            case 'sector':
                return <SectorGrid onSelect={handleSelectSector} />;
            case 'role':
                return <RoleGrid onSelect={handleSelectRole} />;
            case 'questions':
                return <Questionnaire onSubmit={handleSubmitQuestions} />;
            case 'results':
                if (isLoading) {
                    return (
                        <div className="flex flex-col items-center justify-center text-center p-8 bg-white border border-gray-200 rounded-lg min-h-[400px]">
                            <LoaderCircle className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900">Generating Your Personalized Brief...</h3>
                            <p className="text-gray-600 mt-2">Our AI is analyzing the budget based on your profile.</p>
                        </div>
                    );
                }
                if (error && !briefData) {
                     return (
                        <div className="flex flex-col items-center justify-center text-center p-8 bg-red-50 border border-red-200 rounded-lg min-h-[400px]">
                            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                            <h3 className="text-xl font-bold text-red-800">An Error Occurred</h3>
                            <p className="text-red-600 mt-2">{error}</p>
                            <button onClick={handleReset} className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                Start Over
                            </button>
                        </div>
                    );
                }
                if (briefData) {
                    return (
                        <>
                             {error && (
                                <div className="mb-4 bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg text-sm" role="alert">
                                   <p>{error}</p>
                                </div>
                            )}
                            
                            <div className="mb-6">
                                <div className="flex border-b border-gray-200">
                                    <button
                                        onClick={() => setActiveTab('brief')}
                                        className={`px-4 py-2 font-semibold text-lg transition-colors ${activeTab === 'brief' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Your 5-Point Brief
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('deals')}
                                        className={`px-4 py-2 font-semibold text-lg transition-colors ${activeTab === 'deals' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        What Got Cheaper
                                    </button>
                                </div>
                            </div>
                            
                            <div className="animate-fade-in">
                                {activeTab === 'brief' && (
                                    <>
                                        <ResultsBrief 
                                            briefData={briefData}
                                            sector={selectedSector!.name}
                                            role={selectedRole!.name}
                                        />
                                        <ResourceLinks />
                                    </>
                                )}
                                {activeTab === 'deals' && (
                                    <WhatGotCheaper data={briefData.whatGotCheaper} />
                                )}
                            </div>
                        </>
                    );
                }
                return null;
            default:
                return <SectorGrid onSelect={handleSelectSector} />;
        }
    };

    return (
        <div className="animate-fade-in">
            <Hero />
            <div className="mt-8">
                <div className="mb-4 h-10 flex items-center">
                    {step !== 'sector' && (
                       <button
                            onClick={step === 'results' ? handleReset : handleBack}
                            className="text-gray-500 hover:text-indigo-600 transition-colors font-semibold"
                       >
                           &larr; {step === 'results' ? 'Start Over' : 'Back'}
                       </button>
                    )}
                    {step !== 'sector' && step !== 'results' && (
                        <div className="ml-auto flex items-center space-x-2 text-sm text-gray-500">
                            {selectedSector && <span>{selectedSector.name}</span>}
                            {selectedRole && <span>&rarr; {selectedRole.name}</span>}
                        </div>
                    )}
                </div>
                 <div>
                    {renderStep()}
                 </div>
            </div>
        </div>
    );
};