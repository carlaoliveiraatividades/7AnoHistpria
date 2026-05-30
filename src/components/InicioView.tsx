/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Compass, Trophy, Star, Activity, ArrowRight, User } from 'lucide-react';
import { StudentProgress } from '../types';

interface InicioViewProps {
  progress: StudentProgress;
  setTab: (tab: string) => void;
  fontSizeClass: string;
}

export default function InicioView({ progress, setTab, fontSizeClass }: InicioViewProps) {
  const currentLevel = Math.floor(progress.points / 400) + 1;

  const getHeadingSizeClass = () => {
    if (fontSizeClass === 'text-large') return 'text-3xl';
    if (fontSizeClass === 'text-xlarge') return 'text-4xl';
    return 'text-2xl sm:text-3xl';
  };

  const getSubheadingSizeClass = () => {
    if (fontSizeClass === 'text-large') return 'text-xl';
    if (fontSizeClass === 'text-xlarge') return 'text-2xl';
    return 'text-lg';
  };

  return (
    <div className="space-y-6" id="inicio-tab-wrapper">
      {/* Welcome Board - Clean Minimalism Elegant Hero */}
      <div className="relative bg-indigo-600 text-white p-6 sm:p-8 rounded-2xl overflow-hidden shadow-sm space-y-6">
        <div className="relative z-10 space-y-3 max-w-2xl text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-white/10 text-white border border-white/20">
            <Star className="w-3 h-3 fill-current text-amber-300" />
            Disciplina Obrigatória do 7.º Ano
          </span>
          <h1 className={`${getHeadingSizeClass()} font-display font-black tracking-tight text-white`}>
            Olá, <span className="text-amber-300">{progress.name}</span>!
          </h1>
          <p className="text-sm sm:text-base text-indigo-100 leading-relaxed font-sans max-w-2xl">
            Bem-vindo(a) ao teu portal oficial de História. Aqui desvendas o passado com as lições e os desafios complementares criados especialmente pela tua professora Carla Oliveira!
          </p>
        </div>

        {/* Quick stats mini ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-indigo-700/40 backdrop-blur-xs p-4 rounded-xl border border-indigo-500/20 relative z-10">
          <div className="space-y-0.5 text-left">
            <span className="text-[9px] uppercase font-bold text-indigo-200 block tracking-widest font-mono">Nome do Aluno</span>
            <span className="text-xs sm:text-sm font-extrabold text-white">{progress.name}</span>
          </div>

          <div className="space-y-0.5 text-left">
            <span className="text-[9px] uppercase font-bold text-indigo-200 block tracking-widest font-mono">Nível</span>
            <span className="text-xs sm:text-sm font-extrabold text-amber-300 font-mono">Lvl {currentLevel}</span>
          </div>

          <div className="space-y-0.5 text-left">
            <span className="text-[9px] uppercase font-bold text-indigo-200 block tracking-widest font-mono">Pontos XP</span>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-300 font-mono">{progress.points} XP</span>
          </div>

          <div className="space-y-0.5 text-left">
            <span className="text-[9px] uppercase font-bold text-indigo-200 block tracking-widest font-mono">Docente</span>
            <span className="text-xs sm:text-sm font-extrabold text-white italic">Carla Oliveira</span>
          </div>
        </div>

        {/* Abstract Graphic Design Elements from Clean Minimalism */}
        <div className="absolute right-[-40px] bottom-[-40px] w-64 h-64 bg-indigo-500 rounded-full opacity-40 select-none pointer-events-none"></div>
        <div className="absolute right-[40px] top-[-30px] w-32 h-32 bg-indigo-400 rounded-full opacity-20 select-none pointer-events-none"></div>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: Goals & Quick shortcuts */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shortcuts */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className={`${getSubheadingSizeClass()} font-display font-bold text-slate-800 dark:text-slate-100`}>
              Atalhos de Aprendizagem
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setTab('conteudos')}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-800 hover:bg-slate-100/60 dark:hover:bg-slate-800/40 text-left transition-colors flex flex-col justify-between h-32"
              >
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-455 w-max">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-xs block text-slate-805 dark:text-slate-205">Ver Lições</span>
                  <span className="text-[10px] text-slate-400 mt-1 block">Reler o programa</span>
                </div>
              </button>

              <button
                onClick={() => setTab('linha-tempo')}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-800 hover:bg-slate-100/60 dark:hover:bg-slate-805/40 text-left transition-colors flex flex-col justify-between h-32"
              >
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-455 w-max">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-xs block text-slate-805 dark:text-slate-205">Linha do Tempo</span>
                  <span className="text-[10px] text-slate-400 mt-1 block">Navegar no tempo</span>
                </div>
              </button>

              <button
                onClick={() => setTab('jogos')}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-800 hover:bg-slate-100/60 dark:hover:bg-slate-805/40 text-left transition-colors flex flex-col justify-between h-32"
              >
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-455 w-max">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-xs block text-slate-805 dark:text-slate-205">Mini-Jogos</span>
                  <span className="text-[10px] text-slate-400 mt-1 block">Arrecadar medalhas</span>
                </div>
              </button>
            </div>
          </div>

          {/* Curriculum competencies guidelines list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className={`${getSubheadingSizeClass()} font-display font-bold text-slate-800 dark:text-slate-100`}>
              Metas Pedagógicas Obrigatórias
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              De acordo com as Aprendizagens Essenciais DGE, cada aluno deve consolidar nesta disciplina as seguintes competências:
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">Ler e interpretar vestígios materiais e escritos</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Diferenciar fontes primárias de secundárias e formular hipóteses arqueológicas.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">Compreender a evolução social e de cidades</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Explicar conceitos chaves como sedentarização, democracia, romanização e vassalagem.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">Formular uma consciência patriótica e cívica lusa</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Reconhecer as crises demográficas, o Tratado de Zamora e Aljubarrota (1385) na definição nacional.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Teacher Carla Message card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <span className="text-3xl">👩‍🏫</span>
            <div>
              <h4 className="font-display font-black text-slate-800 dark:text-white text-sm sm:text-base leading-tight">Professora Carla Oliveira</h4>
              <p className="text-[10px] text-slate-450 uppercase font-mono tracking-widest font-black">Docente de História do 7.º Ano</p>
            </div>
          </div>

          <div className="space-y-4 text-left">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase block">
              Mensagem de Boas-Vindas
            </span>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 italic leading-relaxed">
              «Olhar para o passado não é apenas memorizar das datas de reis. É investigar as razões que moldam a nossa língua, os nossos monumentos e a própria liberdade que usufruímos.»
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Prepara-te bem, responde às reflexões críticas de todas as lições e avança com dinamismo para receberes o teu **Certificado de Aproveitamento Digital**. Estamos juntos nesta exploração!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/20 space-y-2 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-amber-800 dark:text-amber-400 block">🎯 Meta do Mês</span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Completa a lição do **Tema 3 (Cristandade e Islão)** e ganha a medalha "Cavaleiro da Reconquista" ao ultrapassar 800 XP!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
