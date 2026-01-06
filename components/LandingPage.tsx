
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../constants';

interface LandingPageProps {
  onBegin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onBegin }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start pt-16 md:pt-16 min-h-screen text-center px-6 w-full relative">
      {/* Background Ritual Logo Spinning - Larger and Faster */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-5 z-0">
        <img 
          src="https://pbs.twimg.com/profile_images/1912582510631858176/-Xbw2AcT_400x400.jpg" 
          alt="Ritual Logo" 
          className="w-[150vw] h-[150vw] md:w-[110vw] md:h-[110vw] max-w-none animate-[spin_45s_linear_infinite] rounded-full filter grayscale contrast-200"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="text-[#39FF14] text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold opacity-80 mb-4 block">The Archives await</span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] leading-tight">
            RITUAL<br /><span className="text-[#39FF14] flicker">GRIMOIRE</span>
          </h1>
          <p className="text-lg md:text-2xl font-light text-gray-400 max-w-lg mx-auto italic leading-relaxed">
            Test your knowledge of the protocol through timed trials.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-16 w-full justify-center items-center">
          <button 
            onClick={onBegin}
            className="group relative w-full md:w-auto px-12 py-5 bg-transparent text-[#39FF14] border border-[#39FF14] gothic uppercase tracking-widest hover:bg-[#39FF14] hover:text-black transition-all duration-500 overflow-hidden min-w-[280px]"
          >
            <span className="relative z-10">Begin the Trial</span>
            <div className="absolute inset-0 bg-[#39FF14] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </button>

          <button 
            onClick={() => navigate('/leaderboard')}
            className="w-full md:w-auto px-12 py-5 bg-transparent text-white border border-white/20 gothic uppercase tracking-widest hover:border-white transition-all duration-300 min-w-[280px]"
          >
            The Ledger
          </button>
        </div>
      </div>

      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
