
import React, { useState, useEffect } from 'react';
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
import { supabase } from './supabaseClient';

export type WidgetType = 'stats' | 'productivity' | 'tasks' | 'health' | 'habits' | 'family' | 'goals' | 'resources';

export interface WidgetConfig {
  instanceId: string;
  type: WidgetType;
  title: string;
  color: string;
  span: 'full' | 'half';
}

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [widgets, setWidgets] = useState<WidgetConfig[]>([
    { instanceId: 'w0', type: 'stats', title: 'Resumo de Performance', color: 'blue', span: 'full' },
    { instanceId: 'w1', type: 'productivity', title: 'Produtividade Semanal', color: 'emerald', span: 'full' },
    { instanceId: 'w2', type: 'tasks', title: 'Trabalho', color: 'orange', span: 'half' },
    { instanceId: 'w3', type: 'health', title: 'Hidratação', color: 'blue', span: 'half' },
    { instanceId: 'w4', type: 'habits', title: 'Meus Hábitos', color: 'purple', span: 'half' },
  ]);

  const [editingWidget, setEditingWidget] = useState<WidgetConfig | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);
  const [waterConsumed, setWaterConsumed] = useState(1500); 
  const waterGoal = 2500;

  const [modalType, setModalType] = useState<'quick-add' | 'edit-widget' | 'add-widget-library' | 'coming-soon' | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  // Sync with Supabase
  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      const { data: tasksData } = await supabase.from('tasks').select('*');
      const { data: habitsData } = await supabase.from('habits').select('*');
      const { data: goalsData } = await supabase.from('goals').select('*');

      if (tasksData && tasksData.length > 0) setTasks(tasksData);
      else setTasks(MOCK_TASKS);

      if (habitsData && habitsData.length > 0) setHabits(habitsData);
      else setHabits(MOCK_HABITS);

      if (goalsData && goalsData.length > 0) setGoals(goalsData);
      else setGoals(MOCK_GOALS);
    } catch (err) {
      console.error("Erro ao buscar dados do Supabase:", err);
      // Fallback para mocks se falhar
      setTasks(MOCK_TASKS);
      setHabits(MOCK_HABITS);
      setGoals(MOCK_GOALS);
    }
  };

  const notify = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    
    // Otimista
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));

    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      notify("Erro ao atualizar tarefa", "info");
      // Rollback se necessário (simplificado aqui)
    }
  };

  const toggleHabitDay = async (id: string, idx: number) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const newDays = [...habit.completedDays];
    newDays[idx] = !newDays[idx];
    const newStreak = newDays[idx] ? habit.streak + 1 : Math.max(0, habit.streak - 1);

    setHabits(prev => prev.map(h => h.id === id ? { ...h, completedDays: newDays, streak: newStreak } : h));

    await supabase
      .from('habits')
      .update({ completedDays: newDays, streak: newStreak })
      .eq('id', id);
  };

  const moveWidget = (index: number, direction: 'up' | 'down') => {
    const newWidgets = [...widgets];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= widgets.length) return;
    [newWidgets[index], newWidgets[targetIndex]] = [newWidgets[targetIndex], newWidgets[index]];
    setWidgets(newWidgets);
  };

  const removeWidget = (instanceId: string) => {
    setWidgets(widgets.filter(w => w.instanceId !== instanceId));
    notify("Quadro removido");
  };

  const addWidget = (type: WidgetType) => {
    const newWidget: WidgetConfig = {
      instanceId: `w-${Date.now()}`,
      type,
      title: type === 'stats' ? 'Resumo de Performance' : type.charAt(0).toUpperCase() + type.slice(1),
      color: type === 'stats' ? 'blue' : 'emerald',
      span: type === 'stats' || type === 'productivity' ? 'full' : 'half'
    };
    setWidgets([...widgets, newWidget]);
    setModalType(null);
    notify("Quadro adicionado!");
  };

  const updateWidget = (config: WidgetConfig) => {
    setWidgets(widgets.map(w => w.instanceId === config.instanceId ? config : w));
    setModalType(null);
    notify("Configurações salvas");
  };

  const renderContent = () => {
    switch(activePage) {
      case 'dashboard':
        return (
          <Dashboard 
            widgets={widgets}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            tasks={tasks}
            habits={habits}
            waterConsumed={waterConsumed}
            waterGoal={waterGoal}
            onAddWater={() => setWaterConsumed(prev => Math.min(prev + 250, 5000))}
            onToggleTask={toggleTask}
            onToggleHabitDay={toggleHabitDay}
            setActivePage={setActivePage}
            onEditWidget={(w) => { setEditingWidget(w); setModalType('edit-widget'); }}
            onMoveWidget={moveWidget}
            onRemoveWidget={removeWidget}
            onOpenLibrary={() => setModalType('add-widget-library')}
          />
        );
      case 'tasks':
        return <Tasks tasks={tasks} onToggle={toggleTask} onNewTask={() => setModalType('quick-add')} />;
      case 'habits':
        return <Habits habits={habits} setHabits={setHabits} onNewHabit={() => setModalType('coming-soon')} />;
      case 'health':
        return <Health onLog={() => setModalType('coming-soon')} />;
      case 'calendar':
        return <Calendar onAddEvent={() => setModalType('coming-soon')} />;
      case 'resources':
        return <Resources resources={resources} onAdd={() => setModalType('coming-soon')} />;
      case 'goals':
        return <Goals goals={goals} onNewGoal={() => setModalType('coming-soon')} />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings onSave={() => notify("Perfil atualizado!")} />;
      case 'workspace-config':
        return <WorkspaceConfig />;
      default:
        return <div className="p-10 text-slate-500">Página em construção...</div>;
    }
  };

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div className="flex h-screen bg-background-dark overflow-hidden font-sans text-white transition-all">
      <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={() => setIsLoggedIn(false)} isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <main className="flex-1 flex flex-col min-w-0 relative pb-16 lg:pb-0 overflow-hidden">
        <header className="h-16 px-6 lg:px-10 border-b border-white/5 flex items-center justify-between shrink-0 bg-background-dark/50 backdrop-blur-md z-40">
           <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-500 hover:text-primary"><span className="material-symbols-outlined">menu</span></button>
              <h2 className="hidden md:block text-xs font-bold uppercase tracking-[0.3em] text-primary">Produtify v2.1 • Sincronizado</h2>
           </div>
           <button onClick={() => setActivePage('settings')} className="w-8 h-8 rounded-full border border-primary/30 overflow-hidden hover:scale-105 transition-transform"><img src={IMAGES.ALEX_AVATAR} className="w-full h-full object-cover" /></button>
        </header>

        <div className="flex-1 overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
          {renderContent()}
        </div>

        {/* MODAL: QUICK ADD */}
        <Modal isOpen={modalType === 'quick-add'} onClose={() => setModalType(null)} title="Nova Tarefa">
          <div className="space-y-4">
             <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:ring-1 focus:ring-primary" placeholder="O que precisa ser feito?" id="quick-task-title" />
             <div className="grid grid-cols-2 gap-3">
                <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2 justify-center">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span> Hoje
                </button>
                <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2 justify-center">
                  <span className="material-symbols-outlined text-[16px]">flag</span> Prioridade
                </button>
             </div>
             <button 
              onClick={async () => { 
                const title = (document.getElementById('quick-task-title') as HTMLInputElement).value;
                if (!title) return;
                const newTask: Partial<Task> = {
                  id: crypto.randomUUID(),
                  title,
                  status: 'pending',
                  priority: 'medium',
                  category: 'Inbox',
                  dueDate: 'Hoje',
                  tags: []
                };
                setTasks([newTask as Task, ...tasks]);
                await supabase.from('tasks').insert([newTask]);
                notify("Tarefa sincronizada!"); 
                setModalType(null); 
              }} 
              className="w-full py-4 bg-primary text-black font-bold rounded-xl uppercase tracking-widest text-xs mt-4"
             >
              Criar Tarefa
             </button>
          </div>
        </Modal>

        {/* MODAL: COMING SOON */}
        <Modal isOpen={modalType === 'coming-soon'} onClose={() => setModalType(null)} title="Funcionalidade em Breve">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
               <span className="material-symbols-outlined text-primary text-3xl">construction</span>
            </div>
            <p className="text-slate-400">Estamos trabalhando para trazer essa funcionalidade o quanto antes. Fique ligado!</p>
            <button onClick={() => setModalType(null)} className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl uppercase tracking-widest text-xs">Entendido</button>
          </div>
        </Modal>

        {/* Modal edit-widget e add-widget-library permanecem iguais... */}
        <Modal isOpen={modalType === 'edit-widget' && !!editingWidget} onClose={() => setModalType(null)} title="Personalizar Quadro">
          {editingWidget && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nome do Quadro</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:ring-1 focus:ring-primary" value={editingWidget.title} onChange={(e) => setEditingWidget({...editingWidget, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Destaque</label>
                <div className="flex gap-2">
                  {['emerald', 'orange', 'blue', 'purple', 'pink'].map(c => (
                    <button key={c} onClick={() => setEditingWidget({...editingWidget, color: c})} className={`w-10 h-10 rounded-xl border-2 transition-all ${editingWidget.color === c ? 'border-white' : 'border-transparent opacity-40'}`} style={{ backgroundColor: c === 'emerald' ? '#10b981' : c === 'orange' ? '#fb923c' : c === 'blue' ? '#3b82f6' : c === 'purple' ? '#a855f7' : '#ec4899' }} />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tamanho</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setEditingWidget({...editingWidget, span: 'half'})} className={`p-3 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all ${editingWidget.span === 'half' ? 'bg-primary text-black border-primary' : 'bg-white/5 border-white/5 text-slate-500'}`}>Médio</button>
                  <button onClick={() => setEditingWidget({...editingWidget, span: 'full'})} className={`p-3 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all ${editingWidget.span === 'full' ? 'bg-primary text-black border-primary' : 'bg-white/5 border-white/5 text-slate-500'}`}>Largo</button>
                </div>
              </div>
              <button onClick={() => updateWidget(editingWidget)} className="w-full py-4 bg-primary text-black font-bold rounded-xl uppercase tracking-widest text-xs">Salvar Alterações</button>
            </div>
          )}
        </Modal>

        <Modal isOpen={modalType === 'add-widget-library'} onClose={() => setModalType(null)} title="Biblioteca de Quadros">
          <div className="grid grid-cols-2 gap-4">
            {[
              { type: 'stats', label: 'Resumo Numérico', icon: 'format_list_numbered', color: 'text-primary' },
              { type: 'productivity', label: 'Gráfico Produtividade', icon: 'trending_up', color: 'text-emerald-400' },
              { type: 'tasks', label: 'Minhas Tarefas', icon: 'task_alt', color: 'text-orange-400' },
              { type: 'health', label: 'Saúde & Água', icon: 'water_drop', color: 'text-blue-400' },
              { type: 'habits', label: 'Hábitos Semanais', icon: 'check_circle', color: 'text-purple-400' },
              { type: 'family', label: 'Agenda Familiar', icon: 'groups', color: 'text-pink-400' },
            ].map((lib) => (
              <button key={lib.type} onClick={() => addWidget(lib.type as WidgetType)} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group">
                <span className={`material-symbols-outlined text-3xl ${lib.color} group-hover:scale-110 transition-transform`}>{lib.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">{lib.label}</span>
              </button>
            ))}
          </div>
        </Modal>

        {notification && (
          <div className="fixed bottom-20 right-8 z-[110] animate-in slide-in-from-right duration-300">
            <div className="px-6 py-4 rounded-2xl bg-primary/20 backdrop-blur-xl border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest shadow-2xl">
              {notification.message}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
