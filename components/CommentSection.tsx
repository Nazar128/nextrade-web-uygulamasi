"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Star, Camera, ChevronDown, Loader2, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { db, auth, storage } from "@/lib/firebase";
import { 
  collection, query, where, getDocs, addDoc, 
  serverTimestamp, onSnapshot, doc, getDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

const CommentSection = ({ productId }: { productId: string }) => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [userRating, setUserRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [canReview, setCanReview] = useState(false);
  const [checkingOrder, setCheckingOrder] = useState(true);
  const [sending, setSending] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;
    const q = query(collection(db, "reviews"), where("productId", "==", productId.toString()));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsubscribe();
  }, [productId]);

  useEffect(() => {
    const checkEligibility = async () => {
      const user = auth.currentUser;
      if (!user || !productId) {
        setCanReview(false);
        setCheckingOrder(false);
        return;
      }

      try {
        const hasAlreadyReviewed = comments.some(c => c.userId === user.uid);
        if (hasAlreadyReviewed) {
          setCanReview(false);
          setCheckingOrder(false);
          return;
        }

        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid), where("status", "==", "delivered"));
        const snapshot = await getDocs(q);
        const hasBought = snapshot.docs.some(doc => 
          doc.data().items?.some((item: any) => String(item.id) === String(productId))
        );
        setCanReview(hasBought);
      } catch (error) {
        setCanReview(false);
      } finally {
        setCheckingOrder(false);
      }
    };
    checkEligibility();
  }, [productId, auth.currentUser, comments]);

  const maskName = (name: string) => {
    if (!name || name.trim() === "" || name === "Müşteri") return "G*** K***";
    const parts = name.trim().split(" ");
    return parts.map(p => p[0] + "*".repeat(Math.max(2, p.length - 1))).join(" ");
  };

  const handleAddReview = async () => {
    const user = auth.currentUser;
    if (!user || !canReview || userRating === 0 || !newComment.trim()) return;

    setSending(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      let realName = "Müşteri";
      
      if (userDocSnap.exists()) {
        realName = userDocSnap.data().displayName || "Müşteri";
      }

      let imageUrl = "";
      if (imageFile) {
        const sRef = ref(storage, `reviews/${productId}/${user.uid}_${Date.now()}`);
        await uploadBytes(sRef, imageFile);
        imageUrl = await getDownloadURL(sRef);
      }

      await addDoc(collection(db, "reviews"), {
        productId: productId.toString(),
        userId: user.uid,
        userName: realName, 
        rating: userRating,
        comment: newComment.trim(),
        reviewImage: imageUrl,
        date: new Date().toLocaleDateString('tr-TR'),
        createdAt: serverTimestamp(),
      });

      setNewComment("");
      setUserRating(0);
      setImageFile(null);
      setPreviewUrl(null);
      toast.success("Yorumunuz yayınlandı.");
    } catch (error) {
      toast.error("Hata oluştu.");
    } finally {
      setSending(false);
    }
  };

  const stats = useMemo(() => {
    if (comments.length === 0) return { total: 0, avg: "0.0" };
    const avg = comments.reduce((acc, curr) => acc + curr.rating, 0) / comments.length;
    return { total: comments.length, avg: avg.toFixed(1) };
  }, [comments]);

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      const tA = a.createdAt?.seconds || 0;
      const tB = b.createdAt?.seconds || 0;
      if (sortBy === 'newest') return tB - tA;
      if (sortBy === 'oldest') return tA - tB;
      if (sortBy === 'highest') return b.rating - a.rating;
      return a.rating - b.rating;
    });
  }, [comments, sortBy]);

  return (
    <div className="max-w-4xl w-full space-y-4">
      <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Değerlendirme</p>
          <p className="text-sm font-bold text-white">{stats.avg} / 5.0 <span className="text-slate-500 font-normal">({stats.total})</span></p>
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="bg-slate-800 text-slate-300 text-[11px] px-2 py-1.5 rounded-lg outline-none border border-slate-700">
          <option value="newest">En Yeni</option>
          <option value="oldest">En Eski</option>
          <option value="highest">En Yüksek</option>
          <option value="lowest">En Düşük</option>
        </select>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-500" /></div>
        ) : sortedComments.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs italic border border-dashed border-slate-800 rounded-xl">Henüz yorum yok.</div>
        ) : sortedComments.map((c) => (
          <div key={c.id} className="bg-slate-900/20 border border-slate-800/40 p-3 rounded-xl hover:bg-slate-800/20 transition-all">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-bold text-slate-300">{maskName(c.userName)}</span>
                  <CheckCircle2 size={10} className="text-blue-500" />
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={8} className={i < c.rating ? "fill-yellow-500 text-yellow-500" : "text-slate-700"} />)}
                </div>
              </div>
              <span className="text-[9px] text-slate-600">{c.date}</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed mb-3">"{c.comment}"</p>
            {c.reviewImage && (
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-800">
                <img src={c.reviewImage} alt="Review" className="w-full h-full object-cover cursor-pointer" onClick={() => window.open(c.reviewImage, '_blank')} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-900/60 border border-slate-800/60 p-3 rounded-2xl">
        {checkingOrder ? (
          <div className="flex justify-center py-2"><Loader2 size={16} className="animate-spin text-slate-600" /></div>
        ) : canReview ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={18} onClick={() => setUserRating(s)} className={`cursor-pointer ${s <= userRating ? "fill-yellow-500 text-yellow-500" : "text-slate-700"}`} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer text-slate-500 hover:text-blue-400">
                  <Camera size={20} />
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setImageFile(e.target.files[0]);
                      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                    }
                  }} />
                </label>
                {previewUrl && (
                  <div className="relative">
                    <img src={previewUrl} className="w-10 h-10 rounded-lg object-cover border border-blue-500/50" />
                    <button onClick={() => {setImageFile(null); setPreviewUrl(null);}} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"><X size={10} /></button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <input value={newComment} onChange={(e) => setNewComment(e.target.value)} className="flex-1 bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-2.5 text-[11px] text-slate-200 outline-none focus:border-blue-500/50" placeholder="Deneyiminizi paylaşın..." />
              <button onClick={handleAddReview} disabled={sending || userRating === 0 || !newComment.trim()} className="bg-blue-600 px-4 rounded-xl hover:bg-blue-500 disabled:opacity-50 flex items-center justify-center min-w-[44px]">
                {sending ? <Loader2 size={16} className="animate-spin" /> : <ChevronDown size={20} className="-rotate-90 text-white" />}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-2 py-1">
            <AlertCircle size={14} className="text-slate-600" />
            <p className="text-[10px] text-slate-600 italic font-medium">Sadece ürünü satın alanlar ve yorum yapmamış olanlar değerlendirme bırakabilir.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;