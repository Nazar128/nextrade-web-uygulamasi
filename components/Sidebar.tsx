"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/routes/admin' },
  { name: 'Kullanıcılar', icon: Users, path: '/routes/admin/users' },
  { name: 'İçerik Yönetimi', icon: Layers, path: '/routes/admin/cms' },
  { name: 'Ürünler', icon: Settings, path: '/routes/admin/products' },
  { name: 'Kategoriler', icon: Settings, path: '/routes/admin/categories' },
  { name: 'Markalar', icon: Settings, path: '/routes/admin/brands' },
  { name: 'Siparişler', icon: ShoppingBag, path: '/routes/admin/orders' },
  { name: 'Ayarlar', icon: Settings, path: '/routes/admin/settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-900 flex flex-col z-40">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <Sparkles className="text-white" size={22} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      <nav className="flex-grow px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive 
                ? 'bg-blue-700/10 text-blue-500 border border-blue-700/20 shadow-lg shadow-blue-900/5' 
                : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs font-bold uppercase tracking-wider">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={14} className="animate-pulse" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-900">
        <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-slate-700 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 flex items-center justify-center text-[10px] font-black text-white">
              NK
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-slate-200">Nazar K.</span>
              <span className="text-[9px] text-slate-500 font-medium">Root Admin</span>
            </div>
          </div>
          <button className="p-1.5 hover:bg-rose-500/10 hover:text-rose-500 text-slate-600 rounded-lg transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};