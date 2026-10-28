import React, { useState, useEffect } from 'react';
import { KeyboardLayoutType, SwitchSoundType } from '../types/game';
import { VirtualKeyboard } from './VirtualKeyboard';
import { soundManager } from '../utils/audio';
import { BookOpen, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface DojoModeProps {
  layout: KeyboardLayoutType;
  switchType: SwitchSoundType;
  isMuted: boolean;
  onSwitchTypeChange: (type: SwitchSoundType) => void;
  onToggleMute: () => void;
  onToggleLayout: () => void;
  onBackToMenu: () => void;
}

interface KnownShortcut {
  combo: string;
  title: string;
  description: string;
  category: string;
}

const KNOWN_SHORTCUTS: Record<string, KnownShortcut> = {
  'ctrl+c': { combo: 'Ctrl + C', title: 'Copier', description: 'Copie la sélection dans le presse-papiers sans l’altérer.', category: 'Bureautique' },
  'ctrl+v': { combo: 'Ctrl + V', title: 'Coller', description: 'Insère le contenu copié ou coupé à l’emplacement actuel du curseur.', category: 'Bureautique' },
  'ctrl+x': { combo: 'Ctrl + X', title: 'Couper', description: 'Copie et supprime simultanément l’élément sélectionné.', category: 'Bureautique' },
  'ctrl+z': { combo: 'Ctrl + Z', title: 'Annuler', description: 'Annule la dernière action effectuée.', category: 'Bureautique' },
  'ctrl+y': { combo: 'Ctrl + Y', title: 'Rétablir', description: 'Réapplique l’action que vous venez d’annuler avec Ctrl+Z.', category: 'Bureautique' },
  'ctrl+a': { combo: 'Ctrl + A', title: 'Tout Sélectionner', description: 'Sélectionne l’ensemble du texte ou des fichiers dans la fenêtre active.', category: 'Bureautique' },
  'ctrl+s': { combo: 'Ctrl + S', title: 'Enregistrer / Sauvegarder', description: 'Enregistre instantanément le fichier ou document en cours.', category: 'Bureautique' },
  'ctrl+f': { combo: 'Ctrl + F', title: 'Rechercher', description: 'Ouvre la barre de recherche dans les pages web, Word, Excel, PDF, etc.', category: 'Recherche' },
  'ctrl+p': { combo: 'Ctrl + P', title: 'Imprimer', description: 'Ouvre l’aperçu et le menu d’impression du document.', category: 'Bureautique' },
  'ctrl+t': { combo: 'Ctrl + T', title: 'Nouvel Onglet', description: 'Ouvre un nouvel onglet vierge dans votre navigateur web.', category: 'Navigateur' },
  'ctrl+w': { combo: 'Ctrl + W', title: 'Fermer l’Onglet', description: 'Ferme l’onglet ou la sous-fenêtre en cours de visionnage.', category: 'Navigateur' },
  'ctrl+shift+t': { combo: 'Ctrl + Maj + T', title: 'Rouvrir le Dernier Onglet Fermé', description: 'Ressuscite l’onglet fermé accidentellement ! Indispensable.', category: 'Navigateur' },
  'ctrl+shift+n': { combo: 'Ctrl + Maj + N', title: 'Navigation Privée', description: 'Ouvre une nouvelle fenêtre en mode incognito (ou crée un dossier sous Windows).', category: 'Navigateur' },
  'ctrl+l': { combo: 'Ctrl + L', title: 'Barre d’Adresse', description: 'Place le focus directement dans la barre d’URL du navigateur pour taper une recherche.', category: 'Navigateur' },
  'ctrl+d': { combo: 'Ctrl + D', title: 'Favoris / Multi-curseur', description: 'Ajoute la page aux favoris (navigateur) ou sélectionne la prochaine occurrence (VS Code).', category: 'Productivité' },
  'meta+d': { combo: 'Win + D', title: 'Afficher le Bureau', description: 'Minimise toutes les fenêtres pour révéler le bureau Windows instantanément.', category: 'Système' },
  'meta+e': { combo: 'Win + E', title: 'Explorateur de Fichiers', description: 'Ouvre directement l’Explorateur de fichiers Windows (Ce PC).', category: 'Système' },
  'meta+l': { combo: 'Win + L', title: 'Verrouiller la Session', description: 'Verrouille votre ordinateur dès que vous vous absentez.', category: 'Sécurité' },
  'meta+shift+s': { combo: 'Win + Maj + S', title: 'Capture d’Écran Zone', description: 'Outil de découpe rapide pour capturer une région d’écran précise.', category: 'Outil' },
  'meta+v': { combo: 'Win + V', title: 'Historique du Presse-Papiers', description: 'Affiche l’historique des 25 derniers éléments copiés sur Windows 10/11 !', category: 'Productivité' },
  'alt+tab': { combo: 'Alt + Tab', title: 'Basculer d’Application', description: 'Affiche le carrousel multitâche pour passer d’un logiciel à un autre.', category: 'Système' },
  'alt+f4': { combo: 'Alt + F4', title: 'Fermer le Programme', description: 'Ferme définitivement l’application active (ou ouvre le menu Arrêter le PC sur le bureau).', category: 'Système' },
  'ctrl+backspace': { combo: 'Ctrl + ⌫', title: 'Supprimer le Mot Entier', description: 'Efface le mot complet à gauche du curseur au lieu d’une seule lettre.', category: 'Édition' },
  'ctrl+arrowright': { combo: 'Ctrl + →', title: 'Sauter au Mot Suivant', description: 'Avance le curseur d’un mot complet vers la droite.', category: 'Navigation' },
  'ctrl+arrowleft': { combo: 'Ctrl + ←', title: 'Sauter au Mot Précédent', description: 'Recule le curseur d’un mot complet vers la gauche.', category: 'Navigation' },
};

export const DojoMode: React.FC<DojoModeProps> = ({
  layout,
  switchType,
  isMuted,
  onSwitchTypeChange,
  onToggleMute,
  onToggleLayout,
  onBackToMenu,
}) => {
  const [pressedCodes, setPressedCodes] = useState<Set<string>>(new Set());
  const [detectedShortcut, setDetectedShortcut] = useState<KnownShortcut | null>({
    combo: 'Testez n’importe quelle touche',
    title: 'Dojo Libre & Détecteur de Raccourcis',
    description: 'Pressez des combinaisons de touches (Ctrl+C, Win+D, Alt+Tab, etc.) sur votre vrai clavier : le simulateur les détecte en direct et vous explique leur rôle.',
    category: 'Entraînement',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser default on typical shortcuts so user can test them freely
      if (
        (e.ctrlKey && ['s', 'f', 'p', 'd', 'w', 't', 'a'].includes(e.key.toLowerCase())) ||
        (e.altKey && e.key === 'Tab')
      ) {
        e.preventDefault();
      }

      setPressedCodes((prev) => new Set(prev).add(e.code));
      soundManager.playKeyClick(switchType);

      // Analyze combo
      const parts: string[] = [];
      if (e.ctrlKey) parts.push('ctrl');
      if (e.altKey) parts.push('alt');
      if (e.metaKey) parts.push('meta');
      if (e.shiftKey) parts.push('shift');

      let main = e.key.toLowerCase();
      if (e.code === 'Backspace') main = 'backspace';
      else if (e.code === 'ArrowRight') main = 'arrowright';
      else if (e.code === 'ArrowLeft') main = 'arrowleft';
      else if (e.code === 'F4') main = 'f4';
      else if (e.code === 'Tab') main = 'tab';
      else if (e.code.startsWith('Key')) {
        main = e.code.replace('Key', '').toLowerCase();
      }

      if (!['control', 'alt', 'shift', 'meta'].includes(main)) {
        parts.push(main);
      }

      const keyString = parts.join('+');
      if (KNOWN_SHORTCUTS[keyString]) {
        setDetectedShortcut(KNOWN_SHORTCUTS[keyString]);
        soundManager.playSuccess(2);
      } else if (parts.length > 1) {
        setDetectedShortcut({
          combo: parts.join(' + ').toUpperCase(),
          title: 'Combinaison Détectée',
          description: `Touches capturées : ${parts.join(' + ')}. Testez les raccourcis système courants pour voir leur fonction détaillée.`,
          category: 'Combinaison Personnalisée',
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedCodes((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };

    const handleBlur = () => {
      setPressedCodes(new Set());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [switchType]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 max-w-5xl mx-auto font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Menu Principal (Échap)</span>
        </button>

        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
          <Sparkles className="w-4 h-4" />
          <span className="font-bold">Mode Dojo Libre</span>
        </div>
      </div>

      {/* Center Detected Card */}
      <div className="my-auto py-4">
        {detectedShortcut && (
          <div className="w-full max-w-xl mx-auto p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                {detectedShortcut.category}
              </span>
              <span className="font-mono text-sm px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-cyan-300 font-bold">
                {detectedShortcut.combo}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-100">
              {detectedShortcut.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {detectedShortcut.description}
            </p>
          </div>
        )}
      </div>

      {/* Keyboard */}
      <div className="w-full">
        <VirtualKeyboard
          layout={layout}
          switchType={switchType}
          isMuted={isMuted}
          pressedCodes={pressedCodes}
          targetCodes={new Set()}
          targetKeys={[]}
          onSwitchTypeChange={onSwitchTypeChange}
          onToggleMute={onToggleMute}
          onToggleLayout={onToggleLayout}
          showFingerGuide={false}
        />
      </div>
    </div>
  );
};
