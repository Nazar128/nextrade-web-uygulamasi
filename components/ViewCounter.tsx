"use client";
import { useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { doc, updateDoc, increment, setDoc } from 'firebase/firestore';

interface ViewCounterProps {
  sellerId: string;
}

export const ViewCounter = ({ sellerId }: ViewCounterProps) => {
  useEffect(() => {
    const reportView = async () => {
      if (auth.currentUser?.uid === sellerId) return;

      const analyticsRef = doc(db, "analytics", "store_stats");
      try {
        await updateDoc(analyticsRef, { totalViews: increment(1) });
      } catch (error) {
        await setDoc(analyticsRef, { totalViews: 1, activeUsers: 1 }, { merge: true });
      }
    };

    reportView();
  }, [sellerId]);

  return null;
};