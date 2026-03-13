"use client";
import React, { useState, useEffect } from 'react';
import { DollarSign, Package, Star, Eye, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { db, auth } from '@/lib/firebase';
import { 
    collection, query, onSnapshot, orderBy, doc, getDoc, setDoc, updateDoc, increment 
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { StatCard } from '@/components/StatCard';
import { ActivityFeed } from '@/components/ActivityFeed';

const DashboardPage = () => {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        todayRevenue: 0,
        pendingOrders: 0,
        views: 0,
        activeUsers: 0
    });

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const analyticsRef = doc(db, "analytics", "store_stats");

                const checkAnalyticsDoc = async () => {
                    try {
                        const docSnap = await getDoc(analyticsRef);
                        if (!docSnap.exists()) {
                            await setDoc(analyticsRef, { 
                                totalViews: 0, 
                                activeUsers: 0 
                            });
                        }
                    } catch (error) {
                        console.error("Analytics initialization error:", error);
                    }
                };

                checkAnalyticsDoc();

                const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
                const unsubscribeOrders = onSnapshot(q, (snapshot) => {
                    const allOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    const sellerOrders = allOrders.filter((order: any) => 
                        order.items?.some((item: any) => 
                            item.sellerId === user.uid || 
                            item.sellerName === "NexTrade Mağaza" ||
                            item.brand === "Ray-Ban"
                        )
                    );

                    let totalRev = 0, todayRev = 0, pendingCount = 0;
                    const now = new Date();
                    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

                    sellerOrders.forEach((order: any) => {
                        const amount = Number(order.totalAmount || 0);
                        const orderDate = order.createdAt?.seconds ? order.createdAt.seconds * 1000 : new Date(order.createdAt).getTime();
                        
                        totalRev += amount;
                        if (orderDate >= startOfToday) todayRev += amount;
                        if (order.status === "pending" || !order.status) pendingCount += 1;
                    });

                    setStats(prev => ({
                        ...prev,
                        totalRevenue: totalRev,
                        totalOrders: sellerOrders.length,
                        todayRevenue: todayRev,
                        pendingOrders: pendingCount
                    }));
                }, (error) => {
                    console.error("Orders listener error:", error);
                });

                const unsubscribeAnalytics = onSnapshot(analyticsRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setStats(prev => ({
                            ...prev,
                            views: data.totalViews || 0,
                            activeUsers: Math.max(0, data.activeUsers || 0)
                        }));
                    }
                }, (error) => {
                    console.error("Analytics listener error:", error);
                });

                return () => {
                    unsubscribeOrders();
                    unsubscribeAnalytics();
                };
            }
        });

        return () => unsubscribeAuth();
    }, []);

    return (
        <div className="p-6 space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto">
            <section className="space-y-4">
                <div className="flex flex-col">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Mağaza Performansı</h2>
                    <p className="text-[11px] text-slate-600 italic">Müşteri Etkileşimi</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard 
                        label="Toplam Ciro" 
                        value={`₺${stats.totalRevenue.toLocaleString('tr-TR')}`} 
                        icon={DollarSign} 
                        subtitle="Genel Kazanç"
                        colorClass="text-emerald-500" 
                    />
                    <StatCard 
                        label="Toplam Sipariş" 
                        value={stats.totalOrders} 
                        icon={ShoppingBag} 
                        subtitle="Tüm Geçmiş"
                        colorClass="text-blue-500" 
                    />
                    <StatCard 
                        label="Mağaza Puanı" 
                        value="4.8" 
                        icon={Star} 
                        subtitle="Sabit Veri"
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
                            label="Bugünkü Kazanç" 
                            value={`₺${stats.todayRevenue.toLocaleString('tr-TR')}`} 
                            icon={TrendingUp} 
                            colorClass="text-emerald-400" 
                        />
                        <StatCard 
                            label="Yeni Sipariş" 
                            value={stats.pendingOrders} 
                            icon={Package} 
                            subtitle="Bekleyen"
                            colorClass="text-orange-400" 
                        />
                        <StatCard 
                            label="Anlık Ziyaretçi" 
                            value={stats.activeUsers} 
                            icon={Users} 
                            colorClass="text-purple-400" 
                        />
                        <StatCard 
                            label="Görüntüleme" 
                            value={stats.views} 
                            icon={Eye} 
                            colorClass="text-slate-400" 
                        />
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <ActivityFeed />
                </div>
            </div>

            <footer className="pt-4 border-t border-slate-800/30 text-center">
                <p className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
                    Satıcı Paneli v1.0.4 — Son Senkronizasyon: {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </p>
            </footer>
        </div>
    );
};

export default DashboardPage;