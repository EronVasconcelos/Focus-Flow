
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

  const weeklyReminders = [
    { title: 'Revisão Diária', time: '17:00', countdown: 'Em 30 min', icon: 'history_edu', color: 'orange' },
    { title: 'Jantar em Família', time: '19:30', countdown: 'Hoje', icon: 'groups', color: 'pink' },
  ];

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full space-y-8 overflow-y-auto pb-32">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">Terça-feira</span>
          <h1 className="text-4xl font-black text-white tracking-tight">Gerenciamento de Hábitos</h1>
          <p className="text-slate-400 font-medium">Construa consistência e acompanhe seu <span className="text-primary">progresso diário</span>.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">history</span>
            Histórico
          </button>
          <button 
            onClick={onNewHabit} 
            className="flex-1 md:flex-none bg-primary text-black font-black px-8 py-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined font-black">add</span>
            Novo Hábito
          </button>
        </div>
      </header>

      {/* STATS GRID */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Hábitos Ativos', value: '8', icon: 'list_alt', sub: 'Total' },
          { label: 'Concluídos Hoje', value: '5 /8', icon: 'check_circle', sub: '62%', color: 'text-primary' },
          { label: 'Melhor Sequência', value: '24 Dias', icon: 'local_fire_department', sub: 'Recorde!', color: 'text-orange-500' },
          { label: 'Taxa Consistência', value: '88%', icon: 'trending_up', sub: '+5%', color: 'text-primary' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-dark/40 border border-white/5 p-6 rounded-[2rem] space-y-4 group hover:border-white/10 transition-all">
            <div className="flex justify-between items-start">
              <div className={`w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors`}>
                <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
              </div>
              <span className={`text-[10px] font-black ${stat.color || 'text-slate-500'} ${stat.color ? 'bg-primary/5 px-2 py-1 rounded-lg' : ''}`}>{stat.sub}</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500">{stat.label}</p>
              <p className="text-3xl font-black text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: WEEKLY TRACKER */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-dark/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h3 className="font-black text-white uppercase tracking-widest text-sm flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                Rastreador Semanal
              </h3>
              <div className="flex items-center gap-4 text-slate-500">
                <button className="hover:text-white transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
                <span className="text-[10px] font-black uppercase tracking-widest">23 Out - 29 Out</span>
                <button className="hover:text-white transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {habits.map((habit, idx) => (
                <div key={habit.id} className="p-8 flex items-center gap-8 group hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-6 flex-1 min-w-0">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-all shrink-0">
                       <span className="material-symbols-outlined text-2xl">{idx === 0 ? 'water_drop' : idx === 1 ? 'auto_stories' : 'exercise'}</span>
                    </div>
                    <div className="min-w-0">
                       <h4 className="font-black text-white text-lg truncate group-hover:text-primary transition-colors">{habit.title}</h4>
                       <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-widest">{habit.category}</span>
                          <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                             <span className="material-symbols-outlined text-[14px]">notifications</span>
                             {idx === 0 ? '09:00' : idx === 1 ? '21:30' : '06:30'}
                          </span>
                       </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4">
                    {['S','T','Q','Q','S','S','D'].map((day, i) => (
                      <div key={day+i} className="flex flex-col items-center gap-2">
                        <span className={`text-[9px] font-black tracking-tighter ${i === 1 ? 'text-primary' : 'text-slate-600'}`}>{day}</span>
                        <button 
                          onClick={() => toggleDay(habit.id, i)}
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all border-2 relative ${
                            habit.completedDays[i] 
                            ? 'bg-primary border-primary text-black shadow-lg shadow-primary/20' 
                            : i === 1 ? 'border-dashed border-slate-700' : 'border-transparent bg-white/5'
                          }`}
                        >
                          {habit.completedDays[i] && <span className="material-symbols-outlined font-black text-xl">check</span>}
                          {!habit.completedDays[i] && i === 1 && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse absolute -top-1"></div>}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-16 justify-end">
                    <span className="material-symbols-outlined text-orange-500 text-xl icon-fill">local_fire_department</span>
                    <span className="text-sm font-black text-slate-400">{habit.streak}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PERFORMANCE & REMINDERS */}
        <div className="space-y-8">
           {/* PERFORMANCE CHART */}
           <div className="bg-surface-dark/40 border border-white/5 rounded-[2.5rem] p-8 space-y-8">
              <div className="space-y-1">
                <h3 className="font-black text-white uppercase tracking-widest text-sm">Desempenho Semanal</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Taxa de conclusão por dia</p>
              </div>

              <div className="h-48 flex items-end justify-between gap-3 px-2">
                 {[40, 85, 30, 55, 75, 60, 45].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-4">
                       <div className="w-full relative group">
                          <div 
                            className={`w-full rounded-t-xl transition-all duration-700 ${i === 1 ? 'bg-primary shadow-[0_0_20px_rgba(0,180,255,0.4)]' : 'bg-white/5 group-hover:bg-white/10'}`} 
                            style={{ height: `${h}%` }}
                          />
                       </div>
                       <span className={`text-[10px] font-black uppercase tracking-tighter ${i === 1 ? 'text-primary' : 'text-slate-600'}`}>
                          {['S','T','Q','Q','S','S','D'][i]}
                       </span>
                    </div>
                 ))}
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                 <span className="text-xs font-bold text-slate-500">Média diária</span>
                 <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    <span className="text-sm font-black">68%</span>
                 </div>
              </div>
           </div>

           {/* NEXT REMINDERS */}
           <div className="bg-surface-dark/40 border border-white/5 rounded-[2.5rem] p-8 space-y-6 relative">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-white uppercase tracking-widest text-sm">Próximos Lembretes</h3>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                   <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                </div>
              </div>

              <div className="space-y-4">
                 {weeklyReminders.map((rem, i) => (
                   <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-5 group hover:border-white/10 transition-all cursor-pointer">
                      <div className={`w-12 h-12 bg-${rem.color}-500/10 text-${rem.color}-500 rounded-2xl flex items-center justify-center shrink-0`}>
                         <span className="material-symbols-outlined">{rem.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="font-black text-white text-sm truncate">{rem.title}</p>
                         <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">
                           <span className={`text-${rem.color}-400`}>•</span> {rem.countdown} • {rem.time}
                         </p>
                      </div>
                   </div>
                 ))}
              </div>

              {/* FLOATING ACTION */}
              <button className="absolute -bottom-4 right-8 w-14 h-14 bg-primary text-black rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-10">
                 <span className="material-symbols-outlined text-3xl font-black">add</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Habits;
