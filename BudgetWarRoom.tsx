import React, { useReducer, useEffect } from 'react';
import { WelcomeScreen } from './components/game/WelcomeScreen';
import { BriefingScreen } from './components/game/BriefingScreen';
import { GameRound } from './components/game/GameRound';
import { ScorecardScreen } from './components/game/ScorecardScreen';
// FIX: Import missing constants and types.
import { INITIAL_GAME_STATE, CRISIS_EVENTS, ROUND_1_OPTIONS } from './constants';
import type { GameState, DecisionId, CrisisResponseId } from './types';

type Action =
    | { type: 'START_GAME' }
    | { type: 'MOVE_TO_ROUND_1' }
    | { type: 'SELECT_ROUND_1_OPTION'; payload: DecisionId }
    | { type: 'RESPOND_TO_CRISIS'; payload: CrisisResponseId }
    | { type: 'ALLOCATE_BUDGET'; payload: { [key: string]: number } }
    | { type: 'RESTART_GAME' };

const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'START_GAME':
            return {
                ...state,
                screen: 'briefing',
                round: 0,
            };
        case 'MOVE_TO_ROUND_1':
            return {
                ...state,
                screen: 'round1',
                round: 1,
            };
        case 'SELECT_ROUND_1_OPTION':
            const decision = ROUND_1_OPTIONS.find(opt => opt.id === action.payload);
            if (!decision) return state;
            
            const newMetrics = {
                economicStability: Math.max(0, Math.min(100, state.metrics.economicStability + decision.impacts.economicStability)),
                publicApproval: Math.max(0, Math.min(100, state.metrics.publicApproval + decision.impacts.publicApproval)),
                fiscalHealth: Math.max(0, Math.min(100, state.metrics.fiscalHealth + decision.impacts.fiscalHealth)),
            };

            return {
                ...state,
                screen: 'round2',
                round: 2,
                metrics: newMetrics,
                decisions: { ...state.decisions, round1: action.payload },
                triggeredEvent: CRISIS_EVENTS[action.payload],
            };
        case 'RESPOND_TO_CRISIS':
             // Dummy impact for now
            const crisisImpact = {
                economicStability: Math.random() > 0.5 ? 5 : -5,
                publicApproval: Math.random() > 0.5 ? 5 : -5,
                fiscalHealth: Math.random() > 0.5 ? 5 : -5,
            };
             const metricsAfterCrisis = {
                economicStability: Math.max(0, Math.min(100, state.metrics.economicStability + crisisImpact.economicStability)),
                publicApproval: Math.max(0, Math.min(100, state.metrics.publicApproval + crisisImpact.publicApproval)),
                fiscalHealth: Math.max(0, Math.min(100, state.metrics.fiscalHealth + crisisImpact.fiscalHealth)),
            };
            return {
                ...state,
                screen: 'round3',
                round: 3,
                metrics: metricsAfterCrisis,
                decisions: { ...state.decisions, round2: action.payload },
            };
        case 'ALLOCATE_BUDGET':
             // Dummy final scoring logic
             const avgScore = (state.metrics.economicStability + state.metrics.publicApproval + state.metrics.fiscalHealth) / 3;
             let grade = "C";
             if (avgScore > 80) grade = "A+";
             else if (avgScore > 70) grade = "A";
             else if (avgScore > 60) grade = "B+";
             else if (avgScore > 50) grade = "B";

            return {
                ...state,
                screen: 'scorecard',
                round: 4,
                decisions: { ...state.decisions, round3: action.payload },
                finalScores: {
                    economic: state.metrics.economicStability,
                    social: state.metrics.publicApproval,
                    political: state.metrics.fiscalHealth,
                    overall: grade,
                    philosophy: 'Pragmatic Reformer',
                    whatWentWell: ['Balanced growth with welfare', 'Avoided major fiscal crisis'],
                    criticalMistakes: ['Could have invested more in capex', 'Rural distress partially unaddressed'],
                }
            };
        case 'RESTART_GAME':
            return INITIAL_GAME_STATE;
        default:
            return state;
    }
};


export const BudgetWarRoom: React.FC = () => {
    const [gameState, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);

    // This useEffect handles the automatic transition from briefing to round 1
    useEffect(() => {
        if (gameState.screen === 'briefing') {
            const timer = setTimeout(() => {
                dispatch({ type: 'MOVE_TO_ROUND_1' });
            }, 4000); // Wait 4 seconds on the briefing screen

            // Cleanup timer if the component unmounts or the screen changes before the timer fires
            return () => clearTimeout(timer);
        }
    }, [gameState.screen]);


    const renderScreen = () => {
        switch (gameState.screen) {
            case 'welcome':
                return <WelcomeScreen onStart={() => dispatch({ type: 'START_GAME' })} />;
            case 'briefing':
                return <BriefingScreen />;
             case 'round1':
             case 'round2':
             case 'round3':
                return <GameRound gameState={gameState} dispatch={dispatch} />;
            case 'scorecard':
                return <ScorecardScreen scores={gameState.finalScores!} onRestart={() => dispatch({ type: 'RESTART_GAME' })} />;
            default:
                return <WelcomeScreen onStart={() => dispatch({ type: 'START_GAME' })} />;
        }
    }

    return (
        <div className="animate-fade-in">
            {renderScreen()}
        </div>
    );
};