"use client";
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    subtitle?: string; 
    trend?: { value: string; isPositive: boolean };
    colorClass: string;
}

export const StatCard = ({ label, value, icon: Icon, subtitle, trend, colorClass }: StatCardProps) => (
    <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex flex-col gap-3 group hover:border-slate-700/80 transition-all">
        <div className="flex items-center justify-between">
            <div className={`p-2 rounded-xl bg-slate-950 ${colorClass} group-hover:scale-110 transition-transform`}>
                <Icon size={18} />
            </div>
            {trend && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    trend.isPositive ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-400 bg-red-400/10'
                }`}>
                    {trend.value}
                </span>
            )}
        </div>
        <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</p>
            <div className="flex items-baseline gap-2">
                <p className="text-xl font-bold text-white mt-0.5">{value}</p>
                {subtitle && <span className="text-[9px] text-slate-600 font-medium italic">{subtitle}</span>}
            </div>
        </div>
    </div>
);