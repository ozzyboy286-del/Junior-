import React from 'react';
import { Play, RotateCcw, Home, Award } from 'lucide-react';

interface PauseModalProps {
  isOpen: boolean;
  onResume: () => void;
  onRestart: () => void;
  onMenu: () => void;
  onOpenLeaderboard: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  isOpen,
  onResume,
  onRestart,
  onMenu,
  onOpenLeaderboard,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans select-none">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center">
        <h3 className="text-xl font-bold text-slate-100 mb-1">
          Jeu en Pause
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Prenez une respiration, détendez vos poignets et reprenez la session.
        </p>

        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={onResume}
            className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-cyan-500/20"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Reprendre (Échap / Espace)</span>
          </button>

          <button
            onClick={onRestart}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Recommencer le Niveau (R)</span>
          </button>

          <button
            onClick={onOpenLeaderboard}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
          >
            <Award className="w-4 h-4" />
            <span>Consulter le Classement</span>
          </button>

          <button
            onClick={onMenu}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-slate-800"
          >
            <Home className="w-4 h-4" />
            <span>Quitter vers le Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
