"use client";

import { Categories } from '@/data/Categories';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const CategoryBar = () => {
    const [activeTab, setActiveTab] = useState<number | null>(null);
    const router = useRouter();

    return (
        <div 
            className="sticky top-[72px] w-full bg-slate-900/40 backdrop-blur-md border-b border-white/5 z-[90]"
            onMouseLeave={() => setActiveTab(null)} 
        >
            <div className="max-w-[1500px] mx-auto px-2">
                <div className="flex items-center justify-start gap-1 py-3 flex-wrap lg:flex-nowrap">
                    
                    {Categories.map((item) => (
                        <div 
                            key={item.id} 
                            className="relative shrink-0" 
                            onMouseEnter={() => setActiveTab(item.id)}
                        >
                            <button className={`
                                flex items-center gap-1 px-3 py-2 rounded-lg text-[12px] font-medium transition-all duration-300
                                ${activeTab === item.id 
                                    ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
                                    : 'text-blue-200 hover:text-slate-100 hover:bg-white/5'}
                            `}>
                                <span className="whitespace-nowrap uppercase tracking-wider">
                                    {item.title}
                                </span>
                                <ChevronDown 
                                    size={12} 
                                    className={`transition-transform duration-300 opacity-50 ${activeTab === item.id ? 'rotate-180 opacity-100' : ''}`} 
                                />
                            </button>

                            {activeTab === item.id && (
                                <div 
                                    className="absolute top-full left-0 mt-2 min-w-[240px] bg-slate-900 border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] rounded-xl p-2 z-[100] animate-in fade-in zoom-in-95 duration-200"
                                >
                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-3 py-2 mb-1 border-b border-white/5">
                                            {item.title}
                                        </p>
                                        
                                        {item.subCategories.map((sub) => (
                                            <Link
                                                href={`/routes/category/${sub.id}`}
                                                key={sub.id} 
                                                //onClick={() => router.push('routes/category/[id]')}
                                    
                                                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-all group/item"
                                            >
                                                <span className="text-sm font-medium">
                                                    {sub.title}
                                                </span>
                                                <div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)] opacity-0 group-hover/item:opacity-100 transition-all" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoryBar;