"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronRight, ChevronLeft, Package, DollarSign, 
  Image as ImageIcon, CheckCircle2, Loader2, UploadCloud, FileCheck 
} from 'lucide-react';
import { Categories } from '@/data/Categories'; 
import { db, storage, auth } from "@/lib/firebase";
import { doc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, User } from "firebase/auth";
import { saveLog } from "@/lib/logger";

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
    stock: initialData?.stock?.toString() || '',
    description: initialData?.description || ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const activeSubCategories = useMemo(() => {
    const selectedCat = Categories.find(c => c.id === Number(formData.categoryId));
    return selectedCat ? selectedCat.subCategories : [];
  }, [formData.categoryId]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const handleFinalSubmit = async () => {
    if (!currentUser) return alert("Lütfen giriş yapın.");
    if (!initialData && !imageFile) return alert("Lütfen bir görsel seçin!");

    setIsUploading(true);
    setUploadProgress(0);

    try {
      let imageUrl = initialData?.imageUrl || "";

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}_${currentUser.uid}.${fileExt}`;
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
        title: formData.title,
        categoryId: formData.categoryId,
        subCategoryId: formData.subCategoryId,
        price: Number(formData.price),
        stock: Number(formData.stock),
        description: formData.description || "",
        sizes: selectedSizes,
        imageUrl: imageUrl,
        status: "pending",
        updatedAt: serverTimestamp()
      };

      if (initialData?.id) {
        await updateDoc(doc(db, "products", initialData.id), productPayload);
        await saveLog('UPDATE_PRODUCT', `${formData.title} güncellendi.`);
      } else {
        await addDoc(collection(db, "products"), {
          ...productPayload,
          sellerId: currentUser.uid,
          sellerName: currentUser.displayName || "Mağaza",
          createdAt: serverTimestamp()
        });
        await saveLog('CREATE_PRODUCT', `${formData.title} eklendi.`);
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("İşlem başarısız.");
    } finally {
      setIsUploading(false);
    }
  };

  const steps = [
    { id: 1, name: "Ürün Bilgisi", icon: <Package size={18}/> },
    { id: 2, name: "Fiyat & Beden", icon: <DollarSign size={18}/> },
    { id: 3, name: "Medya", icon: <ImageIcon size={18}/> }
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "36", "38", "40", "42", "Standart"];

  if (isAuthLoading) return <div className="p-20 text-center text-gray-500">Yükleniyor...</div>;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl max-w-3xl mx-auto text-gray-100">
      <div className="flex items-center justify-between mb-12 relative max-w-md mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-800 -translate-y-1/2 z-0" />
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${step >= s.id ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-gray-900 border-gray-800 text-gray-600'}`}>
              {step > s.id ? <CheckCircle2 size={24} /> : s.icon}
            </div>
            <span className={`text-[10px] uppercase font-black ${step >= s.id ? 'text-indigo-400' : 'text-gray-600'}`}>{s.name}</span>
          </div>
        ))}
      </div>

      <div className="min-h-[400px]">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Temel Bilgiler</h2>
            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Ürün Başlığı" className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            <div className="grid grid-cols-2 gap-5">
              <select value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value, subCategoryId: ''})} className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl outline-none">
                <option value="">Kategori Seçin</option>
                {Categories.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
              </select>
              <select disabled={!formData.categoryId} value={formData.subCategoryId} onChange={(e) => setFormData({...formData, subCategoryId: e.target.value})} className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl outline-none disabled:opacity-30">
                <option value="">Alt Kategori</option>
                {activeSubCategories.map(sub => <option key={sub.id} value={sub.id}>{sub.title}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Fiyat & Stok</h2>
            <div className="grid grid-cols-2 gap-6">
              <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="Fiyat (₺)" className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl" />
              <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} placeholder="Stok Adedi" className="w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl" />
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button key={size} type="button" onClick={() => toggleSize(size)} className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${selectedSizes.includes(size) ? 'bg-indigo-600 border-indigo-400' : 'bg-gray-950 border-gray-800 text-gray-500'}`}>{size}</button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Medya</h2>
            <div className="relative border-2 border-dashed border-gray-800 rounded-[2rem] p-16 bg-gray-950/50 flex flex-col items-center justify-center">
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              {imageFile ? (
                <div className="text-center"><FileCheck className="text-emerald-500 mx-auto mb-2" size={48} /><p className="text-emerald-400 font-bold">{imageFile.name}</p></div>
              ) : initialData?.imageUrl ? (
                <div className="text-center">
                    <img src={initialData.imageUrl} className="w-32 h-32 object-cover rounded-2xl mx-auto mb-2 border border-indigo-500" />
                    <p className="text-gray-400 text-xs">Değiştirmek için tıklayın</p>
                </div>
              ) : (
                <div className="text-center"><UploadCloud className="text-indigo-500 mx-auto mb-4" size={48} /><p className="text-gray-400">Görsel Seçin</p></div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-12 pt-8 border-t border-gray-800">
        <button onClick={() => setStep(s => s - 1)} disabled={step === 1 || isUploading} className={`flex items-center gap-2 px-6 py-3 font-bold ${step === 1 ? 'invisible' : 'text-gray-500 hover:text-white'}`}><ChevronLeft size={20}/> Geri</button>
        <button onClick={step === 3 ? handleFinalSubmit : () => setStep(s => s + 1)} disabled={isUploading} className="bg-indigo-600 min-w-[200px] text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-500 flex items-center justify-center gap-2">
          {isUploading ? <><Loader2 className="animate-spin" size={20} /> %{uploadProgress}</> : <>{step === 3 ? (initialData ? 'GÜNCELLE' : 'YAYINLA') : 'SONRAKİ'} <ChevronRight size={20}/></>}
        </button>
      </div>
    </div>
  );
}