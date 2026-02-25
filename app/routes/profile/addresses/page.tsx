"use client"
import React, { useState } from 'react'
import { MapPin, Plus, Trash2, Edit2, Home, Briefcase, X, User, Phone, GraduationCap, Sun } from 'lucide-react'
import { adresses, Address } from '@/data/Addresses' 

export default function AddressesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const openModal = (address: Address | null = null) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('ev')) return <Home size={22} className="text-blue-400" />;
    if (t.includes('iş')) return <Briefcase size={22} className="text-purple-400" />;
    if (t.includes('yurt')) return <GraduationCap size={22} className="text-yellow-400" />;
    if (t.includes('yazlık')) return <Sun size={22} className="text-orange-400" />;
    return <MapPin size={22} className="text-blue-400" />;
  };

  return (
    <div className="w-full space-y-10 pb-20 px-4 font-sans antialiased">
      <div className="space-y-2">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-blue-600 ">
          Adres <span className='text-slate-400  m-[-2]'>lerim</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <button 
          onClick={() => openModal()}
          className="group relative flex flex-col items-center justify-center p-10 rounded-[2.5rem] border-2 border-dashed border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-blue-500/30 transition-all duration-700 h-[300px]"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all duration-500 border border-white/5">
            <Plus size={32} className="text-gray-500 group-hover:text-blue-400 transition-all duration-500" />
          </div>
          <span className="mt-6 font-black text-gray-500 group-hover:text-white uppercase tracking-widest text-xs transition-colors">Yeni Adres Ekle</span>
        </button>

        {adresses.map((address) => (
          <div 
            key={address.id}
            className="group relative flex flex-col justify-between p-4 rounded-[2.5rem] bg-white/[0.05] backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500 h-[300px] shadow-2xl overflow-hidden"
          >
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/[0.03] rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-blue-500/40 transition-colors shadow-xl">
                    {getIcon(address.title)}
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-white tracking-tight leading-none mb-1">{address.title}</h3>
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/5 px-2 py-0.5 rounded-md border border-blue-500/10">
                        {address.neighborhood}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openModal(address)} className="p-2 hover:bg-white/5 rounded-xl text-gray-600 hover:text-blue-400 transition-all"><Edit2 size={16} /></button>
                  <button className="p-2 hover:bg-red-500/5 rounded-xl text-gray-600 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-300 font-bold text-sm flex items-center gap-2">
                  <MapPin size={14} className="text-blue-500" />
                  {address.city} / {address.district}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 font-medium">
                  {address.fulladdress}
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-5 border-t border-white/5 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                    <User size={12} className="text-gray-600" /> {address.fullName}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                    <Phone size={12} className="text-gray-600" /> {address.phone}
                </div>
            </div>
    
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-[#0c0d10] border border-white/10 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-8">
              {editingAddress ? 'Adres Düzenle' : 'Yeni Kayıt'}
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <ModalInput label="Başlık" value={editingAddress?.title} placeholder="Ev, İş..." />
               <ModalInput label="Ad Soyad" value={editingAddress?.fullName} placeholder="Nazar Kalçık" />
               <ModalInput label="Telefon" value={editingAddress?.phone} placeholder="555..." />
               <ModalInput label="E-Posta" value={editingAddress?.email} placeholder="mail@example.com" />
               <ModalInput label="Şehir" value={editingAddress?.city} />
               <ModalInput label="İlçe" value={editingAddress?.district} />
               <div className="md:col-span-2 space-y-2">
                 <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Tam Adres</label>
                 <textarea 
                    defaultValue={editingAddress?.fulladdress}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500/50 outline-none h-24 resize-none"
                 />
               </div>
               <button type="button" className="md:col-span-2 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-blue-400 transition-colors">
                 {editingAddress ? 'DEĞİŞİKLİKLERİ KAYDET' : 'ADRESİ TANIMLA'}
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function ModalInput({ label, value, placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{label}</label>
      <input 
        defaultValue={value} 
        placeholder={placeholder}
        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500/50 outline-none transition-all"
      />
    </div>
  )
}