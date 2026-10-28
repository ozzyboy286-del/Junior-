export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  mode: 'campaign' | 'sprint' | 'survival';
  levelId?: number;
  levelTitle?: string;
  speed: number; // SPM or WPM
  accuracy: number;
  stars?: number;
  date: string;
}

const STORAGE_KEY = 'keymaster_leaderboard_v1';
const USERNAME_KEY = 'keymaster_player_name';

const DEFAULT_SCORES: LeaderboardEntry[] = [
  {
    id: 'seed-1',
    playerName: 'NeoTyper',
    score: 18500,
    mode: 'sprint',
    speed: 58,
    accuracy: 98,
    date: '28/10/2026',
  },
  {
    id: 'seed-2',
    playerName: 'VimSorcerer',
    score: 16200,
    mode: 'sprint',
    speed: 52,
    accuracy: 96,
    date: '28/10/2026',
  },
  {
    id: 'seed-3',
    playerName: 'CtrlAltElite',
    score: 14800,
    mode: 'sprint',
    speed: 46,
    accuracy: 94,
    date: '27/10/2026',
  },
  {
    id: 'seed-4',
    playerName: 'CyberDactylo',
    score: 12900,
    mode: 'campaign',
    levelId: 12,
    levelTitle: 'Grand Maître PC',
    speed: 42,
    accuracy: 95,
    stars: 3,
    date: '28/10/2026',
  },
  {
    id: 'seed-5',
    playerName: 'TabNinja',
    score: 11400,
    mode: 'survival',
    speed: 39,
    accuracy: 91,
    date: '26/10/2026',
  },
  {
    id: 'seed-6',
    playerName: 'AzertyHero',
    score: 9800,
    mode: 'campaign',
    levelId: 8,
    levelTitle: 'Multitâche Windows',
    speed: 35,
    accuracy: 93,
    stars: 3,
    date: '25/10/2026',
  },
];

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SCORES));
      return DEFAULT_SCORES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SCORES;
  }
}

export function saveLeaderboardEntry(entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry {
  const all = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: 'entry-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    date: new Date().toLocaleDateString('fr-FR'),
  };

  const updated = [...all, newEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 50); // Keep top 50

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save leaderboard', e);
  }

  return newEntry;
}

export function getStoredPlayerName(): string {
  try {
    return localStorage.getItem(USERNAME_KEY) || 'Pilote_PC';
  } catch {
    return 'Pilote_PC';
  }
}

export function setStoredPlayerName(name: string): void {
  try {
    localStorage.setItem(USERNAME_KEY, name.trim().slice(0, 16) || 'Pilote_PC');
  } catch (e) {
    console.error('Failed to set player name', e);
  }
}

export function calculateScore(
  baseScore: number,
  reactionTimeMs: number,
  combo: number,
  isCorrect: boolean
): { delta: number; speedBonus: number; isBlitzFast: boolean } {
  if (!isCorrect) {
    return { delta: -25, speedBonus: 0, isBlitzFast: false };
  }

  // Base hit points
  let points = 100;
  let speedBonus = 0;
  let isBlitzFast = false;

  // Speed objective bonus
  if (reactionTimeMs < 600) {
    speedBonus = 150; // Ultra reflex
    isBlitzFast = true;
  } else if (reactionTimeMs < 1100) {
    speedBonus = 80; // Fast reflex
  } else if (reactionTimeMs < 1800) {
    speedBonus = 35; // Standard reflex
  }

  // Combo multiplier (from 1x up to 5x)
  const multiplier = Math.min(1 + Math.floor(combo / 3) * 0.5, 4.0);
  const totalGain = Math.round((points + speedBonus) * multiplier);

  return { delta: totalGain, speedBonus, isBlitzFast };
}
