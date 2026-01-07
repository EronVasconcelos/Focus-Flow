
import React from 'react';
import { Habit } from '../types';

interface HabitsProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  onNewHabit: () => void;
}

const Habits: React.FC<HabitsProps> = ({ habits, setHabits, onNewHabit }) => {
  const toggleDay = (habitId: string, dayIndex: number) => {
    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
        const newDays = [...h.completedDays];
        newDays[dayIndex] = !newDays[dayIndex];
        return { ...h, completedDays: newDays, streak: h.streak + (newDays[dayIndex] ? 1 : -1) };
      }
      return h;
    }));
  };

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-10 overflow-y-auto pb-32">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Gerenciamento de Hábitos</h1>
          <p className="text-sm font-normal text-slate-400">Construa consistência e acompanhe seu <span className="text-primary font-bold">progresso diário</span>.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-primary hover:bg-blue-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm font-bold">history</span> Histórico
          </button>
          <button 
            onClick={onNewHabit} 
            className="bg-primary hover:bg-blue-400 text-black font-bold px-8 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 text-xs uppercase tracking-widest"
          >
            <span className="material-symbols-outlined font-bold text-sm">add</span> Novo Hábito
          </button>
        </div>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Hábitos Ativos', value: '8', icon: 'list_alt', color: 'text-work', bgColor: 'bg-work/10' },
          { label: 'Concluídos Hoje', value: '5/8', icon: 'check_circle', color: 'text-health', bgColor: 'bg-health/10' },
          { label: 'Sequência Atual', value: '24d', icon: 'local_fire_department', color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
          { label: 'Consistência', value: '88%', icon: 'trending_up', color: 'text-personal', bgColor: 'bg-personal/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-dark/40 p-8 rounded-3xl border border-white/5 group min-h-[180px] flex flex-col items-center justify-center text-center transition-all hover:border-white/10">
            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform shadow-lg mb-5`}>
              <span className="material-symbols-outlined text-[28px]">{stat.icon}</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-white leading-none tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] mt-3">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="bg-surface-dark/40 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-3">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span> Rastreador Semanal
          </h3>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">23 Out - 29 Out</span>
        </div>

        <div className="divide-y divide-white/5">
          {habits.map((habit, idx) => (
            <div key={habit.id} className="p-8 flex items-center gap-8 group hover:bg-white/[0.01] transition-colors">
              <div className="flex items-center gap-6 flex-1 min-w-0">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center transition-all shrink-0">
                   <span className={`material-symbols-outlined text-2xl ${idx % 3 === 0 ? 'text-health' : idx % 3 === 1 ? 'text-personal' : 'text-work'}`}>
                     {idx % 3 === 0 ? 'water_drop' : idx % 3 === 1 ? 'auto_stories' : 'exercise'}
                   </span>
                </div>
                <div className="min-w-0">
                   <h4 className="font-bold text-white text-lg truncate group-hover:text-primary transition-colors">{habit.title}</h4>
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${idx % 3 === 0 ? 'bg-health/10 text-health' : idx % 3 === 1 ? 'bg-personal/10 text-personal' : 'bg-work/10 text-work'}`}>{habit.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {['S','T','Q','Q','S','S','D'].map((day, i) => (
                  <button 
                    key={day+i}
                    onClick={() => toggleDay(habit.id, i)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border-2 ${habit.completedDays[i] ? 'bg-health border-health text-black shadow-lg shadow-health/20' : 'border-white/5 bg-white/5 text-slate-600 hover:border-white/10'}`}
                  >
                    {habit.completedDays[i] ? <span className="material-symbols-outlined font-bold text-lg">check</span> : <span className="text-[10px] font-bold uppercase">{day}</span>}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0 w-16 justify-end">
                <span className="material-symbols-outlined text-orange-500 text-xl icon-fill">local_fire_department</span>
                <span className="text-sm font-bold text-slate-400">{habit.streak}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Habits;
