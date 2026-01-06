
import React, { useState } from 'react';

const WorkspaceConfig: React.FC = () => {
  const [workspaces] = useState([
    { id: 1, name: 'Trabalho', icon: 'business_center', color: 'bg-blue-500' },
    { id: 2, name: 'Saúde', icon: 'monitor_heart', color: 'bg-red-500' },
    { id: 3, name: 'Família', icon: 'group', color: 'bg-purple-500' },
  ]);

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1200px] mx-auto w-full space-y-10 overflow-y-auto">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">Personalização do Workspace</h1>
        <p className="text-sm font-normal text-slate-400">Configure como a IA organiza seus <span className="text-primary font-bold">ambientes digitais</span>.</p>
      </header>

      <section className="space-y-6">
        <h3 className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">category</span> Ambientes Ativos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((ws) => (
            <div key={ws.id} className="bg-surface-dark/40 p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${ws.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined">{ws.icon}</span>
                </div>
                <div>
                  <p className="font-bold text-white leading-none">{ws.name}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Sincronizado</p>
                </div>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">tag</span> Gestão de Etiquetas
        </h3>
        <div className="bg-surface-dark/40 p-8 rounded-2xl border border-white/5">
          <div className="flex flex-wrap gap-3">
            {['reuniao', 'urgente', 'estudo', 'compras'].map((tag) => (
              <button key={tag} className="px-4 py-2 bg-primary/5 hover:bg-primary/20 border border-primary/20 rounded-xl text-primary font-bold text-sm transition-all flex items-center gap-2 group">
                # {tag}
                <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">close</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-10 flex justify-end pb-20">
        <button className="bg-primary text-black font-bold px-10 py-4 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest">
          Sincronizar Estrutura
        </button>
      </div>
    </div>
  );
};

export default WorkspaceConfig;
