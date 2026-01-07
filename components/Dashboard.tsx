
import React from 'react';
import { Task, Habit, Page } from '../types';
import { WidgetConfig } from '../App';

interface DashboardProps {
  widgets: WidgetConfig[];
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  tasks: Task[];
  habits: Habit[];
  waterConsumed: number;
  waterGoal: number;
  onAddWater: () => void;
  onToggleTask: (id: string) => void;
  onToggleHabitDay: (id: string, idx: number) => void;
  setActivePage: (page: Page) => void;
  onEditWidget: (w: WidgetConfig) => void;
  onMoveWidget: (idx: number, dir: 'up' | 'down') => void;
  onRemoveWidget: (id: string) => void;
  onOpenLibrary: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  widgets,
  isEditMode,
  setIsEditMode,
  tasks,
  habits,
  waterConsumed,
  waterGoal,
  onAddWater,
  onToggleTask,
  onToggleHabitDay,
  setActivePage,
  onEditWidget,
  onMoveWidget,
  onRemoveWidget,
  onOpenLibrary
}) => {

  const getColorClass = (color: string) => {
    switch(color) {
      case 'emerald': return 'text-emerald-500 bg-emerald-500/10';
      case 'orange': return 'text-orange-400 bg-orange-400/10';
      case 'blue': return 'text-blue-500 bg-blue-500/10';
      case 'purple': return 'text-purple-500 bg-purple-500/10';
      case 'pink': return 'text-pink-500 bg-pink-500/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const renderWidgetContent = (widget: WidgetConfig) => {
    switch (widget.type) {
      case 'stats':
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'completed').length;
        const pending = tasks.filter(t => t.status !== 'completed').length;
        const efficiency = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        const statsData = [
          { label: 'Tarefas', value: total, icon: 'assignment', color: 'text-blue-400', bg: 'bg-blue-400/10', page: 'tasks' as Page },
          { label: 'Concluídas', value: completed, icon: 'check_circle', color: 'text-emerald-400', bg: 'bg-emerald-400/10', page: 'tasks' as Page },
          { label: 'Pendentes', value: pending, icon: 'more_horiz', color: 'text-orange-400', bg: 'bg-orange-400/10', page: 'tasks' as Page },
          { label: 'Eficiência', value: `${efficiency}%`, icon: 'trending_up', color: 'text-purple-400', bg: 'bg-purple-400/10', page: 'analytics' as Page },
        ];

        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {statsData.map((stat, i) => (
              <div 
                key={i} 
                onClick={() => !isEditMode && setActivePage(stat.page)}
                className="bg-surface-darker/40 border border-white/5 p-6 rounded-3xl flex flex-col items-center justify-center text-center min-h-[160px] relative overflow-hidden group/stat hover:border-white/10 transition-all cursor-pointer active:scale-95"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color} group-hover/stat:scale-110 transition-transform shadow-lg`}>
                  <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em]">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2 tracking-tighter">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'productivity':
        return (
          <div 
            className="flex-1 min-h-[180px] relative mt-4 cursor-pointer group/chart"
            onClick={() => !isEditMode && setActivePage('analytics')}
          >
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 200">
              <path d="M0,150 C50,145 100,110 150,115 C200,120 250,70 300,75 C350,80 400,105 450,95 C500,85 550,55 600,45" fill="none" stroke={widget.color === 'emerald' ? '#10b981' : '#00b4ff'} strokeWidth="3" className="drop-shadow-[0_0_8px_rgba(0,180,255,0.4)] group-hover/chart:stroke-white transition-colors" />
            </svg>
            <div className="flex justify-between mt-4 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
              <span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span><span>D</span>
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="space-y-3 mt-4">
            {tasks.slice(0, 3).map(t => (
              <div key={t.id} className="flex items-center gap-3 group">
                <button onClick={() => onToggleTask(t.id)} className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center shrink-0 ${t.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-slate-700 hover:border-primary'}`}>
                  {t.status === 'completed' && <span className="material-symbols-outlined text-[10px] font-bold">check</span>}
                </button>
                <span className={`text-[11px] font-bold truncate ${t.status === 'completed' ? 'text-slate-600 line-through' : 'text-white'}`}>{t.title}</span>
              </div>
            ))}
            <button onClick={() => setActivePage('tasks')} className="text-[9px] font-bold text-primary uppercase tracking-widest mt-2 hover:underline">Ver tudo</button>
          </div>
        );
      case 'health':
        const bars = [20, 45, 80, 40, 60, (waterConsumed/waterGoal)*100];
        return (
          <div className="mt-4 flex flex-col gap-6">
            <div className="flex items-end justify-between h-20 gap-1.5 cursor-pointer group" onClick={() => !isEditMode && setActivePage('health')}>
              {bars.map((h, i) => (
                <div key={i} className="flex-1 bg-white/5 rounded-t-md overflow-hidden h-full flex flex-col justify-end">
                  <div className={`w-full transition-all duration-700 ${i === 5 ? 'bg-primary group-hover:bg-blue-300' : 'bg-blue-900/40'}`} style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold tracking-tighter">{(waterConsumed/1000).toFixed(1)}L <span className="text-[10px] text-slate-500 uppercase">/ {(waterGoal/1000).toFixed(1)}L</span></span>
              <button onClick={onAddWater} className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center active:scale-90 transition-all shadow-lg shadow-blue-500/20"><span className="material-symbols-outlined text-[18px]">add</span></button>
            </div>
          </div>
        );
      case 'habits':
        const h = habits[0] || { id: '1', title: 'Hábito', completedDays: [false,false,false,false,false,false,false] };
        return (
          <div className="mt-4">
            <div className="flex gap-1.5 mb-4">
              {['S','T','Q','Q','S','S','D'].map((d, i) => (
                <button key={i} onClick={() => onToggleHabitDay(h.id, i)} className={`flex-1 h-8 rounded-lg flex items-center justify-center text-[9px] font-bold transition-all ${h.completedDays[i] ? 'bg-emerald-500 text-black' : 'bg-white/5 text-slate-600 active:bg-white/10'}`}>{d}</button>
              ))}
            </div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors" onClick={() => setActivePage('habits')}>Foco: {h.title}</p>
          </div>
        );
      case 'family':
        return (
          <div className="mt-4 space-y-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-1 cursor-pointer hover:border-primary/20 transition-all active:scale-95" onClick={() => setActivePage('calendar')}>
              <span className="text-[9px] font-bold text-pink-400 uppercase">Próximo</span>
              <span className="text-xs font-bold">Jantar em Família</span>
              <span className="text-[9px] text-slate-500 uppercase">Sábado, 20:00</span>
            </div>
          </div>
        );
      default:
        return <div className="p-4 text-slate-600 text-xs">Conteúdo para {widget.type}</div>;
    }
  };

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-8 overflow-y-auto pb-32">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tighter">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Status em tempo real das suas atividades.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest border flex items-center justify-center gap-3 transition-all active:scale-95 ${isEditMode ? 'bg-primary text-black border-primary shadow-lg shadow-primary/20' : 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10'}`}
          >
            <span className="material-symbols-outlined text-[18px]">{isEditMode ? 'done_all' : 'tune'}</span> 
            {isEditMode ? 'Salvar Layout' : 'Personalizar Painel'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {widgets.map((w, idx) => (
          <div 
            key={w.instanceId} 
            className={`${w.span === 'full' ? 'lg:col-span-12' : 'lg:col-span-3'} bg-surface-dark/40 p-6 rounded-3xl border transition-all relative flex flex-col ${isEditMode ? 'border-primary/40 border-dashed animate-pulse bg-primary/5' : 'border-white/5 hover:border-white/10'}`}
          >
            {isEditMode && (
              <div className="absolute -top-3 -right-3 flex gap-2 z-20">
                <button onClick={() => onEditWidget(w)} className="w-8 h-8 bg-surface-dark border border-primary/30 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all shadow-xl"><span className="material-symbols-outlined text-[16px]">settings</span></button>
                <button onClick={() => onRemoveWidget(w.instanceId)} className="w-8 h-8 bg-surface-dark border border-red-500/30 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl"><span className="material-symbols-outlined text-[16px]">close</span></button>
              </div>
            )}

            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => !isEditMode && setActivePage(w.type as Page)}>
                <div className={`w-7 h-7 rounded-lg ${getColorClass(w.color)} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-[16px]">{w.type === 'productivity' ? 'trending_up' : w.type === 'tasks' ? 'task_alt' : w.type === 'health' ? 'water_drop' : w.type === 'habits' ? 'published_with_changes' : w.type === 'stats' ? 'format_list_numbered' : 'groups'}</span>
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] group-hover:text-primary transition-colors">{w.title}</h3>
              </div>
            </div>

            {renderWidgetContent(w)}
          </div>
        ))}

        {isEditMode && (
          <button 
            onClick={onOpenLibrary}
            className="lg:col-span-3 min-h-[140px] border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-600 hover:border-primary/40 hover:text-primary transition-all group active:scale-95"
          >
            <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform">add_circle</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Adicionar Quadro</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
