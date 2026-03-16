"use client";
import { useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, increment, setDoc } from 'firebase/firestore';

export const PresenceManager = () => {
  useEffect(() => {
    const analyticsRef = doc(db, "analytics", "store_stats");

    const updatePresence = async (val: number) => {
      try {
        await updateDoc(analyticsRef, { activeUsers: increment(val) });
      } catch (error) {
        await setDoc(analyticsRef, { activeUsers: 1, totalViews: 0 }, { merge: true });
      }
    };

    updatePresence(1);

    const handleUnload = () => {
      updateDoc(analyticsRef, { activeUsers: increment(-1) });
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      handleUnload();
    };
  }, []);

  return null;
};