
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

  const getPriorityBorder = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-primary';
      default: return 'bg-slate-700';
    }
  };

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-10 overflow-y-auto pb-32">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Minhas Tarefas</h1>
          <p className="text-sm font-normal text-slate-400">Bom dia! Você tem <span className="text-primary font-bold">{pendingTasks.length} tarefas</span> hoje.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-12 h-12 rounded-xl bg-surface-dark border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
            <span className="material-symbols-outlined text-primary">notifications</span>
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

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Pendentes', value: pendingTasks.length, icon: 'calendar_today', color: 'text-work' },
          { label: 'Em Andamento', value: '12', icon: 'more_horiz', color: 'text-orange-400' },
          { label: 'Concluídas', value: completedTasks.length, icon: 'check_circle', color: 'text-health' },
          { label: 'Tempo Foco', value: '3h 45m', icon: 'timer', color: 'text-personal' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-dark/40 p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
              <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-white leading-none">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
          <input 
            type="text" 
            placeholder="Pesquisar tarefas..." 
            className="w-full bg-surface-dark/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:ring-1 focus:ring-primary/50 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {['Hoje', 'Próximos 7 dias', 'Alta Prioridade'].map((f) => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all whitespace-nowrap ${activeFilter === f ? 'bg-primary border-primary text-black' : 'bg-surface-dark/40 border-white/5 text-slate-400 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-4 bg-work rounded-full"></span> Em Progresso
          </h3>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="bg-surface-dark/40 hover:bg-surface-dark p-4 rounded-xl border border-white/5 flex items-center gap-4 transition-all relative overflow-hidden group">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${getPriorityBorder(task.priority)}`} />
                <button onClick={() => onToggle(task.id)} className="w-6 h-6 rounded-lg border-2 border-white/10 flex items-center justify-center hover:border-primary shrink-0 transition-colors">
                  <div className="w-3 h-3 bg-primary rounded-sm opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-[15px] truncate">{task.title}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] font-bold text-work uppercase tracking-widest">{task.category}</span>
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-primary">calendar_month</span> {task.dueDate}
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/5 overflow-hidden">
                      <img src={IMAGES.ALEX_AVATAR} className="w-full h-full object-cover" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-4 bg-health rounded-full opacity-50"></span> Concluídas Hoje
          </h3>
          <div className="space-y-3 opacity-60">
            {completedTasks.map((task) => (
              <div key={task.id} className="bg-surface-dark/20 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                <button onClick={() => onToggle(task.id)} className="w-6 h-6 rounded-lg bg-health text-black flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                </button>
                <h4 className="font-bold text-slate-500 text-[15px] line-through">{task.title}</h4>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tasks;
