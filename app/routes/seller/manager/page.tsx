"use client";
import { useState } from 'react';
import ProductList from '@/components/ProductList';
import MultiStepForm from '@/components/MultiStepForm';
import ManagerStats from '@/components/ManagerStats';
import StoreSettings from '@/components/StoreSettings';
import { Plus, X, LayoutDashboard } from 'lucide-react';

export default function SellerManagerPage() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'settings'>('inventory');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const openAddForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: any) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen  text-gray-100 flex flex-col mx-auto p-6 md:p-12">
      <div className="w-full max-w-5xl space-y-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-gray-900 pb-10">
           <h1 className="text-4xl font-bold text-blue-600 tracking-tighter flex items-center gap-3">
             <LayoutDashboard className="text-indigo-500" size={32} /> YÖNETİM <span className='text-slate-600 text-3xl'>PANELİ</span>
           </h1>
           <div className="flex bg-gray-900 p-1.5 rounded-2xl border border-gray-800">
             <button onClick={() => {setActiveTab('inventory'); setIsFormOpen(false);}} className={`px-6 py-2.5 rounded-xl font-bold text-sm ${activeTab === 'inventory' ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-500'}`}>Envanter</button>
             <button onClick={() => {setActiveTab('settings'); setIsFormOpen(false);}} className={`px-6 py-2.5 rounded-xl font-bold text-sm ${activeTab === 'settings' ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-500'}`}>Ayarlar</button>
           </div>
        </div>

        {activeTab === 'inventory' && (
          <div className="space-y-8">
            {!isFormOpen ? (
              <>
                <div className="flex justify-between items-end">
                  <ManagerStats />
                  <button onClick={openAddForm} className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-black hover:bg-indigo-500 flex items-center gap-2 transition-all">
                    <Plus size={24} /> YENİ ÜRÜN
                  </button>
                </div>
                <ProductList onEdit={openEditForm} /> 
              </>
            ) : (
              <div className="animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-4 uppercase tracking-tighter">
                      {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
                  </h2>
                  <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-red-400 flex items-center gap-2 font-bold">
                    <X size={20} /> İPTAL
                  </button>
                </div>
                <MultiStepForm initialData={editingProduct} onSuccess={() => setIsFormOpen(false)} />
              </div>
            )}
          </div>
        )}
        {activeTab === 'settings' && <StoreSettings />}
      </div>
    </div>
  );
}