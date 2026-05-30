/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Trophy, Award, Flame, CheckCircle, Lock, Star,
  BookOpen, HelpCircle, Activity, Calendar, Compass, RefreshCw
} from 'lucide-react';
import { StudentProgress, Badge } from '../types';

interface ProgressoViewProps {
  progress: StudentProgress;
  badges: Badge[];
  themesCount: number;
  resetProgress: () => void;
  fontSizeClass: string;
}

export default function ProgressoView({
  progress,
  badges,
  themesCount,
  resetProgress,
  fontSizeClass
}: ProgressoViewProps) {
  // Calculate Level
  const currentLevel = Math.floor(progress.points / 400) + 1;
  const pointsToNextLevel = 400 - (progress.points % 400);
  const levelProgressPercent = ((progress.points % 400) / 400) * 100;

  const resolvedQuizzesCount = progress.completedThemes.length;
  const analyzedSourcesCount = Object.keys(progress.gameScores).filter(k => k.startsWith('fontes-')).length;

  return (
    <div className="space-y-6" id="progress-tab-wrapper">
      {/* Level Card banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* BIG AVATAR RING */}
        <div className="md:col-span-4 flex flex-col items-center text-center gap-2">
          <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-rose-500 to-amber-500 p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex flex-col items-center justify-center relative">
              <span className="text-4xl">🤴</span>
              <span className="absolute bottom-1 right-1 bg-indigo-600 text-white font-mono font-extrabold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md">
                {currentLevel}
              </span>
            </div>
          </div>
          <div>
            <h3 className="font-display font-extrabold text-slate-850 dark:text-slate-100 text-base sm:text-lg">
              {progress.name}
            </h3>
            <p className="text-[11px] font-bold text-indigo-550 dark:text-indigo-400 uppercase tracking-widest font-mono">
              Nível {currentLevel} • Historiador
            </p>
          </div>
        </div>

        {/* PROGRESS BARS */}
        <div className="md:col-span-8 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-end text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400">Pontuação Acumulada (XP)</span>
              <span className="text-indigo-650 dark:text-indigo-400 font-mono font-extrabold">
                {progress.points} XP
              </span>
            </div>
            
            {/* Level progress tracker */}
            <div className="h-4 bg-slate-100 dark:bg-slate-805 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelProgressPercent}%` }}
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-indigo-600 to-rose-500"
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>Nível {currentLevel}</span>
              <span>Faltam {pointsToNextLevel} XP para o Nível {currentLevel + 1}</span>
            </div>
          </div>

          {/* Core numerical stats in grid */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-805/40 text-center border border-slate-100 dark:border-slate-800">
              <span className="text-lg block">📚</span>
              <span className="text-[10px] text-slate-400 block mt-1 uppercase font-bold tracking-wider">Lições Lidas</span>
              <span className="font-display font-black text-slate-800 dark:text-white text-sm">
                {progress.completedThemes.length} / {themesCount}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-805/40 text-center border border-slate-105 dark:border-slate-800">
              <span className="text-lg block">🔍</span>
              <span className="text-[10px] text-slate-400 block mt-1 uppercase font-bold tracking-wider">Fontes Analisadas</span>
              <span className="font-display font-black text-slate-800 dark:text-white text-sm">
                {analyzedSourcesCount}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-805/40 text-center border border-slate-105 dark:border-slate-800">
              <span className="text-lg block">📑</span>
              <span className="text-[10px] text-slate-400 block mt-1 uppercase font-bold tracking-wider">Exame Final</span>
              <span className="font-display font-black text-slate-800 dark:text-white text-sm">
                {progress.completedFinalQuiz ? 'Aprovado' : 'Por Realizar'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MEDALS AND BADGES BOARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-850 pb-4">
          <h3 className="font-display font-black text-slate-800 dark:text-slate-100 text-base sm:text-lg flex items-center gap-1.5">
            <Trophy className="w-5 h-5 text-amber-500" />
            Caderneta de Medalhas e Distintivos Académicos
          </h3>
          <p className="text-xs text-slate-450 dark:text-slate-400 mt-0.5">
            Ganha medalhas superando marcos de pontuação ao ler as lições de história, resolver os quizzes e desvendar os mini-jogos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="badges-grid-container">
          {badges.map((b) => {
            const isUnlocked = progress.points >= b.unlockedAtPoints;

            return (
              <motion.div
                key={b.id}
                className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3 relative overflow-hidden ${
                  isUnlocked
                    ? b.className
                    : 'bg-slate-50/50 border-slate-200 text-slate-400/80 dark:bg-slate-850 dark:border-slate-800/60 dark:text-slate-600'
                }`}
                whileHover={isUnlocked ? { scale: 1.02 } : {}}
              >
                <div className={`p-2 rounded-xl shrink-0 ${
                  isUnlocked 
                    ? 'bg-white/80 dark:bg-black/15 shadow-sm text-current' 
                    : 'bg-slate-150 text-slate-350 dark:bg-slate-800 dark:text-slate-700'
                }`}>
                  <Award className="w-6 h-6 stroke-[1.5]" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-display font-bold text-xs sm:text-sm">
                    {b.title}
                  </h4>
                  <p className="text-[10px] leading-relaxed opacity-90 font-medium">
                    {b.description}
                  </p>
                  {!isUnlocked && (
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-slate-400 font-mono tracking-wide uppercase">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>{b.unlockedAtPoints} XP necessário</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CURRICULUM CHECKLIST */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <h3 className="font-display font-black text-slate-800 dark:text-slate-100 text-sm sm:text-base">
            📋 Domínio de Competências do Programa Escolar (7.º Ano)
          </h3>
          <p className="text-xs text-slate-450 dark:text-slate-500 mt-0.5">
            Monitoriza aqui as tuas Aprendizagens Essenciais recomendadas pela professora Carla Oliveira:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-250/10 space-y-3">
            <h4 className="font-bold text-amber-705 dark:text-amber-400 text-xs sm:text-sm flex items-center gap-1.5 uppercase font-mono">
              <Star className="w-4 h-4 fill-current text-amber-500" />
              Tema 1 & 2
            </h4>
            <ul className="space-y-2 text-xs text-slate-650 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle className={`w-4 h-4 shrink-0 stroke-[2] mt-0.5 ${progress.completedThemes.includes('theme-1') ? 'text-emerald-500' : 'text-slate-300'}`} />
                <span>Explicar a passagem do Paleolítico ao Neolítico.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className={`w-4 h-4 shrink-0 stroke-[2] mt-0.5 ${progress.completedThemes.includes('theme-1') ? 'text-emerald-500' : 'text-slate-300'}`} />
                <span>Identificar as primeiras civilizações dos grandes rios.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className={`w-4 h-4 shrink-0 stroke-[2] mt-0.5 ${progress.completedThemes.includes('theme-2') ? 'text-emerald-500' : 'text-slate-300'}`} />
                <span>Explicar a limitação da cidadania na Grécia Antiga.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className={`w-4 h-4 shrink-0 stroke-[2] mt-0.5 ${progress.completedThemes.includes('theme-2') ? 'text-emerald-500' : 'text-slate-300'}`} />
                <span>Compreender a difusão e expansão do Cristianismo.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-250/10 space-y-3">
            <h4 className="font-bold text-rose-705 dark:text-rose-400 text-xs sm:text-sm flex items-center gap-1.5 uppercase font-mono">
              <Star className="w-4 h-4 fill-current text-rose-500" />
              Tema 3 & 4
            </h4>
            <ul className="space-y-2 text-xs text-slate-650 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle className={`w-4 h-4 shrink-0 stroke-[2] mt-0.5 ${progress.completedThemes.includes('theme-3') ? 'text-emerald-500' : 'text-slate-303'}`} />
                <span>Mapear a invasão bárbara e a fragmentação do Império Romano.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className={`w-4 h-4 shrink-0 stroke-[2] mt-0.5 ${progress.completedThemes.includes('theme-3') ? 'text-emerald-500' : 'text-slate-303'}`} />
                <span>Descrever a sociedade tripartida do feudalismo europeu.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className={`w-4 h-4 shrink-0 stroke-[2] mt-0.5 ${progress.completedThemes.includes('theme-3') ? 'text-emerald-500' : 'text-slate-303'}`} />
                <span>Analisar a Convenção de Zamora e o Manifesto pontifício.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className={`w-4 h-4 shrink-0 stroke-[2] mt-0.5 ${progress.completedThemes.includes('theme-4') ? 'text-emerald-500' : 'text-slate-303'}`} />
                <span>Análise de Peste Negra, cortes de Leiria e crise de 1385.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Restart progress reset widget */}
      <div className="pt-6 text-center border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={resetProgress}
          className="text-xs text-slate-450 hover:text-red-500 transition-colors font-semibold"
        >
          Limpar os Meus Dados Escolares e Voltar a Começar
        </button>
      </div>
    </div>
  );
}
