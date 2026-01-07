
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
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-10 overflow-y-auto pb-24">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Painel de Saúde</h1>
          <p className="text-sm font-normal text-slate-400">Terça-feira, 06 de Janeiro • Monitorando seu <span className="text-health font-bold">bem-estar</span>.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-primary hover:bg-blue-400 text-black font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm font-bold">flag</span> Definir Metas
          </button>
          <button 
            onClick={onLog}
            className="flex-1 md:flex-none bg-primary hover:bg-blue-400 text-black font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 text-xs uppercase tracking-widest"
          >
            <span className="material-symbols-outlined font-bold text-sm">add</span> Novo Registro
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Peso Atual', value: '75.0', unit: 'kg', icon: 'scale', color: 'text-health', bgColor: 'bg-health/10', trend: '-0.5%' },
          { label: 'Passos Hoje', value: '8.432', unit: 'passos', icon: 'directions_walk', color: 'text-primary', bgColor: 'bg-primary/10', trend: '+12%' },
          { label: 'Calorias', value: '1.850', unit: 'kcal', icon: 'restaurant', color: 'text-orange-500', bgColor: 'bg-orange-500/10', trend: 'Ok' },
          { label: 'Hidratação', value: '1.2', unit: '/ 2.5L', icon: 'water_drop', color: 'text-blue-400', bgColor: 'bg-blue-400/10', trend: '48%' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-dark/40 border border-white/5 p-8 rounded-3xl group min-h-[180px] flex flex-col items-center justify-center text-center transition-all hover:border-white/10 relative overflow-hidden">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform shadow-lg mb-5`}>
              <span className="material-symbols-outlined text-[28px] icon-fill">{stat.icon}</span>
            </div>
            {stat.trend && <span className="absolute top-4 right-4 text-[9px] font-bold text-slate-400 bg-white/5 px-2 py-1 rounded-lg uppercase tracking-widest">{stat.trend}</span>}
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em]">{stat.label}</p>
              <div className="flex items-baseline justify-center gap-1 mt-2">
                 <span className="text-3xl font-bold text-white tracking-tighter">{stat.value}</span>
                 <span className="text-xs font-bold text-slate-500 uppercase">{stat.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-dark/40 border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-health">check_circle</span> Rastreador de Hábitos
            </h3>
          </div>
          <div className="divide-y divide-white/5">
             {habits.map((h, i) => (
               <div key={i} className="p-6 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-health transition-colors">
                      <span className="material-symbols-outlined text-[20px]">{h.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{h.name}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{h.desc}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    {h.status.map((s, idx) => (
                      <div key={idx} className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${s === true ? 'bg-health/20 border-health/40 text-health' : 'border-white/5 bg-white/5'}`}>
                         {s === true && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
                         {s === null && <div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div>}
                      </div>
                    ))}
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-surface-dark/40 border border-white/5 rounded-2xl p-8 space-y-6">
           <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
             <span className="material-symbols-outlined text-orange-400">notifications</span> Lembretes
           </h3>
           <div className="space-y-4">
              {reminders.map((rem, idx) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center gap-4">
                   <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-1 rounded-lg">{rem.time}</span>
                   <div className="flex-1">
                      <p className="text-sm font-bold text-white">{rem.title}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">{rem.desc}</p>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full py-4 bg-health/10 hover:bg-health/20 text-health border border-health/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
             Adicionar Lembrete
           </button>
        </div>
      </div>
    </div>
  );
};

export default Health;
