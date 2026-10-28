import React from 'react';
import { GameLevel } from '../types/game';
import { GAME_LEVELS } from '../utils/levels';
import { Star, Lock, Play, X } from 'lucide-react';

interface LevelSelectModalProps {
  isOpen: boolean;
  unlockedLevel: number;
  levelStars: Record<number, number>;
  onSelectLevel: (levelId: number) => void;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  isOpen,
  unlockedLevel,
  levelStars,
  onSelectLevel,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-100">
              Progression de la Campagne
            </h2>
            <p className="text-xs text-slate-400">
              Complétez chaque palier pour débloquer le titre de Grand Maître PC
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto flex-1">
          {GAME_LEVELS.map((level) => {
            const isUnlocked = level.id <= unlockedLevel;
            const stars = levelStars[level.id] || 0;

            return (
              <div
                key={level.id}
                onClick={() => {
                  if (isUnlocked) onSelectLevel(level.id);
                }}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all select-none ${isUnlocked ? 'bg-slate-950/80 border-slate-800 hover:border-cyan-500/60 hover:bg-slate-850 cursor-pointer' : 'bg-slate-950/40 border-slate-900 opacity-60 cursor-not-allowed'}`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-cyan-400 font-semibold">
                      Niveau {level.id} · {level.category}
                    </span>
                    {isUnlocked ? (
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${s <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
                          />
                        ))}
                      </div>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-100">
                    {level.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {level.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{level.challenges.length} défis clés</span>
                  {isUnlocked && (
                    <span className="text-cyan-400 flex items-center gap-1 font-semibold">
                      Jouer <Play className="w-3 h-3 fill-cyan-400" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
