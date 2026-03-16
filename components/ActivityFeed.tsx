"use client";
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, where, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { formatDistanceToNow } from 'date-fns'; 
import { tr } from 'date-fns/locale'; 
import { ShoppingBag, MessageCircle, Star, Bell, X, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const ActivityFeed = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotif, setSelectedNotif] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(
          collection(db, "notifications"),
          where("sellerId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(10)
        );

        const unsubscribeSnap = onSnapshot(q, (snapshot) => {
          setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          setLoading(false);
        });

        return () => unsubscribeSnap();
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const getStatusStyle = (type: string) => {
    switch (type) {
      case 'order': return { color: 'bg-emerald-500 shadow-emerald-500/40', icon: <ShoppingBag size={12} className="text-white" /> };
      case 'question': return { color: 'bg-blue-500 shadow-blue-500/40', icon: <MessageCircle size={12} className="text-white" /> };
      case 'review': return { color: 'bg-amber-500 shadow-amber-500/40', icon: <Star size={12} className="text-white" /> };
      default: return { color: 'bg-slate-500 shadow-slate-500/40', icon: <Bell size={12} className="text-white" /> };
    }
  };

  const markAsReadAndDelete = async (notifId: string) => {
    try {
      await deleteDoc(doc(db, "notifications", notifId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleNotificationClick = (notif: any) => {
    setSelectedNotif(notif);
    markAsReadAndDelete(notif.id);
  };

  const handleAction = (notif: any) => {
    setSelectedNotif(null);
    if (notif.type === 'order') {
      router.push('/routes/seller/orders');
    } else if (notif.type === 'question') {
      router.push('/routes/seller/questions');
    } else if (notif.type === 'review') {
      router.push('/routes/seller/products');
    }
  };

  const getButtonText = (type: string) => {
    switch (type) {
      case 'order': return 'Siparişe Git';
      case 'question': return 'Cevapla';
      case 'review': return 'Ürüne Git';
      default: return 'Detayları Gör';
    }
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl h-full backdrop-blur-md relative">
      <h3 className="text-sm font-bold text-slate-400  tracking-widest mb-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        BİLDİRİM SİSTEMİ
      </h3>
      
      <div className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-xs text-slate-600 italic text-center py-4">Henüz bir bildirim yok.</p>
        ) : (
          notifications.map((notif) => {
            const style = getStatusStyle(notif.type);
            return (
              <div 
                key={notif.id} 
                onClick={() => handleNotificationClick(notif)}
                className="flex items-center justify-between group cursor-pointer hover:bg-slate-800/30 p-2 rounded-xl transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${style.color} transition-transform group-hover:scale-110`}>
                    {style.icon}
                  </div>
                  <div className="max-w-[180px]">
                    <p className="text-[11px] font-bold text-slate-200 uppercase tracking-tight">{notif.title}</p>
                    <p className="text-[10px] text-slate-500 leading-tight line-clamp-1 italic">{notif.message}</p>
                  </div>
                </div>
                <span className="text-[9px] font-medium text-slate-600 italic shrink-0 ml-4 font-mono">
                  {notif.createdAt ? formatDistanceToNow(notif.createdAt.toDate(), { addSuffix: true, locale: tr }) : 'Şimdi'}
                </span>
              </div>
            );
          })
        )}
      </div>

      {selectedNotif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">İçerik Özeti</span>
              <button onClick={() => setSelectedNotif(null)} className="text-slate-500 hover:text-white transition-colors"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getStatusStyle(selectedNotif.type).color}`}>
                   {React.cloneElement(getStatusStyle(selectedNotif.type).icon as React.ReactElement, {  })}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">{selectedNotif.title}</h4>
                  <p className="text-[10px] text-slate-500">{selectedNotif.createdAt ? formatDistanceToNow(selectedNotif.createdAt.toDate(), { addSuffix: true, locale: tr }) : 'Şimdi'}</p>
                </div>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                <p className="text-[13px] text-slate-200 leading-relaxed italic font-medium">
                  {selectedNotif.message}
                </p>
              </div>
              <button 
                onClick={() => handleAction(selectedNotif)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider shadow-[0_0_15px_rgba(37,99,235,0.2)]"
              >
                {getButtonText(selectedNotif.type)}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};