"use client";
import React, { useState } from 'react';
import { Search, Filter, Plus, UserCheck, UserMinus, ShieldAlert } from 'lucide-react';
import { UserManagementTable } from '@/components/UserManagementTable';
import { StatCard } from '@/components/StatCard'; 
export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className=" p-8  bg-slate-950 shadow shadow-2xl shadow-slate-950 min-h-screen mx-auto text-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-slate-600"><span className='text-4xl text-blue-700'>KULLANICI</span> YÖNETİMİ</h1>
          <p className="text-xs text-slate-500 font-medium tracking-wide">Rolleri düzenle, erişim izinlerini kontrol et ve hesapları yönet.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold uppercase px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20">
          <Plus size={16} />
          Yeni Kullanıcı Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
        <StatCard 
          label="Onaylı Satıcılar" 
          value="390" 
          icon={UserCheck} 
          colorClass="text-emerald-400" 
          subtitle="Aktif Mağazalar"
        />
        <StatCard 
          label="Beklemede" 
          value="12" 
          icon={ShieldAlert} 
          colorClass="text-amber-400" 
          subtitle="Onay bekleyen başvurular"
        />
        <StatCard 
          label="Kısıtlanmış" 
          value="5" 
          icon={UserMinus} 
          colorClass="text-rose-400" 
          subtitle="Banlanan hesaplar"
        />
         <StatCard 
          label="Onaylı Müşteriler" 
          value="5" 
          icon={UserCheck} 
          colorClass="text-green-400" 
          subtitle="Aktif Müşteriler"
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text"
              placeholder="İsim, e-posta veya ID ile ara..."
              className="w-full bg-slate-900/60 border border-slate-800/60 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-indigo-500/50 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 p-1.5 rounded-xl">
            <Filter size={14} className="ml-2 text-slate-500" />
            <select className="bg-transparent text-[11px] font-bold uppercase outline-none pr-4 cursor-pointer">
              <option>Tüm Roller</option>
              <option>Admin</option>
              <option>Satıcı</option>
              <option>Müşteri</option>
            </select>
          </div>
        </div>

        <UserManagementTable />
      </div>
    </div>
  );
}