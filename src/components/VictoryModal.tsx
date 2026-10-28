import React from 'react';
import { GameStats } from '../types/game';
import { Trophy, Star, ArrowRight, RotateCcw, Award } from 'lucide-react';

interface VictoryModalProps {
  stats: GameStats;
  levelTitle: string;
  starsEarned: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onRestart: () => void;
  onMenu: () => void;
  onOpenLeaderboard: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  stats,
  levelTitle,
  starsEarned,
  hasNextLevel,
  onNextLevel,
  onRestart,
  onMenu,
  onOpenLeaderboard,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        {/* Glow backdrop */}
        <div className="absolute -top-12 w-28 h-28 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Victory Icon & Stars */}
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
          <Trophy className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-extrabold text-slate-100">
          Niveau Complété !
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          {levelTitle}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-2 my-4">
          {[1, 2, 3].map((s) => (
            <Star
              key={s}
              className={`w-7 h-7 transition-all ${s <= starsEarned ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'text-slate-700'}`}
            />
          ))}
        </div>

        {/* Score & Speed Analytics Grid */}
        <div className="w-full grid grid-cols-2 gap-2 my-4 text-left font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Score Final</span>
            <span className="text-lg font-bold text-cyan-400 tabular-nums">
              {stats.score.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Vitesse Moyenne</span>
            <span className="text-lg font-bold text-slate-100 tabular-nums">
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
            <span className="text-[10px] text-slate-500 block uppercase">Max Combo</span>
            <span className="text-lg font-bold text-amber-400 tabular-nums">
              x{stats.maxCombo}
            </span>
          </div>
        </div>

        {/* Actions CTA */}
        <div className="w-full flex flex-col gap-2 mt-2">
          {hasNextLevel ? (
            <button
              onClick={onNextLevel}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-cyan-500/20"
            >
              <span>Niveau Suivant (Entrée)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onMenu}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <span>Menu Principal (Entrée)</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onRestart}
              className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rejouer (R)</span>
            </button>
            <button
              onClick={onOpenLeaderboard}
              className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Classement</span>
            </button>
            <button
              onClick={onMenu}
              className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-medium transition-colors border border-slate-700"
            >
              Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
