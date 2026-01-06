
import React, { useState } from 'react';
import { Goal } from '../types';
import { IMAGES } from '../constants';

interface GoalsProps {
  goals: Goal[];
  onNewGoal: () => void;
}

const Goals: React.FC<GoalsProps> = ({ goals, onNewGoal }) => {
  const [activeTab, setActiveTab] = useState<'longo-prazo' | 'diarias'>('longo-prazo');

  const stats = [
    { label: 'Total de Metas', value: '8', icon: 'flag', color: 'text-primary' },
    { label: 'Em Progresso', value: '5', icon: 'pending_actions', color: 'text-orange-400' },
    { label: 'Conquistas', value: '3', icon: 'emoji_events', color: 'text-health' },
  ];

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-10 overflow-y-auto pb-32">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Metas de Longo Prazo</h1>
          <p className="text-sm font-normal text-slate-400">Transforme grandes sonhos em <span className="text-orange-400 font-bold">conquistas reais</span>.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">tune</span> Filtrar
          </button>
          <button 
            onClick={onNewGoal} 
            className="bg-primary hover:bg-blue-400 text-black font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined font-bold">add</span> Nova Meta
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-surface-dark/40 border border-white/5 p-6 rounded-2xl flex items-center gap-5 hover:border-white/10 transition-all group">
            <div className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center ${s.color} group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-2xl">{s.icon}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
              <p className="text-3xl font-bold text-white">{s.value}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 w-fit">
        {['Longo Prazo', 'Metas Diárias'].map((t, idx) => (
          <button 
            key={t}
            onClick={() => setActiveTab(idx === 0 ? 'longo-prazo' : 'diarias')}
            className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${((activeTab === 'longo-prazo' && idx === 0) || (activeTab === 'diarias' && idx === 1)) ? 'bg-background-dark text-white border border-white/5 shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-surface-dark/40 border border-white/5 rounded-2xl p-8 space-y-6 hover:border-white/10 transition-all group">
             <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl icon-fill">stars</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-none">{goal.title}</h3>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-widest mt-2 inline-block">{goal.category}</span>
                  </div>
                </div>
                <span className="text-2xl font-bold text-primary">{goal.progress}%</span>
             </div>

             <div className="space-y-2">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${goal.progress}%` }}></div>
                </div>
             </div>

             <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Próximos Passos</p>
                <div className="space-y-2">
                  {goal.steps.slice(0, 2).map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border-2 ${step.completed ? 'bg-primary border-primary text-black' : 'border-white/10'}`}>
                        {step.completed && <span className="material-symbols-outlined text-[12px] font-bold">check</span>}
                      </div>
                      <span className={`text-xs font-bold ${step.completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{step.title}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Goals;
