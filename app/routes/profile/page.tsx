"use client";
import React, { useState, useRef, useEffect } from 'react';
import { db, auth, storage } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { Camera, ShieldCheck, Mail, Phone, Lock, User as UserIcon, Zap, Loader2, KeyRound } from 'lucide-react';
import CustomerStats from '@/components/CustomerStats';

export default function DashboardPage() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    phone: "",
    role: "",
    status: "",
    createdAt: "",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300"
  });
  const [security, setSecurity] = useState({ currentPassword: "", newPassword: "" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          let dateString = "Mart 2026";
          if (data.createdAt && typeof data.createdAt.toDate === 'function') {
            dateString = data.createdAt.toDate().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
          }
          setUserData({
            displayName: data.displayName || "",
            email: data.email || user.email || "",
            phone: data.phone || "",
            role: data.role || "user",
            status: data.status || "Aktif",
            createdAt: dateString,
            profileImage: data.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300"
          });
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const user = auth.currentUser;
    if (!file || !user) return;
    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `profiles/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      await updateDoc(doc(db, "users", user.uid), { profileImage: downloadURL });
      setUserData(prev => ({ ...prev, profileImage: downloadURL }));
    } catch (error) {
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;
    if (!user || !security.currentPassword) return;
    setIsSaving(true);
    try {
      const credential = EmailAuthProvider.credential(user.email!, security.currentPassword);
      await reauthenticateWithCredential(user, credential);
      if (security.newPassword) await updatePassword(user, security.newPassword);
      await updateDoc(doc(db, "users", user.uid), {
        displayName: userData.displayName,
        phone: userData.phone
      });
      setIsEditing(false);
      setSecurity({ currentPassword: "", newPassword: "" });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 size={48} className="animate-spin text-cyan-500" />
      <span className="text-[10px] font-black tracking-[0.5em] text-white">SİSTEM HAZIRLANIYOR</span>
    </div>
  );

  return (
    <div className="w-full space-y-12 pb-20 px-4 font-sans antialiased">
      <div className="relative group p-[1px] rounded-[3rem] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
        <div className="bg-[#0f1115] rounded-[2.9rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_20%_30%,#06b6d4_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#d946ef_0%,transparent_50%)]" />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="w-44 h-44 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 to-fuchsia-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-transform duration-500 hover:scale-105">
                  <div className="w-full h-full rounded-full border-4 border-[#0f1115] overflow-hidden relative">
                    {uploadingImage ? <div className="w-full h-full flex items-center justify-center bg-black/40"><Loader2 className="animate-spin text-white" /></div> : <img src={userData.profileImage} alt="" className="w-full h-full object-cover" />}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300">
                      <Camera size={24} className="text-white mb-1" />
                      <span className="text-[10px] text-white font-bold uppercase tracking-tighter">Değiştir</span>
                    </div>
                  </div>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                <div className="absolute bottom-2 right-2 p-2 bg-green-500 border-4 border-[#0f1115] rounded-full text-white"><ShieldCheck size={16} fill="currentColor" /></div>
              </div>
              <div className="text-center md:text-left space-y-2">
                <p className="text-gray-500 text-xs font-bold tracking-[0.3em] uppercase ml-1 opacity-70">{userData.role === 'admin' ? 'Yönetici' : 'Müşteri'} Profili</p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-none capitalize">{userData.displayName || "Kullanıcı"}</h1>
                  <div className="w-10 h-10 rounded-full border border-cyan-500/50 flex items-center justify-center text-cyan-400"><Zap size={20} fill="currentColor" /></div>
                </div>
                <p className="text-gray-400 font-medium text-lg italic opacity-60">Üyelik Tarihi: {userData.createdAt}</p>
              </div>
            </div>
            <button onClick={() => setIsEditing(!isEditing)} className="px-12 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-bold tracking-wider hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all active:scale-95 border border-white/10 uppercase text-xs">{isEditing ? "DÜZENLEMEYİ KAPAT" : "PROFİLİ GÜNCELLE"}</button>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="p-10 rounded-[2.5rem] bg-[#0f1115] border border-white/5 shadow-2xl space-y-6">
            <h3 className="text-cyan-400 text-sm font-black uppercase tracking-[0.2em] mb-2">Hesap Detayları</h3>
            <InputGroup label="İsim Soyisim" icon={<UserIcon size={18}/>} value={userData.displayName} onChange={(e: any) => setUserData({...userData, displayName: e.target.value})} />
            <InputGroup label="Telefon" icon={<Phone size={18}/>} value={userData.phone} onChange={(e: any) => setUserData({...userData, phone: e.target.value})} />
            <InputGroup label="E-Posta" icon={<Mail size={18}/>} value={userData.email} disabled />
          </div>
          <div className="p-10 rounded-[2.5rem] bg-[#0f1115] border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-purple-400 text-sm font-black uppercase tracking-[0.2em] mb-4">Güvenlik Onayı</h3>
              <InputGroup label="Mevcut Şifre" icon={<KeyRound size={18}/>} type="password" placeholder="Şifrenizi girin" value={security.currentPassword} onChange={(e: any) => setSecurity({...security, currentPassword: e.target.value})} />
              <div className="h-[1px] bg-white/5 my-2" />
              <InputGroup label="Yeni Şifre Belirle" icon={<Lock size={18}/>} type="password" placeholder="Zorunlu değil" value={security.newPassword} onChange={(e: any) => setSecurity({...security, newPassword: e.target.value})} />
            </div>
            <button onClick={handleUpdateProfile} disabled={isSaving} className="w-full py-5 bg-white text-black rounded-2xl font-black tracking-widest hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2">{isSaving ? <Loader2 className="animate-spin" /> : "GÜNCELLEMEYİ TAMAMLA"}</button>
          </div>
        </div>
      )}
      {uid && <CustomerStats userId={uid} />}
    </div>
  );
}

function InputGroup({ label, icon, placeholder, value, onChange, disabled, type = "text" }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors">{icon}</div>
        <input type={type} value={value || ""} onChange={onChange} disabled={disabled} placeholder={placeholder} className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white font-medium focus:outline-none focus:border-cyan-500/40 transition-all disabled:opacity-20" />
      </div>
    </div>
  )
}