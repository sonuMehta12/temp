import type React from 'react';

export const Hero: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                ET Sector Simulator
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                Get a personalized 5-point brief on how the latest budget impacts you. Select your sector and role to begin.
            </p>
        </header>
    );
};