import React from 'react';
import { ShortcutChallenge } from '../types/game';
import { 
  FileText, 
  Globe, 
  Terminal, 
  CheckCircle2, 
  Copy, 
  Trash2, 
  Search, 
  Plus, 
  X, 
  Monitor, 
  Camera, 
  Save 
} from 'lucide-react';

interface InteractiveSimulationProps {
  challenge: ShortcutChallenge;
  isActionTriggered: boolean;
  actionFeedbackText?: string;
}

export const InteractiveSimulation: React.FC<InteractiveSimulationProps> = ({
  challenge,
  isActionTriggered,
  actionFeedbackText,
}) => {
  const { simulationType } = challenge;

  return (
    <div className="relative w-full max-w-2xl mx-auto h-44 rounded-xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden flex flex-col font-sans transition-all">
      {/* OS Window Chrome */}
      <div className="h-8 bg-slate-950/80 border-b border-slate-800/80 px-3 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs text-slate-400 font-mono pl-2 truncate">
            {simulationType === 'browser_tab' ? 'Navigateur Web' :
             simulationType === 'copy_paste' ? 'Éditeur de Code & Texte' :
             simulationType === 'window_min' ? 'Bureau Windows' :
             simulationType === 'screenshot' ? 'Outil Capture d’écran' :
             'Document Actif — Bureau'}
          </span>
        </div>
        <div className="text-[11px] font-mono text-cyan-400 font-medium">
          Simulation Réactive
        </div>
      </div>

      {/* Dynamic Simulated Window Content */}
      <div className="relative flex-1 p-4 flex flex-col justify-center items-center overflow-hidden">
        {/* Feedback Flash Banner */}
        {isActionTriggered && (
          <div className="absolute inset-0 bg-cyan-950/70 backdrop-blur-xs flex items-center justify-center z-20 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 bg-cyan-500 text-slate-950 px-4 py-2 rounded-lg font-bold text-sm shadow-xl tracking-wide uppercase">
              <CheckCircle2 className="w-5 h-5 text-slate-950" />
              <span>{actionFeedbackText || 'Action Exécutée avec Succès !'}</span>
            </div>
          </div>
        )}

        {/* 1. Copy-Paste / Cut Simulation */}
        {simulationType === 'copy_paste' && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-cyan-400" /> note_confidentielle.txt</span>
              <span className="font-mono text-[11px] text-slate-500">UTF-8 · 100%</span>
            </div>
            <div className="my-auto font-mono text-sm tracking-wide bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-500 select-none mr-2">01</span>
                <span className="bg-cyan-500/20 text-cyan-300 px-1 py-0.5 rounded border border-cyan-400/30">
                  {challenge.mockInitialContent || 'TOKEN_SECRET_ALPHA_99'}
                </span>
                <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse align-middle" />
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800/60 px-2 py-1 rounded">
                <Copy className="w-3 h-3 text-cyan-400" />
                <span>Presse-papiers</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>{challenge.description}</span>
              <span className="font-mono text-cyan-400">{challenge.keys.join(' + ')}</span>
            </div>
          </div>
        )}

        {/* 2. Save Doc Simulation */}
        {simulationType === 'save_doc' && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5"><Save className="w-3.5 h-3.5 text-amber-400" /> Rapport_Annuel_2026.docx</span>
              <span className="text-amber-400 font-mono text-[11px] flex items-center gap-1">
                ● Modifié non enregistré
              </span>
            </div>
            <div className="my-auto text-sm text-slate-300 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
              <span>Résultats du Q3 en hausse de 42% sur les raccourcis clavier...</span>
              <span className="text-xs text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-1 rounded">
                Non sauvegardé
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Faites Ctrl + S pour enregistrer votre progression.</span>
              <span className="font-mono text-amber-400">Ctrl + S</span>
            </div>
          </div>
        )}

        {/* 3. Browser Tab Simulation */}
        {simulationType === 'browser_tab' && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 overflow-x-auto">
              <div className="flex items-center gap-2 bg-slate-800 text-slate-200 text-xs px-3 py-1 rounded-t-md border-t border-x border-slate-700">
                <Globe className="w-3 h-3 text-cyan-400" />
                <span className="truncate max-w-[110px]">Google Recherche</span>
                <X className="w-3 h-3 text-slate-400 hover:text-rose-400 cursor-pointer" />
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 text-slate-400 text-xs px-3 py-1 rounded-t-md hover:bg-slate-800/40">
                <Globe className="w-3 h-3 text-slate-500" />
                <span className="truncate max-w-[90px]">Documentation</span>
              </div>
              <button className="p-1 text-slate-400 hover:text-slate-100 rounded">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="my-auto flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 text-xs text-slate-400 font-mono">
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-cyan-300">https://www.keymaster.org/speed-run</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>{challenge.description}</span>
              <span className="font-mono text-cyan-400">{challenge.keys.join(' + ')}</span>
            </div>
          </div>
        )}

        {/* 4. Windows Desktop / Minimize Simulation */}
        {simulationType === 'window_min' && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="my-auto flex items-center justify-around w-full">
              <div className="flex flex-col items-center gap-1 p-2 bg-slate-800/40 rounded-lg border border-slate-700/60">
                <Monitor className="w-6 h-6 text-cyan-400" />
                <span className="text-[11px] text-slate-300">Bureau Principal</span>
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-slate-200">Bascule Ultra Rapide</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Plus besoin de chercher la souris</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2">
              <span>{challenge.description}</span>
              <span className="font-mono text-cyan-400">{challenge.keys.join(' + ')}</span>
            </div>
          </div>
        )}

        {/* 5. Delete Word / Word Jump Navigation */}
        {(simulationType === 'delete_word' || simulationType === 'word_jump') && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-emerald-400" /> Terminal de Frappe</span>
              <span className="font-mono text-[11px] text-emerald-400">Curseur Intelligent</span>
            </div>
            <div className="my-auto font-mono text-sm bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-200">
              <span>Le rapide renard </span>
              <span className="bg-rose-500/20 text-rose-300 px-1 py-0.5 rounded border border-rose-400/40">
                {simulationType === 'delete_word' ? 'MotASupprimer' : 'saute'}
              </span>
              <span> par-dessus la barrière.</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>{challenge.description}</span>
              <span className="font-mono text-cyan-400">{challenge.keys.join(' + ')}</span>
            </div>
          </div>
        )}

        {/* 6. Screenshot / Generic */}
        {(simulationType === 'screenshot' || simulationType === 'generic' || simulationType === 'search_box' || simulationType === 'undo_redo' || simulationType === 'select_all') && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5"><Camera className="w-3.5 h-3.5 text-cyan-400" /> Mode Opérationnel</span>
              <span className="font-mono text-[11px] text-cyan-400">Zone Détectée</span>
            </div>
            <div className="my-auto text-center">
              <p className="text-sm font-medium text-slate-200">{challenge.title}</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">{challenge.description}</p>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2">
              <span className="truncate mr-2">{challenge.explanation}</span>
              <span className="font-mono text-cyan-400 whitespace-nowrap shrink-0">{challenge.keys.join(' + ')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
