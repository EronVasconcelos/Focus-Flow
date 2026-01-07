
import React from 'react';
import { IMAGES } from '../constants';
import { ProdutifyIcon } from './Sidebar';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex h-screen w-full bg-background-dark overflow-hidden">
      <div className="hidden lg:flex flex-1 relative items-center justify-center border-r border-white/5">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url(${IMAGES.LOGIN_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent" />
        
        <div className="relative z-10 p-16 max-w-xl text-left">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,180,255,0.4)]">
              <ProdutifyIcon className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tighter">Produtify</h1>
          </div>
          <h2 className="text-6xl font-bold text-white leading-tight mb-6 tracking-tighter">
            Domine sua rotina.<br/>
            <span className="text-primary drop-shadow-[0_0_15px_rgba(0,180,255,0.4)]">Foque no essencial.</span>
          </h2>
          <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-md">
            O sistema operacional definitivo para sua produtividade e bem-estar.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background-dark relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="w-full max-w-md space-y-10 relative z-10 p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] backdrop-blur-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">Bem-vindo</h2>
            <p className="mt-3 text-slate-400 font-medium">Inicie sua jornada para uma vida organizada.</p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4">Usuário / E-mail</label>
              <input 
                className="w-full bg-white/5 border border-white/10 text-white rounded-2xl p-5 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600 font-medium" 
                placeholder="alex@produtify.pro" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4">Senha</label>
              <input 
                type="password" 
                className="w-full bg-white/5 border border-white/10 text-white rounded-2xl p-5 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600 font-medium" 
                placeholder="••••••••••••" 
              />
            </div>
          </div>

          <button 
            onClick={onLogin}
            className="w-full py-5 bg-primary text-black font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-white transform transition-all active:scale-[0.98] text-sm uppercase tracking-widest"
          >
            Acessar Workspace
          </button>

          <div className="flex items-center justify-between px-2 pt-2">
            <button className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Esqueci minha senha</button>
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Solicitar Acesso</button>
          </div>
          
          <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest pt-4">
            Ambiente seguro e criptografado
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
