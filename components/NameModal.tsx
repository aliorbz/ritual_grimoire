
import React, { useState } from 'react';

interface NameModalProps {
  onSave: (name: string) => void;
  onClose: () => void;
}

const NameModal: React.FC<NameModalProps> = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 2 || name.length > 20) {
      setError('Name must be between 2 and 20 characters.');
      return;
    }
    onSave(name);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0D0F0D] border border-[#39FF14]/30 p-8 shadow-[0_0_50px_rgba(57,255,20,0.1)] scale-in-animation">
        {/* Occult corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#39FF14]"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#39FF14]"></div>
        
        <h2 className="text-3xl gothic text-white mb-2 text-center">Declare Your Name</h2>
        <p className="text-gray-400 text-sm text-center mb-8 italic">Your name will be etched into the eternal ledger.</p>

        <form onSubmit={handleSumbit}>
          <div className="mb-6">
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="Enter your handle..."
              className="w-full bg-black border border-white/10 p-4 text-[#39FF14] text-lg focus:outline-none focus:border-[#39FF14] transition-colors placeholder:text-gray-700"
            />
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
          </div>

          <div className="flex flex-col gap-3">
            <button 
              type="submit"
              className="w-full py-4 bg-[#39FF14] text-black font-bold uppercase gothic tracking-widest hover:brightness-110 transition-all active:scale-95"
            >
              Seal Name
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full py-2 text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest"
            >
              Fade into Shadow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameModal;
