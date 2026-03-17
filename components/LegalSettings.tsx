"use client";
import React, { useState, useEffect } from 'react';
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Loader2, Save, ShieldCheck, FileText } from 'lucide-react';

export default function LegalSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'privacy' | 'terms'>('privacy');
  
  const [legalData, setLegalData] = useState({
    privacy: { title: '', content: '' },
    terms: { title: '', content: '' }
  });

  useEffect(() => {
    const fetchLegal = async () => {
      try {
        const privacySnap = await getDoc(doc(db, "legalContent", "privacy-policy"));
        const termsSnap = await getDoc(doc(db, "legalContent", "terms-of-use"));
        
        setLegalData({
          privacy: privacySnap.exists() ? privacySnap.data() as any : { title: 'Gizlilik Politikası', content: '' },
          terms: termsSnap.exists() ? termsSnap.data() as any : { title: 'Kullanım Koşulları', content: '' }
        });
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLegal();
  }, []);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const docId = activeSubTab === 'privacy' ? "privacy-policy" : "terms-of-use";
      await updateDoc(doc(db, "legalContent", docId), {
        ...legalData[activeSubTab],
        lastUpdated: new Date()
      });
      alert("Başarıyla güncellendi!");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex gap-6 border-b border-white/5 pb-4">
        <button 
          onClick={() => setActiveSubTab('privacy')}
          className={`text-[11px] font-bold tracking-widest flex items-center gap-2 transition-colors ${activeSubTab === 'privacy' ? 'text-blue-500' : 'text-slate-500'}`}
        >
          <ShieldCheck size={14} /> GİZLİLİK POLİTİKASI
        </button>
        <button 
          onClick={() => setActiveSubTab('terms')}
          className={`text-[11px] font-bold tracking-widest flex items-center gap-2 transition-colors ${activeSubTab === 'terms' ? 'text-blue-500' : 'text-slate-500'}`}
        >
          <FileText size={14} /> KULLANIM KOŞULLARI
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-600 uppercase ml-1">Sayfa Başlığı</label>
          <input 
            type="text" 
            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:border-blue-500 outline-none"
            value={legalData[activeSubTab].title}
            onChange={(e) => setLegalData({
              ...legalData, 
              [activeSubTab]: { ...legalData[activeSubTab], title: e.target.value }
            })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-600 uppercase ml-1">İçerik (Markdown veya HTML destekli)</label>
          <textarea 
            className="w-full bg-slate-950/50 border border-white/5 rounded-[2rem] px-5 py-5 text-sm text-slate-300 focus:border-blue-500 outline-none h-[400px] leading-relaxed font-mono"
            value={legalData[activeSubTab].content}
            onChange={(e) => setLegalData({
              ...legalData, 
              [activeSubTab]: { ...legalData[activeSubTab], content: e.target.value }
            })}
          />
        </div>

        <button 
          onClick={handleUpdate}
          disabled={saving}
          className="flex items-center gap-2 bg-white text-black text-[11px] font-bold px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} 
          DEĞİŞİKLİKLERİ YAYINLA
        </button>
      </div>
    </div>
  );
}