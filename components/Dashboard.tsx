
import React from 'react';
import { Task, Habit } from '../types';

interface DashboardProps {
  tasks: Task[];
  habits: Habit[];
  onNewTask: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, habits, onNewTask }) => {
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const statConfig = [
    { label: 'Total de Tarefas', value: tasks.length.toString(), icon: 'assignment', color: 'text-work', bgColor: 'bg-work/10', change: '+12%' },
    { label: 'Concluídas', value: completedCount.toString(), icon: 'check_circle', color: 'text-health', bgColor: 'bg-health/10', change: '+5%' },
    { label: 'Pendentes', value: (tasks.length - completedCount).toString(), icon: 'pending', color: 'text-orange-400', bgColor: 'bg-orange-400/10', change: '-2%' },
    { label: 'Eficiência', value: `${progressPercent}%`, icon: 'trending_up', color: 'text-personal', bgColor: 'bg-personal/10', change: '+3%' },
  ];

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-10 overflow-y-auto pb-24">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Bom dia, Alex</h1>
          <p className="text-sm font-normal text-slate-400">Você completou <span className="text-primary font-bold">{progressPercent}%</span> das tarefas de hoje.</p>
        </div>
        <button 
          onClick={onNewTask}
          className="bg-primary hover:bg-blue-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined font-bold">add</span>
          Nova Tarefa
        </button>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statConfig.map((stat) => (
          <div key={stat.label} className="bg-surface-dark/40 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 text-slate-400 uppercase tracking-widest">{stat.change}</span>
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-dark/40 p-8 rounded-2xl border border-white/5">
           <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Produtividade Semanal
           </h3>
           <div className="h-48 w-full relative">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 200">
                 <path d="M0,150 C50,140 80,100 120,90 C160,80 200,110 240,80 C280,50 320,60 360,40 C400,20 440,70 480,60 C520,50 560,30 600,20" fill="none" stroke="#00b4ff" strokeWidth="3" className="drop-shadow-[0_0_8px_rgba(0,180,255,0.4)]" />
              </svg>
           </div>
        </div>

        <div className="bg-surface-dark/40 p-8 rounded-2xl border border-white/5 flex flex-col">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-personal">published_with_changes</span>
            Hábitos em Foco
          </h3>
          <div className="space-y-4 flex-1">
            {habits.slice(0, 3).map((habit, idx) => (
              <div key={habit.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${idx % 2 === 0 ? 'bg-health/10 text-health' : 'bg-personal/10 text-personal'} group-hover:bg-white/10 transition-all`}>
                  <span className="material-symbols-outlined text-sm">{idx % 2 === 0 ? 'monitor_heart' : 'published_with_changes'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate text-white">{habit.title}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{habit.streak} dias sequência</p>
                </div>
                <div className="w-6 h-6 rounded border-2 border-white/10 flex items-center justify-center">
                   {habit.completedDays[0] && <span className="material-symbols-outlined text-primary text-xs font-bold">done</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
