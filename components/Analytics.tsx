
import React from 'react';

const Analytics: React.FC = () => {
  const summaryStats = [
    { label: 'Horas de Foco', value: '42h 30m', icon: 'schedule', color: 'text-blue-400', bg: 'bg-blue-400/10', trend: '+8%', up: true },
    { label: 'Tarefas Concluídas', value: '128', icon: 'check_circle', color: 'text-emerald-400', bg: 'bg-emerald-400/10', trend: '+15%', up: true },
    { label: 'Metas Atingidas', value: '8/10', icon: 'flag', color: 'text-orange-400', bg: 'bg-orange-400/10', trend: '0%', up: null },
    { label: 'Equilíbrio Vida/Trab', value: '92%', icon: 'sentiment_satisfied', color: 'text-purple-400', bg: 'bg-purple-400/10', trend: '+5%', up: true },
  ];

  const categoryTime = [
    { name: 'Trabalho', hours: '24h', color: 'bg-blue-500', text: 'text-blue-500' },
    { name: 'Saúde', hours: '8h', color: 'bg-emerald-500', text: 'text-emerald-500' },
    { name: 'Família', hours: '6h', color: 'bg-pink-500', text: 'text-pink-500' },
    { name: 'Pessoal', hours: '4.5h', color: 'bg-purple-500', text: 'text-purple-500' },
  ];

  const detailedData = [
    { cat: 'Trabalho', icon: 'business_center', color: 'bg-blue-500/20 text-blue-400', completed: '45 / 50', time: '24h 10m', efficiency: '94%', status: 'No Prazo', statusCol: 'text-emerald-500 bg-emerald-500/10' },
    { cat: 'Saúde', icon: 'monitor_heart', color: 'bg-emerald-500/20 text-emerald-400', completed: '12 / 14', time: '6h 30m', efficiency: '85%', status: 'Atenção', statusCol: 'text-orange-500 bg-orange-500/10' },
    { cat: 'Família', icon: 'groups', color: 'bg-pink-500/20 text-pink-400', completed: '8 / 8', time: '5h 45m', efficiency: '100%', status: 'Concluído', statusCol: 'text-emerald-500 border border-emerald-500/30' },
    { cat: 'Pessoal', icon: 'person', color: 'bg-purple-500/20 text-purple-400', completed: '5 / 10', time: '3h 20m', efficiency: '50%', status: 'Atrasado', statusCol: 'text-red-500 bg-red-500/10' },
  ];

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-10 overflow-y-auto pb-32">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Análise e Relatórios</h1>
          <p className="text-slate-400 font-normal mt-1 text-lg">Visualize seu desempenho e tendências em todas as áreas da vida.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white hover:bg-white/10 transition-all">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            Outubro 2023
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black rounded-2xl text-sm font-bold shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg font-bold">download</span>
            Exportar PDF
          </button>
        </div>
      </header>

      {/* SUMMARY GRID */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, i) => (
          <div key={i} className="bg-surface-dark/40 border border-white/5 p-8 rounded-[2rem] space-y-6 group hover:border-white/10 transition-all relative overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-2xl icon-fill">{stat.icon}</span>
              </div>
              {stat.trend !== '0%' && (
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-widest ${stat.up ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                  {stat.trend}
                </span>
              )}
            </div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-surface-dark/40 border border-white/5 p-8 rounded-[2.5rem] flex flex-col space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white tracking-tight">Tendência de Produtividade</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Atual</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative min-h-[220px]">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,130 C40,110 80,70 120,75 C160,80 200,60 240,45 C280,30 320,60 360,50 L400,45 L400,150 L0,150 Z" fill="url(#chartGradient)" />
              <path d="M0,130 C40,110 80,70 120,75 C160,80 200,60 240,45 C280,30 320,60 360,50 L400,45" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="lg:col-span-3 bg-surface-dark/40 border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center">
          <h3 className="text-lg font-bold text-white tracking-tight self-start mb-8">Tempo por Categoria</h3>
          <div className="relative w-44 h-44">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="88" cy="88" r="75" stroke="#ffffff05" strokeWidth="16" fill="transparent" />
              <circle cx="88" cy="88" r="75" stroke="#3b82f6" strokeWidth="16" fill="transparent" strokeDasharray="471" strokeDashoffset="180" />
              <circle cx="88" cy="88" r="75" stroke="#10b981" strokeWidth="16" fill="transparent" strokeDasharray="471" strokeDashoffset="420" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Total</span>
              <span className="text-2xl font-bold text-white">42.5h</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-surface-dark/40 border border-white/5 p-8 rounded-[2.5rem] flex flex-col space-y-6">
          <h3 className="text-lg font-bold text-white tracking-tight">Metas do Mês</h3>
          <div className="space-y-8 flex-1">
            {[
              { label: 'Trabalho', title: 'Lançar Projeto Beta', progress: 85, color: 'text-blue-500', bar: 'bg-blue-500' },
              { label: 'Saúde', title: 'Correr 50km', progress: 60, color: 'text-emerald-500', bar: 'bg-emerald-500' },
            ].map((goal, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className={`text-[10px] font-bold uppercase ${goal.color}`}>{goal.label}</p>
                    <p className="text-sm font-bold text-white">{goal.title}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{goal.progress}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${goal.bar}`} style={{ width: `${goal.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <section className="bg-surface-dark/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 bg-white/[0.02]">
          <h3 className="text-xl font-bold text-white">Relatório Detalhado</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
                <th className="px-8 py-6">Categoria</th>
                <th className="px-8 py-6 text-center">Concluídas</th>
                <th className="px-8 py-6 text-center">Eficiência</th>
                <th className="px-8 py-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {detailedData.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${row.color}`}>
                        <span className="material-symbols-outlined text-[20px]">{row.icon}</span>
                      </div>
                      <span className="font-bold text-white">{row.cat}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-slate-400 font-bold">{row.completed}</td>
                  <td className="px-8 py-6 text-center">
                    <span className="font-bold text-emerald-500">{row.efficiency}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${row.statusCol}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
