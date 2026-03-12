"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Send, MessageCircle, Clock, ArrowUpDown, Loader2 } from 'lucide-react';
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";

const QuestionSection = ({ product }: { product: any }) => {
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!product?.id) return;

        const pId = Number(product.id);
        const q = query(collection(db, "questions"), where("productId", "==", pId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const questionsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setQuestions(questionsData);
            setLoading(false);
        }, (error) => {
            console.error("Firestore Hatası:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [product?.id]);

    const handleSendQuestion = async () => {
        if (!user) {
            toast.error("Soru sormak için giriş yapmalısınız.");
            return;
        }

        if (!product?.sellerId) {
            toast.error("Satıcı bilgisi eksik, işlem yapılamaz.");
            return;
        }

        if (!newQuestion.trim()) return;

        setSending(true);
        try {
            const displayUserName = user.displayName || user.email?.split('@')[0] || "Kullanıcı";

            await addDoc(collection(db, "questions"), {
                productId: Number(product.id),
                productTitle: product.title || "Adsız Ürün",
                sellerId: String(product.sellerId),
                userId: user.uid,
                userName: displayUserName,
                question: newQuestion.trim(),
                answer: null,
                createdAt: serverTimestamp(),
            });

            setNewQuestion('');
            toast.success("Sorunuz iletildi.");
        } catch (error) {
            toast.error("Soru gönderilemedi.");
        } finally {
            setSending(false);
        }
    };

    const sortedQuestions = useMemo(() => {
        return [...questions].sort((a, b) => {
            const dateA = a.createdAt?.seconds || 0;
            const dateB = b.createdAt?.seconds || 0;
            return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });
    }, [questions, sortBy]);

    if (!product?.id) return null;

    return (
        <div className="max-w-4xl w-full space-y-4 animate-in fade-in duration-500">
            <div className="flex items-center justify-between border-b border-slate-800/50 pb-3">
                <div className="flex items-center gap-2">
                    <MessageCircle size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        Soru & Cevap ({questions.length})
                    </span>
                </div>
                <button 
                    onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900/50 border border-slate-800 text-[10px] text-slate-500 hover:text-slate-300 transition-all"
                >
                    <ArrowUpDown size={10} />
                    {sortBy === 'newest' ? 'En Yeni' : 'En Eski'}
                </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
                {loading ? (
                    <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-500" /></div>
                ) : questions.length === 0 ? (
                    <p className="text-center text-slate-500 text-xs py-10">Henüz soru sorulmamış.</p>
                ) : (
                    sortedQuestions.map((q) => (
                        <div key={q.id} className="group bg-slate-900/20 border border-slate-800/40 p-3.5 rounded-xl hover:bg-slate-800/20 transition-all">
                            <div className="flex flex-col gap-1.5 mb-3">
                                <div className="flex justify-between items-center text-[9px] font-mono text-slate-600">
                                    <div className="flex items-center gap-1.5 font-sans font-bold text-slate-500">
                                        <div className="w-1 h-1 rounded-full bg-blue-500" />
                                        {q.userName}
                                    </div>
                                    {q.createdAt?.toDate().toLocaleDateString('tr-TR')}
                                </div>
                                <p className="text-[12px] font-medium text-slate-200 leading-snug">{q.question}</p>
                            </div>
                            {q.answer ? (
                                <div className="bg-slate-950/40 rounded-lg p-2.5 border-l-2 border-blue-500/50">
                                    <p className="text-[11px] text-slate-400 italic leading-relaxed">
                                        <span className="text-[9px] not-italic font-bold text-blue-500/70 mr-1 uppercase">Satıcı Yanıtı:</span>
                                        {q.answer}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-[10px] text-amber-500/50 italic px-1">
                                    <Clock size={10} /> Yanıt bekleniyor...
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className="relative group mt-2">
                <input 
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    disabled={sending}
                    placeholder={user ? "Ürün hakkında bir soru sor..." : "Soru sormak için giriş yapın"}
                    className="w-full bg-slate-900/30 border border-slate-800 rounded-xl px-4 py-2.5 text-[11px] text-slate-300 focus:outline-none focus:border-blue-500/40 focus:bg-slate-900/50 transition-all pr-10 disabled:opacity-50"
                />
                <button 
                    onClick={handleSendQuestion}
                    disabled={!newQuestion || sending || !user || !product?.sellerId}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-blue-500 hover:scale-110 transition-transform disabled:opacity-30"
                >
                    {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                </button>
            </div>
        </div>
    );
};

export default QuestionSection;