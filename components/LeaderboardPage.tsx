
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSession } from '../types';
import { Footer } from '../constants';
import { supabase } from '../supabase';

interface LeaderboardPageProps {
  session: UserSession | null;
}

interface LeaderboardEntry {
  rank?: number;
  session_id: string;
  display_name: string;
  total_score: number;
  last_date: string;
  isYou?: boolean;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ session }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'global' | 'personal'>('global');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!supabase) {
        setLoading(false);
        setErrorStatus("The connection to the cloud ledger is severed. Please configure your ritual foundations (Supabase).");
        return;
      }

      setLoading(true);
      try {
        // We calculate total score by summing the max score for each unique topic_id per user
        const { data, error } = await supabase
          .from('attempts')
          .select('session_id, display_name, topic_id, score, created_at');

        if (error) throw error;

        // Group by user, then by topic, taking max score
        const userMap: Record<string, { display_name: string; topics: Record<string, number>; last_date: string }> = {};

        data.forEach(item => {
          if (!userMap[item.session_id]) {
            userMap[item.session_id] = { display_name: item.display_name, topics: {}, last_date: item.created_at };
          }
          const currentMax = userMap[item.session_id].topics[item.topic_id] || 0;
          if (item.score > currentMax) {
            userMap[item.session_id].topics[item.topic_id] = item.score;
          }
          if (new Date(item.created_at) > new Date(userMap[item.session_id].last_date)) {
            userMap[item.session_id].last_date = item.created_at;
          }
        });

        const sortedEntries: LeaderboardEntry[] = Object.entries(userMap).map(([sessionId, info]) => ({
          session_id: sessionId,
          display_name: info.display_name,
          total_score: Object.values(info.topics).reduce((a, b) => a + b, 0),
          last_date: new Date(info.last_date).toLocaleDateString(),
          isYou: sessionId === session?.sessionId
        })).sort((a, b) => b.total_score - a.total_score);

        setEntries(sortedEntries.map((e, idx) => ({ ...e, rank: idx + 1 })));
        setErrorStatus(null);
      } catch (err) {
        console.error("Fetch failed:", err);
        setErrorStatus("The arcane energies of the ledger are unstable. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [session]);

  const displayEntries = tab === 'global' ? entries.slice(0, 50) : entries.filter(e => e.isYou);

  return (
    <div className="max-w-5xl w-full mx-auto px-4 py-20 min-h-screen flex flex-col items-center">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl gothic text-white mb-4">The Ledger of Names</h1>
        <p className="text-gray-500 italic">"Where excellence is etched into the immutable void."</p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="flex bg-[#0D0F0D] p-1 border border-white/10 rounded">
          <button 
            onClick={() => setTab('global')}
            className={`px-8 py-2 text-xs uppercase tracking-widest transition-all gothic ${tab === 'global' ? 'bg-white/10 text-[#39FF14]' : 'text-gray-500 hover:text-white'}`}
          >
            Global Ledger
          </button>
          <button 
            onClick={() => setTab('personal')}
            className={`px-8 py-2 text-xs uppercase tracking-widest transition-all gothic ${tab === 'personal' ? 'bg-white/10 text-[#39FF14]' : 'text-gray-500 hover:text-white'}`}
          >
            My Marks
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-2 border-[#39FF14]/20 border-t-[#39FF14] rounded-full animate-spin"></div>
          </div>
        ) : errorStatus ? (
          <div className="py-20 text-center max-w-lg mx-auto">
            <p className="text-[#39FF14] gothic text-sm uppercase tracking-widest mb-4">Connection Failed</p>
            <p className="text-gray-400 italic text-xs">{errorStatus}</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-gray-500 border-b border-white/10">
                <th className="py-4 px-4 font-normal">Rank</th>
                <th className="py-4 px-4 font-normal">Sovereign Name</th>
                <th className="py-4 px-4 font-normal text-center">Total Score</th>
                <th className="py-4 px-4 font-normal text-right">Last Mark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayEntries.length > 0 ? displayEntries.map((entry) => (
                <tr 
                  key={entry.session_id} 
                  className={`transition-colors group hover:bg-white/5 ${entry.isYou ? 'bg-[#39FF14]/5' : ''}`}
                >
                  <td className="py-5 px-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center gothic text-sm
                      ${entry.rank && entry.rank <= 3 ? 'text-[#39FF14] border border-[#39FF14]/30 shadow-[0_0_10px_rgba(57,255,20,0.2)]' : 'text-gray-600'}`}>
                      {entry.rank}
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${entry.isYou ? 'text-[#39FF14] font-bold' : 'text-white'}`}>{entry.display_name}</span>
                      {entry.isYou && <span className="text-[8px] bg-[#39FF14] text-black px-1 py-0.5 rounded font-bold uppercase">You</span>}
                      {entry.rank === 1 && <span className="text-xs flicker">🜂</span>}
                    </div>
                  </td>
                  <td className="py-5 px-4 text-center">
                    <span className="text-lg gothic text-white">{entry.total_score}</span>
                  </td>
                  <td className="py-5 px-4 text-right">
                    <span className="text-xs text-gray-600">{entry.last_date}</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="py-20 text-center text-gray-600 uppercase tracking-widest text-xs">
                    The void is silent. No marks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-20 flex flex-col items-center gap-6 w-full">
         <button 
           onClick={() => navigate('/topics')}
           className="group relative px-10 py-4 bg-transparent text-[#39FF14] border border-[#39FF14] gothic uppercase tracking-widest hover:bg-[#39FF14] hover:text-black transition-all"
         >
           Return to Tomes
         </button>
         <button 
           onClick={() => navigate('/')}
           className="text-xs text-gray-600 uppercase tracking-widest hover:text-white transition-colors"
         >
           Exit to the Void
         </button>
      </div>

      <Footer />
    </div>
  );
};

export default LeaderboardPage;
