"use client";
import React from 'react';
import { Shield, User, Store, MoreVertical, Trash2, Ban, CheckCircle } from 'lucide-react';

const users = [
  { id: 1, name: "Nazar Kalçık", email: "nazar@example.com", role: "Admin", status: "Aktif", date: "12.02.2024" },
  { id: 2, name: "Ahmet Yılmaz", email: "ahmet@store.com", role: "Satıcı", status: "Aktif", date: "15.02.2024" },
  { id: 3, name: "Ayşe Demir", email: "ayse@user.com", role: "Müşteri", status: "Pasif", date: "01.03.2024" },
  { id: 4, name: "Mehmet Koz", email: "mehmet@tech.com", role: "Satıcı", status: "Beklemede", date: "02.03.2024" },
];

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'Admin': return <Shield size={14} className="text-indigo-400" />;
    case 'Satıcı': return <Store size={14} className="text-amber-400" />;
    default: return <User size={14} className="text-slate-400" />;
  }
};

export const UserManagementTable = () => (
  <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden">
    <div className="p-6 border-b border-slate-800/60 flex justify-between items-center">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Kullanıcı Yetkilendirme ve Rol Yönetimi</h3>
      <div className="flex gap-2">
         <button className="text-[10px] font-bold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors">Tümünü Filtrele</button>
      </div>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-950/50 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
            <th className="px-6 py-4">Kullanıcı</th>
            <th className="px-6 py-4">Rol</th>
            <th className="px-6 py-4">Durum</th>
            <th className="px-6 py-4">Kayıt Tarihi</th>
            <th className="px-6 py-4 text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-800/20 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-200">{user.name}</span>
                  <span className="text-[10px] text-slate-500">{user.email}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-950 w-fit border border-slate-800/50">
                  {getRoleIcon(user.role)}
                  <span className="text-[10px] font-bold text-slate-300">{user.role}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                  user.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-500' : 
                  user.status === 'Pasif' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 text-xs text-slate-500 font-medium">{user.date}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button title="Yetki Düzenle" className="p-1.5 hover:bg-indigo-500/20 rounded-lg text-indigo-400 transition-colors"><CheckCircle size={16}/></button>
                  <button title="Kısıtla" className="p-1.5 hover:bg-rose-500/20 rounded-lg text-rose-400 transition-colors"><Ban size={16}/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);