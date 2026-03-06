"use client";
import React, { useState, useEffect } from 'react';
import { db, storage } from "@/lib/firebase";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Plus, Search, Filter, X, Image as ImageIcon, Loader2, UploadCloud } from 'lucide-react';
import { CampaignCard } from '@/components/CampaignCard';

export default function CMSPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    period: "",
    status: "Aktif",
    description: "",
    discount: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "campaigns"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCampaigns(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const handleEditOpen = (camp: any) => {
    setEditingId(camp.id);
    setFormData({
      title: camp.title,
      period: camp.period,
      status: camp.status,
      description: camp.description || "",
      discount: camp.discount || ""
    });
    setExistingImageUrl(camp.image);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", period: "", status: "Aktif", description: "", discount: "" });
    setSelectedFile(null);
    setExistingImageUrl(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    setUploading(true);
    try {
      let url = existingImageUrl;
      if (selectedFile) {
        const storageRef = ref(storage, `campaigns/${Date.now()}_${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);
        url = await getDownloadURL(storageRef);
      }

      const campaignData = {
        ...formData,
        image: url,
        updatedAt: new Date()
      };

      if (editingId) {
        await updateDoc(doc(db, "campaigns", editingId), campaignData);
      } else {
        await addDoc(collection(db, "campaigns"), {
          ...campaignData,
          clicks: "0",
          createdAt: new Date()
        });
      }

      closeModal();
    } catch (error) {
      console.error("İşlem sırasında hata:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="p-4 min-h-screen mx-auto text-slate-300 font-sans relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 pt-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-600 tracking-tight leading-none">
            <span className='text-4xl text-blue-700 '>İÇERİK</span> YÖNETİMİ
          </h1>
          <p className="text-xs text-slate-500 mt-2">Platform görsellerini ve aktif kampanyaları kontrol edin.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-lg active:scale-95"
        >
          <Plus size={18} strokeWidth={3} /> YENİ İÇERİK EKLE
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
          <input type="text" placeholder="Kampanya ara..." className="w-full bg-slate-900/40 border border-slate-800/60 rounded-xl py-2.5 pl-10 pr-4 text-xs outline-none focus:border-blue-700/50 transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <CampaignCard 
            key={camp.id} 
            {...camp} 
            onEdit={() => handleEditOpen(camp)} 
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {editingId ? "Kampanyayı Düzenle" : "Yeni Kampanya Oluştur"}
              </h3>
              <button onClick={closeModal}><X size={20} className="text-slate-500" /></button>
            </div>

            <form className="p-6 space-y-4" onSubmit={handleSave}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Kampanya Başlığı</label>
                  <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-700 outline-none text-white" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">İndirim Oranı (%)</label>
                  <input type="text" placeholder="Örn: 20" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-700 outline-none text-white" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Geçerlilik</label>
                  <input type="text" placeholder="01.03 - 31.03" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-700 outline-none text-white" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Açıklama</label>
                <textarea className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-700 outline-none text-white h-20 resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Kampanya Görseli</label>
                <label className="flex flex-col items-center justify-center w-full h-32 bg-slate-950 border-2 border-dashed border-slate-800 rounded-2xl cursor-pointer hover:border-blue-700/50 transition-all overflow-hidden relative">
                  {(selectedFile || existingImageUrl) ? (
                    <img 
                      src={selectedFile ? URL.createObjectURL(selectedFile) : existingImageUrl!} 
                      className="w-full h-full object-cover opacity-60" 
                    />
                  ) : (
                    <div className="flex flex-col items-center"><UploadCloud className="text-slate-600 mb-2" /><span className="text-[10px] text-slate-500">Resim Seç</span></div>
                  )}
                  <input type="file" className="hidden" onChange={e => setSelectedFile(e.target.files?.[0] || null)} accept="image/*" />
                </label>
              </div>

              <button disabled={uploading} className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex justify-center items-center">
                {uploading ? <Loader2 className="animate-spin" /> : (editingId ? "GÜNCELLE" : "KAMPANYAYI YAYINLA")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}