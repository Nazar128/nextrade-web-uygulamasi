"use client";
import { useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { doc, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

let isAlreadyTracked = false;

export default function AnalyticsTracker() {
  useEffect(() => {
    if (isAlreadyTracked) return;

    const analyticsRef = doc(db, "analytics", "store_stats");

    const trackVisit = async (isAdmin: boolean) => {
      isAlreadyTracked = true;
      try {
        const docSnap = await getDoc(analyticsRef);
        
        if (!docSnap.exists()) {
          await setDoc(analyticsRef, {
            totalViews: isAdmin ? 0 : 1,
            activeUsers: 1
          });
        } else {
          await updateDoc(analyticsRef, {
            ...(!isAdmin && { totalViews: increment(1) }),
            activeUsers: increment(1)
          });
        }
      } catch (error) {
        console.error("Analitik hatası:", error);
        isAlreadyTracked = false;
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isAdmin = user && user.email === "admin@nextrade.com"; 
      trackVisit(!!isAdmin);
    });

    const handleUnload = () => {
      updateDoc(analyticsRef, {
        activeUsers: increment(-1)
      }).catch(() => {});
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      unsubscribe();
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return null; 
}