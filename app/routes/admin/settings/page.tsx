"use client";
import React, { useState } from "react";
import { SettingInput } from "@/components/SettingInput";
import { SettingToggle } from "@/components/SettingToggle";
import { SettingSection } from "@/components/SettingSection";

export default function SettingsPage() {
  const [maintenance, setMaintenance] = useState(false);
  const [registrations, setRegistrations] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center mx-auto p-4 md:p-8 antialiased">
      <div className="w-full max-w-6xl space-y-12">
        
        <header className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-slate-300 tracking-[0.2em] ">
            SİSTEM <span className="text-blue-700 text-4xl">AYARLARI</span>
          </h1>
          <div className="h-1 w-12 bg-blue-700 mx-auto rounded-full" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          <SettingSection title="Finans">
            <SettingInput label="Kargo Alt Limiti" placeholder="500 ₺" />
            <SettingInput label="Komisyon Oranı" placeholder="%15" />
          </SettingSection>

          <SettingSection title="Erişim">
            <SettingToggle 
              label="Bakım Modu" 
              isActive={maintenance} 
              onToggle={() => setMaintenance(!maintenance)} 
            />
            <SettingToggle 
              label="Mağaza Kaydı" 
              isActive={registrations} 
              onToggle={() => setRegistrations(!registrations)} 
            />
          </SettingSection>

          <SettingSection title="İletişim">
            <SettingInput label="Destek E-Posta" placeholder="destek@nextrade.com" />
            <SettingInput label="API Servis Anahtarı" placeholder="••••••••" type="password" />
          </SettingSection>

        </div>


        <div className="flex flex-col items-center gap-8 pt-4">
          <button className="px-16 py-4 bg-blue-800 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-blue-600 transition-all shadow-xl shadow-blue-200 active:scale-95">
            Ayarları Güncelle
          </button>
          
          <footer className="text-center">
            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.5em]">
              Control Panel v2.4.0
            </span>
          </footer>
        </div>

      </div>
    </div>
  );
}