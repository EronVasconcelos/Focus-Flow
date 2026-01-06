
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

  // Mock de eventos baseados na imagem
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

  const calendarDays = Array.from({ length: 35 }, (_, i) => i - 2); // Outubro 2023 começa na Terça

  return (
    <div className="flex-1 p-4 lg:p-6 max-w-[1600px] mx-auto w-full flex flex-col space-y-6 overflow-hidden pb-4">
      {/* TOP SEARCH BAR */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]">search</span>
          <input 
            type="text" 
            placeholder="Buscar eventos, tarefas..." 
            className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-sm text-slate-300 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>
          <div className="h-6 w-px bg-white/10"></div>
          <div className="flex items-center gap-3">
             <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors">Hoje</button>
             <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/5">
                <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
                <button className="p-1 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
             </div>
          </div>
        </div>
      </div>

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-black text-white tracking-tight">Outubro 2023</h1>
          <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">Semana 42</span>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 flex-1 md:flex-none">
            {['Dia', 'Semana', 'Mês'].map((v) => (
              <button 
                key={v}
                onClick={() => setView(v as any)}
                className={`flex-1 md:flex-none px-6 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${view === v ? 'bg-background-dark text-white border border-white/5 shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">person_add</span>
            Convidar Membro
          </button>
        </div>
      </div>

      {/* FILTER CHIPS */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((f) => (
          <button 
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap ${activeFilter === f.id ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-white/5 text-slate-500 hover:border-white/10'}`}
          >
            <span className={`material-symbols-outlined text-[18px] ${f.id !== 'Todos' ? f.color : ''} ${f.id !== 'Todos' ? 'icon-fill' : ''}`}>{f.icon}</span>
            <span className="text-xs font-black uppercase tracking-widest">{f.id}</span>
          </button>
        ))}
      </div>

      {/* CALENDAR GRID */}
      <div className="flex-1 bg-surface-dark/20 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col min-h-0">
        <div className="grid grid-cols-7 border-b border-white/5 bg-background-dark/30">
          {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'].map((d, i) => (
            <div key={d} className={`py-4 text-center text-[10px] font-black tracking-[0.2em] ${i >= 5 ? 'text-green-500' : 'text-slate-500'}`}>
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
                      <span className={`text-sm font-black transition-colors ${isToday ? 'w-7 h-7 bg-primary text-black flex items-center justify-center rounded-full' : 'text-slate-600 group-hover:text-slate-400'}`}>
                        {isCurrentMonth ? d : (d <= 0 ? 30 + d : d - 31)}
                      </span>
                      {isToday && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mt-1.5"></div>}
                   </div>

                   <div className="space-y-1.5">
                      {dayEvents.map((e, idx) => (
                        <div 
                          key={idx} 
                          onClick={(e) => {e.stopPropagation(); onAddEvent();}}
                          className={`p-2 rounded-lg border ${e.color} ${e.border} hover:scale-[1.02] active:scale-95 transition-all relative overflow-hidden group/event`}
                        >
                           <div className="flex items-center justify-between gap-1 mb-1">
                              <p className="text-[10px] font-black text-white truncate leading-none">{e.title}</p>
                              {e.indicator && (
                                <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[8px] font-black text-white shrink-0">
                                   {e.indicator}
                                </div>
                              )}
                              {e.icon && <span className="material-symbols-outlined text-sm text-white/40">{e.icon}</span>}
                           </div>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{e.time}</p>
                           
                           {isToday && e.isSpecial && (
                             <div className="absolute top-0 right-0 p-1 opacity-20 group-hover/event:opacity-40 transition-opacity">
                               <span className="material-symbols-outlined text-[14px] text-white">celebration</span>
                             </div>
                           )}
                        </div>
                      ))}
                   </div>
                   
                   {/* Ghost add button on hover */}
                   <button 
                     onClick={(e) => {e.stopPropagation(); onAddEvent();}}
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
