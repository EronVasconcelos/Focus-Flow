
import React, { useState } from 'react';
import { Task } from '../types';

interface TasksProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onNewTask: () => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, onToggle, onNewTask }) => {
  const [timeFilter, setTimeFilter] = useState('Hoje');
  const [priorityFilter, setPriorityFilter] = useState('Todas');

  // Mapeamento de Peso para Ordenação Decrescente (P4 -> P1)
  const priorityWeight: Record<string, number> = {
    'urgent': 4,
    'high': 3,
    'medium': 2,
    'low': 1
  };

  const getPriorityData = (priority: string) => {
    switch(priority) {
      case 'urgent': return { 
        label: 'P4', 
        name: 'Urgente', 
        icon: 'priority_high', 
        color: 'text-red-500', 
        border: 'border-red-500/30', 
        bg: 'bg-red-500/10' 
      };
      case 'high': return { 
        label: 'P3', 
        name: 'Alta', 
        icon: 'keyboard_double_arrow_up', 
        color: 'text-orange-500', 
        border: 'border-orange-500/30', 
        bg: 'bg-orange-500/10' 
      };
      case 'medium': return { 
        label: 'P2', 
        name: 'Média', 
        icon: 'stat_1', 
        color: 'text-primary', 
        border: 'border-primary/30', 
        bg: 'bg-primary/10' 
      };
      default: return { 
        label: 'P1', 
        name: 'Baixa', 
        icon: 'drag_handle', 
        color: 'text-slate-500', 
        border: 'border-white/10', 
        bg: 'bg-white/5' 
      };
    }
  };

  const filteredTasks = tasks
    .filter(t => {
      // Filtro de tempo simples
      if (timeFilter !== 'Mês' && t.dueDate === 'Sábado' && (timeFilter === 'Hoje' || timeFilter === 'Amanhã')) return false;
      
      // Filtro de prioridade
      if (priorityFilter !== 'Todas') {
        const pData = getPriorityData(t.priority);
        if (priorityFilter !== pData.name) return false;
      }
      return true;
    })
    .sort((a, b) => (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0));

  const pendingTasks = filteredTasks.filter(t => t.status !== 'completed');
  const completedTasks = filteredTasks.filter(t => t.status === 'completed');

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full space-y-10 overflow-y-auto pb-32">
      {/* Header Compacto e Focado */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tighter">Minhas Tarefas</h1>
          <p className="text-sm font-normal text-slate-400">Fluxo otimizado: Prioridade máxima primeiro.</p>
        </div>
        <button 
          onClick={onNewTask}
          className="bg-primary hover:bg-white text-black font-bold px-8 py-4 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_-10px_rgba(0,180,255,0.5)] transition-all active:scale-95 text-xs uppercase tracking-widest"
        >
          <span className="material-symbols-outlined font-bold text-[20px]">add_task</span>
          Adicionar Tarefa
        </button>
      </header>

      {/* Estatísticas Superiores Centralizadas */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Hoje', value: pendingTasks.length, icon: 'calendar_today', color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Amanhã', value: '02', icon: 'event_upcoming', color: 'text-orange-400', bg: 'bg-orange-400/10' },
          { label: 'Críticas', value: tasks.filter(t => t.priority === 'urgent').length, icon: 'error', color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Concluídas', value: tasks.filter(t => t.status === 'completed').length, icon: 'done_all', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-dark/40 border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center transition-all hover:border-white/10 group">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
              <span className="material-symbols-outlined text-[28px] icon-fill">{stat.icon}</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-white leading-none tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] mt-3">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Navegação de Filtros */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
            {['Hoje', 'Amanhã', '3 Dias', '7 Dias', 'Mês'].map((f) => (
              <button 
                key={f}
                onClick={() => setTimeFilter(f)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${timeFilter === f ? 'bg-primary text-black shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {f}
              </button>
            ))}
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 ml-auto">
            {['Todas', 'Urgente', 'Alta', 'Média', 'Baixa'].map((f) => (
              <button 
                key={f}
                onClick={() => setPriorityFilter(f)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${priorityFilter === f ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista Principal de Tarefas */}
      <div className="space-y-12">
        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span> 
              Execução Pendente
            </h3>
            <span className="text-[9px] font-bold text-slate-600 uppercase">Prioridade Decrescente</span>
          </div>
          
          <div className="space-y-3">
            {pendingTasks.map((task) => {
              const p = getPriorityData(task.priority);
              return (
                <div 
                  key={task.id} 
                  className="bg-surface-dark/40 hover:bg-surface-dark/60 p-5 rounded-[2rem] border border-white/5 flex items-center gap-6 transition-all group active:scale-[0.99] cursor-pointer"
                  onClick={() => onToggle(task.id)}
                >
                  <div className="w-7 h-7 rounded-xl border-2 border-white/10 flex items-center justify-center group-hover:border-primary transition-all shrink-0 bg-white/5">
                    <div className="w-3 h-3 bg-primary rounded-sm opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-[17px] truncate group-hover:text-primary transition-colors">{task.title}</h4>
                    <div className="flex items-center gap-5 mt-2">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-primary">event</span> {task.dueDate}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px]">folder</span> {task.category}
                      </span>
                    </div>
                  </div>

                  {/* Badges de Prioridade com Ícones Coloridos */}
                  <div className="shrink-0 flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border ${p.bg} ${p.border} ${p.color} transition-all`}>
                      <span className="material-symbols-outlined text-[18px] icon-fill">{p.icon}</span>
                      <span className="text-[11px] font-bold tracking-tighter">{p.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {pendingTasks.length === 0 && (
              <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-5 text-slate-700">
                  <span className="material-symbols-outlined text-4xl">done_all</span>
                </div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">Foco total: Nenhuma tarefa pendente.</p>
              </div>
            )}
          </div>
        </section>

        {/* Histórico Concluído */}
        {completedTasks.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-white/5">
            <h3 className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.4em] flex items-center gap-3">
              Histórico de Conclusão
            </h3>
            <div className="space-y-2 opacity-40">
              {completedTasks.map((task) => (
                <div key={task.id} className="bg-surface-dark/20 p-4 rounded-2xl border border-white/5 flex items-center gap-5 cursor-pointer hover:opacity-100 transition-all" onClick={() => onToggle(task.id)}>
                  <div className="w-6 h-6 rounded-lg bg-emerald-500 text-black flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  </div>
                  <h4 className="font-bold text-slate-400 text-[15px] line-through flex-1 truncate">{task.title}</h4>
                  <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest border border-white/5 px-3 py-1 rounded-lg">Finalizado</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Tasks;
