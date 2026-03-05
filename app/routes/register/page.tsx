"use client";
import { useState } from 'react';
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { serverTimestamp } from "firebase/firestore";
import Link from 'next/link';
import { User, Mail, Phone, Lock, UserPlus, ShieldCheck } from 'lucide-react';
import { saveLog } from "@/lib/logger";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    displayName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer' 
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.displayName,
        phone: formData.phone,
        email: formData.email,
        role: formData.role, 
        createdAt: serverTimestamp()
      });

      alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
      await saveLog('LOGIN', `Yeni kullanıcı sisteme kayıt oldu: ${user.email}`);
      router.push("/routes/login");
    } catch (error: any) {
      console.error("Kayıt hatası:", error);
      alert("Hata: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mx-auto relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:w-[500px] bg-white/5 shadow-2xl shadow-gray-500 rounded-[32px] p-6 md:p-4"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight text-center md:text-left">Hesap Oluştur</h1>
          <p className="text-gray-500 text-sm mt-2 text-center md:text-left">Premium alışveriş deneyimine katılın.</p>
        </div>

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-200 ml-1">Ad Soyad</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                required
                onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                className="w-full bg-gray-500 border border-white/10 rounded-2xl py-3.5 pl-11 text-white text-sm outline-none focus:border-purple-500/50 transition-all" 
                placeholder="John Doe" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-200 ml-1">Telefon</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                required
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-gray-500 border border-white/10 rounded-2xl py-3.5 pl-11 text-white text-sm outline-none focus:border-purple-500/50 transition-all" 
                placeholder="05XX XXX XX XX" 
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold text-gray-200 ml-1">E-Posta</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                required
                type="email"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-500 border border-white/10 rounded-2xl py-3.5 pl-11 text-white text-sm outline-none focus:border-purple-500/50 transition-all" 
                placeholder="mail@example.com" 
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold text-gray-200 ml-1">Üyelik Tipi</label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <select 
                required
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full bg-gray-500 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white text-sm outline-none focus:border-purple-500/50 transition-all appearance-none"
              >
                <option value="customer" className="bg-gray-700 text-white">Müşteri (Alışveriş Yapacağım)</option>
                <option value="seller" className="bg-gray-700 text-white">Satıcı (Ürün Satacağım)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-200 ml-1">Şifre</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                required
                type="password"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-gray-500 border border-white/10 rounded-2xl py-3.5 pl-11 text-white text-sm outline-none focus:border-purple-500/50 transition-all" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-200 ml-1">Şifre Tekrar</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                required
                type="password" 
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full bg-gray-500 border border-white/10 rounded-2xl py-3.5 pl-11 text-white text-sm outline-none focus:border-purple-500/50 transition-all" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <motion.button 
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="md:col-span-2 py-4 bg-gray-700 hover:bg-red-800 text-white rounded-2xl font-bold shadow-lg mt-4 flex items-center justify-center gap-2"
          >
            <UserPlus size={20} /> Kayıt Ol
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-300">
          Zaten üye misiniz? {' '}
          <Link href="/routes/login" className="text-gray-100 font-bold hover:underline">Giriş Yap</Link>
        </p>
      </motion.div>
    </div>
  );
}