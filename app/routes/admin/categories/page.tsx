"use client";
import { useState, useEffect } from 'react';
import { db } from "@/lib/firebase";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Plus, Trash2, ChevronRight, Layers, FolderTree, X, Loader2, Send } from 'lucide-react';

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCatTitle, setNewCatTitle] = useState("");
  const [activeSubInput, setActiveSubInput] = useState<string | null>(null);
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      const catData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(catData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const handleAddCategory = async () => {
    if (!newCatTitle.trim()) return;
    try {
      await addDoc(collection(db, "categories"), {
        title: newCatTitle,
        subCategories: [],
        createdAt: new Date()
      });
      setNewCatTitle("");
      setIsModalOpen(false);
    } catch (error) { console.error(error); }
  };
  const handleAddSubCategory = async (parentId: string) => {
    if (!subTitle.trim()) return;
    try {
      const catRef = doc(db, "categories", parentId);
      await updateDoc(catRef, {
        subCategories: arrayUnion({
          id: Date.now().toString(),
          title: subTitle
        })
      });
      setSubTitle("");
      setActiveSubInput(null);
    } catch (error) { console.error(error); }
  };

  const handleDeleteSubCategory = async (parentId: string, subItem: any) => {
    if (confirm(`"${subItem.title}" alt kategorisini silmek istediğinize emin misiniz?`)) {
      try {
        const catRef = doc(db, "categories", parentId);
        await updateDoc(catRef, {
          subCategories: arrayRemove(subItem)
        });
      } catch (error) { console.error(error); }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm("Ana kategoriyi ve tüm alt dallarını silmek üzeresiniz. Onaylıyor musunuz?")) {
      await deleteDoc(doc(db, "categories", id));
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <Loader2 className="animate-spin text-indigo-500" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-900 pb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
              <FolderTree className="text-indigo-500" size={32} />
              Kategori Yönetimi
            </h1>
            <p className="text-gray-500 mt-2">Sistem hiyerarşisini ve ürün dallarını merkezi olarak yönetin.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-xl shadow-indigo-500/10"
          >
            <Plus size={20} /> ANA KATEGORİ EKLE
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-6 hover:border-indigo-500/30 transition-all group flex flex-col">
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-950 rounded-2xl flex items-center justify-center text-indigo-500 border border-gray-800">
                    <Layers size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{cat.title}</h3>
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                      {cat.subCategories?.length || 0} Alt Kategori
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-2 text-gray-700 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18}/>
                </button>
              </div>
              <div className="flex-1 space-y-2 bg-gray-950/40 p-4 rounded-[2rem] border border-gray-800/50 mb-4">
                {cat.subCategories?.map((sub: any) => (
                  <div key={sub.id} className="flex justify-between items-center group/sub hover:bg-gray-900 p-2.5 rounded-xl transition-all border border-transparent hover:border-gray-800">
                    <div className="flex items-center gap-2 text-gray-400">
                      <ChevronRight size={14} className="text-indigo-500" />
                      <span className="text-sm font-medium">{sub.title}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteSubCategory(cat.id, sub)}
                      className="opacity-0 group-hover/sub:opacity-100 p-1.5 text-gray-600 hover:text-red-400 transition-all"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              {activeSubInput === cat.id ? (
                <div className="flex gap-2 animate-in slide-in-from-top-2">
                  <input 
                    autoFocus
                    type="text"
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSubCategory(cat.id)}
                    placeholder="Alt kategori adı..."
                    className="flex-1 bg-gray-950 border border-indigo-500/50 p-3 rounded-xl text-sm outline-none"
                  />
                  <button 
                    onClick={() => handleAddSubCategory(cat.id)}
                    className="bg-indigo-600 p-3 rounded-xl hover:bg-indigo-500"
                  >
                    <Send size={16} />
                  </button>
                  <button 
                    onClick={() => setActiveSubInput(null)}
                    className="bg-gray-800 p-3 rounded-xl hover:bg-gray-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setActiveSubInput(cat.id)}
                  className="w-full py-3 border border-dashed border-gray-800 rounded-xl text-[10px] font-black text-gray-500 hover:border-indigo-500/50 hover:text-indigo-400 transition-all uppercase tracking-widest"
                >
                  + Yeni Alt Kategori
                </button>
              )}
            </div>
          ))}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-[2.5rem] p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Yeni Kategori</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X /></button>
              </div>
              <input 
                type="text" 
                placeholder="Örn: Ev & Yaşam" 
                className="w-full bg-gray-950 border border-gray-800 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={newCatTitle}
                onChange={(e) => setNewCatTitle(e.target.value)}
              />
              <button 
                onClick={handleAddCategory}
                className="w-full bg-indigo-600 py-4 rounded-2xl font-black hover:bg-indigo-500 transition-all shadow-lg"
              >
                KATEGORİYİ OLUŞTUR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}