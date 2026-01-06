
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TOPICS, RuneIcon, Footer } from '../constants';
import { UserSession, Topic } from '../types';

interface TopicSelectionProps {
  session: UserSession | null;
  triggerNameModal: (path?: string) => void;
}

const TopicCard: React.FC<{ topic: Topic, onSelect: () => void }> = ({ topic, onSelect }) => {
  return (
    <div 
      className={`relative group bg-[#0D0F0D] border transition-all duration-500 p-6 md:p-8 flex flex-col h-full
        ${topic.enabled 
          ? 'border-white/10 hover:border-[#39FF14] cursor-pointer' 
          : 'border-white/5 opacity-60 grayscale cursor-not-allowed'}`}
      onClick={topic.enabled ? onSelect : undefined}
    >
      {/* Rune Decoration */}
      <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-30 transition-opacity">
        <RuneIcon className="w-10 h-10 md:w-12 md:h-12 text-[#39FF14]" />
      </div>

      <div className="mb-4">
        {topic.enabled ? (
          <span className="text-[9px] md:text-[10px] bg-[#39FF14]/10 text-[#39FF14] px-2 py-1 rounded uppercase tracking-tighter font-bold">Available Tome</span>
        ) : (
          <span className="text-[9px] md:text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded uppercase tracking-tighter font-bold">Locked Gate</span>
        )}
      </div>

      <h3 className="text-xl md:text-2xl gothic text-white mb-3 group-hover:text-[#39FF14] transition-colors">{topic.title}</h3>
      <p className="text-sm text-gray-400 mb-8 flex-grow leading-relaxed">{topic.description}</p>

      {topic.enabled && (
        <div className="flex flex-wrap gap-3 items-center text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest mb-8">
          <span>15 of {topic.questions.length || '30+'} Sigils</span>
          <span className="opacity-30">•</span>
          <span>{topic.timeLimit / 60} Minutes</span>
          <span className="opacity-30">•</span>
          <span className="text-[#39FF14]">{topic.difficulty}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {topic.enabled ? (
          <>
            <button className="flex-1 py-4 bg-[#39FF14]/10 border border-[#39FF14]/40 text-[#39FF14] gothic uppercase text-[10px] tracking-widest hover:bg-[#39FF14] hover:text-black transition-all">
              Open Tome
            </button>
            {topic.previewUrl && (
              <div className="relative group/tooltip">
                <a 
                  href={topic.previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full sm:w-auto px-5 h-full flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white transition-all py-3 sm:py-0"
                  title="Study Tome"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="w-full flex items-center justify-center py-4 border border-dashed border-white/10 text-gray-600 gothic uppercase text-[10px] tracking-widest">
            Coming Soon
          </div>
        )}
      </div>
    </div>
  );
}

const TopicSelection: React.FC<TopicSelectionProps> = ({ session, triggerNameModal }) => {
  const navigate = useNavigate();

  const handleSelectTopic = (topic: Topic) => {
    if (!session?.displayName) {
      triggerNameModal(`/quiz/${topic.id}`);
    } else {
      navigate(`/quiz/${topic.id}`);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto p-6 md:p-8 py-16 md:py-24 min-h-screen flex flex-col items-center">
      <div className="mb-16 md:mb-20 text-center">
        <h1 className="text-4xl md:text-6xl gothic mb-6 text-white leading-tight">Choose a Tome</h1>
        <p className="text-gray-400 max-w-xl mx-auto italic text-sm md:text-base leading-relaxed px-4">Select the chamber of knowledge you wish to enter. Many remain sealed by arcane power.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full px-2">
        {TOPICS.map(topic => (
          <TopicCard 
            key={topic.id} 
            topic={topic} 
            onSelect={() => handleSelectTopic(topic)} 
          />
        ))}
      </div>

      <div className="mt-24 text-center">
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em]">More tomes will appear as the ritual deepens.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-8 text-[#39FF14] text-[10px] uppercase tracking-widest hover:opacity-70 transition-opacity p-4"
        >
          Return to Void
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default TopicSelection;
