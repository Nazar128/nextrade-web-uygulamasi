"use client";
import React, { useState } from 'react';
import { db, auth } from '@/lib/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth'; 
import { X, UserPlus, Mail, ShieldCheck, Save, Send, Loader2 } from 'lucide-react';

export const AddUserForm = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ displayName: '', email: '', role: 'Müşteri' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "users"), {
        ...user,
        status: "Aktif",
        createdAt: serverTimestamp(),
      });

      
      await sendPasswordResetEmail(auth, user.email);
      
      alert(`${user.email} adresine şifre belirleme bağlantısı gönderildi!`);
      onClose();
    } catch (error: any) {
      console.error("Hata:", error);
      alert("Bir hata oluştu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 text-slate-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <UserPlus size={20} className="text-indigo-500" /> KULLANICI DAVET ET
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={20} /></button>
        </div>

        <p className="text-[11px] text-slate-400 mb-6 bg-indigo-500/5 p-3 rounded-lg border border-indigo-500/10">
          Kullanıcıyı eklediğinizde, belirttiğiniz e-posta adresine güvenli bir şifre oluşturma bağlantısı gönderilecektir.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Ad Soyad</label>
            <div className="relative">
              <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
              <input 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
                placeholder="Nazar Kalçık"
                onChange={(e) => setUser({...user, displayName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">E-Posta Adresi</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
              <input 
                required
                type="email"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
                placeholder="nazar@nextrade.com"
                onChange={(e) => setUser({...user, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Yetki Rolü</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
              <select 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                onChange={(e) => setUser({...user, role: e.target.value})}
              >
                <option value="Müşteri">Müşteri</option>
                <option value="Satıcı">Satıcı</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl mt-4 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18}/> Davet Gönder</>}
          </button>
        </form>
      </div>
    </div>
  );
};