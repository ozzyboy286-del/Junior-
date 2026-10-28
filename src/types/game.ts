export type KeyboardLayoutType = 'AZERTY' | 'QWERTY';
export type PlatformStyle = 'windows' | 'mac';
export type SwitchSoundType = 'blue' | 'red' | 'brown' | 'retro' | 'mute';

export type GameMode = 'campaign' | 'sprint' | 'survival' | 'dojo';

export type GameState = 
  | 'TITLE_MENU' 
  | 'LEVEL_SELECT' 
  | 'PLAYING' 
  | 'PAUSED' 
  | 'VICTORY' 
  | 'GAME_OVER';

export interface FingerHint {
  hand: 'left' | 'right';
  finger: 'pinky' | 'ring' | 'middle' | 'index' | 'thumb';
  nameFr: string;
}

export interface ShortcutChallenge {
  id: string;
  title: string;
  category: 'touch_typing' | 'office' | 'navigation' | 'system' | 'browser' | 'pro';
  description: string;
  explanation: string;
  keys: string[]; // e.g. ['Control', 'c'] or ['Control', 'Shift', 't'] or ['a']
  codes: string[]; // e.g. ['ControlLeft', 'KeyC']
  keyLabels: {
    AZERTY: string[];
    QWERTY: string[];
  };
  fingerHints?: {
    key: string;
    finger: FingerHint;
  }[];
  simulationType: 
    | 'copy_paste' 
    | 'undo_redo' 
    | 'save_doc' 
    | 'search_box' 
    | 'browser_tab' 
    | 'window_min' 
    | 'delete_word' 
    | 'word_jump' 
    | 'select_all' 
    | 'screenshot' 
    | 'generic';
  mockInitialContent?: string;
  timeLimitSec?: number;
}

export interface GameLevel {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  targetStars: [number, number, number]; // threshold score or time for 1, 2, 3 stars
  challenges: ShortcutChallenge[];
  recommendedWpmOrSpm: number;
}

export interface GameStats {
  score: number;
  combo: number;
  maxCombo: number;
  correctHits: number;
  errorHits: number;
  accuracy: number;
  elapsedMs: number;
  shortcutsPerMin: number;
  averageReactionMs: number;
  starsEarned: number;
}

export interface UserProgress {
  unlockedLevel: number;
  levelStars: Record<number, number>; // levelId -> stars (1-3)
  highScores: {
    campaign: Record<number, number>;
    sprint60: number;
    survivalWave: number;
  };
  totalShortcutsMastered: number;
  preferredLayout: KeyboardLayoutType;
  preferredPlatform: PlatformStyle;
  preferredSwitch: SwitchSoundType;
  soundVolume: number; // 0 to 1
}
