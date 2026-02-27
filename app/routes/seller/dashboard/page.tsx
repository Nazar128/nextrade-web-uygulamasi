"use client";
import React from 'react';
import { DollarSign, Package, Star, Eye, ShoppingBag, Users, Zap } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { ActivityFeed } from '@/components/ActivityFeed';

const DashboardPage = () => {
    return (
        <div className="p-6 space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto">
            
            <section className="space-y-4">
                <div className="flex flex-col">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Mağaza Performansı</h2>
                    <p className="text-[11px] text-slate-600 italic">Genel başarı metrikleri</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard 
                        label="Toplam Ciro" value="₺142.850" 
                        icon={DollarSign} subtitle="Tüm Zamanlar"
                        trend={{ value: "+14%", isPositive: true }}
                        colorClass="text-emerald-500" 
                    />
                    <StatCard 
                        label="Toplam Sipariş" value="1.240" 
                        icon={ShoppingBag} subtitle="Tüm Zamanlar"
                        colorClass="text-blue-500" 
                    />
                    <StatCard 
                        label="Mağaza Puanı" value="4.8" 
                        icon={Star} subtitle="128 Değerlendirme"
                        colorClass="text-yellow-500" 
                    />
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-[10px] font-bold text-blue-500/80 uppercase tracking-[0.2em] whitespace-nowrap">Günün Özeti</h2>
                        <div className="h-px w-full bg-slate-800/50" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <StatCard 
                            label="Bugünkü Kazanç" value="₺850" 
                            icon={DollarSign} subtitle="Anlık"
                            colorClass="text-emerald-400" 
                        />
                        <StatCard 
                            label="Yeni Sipariş" value="4" 
                            icon={Package} subtitle="Bekleyen"
                            colorClass="text-blue-400" 
                        />
                        <StatCard 
                            label="Anlık Ziyaretçi" value="12" 
                            icon={Users} subtitle="Şu an"
                            colorClass="text-purple-400" 
                        />
                        <StatCard 
                            label="Görüntüleme" value="240" 
                            icon={Eye} subtitle="Bugün"
                            trend={{ value: "+5%", isPositive: true }}
                            colorClass="text-slate-400" 
                        />
                    </div>

                    <div className="bg-blue-600/5 border border-blue-500/10 p-4 rounded-2xl flex items-center gap-4">
                        <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400">
                            <Zap size={18} />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                            <strong className="text-blue-400">Tavsiye:</strong> Stokları azalan 3 ürününüz var. Satış kaybetmemek için stok güncellemesi yapabilirsiniz.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <ActivityFeed />
                </div>
            </div>

            <footer className="pt-4 border-t border-slate-800/30 text-center">
                <p className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
                    Satıcı Paneli v1.0.4 — Son Senkronizasyon: 15:55
                </p>
            </footer>
        </div>
    );
};

export default DashboardPage;