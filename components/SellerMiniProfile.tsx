"use client";
import React from "react";
import Link from "next/link";
import { Store, ArrowUpRight, ShieldCheck, Star } from "lucide-react";

interface SellerMiniProfileProps {
  sellerId: string;
  sellerName: string;
}

export const SellerMiniProfile = ({ sellerId, sellerName }: SellerMiniProfileProps) => {
  return (
    <div className="relative overflow-hidden group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-0 group-hover:opacity-10 transition duration-500" />
      
      <div className="relative bg-[#0F1115] border border-white/5 rounded-[2rem] p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border border-white/5">
                <Store size={20} className="text-blue-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#0F1115] rounded-full" />
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <h4 className="text-[13px] font-bold text-white tracking-wide">
                  {sellerName || "NexTrade Global"}
                </h4>
                <ShieldCheck size={14} className="text-blue-500" />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star size={10} className="text-amber-400 fill-amber-400" />
                  <span className="text-[11px] font-medium text-slate-400">4.9</span>
                </div>
                <div className="h-1 w-1 bg-slate-700 rounded-full" />
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Güvenilir Satıcı
                </span>
              </div>
            </div>
          </div>

          <Link 
            href={`/routes/store/${sellerId}`}
            className="group/btn flex items-center gap-2 bg-white/[0.03] hover:bg-white text-slate-300 hover:text-black px-5 py-3 rounded-2xl text-[10px] font-bold tracking-tighter transition-all duration-300 border border-white/5 hover:border-white"
          >
            MAĞAZA <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>

        </div>
      </div>
    </div>
  );
};