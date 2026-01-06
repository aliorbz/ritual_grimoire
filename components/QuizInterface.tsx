
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TOPICS, HourglassIcon, Footer } from '../constants';
import { UserSession, QuizProgress, Question } from '../types';

interface QuizInterfaceProps {
  session: UserSession | null;
  triggerNameModal: (path?: string) => void;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ session, triggerNameModal }) => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const topic = TOPICS.find(t => t.id === topicId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [questionIndices, setQuestionIndices] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const timerRef = useRef<any>(null);

  const getRandomIndices = (max: number, count: number): number[] => {
    const indices = Array.from({ length: max }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices.slice(0, count);
  };

  useEffect(() => {
    if (!topic) {
      navigate('/topics');
      return;
    }

    const savedProgressStr = localStorage.getItem(`ritual_progress_${topicId}`);
    if (savedProgressStr) {
      const saved: QuizProgress = JSON.parse(savedProgressStr);
      const now = Date.now();
      const elapsed = Math.floor((now - saved.startTime) / 1000);
      const remaining = Math.max(0, topic.timeLimit - elapsed);
      
      if (remaining === 0) {
        startFresh();
      } else {
        setCurrentIndex(saved.currentIndex);
        setAnswers(saved.answers);
        setQuestionIndices(saved.questionIndices);
        setTimeLeft(remaining);
      }
    } else {
      startFresh();
    }

    function startFresh() {
      const totalQuestionsPool = topic!.questions.length;
      const targetCount = Math.min(15, totalQuestionsPool);
      const indices = getRandomIndices(totalQuestionsPool, targetCount);

      setCurrentIndex(0);
      setAnswers(new Array(targetCount).fill(null));
      setQuestionIndices(indices);
      setTimeLeft(topic!.timeLimit);

      localStorage.setItem(`ritual_progress_${topicId}`, JSON.stringify({
        topicId: topicId,
        currentIndex: 0,
        answers: new Array(targetCount).fill(null),
        questionIndices: indices,
        startTime: Date.now()
      }));
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [topicId, topic, navigate]);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitting) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isSubmitting]);

  const saveProgress = (newAnswers: (number | null)[], newIndex: number) => {
    const savedStr = localStorage.getItem(`ritual_progress_${topicId}`);
    if (savedStr) {
      const saved = JSON.parse(savedStr);
      localStorage.setItem(`ritual_progress_${topicId}`, JSON.stringify({
        ...saved,
        currentIndex: newIndex,
        answers: newAnswers
      }));
    }
  };

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
    saveProgress(newAnswers, currentIndex);
  };

  const handleNext = () => {
    if (currentIndex < questionIndices.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      saveProgress(answers, nextIndex);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      saveProgress(answers, prevIndex);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    const sessionQuestions = questionIndices.map(idx => topic!.questions[idx]);
    const score = answers.reduce((acc, ans, idx) => {
      return ans === sessionQuestions[idx].correctIndex ? (acc as number) + 1 : (acc as number);
    }, 0);

    const result = {
      topicId: topicId,
      topicTitle: topic?.title,
      score,
      total: sessionQuestions.length,
      timeTaken: (topic?.timeLimit || 0) - timeLeft,
      answers,
      questionIndices,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('ritual_last_result', JSON.stringify(result));
    localStorage.removeItem(`ritual_progress_${topicId}`);
    setTimeout(() => { navigate('/results'); }, 1000);
  };

  if (!topic || questionIndices.length === 0) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = topic.questions[questionIndices[currentIndex]];

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-6 md:py-12 min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10 gap-4">
        <div className="flex flex-col flex-1">
          <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-500 mb-1">Ancient Tome</span>
          <span className="gothic text-white text-sm md:text-lg line-clamp-1">{topic.title}</span>
        </div>

        <div className="text-center px-4">
          <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-500 mb-1 block">Trial Step</span>
          <span className="text-base md:text-xl font-bold text-white whitespace-nowrap">{currentIndex + 1} / {questionIndices.length}</span>
        </div>

        <div className={`flex flex-col items-end flex-1 ${timeLeft < 30 ? 'animate-pulse' : ''}`}>
          <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-500 mb-1">Sands Falling</span>
          <div className={`flex items-center gap-2 ${timeLeft < 30 ? 'text-[#39FF14]' : 'text-white'}`}>
            <HourglassIcon className="w-3 h-3 md:w-4 md:h-4" />
            <span className={`text-base md:text-xl font-mono ${timeLeft < 120 ? 'neon-text' : ''}`}>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-grow flex flex-col justify-center">
        <div className="relative bg-[#0D0F0D] border border-white/10 p-6 md:p-12 shadow-2xl mb-12 overflow-hidden">
           <div className="absolute top-0 left-0 p-2 text-white/10 gothic text-[8px] md:text-xs">A🜂</div>
           <div className="absolute top-0 right-0 p-2 text-white/10 gothic text-[8px] md:text-xs">Ω🜃</div>
           <div className="absolute bottom-0 left-0 p-2 text-white/10 gothic text-[8px] md:text-xs">Ψ🜁</div>
           <div className="absolute bottom-0 right-0 p-2 text-white/10 gothic text-[8px] md:text-xs">Φ🜄</div>

           <h2 className="text-xl md:text-3xl font-light text-white leading-relaxed text-center mb-10 md:mb-16">
            {currentQuestion.text}
           </h2>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentIndex] === idx;
              const runeLabels = ['A', 'B', 'C', 'D'];
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`relative p-4 md:p-6 text-left transition-all duration-300 group border
                    ${isSelected 
                      ? 'border-[#39FF14] bg-[#39FF14]/5 shadow-[0_0_15px_rgba(57,255,20,0.1)]' 
                      : 'border-white/5 bg-black hover:border-white/20'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`gothic text-xs w-8 h-8 flex items-center justify-center border transition-colors
                      ${isSelected ? 'border-[#39FF14] text-[#39FF14]' : 'border-white/10 text-white/40 group-hover:border-white/20'}`}>
                      {runeLabels[idx]}
                    </span>
                    <span className={`text-sm md:text-base ${isSelected ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'}`}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
           </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-full sm:w-auto px-8 py-4 uppercase gothic text-[10px] tracking-widest transition-all
              ${currentIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'text-gray-500 hover:text-white'}`}
          >
            ← Previous Sigil
          </button>

          <button
            onClick={handleNext}
            disabled={answers[currentIndex] === null || isSubmitting}
            className={`w-full sm:w-auto px-12 py-5 uppercase gothic text-xs tracking-widest transition-all
              ${answers[currentIndex] === null || isSubmitting
                ? 'bg-transparent border border-white/5 text-white/10 cursor-not-allowed' 
                : 'bg-transparent border border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black shadow-[0_0_10px_rgba(57,255,20,0.2)]'}`}
          >
            {isSubmitting ? 'Summoning...' : currentIndex === questionIndices.length - 1 ? 'Final Seal' : 'Next Sigil →'}
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-black border border-[#39FF14]/50 text-[#39FF14] text-[10px] uppercase tracking-widest z-[200] flicker whitespace-nowrap rounded-sm shadow-xl">
          The sands keep falling...
        </div>
      )}

      <Footer />
    </div>
  );
};

export default QuizInterface;
