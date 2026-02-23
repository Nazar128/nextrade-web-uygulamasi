"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, Mail, Phone, Lock, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4 mx-auto relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%]  rounded-full blur-[120px]" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%]  rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:w-[500px] bg-white/5  shadow-2xl shadow-gray-500 rounded-[32px] p-6 md:p-4 "
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight text-center md:text-left">Hesap Oluştur </h1>
          <p className="text-gray-500 text-sm mt-2 text-center md:text-left">Premium alışveriş deneyimine katılın.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-200 ml-1">Ad Soyad</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input className="w-full bg-gray-500 border border-white/10 rounded-2xl py-3.5 pl-11 text-white text-sm outline-none focus:border-purple-500/50 transition-all" placeholder="John Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-200 ml-1">Telefon</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input className="w-full bg-gray-500 border border-white/10 rounded-2xl py-3.5 pl-11 text-white text-sm outline-none focus:border-purple-500/50 transition-all" placeholder="05XX XXX XX XX" />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold text-gray-200 ml-1">E-Posta</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input className="w-full bg-gray-500 border border-white/10 rounded-2xl py-3.5 pl-11 text-white text-sm outline-none focus:border-purple-500/50 transition-all" placeholder="mail@example.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-200 ml-1">Şifre</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input type="password" className="w-full bg-gray-500 border border-white/10 rounded-2xl py-3.5 pl-11 text-white text-sm outline-none focus:border-purple-500/50 transition-all" placeholder="••••••••" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-200 ml-1">Şifre Tekrar</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input type="password" className="w-full bg-gray-500 border border-white/10 rounded-2xl py-3.5 pl-11 text-white text-sm outline-none focus:border-purple-500/50 transition-all" placeholder="••••••••" />
            </div>
          </div>

          <div className="md:col-span-2 mt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-white/5 accent-gray-800" />
              <span className="text-xs text-gray-300 group-hover:text-gray-400 transition-colors">Kullanım Şartlarını ve Gizlilik Politikasını kabul ediyorum.</span>
            </label>
          </div>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="md:col-span-2 py-4 bg-gray-700 hover:bg-red-800 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 mt-4 flex items-center justify-center gap-2"
          >
            <UserPlus size={20} /> Kayıt Ol
          </motion.button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-300">
          Zaten üye misiniz? {' '}
          <Link href="/routes/login" className="text-gray-100 font-bold hover:underline">Giriş Yap</Link>
        </p>
      </motion.div>
    </div>
  );
}