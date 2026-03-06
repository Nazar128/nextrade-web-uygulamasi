"use client";
import React, { useState, useEffect, useRef } from 'react';
import { db, storage } from "@/lib/firebase";
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Award, Plus, Trash2, Edit3, Search, Globe, Image as ImageIcon, X, Loader2, UploadCloud } from 'lucide-react';

export default function AdminBrandsPage() {
  const [brandsList, setBrandsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newBrand, setNewBrand] = useState({ name: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = query(collection(db, "brands"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBrandsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand.name || !selectedFile) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `brands/${Date.now()}_${selectedFile.name}`);
      const uploadResult = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      await addDoc(collection(db, "brands"), {
        name: newBrand.name,
        logo: downloadURL,
        createdAt: new Date(),
        isVerified: true
      });

      setNewBrand({ name: "" });
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Yükleme hatası:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen  text-gray-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-900 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><Award size={24} /></div>
              <h1 className="text-4xl font-black text-white tracking-tighter">Marka Portföyü</h1>
            </div>
            <p className="text-gray-500 font-medium">Sistemde kayıtlı logoları yönetin.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-white text-black px-8 py-3.5 rounded-2xl font-black hover:bg-indigo-500 hover:text-white transition-all shadow-xl flex items-center gap-2">
            <Plus size={20} /> YENİ MARKA
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {brandsList.map((brand) => (
            <div key={brand.id} className="group bg-gray-900 border border-gray-800 rounded-[2.5rem] p-3 hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-950 border border-gray-800 rounded-[2rem] flex items-center justify-center p-3 mb-6 group-hover:scale-110 transition-all duration-500">
                  <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain text-white filter invert brightness-200 contrast-200" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{brand.name}</h3>
                <span className="text-[10px] text-gray-600 font-black uppercase mt-1 tracking-widest flex items-center gap-1">
                  <Globe size={10} /> Verified
                </span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <button onClick={() => deleteDoc(doc(db, "brands", brand.id))} className="p-3 bg-gray-800 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div onClick={() => setIsModalOpen(true)} className="border-2 border-dashed border-gray-900 rounded-[2.5rem] p-6 flex flex-col items-center justify-center gap-4 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all cursor-pointer group h-[260px]">
            <Plus size={32} className="text-gray-700 group-hover:text-indigo-500" />
            <span className="text-xs font-black text-gray-600 uppercase tracking-widest">Marka Tanımla</span>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 w-full max-w-lg rounded-[3rem] p-10 space-y-8 animate-in zoom-in-95">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Marka Ekle</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X size={32} /></button>
              </div>
              <form onSubmit={handleAddBrand} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Marka Adı</label>
                  <input required type="text" className="w-full bg-gray-950 border border-gray-800 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" value={newBrand.name} onChange={(e) => setNewBrand({ name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Marka Logosu</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-video bg-gray-950 border-2 border-dashed border-gray-800 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/50 transition-all overflow-hidden relative group"
                  >
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} className="w-full h-full object-contain p-4" />
                        <div className="absolute inset-0 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <UploadCloud className="text-white" />
                        </div>
                      </>
                    ) : (
                      <>
                        <ImageIcon size={40} className="text-gray-700 mb-2" />
                        <span className="text-xs text-gray-500 font-bold">Resim Seç veya Sürükle</span>
                      </>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*" />
                </div>
                <button 
                  disabled={uploading}
                  type="submit" 
                  className="w-full bg-indigo-600 py-5 rounded-2xl font-black hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {uploading ? <Loader2 className="animate-spin" /> : "KAYDET VE YÜKLE"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}