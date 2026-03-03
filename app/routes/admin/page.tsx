"use client";
import { useState } from 'react';
import { CreditCard, Users, Activity, ShoppingBag, Calendar, UserCheck, Store } from 'lucide-react';
import { StatCard } from '@/components/StatCard'; 
import { MainChart } from '@/components/MainChart';
import { ActivityLogs } from '@/components/ActivityLogs';

const allData = {
  gunluk: [
    { name: '09:00', satis: 100, ziyaret: 300 },
    { name: '12:00', satis: 400, ziyaret: 800 },
    { name: '15:00', satis: 300, ziyaret: 700 },
    { name: '18:00', satis: 800, ziyaret: 1200 },
  ],
  haftalik: [
    { name: 'Pzt', satis: 4000, ziyaret: 2400 },
    { name: 'Sal', satis: 3000, ziyaret: 1398 },
    { name: 'Çar', satis: 9000, ziyaret: 9800 },
    { name: 'Per', satis: 2780, ziyaret: 3908 },
    { name: 'Cum', satis: 1890, ziyaret: 4800 },
  ],
  aylik: [
    { name: '1. Hafta', satis: 20000, ziyaret: 45000 },
    { name: '2. Hafta', satis: 35000, ziyaret: 52000 },
    { name: '3. Hafta', satis: 28000, ziyaret: 41000 },
    { name: '4. Hafta', satis: 42000, ziyaret: 60000 },
  ],
  yillik: [
    { name: 'Oca', satis: 120000, ziyaret: 200000 },
    { name: 'Şub', satis: 150000, ziyaret: 250000 },
    { name: 'Mar', satis: 180000, ziyaret: 300000 },
  ]
};

export default function AdminDashboard() {
  const [range, setRange] = useState('haftalik');

 const currentData = allData[range as keyof typeof allData]; 
  return (
    <div className="p-8 bg-slate-950 min-h-screen mx-auto text-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white ">VERİ <span className='text-blue-600 text-4xl'>ANALİZ</span> MERKEZİ</h1>
          <p className="text-xs text-slate-500 font-medium">Sistem verileri gerçek zamanlı izleniyor.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 p-1.5 rounded-xl">
          <Calendar size={14} className="ml-2 text-slate-500" />
          <select 
            value={range} 
            onChange={(e) => setRange(e.target.value)} 
            className="bg-transparent text-[11px] font-bold uppercase tracking-wider outline-none pr-2 cursor-pointer"
          >
            <option value="gunluk">Anlık</option>
            <option value="haftalik">Haftalık</option>
            <option value="aylik">Aylık</option>
            <option value="yillik">Yıllık</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 bg-slate-950/60 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          label="Toplam Ciro" 
          value="₺124.500" 
          icon={CreditCard} 
          trend={{ value: "+12.5%", isPositive: true }}
          colorClass="text-indigo-400" 
        />
        <StatCard 
          label="Kullanıcı " 
          value="1.240" 
          subtitle="850 Müşteri / 390 Satıcı"
          icon={Users} 
          trend={{ value: "+40 yeni", isPositive: true }}
          colorClass="text-emerald-400" 
        />
        <StatCard 
          label="Aktif Oturum" 
          value="142" 
          subtitle="Şu an sitede"
          icon={Activity} 
          colorClass="text-amber-400" 
        />
        <StatCard 
          label="Siparişler" 
          value="3.842" 
          icon={ShoppingBag} 
          trend={{ value: "-2.1%", isPositive: false }}
          colorClass="text-rose-400" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MainChart data={currentData} />
        </div>
        <div>
          <ActivityLogs />
        </div>
      </div>
      
    </div>
  );
}