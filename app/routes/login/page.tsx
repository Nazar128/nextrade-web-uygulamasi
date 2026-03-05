"use client";
import { useState } from 'react';
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        
        if (role === "admin") {
          router.push("/routes/admin");
        } else if (role === "seller") {
          router.push("/routes/seller/dashboard");
        } else {
          router.push("/"); 
        }
      } else {
        alert("Kullanıcı verisi bulunamadı!");
      }
    } catch (error: any) {
      console.error("Giriş hatası:", error);
      alert("Hata: Giriş bilgileri hatalı veya kullanıcı mevcut değil.");
    }
  };

  return (
    <div className="min-h-88 flex items-center justify-center p-6 mx-auto relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className=" md:w-[500px] border-2 border-gray-400 shadow-2xl shadow-gray-500 rounded-[32px] p-6"
      >
        <div className="mb-10 text-left">
          <h1 className="text-3xl font-bold text-white tracking-tight">Giriş Yap</h1>
          <p className="text-gray-500 text-sm mt-2">Hesabınıza erişmek için bilgilerinizi girin.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-200 ml-1">E-Posta</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" size={18} />
              <input 
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-500 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700"
                placeholder="mail@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-400 ml-1">Şifre</label>
              <Link href="#" className="text-xs text-blue-500 hover:text-blue-400 font-medium">Şifremi Unuttum</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" size={18} />
              <input 
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-500 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700"
                placeholder="••••••••"
              />
            </div>
          </div>

          <motion.button 
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-4 bg-gray-700 shadow-2xl shadow-gray-400 hover:bg-red-800 text-white rounded-2xl font-bold transition-all mt-4 flex items-center justify-center gap-2"
          >
            <LogIn size={20} /> Giriş Yap
          </motion.button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#111111] px-4 text-gray-600">veya</span></div>
          </div>

          <button type="button" className="w-full py-4 bg-gray-800 border border-white/10 rounded-2xl font-semibold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-sm">
            <Chrome size={18} /> Google ile Devam Et
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Hesabınız yok mu? {' '}
          <Link href="/routes/register" className="text-gray-100 font-bold hover:underline">Kaydol</Link>
        </p>
      </motion.div>
    </div>
  );
}