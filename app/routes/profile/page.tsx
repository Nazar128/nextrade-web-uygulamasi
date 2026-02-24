"use client"
import React, { useState, useRef } from 'react';
import { Package, Heart, Star, Camera, Save, ShieldCheck, Mail, Phone, Lock, User as UserIcon, Zap, MapPin, X } from 'lucide-react';

export default function DashboardPage() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300");

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full space-y-12 pb-20 px-4 font-sans antialiased">
      
      <div className="relative group p-[1px] rounded-[3rem] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-[0_0_50px_-12px_rgba(168,85,247,0.4)]">
        <div className="bg-[#0f1115] rounded-[2.9rem] p-8 md:p-12 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_20%_30%,#06b6d4_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#d946ef_0%,transparent_50%)]" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group cursor-pointer" onClick={handleImageClick}>
                <div className="w-44 h-44 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 to-fuchsia-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-transform duration-500 hover:scale-105">
                  <div className="w-full h-full rounded-full border-4 border-[#0f1115] overflow-hidden relative">
                    <img src={profileImage} alt="Selin Çınar" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300">
                      <Camera size={24} className="text-white mb-1" />
                      <span className="text-[10px] text-white font-bold uppercase tracking-tighter">Değiştir</span>
                    </div>
                  </div>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {/* Resim yükleme mantığı */}} />
                <div className="absolute bottom-2 right-2 p-2 bg-green-500 border-4 border-[#0f1115] rounded-full text-white">
                  <ShieldCheck size={16} fill="currentColor" />
                </div>
              </div>

              <div className="text-center md:text-left space-y-2">
                <p className="text-gray-500 text-xs font-bold tracking-[0.3em] uppercase ml-1 opacity-70">Müşteri Profili</p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
                    Selin Çınar
                  </h1>
                  <div className="w-10 h-10 rounded-full border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                    <Zap size={20} fill="currentColor" />
                  </div>
                </div>
                <p className="text-gray-400 font-medium text-lg italic opacity-60">Üyelik Tarihi: Şubat 2026</p>
              </div>
            </div>

            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="px-12 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-bold tracking-wider hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all active:scale-95 border border-white/10"
            >
              {isEditing ? "DÜZENLEMEYİ KAPAT" : "PROFİLİ GÜNCELLE"}
            </button>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="p-10 rounded-[2.5rem] bg-[#0f1115] border border-white/5 shadow-2xl space-y-6">
            <h3 className="text-cyan-400 text-sm font-black uppercase tracking-[0.2em] mb-2">Hesap Detayları</h3>
            <InputGroup label="İsim Soyisim" icon={<UserIcon size={18}/>} placeholder="Selin Çınar" />
            <InputGroup label="E-Posta" icon={<Mail size={18}/>} placeholder="selin@tasarim.com" />
            <InputGroup label="Telefon" icon={<Phone size={18}/>} placeholder="+90 5XX XXX XX XX" />
          </div>

          <div className="p-10 rounded-[2.5rem] bg-[#0f1115] border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-purple-400 text-sm font-black uppercase tracking-[0.2em] mb-4">Güvenlik Doğrulaması</h3>
              <div className="space-y-4">
                <InputGroup label="Mevcut Şifre" icon={<Lock size={18}/>} type="password" placeholder="Doğrulama için gereklidir" />
                <div className="h-[1px] bg-white/5 my-2" />
                <InputGroup label="Yeni Şifre" icon={<Lock size={18}/>} type="password" placeholder="En az 8 karakter" />
              </div>
            </div>
            
            <button className="w-full py-5 bg-white text-black rounded-2xl font-black tracking-widest hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              SİSTEMİ GÜNCELLE
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Aktif Sipariş" value="02" icon={<Package />} theme="cyan" />
        <StatCard label="Favorilerim" value="12" icon={<Heart />} theme="pink" />
        <StatCard label="Hesap Puanı" value="850" icon={<Star />} theme="yellow" />
        <StatCard label="Adreslerim" value="04" icon={<MapPin />} theme="purple" />
      </div>
    </div>
  );
}

function InputGroup({ label, icon, placeholder, type = "text" }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-colors">{icon}</div>
        <input 
          type={type}
          placeholder={placeholder} 
          className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white font-medium focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all"
        />
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, theme }: any) {
  const themes: any = {
    cyan: "border-cyan-500/20 text-cyan-400 bg-cyan-500/5",
    pink: "border-pink-500/20 text-pink-400 bg-pink-500/5",
    yellow: "border-yellow-500/20 text-yellow-400 bg-yellow-500/5",
    purple: "border-purple-500/20 text-purple-400 bg-purple-500/5"
  };
  return (
    <div className={`p-8 rounded-[2.5rem] border ${themes[theme]} flex flex-col items-center justify-center space-y-4 hover:bg-white/[0.02] transition-all duration-300 bg-[#0f1115]/50`}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div className="text-center">
        <p className="text-4xl font-extrabold text-white tracking-tighter">{value}</p>
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mt-1">{label}</p>
      </div>
    </div>
  )
}