import React from 'react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InfoCard = ({ icon, title, description }: InfoCardProps) => {
  return (
    <div className="bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20 hover:-translate-y-2 transition-all">
      <div className="text-blue-600 mb-4 p-3 bg-blue-50 w-fit rounded-2xl">
        {icon}
      </div>
      <h3 className="font-bold text-slate-950 text-xl mb-2">{title}</h3>
      <p className="text-slate-200 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default InfoCard;