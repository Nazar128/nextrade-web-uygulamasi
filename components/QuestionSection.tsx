"use client";
import React, { useState, useMemo } from 'react';
import { Send, MessageCircle, Clock, ChevronDown, ArrowUpDown, User } from 'lucide-react';

const QuestionSection = ({ productId }: { productId: number }) => {
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
    const [newQuestion, setNewQuestion] = useState('');

    const [questions] = useState([
        { id: 1, user: "Ahmet Y.", question: "Ürünün garanti süresi ne kadar?", answer: "2 yıl resmi distribütör garantilidir.", date: "2024-05-10" },
        { id: 2, user: "Selin K.", question: "Kutu içeriğinde kablo var mı?", date: "2024-05-12" },
        { id: 3, user: "Caner T.", question: "Ürün hangi renklerde stokta mevcut?", answer: "Şu an sadece Uzay Grisi stoklarımızdadır.", date: "2024-05-15" },
    ]);

    const sortedQuestions = useMemo(() => {
        return [...questions].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });
    }, [questions, sortBy]);

    return (
        <div className="max-w-4xl w-full space-y-4 animate-in fade-in duration-500">
            
            <div className="flex items-center justify-between border-b border-slate-800/50 pb-3">
                <div className="flex items-center gap-2">
                    <MessageCircle size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Soru & Cevap</span>
                </div>
                
                <button 
                    onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900/50 border border-slate-800 text-[10px] text-slate-500 hover:text-slate-300 transition-all"
                >
                    <ArrowUpDown size={10} />
                    {sortBy === 'newest' ? 'En Yeni' : 'En Eski'}
                </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {sortedQuestions.map((q) => (
                    <div key={q.id} className="group bg-slate-900/20 border border-slate-800/40 p-3.5 rounded-xl hover:bg-slate-800/20 transition-all">
                        <div className="flex flex-col gap-1.5 mb-3">
                            <div className="flex justify-between items-center text-[9px] font-mono text-slate-600">
                                <div className="flex items-center gap-1.5 font-sans font-bold text-slate-500">
                                    <div className="w-1 h-1 rounded-full bg-blue-500" />
                                    {q.user}
                                </div>
                                {q.date}
                            </div>
                            <p className="text-[12px] font-medium text-slate-200 leading-snug">
                                {q.question}
                            </p>
                        </div>

                        {q.answer ? (
                            <div className="bg-slate-950/40 rounded-lg p-2.5 border-l-2 border-blue-500/50">
                                <p className="text-[11px] text-slate-400 italic leading-relaxed">
                                    <span className="text-[9px] not-italic font-bold text-blue-500/70 mr-1 uppercase">Satıcı:</span>
                                    {q.answer}
                                </p>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-[10px] text-amber-500/50 italic px-1">
                                <Clock size={10} />
                                Yanıt bekleniyor...
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="relative group mt-2">
                <input 
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Ürün hakkında bir soru sor..."
                    className="w-full bg-slate-900/30 border border-slate-800 rounded-xl px-4 py-2.5 text-[11px] text-slate-300 focus:outline-none focus:border-blue-500/40 focus:bg-slate-900/50 transition-all pr-10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-blue-500 hover:scale-110 transition-transform disabled:opacity-30" disabled={!newQuestion}>
                    <Send size={14} />
                </button>
            </div>
        </div>
    );
};

export default QuestionSection;