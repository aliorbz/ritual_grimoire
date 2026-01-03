
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSession, Topic } from '../types';
import { TOPICS, Footer } from '../constants';
import { supabase } from '../supabase';

interface ResultsPageProps {
  session: UserSession | null;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ session }) => {
  const navigate = useNavigate();
  const [result, setResult] = useState<any>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const lastResult = localStorage.getItem('ritual_last_result');
    if (lastResult) {
      setResult(JSON.parse(lastResult));
    } else {
      navigate('/topics');
    }
  }, [navigate]);

  useEffect(() => {
    const submitScore = async () => {
      // Guard check for supabase client existence
      if (!supabase) {
        console.warn("Supabase not configured. Score not saved to cloud ledger.");
        return;
      }

      if (result && !hasSubmitted && session?.displayName && session?.sessionId) {
        try {
          const { error } = await supabase.from('attempts').insert({
            session_id: session.sessionId,
            display_name: session.displayName,
            topic_id: result.topicId,
            score: result.score,
            total_questions: result.total,
            time_taken_seconds: result.timeTaken
          });
          
          if (error) throw error;
          setHasSubmitted(true);
        } catch (err) {
          console.error("Submission failed:", err);
        }
      }
    };
    submitScore();
  }, [result, session, hasSubmitted]);

  if (!result) return null;

  const topic = TOPICS.find(t => t.id === result.topicId);
  const percentage = Math.round((result.score / result.total) * 100);
  
  const getRank = (p: number) => {
    if (p === 100) return "Hierophant of Ritual";
    if (p >= 80) return "Adept Practitioner";
    if (p >= 60) return "Disciple of Knowledge";
    if (p >= 40) return "Seeker in Shadows";
    return "The Uninitiated";
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-20 min-h-screen flex flex-col items-center">
      <div className="text-center mb-16">
        <span className="text-[#39FF14] text-xs uppercase tracking-[0.5em] font-bold mb-4 block">Trial Complete</span>
        <h1 className="text-6xl md:text-7xl gothic text-white mb-6">Verdict Rendered</h1>
        
        <div className="relative inline-block mt-8 mb-12">
          <div className="absolute inset-0 bg-[#39FF14] blur-3xl opacity-10 animate-pulse"></div>
          <div className="relative flex items-center justify-center border-4 border-[#39FF14] w-48 h-48 mx-auto rounded-full">
            <div className="text-center">
              <div className="text-5xl font-black text-[#39FF14]">{result.score}<span className="text-2xl text-white/50">/{result.total}</span></div>
              <div className="text-[10px] uppercase tracking-widest text-[#39FF14]/60 mt-2">Correct Sigils</div>
            </div>
          </div>
        </div>

        <p className="text-2xl gothic text-white/80 mb-2">{getRank(percentage)}</p>
        <p className="text-gray-500 italic max-w-md mx-auto">"{session?.displayName || 'Traveler'}, your mark has been etched into the archives."</p>
        {!supabase && (
          <p className="mt-4 text-[10px] text-[#39FF14]/40 uppercase tracking-widest">
            Cloud connection missing. Results stored locally in your scroll.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full">
        <div className="bg-[#0D0F0D] border border-white/5 p-6 text-center">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block">Efficiency</span>
          <span className="text-2xl text-white">{percentage}%</span>
        </div>
        <div className="bg-[#0D0F0D] border border-white/5 p-6 text-center">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block">Time Consumed</span>
          <span className="text-2xl text-white">{Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s</span>
        </div>
        <div className="bg-[#0D0F0D] border border-white/5 p-6 text-center">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block">Knowledge Path</span>
          <span className="text-2xl text-white">{topic?.title}</span>
        </div>
      </div>

      <div className="mb-12 w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="gothic text-xl text-white">Review the Runes</h3>
          <button 
            onClick={() => setShowAnswers(!showAnswers)}
            className="text-[10px] uppercase tracking-widest text-[#39FF14] border border-[#39FF14]/30 px-4 py-2 hover:bg-[#39FF14]/10 transition-colors"
          >
            {showAnswers ? "Hide Revelations" : "Reveal the Answers"}
          </button>
        </div>

        {showAnswers && (
          <div className="space-y-4">
            {topic?.questions.map((q, idx) => {
              const isCorrect = result.answers[idx] === q.correctIndex;
              return (
                <div key={idx} className={`p-4 border ${isCorrect ? 'border-[#39FF14]/20 bg-[#39FF14]/5' : 'border-white/5 bg-black'}`}>
                  <div className="flex gap-4">
                    <span className={`gothic text-sm ${isCorrect ? 'text-[#39FF14]' : 'text-red-900'}`}>
                      {isCorrect ? '✓' : '✕'}
                    </span>
                    <div>
                      <p className="text-sm text-white mb-2">{q.text}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="text-[10px] uppercase text-gray-600">
                          Your choice: <span className={isCorrect ? 'text-[#39FF14]' : 'text-gray-400'}>{q.options[result.answers[idx]] || 'None'}</span>
                        </div>
                        {!isCorrect && (
                          <div className="text-[10px] uppercase text-gray-600">
                            Correct: <span className="text-[#39FF14]">{q.options[q.correctIndex]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center py-12 border-t border-white/10 w-full">
        <button 
          onClick={() => navigate(`/quiz/${result.topicId}`)}
          className="px-10 py-4 border border-white/20 text-white gothic text-xs tracking-widest hover:border-white transition-all w-full md:w-auto"
        >
          Attempt Again
        </button>
        <button 
          onClick={() => navigate('/leaderboard')}
          className="px-10 py-4 bg-[#39FF14] text-black gothic text-xs tracking-widest font-bold hover:brightness-110 transition-all w-full md:w-auto"
        >
          Open Ledger
        </button>
        <button 
          onClick={() => navigate('/topics')}
          className="px-10 py-4 text-gray-500 gothic text-xs tracking-widest hover:text-white transition-all w-full md:w-auto"
        >
          Return to Tomes
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ResultsPage;
