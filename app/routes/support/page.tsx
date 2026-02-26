"use client";
import React, { useState } from 'react';
import { HelpCircle, ShieldCheck, FileText, ChevronDown, Sparkles } from 'lucide-react';

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState('sss');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { 
      q: "Global Satıcı Ekosistemine Nasıl Katılırım?", 
      a: "Marketplace platformumuzda satıcı olmak için kurumsal veya bireysel girişimci olmanız yeterlidir. 'Satıcı Paneli' üzerinden vergi numaranız veya kimlik bilgilerinizle yapacağınız başvuru, AI destekli onay mekanizmamız tarafından 24 saat içinde incelenir ve mağazanız global erişime açılır." 
    },
    { 
      q: "Lojistik ve Teslimat Süreçleri Nasıl Yönetiliyor?", 
      a: "Platformumuz, 'Smart-Route' teknolojisi ile en yakın dağıtım merkezini belirler. Siparişleriniz, anlaşmalı olduğumuz otonom ve standart kargo partnerlerimiz aracılığıyla uçtan uca takip edilebilir. Teslimat sürelerimiz bölgeye göre 1 ile 3 iş günü arasında fütüristik bir hızla gerçekleşir." 
    },
    { 
      q: "Ödeme Güvenliği ve Alıcı Koruma Programı Nedir?", 
      a: "Tüm ödemeleriniz 'Secure-Layer' sistemimizde askıya alınır. Ürünü teslim alıp onaylamadığınız sürece ödeme satıcıya aktarılmaz. Bu sayede %100 güvenli bir ticaret döngüsü oluşturulur. Ayrıca, 256-bit AES şifreleme ile kart bilgileriniz asla sunucularımızda saklanmaz." 
    },
    {
      q: "İptal ve İade Politikası Şeffaf mı?",
      a: "Kesinlikle. 14 günlük yasal cayma hakkınızın ötesinde, 'Koşulsuz Müşteri Mutluluğu' kapsamında, kullanılmamış ve yeniden satılabilir özelliğini kaybetmemiş tüm ürünleri tek tıkla iade edebilirsiniz. İade süreci başlatıldığında geri ödemeniz anında bankanıza iletilir."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 w-full pt-12 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16 border-l-4 border-blue-600 pl-8">
          <h1 className="text-4xl md:text-5xl font-black text-white  tracking-tighter uppercase mb-2">
            Destek & <span className="text-blue-500 not-italic text-outline">Hukuk</span>
          </h1>
          <p className="text-slate-200 max-w-3xl text-lg font-light leading-relaxed">
            Şeffaflık, dijital ekosistemimizin temel taşıdır. Platformumuzun işleyişi, veri güvenliği standartlarımız ve yasal haklarınız hakkında detaylı bilgilere buradan ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          
          <aside className="space-y-3">
            {[
              { id: 'sss', label: 'Sıkça Sorulan Sorular', icon: <HelpCircle size={18} /> },
              { id: 'gizlilik', label: 'Gizlilik Politikası', icon: <ShieldCheck size={18} /> },
              { id: 'sartlar', label: 'Kullanım Koşulları', icon: <FileText size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-bold transition-all border ${
                  activeTab === tab.id 
                  ? 'bg-slate-600 border-blue-500 text-white shadow-2xl shadow-blue-500/20' 
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-900/20 to-transparent rounded-3xl border border-blue-500/10">
               <Sparkles className="text-blue-400 mb-2" size={20} />
               <p className="text-xs text-slate-400 leading-tight font-mono uppercase tracking-widest text-blue-300">Hızlı Yanıt Sistemi</p>
               <p className="text-[10px] text-slate-500 mt-2  font-blue-300">Ortalama yanıt süremiz: 4 dakikadır.</p>
            </div>
          </aside>

          <div className="lg:col-span-3 bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 backdrop-blur-md shadow-inner">
            
            {activeTab === 'sss' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-8  flex items-center gap-4">
                   <span className="w-10 h-[2px] bg-blue-500"></span> Operasyonel Detaylar
                </h2>
                {faqs.map((faq, index) => (
                  <div key={index} className="group border border-slate-800/50 rounded-3xl overflow-hidden bg-slate-900/80 hover:border-blue-500/30 transition-all">
                    <button 
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left outline-none"
                    >
                      <span className={`font-bold transition-colors ${openFaq === index ? 'text-blue-400 text-lg' : 'text-slate-200'}`}>
                        {index + 1}. {faq.q}
                      </span>
                      <ChevronDown className={`transition-transform duration-500 ${openFaq === index ? 'rotate-180 text-blue-400' : 'text-slate-600'}`} />
                    </button>
                    <div className={`transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-[500px] opacity-100 p-7 pt-0' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <p className="text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4 text-base font-light  text-blue-200">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'gizlilik' && (
              <div className="space-y-8 animate-in fade-in duration-700">
                <h2 className="text-3xl font-bold text-white  border-b border-slate-800 pb-2">Dijital Veri Gizliliği</h2>
                <div className="space-y-6 text-slate-400 leading-relaxed text-lg font-light">
                  <p>
                    <strong className="text-blue-400 font-bold  tracking-widest text-sm  block mb-2 font-blue-300">VERİ TOPLAMA AMACI:</strong>
                    Marketplace platformumuz, kullanıcılara kişiselleştirilmiş bir ticaret deneyimi sunmak amacıyla temel kimlik ve iletişim verilerini en üst düzey şifreleme standartlarında işler.
                  </p>
                  <p>
                    <strong className="text-blue-400 font-bold  tracking-widest text-sm  block mb-2 font-blue-300">UÇTAN UCA GÜVENLİK</strong>
                    Verileriniz sadece Avrupa Birliği standartlarındaki (GDPR) güvenli sunucularda saklanır. Üçüncü taraf reklam ağları ile veri paylaşımı kesinlikle yapılmaz.
                  </p>
                  <div className="bg-blue-500/5 p-6 rounded-2xl border-l-2 border-blue-500 ">
                    "Sizin veriniz, sizin kontrolünüzdedir. İstediğiniz an tüm dijital izinlerinizi panel üzerinden sıfırlayabilirsiniz."
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sartlar' && (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
                <h2 className="text-3xl font-bold text-white  border-b border-slate-800 pb-6">Hizmet Kullanım Sözleşmesi</h2>
                <div className="space-y-6 text-slate-400 text-lg font-light">
                  <p className="font-mono text-xs text-blue-500 font-bold tracking-[0.2em] mb-4">// MADDE 1.0: GENEL ŞARTLAR</p>
                  <p>Platform üzerindeki tüm işlemler yasal mevzuatlara tabidir. Kullanıcılar, etik ticaret kurallarına uymakla yükümlüdür.</p>
                  
                  <p className="font-mono text-xs text-blue-500 font-bold tracking-[0.2em] mb-4">// MADDE 2.0: SATICI SORUMLULUKLARI</p>
                  <p>Satıcılar, listeledikleri her ürünün orijinalliğini ve kalitesini garanti eder. Yanıltıcı içerik üreten hesaplar fütüristik kontrol sistemimiz tarafından otomatik olarak kısıtlanacaktır.</p>
                  
                  <p className="bg-slate-800/50 p-6 rounded-2xl text-sm text-blue-300 underline font-blue-300 font-blue-300 font-blue-300 font-blue-300 font-blue-300">
                    *Bu şartlar, platformun ve topluluğun güvenliğini sağlamak amacıyla periyodik olarak güncellenmektedir.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};

export default SupportPage;