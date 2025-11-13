import type React from 'react';
import { Card } from './Card';
import { ROLES } from '../constants';
import type { Role } from '../types';

interface RoleGridProps {
    onSelect: (role: Role) => void;
}

export const RoleGrid: React.FC<RoleGridProps> = ({ onSelect }) => {
    return (
        <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">2. Select Your Role</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {ROLES.map((role) => (
                    <Card
                        key={role.id}
                        title={role.name}
                        icon={<role.icon className="w-8 h-8" />}
                        onClick={() => onSelect(role)}
                    />
                ))}
            </div>
        </div>
    );
};