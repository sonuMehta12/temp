import type React from 'react';
import { Download } from './icons';

export const ResourceLinks: React.FC = () => {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="p-6 bg-white rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Resources & Next Steps</h3>
                <ul className="space-y-3">
                    <li><a href="#" className="text-indigo-600 hover:underline">Full Budget Analysis: Top 10 Takeaways</a></li>
                    <li><a href="#" className="text-indigo-600 hover:underline">Sector Deep Dive: The Future of Tech/AI in India</a></li>
                    <li><a href="#" className="text-indigo-600 hover:underline">Expert Opinion: What the Budget Means for Startups</a></li>
                </ul>
                <button className="w-full mt-6 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-800 border border-gray-300 font-semibold">
                    <Download className="w-5 h-5"/>
                    <span>Download Sector PDF</span>
                </button>
            </div>
            <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200">
                <h3 className="text-xl font-bold text-indigo-900 mb-2">Stay Ahead of the Curve</h3>
                <p className="text-indigo-700 mb-4">Sign up for our newsletter for weekly insights.</p>
                <form className="flex space-x-2">
                    <input type="email" placeholder="your.email@company.com" className="flex-grow bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Sign Up</button>
                </form>
            </div>
        </div>
    );
};