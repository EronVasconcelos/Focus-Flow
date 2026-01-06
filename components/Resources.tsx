
import React from 'react';
import { Resource } from '../types';

interface ResourcesProps {
  resources: Resource[];
  onAdd: () => void;
}

const Resources: React.FC<ResourcesProps> = ({ resources, onAdd }) => {
  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-10 overflow-y-auto pb-24">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Minha Biblioteca</h1>
          <p className="text-sm font-normal text-slate-400">Documentos, notas e <span className="text-primary font-bold">recursos importantes</span>.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-12 h-12 rounded-xl bg-surface-dark border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
            <span className="material-symbols-outlined text-primary">search</span>
          </button>
          <button onClick={onAdd} className="bg-primary hover:bg-blue-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined font-bold text-sm">upload</span>
            Adicionar
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {[
          { label: 'Documentos', count: '124', icon: 'description', color: 'text-work' },
          { label: 'Saúde', count: '18', icon: 'medical_services', color: 'text-health' },
          { label: 'Finanças', count: '45', icon: 'payments', color: 'text-emerald-500' },
          { label: 'Trabalho', count: '82', icon: 'business_center', color: 'text-primary' },
          { label: 'Imagens', count: '210', icon: 'image', color: 'text-personal' },
          { label: 'Notas', count: '56', icon: 'notes', color: 'text-orange-400' },
        ].map((cat) => (
          <div key={cat.label} className="bg-surface-dark/40 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all cursor-pointer group text-center">
            <div className={`w-12 h-12 mx-auto rounded-xl bg-white/5 ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined">{cat.icon}</span>
            </div>
            <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{cat.label}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{cat.count} Itens</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-dark/40 rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
          <span className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">Recursos Recentes</span>
          <div className="h-px bg-white/5 flex-1"></div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res) => (
            <div key={res.id} className="p-5 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all group cursor-pointer flex gap-4">
               <div className="w-12 h-12 rounded-xl bg-background-dark flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                  <span className="material-symbols-outlined text-[24px]">
                    {res.type === 'pdf' ? 'picture_as_pdf' : res.type === 'article' ? 'article' : res.type === 'link' ? 'link' : 'description'}
                  </span>
               </div>
               <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate text-white group-hover:text-primary transition-colors">{res.title}</h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-1 font-bold uppercase tracking-widest">{res.category} • {res.date}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
