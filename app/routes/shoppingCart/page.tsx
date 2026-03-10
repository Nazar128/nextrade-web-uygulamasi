"use client";
import React from 'react';
import Shopping from '@/components/Shopping';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CartPage = () => {
    return (
        <main className="min-h-screen mx-auto py-16 px-4 md:px-6 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors mb-4 group font-medium">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            Mağazaya Dön
                        </Link>
                        <h1 className="text-5xl md:text-6xl font-black text-white flex items-center gap-4 tracking-tighter">
                            SEPETİM <span className="text-blue-600">.</span>
                        </h1>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-gray-500 font-medium uppercase tracking-[0.2em] text-xs">Modern E-Commerce Experience</p>
                    </div>
                </div>
                <Shopping />
            </div>
        </main>
    );
};

export default CartPage;