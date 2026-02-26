import React from 'react';

const AboutHero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] hover:scale-110"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')` 
        }}
      >
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] px-10 text-left">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter  leading-[0.9]">
            TİCARETİN <br />
            <span className="text-blue-500 ">YENİ BOYUTU</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed">
            Marketplace ekosistemimizi, sınırları ortadan kaldıran yapay zeka ve fütüristik altyapılarla yeniden tanımlıyoruz. 
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-blue-500 to-transparent"></div>
      </div>
    </section>
  );
};

export default AboutHero;