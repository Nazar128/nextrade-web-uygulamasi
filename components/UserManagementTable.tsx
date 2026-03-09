"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase'; 
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query } from 'firebase/firestore';
import { Ban, CheckCircle, Loader2, ShieldCheck, UserX, Trash2 } from 'lucide-react';

interface UserData {
  id: string;
  displayName: string;
  email: string;
  role: string;
  status: string;
  createdAt: any;
}

export const UserManagementTable = ({ searchTerm }: { searchTerm: string }) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UserData[];
      setUsers(usersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter(user => 
    user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { status: newStatus });
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (confirm(`${userName} silinsin mi?`)) {
      try {
        await deleteDoc(doc(db, "users", userId));
      } catch (error) {
        console.error("Hata:", error);
      }
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-indigo-500" /></div>;

  return (
    <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50 text-[10px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-800/40">
              <th className="px-6 py-4">Kullanıcı</th>
              <th className="px-6 py-4">Rol</th>
              <th className="px-6 py-4">Durum</th>
              <th className="px-6 py-4">Kayıt</th>
              <th className="px-6 py-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-200">{user.displayName || "İsimsiz"}</span>
                      <span className="text-[10px] text-slate-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[11px] text-slate-400">{user.role}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                      user.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {user.status || 'Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[11px] text-slate-500">
                    {user.createdAt?.seconds ? new Date(user.createdAt.seconds * 1000).toLocaleDateString() : '---'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleUpdateStatus(user.id, user.status === 'Aktif' ? 'Kısıtlı' : 'Aktif')} className="p-1.5 hover:bg-slate-800 rounded-lg">
                        {user.status === 'Aktif' ? <UserX size={16} className="text-amber-500" /> : <CheckCircle size={16} className="text-emerald-500" />}
                      </button>
                      <button onClick={() => handleDeleteUser(user.id, user.displayName)} className="p-1.5 hover:bg-rose-500/20 rounded-lg text-rose-500">
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-500 text-sm italic">
                  Arama kriterine uygun kullanıcı bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};