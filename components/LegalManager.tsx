"use client";
import React, { useState, useEffect } from 'react';
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Loader2, Save, ShieldCheck, FileText, Clock, AlertCircle } from 'lucide-react';

export default function LegalManager() {
  const [activeSubTab, setActiveSubTab] = useState<'privacy' | 'terms'>('privacy');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({ title: '', content: '', updatedAt: null });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const docId = activeSubTab === 'privacy' ? 'privacy' : 'terms';
      const snap = await getDoc(doc(db, "legal", docId));
      if (snap.exists()) {
        setData(snap.data() as any);
      } else {
        setData({ 
          title: activeSubTab === 'privacy' ? 'Gizlilik Politikası' : 'Kullanım Koşulları', 
          content: '',
          updatedAt: null
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [activeSubTab]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const docId = activeSubTab === 'privacy' ? 'privacy' : 'terms';
      const updatePayload = {
        ...data,
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(db, "legal", docId), updatePayload);
      alert("İçerik başarıyla güncellendi.");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-950/40 p-2 rounded-[2rem] border border-white/5">
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setActiveSubTab('privacy')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-6 py-3 rounded-3xl text-[11px] font-bold tracking-widest transition-all ${
              activeSubTab === 'privacy' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
              : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
            }`}
          >
            <ShieldCheck size={16} /> GİZLİLİK
          </button>
          <button 
            onClick={() => setActiveSubTab('terms')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-6 py-3 rounded-3xl text-[11px] font-bold tracking-widest transition-all ${
              activeSubTab === 'terms' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
              : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
            }`}
          >
            <FileText size={16} /> ŞARTLAR
          </button>
        </div>

        {data.updatedAt && (
          <div className="flex items-center gap-2 px-6 py-2 text-[10px] font-medium text-slate-500 italic">
            <Clock size={12} /> Son güncelleme: {new Date(data.updatedAt).toLocaleDateString('tr-TR')}
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <span className="text-xs font-bold tracking-widest text-slate-600 uppercase">Veriler Çekiliyor</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  {activeSubTab === 'privacy' ? <ShieldCheck size={20} /> : <FileText size={20} />}
                </div>
                <div>
                  <h2 className="text-white font-bold text-sm uppercase tracking-tight">Doküman Editörü</h2>
                  <p className="text-[10px] text-slate-500 font-medium">Platform kurallarını ve yasal metinleri buradan yönetin.</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="group space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] ml-1 group-focus-within:text-blue-500 transition-colors">
                  Sayfa Başlığı
                </label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-700"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  placeholder="Başlık giriniz..."
                />
              </div>

              <div className="group space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] group-focus-within:text-blue-500 transition-colors">
                    İçerik Metni
                  </label>
                </div>
                <textarea 
                  className="w-full bg-slate-950/80 border border-white/10 rounded-[2rem] px-6 py-6 text-sm text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none h-96 leading-relaxed font-mono resize-none transition-all scrollbar-thin scrollbar-thumb-white/5"
                  value={data.content}
                  onChange={(e) => setData({ ...data, content: e.target.value })}
                  placeholder="Metin içeriğini buraya giriniz..."
                />
              </div>
            </div>

            <div className="px-8 py-6 bg-white/[0.02] border-t border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3 text-slate-500">
                <AlertCircle size={14} className="text-blue-500/50" />
                <span className="text-[10px] font-medium italic">Değişiklikler anında yayındaki sayfaya yansır.</span>
              </div>
              
              <button 
                onClick={handleSave}
                disabled={saving}
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-white text-black hover:bg-blue-600 hover:text-white px-10 py-4 rounded-full text-[11px] font-black tracking-[0.1em] transition-all active:scale-95 disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <>
                    <Save size={16} strokeWidth={2.5} /> DEĞİŞİKLİKLERİ YAYINLA
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}