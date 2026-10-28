import React, { useState } from 'react';
import { 
  LeaderboardEntry, 
  getLeaderboard, 
  getStoredPlayerName, 
  setStoredPlayerName 
} from '../utils/leaderboard';
import { Trophy, Medal, Flame, Zap, X, User } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScore?: number;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentScore,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'campaign' | 'sprint' | 'survival'>('all');
  const [playerName, setPlayerNameState] = useState(getStoredPlayerName());
  const [isEditingName, setIsEditingName] = useState(false);
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => getLeaderboard());

  if (!isOpen) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 16);
    setPlayerNameState(val);
    setStoredPlayerName(val);
  };

  const filtered = entries.filter((e) => {
    if (filterMode === 'all') return true;
    return e.mode === filterMode;
  });

  const topThree = filtered.slice(0, 3);
  const remaining = filtered.slice(3);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Classement des Meilleurs Scores
              </h2>
              <p className="text-xs text-slate-400">
                Prouvez votre vitesse de frappe et la maîtrise des raccourcis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Profile & Mode Tabs */}
        <div className="px-6 py-3 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Player name edit */}
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Pseudo :</span>
            <input
              type="text"
              value={playerName}
              onChange={handleNameChange}
              placeholder="Votre pseudo"
              maxLength={16}
              className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-100 font-medium focus:outline-hidden focus:border-cyan-500 text-xs w-28"
            />
          </div>

          {/* Filter segment control (Zero-Pill discipline compliant) */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 font-medium rounded-md transition-colors ${filterMode === 'all' ? 'bg-slate-800 text-cyan-400 shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilterMode('sprint')}
              className={`px-3 py-1 font-medium rounded-md transition-colors ${filterMode === 'sprint' ? 'bg-slate-800 text-cyan-400 shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Sprint 60s
            </button>
            <button
              onClick={() => setFilterMode('campaign')}
              className={`px-3 py-1 font-medium rounded-md transition-colors ${filterMode === 'campaign' ? 'bg-slate-800 text-cyan-400 shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Campagne
            </button>
            <button
              onClick={() => setFilterMode('survival')}
              className={`px-3 py-1 font-medium rounded-md transition-colors ${filterMode === 'survival' ? 'bg-slate-800 text-cyan-400 shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Blitz Survie
            </button>
          </div>
        </div>

        {/* Podium for top 3 */}
        {topThree.length > 0 && (
          <div className="px-6 py-4 bg-slate-950/40 border-b border-slate-800/80 grid grid-cols-3 gap-3 items-end">
            {/* 2nd place */}
            {topThree[1] ? (
              <div className="flex flex-col items-center bg-slate-900/60 border border-slate-800 rounded-xl p-3 order-1 text-center">
                <span className="text-xl">🥈</span>
                <span className="font-semibold text-slate-200 truncate max-w-full text-xs mt-1">
                  {topThree[1].playerName}
                </span>
                <span className="font-mono text-cyan-400 font-bold tabular-nums text-sm mt-0.5">
                  {topThree[1].score.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {topThree[1].speed} SPM · {topThree[1].accuracy}%
                </span>
              </div>
            ) : <div className="order-1" />}

            {/* 1st place */}
            {topThree[0] ? (
              <div className="flex flex-col items-center bg-gradient-to-b from-amber-500/10 to-slate-900 border border-amber-500/40 rounded-xl p-3 order-2 text-center shadow-lg shadow-amber-500/5">
                <span className="text-2xl animate-bounce">🥇</span>
                <span className="font-bold text-amber-300 truncate max-w-full text-xs mt-1">
                  {topThree[0].playerName}
                </span>
                <span className="font-mono text-amber-400 font-extrabold tabular-nums text-base mt-0.5">
                  {topThree[0].score.toLocaleString()}
                </span>
                <span className="text-[10px] text-amber-200/80 font-mono">
                  {topThree[0].speed} SPM · {topThree[0].accuracy}%
                </span>
              </div>
            ) : <div className="order-2" />}

            {/* 3rd place */}
            {topThree[2] ? (
              <div className="flex flex-col items-center bg-slate-900/60 border border-slate-800 rounded-xl p-3 order-3 text-center">
                <span className="text-xl">🥉</span>
                <span className="font-semibold text-slate-200 truncate max-w-full text-xs mt-1">
                  {topThree[2].playerName}
                </span>
                <span className="font-mono text-cyan-400 font-bold tabular-nums text-sm mt-0.5">
                  {topThree[2].score.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {topThree[2].speed} SPM · {topThree[2].accuracy}%
                </span>
              </div>
            ) : <div className="order-3" />}
          </div>
        )}

        {/* Scrollable Leaderboard Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Joueur</th>
                <th className="py-2 px-3">Mode</th>
                <th className="py-2 px-3 text-right">Vitesse</th>
                <th className="py-2 px-3 text-right">Précision</th>
                <th className="py-2 px-3 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 font-mono">
              {filtered.map((entry, index) => {
                const isCurrentPlayer = entry.playerName.toLowerCase() === playerName.toLowerCase();
                return (
                  <tr
                    key={entry.id}
                    className={`hover:bg-slate-800/30 transition-colors ${isCurrentPlayer ? 'bg-cyan-950/30 text-cyan-200' : 'text-slate-300'}`}
                  >
                    <td className="py-2.5 px-3 font-bold text-slate-400">
                      {index + 1}
                    </td>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-100 flex items-center gap-1.5">
                      {entry.playerName}
                      {isCurrentPlayer && (
                        <span className="text-[10px] bg-cyan-900/80 text-cyan-300 px-1 py-0.2 rounded">Vous</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 capitalize font-sans">
                      {entry.mode === 'sprint' ? 'Sprint 60s' :
                       entry.mode === 'campaign' ? `Niv. ${entry.levelId || '?'}` :
                       'Blitz'}
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-slate-300">
                      {entry.speed} SPM
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-slate-300">
                      {entry.accuracy}%
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums font-bold text-cyan-400">
                      {entry.score.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Enregistrement automatique des scores locaux</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
