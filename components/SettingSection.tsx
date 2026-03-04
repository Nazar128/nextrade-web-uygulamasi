import React from "react";

export const SettingSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="flex flex-col gap-4 w-full h-full">
    <h3 className="text-[12px] font-bold tracking-[0.2em] text-slate-400 px-1 uppercase">
      {title}
    </h3>
    <div className="flex-1 bg-white border border-slate-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {children}
    </div>
  </section>
);