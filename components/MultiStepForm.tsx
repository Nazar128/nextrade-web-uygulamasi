"use client";
import React, { useState, useMemo } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Package, 
  DollarSign, 
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { Categories } from '@/data/Categories'; 

interface MultiStepFormProps {
  onSuccess: () => void;
}

export default function MultiStepForm({ onSuccess }: MultiStepFormProps) {
  const [step, setStep] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    subCategoryId: '',
    price: '',
    stock: '',
    description: ''
  });

  const steps = [
    { id: 1, name: "Ürün Bilgisi", icon: <Package size={18}/> },
    { id: 2, name: "Fiyat & Beden", icon: <DollarSign size={18}/> },
    { id: 3, name: "Medya", icon: <ImageIcon size={18}/> }
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "36", "38", "40", "42", "Standart"];

  const activeSubCategories = useMemo(() => {
    const selectedCat = Categories.find(c => c.id === Number(formData.categoryId));
    return selectedCat ? selectedCat.subCategories : [];
  }, [formData.categoryId]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl max-w-3xl mx-auto text-gray-100">
      
      <div className="flex items-center justify-between mb-12 relative max-w-md mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-800 -translate-y-1/2 z-0" />
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
              step >= s.id 
              ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] rotate-3' 
              : 'bg-gray-900 border-gray-800 text-gray-600'
            }`}>
              {step > s.id ? <CheckCircle2 size={24} /> : s.icon}
            </div>
            <span className={`text-[10px] uppercase tracking-[0.2em] font-black ${step >= s.id ? 'text-indigo-400' : 'text-gray-600'}`}>
              {s.name}
            </span>
          </div>
        ))}
      </div>

      <div className="min-h-[400px]">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Temel Bilgiler</h2>
              <p className="text-gray-500 text-sm">Ürününüzün ismini ve kategorisini belirleyin.</p>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block tracking-widest">Ürün Başlığı</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Örn: Slim Fit Pamuklu Jean" 
                  className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-200 placeholder:text-gray-700" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block tracking-widest">Ana Kategori</label>
                  <select 
                    value={formData.categoryId}
                    onChange={(e) => setFormData({...formData, categoryId: e.target.value, subCategoryId: ''})}
                    className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-300 appearance-none"
                  >
                    <option value="">Seçiniz</option>
                    {Categories.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block tracking-widest">Alt Kategori</label>
                  <select 
                    disabled={!formData.categoryId}
                    value={formData.subCategoryId}
                    onChange={(e) => setFormData({...formData, subCategoryId: e.target.value})}
                    className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-20 text-gray-300 appearance-none"
                  >
                    <option value="">Seçiniz</option>
                    {activeSubCategories.map(sub => <option key={sub.id} value={sub.id}>{sub.title}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Satış & Varyant</h2>
              <p className="text-gray-500 text-sm">Fiyatlandırma ve stok seçeneklerini düzenleyin.</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block tracking-widest">Fiyat</label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-indigo-500 font-bold">₺</span>
                  <input type="number" placeholder="0.00" className="w-full p-4 pl-10 bg-gray-950 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block tracking-widest">Toplam Stok</label>
                <input type="number" placeholder="0" className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-3 block tracking-widest">Beden Seçenekleri</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                      selectedSizes.includes(size)
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                      : 'bg-gray-950 border-gray-800 text-gray-500 hover:border-gray-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white">Ürün Görselleri</h2>
              <p className="text-gray-500 text-sm">Müşterilerin dikkatini çekecek yüksek kaliteli kareler yükleyin.</p>
            </div>
            
            <div className="group relative border-2 border-dashed border-gray-800 rounded-[2rem] p-16 hover:border-indigo-500/50 transition-all bg-gray-950/50 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gray-800 transition-all">
                  <ImageIcon className="text-indigo-500" size={36} />
                </div>
                <p className="text-gray-300 font-semibold tracking-wide">Görselleri buraya sürükleyin</p>
                <p className="text-gray-600 text-xs mt-2 uppercase tracking-widest">Veya dosya seçmek için tıklayın</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-12 pt-8 border-t border-gray-800">
        <button 
          onClick={prevStep} 
          className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all ${
            step === 1 ? 'invisible' : 'text-gray-500 hover:text-white hover:bg-gray-800'
          }`}
        >
          <ChevronLeft size={20} /> Geri
        </button>
        
        <button 
          onClick={step === 3 ? onSuccess : nextStep} 
          className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-500 transition-all flex items-center gap-3 shadow-[0_15px_30px_-10px_rgba(79,70,229,0.6)] active:scale-95"
        >
          {step === 3 ? 'ÜRÜNÜ YAYINLA' : 'SONRAKİ ADIM'} 
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}