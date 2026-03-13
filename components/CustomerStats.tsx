"use client";
import React, { useEffect, useState } from 'react';
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Package, Heart, Star, MapPin } from 'lucide-react';

interface StatsProps {
  userId: string;
}

export default function CustomerStats({ userId }: StatsProps) {
  const [stats, setStats] = useState({
    activeOrders: 0,
    favorites: 0,
    addresses: 0,
    points: 0
  });

  useEffect(() => {
    if (!userId) return;

    const ordersRef = collection(db, "orders");
    
    const activeStatuses = ["Pending", "Processing", "Shipped", "pending", "processing", "shipped"];
    const activeOrdersQuery = query(
      ordersRef, 
      where("userId", "==", userId), 
      where("status", "in", activeStatuses)
    );

    const unsubOrders = onSnapshot(activeOrdersQuery, (snapshot) => {
      setStats(prev => ({ ...prev, activeOrders: snapshot.size }));
    });

    const favRef = collection(db, "users", userId, "favorites");
    const unsubFav = onSnapshot(favRef, (snapshot) => {
      setStats(prev => ({ ...prev, favorites: snapshot.size }));
    });

    const addrRef = collection(db, "users", userId, "addresses");
    const unsubAddr = onSnapshot(addrRef, (snapshot) => {
      setStats(prev => ({ ...prev, addresses: snapshot.size }));
    });

    const completedStatuses = ["Delivered", "delivered"];
    const completedOrdersQuery = query(
      ordersRef,
      where("userId", "==", userId),
      where("status", "in", completedStatuses)
    );

    const unsubPoints = onSnapshot(completedOrdersQuery, (snapshot) => {
      setStats(prev => ({ ...prev, points: snapshot.size * 10 }));
    });

    return () => {
      unsubOrders();
      unsubFav();
      unsubAddr();
      unsubPoints();
    };
  }, [userId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        label="Aktif Sipariş" 
        value={stats.activeOrders.toString().padStart(2, '0')} 
        icon={<Package />} 
        theme="cyan" 
      />
      <StatCard 
        label="Favorilerim" 
        value={stats.favorites.toString().padStart(2, '0')} 
        icon={<Heart />} 
        theme="pink" 
      />
      <StatCard 
        label="Hesap Puanı" 
        value={stats.points.toString()} 
        icon={<Star />} 
        theme="yellow" 
      />
      <StatCard 
        label="Adreslerim" 
        value={stats.addresses.toString().padStart(2, '0')} 
        icon={<MapPin />} 
        theme="purple" 
      />
    </div>
  );
}

function StatCard({ label, value, icon, theme }: any) {
  const themes: any = {
    cyan: "border-cyan-500/20 text-cyan-400 bg-cyan-500/5",
    pink: "border-pink-500/20 text-pink-400 bg-pink-500/5",
    yellow: "border-yellow-500/20 text-yellow-400 bg-yellow-500/5",
    purple: "border-purple-500/20 text-purple-400 bg-purple-500/5"
  };

  return (
    <div className={`p-8 rounded-[2.5rem] border ${themes[theme]} flex flex-col items-center justify-center space-y-4 hover:bg-white/[0.02] transition-all bg-[#0f1115]/50 group`}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div className="text-center">
        <p className="text-4xl font-extrabold text-white tracking-tighter">{value}</p>
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mt-1">{label}</p>
      </div>
    </div>
  );
}