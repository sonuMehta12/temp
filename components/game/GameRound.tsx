
import React from 'react';
// FIX: Import missing types.
import type { GameState, DecisionId, CrisisResponseId } from '../../types';
import { MetricsDisplay } from './MetricsDisplay';
import { DecisionCard } from './DecisionCard';
import { CrisisModal } from './CrisisModal';
import { AllocationSliders } from './AllocationSliders';
// FIX: Import missing constant.
import { ROUND_1_OPTIONS } from '../../constants';

interface GameRoundProps {
    gameState: GameState;
    dispatch: React.Dispatch<any>;
}

export const GameRound: React.FC<GameRoundProps> = ({ gameState, dispatch }) => {

    const handleSelectRound1 = (decisionId: DecisionId) => {
        dispatch({ type: 'SELECT_ROUND_1_OPTION', payload: decisionId });
    };

    const handleRespondToCrisis = (responseId: CrisisResponseId) => {
        dispatch({ type: 'RESPOND_TO_CRISIS', payload: responseId });
    }

    const handleAllocateBudget = (allocations: { [key: string]: number }) => {
        dispatch({ type: 'ALLOCATE_BUDGET', payload: allocations });
    }

    const renderRoundContent = () => {
        switch(gameState.screen) {
            case 'round1':
                return (
                     <div>
                        <h2 className="text-2xl font-bold text-center mb-6 text-slate-100">Round 1: The Primary Allocation</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {ROUND_1_OPTIONS.map(option => (
                                <DecisionCard key={option.id} option={option} onSelect={handleSelectRound1} />
                            ))}
                        </div>
                    </div>
                );
            case 'round2':
                return (
                    <CrisisModal 
                        event={gameState.triggeredEvent!}
                        onRespond={handleRespondToCrisis}
                    />
                );
            case 'round3':
                return <AllocationSliders onSubmit={handleAllocateBudget} />;
            default:
                return null;
        }
    }

    return (
        <div className="space-y-8">
            <MetricsDisplay metrics={gameState.metrics} />
            <div className="pt-4">
                {renderRoundContent()}
            </div>
        </div>
    );
};
