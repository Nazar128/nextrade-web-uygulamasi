"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Store, Clock, MapPin, Save, Camera, Mail, Info, ShieldCheck, Loader2 } from 'lucide-react';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "@/lib/firebase"; 

export default function StoreSettings() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [storeData, setStoreData] = useState({
    storeName: "",
    email: "",
    description: "",
    address: "",
    city: "",
    imageUrl: "https://via.placeholder.com/150"
  });

  const [days, setDays] = useState([
    { day: "Pazartesi", open: "09:00", close: "19:00", active: true },
    { day: "Salı", open: "09:00", close: "19:00", active: true },
    { day: "Çarşamba", open: "09:00", close: "19:00", active: true },
    { day: "Perşembe", open: "09:00", close: "19:00", active: true },
    { day: "Cuma", open: "09:00", close: "19:00", active: true },
    { day: "Cumartesi", open: "10:00", close: "16:00", active: true },
    { day: "Pazar", open: "00:00", close: "00:00", active: false },
  ]);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setStoreData({
            storeName: data.storeName || "",
            email: data.email || user.email,
            description: data.description || "",
            address: data.address || "",
            city: data.city || "",
            imageUrl: data.imageUrl || "https://via.placeholder.com/150"
          });
          if (data.workingHours) setDays(data.workingHours);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreData();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !auth.currentUser) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `stores/${auth.currentUser.uid}/logo`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setStoreData(prev => ({ ...prev, imageUrl: url }));
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) return;
      await updateDoc(doc(db, "users", user.uid), {
        ...storeData,
        workingHours: days,
        updatedAt: new Date()
      });
      alert("Başarıyla Kaydedildi");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-10 px-4 animate-in fade-in duration-700">
      <div className="bg-gray-950 border border-gray-800 rounded-[3.5rem] overflow-hidden shadow-2xl">
        <div className="h-48 bg-gradient-to-r from-indigo-900 via-gray-900 to-indigo-950 relative">
          <div className="absolute -bottom-16 left-10 flex items-end gap-6">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-32 h-32 rounded-[2.5rem] bg-gray-900 border-4 border-gray-950 overflow-hidden shadow-2xl flex items-center justify-center">
                {uploading ? <Loader2 className="animate-spin text-indigo-500" /> : <img src={storeData.imageUrl} className="w-full h-full object-cover group-hover:opacity-50 transition-all" />}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white"><Camera size={24} /></div>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>
            <div className="mb-4">
              <h1 className="text-3xl font-black text-white tracking-tighter">{storeData.storeName || "Mağaza Adı"}</h1>
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest mt-1"><ShieldCheck size={14} /> Doğrulanmış Satıcı</div>
            </div>
          </div>
        </div>
        <div className="pt-24 p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 ml-1"><Store size={14} className="text-indigo-500" /><label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Mağaza Adı</label></div>
              <input type="text" value={storeData.storeName} onChange={(e) => setStoreData({...storeData, storeName: e.target.value})} className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-white font-medium transition-all" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 ml-1"><Mail size={14} className="text-indigo-500" /><label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">E-posta</label></div>
              <input type="email" value={storeData.email} onChange={(e) => setStoreData({...storeData, email: e.target.value})} className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-white font-medium transition-all" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 ml-1"><Info size={14} className="text-indigo-500" /><label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Açıklama</label></div>
            <textarea rows={6} value={storeData.description} onChange={(e) => setStoreData({...storeData, description: e.target.value})} className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-white font-medium resize-none transition-all" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        <div className="bg-gray-950 border border-gray-800 rounded-[3.5rem] p-10 shadow-xl flex flex-col h-full">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500"><Clock size={28} /></div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase">Çalışma Saatleri</h2>
          </div>
          <div className="space-y-3 flex-grow">
            {days.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-900/30 border border-gray-800/50 rounded-2xl">
                <span className={`text-xs font-bold uppercase tracking-widest ${item.active ? 'text-gray-200' : 'text-gray-700'}`}>{item.day}</span>
                <div className="flex items-center gap-3">
                  <input type="text" value={item.open} onChange={(e) => { const n = [...days]; n[idx].open = e.target.value; setDays(n); }} disabled={!item.active} className="w-16 p-2 bg-gray-950 border border-gray-800 rounded-xl text-center text-[10px] font-black text-gray-400 outline-none" />
                  <span className="text-gray-800 font-bold">-</span>
                  <input type="text" value={item.close} onChange={(e) => { const n = [...days]; n[idx].close = e.target.value; setDays(n); }} disabled={!item.active} className="w-16 p-2 bg-gray-950 border border-gray-800 rounded-xl text-center text-[10px] font-black text-gray-400 outline-none" />
                  <button onClick={() => { const n = [...days]; n[idx].active = !n[idx].active; setDays(n); }} className={`ml-4 text-[9px] font-black px-5 py-2 rounded-full border transition-all ${item.active ? 'border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white' : 'border-indigo-500/20 text-indigo-500 hover:bg-indigo-500 hover:text-white'}`}>{item.active ? 'KAPALI' : 'AÇIK'}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 h-full">
          <div className="bg-gray-950 border border-gray-800 rounded-[3.5rem] p-10 shadow-xl flex-grow">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-500"><MapPin size={28} /></div>
              <h2 className="text-xl font-black text-white tracking-tight uppercase">Konum Ayarları</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Şehir</label>
                <input type="text" value={storeData.city} onChange={(e) => setStoreData({...storeData, city: e.target.value})} placeholder="Şehir seçiniz" className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Tam Adres</label>
                <textarea rows={6} value={storeData.address} onChange={(e) => setStoreData({...storeData, address: e.target.value})} placeholder="Sokak, kapı no, mahalle..." className="w-full p-4 bg-gray-900/50 border border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm resize-none" />
              </div>
            </div>
          </div>
          <button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center gap-4 bg-indigo-600 text-white p-7 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] hover:bg-indigo-500 transition-all shadow-2xl disabled:opacity-50">
            {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />} GÜNCELLEMELERİ KAYDET
          </button>
        </div>
      </div>
    </div>
  );
}