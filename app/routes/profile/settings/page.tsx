"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Globe,
  Bell,
  ShieldAlert,
  Mail,
  Volume2,
  Save,
  Check,
  Palette
} from "lucide-react";

const themes = [
  { id: "dark", name: "Koyu", color: "bg-gray-950", border: "border-gray-800" },
  { id: "navy", name: "Lacivert", color: "bg-slate-900", border: "border-blue-900" },
  { id: "purple", name: "Mor Gece", color: "bg-purple-900", border: "border-purple-500" },
  { id: "blue", name: "Açık Mavi", color: "bg-blue-300", border: "border-blue-500" },
  { id: "gray", name: "Modern Gri", color: "bg-gray-400", border: "border-gray-500" },
];

const SettingsPage = () => {
  const [newsletter, setNewsletter] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [activeTheme, setActiveTheme] = useState("dark");
  const [language, setLanguage] = useState("tr");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("nex-theme") || "dark";
    setActiveTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeId: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    if (themeId === "blue" || themeId === "gray") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem("nex-theme", activeTheme);
    setTimeout(() => {
      setIsSaving(false);
      alert("Görünüm tercihleri tüm platforma uygulandı!");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full transition-all duration-500 px-4 md:px-10 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex items-center gap-6 mt-10">
          <div className="p-4 rounded-3xl bg-brand-primary shadow-2xl shadow-brand-primary/20">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-brand-primary uppercase">Ayarlar</h1>
            <p className="text-sm font-medium opacity-60">NexTrade arayüz stilini ve tercihlerini yönet</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8">
              <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] mb-8 opacity-80">
                <Palette size={18} className="text-brand-primary" /> Görünüm
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => applyTheme(t.id)}
                    className={`relative p-5 rounded-3xl border-2 transition-all duration-300 group ${
                      activeTheme === t.id 
                      ? "border-brand-primary bg-brand-primary/5 scale-[1.02]" 
                      : "border-transparent bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full ${t.color} mb-3 shadow-lg flex items-center justify-center border border-white/10`}>
                      {activeTheme === t.id && <Check size={16} className="text-white" />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">{t.name}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8">
              <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] mb-8 opacity-80">
                <Globe size={18} className="text-brand-primary" /> Bölgesel Ayarlar
              </h2>
              <div className="space-y-2 max-w-xs">
                <label className="text-[10px] font-bold opacity-50 ml-1 uppercase tracking-widest">Dil Seçimi</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none font-bold text-sm"
                >
                  <option value="tr" className="bg-slate-900">Türkçe 🇹🇷</option>
                  <option value="en" className="bg-slate-900">English 🇺🇸</option>
                </select>
              </div>
            </section>

            <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8">
              <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] mb-8 opacity-80">
                <Bell size={18} className="text-brand-primary" /> Bildirim Yönetimi
              </h2>
              <div className="space-y-4">
                <ToggleRow
                  icon={<Mail size={20} />}
                  title="E-posta Duyuruları"
                  desc="Kampanya ve özel indirimlerden haberdar ol"
                  active={newsletter}
                  onClick={() => setNewsletter(!newsletter)}
                />
                <ToggleRow
                  icon={<Volume2 size={20} />}
                  title="SMS Bilgilendirme"
                  desc="Sipariş ve teslimat güncellemelerini al"
                  active={smsAlerts}
                  onClick={() => setSmsAlerts(!smsAlerts)}
                />
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="relative bg-red-500/5 border border-red-500/20 rounded-[2.5rem] p-8 overflow-hidden group">
              <ShieldAlert className="absolute -right-4 -top-4 opacity-5 w-32 h-32 rotate-12" />
              <h2 className="text-red-500 font-black text-xs uppercase tracking-[0.2em] mb-4">Hesap Güvenliği</h2>
              <p className="text-xs opacity-50 leading-relaxed mb-8">
                Hesabınızı silmek tüm verilerinizi kalıcı olarak temizler.
              </p>
              <button className="w-full border border-red-500/30 text-red-500 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                Hesabı Sil
              </button>
            </section>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-3 bg-brand-primary hover:opacity-90 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-brand-primary/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Save size={18} /> Kaydet ve Uygula</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToggleRow = ({ icon, title, desc, active, onClick }: any) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between p-5 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer transition-all"
  >
    <div className="flex items-center gap-5">
      <div className={`p-3 rounded-2xl transition-colors ${active ? "bg-brand-primary/10 text-brand-primary" : "bg-white/5 text-white/30"}`}>
        {icon}
      </div>
      <div>
        <p className="font-bold text-sm tracking-tight leading-none mb-1">{title}</p>
        <p className="text-[10px] opacity-40 font-bold uppercase tracking-wider">{desc}</p>
      </div>
    </div>
    <div className={`w-12 h-6 rounded-full relative transition-all duration-500 ${active ? "bg-brand-primary" : "bg-white/10"}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-300 ${active ? "left-7" : "left-1"}`} />
    </div>
  </div>
);

export default SettingsPage;