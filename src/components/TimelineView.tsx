/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Flame, Sparkles, AlertCircle, Play, Scroll, 
  BookOpen, Compass, ShieldAlert, Award, Clock
} from 'lucide-react';
import { TimelineEvent, StudentProgress } from '../types';

interface TimelineViewProps {
  events: TimelineEvent[];
  progress: StudentProgress;
  addPoints: (points: number, reason: string) => void;
  fontSizeClass: string;
}

export default function TimelineView({
  events,
  progress,
  addPoints,
  fontSizeClass
}: TimelineViewProps) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [filterThemeId, setFilterThemeId] = useState<string>('all');

  const filteredEvents = filterThemeId === 'all'
    ? events
    : events.filter(e => e.themeId === filterThemeId);

  const selectedEvent = events.find(e => e.id === selectedEventId);

  const handleSelectEvent = (id: string, name: string) => {
    setSelectedEventId(id);
    const scoreKey = `timeline-view-${id}`;
    if (!progress.gameScores[scoreKey]) {
      addPoints(30, `Explorou acontecimento histórico: ${name}`);
      progress.gameScores[scoreKey] = 1;
    }
  };

  const getThemeBadgeColor = (themeId: string) => {
    switch (themeId) {
      case 'theme-1': return 'bg-amber-100 text-amber-800 dark:bg-amber-955/35 dark:text-amber-300 border border-amber-300/30';
      case 'theme-2': return 'bg-blue-105 text-blue-800 dark:bg-blue-955/35 dark:text-blue-300 border border-blue-300/30';
      case 'theme-3': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-955/35 dark:text-emerald-300 border border-emerald-300/30';
      case 'theme-4': return 'bg-rose-100 text-rose-800 dark:bg-rose-955/35 dark:text-rose-300 border border-rose-300/30';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getThemeText = (themeId: string) => {
    switch (themeId) {
      case 'theme-1': return 'Pré-História / Civilizações';
      case 'theme-2': return 'Mediterrâneo Antigo';
      case 'theme-3': return 'Cristandade e Islão';
      case 'theme-4': return 'Portugal Séc. XII-XIV';
      default: return '';
    }
  };

  const getEventIcon = (themeId: string) => {
    switch (themeId) {
      case 'theme-1': return <Flame className="w-5 h-5 text-amber-500" />;
      case 'theme-2': return <Compass className="w-5 h-5 text-blue-500" />;
      case 'theme-3': return <ShieldAlert className="w-5 h-5 text-emerald-500" />;
      case 'theme-4': return <Award className="w-5 h-5 text-rose-500" />;
      default: return <Clock className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6" id="timeline-container-main">
      {/* Intro box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h2 className="font-display font-extrabold text-slate-800 dark:text-slate-100 text-xl tracking-tight">
          ⏳ Linha do Tempo Curricular Interativa
        </h2>
        <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
          Navega cronologicamente pelos principais acontecimentos históricos do programa do 7.º ano da professora Carla Oliveira. Clica em qualquer evento para ver pormenores, imagens históricas virtuais e curiosidades!
        </p>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setFilterThemeId('all')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
              filterThemeId === 'all'
                ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-750'
            }`}
          >
            Todos os Períodos
          </button>
          <button
            onClick={() => setFilterThemeId('theme-1')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
              filterThemeId === 'theme-1'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-500/10 text-amber-750 dark:text-amber-400 hover:bg-amber-500/20'
            }`}
          >
            Tema 1: Pré-História e Civilizações
          </button>
          <button
            onClick={() => setFilterThemeId('theme-2')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
              filterThemeId === 'theme-2'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-500/10 text-blue-750 dark:text-blue-400 hover:bg-blue-500/20'
            }`}
          >
            Tema 2: Mediterrâneo e Roma
          </button>
          <button
            onClick={() => setFilterThemeId('theme-3')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
              filterThemeId === 'theme-3'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500/10 text-emerald-750 dark:text-emerald-400 hover:bg-emerald-500/20'
            }`}
          >
            Tema 3: Idade Média e Islamismo
          </button>
          <button
            onClick={() => setFilterThemeId('theme-4')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
              filterThemeId === 'theme-4'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-500/10 text-rose-750 dark:text-rose-400 hover:bg-rose-500/20'
            }`}
          >
            Tema 4: Portugal e Crise Séc. XIV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Timeline Line nodes */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden relative">
          <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-indigo-500 via-emerald-500 to-rose-500" />

          <div className="space-y-6 relative">
            {filteredEvents.map((ev, idx) => {
              const isSelected = selectedEventId === ev.id;
              
              return (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleSelectEvent(ev.id, ev.title)}
                  className={`flex gap-6 items-start cursor-pointer group rounded-2xl p-4 transition-all ${
                    isSelected 
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/20 border-l-4 border-indigo-600 pl-3' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-805 border-l-4 border-transparent'
                  }`}
                  id={`timeline-node-${ev.id}`}
                >
                  {/* Circle Indicator */}
                  <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all border ${
                    isSelected 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-350 border-slate-200 dark:border-slate-700'
                  }`}>
                    {getEventIcon(ev.themeId)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                        {ev.year}
                      </span>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md ${getThemeBadgeColor(ev.themeId)}`}>
                        {getThemeText(ev.themeId)}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
                      {ev.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected Event Details Panel */}
        <div className="lg:col-span-5 space-y-4">
          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5"
                id="timeline-detail-panel"
              >
                {/* Visual Header Illustration */}
                <div className={`h-36 rounded-2xl bg-gradient-to-br ${getThemeGradient(selectedEvent.themeId)} p-6 text-white flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute right-2 bottom-2 text-white/10">
                    <Calendar className="w-32 h-32" />
                  </div>
                  <span className="text-xs font-extrabold font-mono text-white/80 bg-black/15 px-2.5 py-1 rounded-lg w-max">
                    {selectedEvent.year}
                  </span>
                  <h3 className="font-display font-extrabold text-sm sm:text-base leading-snug drop-shadow-sm">
                    {selectedEvent.title}
                  </h3>
                </div>

                {/* Main Explanation text */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Contexto Histórico
                  </h4>
                  <p className={`text-slate-650 dark:text-slate-350 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${fontSizeClass === 'text-large' ? 'text-sm' : fontSizeClass === 'text-xlarge' ? 'text-base' : 'text-xs'}`}>
                    {selectedEvent.extendedExplanation}
                  </p>
                </div>

                {/* Curriculum Trivia block */}
                <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/10 border border-indigo-100/30 dark:border-indigo-900/20 space-y-2">
                  <h5 className="text-xs font-bold text-indigo-750 dark:text-indigo-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    Sabias que...?
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {selectedEvent.curiosity}
                  </p>
                </div>

                <div className="text-[11px] text-slate-400 font-medium text-center">
                  Garantiste <span className="text-emerald-500 font-bold">+30 pontos</span> por estudar este acontecimento!
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-205 dark:bg-slate-9003/30 dark:border-slate-800 rounded-3xl p-10 text-center text-slate-400 dark:text-slate-550 flex flex-col items-center justify-center gap-3">
                <Clock className="w-10 h-10 stroke-[1.5]" />
                <div>
                  <p className="font-display font-bold text-slate-700 dark:text-slate-300">
                    Nenhum evento selecionado
                  </p>
                  <p className="text-xs text-slate-405 dark:text-slate-500 mt-1 max-w-xs mx-auto">
                    Clica em qualquer um dos círculos ou títulos da linha do tempo à esquerda para desvendar todos os detalhes.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  function getThemeGradient(themeId: string) {
    if (themeId === 'theme-1') return 'from-amber-500 to-orange-700';
    if (themeId === 'theme-2') return 'from-blue-600 to-indigo-800';
    if (themeId === 'theme-3') return 'from-emerald-600 to-teal-850';
    return 'from-rose-600 to-red-800';
  }
}
