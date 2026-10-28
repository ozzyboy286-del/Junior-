import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  GameMode, 
  GameState, 
  KeyboardLayoutType, 
  SwitchSoundType, 
  ShortcutChallenge, 
  GameStats 
} from './types/game';
import { GAME_LEVELS } from './utils/levels';
import { soundManager } from './utils/audio';
import { 
  matchesChallenge, 
  isModifierKey 
} from './utils/keyboardLayouts';
import { 
  calculateScore, 
  saveLeaderboardEntry, 
  getStoredPlayerName 
} from './utils/leaderboard';
import { TitleScreen } from './components/TitleScreen';
import { HUD } from './components/HUD';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { InteractiveSimulation } from './components/InteractiveSimulation';
import { VictoryModal } from './components/VictoryModal';
import { GameOverModal } from './components/GameOverModal';
import { PauseModal } from './components/PauseModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { LevelSelectModal } from './components/LevelSelectModal';
import { DojoMode } from './components/DojoMode';

export default function App() {
  // Game state
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [gameMode, setGameMode] = useState<GameMode>('campaign');
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Settings
  const [layout, setLayout] = useState<KeyboardLayoutType>('AZERTY');
  const [switchType, setSwitchType] = useState<SwitchSoundType>('blue');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // User persistence
  const [unlockedLevel, setUnlockedLevel] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('keymaster_unlocked_lvl') || '1', 10);
    } catch {
      return 1;
    }
  });

  const [levelStars, setLevelStars] = useState<Record<number, number>>(() => {
    try {
      const raw = localStorage.getItem('keymaster_level_stars');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Real-time tracking of pressed keys
  const [pressedCodes, setPressedCodes] = useState<Set<string>>(new Set());
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  // Simulation reaction effect
  const [isActionTriggered, setIsActionTriggered] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('');

  // Modals
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState<boolean>(false);

  // Scoring & Performance Stats
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    combo: 0,
    maxCombo: 0,
    correctHits: 0,
    errorHits: 0,
    accuracy: 100,
    elapsedMs: 0,
    shortcutsPerMin: 0,
    averageReactionMs: 450,
    starsEarned: 0,
  });

  // Timers
  const [timeRemainingSec, setTimeRemainingSec] = useState<number | undefined>(undefined);
  const [survivalLives, setSurvivalLives] = useState<number>(3);

  // Dynamic challenge queues for Sprint and Survival
  const [sprintChallenges, setSprintChallenges] = useState<ShortcutChallenge[]>([]);
  const challengeStartTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<number | null>(null);

  // Get current active challenge
  const currentLevel = GAME_LEVELS.find((l) => l.id === currentLevelId) || GAME_LEVELS[0];
  const activeChallenge: ShortcutChallenge = 
    gameMode === 'campaign'
      ? currentLevel.challenges[currentChallengeIndex] || currentLevel.challenges[0]
      : sprintChallenges[currentChallengeIndex] || currentLevel.challenges[0];

  // Helper to collect all challenges across levels for randomized pool
  const getAllChallenges = useCallback((): ShortcutChallenge[] => {
    const list: ShortcutChallenge[] = [];
    GAME_LEVELS.forEach((lvl) => {
      list.push(...lvl.challenges);
    });
    return list.sort(() => Math.random() - 0.5);
  }, []);

  // Update sound controller settings
  useEffect(() => {
    soundManager.setSwitchType(switchType);
  }, [switchType]);

  useEffect(() => {
    soundManager.setMuted(isMuted);
  }, [isMuted]);

  // Start a fresh game
  const startGame = useCallback((mode: GameMode, levelId: number = 1) => {
    setGameMode(mode);
    setCurrentLevelId(levelId);
    setCurrentChallengeIndex(0);
    setIsActionTriggered(false);
    challengeStartTimeRef.current = Date.now();

    setStats({
      score: 0,
      combo: 0,
      maxCombo: 0,
      correctHits: 0,
      errorHits: 0,
      accuracy: 100,
      elapsedMs: 0,
      shortcutsPerMin: 0,
      averageReactionMs: 450,
      starsEarned: 0,
    });

    if (mode === 'sprint') {
      const pool = getAllChallenges();
      setSprintChallenges(pool);
      setTimeRemainingSec(60);
      setGameState('PLAYING');
    } else if (mode === 'survival') {
      const pool = getAllChallenges();
      setSprintChallenges(pool);
      setTimeRemainingSec(4);
      setSurvivalLives(3);
      setGameState('PLAYING');
    } else if (mode === 'dojo') {
      setGameState('PLAYING');
    } else {
      // Campaign mode
      const lvl = GAME_LEVELS.find((l) => l.id === levelId) || GAME_LEVELS[0];
      setTimeRemainingSec(lvl.challenges[0]?.timeLimitSec);
      setGameState('PLAYING');
    }
  }, [getAllChallenges]);

  // Main countdown loop for timed modes
  useEffect(() => {
    if (gameState !== 'PLAYING' || gameMode === 'dojo') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }

    timerIntervalRef.current = window.setInterval(() => {
      setTimeRemainingSec((prev) => {
        if (prev === undefined) return undefined;
        if (prev <= 1) {
          // Timer expired
          if (gameMode === 'sprint') {
            soundManager.playError();
            handleSprintEnd();
            return 0;
          } else if (gameMode === 'survival') {
            soundManager.playError();
            setSurvivalLives((l) => {
              const nextLives = l - 1;
              if (nextLives <= 0) {
                handleSurvivalEnd();
              }
              return nextLives;
            });
            // Reset to next challenge with refreshed timer
            nextChallenge();
            return 3;
          } else {
            // Campaign: deduct score and move to next
            soundManager.playError();
            setStats((s) => ({
              ...s,
              errorHits: s.errorHits + 1,
              combo: 0,
            }));
            const currLvl = GAME_LEVELS.find((l) => l.id === currentLevelId) || GAME_LEVELS[0];
            return currLvl.challenges[currentChallengeIndex]?.timeLimitSec || 6;
          }
        }

        if (prev <= 4) {
          soundManager.playTick();
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState, gameMode, currentLevelId, currentChallengeIndex]);

  // Advance challenge or trigger victory
  const nextChallenge = useCallback(() => {
    challengeStartTimeRef.current = Date.now();
    setIsActionTriggered(false);

    if (gameMode === 'campaign') {
      const lvl = GAME_LEVELS.find((l) => l.id === currentLevelId) || GAME_LEVELS[0];
      if (currentChallengeIndex + 1 < lvl.challenges.length) {
        const nextIdx = currentChallengeIndex + 1;
        setCurrentChallengeIndex(nextIdx);
        setTimeRemainingSec(lvl.challenges[nextIdx]?.timeLimitSec);
      } else {
        // Level Completed! Calculate final stars & score
        handleLevelComplete();
      }
    } else if (gameMode === 'sprint' || gameMode === 'survival') {
      setCurrentChallengeIndex((prev) => {
        const nextIdx = prev + 1;
        if (nextIdx >= sprintChallenges.length) {
          // Re-shuffle pool
          setSprintChallenges(getAllChallenges());
          return 0;
        }
        return nextIdx;
      });

      if (gameMode === 'survival') {
        // Decrease timer dynamically for extreme reflex challenge
        setTimeRemainingSec((prev) => Math.max(1.8, (prev || 4) - 0.1));
      }
    }
  }, [gameMode, currentLevelId, currentChallengeIndex, sprintChallenges.length, getAllChallenges]);

  // Handle Level Complete in Campaign
  const handleLevelComplete = useCallback(() => {
    const lvl = GAME_LEVELS.find((l) => l.id === currentLevelId) || GAME_LEVELS[0];
    
    // Calculate stars: 1, 2, or 3 based on score & speed
    let stars = 1;
    if (stats.score >= lvl.targetStars[2] && stats.accuracy >= 90) {
      stars = 3;
    } else if (stats.score >= lvl.targetStars[1] && stats.accuracy >= 75) {
      stars = 2;
    }

    // Play victory fanfare
    soundManager.playVictory();

    // Update unlocked levels
    const nextUnlocked = Math.max(unlockedLevel, currentLevelId + 1);
    setUnlockedLevel(nextUnlocked);
    try {
      localStorage.setItem('keymaster_unlocked_lvl', nextUnlocked.toString());
    } catch {}

    // Update stars
    const newStars = { ...levelStars, [currentLevelId]: Math.max(levelStars[currentLevelId] || 0, stars) };
    setLevelStars(newStars);
    try {
      localStorage.setItem('keymaster_level_stars', JSON.stringify(newStars));
    } catch {}

    // Save to leaderboard
    saveLeaderboardEntry({
      playerName: getStoredPlayerName(),
      score: stats.score,
      mode: 'campaign',
      levelId: currentLevelId,
      levelTitle: lvl.title,
      speed: stats.shortcutsPerMin,
      accuracy: stats.accuracy,
      stars,
    });

    setStats((s) => ({ ...s, starsEarned: stars }));
    setGameState('VICTORY');
  }, [currentLevelId, stats, unlockedLevel, levelStars]);

  // Handle Sprint End
  const handleSprintEnd = useCallback(() => {
    soundManager.playVictory();
    saveLeaderboardEntry({
      playerName: getStoredPlayerName(),
      score: stats.score,
      mode: 'sprint',
      speed: stats.shortcutsPerMin,
      accuracy: stats.accuracy,
    });
    setGameState('GAME_OVER');
  }, [stats]);

  // Handle Survival End
  const handleSurvivalEnd = useCallback(() => {
    saveLeaderboardEntry({
      playerName: getStoredPlayerName(),
      score: stats.score,
      mode: 'survival',
      speed: stats.shortcutsPerMin,
      accuracy: stats.accuracy,
    });
    setGameState('GAME_OVER');
  }, [stats]);

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Navigation / Global keys
      if (e.key === 'Escape') {
        if (gameState === 'PLAYING') {
          setGameState('PAUSED');
          return;
        } else if (gameState === 'PAUSED') {
          setGameState('PLAYING');
          return;
        }
      }

      // Title screen quick-start on Enter or Space
      if (gameState === 'TITLE_MENU') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startGame(gameMode, 1);
          return;
        }
        if (e.key === 'Tab') {
          e.preventDefault();
          setLayout((prev) => (prev === 'AZERTY' ? 'QWERTY' : 'AZERTY'));
          return;
        }
        return;
      }

      // Modal navigation shortcuts (R to restart, Enter to advance)
      if (gameState === 'VICTORY') {
        if (e.key === 'Enter') {
          if (currentLevelId < GAME_LEVELS.length) {
            startGame('campaign', currentLevelId + 1);
          } else {
            setGameState('TITLE_MENU');
          }
          return;
        }
        if (e.key.toLowerCase() === 'r') {
          startGame('campaign', currentLevelId);
          return;
        }
        return;
      }

      if (gameState === 'GAME_OVER') {
        if (e.key === 'Enter' || e.key.toLowerCase() === 'r') {
          startGame(gameMode, currentLevelId);
          return;
        }
        return;
      }

      // Pause modal resume on Space
      if (gameState === 'PAUSED') {
        if (e.key === ' ' || e.key === 'Enter') {
          setGameState('PLAYING');
          return;
        }
        if (e.key.toLowerCase() === 'r') {
          startGame(gameMode, currentLevelId);
          return;
        }
        return;
      }

      if (gameState !== 'PLAYING' || gameMode === 'dojo') return;

      // Prevent default on dangerous browser shortcuts so user is never interrupted
      if (
        (e.ctrlKey && ['s', 'f', 'p', 'd', 'w', 't', 'a', 'z', 'y', 'x', 'c', 'v', 'l', 'r'].includes(e.key.toLowerCase())) ||
        (e.altKey && e.key === 'Tab')
      ) {
        e.preventDefault();
      }

      // Record pressed key
      setPressedCodes((prev) => new Set(prev).add(e.code));
      setPressedKeys((prev) => new Set(prev).add(e.key.toLowerCase()));

      // Play mechanical switch click
      soundManager.playKeyClick(switchType);

      // Check if this input matches the active challenge
      const isMatch = matchesChallenge(
        new Set([e.code]),
        new Set([e.key.toLowerCase()]),
        activeChallenge.keys,
        activeChallenge.codes,
        layout,
        e
      );

      const reactionTimeMs = Date.now() - challengeStartTimeRef.current;

      if (isMatch) {
        // Success!
        const newCombo = stats.combo + 1;
        const { delta, speedBonus, isBlitzFast } = calculateScore(100, reactionTimeMs, newCombo, true);
        soundManager.playSuccess(newCombo);

        setIsActionTriggered(true);
        setFeedbackText(
          isBlitzFast
            ? `Réflexe Éclair ! +${delta} pts (+${speedBonus} bonus)`
            : `Raccourci Parfait ! +${delta} pts`
        );

        // Update statistics
        setStats((prev) => {
          const totalHits = prev.correctHits + 1 + prev.errorHits;
          const accuracy = Math.round(((prev.correctHits + 1) / totalHits) * 100);
          const elapsedSec = Math.max(1, (Date.now() - (challengeStartTimeRef.current - prev.elapsedMs)) / 1000);
          const spm = Math.round(((prev.correctHits + 1) / elapsedSec) * 60);

          return {
            ...prev,
            score: prev.score + delta,
            combo: newCombo,
            maxCombo: Math.max(prev.maxCombo, newCombo),
            correctHits: prev.correctHits + 1,
            accuracy,
            shortcutsPerMin: Math.min(120, Math.max(spm, prev.shortcutsPerMin)),
            averageReactionMs: Math.round((prev.averageReactionMs * 0.7) + (reactionTimeMs * 0.3)),
          };
        });

        // Slight pause for satisfying tactile impact, then advance
        setTimeout(() => {
          nextChallenge();
        }, 320);

      } else {
        // Wrong key press (ignore pure modifier down press so player can hold Ctrl then press C)
        if (!isModifierKey(e.code) && !isModifierKey(e.key)) {
          soundManager.playError();
          setStats((prev) => {
            const totalHits = prev.correctHits + prev.errorHits + 1;
            const accuracy = Math.round((prev.correctHits / totalHits) * 100);
            return {
              ...prev,
              score: Math.max(0, prev.score - 20),
              combo: 0,
              errorHits: prev.errorHits + 1,
              accuracy,
            };
          });

          if (gameMode === 'survival') {
            setSurvivalLives((l) => {
              const nextL = l - 1;
              if (nextL <= 0) {
                handleSurvivalEnd();
              }
              return nextL;
            });
          }
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedCodes((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.key.toLowerCase());
        return next;
      });
    };

    const handleBlur = () => {
      setPressedCodes(new Set());
      setPressedKeys(new Set());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [
    gameState, 
    gameMode, 
    activeChallenge, 
    layout, 
    switchType, 
    stats, 
    currentLevelId, 
    nextChallenge, 
    startGame, 
    handleSurvivalEnd
  ]);

  // Target codes set for keyboard visualizer
  const targetCodesSet = new Set(activeChallenge.codes);

  return (
    <div className="relative w-screen h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden font-sans bg-grid-cyber">
      {/* 1. Title Screen State */}
      {gameState === 'TITLE_MENU' && (
        <TitleScreen
          onStartGame={(mode) => {
            if (mode === 'campaign') {
              setIsLevelSelectOpen(true);
            } else {
              startGame(mode, 1);
            }
          }}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          layout={layout}
          onToggleLayout={() => setLayout((prev) => (prev === 'AZERTY' ? 'QWERTY' : 'AZERTY'))}
          switchType={switchType}
          onSwitchTypeChange={setSwitchType}
          selectedMode={gameMode}
          onSelectMode={setGameMode}
        />
      )}

      {/* 2. Free Dojo Mode */}
      {gameState === 'PLAYING' && gameMode === 'dojo' && (
        <DojoMode
          layout={layout}
          switchType={switchType}
          isMuted={isMuted}
          onSwitchTypeChange={setSwitchType}
          onToggleMute={() => setIsMuted((prev) => !prev)}
          onToggleLayout={() => setLayout((prev) => (prev === 'AZERTY' ? 'QWERTY' : 'AZERTY'))}
          onBackToMenu={() => setGameState('TITLE_MENU')}
        />
      )}

      {/* 3. Active Play View (Campaign, Sprint, Survival) */}
      {gameState !== 'TITLE_MENU' && gameMode !== 'dojo' && (
        <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
          {/* Top HUD */}
          <HUD
            stats={stats}
            levelTitle={activeChallenge.title}
            levelCategory={currentLevel.category}
            timeRemainingSec={timeRemainingSec}
            totalChallenges={gameMode === 'campaign' ? currentLevel.challenges.length : undefined}
            currentChallengeIndex={currentChallengeIndex}
            mode={gameMode}
            onPause={() => setGameState('PAUSED')}
            onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
            speedGoal={currentLevel.recommendedWpmOrSpm}
          />

          {/* Interactive Simulation / Center Target Zone */}
          <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-4 my-auto">
            <InteractiveSimulation
              challenge={activeChallenge}
              isActionTriggered={isActionTriggered}
              actionFeedbackText={feedbackText}
            />
          </div>

          {/* Virtual Mechanical Keyboard Visualizer */}
          <div className="w-full pb-3 px-3 sm:px-6">
            <VirtualKeyboard
              layout={layout}
              switchType={switchType}
              isMuted={isMuted}
              pressedCodes={pressedCodes}
              targetCodes={targetCodesSet}
              targetKeys={activeChallenge.keys}
              onSwitchTypeChange={setSwitchType}
              onToggleMute={() => setIsMuted((prev) => !prev)}
              onToggleLayout={() => setLayout((prev) => (prev === 'AZERTY' ? 'QWERTY' : 'AZERTY'))}
              showFingerGuide={true}
            />
          </div>
        </div>
      )}

      {/* 4. Victory Modal */}
      {gameState === 'VICTORY' && (
        <VictoryModal
          stats={stats}
          levelTitle={currentLevel.title}
          starsEarned={stats.starsEarned}
          hasNextLevel={currentLevelId < GAME_LEVELS.length}
          onNextLevel={() => startGame('campaign', currentLevelId + 1)}
          onRestart={() => startGame('campaign', currentLevelId)}
          onMenu={() => setGameState('TITLE_MENU')}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        />
      )}

      {/* 5. Game Over Modal */}
      {gameState === 'GAME_OVER' && (
        <GameOverModal
          stats={stats}
          mode={gameMode === 'dojo' ? 'sprint' : gameMode}
          onRestart={() => startGame(gameMode, currentLevelId)}
          onMenu={() => setGameState('TITLE_MENU')}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        />
      )}

      {/* 6. Pause Modal */}
      <PauseModal
        isOpen={gameState === 'PAUSED'}
        onResume={() => setGameState('PLAYING')}
        onRestart={() => startGame(gameMode, currentLevelId)}
        onMenu={() => setGameState('TITLE_MENU')}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      {/* 7. Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        currentScore={stats.score}
      />

      {/* 8. Level Select Modal */}
      <LevelSelectModal
        isOpen={isLevelSelectOpen}
        unlockedLevel={unlockedLevel}
        levelStars={levelStars}
        onSelectLevel={(id) => {
          setIsLevelSelectOpen(false);
          startGame('campaign', id);
        }}
        onClose={() => setIsLevelSelectOpen(false)}
      />
    </div>
  );
}
