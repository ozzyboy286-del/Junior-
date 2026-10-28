import React from 'react';
import { GameStats } from '../types/game';
import { Flame, Clock, Zap, Target, Pause, Award } from 'lucide-react';

interface HUDProps {
  stats: GameStats;
  levelTitle?: string;
  levelCategory?: string;
  timeRemainingSec?: number;
  totalChallenges?: number;
  currentChallengeIndex?: number;
  mode: 'campaign' | 'sprint' | 'survival';
  onPause: () => void;
  onOpenLeaderboard: () => void;
  speedGoal?: number;
}

export const HUD: React.FC<HUDProps> = ({
  stats,
  levelTitle,
  levelCategory,
  timeRemainingSec,
  totalChallenges = 1,
  currentChallengeIndex = 0,
  mode,
  onPause,
  onOpenLeaderboard,
  speedGoal = 40,
}) => {
  // Combo multiplier label
  const multiplier = Math.min(1 + Math.floor(stats.combo / 3) * 0.5, 4.0);
  const isHighStreak = stats.combo >= 4;

  return (
    <div className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-slate-100 select-none z-10 font-sans">
      {/* Left: Level / Mode info & Progress */}
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              {mode === 'campaign' ? (levelCategory || 'Niveau') : mode === 'sprint' ? 'Défi Sprint 60s' : 'Blitz Survie'}
            </span>
            {mode === 'campaign' && (
              <span className="text-slate-500 text-xs">·</span>
            )}
            {mode === 'campaign' && (
              <span className="text-xs text-slate-300 font-medium">
                Étape {currentChallengeIndex + 1}/{totalChallenges}
              </span>
            )}
          </div>
          <h2 className="text-sm font-bold text-slate-100 truncate max-w-[200px] sm:max-w-xs">
            {levelTitle || 'Maîtrise des Raccourcis'}
          </h2>
        </div>
      </div>

      {/* Center: Score, Combo & Speed Gauge */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Score readout */}
        <div className="text-center">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Score</div>
          <div className="text-base sm:text-lg font-bold font-mono text-cyan-400 tabular-nums">
            {stats.score.toLocaleString()}
          </div>
        </div>

        {/* Combo Fire Multiplier */}
        <div className="flex items-center gap-1">
          <div className={`p-1.5 rounded-lg border flex items-center gap-1 transition-all ${isHighStreak ? 'bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            <Flame className={`w-4 h-4 ${isHighStreak ? 'text-amber-400' : 'text-slate-500'}`} />
            <span className="font-mono font-bold text-xs tabular-nums">
              x{multiplier.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Speed (SPM) with objective marker */}
        <div className="hidden sm:flex flex-col items-center">
          <div className="text-[10px] text-slate-400 font-mono uppercase flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>Vitesse</span>
          </div>
          <div className="text-sm font-bold font-mono text-slate-200 tabular-nums flex items-center gap-1">
            <span>{stats.shortcutsPerMin}</span>
            <span className="text-[10px] text-slate-400 font-normal">SPM</span>
          </div>
        </div>

        {/* Accuracy */}
        <div className="hidden md:flex flex-col items-center">
          <div className="text-[10px] text-slate-400 font-mono uppercase flex items-center gap-1">
            <Target className="w-3 h-3 text-emerald-400" />
            <span>Précision</span>
          </div>
          <div className="text-sm font-bold font-mono text-slate-200 tabular-nums">
            {stats.accuracy}%
          </div>
        </div>

        {/* Timer */}
        {timeRemainingSec !== undefined && (
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-mono tabular-nums text-sm font-bold ${timeRemainingSec <= 5 ? 'bg-rose-950/60 border-rose-500/60 text-rose-300 animate-pulse' : 'bg-slate-900 border-slate-800 text-cyan-300'}`}>
            <Clock className="w-4 h-4" />
            <span>{timeRemainingSec}s</span>
          </div>
        )}
      </div>

      {/* Right: Actions (Leaderboard & Pause) */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenLeaderboard}
          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 transition-colors"
          title="Classement des meilleurs scores"
        >
          <Award className="w-4 h-4" />
        </button>
        <button
          onClick={onPause}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-colors"
          title="Mettre en pause (Échap)"
        >
          <Pause className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Pause</span>
        </button>
      </div>
    </div>
  );
};
