/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, BookOpen, Scale, Landmark, ChevronRight, CheckCircle, 
  HelpCircle, Eye, RefreshCw, PenTool, Sparkles 
} from 'lucide-react';
import { HistoricalSource, StudentProgress } from '../types';

interface FontesViewProps {
  sources: HistoricalSource[];
  progress: StudentProgress;
  addPoints: (points: number, reason: string) => void;
  fontSizeClass: string;
}

export default function FontesView({
  sources,
  progress,
  addPoints,
  fontSizeClass
}: FontesViewProps) {
  const [selectedSourceId, setSelectedSourceId] = useState<string>(sources[0]?.id || '');
  const [studentNotes, setStudentNotes] = useState<Record<string, string>>({});
  const [showExpectedAnswers, setShowExpectedAnswers] = useState<Record<string, boolean>>({});

  const source = sources.find(s => s.id === selectedSourceId) || sources[0];

  const handleNoteChange = (sourceId: string, qidx: number, value: string) => {
    setStudentNotes(prev => ({
      ...prev,
      [`${sourceId}-${qidx}`]: value
    }));
  };

  const handleSubmitAnalysis = (sourceId: string, qidx: number) => {
    const key = `${sourceId}-${qidx}`;
    const value = studentNotes[key];
    if (!value || !value.trim()) return;

    // Show expected answer
    setShowExpectedAnswers(prev => ({
      ...prev,
      [key]: true
    }));

    // Reward points for analysis note submission
    const trackingKey = `fontes-${sourceId}-${qidx}`;
    if (!progress.gameScores[trackingKey]) {
      addPoints(100, `Análise de Fonte Histórica: ${source.title} (P. ${qidx + 1})`);
      progress.gameScores[trackingKey] = 1;
    }
  };

  const getSourceIcon = (srcType: string) => {
    switch (srcType) {
      case 'text': return <FileText className="w-5 h-5 text-emerald-500" />;
      case 'image': return <Landmark className="w-5 h-5 text-indigo-500" />;
      default: return <Landmark className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6" id="fontes-analysis-main">
      {/* Intro Hero */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h2 className="font-display font-extrabold text-slate-800 dark:text-slate-150 text-xl tracking-tight flex items-center gap-2">
          🔍 Oficina do Historiador - Fontes Históricas
        </h2>
        <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
          Nesta secção, tu és o historiador! Examina atentamente monumentos, relatos escritos e gravuras antigas, responde às perguntas orientadoras e compara depois com as conclusões esperadas do programa de História.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Source selector menu */}
        <div className="lg:col-span-4 space-y-2">
          {sources.map((src) => {
            const isSelected = src.id === selectedSourceId;
            return (
              <button
                key={src.id}
                onClick={() => {
                  setSelectedSourceId(src.id);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'border-indigo-650 bg-indigo-50/70 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/10'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-805 text-slate-705 dark:text-slate-400'
                }`}
                id={`btn-source-${src.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                    {getSourceIcon(src.type)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs sm:text-sm line-clamp-1">{src.title}</h4>
                    <p className="text-[10px] text-slate-400 font-medium font-mono tracking-wider uppercase mt-0.5">{src.reference.split('-')[1]?.trim() || src.reference}</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Source panel */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {source && (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
                id="source-card-inspect"
              >
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-indigo-500 py-1 px-2.5 bg-indigo-50 dark:bg-indigo-950/20 rounded-md">
                      Fonte {source.type === 'text' ? 'Escrita' : 'Iconográfica / Arqueológica'}
                    </span>
                    <h3 className="font-display font-black text-slate-800 dark:text-slate-100 text-lg sm:text-xl mt-2">
                      {source.title}
                    </h3>
                  </div>
                  <div className="text-right text-xs bg-slate-50 dark:bg-slate-805/40 px-3.5 py-1.5 rounded-xl border border-slate-200/40 dark:border-slate-800/20 text-slate-500 dark:text-slate-400 font-mono">
                    {source.reference}
                  </div>
                </div>

                {/* Main Visual descriptor/Text block */}
                {source.type === 'text' && source.contentHtml ? (
                  <div className="p-6 rounded-2xl bg-amber-500/5 dark:bg-slate-805 border-l-4 border-amber-500 text-slate-800 dark:text-slate-100 italic relative overflow-hidden text-xs sm:text-sm leading-relaxed" id="source-text-block">
                    <span className="absolute -right-6 -bottom-6 text-slate-200/50 dark:text-slate-800/40 font-serif text-8xl pointer-events-none">“</span>
                    <p className="relative z-10">{source.contentHtml}</p>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-indigo-100/10 dark:from-slate-850 dark:to-slate-850 border border-dashed border-slate-250 dark:border-slate-750 flex flex-col items-center justify-center gap-4 text-center">
                    {/* Simulated Museum Artifact styling */}
                    <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-slate-150 dark:border-slate-800 text-indigo-650 max-w-sm">
                      <div className="text-4xl mb-2">🏛️</div>
                      <p className="text-xs font-mono font-bold text-indigo-500 mb-1">[ RECONSTITUIÇÃO VIRTUAL ]</p>
                      <p className="text-xs text-slate-650 dark:text-slate-300 italic">
                        "{source.visualAsset}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Source Description commentary */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-450 uppercase tracking-widest block">Comentário Histórico</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {source.description}
                  </p>
                </div>

                {/* Guided interactive questions */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-6">
                  <h4 className="font-display font-extrabold text-slate-800 dark:text-slate-250 text-sm tracking-tight flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-indigo-500" />
                    Análise Orientada para Alunos
                  </h4>

                  <div className="space-y-6">
                    {source.questions.map((q, qidx) => {
                      const noteKey = `${source.id}-${qidx}`;
                      const noteText = studentNotes[noteKey] || '';
                      const isRevealed = showExpectedAnswers[noteKey];

                      return (
                        <div key={qidx} className="space-y-3">
                          <p className="font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                            {q}
                          </p>

                          <textarea
                            rows={3}
                            disabled={isRevealed}
                            value={noteText}
                            onChange={(e) => handleNoteChange(source.id, qidx, e.target.value)}
                            placeholder="Digita aqui a tua observação crítica para este vestígio..."
                            className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-indigo-550 outline-none text-slate-750 dark:text-white"
                          />

                          {!isRevealed ? (
                            <button
                              onClick={() => handleSubmitAnalysis(source.id, qidx)}
                              disabled={!noteText.trim()}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Submeter e Comparar com a Resposta Curricular
                            </button>
                          ) : (
                            <div className="space-y-2">
                              <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
                                <CheckCircle className="w-4 h-4" />
                                Resposta submetida com sucesso! Ganhaste +100 XP
                              </div>
                              <div className="p-4 bg-slate-50 dark:bg-slate-805 rounded-xl border border-slate-150 dark:border-slate-800 space-y-1.5 text-xs">
                                <span className="font-extrabold text-indigo-600 dark:text-indigo-400">Resposta Esperada do Programa:</span>
                                <p className="text-slate-550 dark:text-slate-400 italic">
                                  {source.suggestedAnswers[qidx]}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
