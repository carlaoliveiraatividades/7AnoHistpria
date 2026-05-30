/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Key, Award, AlertCircle, RotateCcw, Flame, Check, 
  HelpCircle, Shuffle, ShieldAlert, ArrowRight, Star 
} from 'lucide-react';
import { StudentProgress } from '../types';

interface GamesViewProps {
  progress: StudentProgress;
  addPoints: (points: number, reason: string) => void;
  fontSizeClass: string;
}

export default function GamesView({
  progress,
  addPoints,
  fontSizeClass
}: GamesViewProps) {
  const [activeGame, setActiveGame] = useState<'match' | 'escape' | 'chrono' | null>(null);

  // -----------------------------------------------------------------
  // 1. GAME: Concept Matching state & logic
  // -----------------------------------------------------------------
  const matchPairs = [
    { id: '1', term: 'Nomadismo', def: 'Modo de vida sem habitação fixa que depende da recoleção e caça.' },
    { id: '2', term: 'Megalitismo', def: 'Construção religiosa com enormes blocos de pedra do Neolítico.' },
    { id: '3', term: 'Democracia', def: 'Governo do povo criado em Atenas, embora de cidadania restrita.' },
    { id: '4', term: 'Romanização', def: 'Adoção da cultura, latim, direito e estradas romanas pelas províncias.' },
    { id: '5', term: 'Vassalagem', def: 'Acordo feudal de fidelidade mútua entre suserano e vassalo.' },
    { id: '6', term: 'Burguesia', def: 'Classe urbana moderna que retirava riqueza do comércio e dinheiro.' },
  ];

  const [shuffledTerms, setShuffledTerms] = useState(() => shuffleArray([...matchPairs]));
  const [shuffledDefs, setShuffledDefs] = useState(() => shuffleArray([...matchPairs]));
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [selectedDefId, setSelectedDefId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [matchScoreEarned, setMatchScoreEarned] = useState(false);

  function resetMatchGame() {
    setShuffledTerms(shuffleArray([...matchPairs]));
    setShuffledDefs(shuffleArray([...matchPairs]));
    setSelectedTermId(null);
    setSelectedDefId(null);
    setMatchedIds([]);
    setMatchScoreEarned(false);
  }

  const handleTermClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedTermId(id);
    if (selectedDefId) {
      checkMatch(id, selectedDefId);
    }
  };

  const handleDefClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedDefId(id);
    if (selectedTermId) {
      checkMatch(selectedTermId, id);
    }
  };

  const checkMatch = (termId: string, defId: string) => {
    if (termId === defId) {
      const newMatches = [...matchedIds, termId];
      setMatchedIds(newMatches);
      if (newMatches.length === matchPairs.length && !matchScoreEarned) {
        addPoints(150, 'Concluiu o Jogo de Correspondência de Conceitos!');
        setMatchScoreEarned(true);
      }
    }
    // Fade selections
    setTimeout(() => {
      setSelectedTermId(null);
      setSelectedDefId(null);
    }, 450);
  };

  // -----------------------------------------------------------------
  // 2. GAME: Escape Room riddles
  // -----------------------------------------------------------------
  const escapeSteps = [
    {
      level: 1,
      riddle: '«Sou o material que nos permitiu criar pontas de setas muito robustas, polidas, que revolucionou a caça e agricultura no Neolítico. Que tipo de material duro sou?»',
      options: ['Ouro', 'Pedra Polida', 'Plástico', 'Madeira de Ébano'],
      correctOption: 'Pedra Polida',
      hint: 'Pensa no novo nome dado a esta Idade da Pedra...'
    },
    {
      level: 2,
      riddle: '«D. Afonso Henriques lutou contra as tropas leonesas de sua mãe para governar e iniciar Portugal sozinho. Em que batalha de Guimarães de 1128 triunfou ele?»',
      options: ['Batalha de Ourique', 'Batalha de Toro', 'Batalha de São Mamede', 'Batalha de Aljubarrota'],
      correctOption: 'Batalha de São Mamede',
      hint: 'Oco numa colina em Guimarães, tem o mesmo nome de um santo padroeiro.'
    },
    {
      level: 3,
      riddle: '«No ano dramático de 1385, as pesadas tropas de Castela foram batidas graças a uma famosa formação tática do Condestável Nuno Álvares Pereira em Aljubarrota. Que formação defensiva era?»',
      options: ['A Tática do Quadrado', 'Carga de Cavalaria Alada', 'Retirada Marítima', 'Bombardeamento de Canhões'],
      correctOption: 'A Tática do Quadrado',
      hint: 'Pensa num polígono equilátero de 4 lados iguais...'
    }
  ];

  const [currentEscapeLevel, setCurrentEscapeLevel] = useState(0);
  const [selectedEscapeOpt, setSelectedEscapeOpt] = useState<string | null>(null);
  const [escapeFeedback, setEscapeFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [escapeCompleted, setEscapeCompleted] = useState(false);

  const handleEscapeAnswer = (opt: string) => {
    setSelectedEscapeOpt(opt);
    const stepObj = escapeSteps[currentEscapeLevel];
    if (opt === stepObj.correctOption) {
      setEscapeFeedback('correct');
      addPoints(100, `Escape Room - Resolveu Nível ${currentEscapeLevel + 1}`);
    } else {
      setEscapeFeedback('wrong');
    }
  };

  const handleNextEscape = () => {
    setSelectedEscapeOpt(null);
    setEscapeFeedback(null);
    if (currentEscapeLevel < escapeSteps.length - 1) {
      setCurrentEscapeLevel(currentEscapeLevel + 1);
    } else {
      setEscapeCompleted(true);
      addPoints(200, 'Grão-Mestre: Escape Completo do Castelo Medieval!');
    }
  };

  const restartEscape = () => {
    setCurrentEscapeLevel(0);
    setSelectedEscapeOpt(null);
    setEscapeFeedback(null);
    setEscapeCompleted(false);
  };

  // -----------------------------------------------------------------
  // 3. GAME: Chronological Sort state & logic
  // -----------------------------------------------------------------
  const initialChronoItems = [
    { year: 'c. 10 000 a.C.', title: 'Revolução Agrícola no Neolítico' },
    { year: 'Séc. V a.C.', title: 'Apogeu de Democracia em Atenas' },
    { year: '1143 d.C.', title: 'Tratado de Zamora e Reino de Portugal' },
    { year: '1385 d.C.', title: 'Batalha de Aljubarrota' }
  ];

  const [chronoItems, setChronoItems] = useState(() => shuffleArray([...initialChronoItems]));
  const [chronoChecked, setChronoChecked] = useState(false);
  const [chronoSuccess, setChronoSuccess] = useState(false);

  const moveChronoItem = (index: number, direction: 'up' | 'down') => {
    if (chronoChecked) return;
    const newItems = [...chronoItems];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;

    // Swap
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setChronoItems(newItems);
  };

  const handleCheckChrono = () => {
    // Check if item order matches year sequence
    const exactOrder = ['c. 10 000 a.C.', 'Séc. V a.C.', '1143 d.C.', '1385 d.C.'];
    const currentOrder = chronoItems.map(i => i.year);
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(exactOrder);

    setChronoChecked(true);
    setChronoSuccess(isCorrect);
    if (isCorrect) {
      addPoints(150, 'Resolveu o Enigma do Tempo Cronológico!');
    }
  };

  const resetChrono = () => {
    setChronoItems(shuffleArray([...initialChronoItems]));
    setChronoChecked(false);
    setChronoSuccess(false);
  };

  return (
    <div className="space-y-6" id="games-challenges-main">
      {/* Intro hero for games */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h2 className="font-display font-extrabold text-slate-800 dark:text-slate-100 text-xl tracking-tight flex items-center gap-2">
          🎮 Arena de Jogos e Desafios Históricos
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">
          A melhor maneira de consolidar o programa escolar de História do 7.º ano é jogando! Escolhe uma atividade abaixo, testa as tuas aptidões e ganha pontos e medalhas de progresso.
        </p>
      </div>

      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Game 1 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-3">
              <span className="text-3xl">🧩</span>
              <h3 className="font-display font-extrabold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                Correspondência de Conceitos
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Associa importantes conceitos históricos como "Burguesia", "Nomadismo" ou "Vassalagem" às suas exatas definições curriculares.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveGame('match');
                resetMatchGame();
              }}
              className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold font-display text-white text-xs text-center transition-colors shadow-sm"
              id="play-match-game-btn"
            >
              Jogar Desafio (+150 XP)
            </button>
          </div>

          {/* Card Game 2 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-3">
              <span className="text-3xl">🏰</span>
              <h3 className="font-display font-extrabold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                Escape Room do Castelo
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Ficaste trancado no castelo da professora Carla Oliveira. Resolve 3 enigmas sobre civilizações, exércitos e dinastiários para ganhar a Chave de Prata!
              </p>
            </div>
            <button
              onClick={() => {
                setActiveGame('escape');
                restartEscape();
              }}
              className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-semibold font-display text-white text-xs text-center transition-colors shadow-sm"
              id="play-escape-game-btn"
            >
              Entrar no Castelo (+300 XP)
            </button>
          </div>

          {/* Card Game 3 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-3">
              <span className="text-3xl">⏳</span>
              <h3 className="font-display font-extrabold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                Enigma do Tempo
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Ordena cronologicamente acontecimentos caóticos, desde a invenção da agricultura até à vitória geopolítica de Aljubarrota em 1385.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveGame('chrono');
                resetChrono();
              }}
              className="mt-6 w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 font-semibold font-display text-white text-xs text-center transition-colors shadow-sm"
              id="play-chrono-game-btn"
            >
              Iniciar Desfaio Sincrónico
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 relative">
          {/* Header back button */}
          <button
            onClick={() => setActiveGame(null)}
            className="absolute right-6 top-6 text-xs font-bold text-slate-400 dark:text-slate-550 hover:text-slate-650"
          >
            ← Sair dos Jogos
          </button>

          {/* GAME 1 CONTENT: Match Pairs */}
          {activeGame === 'match' && (
            <div className="space-y-6" id="match-game-board">
              <div className="border-b border-slate-10s dark:border-slate-800 pb-4">
                <h3 className="font-display font-extrabold text-slate-800 dark:text-slate-150 text-sm sm:text-base flex items-center gap-2">
                  🧩 Correspondência de Conceitos
                </h3>
                <p className="text-[11px] text-slate-455 dark:text-slate-500 mt-0.5">
                  Associa um termo da esquerda a uma definição correspondente da direita!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Terms menu */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-450 uppercase tracking-widest pl-1">Variáveis / Termos</h4>
                  {shuffledTerms.map((pt) => {
                    const isMatched = matchedIds.includes(pt.id);
                    const isSelected = selectedTermId === pt.id;
                    let style = 'border-slate-200 dark:border-slate-800 hover:border-indigo-500';

                    if (isMatched) {
                      style = 'border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 opacity-60';
                    } else if (isSelected) {
                      style = 'border-indigo-650 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/10';
                    }

                    return (
                      <button
                        key={pt.id}
                        disabled={isMatched}
                        onClick={() => handleTermClick(pt.id)}
                        className={`w-full py-3.5 px-4 text-left rounded-xl border-2 text-xs font-bold transition-all ${style}`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{pt.term}</span>
                          {isMatched && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Definitions menu */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-455 uppercase tracking-widest pl-1">Aplicações Semânticas / Definições</h4>
                  {shuffledDefs.map((def) => {
                    const isMatched = matchedIds.includes(def.id);
                    const isSelected = selectedDefId === def.id;
                    let style = 'border-slate-200 dark:border-slate-800 hover:border-indigo-550';

                    if (isMatched) {
                      style = 'border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 opacity-60';
                    } else if (isSelected) {
                      style = 'border-indigo-650 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-705 dark:text-indigo-300 ring-2 ring-indigo-500/10';
                    }

                    return (
                      <button
                        key={def.id}
                        disabled={isMatched}
                        onClick={() => handleDefClick(def.id)}
                        className={`w-full p-4 text-left rounded-xl border-2 text-xs font-medium transition-all min-h-[56px] leading-relaxed ${style}`}
                      >
                        {def.def}
                      </button>
                    );
                  })}
                </div>
              </div>

              {matchedIds.length === matchPairs.length && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 border border-indigo-200 dark:border-indigo-900/40 text-center flex flex-col items-center gap-3">
                  <Star className="w-8 h-8 text-amber-500 fill-amber-500 animate-pulse" />
                  <div>
                    <h4 className="font-display font-extrabold text-slate-850 dark:text-white">Excelente Trabalho, {progress.name}!</h4>
                    <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">
                      Conseguiste associar com total sucesso todos os conceitos de História do 7.º ano. Reclama o teu bónus intelectual de +150 XP!
                    </p>
                  </div>
                  <button
                    onClick={resetMatchGame}
                    className="px-4 py-2 text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Jogar Novamente
                  </button>
                </div>
              )}
            </div>
          )}

          {/* GAME 2 CONTENT: Escape Room */}
          {activeGame === 'escape' && (
            <div className="space-y-6" id="escape-game-board">
              <div className="border-b border-indigo-100 dark:border-slate-800 pb-4">
                <h3 className="font-display font-bold text-slate-800 dark:text-slate-150 text-sm sm:text-base flex items-center gap-1.5">
                  🏰 Escape Room: Desafio das Masmorras
                </h3>
                <p className="text-[11px] text-slate-455 dark:text-slate-500 mt-0.5">
                  Estás preso nas masmorras da aula! Responde às perguntas de inteligência histórica da professora Carla Oliveira para escapar.
                </p>
              </div>

              {!escapeCompleted ? (
                <div className="space-y-5 max-w-xl mx-auto">
                  {/* Status Level Dots */}
                  <div className="flex justify-center items-center gap-2 mb-2">
                    {escapeSteps.map((s, idx) => (
                      <div
                        key={idx}
                        className={`h-2.5 rounded-full transition-all ${
                          idx === currentEscapeLevel
                            ? 'w-8 bg-indigo-600'
                            : idx < currentEscapeLevel
                            ? 'w-2.5 bg-emerald-500'
                            : 'w-2.5 bg-slate-200 dark:bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Riddle Card */}
                  <div className="p-6 rounded-2xl border-2 border-dashed border-slate-250 dark:border-slate-705 bg-slate-50 dark:bg-slate-850/50 space-y-4">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 px-2 py-0.5 rounded">
                      Enigma Nível {currentEscapeLevel + 1}
                    </span>
                    <p className="font-serif italic text-slate-850 dark:text-slate-150 text-base leading-relaxed text-center">
                      {escapeSteps[currentEscapeLevel].riddle}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {escapeSteps[currentEscapeLevel].options.map((opt, oidx) => {
                      const isChosen = selectedEscapeOpt === opt;
                      const isCorrect = opt === escapeSteps[currentEscapeLevel].correctOption;
                      let btnStyle = 'border-slate-200 dark:border-slate-800 hover:bg-slate-105';

                      if (selectedEscapeOpt) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300';
                        } else if (isChosen) {
                          btnStyle = 'border-red-500 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-350';
                        } else {
                          btnStyle = 'opacity-50 border-slate-201 dark:border-slate-800';
                        }
                      }

                      return (
                        <button
                          key={oidx}
                          disabled={!!selectedEscapeOpt}
                          onClick={() => handleEscapeAnswer(opt)}
                          className={`p-4 text-left rounded-xl border text-xs sm:text-sm font-semibold transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback panel */}
                  {escapeFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl text-center space-y-3"
                    >
                      {escapeFeedback === 'correct' ? (
                        <div className="bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 rounded-xl p-3 text-xs font-semibold">
                          🎉 Correto! Desvendaste este selo do castelo. Recebeste +100 XP!
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="bg-red-500/10 text-red-800 dark:text-red-400 border border-red-500/20 rounded-xl p-3 text-xs font-semibold">
                            ❌ Resposta errada! Queres uma dica da professora?
                          </div>
                          <p className="text-xs text-slate-400">
                            <strong>Dica da professora:</strong> {escapeSteps[currentEscapeLevel].hint}
                          </p>
                        </div>
                      )}

                      {escapeFeedback === 'correct' && (
                        <button
                          onClick={handleNextEscape}
                          className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-750 text-white rounded-xl text-xs font-semibold font-display tracking-wider flex items-center gap-1.5 mx-auto transition-all"
                        >
                          Seguinte <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 border border-indigo-200 dark:border-indigo-900/40 text-center flex flex-col items-center gap-4 max-w-md mx-auto">
                  <span className="text-5xl animate-bounce">🔑</span>
                  <div>
                    <h4 className="font-display font-black text-slate-800 dark:text-white text-lg">Castelo Livre!</h4>
                    <p className="text-xs text-slate-550 dark:text-slate-450 mt-2 leading-relaxed">
                      Conseguiste responder com perspicácia militar e académica a todos os enigmas. Escapaste com brilhantismo e ganhaste <strong className="text-emerald-600">+200 XP</strong> adicionais na tua caderneta!
                    </p>
                  </div>
                  <button
                    onClick={restartEscape}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Recomençar Sala
                  </button>
                </div>
              )}
            </div>
          )}

          {/* GAME 3 CONTENT: Chrono Items sorting */}
          {activeGame === 'chrono' && (
            <div className="space-y-6" id="chrono-game-board">
              <div className="border-b border-rose-100 dark:border-slate-800 pb-4">
                <h3 className="font-display font-bold text-slate-800 dark:text-slate-150 text-sm sm:text-base flex items-center gap-1.5">
                  ⏳ Enigma do Tempo: Desafio Cronológico
                </h3>
                <p className="text-[11px] text-slate-450 dark:text-slate-500 mt-0.5">
                  Usa os botões de cima e baixo para reordenar os eventos medievais dos mais antigos (topo) aos mais recentes (base).
                </p>
              </div>

              <div className="space-y-2.5 max-w-md mx-auto">
                {chronoItems.map((item, index) => (
                  <motion.div
                    key={item.year}
                    layout
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between text-left"
                  >
                    <div>
                      {chronoChecked && (
                        <span className="text-[10px] font-mono font-bold text-indigo-500 block mb-0.5">
                          {item.year}
                        </span>
                      )}
                      <p className="font-semibold text-slate-850 dark:text-slate-150 text-xs sm:text-sm">
                        {item.title}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <button
                        disabled={index === 0 || chronoChecked}
                        onClick={() => moveChronoItem(index, 'up')}
                        className="p-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-250 disabled:opacity-30 text-slate-650 dark:text-white"
                        title="Mover para cima"
                      >
                        ▲
                      </button>
                      <button
                        disabled={index === chronoItems.length - 1 || chronoChecked}
                        onClick={() => moveChronoItem(index, 'down')}
                        className="p-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-250 disabled:opacity-30 text-slate-650 dark:text-white"
                        title="Mover para baixo"
                      >
                        ▼
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center pt-4 max-w-md mx-auto space-y-4">
                {!chronoChecked ? (
                  <button
                    onClick={handleCheckChrono}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold font-display text-xs rounded-xl shadow-md transition-all uppercase tracking-wider"
                  >
                    Verificar Sequência Temporal
                  </button>
                ) : (
                  <div className="space-y-3">
                    {chronoSuccess ? (
                      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        🏆 Incrível! Colocaste todos os eventos na sua exata sequência histórica. A história corre-te nas veias! (+150 XP arrecadado)
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs sm:text-sm text-rose-800 dark:text-rose-400 font-semibold space-y-1">
                        <p>Oops, a sequência do tempo está desregulada!</p>
                        <p className="text-[11px] text-slate-400 font-medium">
                          Lembra-te: o Neolítico é na Pré-História; Atenas no Séc. V a.C.; Zamora no Séc. XII e Aljubarrota no Séc. XIV.
                        </p>
                      </div>
                    )}

                    <button
                      onClick={resetChrono}
                      className="px-5 py-2 hover:underline text-xs text-indigo-550 dark:text-indigo-400 font-bold"
                    >
                      Voltar a Reordenar
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Simple array shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
