
import React, { useState } from 'react';
import { Goal } from '../types';
import { IMAGES } from '../constants';

interface GoalsProps {
  goals: Goal[];
  onNewGoal: () => void;
}

const Goals: React.FC<GoalsProps> = ({ goals, onNewGoal }) => {
  const [activeTab, setActiveTab] = useState<'longo-prazo' | 'diarias'>('longo-prazo');

  const dailyGoals = [
    { id: 'd1', title: 'Correr 5km', progress: 75, total: '5km', current: '3.8km', category: 'Saúde', completed: false },
    { id: 'd2', title: 'Meditação Mindfulness', progress: 66, total: '15 min', current: '10 min', category: 'Pessoal', completed: false },
    { id: 'd3', title: 'Leitura Técnica', progress: 100, total: '30 min', current: '30 min', category: 'Trabalho', completed: true },
  ];

  const stats = [
    { label: 'Total de Metas', value: '8', icon: 'flag', color: 'blue' },
    { label: 'Em Progresso', value: '5', icon: 'pending_actions', color: 'orange' },
    { label: 'Conquistas (Ano)', value: '3', icon: 'emoji_events', color: 'green' },
  ];

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full space-y-8 overflow-y-auto pb-32">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Metas de Longo Prazo</h1>
          <p className="text-slate-400 font-normal mt-1">Divida grandes sonhos em etapas e transforme objetivos em conquistas.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">tune</span>
            Filtrar
          </button>
          <button 
            onClick={onNewGoal} 
            className="flex-1 md:flex-none bg-primary text-black font-bold px-8 py-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined font-bold">add_circle</span>
            Nova Meta
          </button>
        </div>
      </header>

      {/* STATS STRIP */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-surface-dark/40 border border-white/5 p-6 rounded-[1.5rem] flex items-center gap-5 group hover:border-white/10 transition-all">
            <div className={`w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors`}>
              <span className="material-symbols-outlined text-2xl">{s.icon}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{s.label}</p>
              <p className="text-3xl font-bold text-white">{s.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* TABS (DAILY VS LONG TERM) */}
      <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 w-fit">
        <button 
          onClick={() => setActiveTab('longo-prazo')}
          className={`px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'longo-prazo' ? 'bg-background-dark text-white border border-white/5 shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Longo Prazo
        </button>
        <button 
          onClick={() => setActiveTab('diarias')}
          className={`px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'diarias' ? 'bg-background-dark text-white border border-white/5 shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Metas Diárias
        </button>
      </div>

      {activeTab === 'longo-prazo' ? (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-surface-dark/40 border border-white/5 rounded-[2.5rem] p-8 space-y-8 group hover:border-white/10 transition-all relative overflow-hidden">
               <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl icon-fill">
                         {goal.category === 'Saúde' ? 'monitor_heart' : goal.category === 'Trabalho' ? 'business_center' : 'person'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-tight">{goal.title}</h3>
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg uppercase tracking-widest mt-2 inline-block">
                        {goal.category}
                      </span>
                    </div>
                  </div>
                  <button className="text-slate-500 hover:text-white"><span className="material-symbols-outlined">more_horiz</span></button>
               </div>

               <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Progresso Geral</span>
                    <span className="text-xs font-bold text-slate-400">{goal.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary shadow-[0_0_10px_rgba(0,180,255,0.4)] transition-all duration-1000" style={{ width: `${goal.progress}%` }}></div>
                  </div>
               </div>

               <div className="space-y-4">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Próximas Etapas</p>
                  <div className="space-y-2">
                    {goal.steps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-transparent hover:border-white/5 rounded-2xl transition-all group/step cursor-pointer">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${step.completed ? 'bg-primary border-primary text-black' : 'border-slate-700 group-hover/step:border-primary'}`}>
                          {step.completed && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
                        </div>
                        <span className={`text-sm font-bold ${step.completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{step.title}</span>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Prazo: {goal.deadline}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-slate-800">
                    <img src={IMAGES.ALEX_AVATAR} className="w-full h-full object-cover" />
                  </div>
               </div>
            </div>
          ))}

          {/* ADD NEW GOAL CARD */}
          <div 
            onClick={onNewGoal}
            className="bg-white/5 border-2 border-dashed border-white/10 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/40 hover:bg-white/[0.08] transition-all"
          >
             <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-primary transition-all group-hover:scale-110 mb-6">
                <span className="material-symbols-outlined text-4xl">add</span>
             </div>
             <h4 className="text-xl font-bold text-white">Adicionar Objetivo</h4>
             <p className="text-sm text-slate-500 mt-2 max-w-[240px]">Transforme sua visão em um plano de ação estruturado.</p>
          </div>
        </section>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {dailyGoals.map((goal) => (
              <div key={goal.id} className={`bg-surface-dark/40 border border-white/5 p-8 rounded-[2rem] space-y-6 group hover:border-white/10 transition-all ${goal.completed ? 'opacity-60' : ''}`}>
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <h3 className={`text-xl font-bold transition-all ${goal.completed ? 'text-slate-500 line-through' : 'text-white'}`}>{goal.title}</h3>
                       <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{goal.category}</span>
                    </div>
                    {goal.completed && <span className="material-symbols-outlined text-primary icon-fill">check_circle</span>}
                 </div>

                 <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                       <span>Progresso</span>
                       <span className="text-white">{goal.current} / {goal.total}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary" style={{ width: `${goal.progress}%` }}></div>
                    </div>
                 </div>

                 <button className={`w-full py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${goal.completed ? 'bg-white/5 text-slate-500' : 'bg-primary text-black hover:scale-[1.02] shadow-lg shadow-primary/20'}`}>
                    {goal.completed ? 'Concluída' : 'Marcar Conclusão'}
                 </button>
              </div>
           ))}
        </section>
      )}
    </div>
  );
};

export default Goals;
