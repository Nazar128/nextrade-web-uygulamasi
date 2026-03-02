"use client";
import { useState } from 'react';
import ProductList from '@/components/ProductList';
import MultiStepForm from '@/components/MultiStepForm';
import ManagerStats from '@/components/ManagerStats';
import StoreSettings from '@/components/StoreSettings';
import Notifications from '@/components/Notifications';
import { Plus, X, Box, Settings, LayoutDashboard } from 'lucide-react';

export default function SellerManagerPage() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'settings'>('inventory');
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col mx-auto p-6 md:p-12">
      
      <div className="w-full max-w-5xl space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-gray-900 pb-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
              <LayoutDashboard className="text-indigo-500" size={32} />
              Yönetim Paneli
            </h1>
            <p className="text-gray-500 font-medium">Mağazanızın tüm operasyonunu buradan yönetin.</p>
          </div>
          <Notifications />

          <div className="flex bg-gray-900 p-1.5 rounded-2xl border border-gray-800 shadow-inner">
            <button 
              onClick={() => { setActiveTab('inventory'); setIsFormOpen(false); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'inventory' 
                ? 'bg-gray-800 text-white shadow-lg border border-gray-700' 
                : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Box size={18} /> Envanter
            </button>
            <button 
              onClick={() => { setActiveTab('settings'); setIsFormOpen(false); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'settings' 
                ? 'bg-gray-800 text-white shadow-lg border border-gray-700' 
                : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Settings size={18} /> Ayarlar
            </button>
          </div>
        </div>

        <div className="relative min-h-[600px]">
          {activeTab === 'inventory' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              
              {!isFormOpen ? (
                <>
                  <div className="flex justify-between items-end ">
                    <ManagerStats />
                    <button 
                      onClick={() => setIsFormOpen(true)}
                      className="bg-indigo-600 text-white px-4 py-4 ml-2 rounded-2xl font-black hover:bg-indigo-500 transition-all shadow-[0_10px_25px_-5px_rgba(79,70,229,0.5)] flex items-center gap-2 group"
                    >
                      <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300 " />
                      EKLE
                    </button>
                  </div>
                  <ProductList />
                </>
              ) : (
                <div className="animate-in zoom-in-95 duration-300">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-4 uppercase tracking-tighter">Yeni Ürün Ekleme</h2>
                    <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-red-400 flex items-center gap-2 font-bold transition-colors">
                      <X size={20} /> İPTAL ET
                    </button>
                  </div>
                  <MultiStepForm onSuccess={() => setIsFormOpen(false)} />
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <StoreSettings />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}