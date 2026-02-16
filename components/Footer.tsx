"use client"
import { Github, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type UserRole = "guest" | "customer" | "seller"

const mockUser = {
  role: "customer" as UserRole
}

const Footer = () => {

  const role = mockUser.role

  return (
    <footer className="bg-gradient-to-t from-gray-400 via-gray-700 to-gray-950 text-white px-6 py-12">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        <div className="flex flex-col items-start gap-4">
          <Link href="/">
            <Image
              alt="logo"
              src="/logo.png"
              width={280}
              height={60}
              className="w-[160px]"
            />
          </Link>
          <p className="text-sm text-gray-300">
            Modern e-ticaret deneyimi.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg mb-2">Menü</h3>

          <Link href="/">Ana Sayfa</Link>

          {role === "guest" && (
            <>
              <Link href="/cart">Sepet</Link>
              <Link href="/login">Giriş Yap</Link>
            </>
          )}

          {role === "customer" && (
            <>
              <Link href="/cart">Sepetim</Link>
              <Link href="/orders">Siparişlerim</Link>
              <Link href="/profile">Profilim</Link>
            </>
          )}

          {role === "seller" && (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/addProduct">Ürün Ekle</Link>
              <Link href="/profile">Profil</Link>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg mb-2">Kurumsal</h3>
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/iletisim">İletişim</Link>
          <Link href="/gizlilik">Gizlilik Politikası</Link>
          <Link href="/kullanim">Kullanım Şartları</Link>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h3 className='font-semibold text-lg'>Bültene Katıl</h3>
            <div className="flex mt-2">
              <input
                className="bg-gray-900 p-0.5 rounded-l-md text-white text-sm"
                placeholder="Email"
              />
              <button className="bg-gray-700 px-1.5 rounded-r-md">
                Katıl
              </button>
            </div>
          </div>

          <h3 className="font-semibold text-lg">Bizi Takip Edin</h3>
          <div className="flex gap-4">
            <Link href="#">
              <Instagram className="w-5 h-5 hover:text-pink-400 transition" />
            </Link>
            <Link href="#">
              <Linkedin className="w-5 h-5 hover:text-blue-400 transition" />
            </Link>
            <Link href="#">
              <Github className="w-5 h-5 hover:text-gray-400 transition" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-12 pt-6 text-center text-sm text-gray-200">
        © 2026 Tüm Hakları Saklıdır.
      </div>

    </footer>
  )
}

export default Footer
