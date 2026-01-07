
import React from 'react';

const Analytics: React.FC = () => {
  const summaryStats = [
    { label: 'Horas de Foco', value: '42h 30m', icon: 'schedule', color: 'text-blue-400', bg: 'bg-blue-400/10', trend: '+8%', up: true },
    { label: 'Tarefas Concluídas', value: '128', icon: 'check_circle', color: 'text-emerald-400', bg: 'bg-emerald-400/10', trend: '+15%', up: true },
    { label: 'Metas Atingidas', value: '8/10', icon: 'flag', color: 'text-orange-400', bg: 'bg-orange-400/10', trend: '0%', up: null },
    { label: 'Equilíbrio Vida/Trab', value: '92%', icon: 'sentiment_satisfied', color: 'text-purple-400', bg: 'bg-purple-400/10', trend: '+5%', up: true },
  ];

  const detailedData = [
    { cat: 'Trabalho', icon: 'business_center', color: 'bg-blue-500/20 text-blue-400', completed: '45 / 50', time: '24h 10m', efficiency: '94%', status: 'No Prazo', statusCol: 'text-emerald-500 bg-emerald-500/10' },
    { cat: 'Saúde', icon: 'monitor_heart', color: 'bg-emerald-500/20 text-emerald-400', completed: '12 / 14', time: '6h 30m', efficiency: '85%', status: 'Atenção', statusCol: 'text-orange-500 bg-orange-500/10' },
    { cat: 'Família', icon: 'groups', color: 'bg-pink-500/20 text-pink-400', completed: '8 / 8', time: '5h 45m', efficiency: '100%', status: 'Concluído', statusCol: 'text-emerald-500 border border-emerald-500/30' },
    { cat: 'Pessoal', icon: 'person', color: 'bg-purple-500/20 text-purple-400', completed: '5 / 10', time: '3h 20m', efficiency: '50%', status: 'Atrasado', statusCol: 'text-red-500 bg-red-500/10' },
  ];

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-10 overflow-y-auto pb-32">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Análise e Relatórios</h1>
          <p className="text-sm font-normal text-slate-400">Visualize seu desempenho e <span className="text-primary font-bold">tendências de produtividade</span>.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-primary hover:bg-blue-400 text-black font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm font-bold">calendar_today</span>
            Outubro 2023
          </button>
          <button className="bg-primary hover:bg-blue-400 text-black font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined font-bold text-sm">download</span>
            Exportar PDF
          </button>
        </div>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, i) => (
          <div key={i} className="bg-surface-dark/40 border border-white/5 p-8 rounded-3xl group min-h-[180px] flex flex-col items-center justify-center text-center transition-all hover:border-white/10 relative overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-1">
              {stat.trend !== '0%' && (
                <span className={`text-[9px] font-bold px-2 py-1 rounded-lg uppercase tracking-widest ${stat.up ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                  {stat.trend}
                </span>
              )}
            </div>
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg mb-5`}>
              <span className="material-symbols-outlined text-[28px] icon-fill">{stat.icon}</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-white leading-none tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] mt-3">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-surface-dark/40 border border-white/5 p-8 rounded-2xl flex flex-col space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">trending_up</span> Tendência Semanal
            </h3>
          </div>
          <div className="flex-1 relative min-h-[220px]">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00b4ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00b4ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,130 C40,110 80,70 120,75 C160,80 200,60 240,45 C280,30 320,60 360,50 L400,45 L400,150 L0,150 Z" fill="url(#chartGradient)" />
              <path d="M0,130 C40,110 80,70 120,75 C160,80 200,60 240,45 C280,30 320,60 360,50 L400,45" fill="none" stroke="#00b4ff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="lg:col-span-3 bg-surface-dark/40 border border-white/5 p-8 rounded-2xl flex flex-col items-center">
          <h3 className="text-[10px] font-bold text-white uppercase tracking-widest self-start mb-8">Foco por Categoria</h3>
          <div className="relative w-44 h-44">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="88" cy="88" r="75" stroke="#ffffff05" strokeWidth="16" fill="transparent" />
              <circle cx="88" cy="88" r="75" stroke="#00b4ff" strokeWidth="16" fill="transparent" strokeDasharray="471" strokeDashoffset="180" />
              <circle cx="88" cy="88" r="75" stroke="#10b981" strokeWidth="16" fill="transparent" strokeDasharray="471" strokeDashoffset="420" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total</span>
              <span className="text-2xl font-bold text-white">42.5h</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-surface-dark/40 border border-white/5 p-8 rounded-2xl flex flex-col space-y-6">
          <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">Metas Mensais</h3>
          <div className="space-y-8 flex-1">
            {[
              { label: 'Trabalho', title: 'Lançar Projeto Beta', progress: 85, color: 'text-work', bar: 'bg-work' },
              { label: 'Saúde', title: 'Correr 50km', progress: 60, color: 'text-health', bar: 'bg-health' },
            ].map((goal, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className={`text-[9px] font-bold uppercase tracking-widest ${goal.color}`}>{goal.label}</p>
                    <p className="text-sm font-bold text-white">{goal.title}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{goal.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${goal.bar}`} style={{ width: `${goal.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-surface-dark/40 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-8 border-b border-white/5 bg-white/[0.02]">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">list_alt</span> Relatório Detalhado
          </h3>
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
                      <span className="font-bold text-sm text-white">{row.cat}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-slate-400 font-bold text-sm">{row.completed}</td>
                  <td className="px-8 py-6 text-center">
                    <span className="font-bold text-emerald-500 text-sm">{row.efficiency}</span>
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
