import React from 'react';
import { 
  KeyboardLayoutType, 
  SwitchSoundType, 
  FingerHint 
} from '../types/game';
import { 
  KEYBOARD_ROWS, 
  NAV_KEYS, 
  KeyDefinition, 
  getFingerColor, 
  getFingerBg 
} from '../utils/keyboardLayouts';
import { Volume2, VolumeX } from 'lucide-react';

interface VirtualKeyboardProps {
  layout: KeyboardLayoutType;
  switchType: SwitchSoundType;
  isMuted: boolean;
  pressedCodes: Set<string>;
  targetCodes: Set<string>;
  targetKeys: string[];
  onSwitchTypeChange: (type: SwitchSoundType) => void;
  onToggleMute: () => void;
  onToggleLayout: () => void;
  showFingerGuide?: boolean;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  layout,
  switchType,
  isMuted,
  pressedCodes,
  targetCodes,
  targetKeys,
  onSwitchTypeChange,
  onToggleMute,
  onToggleLayout,
  showFingerGuide = true,
}) => {
  // Helper to determine active finger hint
  const activeTargetDef = React.useMemo(() => {
    for (const row of KEYBOARD_ROWS) {
      for (const k of row) {
        const isTargetCode = targetCodes.has(k.code);
        const mainLabel = layout === 'AZERTY' ? k.azertyMain : k.qwertyMain;
        const isTargetKey = targetKeys.some(
          (tk) => tk.toLowerCase() === mainLabel.toLowerCase() ||
                 (tk.toLowerCase() === 'control' && k.code.includes('Control')) ||
                 (tk.toLowerCase() === 'alt' && k.code.includes('Alt')) ||
                 (tk.toLowerCase() === 'shift' && k.code.includes('Shift')) ||
                 (tk.toLowerCase() === 'meta' && k.code.includes('Meta')) ||
                 (tk.toLowerCase() === 'space' && k.code === 'Space')
        );
        if (isTargetCode || isTargetKey) {
          return { key: mainLabel, finger: k.finger };
        }
      }
    }
    return null;
  }, [targetCodes, targetKeys, layout]);

  const renderKey = (keyDef: KeyDefinition) => {
    const isPressed = pressedCodes.has(keyDef.code);
    
    // Check if this key is a target
    const isTargetCode = targetCodes.has(keyDef.code);
    const mainLabel = layout === 'AZERTY' ? keyDef.azertyMain : keyDef.qwertyMain;
    const isTargetKey = targetKeys.some(
      (k) => k.toLowerCase() === mainLabel.toLowerCase() ||
             (k.toLowerCase() === 'control' && keyDef.code.includes('Control')) ||
             (k.toLowerCase() === 'alt' && keyDef.code.includes('Alt')) ||
             (k.toLowerCase() === 'shift' && keyDef.code.includes('Shift')) ||
             (k.toLowerCase() === 'meta' && keyDef.code.includes('Meta')) ||
             (k.toLowerCase() === 'space' && keyDef.code === 'Space') ||
             (k.toLowerCase() === 'backspace' && keyDef.code === 'Backspace') ||
             (k.toLowerCase() === 'enter' && keyDef.code === 'Enter') ||
             (k.toLowerCase() === 'escape' && keyDef.code === 'Escape') ||
             (k.toLowerCase() === 'arrowright' && keyDef.code === 'ArrowRight') ||
             (k.toLowerCase() === 'arrowleft' && keyDef.code === 'ArrowLeft') ||
             (k.toLowerCase() === 'arrowup' && keyDef.code === 'ArrowUp') ||
             (k.toLowerCase() === 'arrowdown' && keyDef.code === 'ArrowDown')
    );

    const isTarget = isTargetCode || isTargetKey;

    const shiftLabel = layout === 'AZERTY' ? keyDef.azertyShift : keyDef.qwertyShift;
    const altGrLabel = layout === 'AZERTY' ? keyDef.azertyAltGr : undefined;

    // Width classes based on standard key units
    let widthStyle = 'min-w-[34px] sm:min-w-[42px] flex-1';
    if (keyDef.width === 1.25) widthStyle = 'min-w-[44px] sm:min-w-[54px] flex-[1.25]';
    if (keyDef.width === 1.5) widthStyle = 'min-w-[50px] sm:min-w-[64px] flex-[1.5]';
    if (keyDef.width === 1.75) widthStyle = 'min-w-[58px] sm:min-w-[74px] flex-[1.75]';
    if (keyDef.width === 2) widthStyle = 'min-w-[68px] sm:min-w-[84px] flex-[2]';
    if (keyDef.width === 2.25) widthStyle = 'min-w-[76px] sm:min-w-[96px] flex-[2.25]';
    if (keyDef.width === 2.75) widthStyle = 'min-w-[88px] sm:min-w-[114px] flex-[2.75]';
    if (keyDef.width === 6.25) widthStyle = 'min-w-[180px] sm:min-w-[280px] flex-[6.25]';

    // Visual styles for key states
    let keycapClass = 'bg-slate-900 border-slate-700/80 text-slate-200';
    if (isTarget) {
      keycapClass = 'bg-cyan-500 text-slate-950 font-bold border-cyan-300 ring-2 ring-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse';
    } else if (isPressed) {
      keycapClass = 'bg-emerald-500 text-slate-950 font-bold border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.7)] translate-y-1';
    }

    const hasHomingBump = keyDef.code === 'KeyF' || keyDef.code === 'KeyJ';

    return (
      <div
        key={keyDef.code}
        className={`relative h-10 sm:h-12 rounded-md border flex flex-col items-center justify-center p-1 select-none transition-all duration-75 text-xs font-mono keycap-3d ${widthStyle} ${keycapClass} ${isPressed ? 'key-pressed' : ''}`}
        title={`${mainLabel} (${keyDef.finger.nameFr})`}
      >
        {/* Secondary shift or altgr notations */}
        {(shiftLabel || altGrLabel) && (
          <div className="absolute top-0.5 w-full px-1 flex justify-between text-[9px] opacity-75 font-sans leading-none pointer-events-none">
            <span>{shiftLabel}</span>
            <span>{altGrLabel}</span>
          </div>
        )}

        {/* Main Key Legend */}
        <span className={`leading-none ${isTarget || isPressed ? 'font-bold' : 'font-medium'} text-[11px] sm:text-xs`}>
          {mainLabel}
        </span>

        {/* Tactile Homing Bump for F and J */}
        {hasHomingBump && (
          <div className="absolute bottom-1 w-2.5 h-0.5 rounded-full bg-slate-400/60 pointer-events-none" />
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-2 font-sans select-none">
      {/* Keyboard Controls Bar */}
      <div className="flex items-center justify-between text-xs px-2 py-1 bg-slate-900/60 rounded-lg border border-slate-800/80">
        <div className="flex items-center gap-3">
          {/* Layout switcher */}
          <button
            onClick={onToggleLayout}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 font-mono font-medium transition-colors border border-slate-700"
            title="Changer la disposition du clavier (AZERTY Français / QWERTY US)"
          >
            <span>Disposition :</span>
            <span className="text-cyan-400 font-bold">{layout}</span>
          </button>

          {/* Mechanical Switch Type */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Switch :</span>
            <select
              value={switchType}
              onChange={(e) => onSwitchTypeChange(e.target.value as SwitchSoundType)}
              className="bg-slate-800 text-slate-200 px-2 py-1 rounded border border-slate-700 font-mono text-xs focus:outline-hidden focus:border-cyan-500"
            >
              <option value="blue">Cherry MX Blue (Clic net)</option>
              <option value="red">Cherry MX Red (Linéaire doux)</option>
              <option value="brown">Cherry MX Brown (Tactile)</option>
              <option value="retro">IBM Model M (Rétro sonore)</option>
              <option value="mute">Silencieux (Mute)</option>
            </select>
          </div>
        </div>

        {/* Mute button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMute}
            className={`p-1.5 rounded transition-colors ${isMuted ? 'text-rose-400 bg-rose-950/40 border border-rose-800/60' : 'text-slate-300 hover:text-white bg-slate-800 border border-slate-700'}`}
            title={isMuted ? 'Activer le son mécanique' : 'Couper le son'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Keyboard Chassis */}
      <div className="p-3 sm:p-4 rounded-2xl bg-slate-950 border-2 border-slate-800/90 shadow-[0_15px_30px_rgba(0,0,0,0.7)] flex flex-col gap-1.5 overflow-x-auto">
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={`row-${rowIdx}`} className="flex gap-1 sm:gap-1.5 w-full justify-between">
            {row.map(renderKey)}
          </div>
        ))}

        {/* Navigation & Arrow Cluster Sub-Row */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 mt-1">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            {showFingerGuide && activeTargetDef && (
              <div className="flex items-center gap-2 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                <span className="text-slate-400">Doigt recommandé :</span>
                <span className="font-semibold text-cyan-300">
                  {activeTargetDef.finger.nameFr}
                </span>
              </div>
            )}
          </div>

          {/* Quick Arrow Cluster Display */}
          <div className="flex items-center gap-1">
            {NAV_KEYS.map(renderKey)}
          </div>
        </div>
      </div>
    </div>
  );
};
