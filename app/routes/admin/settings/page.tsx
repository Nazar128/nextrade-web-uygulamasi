"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { SettingInput } from "@/components/SettingInput";
import { SettingToggle } from "@/components/SettingToggle";
import { SettingSection } from "@/components/SettingSection";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    shippingLimit: "",
    commissionRate: "",
    maintenanceMode: false,
    storeRegistration: true,
    supportEmail: "",
    apiKey: ""
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const docRef = doc(db, "system", "settings");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as any);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "system", "settings"), settings);
      alert("Ayarlar güncellendi.");
    } catch (error) {
      alert("Hata oluştu.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-700" size={32} />
    </div>
  );

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
            <SettingInput 
              label="Kargo Alt Limiti" 
              placeholder="500 ₺" 
              value={settings.shippingLimit}
              onChange={(val: string) => setSettings({...settings, shippingLimit: val})}
            />
            <SettingInput 
              label="Komisyon Oranı" 
              placeholder="%15" 
              value={settings.commissionRate}
              onChange={(val: string) => setSettings({...settings, commissionRate: val})}
            />
          </SettingSection>

          <SettingSection title="Erişim">
            <SettingToggle 
              label="Bakım Modu" 
              isActive={settings.maintenanceMode} 
              onToggle={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})} 
            />
            <SettingToggle 
              label="Mağaza Kaydı" 
              isActive={settings.storeRegistration} 
              onToggle={() => setSettings({...settings, storeRegistration: !settings.storeRegistration})} 
            />
          </SettingSection>

          <SettingSection title="İletişim">
            <SettingInput 
              label="Destek E-Posta" 
              placeholder="nextrade.support@gmail.com" 
              value={settings.supportEmail}
              onChange={(val: string) => setSettings({...settings, supportEmail: val})}
            />
            <SettingInput 
              label="API Servis Anahtarı" 
              placeholder="••••••••" 
              type="password" 
              value={settings.apiKey}
              onChange={(val: string) => setSettings({...settings, apiKey: val})}
            />
          </SettingSection>
        </div>

        <div className="flex flex-col items-center gap-8 pt-4">
          <button 
            onClick={handleUpdate}
            disabled={isSaving}
            className="px-16 py-4 bg-blue-800 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-blue-600 transition-all shadow-xl shadow-blue-200 active:scale-95 disabled:opacity-50"
          >
            {isSaving ? "GÜNCELLENİYOR..." : "AYARLARI GÜNCELLE"}
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