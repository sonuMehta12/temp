import type React from 'react';

export const Hero: React.FC = () => {
    return (
        <header className="text-center h-1/2">
            <h1 className="text-4xl px-4 sm:px-6 sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent leading-tight py-2">
               How the budget impacts YOU!
            </h1>
            <p className="mt-3 sm:mt-6 max-w-2xl mx-auto text-lg text-gray-600">
                Get a personalized 5-point brief on how the latest budget impacts you. Select your sector and role to begin.
            </p>
        </header>
    );
};