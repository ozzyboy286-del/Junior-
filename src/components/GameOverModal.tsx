import React from 'react';
import { GameStats } from '../types/game';
import { RotateCcw, Home, Award } from 'lucide-react';

interface GameOverModalProps {
  stats: GameStats;
  mode: 'campaign' | 'sprint' | 'survival';
  onRestart: () => void;
  onMenu: () => void;
  onOpenLeaderboard: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  stats,
  mode,
  onRestart,
  onMenu,
  onOpenLeaderboard,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-rose-500/30 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-3">
          <span className="text-2xl font-bold font-mono">!</span>
        </div>

        <h3 className="text-xl font-bold text-slate-100">
          {mode === 'sprint' ? 'Temps Écoulé !' : 'Partie Terminée'}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {mode === 'sprint' ? 'Fin des 60 secondes de sprint.' : 'Le chrono ou les erreurs ont eu raison de votre streak !'}
        </p>

        {/* Analytics */}
        <div className="w-full grid grid-cols-2 gap-2 my-4 text-left font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Score Obtenu</span>
            <span className="text-lg font-bold text-cyan-400 tabular-nums">
              {stats.score.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Vitesse Moyenne</span>
            <span className="text-lg font-bold text-slate-200 tabular-nums">
              {stats.shortcutsPerMin} <span className="text-xs text-slate-400">SPM</span>
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Précision</span>
            <span className="text-lg font-bold text-emerald-400 tabular-nums">
              {stats.accuracy}%
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Raccourcis Validés</span>
            <span className="text-lg font-bold text-amber-400 tabular-nums">
              {stats.correctHits}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-2">
          <button
            onClick={onRestart}
            className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-cyan-500/20"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Réessayer (R / Entrée)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLeaderboard}
              className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Voir le Classement</span>
            </button>
            <button
              onClick={onMenu}
              className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Menu Principal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
