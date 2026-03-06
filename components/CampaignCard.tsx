"use client";
import React from 'react';
import { db } from "@/lib/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Edit2, Trash2, Power, Clock } from 'lucide-react';

interface CampaignProps {
  id: string; 
  title: string;
  image: string;
  status: 'Aktif' | 'Pasif';
  clicks: string;
  period: string;
  onEdit: (campaign: any) => void;
}

export const CampaignCard = ({ id, title, image, status, clicks, period, onEdit }: CampaignProps) => {
  
  const toggleStatus = async () => {
    try {
      const newStatus = status === 'Aktif' ? 'Pasif' : 'Aktif';
      const campRef = doc(db, "campaigns", id);
      await updateDoc(campRef, { status: newStatus });
    } catch (error) {
      console.error("Durum güncellenirken hata:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm(`"${title}" kampanyasını silmek istediğinize emin misiniz?`)) {
      try {
        await deleteDoc(doc(db, "campaigns", id));
      } catch (error) {
        console.error("Silme hatası:", error);
      }
    }
  };

  return (
    <div className="bg-slate-900/20 border border-slate-800/60 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 group">
      <div className="relative h-44 bg-slate-950">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border ${
            status === 'Aktif' 
            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
            : 'bg-slate-900 text-slate-500 border-slate-800'
          }`}>
            {status}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div>
          <h4 className="text-base font-bold text-slate-100 tracking-tight">{title}</h4>
          <div className="flex items-center gap-2 text-slate-500 mt-1">
            <Clock size={12} />
            <p className="text-[10px] font-medium uppercase tracking-tight">{period}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-800/50">
          <div>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block mb-0.5">Etkileşim</span>
            <p className="text-sm font-bold text-white">{clicks}</p>
          </div>
          <div className="border-l border-slate-800/50 pl-4">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block mb-0.5">Konum</span>
            <p className="text-sm font-bold text-slate-300">Ana Slider</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => onEdit({ id, title, image, status, clicks, period })}
            className="flex-1 flex justify-center items-center py-2 bg-slate-800/40 hover:bg-indigo-500/10 rounded-xl text-slate-400 hover:text-indigo-400 transition-all border border-slate-800/60"
          >
            <Edit2 size={14} />
          </button>
          <button 
            onClick={toggleStatus}
            title={status === 'Aktif' ? 'Pasif Yap' : 'Aktif Yap'}
            className={`flex-1 flex justify-center items-center py-2 rounded-xl border border-slate-800/60 transition-all ${
              status === 'Aktif' 
              ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' 
              : 'bg-slate-800/40 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <Power size={14} />
          </button>
          <button 
            onClick={handleDelete}
            className="px-3 flex justify-center items-center py-2 bg-slate-800/40 hover:bg-rose-500/10 rounded-xl text-slate-400 hover:text-rose-500 transition-all border border-slate-800/60"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};