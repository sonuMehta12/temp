import React, { useState } from 'react';
// FIX: Import IconProps type from ../types as it's not exported from ./icons.
import type { CheaperCategory, CheaperItem, IconProps } from '../types';
import * as Icons from './icons';

const iconMap: { [key: string]: React.FC<IconProps> } = {
    Smartphone: Icons.Smartphone,
    Car: Icons.Car,
    Tv: Icons.Tv,
    PiggyBank: Icons.PiggyBank,
    Coins: Icons.Coins,
    Default: Icons.DollarSign
};

interface Product {
    name: string;
    oldPrice: string;
    newPrice: string;
    image: string;
}

const mockDeals: { [key: string]: Product[] } = {
    "Smartphones & Laptops": [
        { name: "Galaxy S27 Ultra", oldPrice: "₹1,24,999", newPrice: "₹1,14,999", image: "https://i.imgur.com/348N42Z.png" },
        { name: "ZenBook Pro Duo", oldPrice: "₹2,09,990", newPrice: "₹1,95,990", image: "https://i.imgur.com/sTj4ZrX.png" },
        { name: "Pixel 10 Pro", oldPrice: "₹99,999", newPrice: "₹89,999", image: "https://i.imgur.com/1V2kS3d.png" },
    ],
    "Smart TVs": [
        { name: "Frame TV 55-inch", oldPrice: "₹85,990", newPrice: "₹79,990", image: "https://i.imgur.com/9i6y1aY.png" },
        { name: "OLED Evo 65-inch", oldPrice: "₹2,49,990", newPrice: "₹2,29,990", image: "https://i.imgur.com/5JmKeh9.png" },
        { name: "4K QLED TV", oldPrice: "₹55,990", newPrice: "₹48,990", image: "https://i.imgur.com/y8v7z2n.png" },
    ],
    "Fixed Deposits": [],
    "Gold Investment": []
};


const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden text-center">
        <div className="bg-gray-100 p-4 flex justify-center items-center h-40">
            <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
        </div>
        <div className="p-4">
            <h4 className="font-bold text-gray-800 text-sm truncate">{product.name}</h4>
            <div className="mt-2 flex items-baseline justify-center space-x-2">
                <p className="text-gray-400 line-through text-xs">{product.oldPrice}</p>
                <p className="font-semibold text-indigo-600 text-base">{product.newPrice}</p>
            </div>
            <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-3 rounded-md transition-colors text-sm">
                View Offer
            </button>
        </div>
    </div>
);

const DealItem: React.FC<{ item: CheaperItem }> = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const deals = mockDeals[item.name] || [];
    const Icon = iconMap[item.icon] || iconMap.Default;

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-start">
            <div className="flex items-center w-full">
                <div className="flex-shrink-0 bg-gray-100 p-3 rounded-lg text-indigo-600">
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="ml-4 text-lg font-bold text-gray-900">{item.name}</h3>
            </div>
            <p className="mt-3 text-gray-600 text-sm flex-grow">{item.reason}</p>
            {deals.length > 0 && (
                <>
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-4 w-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        {isExpanded ? 'Hide Deals' : 'See Deals'}
                    </button>
                    <div className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] mt-4' : 'max-h-0'}`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {deals.map((product, idx) => (
                                <ProductCard key={idx} product={product} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};


export const WhatGotCheaper: React.FC<{ data: CheaperCategory[] }> = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="p-8 text-center bg-white rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">No Specific Deals Found</h3>
                <p className="text-gray-600 mt-2">Based on your profile, we couldn't identify specific budget items that would make common purchases cheaper for you.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {data.map((category, index) => (
                <div key={index}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.categoryName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.items.map((item, itemIndex) => (
                            <DealItem key={itemIndex} item={item} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
};