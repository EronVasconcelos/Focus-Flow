
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

  const categoryStats = {
    Trabalho: tasks.filter(t => t.category === 'Trabalho').length,
    Saúde: tasks.filter(t => t.category === 'Saúde').length,
    Casa: tasks.filter(t => t.category === 'Casa').length,
    Pessoal: tasks.filter(t => t.category === 'Pessoal').length,
    Família: tasks.filter(t => t.category === 'Família').length,
  };

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-8 overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">Bom dia, Alex</h1>
          <p className="text-slate-500 dark:text-[#9daec2] mt-1 text-lg">Você completou <span className="text-primary font-bold">{progressPercent}%</span> das tarefas de hoje.</p>
        </div>
        <button 
          onClick={onNewTask}
          className="bg-primary hover:bg-blue-400 text-black font-black px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 hidden sm:flex"
        >
          <span className="material-symbols-outlined">add</span>
          Nova Tarefa
        </button>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[
          { label: 'Total de Tarefas', value: tasks.length.toString(), icon: 'assignment', color: 'blue', change: '+12%' },
          { label: 'Concluídas', value: completedCount.toString(), icon: 'check_circle', color: 'green', change: '+5%' },
          { label: 'Pendentes', value: (tasks.length - completedCount).toString(), icon: 'pending', color: 'orange', change: '-2%' },
          { label: 'Eficiência', value: `${progressPercent}%`, icon: 'trending_up', color: 'purple', change: '+3%' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-surface-dark p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:border-primary/20 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary`}>{stat.change}</span>
            </div>
            <p className="text-slate-500 dark:text-[#9daec2] text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-black dark:text-white">{stat.value}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
           <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold dark:text-white">Produtividade Semanal</h3>
            <div className="flex gap-2">
              <span className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary"></div> Ativo</span>
            </div>
          </div>
          <div className="h-48 w-full relative">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 200">
               <path d="M0,150 C50,140 80,100 120,90 C160,80 200,110 240,80 C280,50 320,60 360,40 C400,20 440,70 480,60 C520,50 560,30 600,20" fill="none" stroke="#00b4ff" strokeWidth="3" className="drop-shadow-[0_0_8px_rgba(0,180,255,0.4)]" />
            </svg>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4 border-t border-slate-100 dark:border-white/5 pt-4">
            {Object.entries(categoryStats).map(([cat, val]) => (
              <div key={cat} className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase truncate">{cat}</p>
                <p className="text-sm font-black dark:text-white">{val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold dark:text-white mb-4">Foco em Hábitos</h3>
          <div className="space-y-4 flex-1">
            {habits.slice(0, 3).map((habit) => (
              <div key={habit.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate dark:text-white">{habit.title}</p>
                  <p className="text-[10px] text-slate-500">{habit.streak} dias seguidos</p>
                </div>
                <div className="w-6 h-6 rounded border-2 border-slate-300 dark:border-white/20 hover:border-primary transition-colors flex items-center justify-center">
                   {habit.completedDays[0] && <span className="material-symbols-outlined text-primary text-xs font-black">done</span>}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-xs font-black text-slate-500 uppercase hover:text-primary transition-colors">Ver todos os hábitos</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
