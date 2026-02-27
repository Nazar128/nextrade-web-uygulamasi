"use client";
import React from 'react';
import { MessageSquare, Star } from 'lucide-react';

export const ActivityFeed = () => (
    <div className="bg-slate-900/20 border border-slate-800/40 p-5 rounded-2xl h-full">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase mb-5 flex items-center gap-2 tracking-widest">
            <MessageSquare size={14} className="text-blue-500" /> Son Aktiviteler
        </h3>
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="group flex items-start gap-3 border-b border-slate-800/40 pb-3 last:border-0 cursor-default">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-slate-300">Kullanıcı #120{i}</span>
                            <span className="text-[9px] text-slate-600 font-mono">2s önce</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 italic">"Ürün elime ulaştı, çok memnun kaldım..."</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);