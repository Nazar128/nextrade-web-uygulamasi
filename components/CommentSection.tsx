"use client";
import React, { useState, useMemo } from 'react';
import { Star, Camera, ChevronDown, MessageSquare, SortAsc } from 'lucide-react';

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

const CommentSection = () => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(0);

  const [comments] = useState([
    { id: 1, user: "Mert A.", rating: 5, comment: "Ürün beklediğimden çok daha kaliteli çıktı, paketleme harikaydı.", date: "2024-05-20", images: ["https://picsum.photos/400/300?random=1"] },
    { id: 2, user: "Zeynep T.", rating: 2, comment: "Fiyat performans ürünü ancak kargo çok yavaştı.", date: "2024-05-18", images: ["https://picsum.photos/400/300?random=2"] },
    { id: 3, user: "Arda V.", rating: 3, comment: "İş görüyor ama malzeme kalitesi daha iyi olabilirdi.", date: "2024-05-22" },
    { id: 4, user: "Selin G.", rating: 4, comment: "Renkleri canlı, kurulumu basit.", date: "2024-05-24" },
  ]);

  const stats = useMemo(() => {
    const total = comments.length;
    const avg = comments.reduce((acc, curr) => acc + curr.rating, 0) / total;
    return { total, avg: avg.toFixed(1) };
  }, [comments]);

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest': return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest': return b.rating - a.rating;
        case 'lowest': return a.rating - b.rating;
        default: return 0;
      }
    });
  }, [comments, sortBy]);

  return (
    <div className="max-w-4xl w-full space-y-4 animate-in fade-in duration-500">

      <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">

            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Değerlendirme</p>
              <p className="text-sm font-bold text-white">{stats.avg} / 5.0 <span className="text-slate-500 font-normal">({stats.total})</span></p>
            </div>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-slate-800 text-slate-300 text-[11px] font-medium px-2 py-1.5 rounded-lg outline-none border border-slate-700 cursor-pointer hover:border-slate-500 transition-colors"
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="highest">En Yüksek Puan</option>
            <option value="lowest">En Düşük Puan</option>
          </select>
        </div>
      </div>

      <div className="relative group">
        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent snap-y">
          {sortedComments.map((comment) => (
            <div key={comment.id} className="bg-slate-900/20 border border-slate-800/40 p-3 rounded-xl snap-start hover:bg-slate-800/20 transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 font-sans">
                    <div className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-[10px] font-bold text-slate-500 leading-none">
                      {comment.user}
                    </span>
                  </div>


                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={8} className={i < comment.rating ? "fill-yellow-500 text-yellow-500" : "text-slate-700"} />
                    ))}
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-600">{comment.date}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed mb-2 line-clamp-3 italic">"{comment.comment}"</p>

              {comment.images && (
                <div className="flex gap-1.5">
                  {comment.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      onClick={() => setSelectedImage(img)}
                      className="w-8 h-8 rounded-md cursor-pointer border border-slate-800 object-cover hover:scale-105 transition-transform"
                      alt="Yorum"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800/60 p-3 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s} size={12}
                onClick={() => setUserRating(s)}
                className={`cursor-pointer transition-all ${s <= userRating ? "fill-yellow-500 text-yellow-500" : "text-slate-700 hover:text-slate-500"}`}
              />
            ))}
          </div>
          <div className="flex-1 relative">
            <input
              className="w-full bg-slate-950/50 border border-slate-800 rounded-lg pl-3 pr-10 py-1.5 text-[11px] text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all"
              placeholder="Görüşünü yaz..."
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <button className="text-slate-500 hover:text-blue-400 transition-colors"><Camera size={14} /></button>
              <button className="bg-blue-600 text-white p-1 rounded-md hover:bg-blue-500"><ChevronDown size={12} className="-rotate-90" /></button>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} className="max-w-full max-h-[70vh] rounded-xl shadow-2xl border border-white/5" alt="Büyük Görsel" />
        </div>
      )}
    </div>
  );
};

export default CommentSection;