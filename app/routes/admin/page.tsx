"use client";
import { useState, useEffect } from 'react';
import { CreditCard, Users, Activity, ShoppingBag, Calendar } from 'lucide-react';
import { StatCard } from '@/components/StatCard'; 
import { MainChart } from '@/components/MainChart';
import { ActivityLogs } from '@/components/ActivityLogs';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, query, orderBy } from 'firebase/firestore';

export default function AdminDashboard() {
    const [range, setRange] = useState('haftalik');
    const [stats, setStats] = useState({
        totalRevenue: 0,
        customerCount: 0,
        sellerCount: 0,
        activeSessions: 0,
        totalOrders: 0
    });
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const analyticsRef = doc(db, "analytics", "store_stats");
        const unsubscribeAnalytics = onSnapshot(analyticsRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setStats(prev => ({
                    ...prev,
                    activeSessions: Math.max(0, data.activeUsers || 0)
                }));
            }
        });

        const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
            const users = snapshot.docs.map(d => d.data());
            setStats(prev => ({
                ...prev,
                customerCount: users.filter(u => u.role === 'customer').length,
                sellerCount: users.filter(u => u.role === 'seller').length
            }));
        });

        const qOrders = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
            const allOrders = snapshot.docs.map(d => {
                const data = d.data();
                return {
                    ...data,
                    totalAmount: Number(data.totalAmount || 0),
                    createdAt: data.createdAt?.seconds ? data.createdAt.seconds * 1000 : new Date(data.createdAt).getTime()
                };
            });

            const totalRev = allOrders.reduce((acc, curr: any) => acc + curr.totalAmount, 0);
            
            setStats(prev => ({
                ...prev,
                totalRevenue: totalRev,
                totalOrders: allOrders.length
            }));

            processChartData(allOrders, range);
        });

        return () => {
            unsubscribeAnalytics();
            unsubscribeUsers();
            unsubscribeOrders();
        };
    }, [range]);

    const processChartData = (orders: any[], timeRange: string) => {
        const now = new Date();
        let filtered: any[] = [];

        if (timeRange === 'gunluk') {
            const hours = ['09:00', '12:00', '15:00', '18:00', '21:00'];
            filtered = hours.map(h => ({
                name: h,
                satis: orders.filter(o => {
                    const d = new Date(o.createdAt);
                    return d.getHours() >= parseInt(h) && d.getHours() < parseInt(h) + 3 && d.toDateString() === now.toDateString();
                }).reduce((a, b) => a + b.totalAmount, 0),
                ziyaret: Math.floor(Math.random() * 50) + 10 
            }));
        } else if (timeRange === 'haftalik') {
            const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
            filtered = days.map((d, i) => ({
                name: d,
                satis: orders.filter(o => {
                    const date = new Date(o.createdAt);
                    const weekAgo = new Date();
                    weekAgo.setDate(now.getDate() - 7);
                    return date.getDay() === i && date >= weekAgo;
                }).reduce((a, b) => a + b.totalAmount, 0),
                ziyaret: Math.floor(Math.random() * 500) + 100
            }));
        } else if (timeRange === 'aylik') {
            const weeks = ['1. Hafta', '2. Hafta', '3. Hafta', '4. Hafta'];
            filtered = weeks.map((w, i) => ({
                name: w,
                satis: orders.filter(o => {
                    const date = new Date(o.createdAt);
                    return date.getMonth() === now.getMonth() && Math.floor(date.getDate() / 7) === i;
                }).reduce((a, b) => a + b.totalAmount, 0),
                ziyaret: Math.floor(Math.random() * 2000) + 500
            }));
        } else {
            const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
            filtered = months.map((m, i) => ({
                name: m,
                satis: orders.filter(o => new Date(o.createdAt).getMonth() === i && new Date(o.createdAt).getFullYear() === now.getFullYear()).reduce((a, b) => a + b.totalAmount, 0),
                ziyaret: Math.floor(Math.random() * 10000) + 2000
            }));
        }
        setChartData(filtered);
    };

    return (
        <div className="p-8 bg-slate-950 min-h-screen mx-auto text-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-white ">VERİ <span className='text-blue-600'>ANALİZ</span> MERKEZİ</h1>
                    <p className="text-xs text-slate-500 font-medium">Sistem verileri gerçek zamanlı izleniyor.</p>
                </div>
                
                <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 p-1.5 rounded-xl">
                    <Calendar size={14} className="ml-2 text-slate-500" />
                    <select 
                        value={range} 
                        onChange={(e) => setRange(e.target.value)} 
                        className="bg-transparent text-[11px] font-bold uppercase tracking-wider outline-none pr-2 cursor-pointer"
                    >
                        <option value="gunluk">Bugün</option>
                        <option value="haftalik">Son 7 Gün</option>
                        <option value="aylik">Bu Ay</option>
                        <option value="yillik">Bu Yıl</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard 
                    label="Toplam Ciro" 
                    value={`₺${stats.totalRevenue.toLocaleString('tr-TR')}`} 
                    icon={CreditCard} 
                    colorClass="text-indigo-400" 
                />
                <StatCard 
                    label="Kullanıcı Sayısı" 
                    value={stats.customerCount + stats.sellerCount} 
                    subtitle={`${stats.customerCount} Müşteri / ${stats.sellerCount} Satıcı`}
                    icon={Users} 
                    colorClass="text-emerald-400" 
                />
                <StatCard 
                    label="Aktif Oturum" 
                    value={stats.activeSessions} 
                    subtitle="Şu an sitede"
                    icon={Activity} 
                    colorClass="text-amber-400" 
                />
                <StatCard 
                    label="Tüm Siparişler" 
                    value={stats.totalOrders} 
                    icon={ShoppingBag} 
                    colorClass="text-rose-400" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <MainChart data={chartData} />
                </div>
                <div>
                    <ActivityLogs />
                </div>
            </div>
        </div>
    );
}