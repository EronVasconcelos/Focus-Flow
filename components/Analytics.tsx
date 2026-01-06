
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
          <h1 className="text-4xl font-black text-white tracking-tight">Análise e Relatórios</h1>
          <p className="text-slate-400 font-medium mt-1 text-lg">Visualize seu desempenho e tendências em todas as áreas da vida.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-black text-white hover:bg-white/10 transition-all">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            Outubro 2023
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black rounded-2xl text-sm font-black shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg font-black">download</span>
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
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest ${stat.up ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                  {stat.trend}
                </span>
              )}
              {stat.trend === '0%' && (
                <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-white/5 text-slate-500 uppercase tracking-widest">Estável</span>
              )}
            </div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-white mt-1">{stat.value}</p>
            </div>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 blur-[50px] opacity-10 rounded-full ${stat.bg.replace('/10', '')}`}></div>
          </div>
        ))}
      </section>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* PRODUCTIVITY TREND */}
        <div className="lg:col-span-6 bg-surface-dark/40 border border-white/5 p-8 rounded-[2.5rem] flex flex-col space-y-8">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-white tracking-tight">Tendência de Produtividade</h3>
              <p className="text-xs text-slate-500">Comparativo de desempenho últimos 7 dias</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase">Atual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase">Média</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative min-h-[220px]">
            {/* SVG Chart Line */}
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Reference Line */}
              <line x1="0" y1="110" x2="400" y2="110" stroke="#ffffff10" strokeDasharray="4 4" />
              {/* Area */}
              <path d="M0,130 C40,110 80,70 120,75 C160,80 200,60 240,45 C280,30 320,60 360,50 L400,45 L400,150 L0,150 Z" fill="url(#chartGradient)" />
              {/* Line */}
              <path d="M0,130 C40,110 80,70 120,75 C160,80 200,60 240,45 C280,30 320,60 360,50 L400,45" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
              
              {/* Dots */}
              <circle cx="0" cy="130" r="3" fill="#10b981" stroke="#080c14" strokeWidth="2" />
              <circle cx="80" cy="70" r="3" fill="#10b981" stroke="#080c14" strokeWidth="2" />
              <circle cx="160" cy="80" r="3" fill="#10b981" stroke="#080c14" strokeWidth="2" />
              <circle cx="240" cy="45" r="4" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <circle cx="320" cy="60" r="3" fill="#10b981" stroke="#080c14" strokeWidth="2" />
              <circle cx="400" cy="45" r="3" fill="#10b981" stroke="#080c14" strokeWidth="2" />
            </svg>
            
            {/* Annotation */}
            <div className="absolute top-[30px] left-[240px] -translate-x-1/2 bg-emerald-500 text-black text-[9px] font-black px-2 py-1 rounded shadow-lg">
              92% Score
            </div>
          </div>

          <div className="flex justify-between px-2 text-[10px] font-black text-slate-600 uppercase">
            <span>18 Out</span>
            <span>19 Out</span>
            <span>20 Out</span>
            <span>21 Out</span>
            <span>22 Out</span>
            <span>23 Out</span>
            <span className="text-white">Hoje</span>
          </div>
        </div>

        {/* TIME PER CATEGORY (Donut) */}
        <div className="lg:col-span-3 bg-surface-dark/40 border border-white/5 p-8 rounded-[2.5rem] flex flex-col space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-white tracking-tight">Tempo por Categoria</h3>
            <button className="text-slate-500 hover:text-white"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="relative w-44 h-44">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="88" cy="88" r="75" stroke="#ffffff05" strokeWidth="16" fill="transparent" />
                <circle cx="88" cy="88" r="75" stroke="#3b82f6" strokeWidth="16" fill="transparent" strokeDasharray="471" strokeDashoffset="180" className="transition-all duration-1000" />
                <circle cx="88" cy="88" r="75" stroke="#10b981" strokeWidth="16" fill="transparent" strokeDasharray="471" strokeDashoffset="420" className="transition-all duration-1000" />
                <circle cx="88" cy="88" r="75" stroke="#ec4899" strokeWidth="16" fill="transparent" strokeDasharray="471" strokeDashoffset="450" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-black text-slate-500 uppercase">Total</span>
                <span className="text-2xl font-black text-white">42.5h</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-10 w-full">
              {categoryTime.map((cat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`}></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MONTHLY GOALS */}
        <div className="lg:col-span-3 bg-surface-dark/40 border border-white/5 p-8 rounded-[2.5rem] flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-white tracking-tight">Metas do Mês</h3>
            <button className="text-emerald-500 hover:scale-110 transition-transform"><span className="material-symbols-outlined font-black">add</span></button>
          </div>

          <div className="space-y-8 flex-1">
            {[
              { label: 'Trabalho', title: 'Lançar Projeto Beta', progress: 85, color: 'text-blue-500', bar: 'bg-blue-500' },
              { label: 'Saúde', title: 'Correr 50km', progress: 60, color: 'text-emerald-500', bar: 'bg-emerald-500' },
              { label: 'Família', title: 'Organizar Viagem', progress: 30, color: 'text-pink-500', bar: 'bg-pink-500' },
            ].map((goal, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className={`text-[10px] font-black uppercase ${goal.color}`}>{goal.label}</p>
                    <p className="text-sm font-bold text-white">{goal.title}</p>
                  </div>
                  <span className="text-[10px] font-black text-slate-400">{goal.progress}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${goal.bar} transition-all duration-1000`} style={{ width: `${goal.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all border-dashed">
            Ver todas as 8 metas
          </button>
        </div>
      </div>

      {/* DETAILED REPORT TABLE */}
      <section className="bg-surface-dark/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/[0.02]">
          <h3 className="text-xl font-black text-white">Relatório Detalhado</h3>
          <div className="flex items-center gap-3">
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
              {['Todos', 'Saúde', 'Família', 'Trabalho'].map((t) => (
                <button key={t} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${t === 'Todos' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            <button className="p-2.5 text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[20px]">tune</span></button>
            <button className="p-2.5 text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[20px]">download</span></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">
                <th className="px-8 py-6">Categoria</th>
                <th className="px-8 py-6">Tarefas Concluídas</th>
                <th className="px-8 py-6">Tempo Total</th>
                <th className="px-8 py-6">Eficiência</th>
                <th className="px-8 py-6">Status da Meta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {detailedData.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${row.color}`}>
                        <span className="material-symbols-outlined text-[20px]">{row.icon}</span>
                      </div>
                      <span className="font-black text-white">{row.cat}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-slate-400 font-bold">{row.completed}</td>
                  <td className="px-8 py-6 text-slate-400 font-bold">{row.time}</td>
                  <td className="px-8 py-6">
                    <span className={`font-black ${row.efficiency === '100%' ? 'text-emerald-500' : row.efficiency === '50%' ? 'text-orange-500' : 'text-emerald-500'}`}>
                      {row.efficiency}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${row.statusCol}`}>
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
