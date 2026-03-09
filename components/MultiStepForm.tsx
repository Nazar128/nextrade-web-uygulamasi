"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronRight, ChevronLeft, Package, DollarSign, 
  Image as ImageIcon, CheckCircle2, Loader2, UploadCloud, 
  Clock, Palette, Hash, Users, FileText
} from 'lucide-react';
import { Categories } from '@/data/Categories'; 
import { db, storage, auth } from "@/lib/firebase";
import { doc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, User } from "firebase/auth";

interface MultiStepFormProps {
  onSuccess: () => void;
  initialData?: any;
}

export default function MultiStepForm({ onSuccess, initialData }: MultiStepFormProps) {
  const [step, setStep] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(initialData?.sizes || []);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    categoryId: initialData?.categoryId || '',
    subCategoryId: initialData?.subCategoryId || '',
    price: initialData?.price?.toString() || '',
    oldPrice: initialData?.oldPrice?.toString() || '',
    stock: initialData?.stock?.toString() || '',
    description: initialData?.description || '',
    brand: initialData?.brand || '',
    color: initialData?.color || '',
    gender: initialData?.gender || 'Unisex',
    pattern: initialData?.pattern || '', 
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const categoryTitle = useMemo(() => {
    const selectedCat = Categories.find(c => c.id === Number(formData.categoryId));
    return selectedCat ? selectedCat.title : "";
  }, [formData.categoryId]);

  const activeSubCategories = useMemo(() => {
    const selectedCat = Categories.find(c => c.id === Number(formData.categoryId));
    return selectedCat ? selectedCat.subCategories : [];
  }, [formData.categoryId]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const handleFinalSubmit = async () => {
    if (!currentUser) return alert("Lütfen giriş yapın.");
    if (!initialData && !imageFile) return alert("Lütfen bir ürün görseli yükleyin!");

    setIsUploading(true);
    setUploadProgress(0);

    try {
      let imageUrl = initialData?.imageUrl || "";

      if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name.replace(/\s+/g, '_')}`;
        const storageRef = ref(storage, `products/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snap) => setUploadProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
            reject,
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(true);
            }
          );
        });
      }

      const productPayload = {
        ...formData,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
        stock: Number(formData.stock),
        category: categoryTitle,
        sizes: selectedSizes,
        imageUrl: imageUrl,
        status: "pending", 
        isVerified: false,
        rating: 5,
        salesCount: 0,
        inStock: Number(formData.stock) > 0,
        slug: formData.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-'),
        updatedAt: serverTimestamp()
      };

      if (initialData?.id) {
        await updateDoc(doc(db, "products", initialData.id), productPayload);
      } else {
        await addDoc(collection(db, "products"), {
          ...productPayload,
          sellerId: currentUser.uid,
          sellerName: currentUser.displayName || "NexTrade Mağaza",
          createdAt: serverTimestamp()
        });
      }

      onSuccess();
    } catch (error) {
      console.error("Hata:", error);
      alert("İşlem sırasında bir hata oluştu.");
    } finally {
      setIsUploading(false);
    }
  };

  const steps = [
    { id: 1, name: "Temel Bilgi", icon: <Package size={18}/> },
    { id: 2, name: "Detaylar", icon: <Hash size={18}/> },
    { id: 3, name: "Medya & Onay", icon: <Clock size={18}/> }
  ];

  if (isAuthLoading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-indigo-500" size={40} /></div>;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl max-w-3xl mx-auto text-gray-100">
      {/* Stepper Header */}
      <div className="flex items-center justify-between mb-12 relative max-w-md mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-800 -translate-y-1/2 z-0" />
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${step >= s.id ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/20' : 'bg-gray-900 border-gray-800 text-gray-600'}`}>
              {step > s.id ? <CheckCircle2 size={24} /> : s.icon}
            </div>
            <span className={`text-[10px] uppercase font-black tracking-tighter ${step >= s.id ? 'text-indigo-400' : 'text-gray-600'}`}>{s.name}</span>
          </div>
        ))}
      </div>

      <div className="min-h-[420px]">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-2"><FileText className="text-indigo-500"/> Ürün Bilgileri</h2>
            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Ürün Başlığı (Örn: Oversize Pamuklu Tişört)" className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl focus:border-indigo-500 outline-none transition-all" />
            <div className="grid grid-cols-2 gap-5">
              <select value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value, subCategoryId: ''})} className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl outline-none focus:border-indigo-500">
                <option value="">Kategori Seçin</option>
                {Categories.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
              </select>
              <select disabled={!formData.categoryId} value={formData.subCategoryId} onChange={(e) => setFormData({...formData, subCategoryId: e.target.value})} className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl outline-none disabled:opacity-30 focus:border-indigo-500">
                <option value="">Alt Kategori</option>
                {activeSubCategories.map(sub => <option key={sub.id} value={sub.id}>{sub.title}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <input type="text" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} placeholder="Marka" className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl focus:border-indigo-500 outline-none" />
              <div className="relative">
                <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full p-4 pl-12 bg-gray-950 border border-gray-800 rounded-2xl outline-none focus:border-indigo-500">
                  <option value="Unisex">Unisex</option>
                  <option value="Erkek">Erkek</option>
                  <option value="Kadın">Kadın</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-2"><DollarSign className="text-indigo-500"/> Fiyat & Varyantlar</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 ml-2 uppercase font-bold">Fiyat</label>
                <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="0.00 ₺" className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl font-bold text-indigo-400 focus:border-indigo-500 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 ml-2 uppercase font-bold">Eski Fiyat</label>
                <input type="number" value={formData.oldPrice} onChange={(e) => setFormData({...formData, oldPrice: e.target.value})} placeholder="İndirimli" className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl text-gray-500 line-through outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 ml-2 uppercase font-bold">Stok</label>
                <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} placeholder="Adet" className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl focus:border-indigo-500 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
               <div className="relative">
                <Palette size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} placeholder="Renk (Örn: Mavi)" className="w-full p-4 pl-12 bg-gray-950 border border-gray-800 rounded-2xl focus:border-indigo-500 outline-none" />
               </div>
               <div className="relative">
                <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" value={formData.pattern} onChange={(e) => setFormData({...formData, pattern: e.target.value})} placeholder="Desen (Düz, Çizgili...)" className="w-full p-4 pl-12 bg-gray-950 border border-gray-800 rounded-2xl focus:border-indigo-500 outline-none" />
               </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] text-gray-500 ml-2 uppercase font-bold">Mevcut Bedenler</label>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "36", "38", "40", "42", "Standart"].map(size => (
                  <button key={size} type="button" onClick={() => toggleSize(size)} className={`px-5 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${selectedSizes.includes(size) ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-gray-950 border-gray-800 text-gray-500 hover:border-gray-600'}`}>{size}</button>
                ))}
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2"><ImageIcon className="text-indigo-500"/> Ürün Görseli</h2>
            
            <div className="relative border-2 border-dashed border-gray-800 rounded-[2.5rem] p-12 bg-gray-950/50 hover:bg-gray-900/50 transition-all cursor-pointer group">
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              {imageFile ? (
                <div className="flex flex-col items-center">
                  <img src={URL.createObjectURL(imageFile)} className="w-24 h-24 object-cover rounded-2xl border-2 border-emerald-500 mb-2" alt="Preview" />
                  <p className="text-emerald-400 font-bold text-xs">{imageFile.name}</p>
                </div>
              ) : initialData?.imageUrl ? (
                <img src={initialData.imageUrl} className="w-24 h-24 object-cover rounded-2xl mx-auto border border-indigo-500" />
              ) : (
                <div className="flex flex-col items-center">
                  <UploadCloud className="text-indigo-500 mb-2 group-hover:scale-110 transition-transform" size={40} />
                  <p className="text-gray-400 text-sm">Görsel Seçmek İçin Tıklayın</p>
                </div>
              )}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-start gap-3 text-left">
              <Clock className="text-amber-500 shrink-0 mt-0.5" size={18} />
              <p className="text-[11px] text-amber-200/80 leading-relaxed italic">
                Ürününüzü "Onaya Gönder" dediğinizde admin panelinde <strong>beklemede</strong> olarak görünecektir. Onay sonrası yayına alınır.
              </p>
            </div>

            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Ürün Açıklaması..." className="w-full p-5 bg-gray-950 border border-gray-800 rounded-[1.5rem] focus:border-indigo-500 outline-none h-32 resize-none text-sm" />
          </div>
        )}
      </div>

      <div className="flex justify-between mt-10 pt-8 border-t border-gray-800">
        <button onClick={() => setStep(s => s - 1)} disabled={step === 1 || isUploading} className={`flex items-center gap-2 px-6 py-3 font-bold transition-all ${step === 1 ? 'invisible' : 'text-gray-500 hover:text-white'}`}><ChevronLeft size={20}/> Geri</button>
        <button onClick={step === 3 ? handleFinalSubmit : () => setStep(s => s + 1)} disabled={isUploading} className="bg-indigo-600 min-w-[200px] text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 active:scale-95">
          {isUploading ? (
            <><Loader2 className="animate-spin" size={20} /> %{uploadProgress}</>
          ) : (
            <>{step === 3 ? 'ONAYA GÖNDER' : 'İLERLE'} <ChevronRight size={20}/></>
          )}
        </button>
      </div>
    </div>
  );
}