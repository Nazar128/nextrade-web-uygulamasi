"use client";
import React, { useState, useEffect } from 'react';
import { db, storage } from "@/lib/firebase";
import { collection, onSnapshot, addDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Plus, Search, X, Loader2, UploadCloud } from 'lucide-react';
import { CampaignCard } from '@/components/CampaignCard';
import AboutSettings from '@/components/AboutSettings';
import LegalManager from '@/components/LegalManager';

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'about' | 'support'>('campaigns');
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
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-500/50" size={32} />
    </div>
  );

  return (
    <div className="p-4 sm:p-8 min-h-screen max-w-6xl mx-auto text-slate-400 font-sans selection:bg-blue-500/30">
      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-12 gap-6">
        <div className="space-y-1 w-full sm:w-auto">
          <h1 className="text-4xl font-bold text-blue-600 tracking-tight">İÇERİK <span className='text-slate-500 text-3xl'>YÖNETİMİ</span></h1>
          <div className="flex items-center gap-4 text-[12px] font-bold tracking-[0.2em] uppercase">
            <button 
              onClick={() => setActiveTab('campaigns')}
              className={`transition-all ${activeTab === 'campaigns' ? 'text-blue-500' : 'hover:text-slate-200'}`}
            >
              Kampanyalar
            </button>
            <span className="text-slate-800">/</span>
            <button 
              onClick={() => setActiveTab('about')}
              className={`transition-all ${activeTab === 'about' ? 'text-blue-500' : 'hover:text-slate-200'}`}
            >
              Hakkımızda
            </button>
            <span className="text-slate-800">/</span>
            <button 
              onClick={() => setActiveTab('support')}
              className={`transition-all ${activeTab === 'support' ? 'text-blue-500' : 'hover:text-slate-200'}`}
            >
              Destek
            </button>
          </div>
        </div>

        {activeTab === 'campaigns' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white text-black text-[11px] font-bold px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all active:scale-95"
          >
            <Plus size={14} strokeWidth={3} /> YENİ EKLE
          </button>
        )}
      </div>

      <div className="w-full transition-all duration-500">
        {activeTab === 'campaigns' ? (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="relative max-w-xs">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-700" size={14} />
              <input 
                type="text" 
                placeholder="Kampanya ara..." 
                className="w-full bg-transparent border-b border-slate-800 py-2 pl-6 pr-4 text-xs outline-none focus:border-blue-500/50 transition-colors text-slate-200" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((camp) => (
                <CampaignCard 
                  key={camp.id} 
                  {...camp} 
                  onEdit={() => handleEditOpen(camp)} 
                />
              ))}
            </div>
          </div>
        ) : activeTab === 'about' ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-full overflow-hidden">
             <div className="bg-slate-900/20 border border-white/5 rounded-[2rem] p-6 sm:p-10">
                <AboutSettings />
             </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-full overflow-hidden">
             <div className="bg-slate-900/20 border border-white/5 rounded-[2rem] p-6 sm:p-10 text-white">
                <LegalManager />
             </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40">
          <div className="absolute inset-0" onClick={closeModal}></div>
          <div className="relative w-full max-w-lg bg-[#0c0e12] border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 pb-4 flex justify-between items-center border-b border-white/5">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">
                {editingId ? "Kampanya Düzenle" : "Yeni Kampanya"}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500">
                <X size={18} />
              </button>
            </div>

            <form className="p-8 space-y-6" onSubmit={handleSave}>
              <div className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 uppercase ml-1">Başlık</label>
                  <input required type="text" className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-4 py-3 text-sm focus:border-blue-500 outline-none text-white transition-colors" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase ml-1">İndirim %</label>
                    <input type="text" className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-4 py-3 text-sm focus:border-blue-500 outline-none text-white transition-colors" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase ml-1">Dönem</label>
                    <input type="text" className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-4 py-3 text-sm focus:border-blue-500 outline-none text-white transition-colors" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 uppercase ml-1">Açıklama</label>
                  <textarea className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-4 py-3 text-sm focus:border-blue-500 outline-none text-white h-24 resize-none transition-colors" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
              </div>

              <label className="group relative flex flex-col items-center justify-center w-full h-32 bg-slate-950/50 border-2 border-dashed border-white/5 rounded-[2rem] cursor-pointer hover:border-blue-500/40 transition-all overflow-hidden">
                {(selectedFile || existingImageUrl) ? (
                  <img 
                    src={selectedFile ? URL.createObjectURL(selectedFile) : existingImageUrl!} 
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" 
                    alt="Preview"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <UploadCloud size={20} className="text-slate-700" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase">Görsel Yükle</span>
                  </div>
                )}
                <input type="file" className="hidden" onChange={e => setSelectedFile(e.target.files?.[0] || null)} accept="image/*" />
              </label>

              <button disabled={uploading} className="w-full bg-white text-black font-bold py-4 rounded-full text-[11px] tracking-widest hover:bg-blue-600 hover:text-white transition-all flex justify-center items-center">
                {uploading ? <Loader2 className="animate-spin" size={16} /> : (editingId ? "GÜNCELLE" : "YAYINLA")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}