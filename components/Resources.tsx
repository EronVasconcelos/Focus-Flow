
import React from 'react';
import { Resource } from '../types';

interface ResourcesProps {
  resources: Resource[];
  onAdd: () => void;
}

const Resources: React.FC<ResourcesProps> = ({ resources, onAdd }) => {
  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-8 overflow-y-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Minha Biblioteca</h1>
          <p className="text-slate-500 dark:text-[#9db9a1]">Documentos, notas e recursos importantes.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all text-slate-400 hover:text-primary"><span className="material-symbols-outlined">search</span></button>
          <button onClick={onAdd} className="bg-primary text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <span className="material-symbols-outlined">upload</span>
            Adicionar
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Documentos', count: '124', icon: 'description', color: 'blue' },
          { label: 'Saúde', count: '18', icon: 'medical_services', color: 'red' },
          { label: 'Finanças', count: '45', icon: 'payments', color: 'green' },
          { label: 'Trabalho', count: '82', icon: 'business_center', color: 'orange' },
          { label: 'Imagens', count: '210', icon: 'image', color: 'purple' },
          { label: 'Notas', count: '56', icon: 'notes', color: 'yellow' },
        ].map((cat) => (
          <div key={cat.label} className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-white/5 hover:border-primary/50 transition-all cursor-pointer group text-center">
            <div className={`w-10 h-10 mx-auto rounded-xl bg-${cat.color}-500/10 text-${cat.color}-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined">{cat.icon}</span>
            </div>
            <p className="text-sm font-bold dark:text-white group-hover:text-primary transition-colors">{cat.label}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">{cat.count} Itens</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-slate-50/50 dark:bg-white/5">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-widest">Recentes</span>
          <div className="h-px bg-white/5 flex-1"></div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res) => (
            <div key={res.id} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-primary/30 transition-all group cursor-pointer flex gap-4">
               <div className="w-12 h-12 rounded-xl bg-white dark:bg-surface-darker flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                  <span className="material-symbols-outlined text-[24px]">
                    {res.type === 'pdf' ? 'picture_as_pdf' : res.type === 'article' ? 'article' : res.type === 'link' ? 'link' : 'description'}
                  </span>
               </div>
               <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate dark:text-white group-hover:text-primary transition-colors">{res.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mb-2 font-normal">{res.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{res.category}</span>
                    <span className="text-[10px] text-slate-500 font-bold">{res.date}</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
