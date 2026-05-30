/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, HelpCircle, AlertCircle, Share2, Eye } from 'lucide-react';
import { Curiosity, StudentProgress } from '../types';

interface CuriosidadesViewProps {
  curiosities: Curiosity[];
  progress: StudentProgress;
  addPoints: (points: number, reason: string) => void;
}

export default function CuriosidadesView({
  curiosities,
  progress,
  addPoints
}: CuriosidadesViewProps) {
  const [readCuriosities, setReadCuriosities] = useState<string[]>([]);

  const handleReadFact = (id: string, name: string) => {
    if (readCuriosities.includes(id)) return;
    setReadCuriosities(prev => [...prev, id]);

    // Reward minor points for reading academic curiosity
    const trackingKey = `curiosidades-read-${id}`;
    if (!progress.gameScores[trackingKey]) {
      addPoints(40, `Leu a curiosidade académica: ${name}`);
      progress.gameScores[trackingKey] = 1;
    }
  };

  return (
    <div className="space-y-6" id="curiosidades-main-viewer">
      {/* Intro hero */}
      <div className="bg-white dark:bg-slate-905 border border-slate-205 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h2 className="font-display font-black text-slate-800 dark:text-slate-100 text-xl tracking-tight flex items-center gap-2">
          💡 Sabias que...? - Curiosidades da História
        </h2>
        <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
          Longe das datas aborrecidas, a História é feita de seres humanos reais, contrariedades divertidas e invenções fascinantes. Clica nas fichas abaixo e amealha +40 XP por cada facto descoberto.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="curiosities-cards-layout">
        {curiosities.map((item, idx) => {
          const isRead = readCuriosities.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-4 shadow-sm bg-white dark:bg-slate-900 ${
                isRead
                  ? 'border-indigo-650 bg-indigo-50/20 dark:border-indigo-900/40 dark:bg-slate-900/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {/* Decorative badge */}
                  <span className="text-[10px] uppercase font-mono font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 px-2.5 py-1 rounded-md">
                    Tema {idx + 1} • Trivia Curiosa
                  </span>
                  <span className="text-xl">✨</span>
                </div>

                <h3 className="font-display font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-450 font-semibold italic">
                  "Facto: {item.fact}"
                </p>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-805 border border-slate-150 dark:border-slate-800 text-xs text-slate-650 dark:text-slate-350 leading-relaxed">
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400">Sabias que...?</span> {item.didYouKnow}
                </div>
              </div>

              {!isRead ? (
                <button
                  onClick={() => handleReadFact(item.id, item.title)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold font-display text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Marcar Como Lido (+40 XP)
                </button>
              ) : (
                <div className="text-center font-semibold text-emerald-600 text-[11px] py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/15">
                  ✓ Descoberto por {progress.name}!
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
