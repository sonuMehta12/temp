import React from 'react';

interface WelcomeScreenProps {
    onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
    return (
        <div className="text-center flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">
                Budget War Room
            </h1>
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-gray-800">Finance Minister Simulator</h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
                Welcome to the Budget 2026-27 War Room. The nation's economic future is in your hands. Analyze data, heed advice, and make the tough decisions.
            </p>
            <button
                onClick={onStart}
                className="mt-10 px-8 py-4 bg-indigo-600 text-white font-bold text-xl rounded-lg shadow-lg hover:bg-indigo-500 transition-transform transform hover:scale-105"
            >
                Start Simulation
            </button>
        </div>
    );
};