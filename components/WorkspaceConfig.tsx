
import React, { useState } from 'react';

const WorkspaceConfig: React.FC = () => {
  const [workspaces, setWorkspaces] = useState([
    { id: 1, name: 'Trabalho', icon: 'business_center', color: 'bg-blue-500' },
    { id: 2, name: 'Saúde', icon: 'monitor_heart', color: 'bg-red-500' },
    { id: 3, name: 'Família', icon: 'group', color: 'bg-purple-500' },
    { id: 4, name: 'Casa', icon: 'home', color: 'bg-cyan-500' },
    { id: 5, name: 'Pessoal', icon: 'person', color: 'bg-yellow-500' },
  ]);

  const [priorities, setPriorities] = useState([
    { id: 'urgent', name: 'Crítica (P1)', color: 'bg-red-600', code: 'p1' },
    { id: 'high', name: 'Alta (P2)', color: 'bg-orange-500', code: 'p2' },
    { id: 'medium', name: 'Média (P3)', color: 'bg-primary', code: 'p3' },
    { id: 'low', name: 'Baixa (P4)', color: 'bg-slate-400', code: 'p4' },
  ]);

  const [tags, setTags] = useState(['reuniao', 'urgente', 'estudo', 'compras', 'foco', 'miguel']);

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1200px] mx-auto w-full space-y-10 overflow-y-auto">
      <header>
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Personalização do Workspace</h1>
        <p className="text-slate-500 dark:text-[#9db9a1]">Configure como a IA organiza seu cérebro e seus ambientes.</p>
      </header>

      {/* SECTION: WORKSPACES */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">category</span>
            Ambientes (Workspaces)
          </h3>
          <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">+ Novo Ambiente</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((ws) => (
            <div key={ws.id} className="bg-white dark:bg-surface-dark p-5 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${ws.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  <span className="material-symbols-outlined">{ws.icon}</span>
                </div>
                <div>
                  <p className="font-bold dark:text-white">{ws.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Ativo</p>
                </div>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: PRIORITIES */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">low_priority</span>
          Configuração de Prioridades
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {priorities.map((p) => (
            <div key={p.id} className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-white/5 space-y-3">
              <div className="flex justify-between items-center">
                <div className={`w-3 h-3 rounded-full ${p.color} shadow-[0_0_8px_rgba(0,180,255,0.4)]`}></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Gatilho: {p.code}</span>
              </div>
              <p className="font-bold dark:text-white">{p.name}</p>
              <div className="flex gap-2 pt-2">
                <button className="text-[10px] font-bold text-primary uppercase hover:underline">Editar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: TAGS */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">tag</span>
            Gestão de Etiquetas (#)
          </h3>
          <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">+ Gerenciar</button>
        </div>
        <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-white/5 shadow-sm">
          <p className="text-sm text-slate-500 mb-6">Etiquetas detectadas automaticamente pela IA. Clique para renomear ou arquivar.</p>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <button key={tag} className="px-4 py-2 bg-primary/5 hover:bg-primary/20 border border-primary/20 rounded-xl text-primary font-bold text-sm transition-all flex items-center gap-2 group">
                # {tag}
                <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">close</span>
              </button>
            ))}
            <button className="px-4 py-2 bg-slate-100 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/20 rounded-xl text-slate-500 font-bold text-sm hover:border-primary transition-all">
              + Adicionar
            </button>
          </div>
        </div>
      </section>

      <div className="pt-10 flex justify-end pb-20">
        <button className="bg-primary text-black font-bold px-10 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
          Sincronizar Estrutura
        </button>
      </div>
    </div>
  );
};

export default WorkspaceConfig;
