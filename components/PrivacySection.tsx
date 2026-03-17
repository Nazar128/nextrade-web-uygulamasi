"use client";
import React, { useEffect, useState } from 'react';
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const PrivacySection = () => {
  const [data, setData] = useState({ title: '', content: '' });

  useEffect(() => {
    getDoc(doc(db, "legalContent", "privacy-policy")).then(snap => {
      if (snap.exists()) setData(snap.data() as any);
    });
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <h2 className="text-3xl font-bold text-white border-b border-slate-800 pb-2">
        {data.title || "Yükleniyor..."}
      </h2>
      <div 
        className="prose prose-invert max-w-none text-slate-400 font-light leading-relaxed"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
};