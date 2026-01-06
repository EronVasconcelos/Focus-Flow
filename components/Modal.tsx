
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background-dark/95 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-[#050a14] w-full max-w-lg rounded-[2.5rem] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-transparent to-primary/5">
          <h3 className="text-2xl font-black text-white tracking-tight">{title}</h3>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-white/5 text-slate-500 hover:text-white transition-all active:scale-90"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
