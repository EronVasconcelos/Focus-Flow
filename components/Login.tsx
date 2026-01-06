
import React from 'react';
import { IMAGES } from '../constants';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex h-screen w-full bg-background-dark overflow-hidden">
      {/* Lado Esquerdo - Visual */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center border-r border-white/5">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{ backgroundImage: `url(${IMAGES.LOGIN_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent" />
        
        <div className="relative z-10 p-16 max-w-xl text-left">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,180,255,0.3)]">
              <span className="material-symbols-outlined text-black font-black text-3xl">dashboard</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter">LifeSync Pro</h1>
          </div>
          <h2 className="text-5xl font-black text-white leading-tight mb-6">
            Domine sua rotina.<br/>
            <span className="text-primary drop-shadow-[0_0_15px_rgba(0,180,255,0.4)]">Alcance suas metas.</span>
          </h2>
          <p className="text-lg text-slate-400 font-medium leading-relaxed">
            Gestão integrada de tarefas, saúde, hábitos e família em uma plataforma inteligente e minimalista.
          </p>
          
          <div className="mt-12 flex gap-8">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white">100%</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Privacidade</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white">24/7</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sincronização</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background-dark relative">
        {/* Glow effect in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-black text-white tracking-tight">Bem-vindo de volta</h2>
            <p className="mt-2 text-slate-400 font-medium tracking-wide">Faça login para continuar sua jornada.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">E-mail ou Usuário</label>
              <input 
                className="w-full bg-surface-dark border border-white/5 text-white rounded-2xl p-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600" 
                placeholder="exemplo@lifesync.pro" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Senha</label>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Esqueceu?</button>
              </div>
              <input 
                type="password" 
                className="w-full bg-surface-dark border border-white/5 text-white rounded-2xl p-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            onClick={onLogin}
            className="w-full py-4 bg-primary text-black font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-blue-400 transform transition-all active:scale-[0.98] text-sm uppercase tracking-widest"
          >
            Acessar Plataforma
          </button>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="mx-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">Ou entrar com</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 border border-white/10 rounded-2xl hover:bg-white/5 transition-all group">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFZDxKzyDodK3FTzEMuKXueBaKfIRBKMohYd-Q2M2qIBvQ4ReE0kMaM_W8GoPFqmyGWccpwpsefhUftkhLVIqfWYtKkQx5JblPnT17zuJBg7IwCXQh-kpcwFjyvrQEffXgIrYUZ_jDeqF1aqFAFNVj7VN6hCZl-UU_Wj2ONtBRpFKXHjP-BiuE4CWMuDDdu1kv3Rqt6SHGYYPOpE8H2U6txAc8UiZCkcCQyvAGxFjdwVvyZRR8UCZIUW3pPJcWk5S0pCiDuBP1LWk" className="w-5 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
              <span className="text-xs font-black text-white uppercase tracking-widest">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 border border-white/10 rounded-2xl hover:bg-white/5 transition-all group">
              <span className="material-symbols-outlined text-white text-[20px] group-hover:scale-110 transition-transform">apple</span>
              <span className="text-xs font-black text-white uppercase tracking-widest">Apple</span>
            </button>
          </div>
          
          <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest pt-4">
            Não tem uma conta? <button className="text-primary hover:underline">Cadastre-se grátis</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
