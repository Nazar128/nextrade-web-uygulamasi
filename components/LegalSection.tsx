"use client";
import React, { useEffect, useState } from 'react';
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface Props { type: 'privacy' | 'terms'; }

export const LegalSection = ({ type }: Props) => {
  const [data, setData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docId = type === 'privacy' ? 'privacy-policy' : 'terms-of-use';
    const unsub = onSnapshot(doc(db, "legalContent", docId), (doc) => {
      if (doc.exists()) setData(doc.data() as any);
      setLoading(false);
    });
    return () => unsub();
  }, [type]);

  if (loading) return <div className="animate-pulse text-slate-500">Yükleniyor...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold text-white border-b border-slate-800 pb-4">
        {data.title}
      </h2>
      <div className="text-slate-400 leading-relaxed text-lg font-light whitespace-pre-wrap">
        {data.content}
      </div>
    </div>
  );
};