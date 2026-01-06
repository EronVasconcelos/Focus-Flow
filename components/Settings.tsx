
import React from 'react';
import { IMAGES } from '../constants';

interface SettingsProps {
  onSave: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onSave }) => {
  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[900px] mx-auto w-full space-y-10 overflow-y-auto pb-24">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">Configurações do Perfil</h1>
        <p className="text-sm font-normal text-slate-400">Gerencie sua conta e preferências de <span className="text-primary font-bold">privacidade</span>.</p>
      </header>

      <section className="bg-surface-dark/40 p-8 rounded-2xl border border-white/5 space-y-8">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-20 h-20 rounded-xl bg-cover border-2 border-white/10 shadow-xl" style={{ backgroundImage: `url(${IMAGES.ALEX_AVATAR})` }} />
            <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="material-symbols-outlined text-white text-sm">edit</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Alex Silva</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">alex.design@pro.com • Membro Pro</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/5">
           {[
             { label: 'Nome Completo', val: 'Alex Silva' },
             { label: 'E-mail', val: 'alex.design@pro.com' }
           ].map(f => (
             <div key={f.label} className="space-y-2">
               <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{f.label}</label>
               <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:ring-1 focus:ring-primary/50 outline-none" defaultValue={f.val} />
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">toggle_on</span> Preferências do App
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Notificações Push', desc: 'Alertas de tarefas críticas em tempo real', checked: true },
            { label: 'Modo Foco Automático', desc: 'Bloquear distrações durante sessões de foco', checked: true },
          ].map((pref, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-surface-dark/40 rounded-2xl border border-white/5">
              <div>
                <p className="font-bold text-sm text-white">{pref.label}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{pref.desc}</p>
              </div>
              <div className="w-12 h-6 bg-white/10 rounded-full relative transition-all peer-checked:bg-primary">
                 <div className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-all ${pref.checked ? 'translate-x-6 bg-primary' : 'bg-slate-500'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end pt-4">
        <button onClick={onSave} className="bg-primary hover:bg-blue-400 text-black font-bold px-10 py-4 rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-95 text-sm uppercase tracking-widest">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default Settings;
