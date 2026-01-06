
import React, { useState } from 'react';

interface CalendarProps {
  onAddEvent: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ onAddEvent }) => {
  const [view, setView] = useState<'Dia' | 'Semana' | 'Mês'>('Mês');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters = [
    { id: 'Todos', icon: 'menu' },
    { id: 'Saúde', icon: 'monitor_heart', color: 'text-red-400', bg: 'bg-red-400/10' },
    { id: 'Trabalho', icon: 'business_center', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'Escola', icon: 'school', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { id: 'Casa', icon: 'home', color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const events = [
    { day: 2, title: 'Reunião Proj...', time: '10:00 - 11:30', cat: 'Trabalho', color: 'bg-blue-600/30', border: 'border-blue-500/30', indicator: 'C' },
    { day: 4, title: 'Reunião Pais', time: '18:00', cat: 'Escola', color: 'bg-yellow-600/20', border: 'border-yellow-500/20', indicator: 'P' },
    { day: 7, title: 'Dentista - Ana', time: '09:00', cat: 'Saúde', color: 'bg-pink-600/20', border: 'border-pink-500/20', indicator: 'A' },
    { day: 10, title: 'Deadline Entrega', time: '17:00', cat: 'Trabalho', color: 'bg-blue-600/30', border: 'border-blue-500/30' },
    { day: 12, title: 'Aniversário Vó', time: 'Dia todo', cat: 'Casa', color: 'bg-purple-600/30', border: 'border-purple-500/30', isSpecial: true },
    { day: 15, title: 'Prova de Mat...', time: '08:00', cat: 'Escola', color: 'bg-yellow-600/20', border: 'border-yellow-500/20', indicator: 'L' },
    { day: 18, title: 'Compras do...', time: '19:00', cat: 'Casa', color: 'bg-emerald-600/20', border: 'border-emerald-500/20', icon: 'shopping_cart' },
    { day: 23, title: 'Pediatra - Lu...', time: '14:30', cat: 'Saúde', color: 'bg-pink-600/20', border: 'border-pink-500/20', indicator: 'L' },
    { day: 26, title: 'Almoço Equipe', time: '12:00', cat: 'Trabalho', color: 'bg-blue-600/30', border: 'border-blue-500/30' },
  ];

  const calendarDays = Array.from({ length: 35 }, (_, i) => i - 2);

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full flex flex-col space-y-10 overflow-hidden pb-4">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Outubro 2023</h1>
          <p className="text-sm font-normal text-slate-400">Calendário Familiar • <span className="text-primary font-bold">Semana 42</span></p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 flex-1 md:flex-none">
            {['Dia', 'Semana', 'Mês'].map((v) => (
              <button 
                key={v}
                onClick={() => setView(v as any)}
                className={`flex-1 md:flex-none px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${view === v ? 'bg-primary text-black' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="flex-1 md:flex-none bg-primary hover:bg-blue-400 text-black font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">person_add</span>
            Convidar
          </button>
        </div>
      </header>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((f) => (
          <button 
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap ${activeFilter === f.id ? 'bg-primary border-primary text-black' : 'bg-surface-dark/40 border-white/5 text-slate-400 hover:text-white'}`}
          >
            <span className={`material-symbols-outlined text-[18px] ${activeFilter === f.id ? '' : f.color}`}>{f.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">{f.id}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 bg-surface-dark/20 border border-white/5 rounded-2xl overflow-hidden flex flex-col min-h-0">
        <div className="grid grid-cols-7 border-b border-white/5 bg-background-dark/30">
          {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'].map((d, i) => (
            <div key={d} className={`py-4 text-center text-[10px] font-bold tracking-[0.2em] ${i >= 5 ? 'text-green-500' : 'text-slate-500'}`}>
              {d}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 flex-1 overflow-y-auto scrollbar-hide divide-x divide-y divide-white/5 border-l border-t border-white/5">
           {calendarDays.map((d, i) => {
              const dayEvents = events.filter(e => e.day === d);
              const isToday = d === 12;
              const isCurrentMonth = d > 0 && d <= 31;
              
              return (
                <div key={i} className={`min-h-[140px] p-3 space-y-2 group hover:bg-white/[0.02] transition-colors relative cursor-pointer ${!isCurrentMonth ? 'opacity-20' : ''}`}>
                   <div className="flex justify-between items-start">
                      <span className={`text-sm font-bold transition-colors ${isToday ? 'w-7 h-7 bg-primary text-black flex items-center justify-center rounded-full' : 'text-slate-600 group-hover:text-slate-400'}`}>
                        {isCurrentMonth ? d : (d <= 0 ? 30 + d : d - 31)}
                      </span>
                   </div>

                   <div className="space-y-1.5">
                      {dayEvents.map((e, idx) => (
                        <div 
                          key={idx} 
                          onClick={(ev) => {ev.stopPropagation(); onAddEvent();}}
                          className={`p-2 rounded-lg border ${e.color} ${e.border} hover:scale-[1.02] active:scale-95 transition-all relative overflow-hidden group/event`}
                        >
                           <div className="flex items-center justify-between gap-1 mb-1">
                              <p className="text-[10px] font-bold text-white truncate leading-none">{e.title}</p>
                           </div>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{e.time}</p>
                        </div>
                      ))}
                   </div>
                   
                   <button 
                     onClick={(ev) => {ev.stopPropagation(); onAddEvent();}}
                     className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-primary/5 transition-opacity"
                   >
                      <span className="material-symbols-outlined text-primary text-3xl font-light">add</span>
                   </button>
                </div>
              );
           })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
