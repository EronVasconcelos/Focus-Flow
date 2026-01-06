
import React from 'react';
import { IMAGES } from '../constants';
import { Page } from '../types';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, onLogout, isOpen, onClose }) => {
  const navItems: { id: Page; icon: string; label: string; category?: string }[] = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'tasks', icon: 'task_alt', label: 'Minhas Tarefas' },
    { id: 'habits', icon: 'check_circle', label: 'Meus Hábitos' },
    { id: 'health', icon: 'monitor_heart', label: 'Painel de Saúde' },
    { id: 'calendar', icon: 'calendar_month', label: 'Calendário Familiar' },
    { id: 'resources', icon: 'inventory_2', label: 'Biblioteca' },
    { id: 'goals', icon: 'flag', label: 'Metas' },
    { id: 'analytics', icon: 'analytics', label: 'Análise' },
    { id: 'workspace-config', icon: 'tune', label: 'Configurações' },
    { id: 'settings', icon: 'person', label: 'Perfil' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-white dark:bg-[#080c14] border-r border-slate-200 dark:border-white/5 flex flex-col shrink-0 z-[70] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-cover border-2 border-primary/30"
                style={{ backgroundImage: `url(${IMAGES.ALEX_AVATAR})` }}
              />
              <div className="flex flex-col overflow-hidden">
                <h1 className="text-sm font-bold truncate">Alex Design</h1>
                <p className="text-[#9daec2] text-xs font-medium truncate">Membro Pro</p>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  onClose();
                }}
                className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                  activePage === item.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-slate-500 dark:text-[#9daec2] hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <span className={`material-symbols-outlined text-[24px] ${activePage === item.id ? 'icon-fill' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-semibold">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-slate-200 dark:border-white/5">
          <button 
            onClick={onLogout}
            className="flex items-center justify-center w-full gap-2 bg-slate-100 dark:bg-[#111d2e] hover:bg-red-500/10 hover:text-red-500 text-slate-500 dark:text-[#9daec2] py-2.5 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="text-sm font-bold">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
