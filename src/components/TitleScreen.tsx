import React from 'react';
import { GameMode, KeyboardLayoutType, SwitchSoundType } from '../types/game';
import { 
  Trophy, 
  Play, 
  Timer, 
  Flame, 
  Sparkles, 
  Layers, 
  Keyboard 
} from 'lucide-react';

interface TitleScreenProps {
  onStartGame: (mode: GameMode) => void;
  onOpenLeaderboard: () => void;
  layout: KeyboardLayoutType;
  onToggleLayout: () => void;
  switchType: SwitchSoundType;
  onSwitchTypeChange: (type: SwitchSoundType) => void;
  selectedMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartGame,
  onOpenLeaderboard,
  layout,
  onToggleLayout,
  switchType,
  onSwitchTypeChange,
  selectedMode,
  onSelectMode,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center p-6 sm:p-10 z-10 overflow-hidden font-sans select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top Bar: Layout & Sound Switcher */}
      <div className="w-full max-w-4xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleLayout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-mono transition-colors"
          >
            <Keyboard className="w-4 h-4 text-cyan-400" />
            <span>Disposition :</span>
            <span className="text-cyan-400 font-bold">{layout}</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-400 font-mono">
            <span>Switch :</span>
            <select
              value={switchType}
              onChange={(e) => onSwitchTypeChange(e.target.value as SwitchSoundType)}
              className="bg-transparent text-slate-200 focus:outline-hidden text-xs font-mono"
            >
              <option value="blue" className="bg-slate-900">Cherry MX Blue</option>
              <option value="red" className="bg-slate-900">Cherry MX Red</option>
              <option value="brown" className="bg-slate-900">Cherry MX Brown</option>
              <option value="retro" className="bg-slate-900">IBM Model M</option>
            </select>
          </div>
        </div>

        <button
          onClick={onOpenLeaderboard}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 font-semibold transition-colors shadow-xs"
        >
          <Trophy className="w-4 h-4" />
          <span>Classement</span>
        </button>
      </div>

      {/* Centerpiece: Bespoke inline SVG Title Lockup with 30-40% negative space */}
      <div className="flex flex-col items-center text-center my-auto max-w-2xl">
        {/* Bespoke inline SVG Logo Title Lockup */}
        <div className="relative mb-4">
          <svg
            className="w-72 sm:w-96 h-28 mx-auto"
            viewBox="0 0 400 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="keyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            {/* Stylized Mechanical Keycap icon on the left */}
            <g transform="translate(18, 15)">
              <rect x="0" y="4" width="70" height="70" rx="14" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
              <rect x="5" y="0" width="60" height="60" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <path d="M 22 18 L 48 18 M 35 18 L 35 44 M 25 44 L 45 44" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Primary Typography Lockup */}
            <text
              x="108"
              y="52"
              fill="url(#neonGlow)"
              fontFamily="JetBrains Mono, monospace"
              fontSize="34"
              fontWeight="800"
              letterSpacing="2"
            >
              KEYMASTER
            </text>
            <text
              x="110"
              y="78"
              fill="#94a3b8"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontSize="13"
              fontWeight="600"
              letterSpacing="3"
            >
              RACCOURCIS & FRAPPE PC
            </text>
          </svg>
        </div>

        <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
          Maîtrisez les raccourcis PC indispensables, pulvérisez vos temps de réaction et devenez un ninja du clavier.
        </p>

        {/* Game Mode Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full mt-6 mb-8 text-left">
          {/* Mode 1: Campagne Progressive */}
          <div
            onClick={() => onSelectMode('campaign')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedMode === 'campaign' ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-cyan-400">
              <Layers className="w-4 h-4" />
              <span className="font-bold text-xs">Campagne</span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              10 niveaux progressifs du débutant au maître.
            </p>
          </div>

          {/* Mode 2: Sprint 60s */}
          <div
            onClick={() => onSelectMode('sprint')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedMode === 'sprint' ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-amber-400">
              <Timer className="w-4 h-4" />
              <span className="font-bold text-xs">Sprint 60s</span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              Défiez le chrono : un maximum de points en 1 minute.
            </p>
          </div>

          {/* Mode 3: Blitz Survie */}
          <div
            onClick={() => onSelectMode('survival')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedMode === 'survival' ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-rose-400">
              <Flame className="w-4 h-4" />
              <span className="font-bold text-xs">Blitz Survie</span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              Chaque seconde compte : 3 vies, vitesse croissante.
            </p>
          </div>

          {/* Mode 4: Dojo Libre */}
          <div
            onClick={() => onSelectMode('dojo')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedMode === 'dojo' ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-purple-400">
              <Sparkles className="w-4 h-4" />
              <span className="font-bold text-xs">Dojo Libre</span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              Explorez et testez n'importe quel raccourci PC.
            </p>
          </div>
        </div>

        {/* Primary Start CTA Button */}
        <button
          onClick={() => onStartGame(selectedMode)}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] cursor-pointer"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>COMMENCER LA SESSION</span>
          <span className="text-xs bg-slate-950/20 px-2 py-0.5 rounded font-mono font-normal">
            Entrée / Espace
          </span>
        </button>
      </div>

      {/* Single Flat Control-Hint Line (Strict adherence to prompt guideline) */}
      <div className="w-full text-center text-xs text-slate-400 font-mono tracking-wide py-2 border-t border-slate-800/60">
        Entrée Jouer · Échap Menu · Tab Changer Disposition · R Recommencer
      </div>
    </div>
  );
};
