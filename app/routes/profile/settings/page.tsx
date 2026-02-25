"use client"
import React, { useState } from "react";
import {
  Settings,
  Globe,
  Bell,
  ShieldAlert,
  Mail,
  Volume2,
  Save,
} from "lucide-react";

const SettingsPage = () => {
  const [newsletter, setNewsletter] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("tr");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Ayarlar başarıyla kaydedildi!");
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full  text-slate-100 px-4 md:px-10 py-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-500 to-blue-700 shadow-lg">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-5xl text-blue-600 font-extrabold mb-2 tracking-tight">Ayarlar</h1>
            <p className="text-sm text-slate-400">
              Hesap ve uygulama tercihlerini buradan yönet
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h2 className="flex items-center gap-3 text-lg font-bold mb-6">
                <Globe className="text-indigo-400" /> Genel Tercihler
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 tracking-wider">
                    GÖRÜNÜM
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="mt-2 w-full bg-black/40 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="dark">Koyu</option>
                    <option value="light">Açık</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 tracking-wider">
                    DİL
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-2 w-full bg-black/40 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="tr">Türkçe 🇹🇷</option>
                    <option value="en">English 🇺🇸</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h2 className="flex items-center gap-3 text-lg font-bold mb-6">
                <Bell className="text-blue-400" /> Bildirimler
              </h2>

              <div className="space-y-4">
                <ToggleRow
                  icon={<Mail />}
                  title="E-posta Bülteni"
                  desc="Kampanya ve fırsatlardan haberdar ol."
                  active={newsletter}
                  onClick={() => setNewsletter(!newsletter)}
                />

                <ToggleRow
                  icon={<Volume2 />}
                  title="SMS Bildirimleri"
                  desc="Sipariş durumunu anlık takip et."
                  active={smsAlerts}
                  onClick={() => setSmsAlerts(!smsAlerts)}
                />
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="relative bg-gradient-to-br from-red-500/20 to-black border border-red-500/20 rounded-3xl p-6 overflow-hidden">
              <ShieldAlert className="absolute right-4 top-4 opacity-10 w-24 h-24" />
              <h2 className="text-red-400 font-bold mb-3">Hesap Ayarları</h2>
              <p className="text-sm text-slate-400 mb-6">
                Hesabı silmek tüm siparişleri ve adresleri kalıcı olarak kaldırır.
              </p>
              <button className="w-full border border-red-500/30 text-red-400 py-3 rounded-xl font-bold hover:bg-red-600 hover:text-white transition">
                Hesabı Sil
              </button>
            </section>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-slate-800 via-blue-400 to-blue-700 hover:from-blue-700 hover:to-slate-800 py-4 rounded-2xl font-bold shadow-lg transition disabled:opacity-50"
            >
              {isSaving ? "Kaydediliyor..." : <><Save size={20} /> Kaydet</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

const ToggleRow = ({ icon, title, desc, active, onClick }: any) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between p-4 rounded-2xl border border-white/10 hover:bg-white/5 cursor-pointer transition"
  >
    <div className="flex items-center gap-4">
      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </div>

    <div className={`w-12 h-6 rounded-full relative ${active ? "bg-indigo-600" : "bg-slate-700"}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${active ? "left-7" : "left-1"}`} />
    </div>
  </div>
);