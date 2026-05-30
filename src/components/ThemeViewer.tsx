/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Sparkles, HelpCircle, ArrowRight, ArrowLeft, 
  Check, Play, Award, RotateCcw, AlertCircle, RefreshCw, Send, CheckCircle2 
} from 'lucide-react';
import { Theme, StudentProgress, Flashcard, QuizQuestion } from '../types';

interface ThemeViewerProps {
  themes: Theme[];
  currentThemeIndex: number;
  setCurrentThemeIndex: (idx: number) => void;
  progress: StudentProgress;
  addPoints: (points: number, reason: string) => void;
  markThemeCompleted: (themeId: string) => void;
  fontSizeClass: string;
}

export default function ThemeViewer({
  themes,
  currentThemeIndex,
  setCurrentThemeIndex,
  progress,
  addPoints,
  markThemeCompleted,
  fontSizeClass
}: ThemeViewerProps) {
  const theme = themes[currentThemeIndex];
  const [activeTab, setActiveTab] = useState<'text' | 'flashcards' | 'exercise' | 'reflection'>('text');
  
  // Flashcard states
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Exercise states (Theme inline general quiz)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Reflection state
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  const getTextSizeClass = () => {
    if (fontSizeClass === 'text-large') return 'text-lg leading-relaxed';
    if (fontSizeClass === 'text-xlarge') return 'text-xl leading-loose';
    return 'text-base leading-relaxed';
  };

  const getHeadingSizeClass = () => {
    if (fontSizeClass === 'text-large') return 'text-2xl';
    if (fontSizeClass === 'text-xlarge') return 'text-3xl';
    return 'text-xl';
  };

  const resetThemeStates = (newIdx: number) => {
    setCurrentThemeIndex(newIdx);
    setActiveTab('text');
    setFlippedCards({});
    setCurrentCardIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setReflectionAnswer('');
    setReflectionSubmitted(false);
  };

  // Mark theme as read and earn starter points
  const handleCompleteReading = () => {
    if (!progress.completedThemes.includes(theme.id)) {
      markThemeCompleted(theme.id);
      addPoints(100, `Leitura completa do Tema: ${theme.title}`);
    }
  };

  // Flashcards handler
  const handleFlipCard = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
    const cardId = `fc-${theme.id}-${id}`;
    // Earn minor reward for study
    if (!progress.gameScores[cardId]) {
      addPoints(10, 'Estudo de vocabulário (flashcard)');
      progress.gameScores[cardId] = 1;
    }
  };

  // Quick Inline Quiz Submit
  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    theme.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    setQuizScore(score);
    setQuizSubmitted(true);

    const bonusPoints = score * 50;
    if (bonusPoints > 0) {
      addPoints(bonusPoints, `Quizz do Tema ${theme.number}: ${score}/${theme.quiz.length} corretas`);
    }
  };

  const handleNextTheme = () => {
    if (currentThemeIndex < themes.length - 1) {
      resetThemeStates(currentThemeIndex + 1);
    }
  };

  const handlePrevTheme = () => {
    if (currentThemeIndex > 0) {
      resetThemeStates(currentThemeIndex - 1);
    }
  };

  // Reflection submit handler
  const handleSendReflection = (questionId: string) => {
    if (!reflectionAnswer.trim()) return;
    setReflectionSubmitted(true);
    addPoints(75, `Reflexão crítica respondida no Tema ${theme.number}`);
  };

  return (
    <div className="space-y-6" id={`theme-viewer-${theme.id}`}>
      {/* Header theme Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-display font-bold text-lg">
            {theme.number}
          </div>
          <div>
            <h1 className="font-display font-extrabold text-slate-800 dark:text-slate-100 tracking-tight text-lg sm:text-xl">
              {theme.title}
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              História 7.º Ano • Professora Carla Oliveira
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevTheme}
            disabled={currentThemeIndex === 0}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-250 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-all flex items-center gap-1.5"
            title="Tema Anterior"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
          
          <button
            onClick={handleNextTheme}
            disabled={currentThemeIndex === themes.length - 1}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 transition-all flex items-center gap-1.5"
            title="Próximo Tema"
          >
            <span className="hidden sm:inline">Próximo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2 p-1.5 scrollbar-none bg-slate-50 dark:bg-slate-9003/30 rounded-2xl">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'text'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50'
              : 'text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Lição & Resumo</span>
        </button>

        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'flashcards'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50'
              : 'text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Flashcards Vocabulário</span>
        </button>

        <button
          onClick={() => setActiveTab('exercise')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'exercise'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50'
              : 'text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Atividade Rápida</span>
        </button>

        <button
          onClick={() => setActiveTab('reflection')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'reflection'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50'
              : 'text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Perguntas de Reflexão</span>
        </button>
      </div>

      {/* Tabs Content rendering */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm p-6 sm:p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'text' && (
            <motion.div
              key="lesson-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Cover layout */}
              <div className={`p-6 rounded-3xl bg-gradient-to-br ${theme.color} text-white space-y-3 relative overflow-hidden shadow-md`}>
                <div className="absolute right-0 bottom-0 opacity-10 translate-y-10 translate-x-10 scale-125">
                  <BookOpen className="w-64 h-64" />
                </div>
                <span className="bg-white/20 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-max">
                  TEMA {theme.number}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
                  {theme.title}
                </h2>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {theme.subsections[0]?.keyConcepts.map((v, i) => (
                    <span key={i} className="text-xs bg-black/15 text-white/90 px-2.5 py-1 rounded-lg">
                      #{v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subsections rendering */}
              <div className="space-y-8">
                {theme.subsections.map((sub, i) => (
                  <section key={sub.id} className="space-y-4 border-b border-slate-100 dark:border-slate-800 last:border-0 pb-8 last:pb-0">
                    <h3 className={`${getHeadingSizeClass()} font-display font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2`}>
                      <span className="w-1.5 h-6 rounded bg-indigo-500" />
                      {sub.title}
                    </h3>
                    <div className={`${getTextSizeClass()} text-slate-650 dark:text-slate-300 space-y-4 whitespace-pre-line`}>
                      {sub.content}
                    </div>
                  </section>
                ))}
              </div>

              {/* Action completion bar */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Terminaste de ler esta lição, <span className="text-indigo-600 dark:text-indigo-400">{progress.name}</span>?
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Garante a leitura de todo o documento curricular da professora Carla Oliveira.
                  </p>
                </div>

                {progress.completedThemes.includes(theme.id) ? (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2.5 rounded-2xl border border-emerald-100/30 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    <span>Lição Concluída (+100 XP)</span>
                  </div>
                ) : (
                  <button
                    onClick={handleCompleteReading}
                    className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-all font-semibold font-display text-xs text-white shadow-md hover:shadow-indigo-500/20 flex items-center gap-2"
                  >
                    Marcar Como Lido
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'flashcards' && (
            <motion.div
              key="lesson-flashcards"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 flex flex-col items-center"
            >
              <div className="text-center max-w-md">
                <h3 className="font-display font-bold text-slate-800 dark:text-slate-200 text-lg">
                  Cartões de Vocabulário Essencial
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Clica no cartão para virar e ver a explicação técnica. Ganhas +10 pontos por novo termo descoberto!
                </p>
              </div>

              {/* Flippable Card Container */}
              <div className="w-full max-w-md h-72 [perspective:1000px] my-4 cursor-pointer" onClick={() => handleFlipCard(theme.flashcards[currentCardIndex].id)}>
                <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flippedCards[theme.flashcards[currentCardIndex].id] ? '[transform:rotateY(180deg)]' : ''}`}>
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full p-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-850 bg-gradient-to-br from-indigo-50/50 to-indigo-100/30 dark:from-slate-850 dark:to-slate-850 flex flex-col justify-between items-center text-center [backface-visibility:hidden]">
                    <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">{theme.flashcards[currentCardIndex].context}</span>
                    <h4 className="text-2xl font-display font-extrabold text-slate-850 dark:text-slate-100 leading-tight">
                      {theme.flashcards[currentCardIndex].term}
                    </h4>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5" />
                      Clica para Virar
                    </span>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 w-full h-full p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-805 flex flex-col justify-between items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Definição</span>
                    <p className={`${getTextSizeClass()} text-slate-700 dark:text-slate-350 leading-relaxed`}>
                      {theme.flashcards[currentCardIndex].definition}
                    </p>
                    <span className="text-xs text-slate-350 dark:text-slate-500">Volta a clicar para ver o termo</span>
                  </div>
                </div>
              </div>

              {/* Navigators */}
              <div className="flex items-center gap-4">
                <button
                  disabled={currentCardIndex === 0}
                  onClick={() => {
                    setCurrentCardIndex(currentCardIndex - 1);
                  }}
                  className="p-3.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-all"
                  title="Anterior"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="text-xs text-slate-450 font-semibold font-mono">
                  {currentCardIndex + 1} de {theme.flashcards.length}
                </span>
                <button
                  disabled={currentCardIndex === theme.flashcards.length - 1}
                  onClick={() => {
                    setCurrentCardIndex(currentCardIndex + 1);
                  }}
                  className="p-3.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-all"
                  title="Próximo"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'exercise' && (
            <motion.div
              key="lesson-quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="font-display font-bold text-slate-800 dark:text-slate-200 text-lg">
                  Exercícios de Consolidação (Tema {theme.number})
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  Responde a estas perguntas para validar os teus novos conhecimentos. Cada resposta certa vale +50 XP!
                </p>
              </div>

              <div className="space-y-6">
                {theme.quiz.map((q, qidx) => (
                  <div key={q.id} className="p-5 border border-slate-100 dark:border-slate-850 rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 space-y-3">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                      {qidx + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, oindex) => {
                        const isSelected = selectedAnswers[q.id] === oindex;
                        const isCorrect = oindex === q.correctIndex;
                        let optionStyle = 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800';

                        if (quizSubmitted) {
                          if (isCorrect) {
                            optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300';
                          } else if (isSelected) {
                            optionStyle = 'border-red-500 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300';
                          } else {
                            optionStyle = 'opacity-60 border-slate-200 dark:border-slate-800';
                          }
                        } else if (isSelected) {
                          optionStyle = 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300';
                        }

                        return (
                          <button
                            key={oindex}
                            onClick={() => handleAnswerSelect(q.id, oindex)}
                            disabled={quizSubmitted}
                            className={`p-3 text-left rounded-xl text-xs font-medium border-2 transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && isSelectedAnswersInclude(q.id) && (
                      <div className="mt-3 text-xs bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-slate-500 dark:text-slate-400">
                        <span className="font-bold">Explicação:</span> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!quizSubmitted ? (
                <button
                  disabled={Object.keys(selectedAnswers).length === 0}
                  onClick={handleSubmitQuiz}
                  className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold font-display text-xs tracking-wider transition-all shadow-md mt-4"
                  id={`submit-quiz-theme-${theme.id}`}
                >
                  Submeter Respostas
                </button>
              ) : (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 border border-indigo-250 dark:border-indigo-900/40 text-center flex flex-col items-center gap-3">
                  <Award className="w-10 h-10 text-indigo-500 animate-bounce" />
                  <div>
                    <p className="font-display font-extrabold text-slate-800 dark:text-white">
                      Resultados obtidos, {progress.name}!
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Acertaste em <strong className="text-indigo-600 dark:text-indigo-400">{quizScore} de {theme.quiz.length}</strong> perguntas. Acumulaste {quizScore * 50} XP de aproveitamento de lição!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedAnswers({});
                      setQuizSubmitted(false);
                      setQuizScore(0);
                    }}
                    className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline py-1 px-3 rounded-lg"
                  >
                    Tentar Novamente
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'reflection' && (
            <motion.div
              key="lesson-reflection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="font-display font-bold text-slate-800 dark:text-slate-200 text-lg">
                  Atitude & Reflexão Histórica
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  A História vive de espírito crítico e interpretação. Responde por palavras tuas para ganhar bónus especial de redação (+75 XP).
                </p>
              </div>

              {theme.reflection.map((ref) => (
                <div key={ref.id} className="space-y-4">
                  <div className="p-5 rounded-2xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/30 dark:bg-indigo-950/10">
                    <p className="font-medium text-slate-850 dark:text-slate-200 leading-relaxed text-sm">
                      📖 {ref.question}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                      A tua Resposta Crítica
                    </label>
                    <textarea
                      disabled={reflectionSubmitted}
                      value={reflectionAnswer}
                      onChange={(e) => setReflectionAnswer(e.target.value)}
                      placeholder="Escreve aqui uma resposta estruturada de 2 ou 3 linhas..."
                      rows={5}
                      className="w-full p-4 text-xs sm:text-sm rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-805 focus:border-indigo-500 outline-none text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-550 transition-colors"
                    />
                  </div>

                  {/* Reflection teacher prompt tips */}
                  <div className="p-4 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs flex gap-2 border border-amber-250/20">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <div>
                      <span className="font-bold">Dica da Professora Carla Oliveira:</span> {ref.tip}
                    </div>
                  </div>

                  {!reflectionSubmitted ? (
                    <button
                      onClick={() => handleSendReflection(ref.id)}
                      disabled={!reflectionAnswer.trim()}
                      className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-semibold font-display flex items-center gap-2 transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submeter Reflexão Comentada
                    </button>
                  ) : (
                    <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        Obrigado, {progress.name}! Recebeste +75 XP. Reflexão persitida.
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        A professora Carla Oliveira recomenda cruzar as tuas opiniões com o texto do manual. Excelente atitude!
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  function isSelectedAnswersInclude(qid: string) {
    return selectedAnswers[qid] !== undefined;
  }
}
