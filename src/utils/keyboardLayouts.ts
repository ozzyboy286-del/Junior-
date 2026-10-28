import { FingerHint, KeyboardLayoutType, PlatformStyle } from '../types/game';

export interface KeyDefinition {
  code: string;
  width: number; // width in u (e.g. 1, 1.25, 1.5, 1.75, 2, 2.25, 6.25)
  azertyMain: string;
  azertyShift?: string;
  azertyAltGr?: string;
  qwertyMain: string;
  qwertyShift?: string;
  finger: FingerHint;
  row: number; // 0 = function row, 1 = number row, 2 = top row, 3 = home row, 4 = bottom row, 5 = space row
}

const FINGERS: Record<string, FingerHint> = {
  L_PINKY: { hand: 'left', finger: 'pinky', nameFr: 'Auriculaire gauche' },
  L_RING: { hand: 'left', finger: 'ring', nameFr: 'Annulaire gauche' },
  L_MIDDLE: { hand: 'left', finger: 'middle', nameFr: 'Majeur gauche' },
  L_INDEX: { hand: 'left', finger: 'index', nameFr: 'Index gauche' },
  THUMB: { hand: 'left', finger: 'thumb', nameFr: 'Pouce' },
  R_INDEX: { hand: 'right', finger: 'index', nameFr: 'Index droit' },
  R_MIDDLE: { hand: 'right', finger: 'middle', nameFr: 'Majeur droit' },
  R_RING: { hand: 'right', finger: 'ring', nameFr: 'Annulaire droit' },
  R_PINKY: { hand: 'right', finger: 'pinky', nameFr: 'Auriculaire droit' },
};

export const KEYBOARD_ROWS: KeyDefinition[][] = [
  // Row 0: Function row
  [
    { code: 'Escape', width: 1, azertyMain: 'Échap', qwertyMain: 'Esc', finger: FINGERS.L_PINKY, row: 0 },
    { code: 'F1', width: 1, azertyMain: 'F1', qwertyMain: 'F1', finger: FINGERS.L_PINKY, row: 0 },
    { code: 'F2', width: 1, azertyMain: 'F2', qwertyMain: 'F2', finger: FINGERS.L_RING, row: 0 },
    { code: 'F3', width: 1, azertyMain: 'F3', qwertyMain: 'F3', finger: FINGERS.L_MIDDLE, row: 0 },
    { code: 'F4', width: 1, azertyMain: 'F4', qwertyMain: 'F4', finger: FINGERS.L_INDEX, row: 0 },
    { code: 'F5', width: 1, azertyMain: 'F5', qwertyMain: 'F5', finger: FINGERS.L_INDEX, row: 0 },
    { code: 'F6', width: 1, azertyMain: 'F6', qwertyMain: 'F6', finger: FINGERS.R_INDEX, row: 0 },
    { code: 'F7', width: 1, azertyMain: 'F7', qwertyMain: 'F7', finger: FINGERS.R_INDEX, row: 0 },
    { code: 'F8', width: 1, azertyMain: 'F8', qwertyMain: 'F8', finger: FINGERS.R_MIDDLE, row: 0 },
    { code: 'F9', width: 1, azertyMain: 'F9', qwertyMain: 'F9', finger: FINGERS.R_RING, row: 0 },
    { code: 'F10', width: 1, azertyMain: 'F10', qwertyMain: 'F10', finger: FINGERS.R_PINKY, row: 0 },
    { code: 'F11', width: 1, azertyMain: 'F11', qwertyMain: 'F11', finger: FINGERS.R_PINKY, row: 0 },
    { code: 'F12', width: 1, azertyMain: 'F12', qwertyMain: 'F12', finger: FINGERS.R_PINKY, row: 0 },
  ],

  // Row 1: Number row
  [
    { code: 'Backquote', width: 1, azertyMain: '²', qwertyMain: '`', qwertyShift: '~', finger: FINGERS.L_PINKY, row: 1 },
    { code: 'Digit1', width: 1, azertyMain: '&', azertyShift: '1', qwertyMain: '1', qwertyShift: '!', finger: FINGERS.L_PINKY, row: 1 },
    { code: 'Digit2', width: 1, azertyMain: 'é', azertyShift: '2', azertyAltGr: '~', qwertyMain: '2', qwertyShift: '@', finger: FINGERS.L_RING, row: 1 },
    { code: 'Digit3', width: 1, azertyMain: '"', azertyShift: '3', azertyAltGr: '#', qwertyMain: '3', qwertyShift: '#', finger: FINGERS.L_MIDDLE, row: 1 },
    { code: 'Digit4', width: 1, azertyMain: "'", azertyShift: '4', azertyAltGr: '{', qwertyMain: '4', qwertyShift: '$', finger: FINGERS.L_INDEX, row: 1 },
    { code: 'Digit5', width: 1, azertyMain: '(', azertyShift: '5', azertyAltGr: '[', qwertyMain: '5', qwertyShift: '%', finger: FINGERS.L_INDEX, row: 1 },
    { code: 'Digit6', width: 1, azertyMain: '-', azertyShift: '6', azertyAltGr: '|', qwertyMain: '6', qwertyShift: '^', finger: FINGERS.R_INDEX, row: 1 },
    { code: 'Digit7', width: 1, azertyMain: 'è', azertyShift: '7', azertyAltGr: '`', qwertyMain: '7', qwertyShift: '&', finger: FINGERS.R_INDEX, row: 1 },
    { code: 'Digit8', width: 1, azertyMain: '_', azertyShift: '8', azertyAltGr: '\\', qwertyMain: '8', qwertyShift: '*', finger: FINGERS.R_MIDDLE, row: 1 },
    { code: 'Digit9', width: 1, azertyMain: 'ç', azertyShift: '9', azertyAltGr: '^', qwertyMain: '9', qwertyShift: '(', finger: FINGERS.R_RING, row: 1 },
    { code: 'Digit0', width: 1, azertyMain: 'à', azertyShift: '0', azertyAltGr: '@', qwertyMain: '0', qwertyShift: ')', finger: FINGERS.R_PINKY, row: 1 },
    { code: 'Minus', width: 1, azertyMain: ')', azertyShift: '°', azertyAltGr: ']', qwertyMain: '-', qwertyShift: '_', finger: FINGERS.R_PINKY, row: 1 },
    { code: 'Equal', width: 1, azertyMain: '=', azertyShift: '+', azertyAltGr: '}', qwertyMain: '=', qwertyShift: '+', finger: FINGERS.R_PINKY, row: 1 },
    { code: 'Backspace', width: 2, azertyMain: '⌫ Retour', qwertyMain: '⌫ Back', finger: FINGERS.R_PINKY, row: 1 },
  ],

  // Row 2: Top row
  [
    { code: 'Tab', width: 1.5, azertyMain: '⇥ Tab', qwertyMain: '⇥ Tab', finger: FINGERS.L_PINKY, row: 2 },
    { code: 'KeyQ', width: 1, azertyMain: 'A', qwertyMain: 'Q', finger: FINGERS.L_PINKY, row: 2 },
    { code: 'KeyW', width: 1, azertyMain: 'Z', qwertyMain: 'W', finger: FINGERS.L_RING, row: 2 },
    { code: 'KeyE', width: 1, azertyMain: 'E', azertyAltGr: '€', qwertyMain: 'E', finger: FINGERS.L_MIDDLE, row: 2 },
    { code: 'KeyR', width: 1, azertyMain: 'R', qwertyMain: 'R', finger: FINGERS.L_INDEX, row: 2 },
    { code: 'KeyT', width: 1, azertyMain: 'T', qwertyMain: 'T', finger: FINGERS.L_INDEX, row: 2 },
    { code: 'KeyY', width: 1, azertyMain: 'Y', qwertyMain: 'Y', finger: FINGERS.R_INDEX, row: 2 },
    { code: 'KeyU', width: 1, azertyMain: 'U', qwertyMain: 'U', finger: FINGERS.R_INDEX, row: 2 },
    { code: 'KeyI', width: 1, azertyMain: 'I', qwertyMain: 'I', finger: FINGERS.R_MIDDLE, row: 2 },
    { code: 'KeyO', width: 1, azertyMain: 'O', qwertyMain: 'O', finger: FINGERS.R_RING, row: 2 },
    { code: 'KeyP', width: 1, azertyMain: 'P', qwertyMain: 'P', finger: FINGERS.R_PINKY, row: 2 },
    { code: 'BracketLeft', width: 1, azertyMain: '^', azertyShift: '¨', qwertyMain: '[', qwertyShift: '{', finger: FINGERS.R_PINKY, row: 2 },
    { code: 'BracketRight', width: 1, azertyMain: '$', azertyShift: '£', azertyAltGr: '¤', qwertyMain: ']', qwertyShift: '}', finger: FINGERS.R_PINKY, row: 2 },
    { code: 'Backslash', width: 1.5, azertyMain: '*', azertyShift: 'µ', qwertyMain: '\\', qwertyShift: '|', finger: FINGERS.R_PINKY, row: 2 },
  ],

  // Row 3: Home row
  [
    { code: 'CapsLock', width: 1.75, azertyMain: '⇪ Verr Maj', qwertyMain: '⇪ Caps', finger: FINGERS.L_PINKY, row: 3 },
    { code: 'KeyA', width: 1, azertyMain: 'Q', qwertyMain: 'A', finger: FINGERS.L_PINKY, row: 3 },
    { code: 'KeyS', width: 1, azertyMain: 'S', qwertyMain: 'S', finger: FINGERS.L_RING, row: 3 },
    { code: 'KeyD', width: 1, azertyMain: 'D', qwertyMain: 'D', finger: FINGERS.L_MIDDLE, row: 3 },
    { code: 'KeyF', width: 1, azertyMain: 'F', qwertyMain: 'F', finger: FINGERS.L_INDEX, row: 3 }, // tactile bump
    { code: 'KeyG', width: 1, azertyMain: 'G', qwertyMain: 'G', finger: FINGERS.L_INDEX, row: 3 },
    { code: 'KeyH', width: 1, azertyMain: 'H', qwertyMain: 'H', finger: FINGERS.R_INDEX, row: 3 },
    { code: 'KeyJ', width: 1, azertyMain: 'J', qwertyMain: 'J', finger: FINGERS.R_INDEX, row: 3 }, // tactile bump
    { code: 'KeyK', width: 1, azertyMain: 'K', qwertyMain: 'K', finger: FINGERS.R_MIDDLE, row: 3 },
    { code: 'KeyL', width: 1, azertyMain: 'L', qwertyMain: 'L', finger: FINGERS.R_RING, row: 3 },
    { code: 'Semicolon', width: 1, azertyMain: 'M', qwertyMain: ';', qwertyShift: ':', finger: FINGERS.R_PINKY, row: 3 },
    { code: 'Quote', width: 1, azertyMain: 'ù', azertyShift: '%', qwertyMain: "'", qwertyShift: '"', finger: FINGERS.R_PINKY, row: 3 },
    { code: 'Enter', width: 2.25, azertyMain: '↵ Entrée', qwertyMain: '↵ Enter', finger: FINGERS.R_PINKY, row: 3 },
  ],

  // Row 4: Bottom row
  [
    { code: 'ShiftLeft', width: 2.25, azertyMain: '⇧ Maj', qwertyMain: '⇧ Shift', finger: FINGERS.L_PINKY, row: 4 },
    { code: 'KeyZ', width: 1, azertyMain: 'W', qwertyMain: 'Z', finger: FINGERS.L_RING, row: 4 },
    { code: 'KeyX', width: 1, azertyMain: 'X', qwertyMain: 'X', finger: FINGERS.L_MIDDLE, row: 4 },
    { code: 'KeyC', width: 1, azertyMain: 'C', qwertyMain: 'C', finger: FINGERS.L_MIDDLE, row: 4 },
    { code: 'KeyV', width: 1, azertyMain: 'V', qwertyMain: 'V', finger: FINGERS.L_INDEX, row: 4 },
    { code: 'KeyB', width: 1, azertyMain: 'B', qwertyMain: 'B', finger: FINGERS.L_INDEX, row: 4 },
    { code: 'KeyN', width: 1, azertyMain: 'N', qwertyMain: 'N', finger: FINGERS.R_INDEX, row: 4 },
    { code: 'KeyM', width: 1, azertyMain: ',', azertyShift: '?', qwertyMain: 'M', finger: FINGERS.R_INDEX, row: 4 },
    { code: 'Comma', width: 1, azertyMain: ';', azertyShift: '.', qwertyMain: ',', qwertyShift: '<', finger: FINGERS.R_MIDDLE, row: 4 },
    { code: 'Period', width: 1, azertyMain: ':', azertyShift: '/', qwertyMain: '.', qwertyShift: '>', finger: FINGERS.R_RING, row: 4 },
    { code: 'Slash', width: 1, azertyMain: '!', azertyShift: '§', qwertyMain: '/', qwertyShift: '?', finger: FINGERS.R_PINKY, row: 4 },
    { code: 'ShiftRight', width: 2.75, azertyMain: '⇧ Maj', qwertyMain: '⇧ Shift', finger: FINGERS.R_PINKY, row: 4 },
  ],

  // Row 5: Space row & modifiers
  [
    { code: 'ControlLeft', width: 1.5, azertyMain: 'Ctrl', qwertyMain: 'Ctrl', finger: FINGERS.L_PINKY, row: 5 },
    { code: 'MetaLeft', width: 1.25, azertyMain: '⊞ Win', qwertyMain: '⊞ Win', finger: FINGERS.THUMB, row: 5 },
    { code: 'AltLeft', width: 1.25, azertyMain: 'Alt', qwertyMain: 'Alt', finger: FINGERS.THUMB, row: 5 },
    { code: 'Space', width: 6.25, azertyMain: 'Espace', qwertyMain: 'Space', finger: FINGERS.THUMB, row: 5 },
    { code: 'AltRight', width: 1.25, azertyMain: 'Alt Gr', qwertyMain: 'Alt', finger: FINGERS.THUMB, row: 5 },
    { code: 'MetaRight', width: 1.25, azertyMain: '⊞ Win', qwertyMain: '⊞ Win', finger: FINGERS.THUMB, row: 5 },
    { code: 'ContextMenu', width: 1.25, azertyMain: '☰ Menu', qwertyMain: '☰ Menu', finger: FINGERS.R_PINKY, row: 5 },
    { code: 'ControlRight', width: 1.5, azertyMain: 'Ctrl', qwertyMain: 'Ctrl', finger: FINGERS.R_PINKY, row: 5 },
  ]
];

// Navigation cluster (Arrows, Delete, Home, End)
export const NAV_KEYS: KeyDefinition[] = [
  { code: 'ArrowUp', width: 1, azertyMain: '↑', qwertyMain: '↑', finger: FINGERS.R_MIDDLE, row: 4 },
  { code: 'ArrowLeft', width: 1, azertyMain: '←', qwertyMain: '←', finger: FINGERS.R_INDEX, row: 5 },
  { code: 'ArrowDown', width: 1, azertyMain: '↓', qwertyMain: '↓', finger: FINGERS.R_MIDDLE, row: 5 },
  { code: 'ArrowRight', width: 1, azertyMain: '→', qwertyMain: '→', finger: FINGERS.R_RING, row: 5 },
  { code: 'Delete', width: 1, azertyMain: 'Suppr', qwertyMain: 'Del', finger: FINGERS.R_PINKY, row: 2 },
  { code: 'Home', width: 1, azertyMain: 'Début', qwertyMain: 'Home', finger: FINGERS.R_INDEX, row: 2 },
  { code: 'End', width: 1, azertyMain: 'Fin', qwertyMain: 'End', finger: FINGERS.R_RING, row: 2 },
];

// Helper to determine if a key is a modifier
export function isModifierKey(codeOrKey: string): boolean {
  const normalized = codeOrKey.toLowerCase();
  return (
    normalized.includes('ctrl') ||
    normalized.includes('control') ||
    normalized.includes('alt') ||
    normalized.includes('shift') ||
    normalized.includes('meta') ||
    normalized.includes('win') ||
    normalized.includes('cmd')
  );
}

// Convert event to game key token
export function normalizeKeyboardEvent(e: KeyboardEvent, layout: KeyboardLayoutType): {
  modifiers: { ctrl: boolean; alt: boolean; shift: boolean; meta: boolean };
  mainKey: string;
  code: string;
} {
  const ctrl = e.ctrlKey || e.key === 'Control';
  const alt = e.altKey || e.key === 'Alt';
  const shift = e.shiftKey || e.key === 'Shift';
  const meta = e.metaKey || e.key === 'Meta';

  let mainKey = e.key.toLowerCase();
  
  // Specific key normalization for arrows and special keys
  if (e.code === 'Space') mainKey = 'space';
  else if (e.code === 'Backspace') mainKey = 'backspace';
  else if (e.code === 'Enter') mainKey = 'enter';
  else if (e.code === 'Escape') mainKey = 'escape';
  else if (e.code === 'ArrowUp') mainKey = 'arrowup';
  else if (e.code === 'ArrowDown') mainKey = 'arrowdown';
  else if (e.code === 'ArrowLeft') mainKey = 'arrowleft';
  else if (e.code === 'ArrowRight') mainKey = 'arrowright';
  else if (e.code === 'Delete') mainKey = 'delete';
  else if (e.code === 'Home') mainKey = 'home';
  else if (e.code === 'End') mainKey = 'end';
  else if (e.code.startsWith('Key')) {
    // If user is on AZERTY and layout is AZERTY, e.key might already be the localized letter
    // If not, use code mapping
    if (layout === 'AZERTY') {
      if (e.code === 'KeyQ') mainKey = 'a';
      else if (e.code === 'KeyA') mainKey = 'q';
      else if (e.code === 'KeyW') mainKey = 'z';
      else if (e.code === 'KeyZ') mainKey = 'w';
      else if (e.code === 'Semicolon') mainKey = 'm';
      else {
        mainKey = e.code.replace('Key', '').toLowerCase();
      }
    } else {
      mainKey = e.code.replace('Key', '').toLowerCase();
    }
  }

  return {
    modifiers: { ctrl, alt, shift, meta },
    mainKey,
    code: e.code,
  };
}

// Checks if current key press matches the challenge keys
export function matchesChallenge(
  pressedCodes: Set<string>,
  pressedKeys: Set<string>,
  challengeKeys: string[],
  challengeCodes: string[],
  layout: KeyboardLayoutType,
  e?: KeyboardEvent
): boolean {
  // 1. If single key (e.g. typing home row)
  if (challengeKeys.length === 1 && !isModifierKey(challengeKeys[0])) {
    const targetKey = challengeKeys[0].toLowerCase();
    const targetCode = challengeCodes[0];
    if (e) {
      const normalized = normalizeKeyboardEvent(e, layout);
      if (normalized.mainKey === targetKey) return true;
      if (targetCode && normalized.code === targetCode) return true;
    }
    return pressedKeys.has(targetKey) || (targetCode ? pressedCodes.has(targetCode) : false);
  }

  // 2. Shortcut combo: must have all required modifiers + main key
  const reqCtrl = challengeKeys.some(k => k.toLowerCase() === 'control' || k.toLowerCase() === 'ctrl');
  const reqAlt = challengeKeys.some(k => k.toLowerCase() === 'alt');
  const reqShift = challengeKeys.some(k => k.toLowerCase() === 'shift');
  const reqMeta = challengeKeys.some(k => k.toLowerCase() === 'meta' || k.toLowerCase() === 'win');

  if (e) {
    if (reqCtrl && !e.ctrlKey) return false;
    if (reqAlt && !e.altKey) return false;
    if (reqShift && !e.shiftKey) return false;
    if (reqMeta && !e.metaKey) return false;

    // Find the non-modifier target key
    const targetNonMods = challengeKeys.filter(k => !isModifierKey(k));
    if (targetNonMods.length === 0) {
      // It's a pure modifier combo like Alt+Tab or Win
      return true;
    }

    const targetKey = targetNonMods[0].toLowerCase();
    const normalized = normalizeKeyboardEvent(e, layout);

    if (targetKey === 'tab' && e.code === 'Tab') return true;
    if (targetKey === 'f4' && e.code === 'F4') return true;
    if (targetKey === 'd' && (normalized.mainKey === 'd' || e.code === 'KeyD')) return true;
    if (targetKey === 'e' && (normalized.mainKey === 'e' || e.code === 'KeyE')) return true;
    if (targetKey === 'l' && (normalized.mainKey === 'l' || e.code === 'KeyL')) return true;
    if (targetKey === 's' && (normalized.mainKey === 's' || e.code === 'KeyS')) return true;
    if (targetKey === 't' && (normalized.mainKey === 't' || e.code === 'KeyT')) return true;
    if (targetKey === 'w' && (normalized.mainKey === 'w' || (layout === 'AZERTY' ? e.code === 'KeyZ' : e.code === 'KeyW'))) return true;
    if (targetKey === 'arrowleft' && e.code === 'ArrowLeft') return true;
    if (targetKey === 'arrowright' && e.code === 'ArrowRight') return true;
    if (targetKey === 'backspace' && e.code === 'Backspace') return true;
    if (targetKey === 'delete' && e.code === 'Delete') return true;

    return normalized.mainKey === targetKey;
  }

  return false;
}

// Finger color classes for visual guide
export function getFingerColor(finger: FingerHint['finger'], hand: FingerHint['hand']): string {
  if (hand === 'left') {
    switch (finger) {
      case 'pinky': return 'border-pink-500/40 text-pink-300';
      case 'ring': return 'border-amber-500/40 text-amber-300';
      case 'middle': return 'border-emerald-500/40 text-emerald-300';
      case 'index': return 'border-cyan-500/40 text-cyan-300';
      case 'thumb': return 'border-purple-500/40 text-purple-300';
    }
  } else {
    switch (finger) {
      case 'thumb': return 'border-purple-500/40 text-purple-300';
      case 'index': return 'border-sky-500/40 text-sky-300';
      case 'middle': return 'border-emerald-500/40 text-emerald-300';
      case 'ring': return 'border-amber-500/40 text-amber-300';
      case 'pinky': return 'border-rose-500/40 text-rose-300';
    }
  }
}

export function getFingerBg(finger: FingerHint['finger'], hand: FingerHint['hand']): string {
  if (hand === 'left') {
    switch (finger) {
      case 'pinky': return 'bg-pink-500/10 text-pink-300';
      case 'ring': return 'bg-amber-500/10 text-amber-300';
      case 'middle': return 'bg-emerald-500/10 text-emerald-300';
      case 'index': return 'bg-cyan-500/10 text-cyan-300';
      case 'thumb': return 'bg-purple-500/10 text-purple-300';
    }
  } else {
    switch (finger) {
      case 'thumb': return 'bg-purple-500/10 text-purple-300';
      case 'index': return 'bg-sky-500/10 text-sky-300';
      case 'middle': return 'bg-emerald-500/10 text-emerald-300';
      case 'ring': return 'bg-amber-500/10 text-amber-300';
      case 'pinky': return 'bg-rose-500/10 text-rose-300';
    }
  }
}
