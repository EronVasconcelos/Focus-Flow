
import React, { useState } from 'react';
import { Task } from '../types';
import { IMAGES } from '../constants';

interface TasksProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onNewTask: () => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, onToggle, onNewTask }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Hoje');

  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const getPriorityFlagColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-primary';
      default: return 'text-slate-500';
    }
  };

  const getPriorityBorder = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-primary';
      default: return 'bg-slate-700';
    }
  };

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-8 overflow-y-auto pb-32">
      {/* HEADER SECTION */}
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Minhas Tarefas</h1>
          <p className="text-slate-400 mt-1">Bom dia! Você tem <span className="text-primary font-bold">{pendingTasks.length} tarefas</span> prioritárias hoje.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-xl bg-surface-dark border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <span className="material-symbols-outlined text-[20px] text-primary">notifications</span>
          </button>
          <button 
            onClick={onNewTask}
            className="bg-primary hover:bg-blue-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined font-bold">add</span>
            Nova Tarefa
          </button>
        </div>
      </header>

      {/* STATS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tarefas Pendentes', value: pendingTasks.length, icon: 'calendar_today', color: 'text-work', tag: 'Hoje' },
          { label: 'Tarefas Iniciadas', value: '12', icon: 'more_horiz', color: 'text-orange-400', tag: 'Em Andamento' },
          { label: 'Tarefas Concluídas', value: completedTasks.length, icon: 'check_circle', color: 'text-health', tag: '+12%', isPill: true },
          { label: 'Tempo de Foco', value: '3h 45m', icon: 'timer', color: 'text-personal' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-dark/50 p-5 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
              {stat.tag && (
                <span className={`text-[9px] font-bold px-2 py-1 rounded bg-white/5 text-slate-500 uppercase tracking-widest`}>
                  {stat.tag}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* SEARCH & FILTERS */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
          <input 
            type="text" 
            placeholder="Pesquisar tarefas, tags ou prazos..." 
            className="w-full bg-surface-dark/40 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:ring-1 focus:ring-primary/50 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
          {[
            { label: 'Hoje', count: 5, color: 'text-primary' },
            { label: 'Próximos 7 dias', count: 0, color: 'text-slate-400' },
            { label: 'Alta Prioridade', count: 0, isDot: true, color: 'text-red-500' },
            { label: 'Atrasado', count: 0, icon: 'warning', color: 'text-orange-500' }
          ].map((f) => (
            <button 
              key={f.label}
              onClick={() => setActiveFilter(f.label)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-xs font-bold border transition-all ${
                activeFilter === f.label 
                ? 'bg-primary border-primary text-black' 
                : 'bg-surface-dark/40 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
              }`}
            >
              {f.isDot && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
              <span className={activeFilter === f.label ? '' : f.color}>{f.label}</span>
              {f.count > 0 && <span className={`px-1.5 py-0.5 rounded ${activeFilter === f.label ? 'bg-black/20' : 'bg-primary/20 text-primary'}`}>{f.count}</span>}
              {f.icon && <span className={`material-symbols-outlined text-[14px] ${activeFilter === f.label ? '' : f.color}`}>{f.icon}</span>}
            </button>
          ))}
          <div className="w-px h-6 bg-white/10 mx-2 hidden lg:block"></div>
          <button className="p-2.5 bg-surface-dark/40 border border-white/5 rounded-xl text-slate-500 hover:text-white">
            <span className="material-symbols-outlined text-[20px] text-primary">tune</span>
          </button>
        </div>
      </div>

      {/* TASK LIST - EM PROGRESSO */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-work/20 flex items-center justify-center">
             <span className="material-symbols-outlined text-work text-[14px] icon-fill">play_arrow</span>
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Em Progresso</h3>
        </div>

        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <div key={task.id} className="group relative bg-surface-dark/30 hover:bg-surface-dark/50 p-4 rounded-xl border border-white/5 flex items-center gap-4 transition-all cursor-pointer">
              <div className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-r-lg ${getPriorityBorder(task.priority)}`} />
              
              <div 
                onClick={() => onToggle(task.id)}
                className="w-6 h-6 rounded-lg border-2 border-slate-700 flex items-center justify-center hover:border-primary transition-colors shrink-0"
              >
                <div className="w-3 h-3 bg-primary rounded-sm opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-white text-[15px] truncate">{task.title}</h4>
                </div>
                <div className="flex items-center gap-4 mt-2">
                   {task.subtasks && (
                     <div className="flex items-center gap-2">
                       <span className="material-symbols-outlined text-slate-500 text-[14px]">subdirectory_arrow_right</span>
                       <span className="text-[10px] font-bold text-slate-500">{task.subtasks}</span>
                       <button className="text-slate-600 hover:text-primary"><span className="material-symbols-outlined text-[14px]">add_circle</span></button>
                       <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary/60" style={{ width: '66%' }}></div>
                       </div>
                     </div>
                   )}
                   {!task.subtasks && task.description && (
                     <p className="text-[11px] text-slate-500 truncate max-w-md">{task.description}</p>
                   )}
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-blue-500/10">
                  {task.category}
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                  <span className="material-symbols-outlined text-primary text-[14px]">calendar_month</span>
                  <span className={`text-[10px] font-bold uppercase ${task.dueDate === 'Hoje' ? 'text-orange-400' : 'text-slate-400'}`}>
                    {task.dueDate}
                  </span>
                </div>
                <span className={`material-symbols-outlined text-[18px] icon-fill ${getPriorityFlagColor(task.priority)}`}>flag</span>
                <div className="w-8 h-8 rounded-lg border border-white/10 overflow-hidden bg-slate-800 flex items-center justify-center">
                   {task.id === '1' ? (
                      <img src={IMAGES.SARAH_AVATAR} className="w-full h-full object-cover" />
                   ) : (
                      <span className="text-[10px] font-bold text-slate-400">EU</span>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TASK LIST - CONCLUÍDAS HOJE */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-health/20 flex items-center justify-center">
             <span className="material-symbols-outlined text-health text-[14px] icon-fill">check</span>
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Concluídas Hoje</h3>
        </div>

        <div className="space-y-3 opacity-60">
          {completedTasks.length === 0 ? (
            <p className="text-xs text-slate-600 italic ml-9">Nenhuma tarefa concluída ainda hoje.</p>
          ) : (
            completedTasks.map((task) => (
              <div key={task.id} className="group bg-surface-dark/10 p-4 rounded-xl border border-white/5 flex items-center gap-4 transition-all">
                <button 
                  onClick={() => onToggle(task.id)}
                  className="w-6 h-6 rounded-lg bg-health border-2 border-health flex items-center justify-center text-black shrink-0"
                >
                  <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                </button>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-500 text-[15px] line-through">{task.title}</h4>
                </div>
                <div className="flex items-center gap-4">
                   <span className="bg-slate-800 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase border border-white/5">
                    {task.category}
                  </span>
                  <div className="w-8 h-8 rounded-lg border border-white/10 bg-slate-900 flex items-center justify-center">
                     <span className="text-[10px] font-bold text-slate-600">EU</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Tasks;
