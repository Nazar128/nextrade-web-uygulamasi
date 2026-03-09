"use client";
import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, UserCheck, UserMinus, Users } from 'lucide-react';
import { UserManagementTable } from '@/components/UserManagementTable';
import { StatCard } from '@/components/StatCard'; 
import { AddUserForm } from '@/components/AddUserForm';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ sellers: 0, total: 0, restricted: 0, customers: 0 });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const docs = snapshot.docs.map(d => d.data());
      
      setStats({
        total: snapshot.docs.length, 
        sellers: docs.filter(u => u.role === 'Satıcı').length,
        restricted: docs.filter(u => u.status === 'Kısıtlı').length,
        customers: docs.filter(u => u.role === 'Müşteri').length,
      });
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-slate-200">
      {isModalOpen && <AddUserForm onClose={() => setIsModalOpen(false)} />}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-slate-600">
            <span className='text-4xl text-blue-700 uppercase'>Kullanıcı</span> YÖNETİMİ
          </h1>
          <p className="text-xs text-slate-500 font-medium tracking-wide">Tüm kullanıcı kayıtlarını buradan izleyebilir ve yönetebilirsin.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold uppercase px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus size={16} /> Yeni Kullanıcı Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard 
          label="Toplam Kullanıcı" 
          value={stats.total} 
          icon={Users} 
          colorClass="text-indigo-400" 
          subtitle="Sistemdeki tüm kayıtlar" 
        />
        
        <StatCard 
          label="Satıcılar" 
          value={stats.sellers} 
          icon={UserCheck} 
          colorClass="text-emerald-400" 
          subtitle="Aktif Mağazalar" 
        />
        
        <StatCard 
          label="Kısıtlanmış" 
          value={stats.restricted} 
          icon={UserMinus} 
          colorClass="text-rose-400" 
          subtitle="Erişimi kapatılanlar" 
        />
        
        <StatCard 
          label="Müşteriler" 
          value={stats.customers} 
          icon={UserCheck} 
          colorClass="text-blue-400" 
          subtitle="Bireysel Üyeler" 
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text"
              placeholder="İsim veya e-posta ile filtrele..."
              className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 pl-10 text-sm outline-none focus:border-indigo-500/50 transition-all text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <UserManagementTable searchTerm={searchTerm} />
      </div>
    </div>
  );
}