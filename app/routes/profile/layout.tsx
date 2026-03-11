"use client"
import { usePathname } from 'next/navigation';
import React from 'react'
import CustomerGuard from "@/components/CustomerGuard";
import { User, Package, Heart, MapPin, Settings, LogOut } from 'lucide-react';

const menuItems = [
  { name: "Profilim", path: "/routes/profile", icon: <User size={20} /> },
  { name: "Siparişlerim", path: "/routes/profile/orders", icon: <Package size={20} /> },
  { name: "Favorilerim", path: "/routes/profile/wishlist", icon: <Heart size={20} /> },
  { name: "Adreslerim", path: "/routes/profile/addresses", icon: <MapPin size={20} /> },
  { name: "Ayarlar", path: "/routes/profile/settings", icon: <Settings size={20} /> },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    
  return (
    <CustomerGuard>
    <div className="flex    text-white relative">
      
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-gray-600/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-gray-300/10 blur-[120px] rounded-full" />
      </div>

      <aside className=" md:flex flex-col w-72 h-screen sticky top-0 bg-gradient-to-b from-gray-950 via-gray-700 to-gray-950 backdrop-blur-2xl  shadow-lg shadow-gray-500">
        
        <div className="p-8">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            Hesabım
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <a 
              key={item.path} 
              href={item.path} 
              className="group flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:translate-x-1"
            >
              <span className="text-xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">
                {item.icon}
              </span>
              <span className="text-gray-300 group-hover:text-white font-medium">
                {item.name}
              </span>
            </a>
          ))}
        </nav>

        <div className="p-2 border-t border-white/5  mt-auto md:p-0">
          <button className="flex items-center gap-2 w-full p-4 rounded-2xl text-red-600 hover:bg-red-700/10 hover:text-red-200 transition-all font-semibold">
            <span className="text-xl">🚪</span>
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
    </CustomerGuard>
  )
}