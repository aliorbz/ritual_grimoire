
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// Removed TOPICS from types import as it is defined in constants.tsx and unused here. 
// Also removed unused Attempt import.
import { UserSession } from './types';
import LandingPage from './components/LandingPage';
import TopicSelection from './components/TopicSelection';
import QuizInterface from './components/QuizInterface';
import ResultsPage from './components/ResultsPage';
import LeaderboardPage from './components/LeaderboardPage';
import NameModal from './components/NameModal';

const App: React.FC = () => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [redirectAfterName, setRedirectAfterName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('ritual_displayName');
    let storedSessionId = localStorage.getItem('ritual_sessionId');

    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem('ritual_sessionId', storedSessionId);
    }

    if (storedName) {
      setSession({ displayName: storedName, sessionId: storedSessionId });
    } else {
      setSession({ displayName: null, sessionId: storedSessionId });
    }
  }, []);

  const handleSaveName = (name: string) => {
    const sessionId = session?.sessionId || uuidv4();
    localStorage.setItem('ritual_displayName', name);
    localStorage.setItem('ritual_sessionId', sessionId);
    setSession({ displayName: name, sessionId });
    setIsNameModalOpen(false);
    if (redirectAfterName) {
      window.location.hash = redirectAfterName;
      setRedirectAfterName(null);
    }
  };

  const triggerNameModal = (redirectPath?: string) => {
    setRedirectAfterName(redirectPath || null);
    setIsNameModalOpen(true);
  };

  return (
    <Router>
      <div className="relative z-20 min-h-screen flex flex-col items-center">
        <Routes>
          <Route path="/" element={<LandingPage onBegin={() => session?.displayName ? window.location.hash = '#/topics' : triggerNameModal('/topics')} />} />
          <Route path="/topics" element={<TopicSelection session={session} triggerNameModal={triggerNameModal} />} />
          <Route path="/quiz/:topicId" element={<QuizInterface session={session} triggerNameModal={triggerNameModal} />} />
          <Route path="/results" element={<ResultsPage session={session} />} />
          <Route path="/leaderboard" element={<LeaderboardPage session={session} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {isNameModalOpen && (
          <NameModal 
            onSave={handleSaveName} 
            onClose={() => setIsNameModalOpen(false)} 
          />
        )}
      </div>
    </Router>
  );
};

export default App;
