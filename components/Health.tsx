
import React from 'react';

interface HealthProps {
  onLog: () => void;
}

const Health: React.FC<HealthProps> = ({ onLog }) => {
  const habits = [
    { name: 'Treino Funcional', desc: '45 mins', status: [true, true, null, 'dot', 'dot', 'dot', 'dot'], icon: 'exercise' },
    { name: 'Sem Açúcar', desc: 'Dieta Limpa', status: [true, false, null, 'dot', 'dot', 'dot', 'dot'], icon: 'restaurant' },
    { name: 'Alongamento', desc: '15 minutos', status: [true, true, true, 'dot', 'dot', 'dot', 'dot'], icon: 'accessibility_new' },
  ];

  const reminders = [
    { time: '16:30', title: 'Beber Água', desc: 'Copo de 250ml', active: true, color: 'text-primary' },
    { time: '18:00', title: 'Academia', desc: 'Treino B (Pernas)', active: false, color: 'text-work' },
    { time: '20:00', title: 'Jantar Leve', desc: 'Salada + Proteína', active: true, color: 'text-health' },
  ];

  return (
    <div className="flex-1 p-4 lg:p-8 max-w-[1600px] mx-auto w-full space-y-6 overflow-y-auto pb-24">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-health">calendar_month</span>
            Terça-feira, 06 de Janeiro
          </p>
          <h1 className="text-3xl font-bold text-white tracking-tight mt-1">Painel de Saúde</h1>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white uppercase tracking-widest hover:bg-white/10 transition-all">
            <span className="material-symbols-outlined text-sm text-primary">flag</span>
            Definir Metas
          </button>
          <button 
            onClick={onLog}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-health text-black rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-health/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-sm font-bold">add</span>
            Novo Registro
          </button>
        </div>
      </header>

      {/* QUICK STATS CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* PESO */}
        <div className="bg-surface-dark/40 border border-white/5 p-6 rounded-[2rem] space-y-4 group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-health/10 rounded-xl flex items-center justify-center text-health group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined icon-fill">scale</span>
            </div>
            <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded-lg">-0.5%</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">Peso Atual</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">75.0</span>
              <span className="text-sm font-bold text-slate-400">kg</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-health" style={{ width: '85%' }}></div>
            </div>
            <p className="text-[10px] font-bold text-slate-500 text-right">Meta: 70kg</p>
          </div>
        </div>

        {/* PASSOS */}
        <div className="bg-surface-dark/40 border border-white/5 p-6 rounded-[2rem] space-y-4 group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">directions_walk</span>
            </div>
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">+12%</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">Passos Hoje</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">8.432</span>
              <span className="text-sm font-bold text-slate-400">passos</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '70%' }}></div>
            </div>
            <p className="text-[10px] font-bold text-slate-500 text-right">Meta: 10k</p>
          </div>
        </div>

        {/* CALORIAS */}
        <div className="bg-surface-dark/40 border border-white/5 p-6 rounded-[2rem] space-y-4 group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <span className="text-[10px] font-bold text-health bg-health/10 px-2 py-1 rounded-lg uppercase">Ok</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">Calorias Hoje</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">1.850</span>
              <span className="text-sm font-bold text-slate-400">kcal</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500" style={{ width: '60%' }}></div>
            </div>
            <p className="text-[10px] font-bold text-slate-500 text-right">Meta: 2.200</p>
          </div>
        </div>

        {/* HIDRATAÇÃO */}
        <div className="bg-surface-dark/40 border border-white/5 p-6 rounded-[2rem] space-y-4 group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">water_drop</span>
            </div>
            <button className="text-slate-500 hover:text-white transition-colors">
               <span className="material-symbols-outlined text-[20px] text-primary">add</span>
            </button>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">Hidratação</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">1.2</span>
              <span className="text-sm font-bold text-slate-400">/ 2.5L</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            {[1,1,1,1,0,0].map((v, i) => (
              <div key={i} className={`flex-1 h-6 rounded ${v ? 'bg-primary' : 'bg-white/5'}`}></div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUNA ESQUERDA: HÁBITOS E ATIVIDADE */}
        <div className="lg:col-span-2 space-y-6">
          {/* RASTREADOR DE HÁBITOS */}
          <div className="bg-surface-dark/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
             <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="flex items-center gap-3 font-bold text-white uppercase tracking-widest text-sm">
                  <div className="w-6 h-6 rounded-full bg-health/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-health">check_circle</span>
                  </div>
                  Rastreador de Saúde
                </h3>
                <div className="flex items-center gap-4">
                  <button className="text-slate-500 hover:text-white"><span className="material-symbols-outlined text-sm text-primary">chevron_left</span></button>
                  <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-3 py-1 rounded-lg">23 - 29 Out</span>
                  <button className="text-slate-500 hover:text-white"><span className="material-symbols-outlined text-sm text-primary">chevron_right</span></button>
                </div>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
                     <th className="px-6 py-4 font-bold">Atividade</th>
                     {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(d => (
                       <th key={d} className={`px-4 py-4 text-center ${d === 'Qua' ? 'text-health' : ''}`}>{d}</th>
                     ))}
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {habits.map((h, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-health transition-colors">
                                <span className="material-symbols-outlined text-[20px]">{h.icon}</span>
                             </div>
                             <div>
                               <p className="text-sm font-bold text-white">{h.name}</p>
                               <p className="text-[10px] font-bold text-slate-500">{h.desc}</p>
                             </div>
                          </div>
                        </td>
                        {h.status.map((s, idx) => (
                          <td key={idx} className="px-4 py-5 text-center">
                             {s === true && <span className="material-symbols-outlined text-health text-[20px] icon-fill">check_circle</span>}
                             {s === false && <span className="material-symbols-outlined text-red-500 text-[20px] icon-fill">cancel</span>}
                             {s === null && <div className="w-6 h-6 rounded-lg border-2 border-slate-700 mx-auto"></div>}
                             {s === 'dot' && <div className="w-1 h-1 bg-slate-700 rounded-full mx-auto"></div>}
                          </td>
                        ))}
                      </tr>
                    ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        {/* COLUNA DIREITA: METAS E LEMBRETES */}
        <div className="space-y-6">
           {/* METAS DE HOJE */}
           <div className="bg-surface-dark/40 border border-white/5 rounded-[2.5rem] p-8 space-y-8">
              <h3 className="font-bold text-white uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">flag</span>
                Metas de Hoje
              </h3>
              <div className="flex items-center gap-6">
                 <div className="relative w-24 h-24 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                       <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="251" strokeDashoffset="63" className="text-health" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-sm font-bold text-white">75%</span>
                    </div>
                 </div>
                 <div>
                    <h4 className="font-bold text-white text-lg">Correr 5km</h4>
                    <p className="text-xs font-bold text-slate-500">3.8km completados</p>
                 </div>
              </div>
              
              <div className="space-y-6">
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                       <span className="text-slate-400">Meditação</span>
                       <span className="text-white">10/15 min</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-health" style={{ width: '66%' }}></div>
                    </div>
                 </div>
              </div>

              <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-bold text-white uppercase tracking-widest transition-all">
                Ver Detalhes
              </button>
           </div>

           {/* LEMBRETES */}
           <div className="bg-surface-dark/40 border border-white/5 rounded-[2.5rem] p-8 space-y-6 relative min-h-[400px]">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white uppercase tracking-widest text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-400 text-sm">notifications</span>
                  Lembretes
                </h3>
                <button className="text-primary hover:scale-110 transition-transform"><span className="material-symbols-outlined">add</span></button>
              </div>

              <div className="space-y-3">
                 {reminders.map((rem, idx) => (
                   <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 group hover:border-white/10 transition-all">
                      <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-2.5 py-1.5 rounded-lg">{rem.time}</span>
                      <div className="flex-1 min-w-0">
                         <p className="text-sm font-bold text-white truncate">{rem.title}</p>
                         <p className={`text-[10px] font-bold truncate ${rem.color}`}>{rem.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer scale-90">
                        <input type="checkbox" className="sr-only peer" defaultChecked={rem.active} />
                        <div className="w-10 h-5 bg-white/10 rounded-full peer-checked:bg-health transition-all after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-5"></div>
                      </label>
                   </div>
                 ))}
              </div>

              {/* FLOATING ACTION BUTTON */}
              <button className="absolute bottom-6 right-6 w-14 h-14 bg-health text-black rounded-full shadow-2xl shadow-health/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-10">
                 <span className="material-symbols-outlined text-3xl font-bold">add</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Health;
