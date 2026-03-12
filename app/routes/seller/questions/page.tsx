"use client";
import React, { useState, useEffect } from 'react';
import { db, auth } from "@/lib/firebase";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { MessageSquare, Send, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { toast } from "react-hot-toast";

const SellerQuestions = () => {
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
    const [sending, setSending] = useState<string | null>(null);

    useEffect(() => {
        const seller = auth.currentUser;
        if (!seller) return;
        const q = query(
            collection(db, "questions"),
            where("sellerId", "==", seller.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setQuestions(data.sort((a: any, b: any) => b.createdAt?.seconds - a.createdAt?.seconds));
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleReply = async (questionId: string) => {
        const answer = replyText[questionId];
        if (!answer?.trim()) return;

        setSending(questionId);
        try {
            const questionRef = doc(db, "questions", questionId);
            await updateDoc(questionRef, {
                answer: answer.trim(),
                answeredAt: new Date().toISOString() // İstatistik için eklenebilir
            });
            toast.success("Cevabınız iletildi.");
            setReplyText({ ...replyText, [questionId]: '' });
        } catch (error) {
            toast.error("Hata oluştu.");
        } finally {
            setSending(null);
        }
    };

    if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></div>;
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 space-x-3">
            <header className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-4xl text-blue-600 font-bold ">SORU & CEVAP <span className=' text-3xl text-slate-600'>YÖNETİMİ</span> </h1>
                    <p className="text-slate-400 mt-2 text-sm">Müşterilerinizden gelen soruları buradan yanıtlayabilirsiniz.</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 px-6 py-1 rounded-xl m-10">
                    <span className="text-blue-400 ">{questions.filter(q => !q.answer).length} Bekleyen Soru</span>
                </div>
            </header>

            <div className="grid gap-4">
                {questions.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-slate-800">
                        <MessageSquare className="mx-auto text-slate-700 mb-4" size={48} />
                        <p className="text-slate-500">Henüz bir soru almadınız.</p>
                    </div>
                ) : (
                    questions.map((q) => (
                        <div key={q.id} className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{q.productTitle}</span>
                                    <h3 className="text-slate-200 font-medium">{q.userName} sordu:</h3>
                                </div>
                                <span className="text-[10px] text-slate-500">{q.createdAt?.toDate().toLocaleDateString('tr-TR')}</span>
                            </div>

                            <p className="text-slate-300 text-sm mb-6 bg-slate-950/50 p-3 rounded-lg border-l-2 border-slate-700">
                                {q.question}
                            </p>

                            {q.answer ? (
                                <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-xl flex items-start gap-3">
                                    <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                                    <div>
                                        <p className="text-xs text-green-500 font-bold uppercase mb-1">Cevabınız:</p>
                                        <p className="text-slate-400 text-sm">{q.answer}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative group">
                                    <textarea
                                        placeholder="Müşterinize yanıt verin..."
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 min-h-[100px] transition-all"
                                        value={replyText[q.id] || ''}
                                        onChange={(e) => setReplyText({ ...replyText, [q.id]: e.target.value })}
                                    />
                                    <button
                                        onClick={() => handleReply(q.id)}
                                        disabled={sending === q.id || !replyText[q.id]?.trim()}
                                        className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all disabled:opacity-30"
                                    >
                                        {sending === q.id ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                                        Cevapla
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default SellerQuestions;