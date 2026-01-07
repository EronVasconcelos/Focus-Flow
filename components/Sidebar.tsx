
import React from 'react';
import { Page } from '../types';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

// Novo ícone Produtify (Rocket) - Simboliza propulsão e eficiência
export const ProdutifyIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
    <path d="M15 12v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, onLogout, isOpen, onClose }) => {
  const navItems: { id: Page; icon: string; label: string; colorClass: string }[] = [
    { id: 'dashboard', icon: 'grid_view', label: 'Dashboard', colorClass: 'text-primary' },
    { id: 'tasks', icon: 'check_circle', label: 'Minhas Tarefas', colorClass: 'text-work' },
    { id: 'habits', icon: 'published_with_changes', label: 'Meus Hábitos', colorClass: 'text-personal' },
    { id: 'health', icon: 'monitor_heart', label: 'Painel de Saúde', colorClass: 'text-health' },
    { id: 'calendar', icon: 'calendar_month', label: 'Calendário Familiar', colorClass: 'text-family' },
    { id: 'resources', icon: 'inventory_2', label: 'Biblioteca', colorClass: 'text-cyan-400' },
    { id: 'goals', icon: 'flag', label: 'Metas', colorClass: 'text-orange-400' },
    { id: 'analytics', icon: 'analytics', label: 'Análise', colorClass: 'text-primary' },
    { id: 'workspace-config', icon: 'tune', label: 'Configurações', colorClass: 'text-slate-400' },
    { id: 'settings', icon: 'person', label: 'Perfil', colorClass: 'text-slate-400' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-surface-darker border-r border-white/5 flex flex-col shrink-0 z-[70] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10 cursor-pointer group" onClick={() => setActivePage('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:-translate-y-1 transition-all">
              <ProdutifyIcon className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tighter">Produtify</h1>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">High Performance</p>
            </div>
          </div>

          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); onClose(); }}
                className={`flex items-center w-full gap-3 px-4 py-2.5 rounded-xl transition-all ${activePage === item.id ? 'bg-white/5 text-primary' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
              >
                <span className={`material-symbols-outlined text-[22px] ${item.colorClass} ${activePage === item.id ? 'icon-fill' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-bold">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/5">
            <button onClick={onLogout} className="flex items-center w-full gap-3 px-4 py-3 text-red-500/60 hover:text-red-500 transition-all font-bold uppercase tracking-widest text-[10px]">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Sair da Conta
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
