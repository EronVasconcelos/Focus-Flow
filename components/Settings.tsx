
import React from 'react';
import { IMAGES } from '../constants';

interface SettingsProps {
  onSave: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onSave }) => {
  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[900px] mx-auto w-full space-y-10 overflow-y-auto">
      <header>
        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Configurações</h1>
        <p className="text-slate-500 dark:text-[#9db9a1]">Gerencie sua conta e preferências de usuário.</p>
      </header>

      <section className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-white/5 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <div 
              className="w-24 h-24 rounded-full bg-cover border-4 border-white dark:border-surface-dark shadow-2xl ring-4 ring-primary/5 group-hover:ring-primary/20 transition-all"
              style={{ backgroundImage: `url(${IMAGES.ALEX_AVATAR})` }}
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-[2px]">
              <span className="material-symbols-outlined text-white">edit</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black dark:text-white">Alex Silva</h2>
            <p className="text-slate-500 dark:text-[#9db9a1] font-medium">alex.design@pro.com</p>
            <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-primary/20">Mestre Produtividade</span>
              <span className="bg-blue-500/10 text-blue-500 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-blue-500/20">Plano Pro</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/5">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Nome Completo</label>
            <input className="w-full bg-slate-50 dark:bg-surface-darker border-none rounded-2xl p-4 text-sm focus:ring-primary dark:text-white" defaultValue="Alex Silva" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">E-mail</label>
            <input className="w-full bg-slate-50 dark:bg-surface-darker border-none rounded-2xl p-4 text-sm focus:ring-primary dark:text-white" defaultValue="alex.design@pro.com" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Bio</label>
            <textarea className="w-full bg-slate-50 dark:bg-surface-darker border-none rounded-2xl p-4 text-sm focus:ring-primary dark:text-white h-24 resize-none" defaultValue="Entusiasta de produtividade e biohacking. Desenvolvedor focado em interfaces fluidas e minimalistas." />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-black dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">toggle_on</span>
          Preferências
        </h3>
        <div className="space-y-3">
          {[
            { id: 'notif-1', label: 'Notificações de Prazos', desc: 'Receber alertas 1h antes das entregas', checked: true },
            { id: 'notif-2', label: 'Resumo Semanal', desc: 'Relatórios automáticos de produtividade', checked: false },
            { id: 'notif-3', label: 'Modo Foco Automático', desc: 'Silenciar distrações durante o trabalho profundo', checked: true },
          ].map((pref) => (
            <div key={pref.id} className="flex items-center justify-between p-5 bg-white dark:bg-surface-dark rounded-2xl border border-white/5 hover:border-primary/20 transition-all cursor-pointer">
              <div>
                <p className="font-black text-sm dark:text-white">{pref.label}</p>
                <p className="text-xs text-slate-500 font-medium">{pref.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={pref.checked} />
                <div className="w-12 h-6 bg-slate-200 dark:bg-white/10 rounded-full peer-checked:bg-primary transition-all after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6"></div>
              </label>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end gap-3 pb-20">
        <button className="px-8 py-4 rounded-2xl border border-slate-200 dark:border-white/10 font-bold text-sm dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all">Descartar</button>
        <button onClick={onSave} className="px-8 py-4 rounded-2xl bg-primary text-black font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all">Salvar Alterações</button>
      </div>
    </div>
  );
};

export default Settings;
