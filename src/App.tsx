/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Compass, Trophy, Calendar, Flame, ShieldAlert, Award, Star,
  Menu, X, Volume2, Sun, Moon, Type, Crown, FileText, Sparkles, MessageSquare, HelpCircle
} from 'lucide-react';

import { StudentProgress } from './types';
import { THEMES, TIMELINE_EVENTS, HISTORICAL_SOURCES, CURIOSITIES, BADGES } from './data';

// Component Imports
import WelcomeModal from './components/WelcomeModal';
import AcessibilidadePanel from './components/AcessibilidadePanel';
import InicioView from './components/InicioView';
import ThemeViewer from './components/ThemeViewer';
import TimelineView from './components/TimelineView';
import FontesView from './components/FontesView';
import GamesView from './components/GamesView';
import QuizFinal from './components/QuizFinal';
import ProgressoView from './components/ProgressoView';
import GaleriaView from './components/GaleriaView';
import CuriosidadesView from './components/CuriosidadesView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [fontSizeClass, setFontSizeClass] = useState<'text-normal' | 'text-large' | 'text-xlarge'>('text-normal');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState<number>(0);

  // Gamification notifications (floating toasts)
  const [toasts, setToasts] = useState<{ id: number; message: string; points: number }[]>([]);

  // Core Progress State
  const [progress, setProgress] = useState<StudentProgress>({
    name: '',
    points: 0,
    completedThemes: [],
    completedQuizzes: [],
    completedFinalQuiz: false,
    finalQuizScore: 0,
    activeAvatar: '🤴',
    unlockedBadges: [],
    answeredReflectionAnswers: {},
    analyzedSourcesNotes: {},
    gameScores: {}
  });

  // Load progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('historia_7_progresso');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name) {
          setProgress(parsed);
          setWelcomeModalOpen(false);
        }
      } catch (e) {
        console.error('Erro ao ler progresso:', e);
      }
    }

    const savedDark = localStorage.getItem('historia_7_dark');
    if (savedDark === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const saveProgress = (newProgress: StudentProgress) => {
    setProgress(newProgress);
    localStorage.setItem('historia_7_progresso', JSON.stringify(newProgress));
  };

  const handleNameRegistered = (name: string) => {
    const freshProgress = {
      ...progress,
      name: name,
      points: 50 // starting registration gift
    };
    saveProgress(freshProgress);
    setWelcomeModalOpen(false);
    triggerToast('Inscrição no Portal de História!', 50);
  };

  const addPoints = (points: number, reason: string) => {
    const updatedPoints = progress.points + points;
    const freshProgress = {
      ...progress,
      points: updatedPoints
    };
    saveProgress(freshProgress);
    triggerToast(reason, points);
  };

  const markThemeCompleted = (themeId: string) => {
    if (!progress.completedThemes.includes(themeId)) {
      const freshProgress = {
        ...progress,
        completedThemes: [...progress.completedThemes, themeId]
      };
      saveProgress(freshProgress);
    }
  };

  const unlockBadge = (badgeId: string) => {
    if (!progress.unlockedBadges.includes(badgeId)) {
      const freshProgress = {
        ...progress,
        unlockedBadges: [...progress.unlockedBadges, badgeId]
      };
      saveProgress(freshProgress);
      triggerToast(`🚨 Conquista Destravada: Medalha Escolar!`, 200);
    }
  };

  const resetProgress = () => {
    if (window.confirm('Tens a certeza que desejas apagar todos os teus pontos, conquistas e recomeçar a disciplina?')) {
      localStorage.removeItem('historia_7_progresso');
      setProgress({
        name: '',
        points: 0,
        completedThemes: [],
        completedQuizzes: [],
        completedFinalQuiz: false,
        finalQuizScore: 0,
        activeAvatar: '🤴',
        unlockedBadges: [],
        answeredReflectionAnswers: {},
        analyzedSourcesNotes: {},
        gameScores: {}
      });
      setWelcomeModalOpen(true);
      setActiveTab('inicio');
    }
  };

  const triggerToast = (message: string, points: number) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, points }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const getActiveTabLabel = (key: string) => {
    switch (key) {
      case 'inicio': return 'Início';
      case 'conteudos': return 'Conteúdos / Lições';
      case 'jogos': return 'Jogos e Desafios';
      case 'linha-tempo': return 'Linha do Tempo';
      case 'galeria': return 'Galeria Histórica';
      case 'fontes': return 'Fontes Históricas';
      case 'curiosidades': return 'Curiosidades';
      case 'quiz-final': return 'Quiz Final';
      case 'progresso': return 'O Meu Progresso';
      default: return 'Portal Escolar';
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F4F7F9] text-slate-800'} transition-colors duration-300 font-sans`}>
      {/* Welcome popup container */}
      <WelcomeModal isOpen={welcomeModalOpen} onNameSubmit={handleNameRegistered} />

      {/* Floating XP achievement pops */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-indigo-650 dark:bg-indigo-900 border border-indigo-500/30 text-white shadow-2xl flex items-center justify-between gap-4 pointer-events-auto"
            >
              <div className="space-y-0.5 text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-200">Aproveitamento Académico</span>
                <p className="text-xs font-semibold leading-snug">{t.message}</p>
              </div>
              <span className="shrink-0 bg-white text-indigo-700 font-mono font-black text-xs px-2.5 py-1.5 rounded-xl uppercase tracking-wider">
                +{t.points} XP
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Structural Frame Grid */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-screen">
        
        {/* DESKTOP SIDEBAR PANEL: Hidden on mobile (< 768px) */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 space-y-8 min-h-screen sticky top-0" id="desktop-sidebar">
          {/* Logo Brand heading */}
          <div className="space-y-1">
            <span className="bg-gradient-to-r from-amber-500 to-rose-500 text-[10px] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest font-mono">
              CURRÍCULO 7.º ANO
            </span>
            <h2 className="font-display font-extrabold text-lg text-slate-800 dark:text-slate-100 flex items-center gap-1.5 mt-2">
              <span>🏫 Portal de História</span>
            </h2>
          </div>

          {/* Student Profile snippet - Clean Minimalism Card */}
          {!welcomeModalOpen && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850/50 border border-slate-200/60 dark:border-slate-800/80 space-y-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-xl flex items-center justify-center shrink-0">
                🤴
              </div>
              <div className="overflow-hidden">
                <h4 className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 truncate">{progress.name}</h4>
                <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold">{progress.points} XP</p>
              </div>
            </div>
          )}

          {/* Menu items - desktop navigation - Clean Minimalism Items */}
          <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
            {menuItems().map((it) => {
              const active = activeTab === it.key;
              return (
                <button
                  key={it.key}
                  onClick={() => setActiveTab(it.key)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                    active
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 font-bold border-l-4 border-indigo-600'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-slate-200 border-l-4 border-transparent'
                  }`}
                  id={`nav-item-${it.key}`}
                >
                  <span className={`${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-550'}`}>
                    {it.icon}
                  </span>
                  <span>{it.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer of sidebar with active session block from design */}
          <div className="mt-auto pt-4 border-t border-slate-150 dark:border-slate-800">
            <div className="bg-amber-50 dark:bg-amber-950/15 rounded-xl p-4 border border-amber-100 dark:border-amber-900/30">
              <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">Docente</p>
              <p className="text-xs font-extrabold text-amber-900 dark:text-amber-205">Carla Oliveira</p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Sessão Ativa</span>
              </div>
            </div>
          </div>
        </aside>

        {/* MOBILE TOP BAR NAVIGATION FRAME */}
        <header className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-40 flex items-center justify-between" id="mobile-header">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">🏫</span>
            <span className="font-display font-extrabold text-[#111] dark:text-white text-sm">História 7.º Ano</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-white shrink-0"
              title="Abrir Menu de Navegação"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* MOBILE OVERLAY NAVIGATION CONTAINER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden z-30 relative"
              id="mobile-navigation-dropdown"
            >
              <nav className="p-4 space-y-1">
                {menuItems().map((it) => {
                  const active = activeTab === it.key;
                  return (
                    <button
                      key={it.key}
                      onClick={() => {
                        setActiveTab(it.key);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium transition-all ${
                        active
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 font-bold border-l-4 border-indigo-600'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 border-l-4 border-transparent'
                      }`}
                    >
                      <span className={active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}>
                        {it.icon}
                      </span>
                      <span>{it.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN BODY LAYOUT VIEWER */}
        <main className="flex-1 p-4 sm:p-8 space-y-6" id="main-content-area">
          {/* Top Accessibility panel indicator */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-905 border border-slate-150 dark:border-slate-800 rounded-3xl p-4 shadow-xs">
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest font-mono">
                Visão Atual
              </p>
              <h2 className="font-display font-extrabold text-slate-800 dark:text-slate-100 text-sm sm:text-base mt-0.5">
                {getActiveTabLabel(activeTab)}
              </h2>
            </div>

            <AcessibilidadePanel
              fontSizeClass={fontSizeClass}
              setFontSizeClass={setFontSizeClass}
              darkMode={darkMode}
              setDarkMode={(dark) => {
                setDarkMode(dark);
                localStorage.setItem('historia_7_dark', String(dark));
              }}
            />
          </div>

          {/* DYNAMIC PAGES RENDERING CONTAINER */}
          <div className={`${fontSizeClass} leading-relaxed`}>
            {activeTab === 'inicio' && (
              <InicioView progress={progress} setTab={setActiveTab} fontSizeClass={fontSizeClass} />
            )}

            {activeTab === 'conteudos' && (
              <ThemeViewer
                themes={THEMES}
                currentThemeIndex={currentThemeIndex}
                setCurrentThemeIndex={setCurrentThemeIndex}
                progress={progress}
                addPoints={addPoints}
                markThemeCompleted={markThemeCompleted}
                fontSizeClass={fontSizeClass}
              />
            )}

            {activeTab === 'linha-tempo' && (
              <TimelineView
                events={TIMELINE_EVENTS}
                progress={progress}
                addPoints={addPoints}
                fontSizeClass={fontSizeClass}
              />
            )}

            {activeTab === 'galeria' && <GaleriaView />}

            {activeTab === 'fontes' && (
              <FontesView
                sources={HISTORICAL_SOURCES}
                progress={progress}
                addPoints={addPoints}
                fontSizeClass={fontSizeClass}
              />
            )}

            {activeTab === 'curiosidades' && (
              <CuriosidadesView curiosities={CURIOSITIES} progress={progress} addPoints={addPoints} />
            )}

            {activeTab === 'jogos' && (
              <GamesView progress={progress} addPoints={addPoints} fontSizeClass={fontSizeClass} />
            )}

            {activeTab === 'quiz-final' && (
              <QuizFinal progress={progress} addPoints={addPoints} unlockBadge={unlockBadge} />
            )}

            {activeTab === 'progresso' && (
              <ProgressoView
                progress={progress}
                badges={BADGES}
                themesCount={THEMES.length}
                resetProgress={resetProgress}
                fontSizeClass={fontSizeClass}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );

  function menuItems() {
    return [
      { key: 'inicio', label: 'Início', icon: <BookOpen className="w-4 h-4 shrink-0" /> },
      { key: 'conteudos', label: 'Conteúdos do Programa', icon: <FileText className="w-4 h-4 shrink-0" /> },
      { key: 'jogos', label: 'Jogos e Desafios', icon: <Trophy className="w-4 h-4 shrink-0" /> },
      { key: 'linha-tempo', label: 'Linha do Tempo', icon: <Calendar className="w-4 h-4 shrink-0" /> },
      { key: 'galeria', label: 'Galeria Histórica', icon: <Compass className="w-4 h-4 shrink-0" /> },
      { key: 'fontes', label: 'Fontes Históricas', icon: <ShieldAlert className="w-4 h-4 shrink-0" /> },
      { key: 'curiosidades', label: 'Curiosidades', icon: <Sparkles className="w-4 h-4 shrink-0" /> },
      { key: 'quiz-final', label: 'Quiz Final', icon: <Crown className="w-4 h-4 shrink-0" /> },
      { key: 'progresso', label: 'O Meu Progresso', icon: <Award className="w-4 h-4 shrink-0" /> },
    ];
  }
}
