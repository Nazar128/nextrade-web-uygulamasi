"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, Package, Calendar, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
 
  return (
    <div className="min-h-screen mx-auto mt-6 flex items-start justify-center p-1 overflow-hidden relative">
      <div className="absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-2xl rounded-[40px] p-4 md:p-12 border border-white/20 shadow-2xl text-center relative"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.2 }}
          className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)] mb-8"
        >
          <CheckCircle2 size={48} className="text-white" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-black text-white  tracking-tight"
        >
          Siparişiniz Alındı!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 mt-3"
        >
          Harika bir seçim yaptınız.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-10 space-y-4"
        >
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Package size={16} />
              <span>Sipariş No:</span>
            </div>
            <span className="text-white font-mono font-bold">#XC-99283</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={16} />
              <span>Tahmini Teslimat:</span>
            </div>
            <span className="text-green-400 font-bold">26 Şubat - 28 Şubat</span>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 mt-10">
          <Link href="/">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-white text-black rounded-2xl font-black tracking-wide transition-all shadow-xl hover:bg-gray-100 flex items-center justify-center gap-2"
            >
              ALIŞVERİŞE DEVAM ET <ArrowRight size={18} />
            </motion.button>
          </Link>
          
          <Link href="/routes/orders">
            <button className="w-full py-2 bg-transparent text-gray-400 hover:text-white rounded-2xl font-bold transition-all">
              Siparişimi Takip Et
            </button>
          </Link>
        </div>

     
      </motion.div>
    </div>
  );
}