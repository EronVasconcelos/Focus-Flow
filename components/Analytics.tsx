
import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-8 overflow-y-auto">
      <header>
        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Análise de Performance</h1>
        <p className="text-slate-500 dark:text-[#9db9a1]">Insights profundos sobre como você gasta seu tempo.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Deep Work', value: '18.5h', icon: 'psychology', trend: '+12% esta semana', color: 'primary' },
          { label: 'Distrações', value: '4.2h', icon: 'block', trend: '-15% esta semana', color: 'red-500' },
          { label: 'Tarefas Finais', value: '42', icon: 'done_all', trend: '+5 vs média', color: 'blue-500' },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-white/5 shadow-sm">
            <div className={`w-10 h-10 mb-4 flex items-center justify-center rounded-xl bg-${s.color === 'primary' ? 'primary/10' : s.color + '/10'} text-${s.color === 'primary' ? 'primary' : s.color}`}>
              <span className="material-symbols-outlined">{s.icon}</span>
            </div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
            <p className="text-3xl font-black dark:text-white my-1">{s.value}</p>
            <p className={`text-[10px] font-bold ${s.trend.startsWith('+') && s.label !== 'Distrações' ? 'text-primary' : 'text-slate-400'}`}>{s.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-white/5 shadow-sm">
          <h3 className="text-xl font-bold mb-8">Distribuição de Foco</h3>
          <div className="space-y-6">
            {[
              { label: 'Design System', percent: 65, color: 'bg-primary' },
              { label: 'Reuniões', percent: 15, color: 'bg-blue-500' },
              { label: 'Email/Admin', percent: 10, color: 'bg-slate-400' },
              { label: 'Outros', percent: 10, color: 'bg-white/10' },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="dark:text-white">{item.percent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-white/5 shadow-sm flex flex-col items-center justify-center">
          <div className="relative w-56 h-56 flex items-center justify-center">
             <div className="absolute inset-0 border-[24px] border-slate-100 dark:border-white/5 rounded-full"></div>
             <div className="absolute inset-0 border-[24px] border-primary border-t-transparent border-l-transparent rounded-full transform rotate-12"></div>
             <div className="flex flex-col items-center z-10">
                <span className="text-sm font-black text-primary uppercase">Produtividade</span>
                <span className="text-5xl font-black dark:text-white">92</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Score Geral</span>
             </div>
          </div>
          <div className="mt-8 text-center max-w-xs">
            <p className="text-sm font-bold dark:text-white">Você está no seu auge!</p>
            <p className="text-xs text-slate-500 mt-2">Sua produtividade cresceu 24% desde que começou a usar os blocos de Deep Work sugeridos pela IA.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
