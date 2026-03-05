"use client";
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatDistanceToNow } from 'date-fns'; 
import { tr } from 'date-fns/locale'; 

export const ActivityLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const q = query(
      collection(db, "logs"), 
      orderBy("createdAt", "desc"), 
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLogs(logsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

 
  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE_PRODUCT': return 'bg-emerald-500 shadow-emerald-500/40';
      case 'DELETE_PRODUCT': return 'bg-rose-500 shadow-rose-500/40';
      case 'UPDATE_PRODUCT': return 'bg-blue-500 shadow-blue-500/40';
      case 'LOGIN': return 'bg-amber-500 shadow-amber-500/40';
      case 'REGISTER': return 'bg-blue-500 shadow-blue-500/40';
      default: return 'bg-slate-500 shadow-slate-500/40';
    }
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl h-full backdrop-blur-md">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Sistem Hareketleri</h3>
      
      <div className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : logs.length === 0 ? (
          <p className="text-xs text-slate-600 italic text-center py-4">Henüz bir hareket kaydedilmedi.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-center justify-between group cursor-default">
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${getActionColor(log.action)} shadow-[0_0_8px]`} />
                
                <div>
                  <p className="text-xs font-bold text-slate-200">
                    {log.userName || "Bilinmeyen Kullanıcı"}
                  </p>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {log.details}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-medium text-slate-600 italic shrink-0 ml-4">
                {log.createdAt ? formatDistanceToNow(log.createdAt.toDate(), { addSuffix: true, locale: tr }) : 'Yeni'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};