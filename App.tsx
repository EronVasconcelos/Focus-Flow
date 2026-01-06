
import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Habits from './components/Habits';
import Health from './components/Health';
import Calendar from './components/Calendar';
import Resources from './components/Resources';
import Goals from './components/Goals';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import WorkspaceConfig from './components/WorkspaceConfig';
import Login from './components/Login';
import Modal from './components/Modal';
import { Page, Task, Habit, Goal, Resource } from './types';
import { MOCK_TASKS, MOCK_HABITS, MOCK_GOALS, MOCK_RESOURCES, IMAGES } from './constants';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  
  // Dynamic State
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [habits, setHabits] = useState<Habit[]>(MOCK_HABITS);
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);
  
  // Modal & Notification State
  const [modalType, setModalType] = useState<'task' | 'habit' | 'goal' | 'resource' | 'health-log' | 'quick-note' | 'coming-soon' | null>(null);
  const [prefilledCategory, setPrefilledCategory] = useState<Task['category'] | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info', onUndo?: () => void} | null>(null);
  
  // NLP Task Form State
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("2026-01-06");
  const [taskTime, setTaskTime] = useState("");
  const [taskPriority, setTaskPriority] = useState<Task['priority']>("medium");
  const [taskTags, setTaskTags] = useState<string[]>([]);

  const prevTasksRef = useRef<Task[]>([]);

  const notify = (message: string, type: 'success' | 'info' = 'success', onUndo?: () => void) => {
    setNotification({ message, type, onUndo });
    const duration = onUndo ? 6000 : 4000;
    setTimeout(() => setNotification(null), duration);
  };

  const handleUndo = () => {
    if (prevTasksRef.current.length > 0) {
      setTasks([...prevTasksRef.current]);
      setNotification(null);
      notify("Ação desfeita!", "info");
    }
  };

  const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTaskTitle(val);
    const lowerVal = val.toLowerCase();

    // 1. EXTRAÇÃO DE DATA (Ref.: 06 Jan 2026)
    if (lowerVal.includes("hoje")) {
      setTaskDate("2026-01-06");
    } else if (lowerVal.includes("amanhã") || lowerVal.includes("amanha")) {
      setTaskDate("2026-01-07");
    } else if (lowerVal.includes("sábado") || lowerVal.includes("sabado")) {
      setTaskDate("2026-01-10");
    }
    
    // 2. EXTRAÇÃO DE HORA
    const timeMatch = val.match(/(\d{1,2})[:h](\d{0,2})/i);
    if (timeMatch) {
      const hours = timeMatch[1].padStart(2, '0');
      const mins = (timeMatch[2] || '00').padStart(2, '0');
      setTaskTime(`${hours}:${mins}`);
    }

    // 3. EXTRAÇÃO DE PRIORIDADE
    if (lowerVal.includes("p1") || lowerVal.includes("urgente")) {
      setTaskPriority("urgent");
    } else if (lowerVal.includes("p2") || lowerVal.includes("importante")) {
      setTaskPriority("high");
    } else if (lowerVal.includes("p3")) {
      setTaskPriority("medium");
    } else if (lowerVal.includes("p4")) {
      setTaskPriority("low");
    }

    // 4. EXTRAÇÃO DE ETIQUETAS (#)
    const tags = val.match(/#(\w+)/g);
    if (tags) {
      setTaskTags(tags.map(t => t.replace('#', '')));
    } else {
      setTaskTags([]);
    }
  };

  const handleQuickAddSelection = (category: string) => {
    if (category === 'Inbox') {
      setModalType('quick-note');
    } else {
      setPrefilledCategory(category as Task['category']);
      setModalType('task');
    }
    setIsQuickAddOpen(false);
  };

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>, isQuickNote = false) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const cleanTitle = taskTitle
      .replace(/hoje|amanhã|amanha|sábado|sabado|domingo/gi, '')
      .replace(/#(\w+)/g, '')
      .replace(/\d{1,2}[:h]\d{0,2}/gi, '')
      .replace(/\b(p[1-4]|urgente|importante)\b/gi, '')
      .trim();

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: cleanTitle || taskTitle,
      description: (formData.get('description') as string) || "",
      category: isQuickNote ? 'Inbox' : ((formData.get('category') as any) || "Trabalho"),
      workspace: (formData.get('workspace') as string) || "Geral",
      tags: taskTags.length > 0 ? taskTags : (formData.get('tags') as string)?.split(',').map(s => s.trim()).filter(Boolean) || [],
      priority: isQuickNote ? 'medium' : taskPriority,
      status: isQuickNote ? 'inbox' : 'pending',
      dueDate: isQuickNote ? "2026-01-06" : taskDate,
      dueTime: isQuickNote ? "" : taskTime,
    };
    
    prevTasksRef.current = [...tasks];
    setTasks([newTask, ...tasks]);
    
    setModalType(null);
    setPrefilledCategory(null);
    setTaskTitle("");
    setTaskTime("");
    setTaskPriority("medium");
    setTaskTags([]);
    setTaskDate("2026-01-06");
    
    notify(isQuickNote ? "Nota salva na Inbox!" : "Tarefa sincronizada!", "success", handleUndo);
  };

  const toggleTask = (id: string) => {
    const taskToToggle = tasks.find(t => t.id === id);
    if (!taskToToggle) return;
    prevTasksRef.current = [...tasks];
    const isCompleting = taskToToggle.status !== 'completed';
    setTasks(tasks.map(t => t.id === id ? { ...t, status: isCompleting ? 'completed' : 'pending' } : t));
    if (isCompleting) notify("Concluído", "success", handleUndo);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard tasks={tasks} habits={habits} onNewTask={() => setModalType('task')} />;
      case 'tasks': return <Tasks tasks={tasks} onToggle={toggleTask} onNewTask={() => setModalType('task')} />;
      case 'habits': return <Habits habits={habits} setHabits={setHabits} onNewHabit={() => setModalType('habit')} />;
      case 'health': return <Health onLog={() => setModalType('health-log')} />;
      case 'calendar': return <Calendar onAddEvent={() => setModalType('task')} />;
      case 'resources': return <Resources resources={resources} onAdd={() => setModalType('resource')} />;
      case 'goals': return <Goals goals={goals} onNewGoal={() => setModalType('goal')} />;
      case 'analytics': return <Analytics />;
      case 'workspace-config': return <WorkspaceConfig />;
      case 'settings': return <Settings onSave={() => notify("Preferências sincronizadas!")} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark overflow-hidden font-display text-slate-900 dark:text-white">
      <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={() => setIsLoggedIn(false)} isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <main className="flex-1 flex flex-col min-w-0 relative pb-16 lg:pb-0">
        <header className="h-16 px-6 lg:px-10 border-b border-slate-200 dark:border-white/5 flex items-center justify-between shrink-0 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md z-40">
           <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h2 className="hidden md:block text-sm font-black uppercase tracking-widest text-primary drop-shadow-[0_0_8px_rgba(0,180,255,0.4)]">LifeSync Pro 2026</h2>
           </div>
           
           <div className="flex items-center gap-4">
              <button onClick={() => setModalType('coming-soon')} className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 relative group transition-all">
                <span className="material-symbols-outlined group-hover:text-primary">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-background-dark animate-pulse"></span>
              </button>
              <div className="w-px h-6 bg-slate-200 dark:bg-white/5"></div>
              <button onClick={() => setActivePage('settings')} className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full border border-primary/50 overflow-hidden ring-2 ring-primary/10 transition-all group-hover:ring-primary/40">
                  <img src={IMAGES.ALEX_AVATAR} alt="User" className="w-full h-full object-cover" />
                </div>
              </button>
           </div>
        </header>

        <div className="flex-1 overflow-hidden flex flex-col relative">
          {renderPage()}
        </div>

        {/* MOBILE BOTTOM BAR */}
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-surface-darker border-t border-slate-200 dark:border-white/5 flex items-center justify-around px-4 lg:hidden z-[60]">
          <button onClick={() => setActivePage('dashboard')} className={`flex flex-col items-center gap-1 ${activePage === 'dashboard' ? 'text-primary' : 'text-slate-500'}`}>
            <span className={`material-symbols-outlined ${activePage === 'dashboard' ? 'icon-fill' : ''}`}>home</span>
          </button>
          <button onClick={() => setActivePage('tasks')} className={`flex flex-col items-center gap-1 ${activePage === 'tasks' ? 'text-primary' : 'text-slate-500'}`}>
            <span className={`material-symbols-outlined ${activePage === 'tasks' ? 'icon-fill' : ''}`}>task_alt</span>
          </button>
          
          <div className="relative -top-6">
            <button onClick={() => setIsQuickAddOpen(!isQuickAddOpen)} className="w-14 h-14 bg-primary text-black rounded-full shadow-[0_8px_30px_rgb(0,180,255,0.4)] flex items-center justify-center transform active:scale-90 transition-all z-[70] border-4 border-background-dark">
              <span className={`material-symbols-outlined text-3xl transition-transform duration-300 ${isQuickAddOpen ? 'rotate-45' : ''}`}>add</span>
            </button>
          </div>

          <button onClick={() => setActivePage('habits')} className={`flex flex-col items-center gap-1 ${activePage === 'habits' ? 'text-primary' : 'text-slate-500'}`}>
            <span className={`material-symbols-outlined ${activePage === 'habits' ? 'icon-fill' : ''}`}>check_circle</span>
          </button>
          <button onClick={() => setActivePage('calendar')} className={`flex flex-col items-center gap-1 ${activePage === 'calendar' ? 'text-primary' : 'text-slate-500'}`}>
            <span className={`material-symbols-outlined ${activePage === 'calendar' ? 'icon-fill' : ''}`}>calendar_today</span>
          </button>
        </nav>

        {/* QUICK ADD OVERLAY */}
        {isQuickAddOpen && (
          <div className="fixed inset-0 z-[65] lg:hidden flex flex-col justify-end p-6">
            <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md" onClick={() => setIsQuickAddOpen(false)} />
            <div className="relative grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-10">
              {[
                { id: 'Inbox', icon: 'inbox', color: 'bg-slate-500', label: 'Nota Rápida' },
                { id: 'Trabalho', icon: 'work', color: 'bg-blue-500', label: 'Trabalho' },
                { id: 'Saúde', icon: 'favorite', color: 'bg-red-500', label: 'Saúde' },
                { id: 'Casa', icon: 'home', color: 'bg-cyan-500', label: 'Casa' },
                { id: 'Pessoal', icon: 'person', color: 'bg-yellow-500', label: 'Pessoal' },
                { id: 'Família', icon: 'group', color: 'bg-purple-500', label: 'Família' },
              ].map((item) => (
                <button key={item.id} onClick={() => handleQuickAddSelection(item.id)} className="bg-surface-dark p-6 rounded-3xl border border-white/10 flex flex-col items-center gap-3 active:scale-95 transition-all group">
                  <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-white">{item.icon}</span>
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MODALS */}
        <Modal 
          isOpen={modalType !== null} 
          onClose={() => {setModalType(null); setPrefilledCategory(null);}} 
          title={modalType === 'task' ? 'Brain Sync Task' : modalType === 'quick-note' ? 'Captura Rápida' : 'LifeSync Action'}
        >
          {modalType === 'task' && (
            <form onSubmit={(e) => handleAddTask(e)} className="space-y-6">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">O que planeja? (Ex: #reuniao amanha 10h p1)</label>
                <input required value={taskTitle} onChange={handleTaskTitleChange} className="w-full bg-[#0a1420] border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-primary/50 text-white" placeholder="Sua intenção aqui..." />
                
                <div className="flex flex-wrap gap-2 mt-2">
                   <div className="bg-primary/10 px-2 py-1 rounded text-[10px] font-black text-primary border border-primary/20">📅 {taskDate}</div>
                   {taskTime && <div className="bg-blue-500/10 px-2 py-1 rounded text-[10px] font-black text-blue-400 border border-blue-500/20">⏰ {taskTime}</div>}
                   <div className="bg-orange-500/10 px-2 py-1 rounded text-[10px] font-black text-orange-400 border border-orange-500/20 uppercase">🚩 {taskPriority}</div>
                   {taskTags.map(tag => (
                     <div key={tag} className="bg-purple-500/10 px-2 py-1 rounded text-[10px] font-black text-purple-400 border border-purple-500/20"># {tag}</div>
                   ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Ambiente</label>
                  <select name="category" value={prefilledCategory || 'Trabalho'} onChange={(e) => setPrefilledCategory(e.target.value as any)} className="w-full bg-[#0a1420] border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-primary/50 text-white">
                    <option value="Trabalho">Trabalho</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Família">Família</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Casa">Casa</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Prioridade Manual</label>
                  <select name="priority" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value as any)} className="w-full bg-[#0a1420] border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-primary/50 text-white">
                    <option value="low">P4 - Baixa</option>
                    <option value="medium">P3 - Média</option>
                    <option value="high">P2 - Alta</option>
                    <option value="urgent">P1 - Crítica</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full py-5 bg-primary text-black font-black rounded-2xl shadow-xl hover:shadow-primary/30 transition-all text-lg">Sincronizar Tarefa</button>
            </form>
          )}

          {modalType === 'quick-note' && (
             <form onSubmit={(e) => handleAddTask(e, true)} className="space-y-4">
               <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Apenas descarregue seu cérebro:</label>
                  <input autoFocus value={taskTitle} onChange={handleTaskTitleChange} className="w-full bg-[#0a1420] border-none rounded-2xl p-5 text-lg font-bold text-white focus:ring-1 focus:ring-primary/50" placeholder="O que está pensando?" />
                  <p className="text-[10px] text-slate-500 mt-2 italic">A IA organizará esta nota na sua Caixa de Entrada para revisão posterior.</p>
               </div>
               <button type="submit" className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-xl border border-white/10 transition-all">Salvar na Inbox</button>
             </form>
          )}

          {modalType === 'coming-soon' && (
            <div className="text-center py-10 space-y-4">
              <span className="material-symbols-outlined text-5xl text-primary mb-2">construction</span>
              <h4 className="text-xl font-black">Módulo em Refinamento</h4>
              <p className="text-sm text-slate-500">O LifeSync está otimizando esta função para seu perfil.</p>
              <button onClick={() => setModalType(null)} className="px-8 py-3 bg-primary text-black font-black rounded-xl">Fechar</button>
            </div>
          )}
        </Modal>

        {/* NOTIFICATION SYSTEM */}
        {notification && (
          <div className="fixed top-12 left-1/2 -translate-x-1/2 lg:top-20 lg:right-8 lg:translate-x-0 z-[110] animate-in slide-in-from-top-10 lg:slide-in-from-right duration-300">
            <div className={`px-6 py-4 rounded-3xl shadow-2xl flex items-center justify-between gap-8 backdrop-blur-xl border border-white/10 ${notification.type === 'success' ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-blue-500/20 border-blue-500/30 text-blue-400'}`}>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl">{notification.type === 'success' ? 'check_circle' : 'info'}</span>
                <span className="text-sm font-black uppercase tracking-wider">{notification.message}</span>
              </div>
              {notification.onUndo && <button onClick={handleUndo} className="px-4 py-2 bg-black/40 hover:bg-black/60 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 active:scale-90">Desfazer</button>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
