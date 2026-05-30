/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, BookOpen, User, Flame } from 'lucide-react';

interface WelcomeModalProps {
  onNameSubmit: (name: string) => void;
  isOpen: boolean;
}

export default function WelcomeModal({ onNameSubmit, isOpen }: WelcomeModalProps) {
  const [inputName, setInputName] = useState('');
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setStep(2);
    }
  };

  const handleFinish = () => {
    onNameSubmit(inputName.trim());
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 shadow-2xl"
          id="welcome-modal-container"
        >
          {/* Accent bar */}
          <div className="h-2 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 w-full" />

          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
                <BookOpen className="w-12 h-12 stroke-[1.5]" />
              </div>
            </div>

            {step === 1 ? (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                className="text-center"
              >
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-800 dark:text-slate-150 mb-2">
                  História - 7.º Ano
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                  Espaço educativo digital da Professora Carla Oliveira
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 mb-6 border border-slate-100 dark:border-slate-800 text-left">
                  <div className="flex gap-3">
                    <MessageSquare className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      "Olá! Bem-vindo(a) à disciplina de História do 7.º Ano. Como te chamas?"
                    </p>
                  </div>
                </div>

                <form onSubmit={handleNameSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Digita aqui o teu nome..."
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      maxLength={20}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 outline-none focus:border-indigo-500 bg-slate-50 dark:bg-slate-800 dark:text-white transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      id="welcome-name-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold rounded-2xl shadow-lg shadow-indigo-600/20 transition-all font-display tracking-wide flex items-center justify-center gap-2"
                    id="welcome-submit-btn"
                  >
                    Entrar na Aula
                    <Sparkles className="w-4 h-4 fill-white" />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  Inscrição Efetuada com Sucesso
                </div>

                <h2 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-150 mb-4">
                  Olá, <span className="text-indigo-600 dark:text-indigo-400">{inputName}</span>!
                </h2>

                <div className="bg-indigo-50/70 dark:bg-indigo-950/20 rounded-2xl p-5 mb-8 border border-indigo-100/30 dark:border-indigo-900/30 text-left">
                  <div className="flex gap-3">
                    <span className="text-2xl">👩‍🏫</span>
                    <div>
                      <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                        "Olá, <strong className="text-slate-950 dark:text-white">{inputName}</strong>! Bem-vindo(a) às aulas de História da professora Carla Oliveira."
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        Prepara-te para uma viagem fascinante desde a Pré-História até à Revolução de 1383! Vais amealhar pontos, colecionar medalhas e testar o teu engenho.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold rounded-2xl shadow-lg shadow-indigo-600/20 transition-all font-display tracking-wider"
                  id="welcome-start-btn"
                >
                  Vamos Começar!
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
