/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Type, Sun, Moon, HelpCircle } from 'lucide-react';

interface AcessibilidadePanelProps {
  fontSizeClass: 'text-normal' | 'text-large' | 'text-xlarge';
  setFontSizeClass: (fc: 'text-normal' | 'text-large' | 'text-xlarge') => void;
  darkMode: boolean;
  setDarkMode: (dm: boolean) => void;
}

export default function AcessibilidadePanel({
  fontSizeClass,
  setFontSizeClass,
  darkMode,
  setDarkMode
}: AcessibilidadePanelProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechEnabled(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleReadScreen = () => {
    if (!speechEnabled) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Capture main text currently readable
    const readableElements = document.querySelectorAll('main p, main h1, main h2, main h3, main li');
    const texts: string[] = [];
    readableElements.forEach((el) => {
      if (el.textContent && el.textContent.trim().length > 10) {
        texts.push(el.textContent.trim());
      }
    });

    const fullText = texts.slice(0, 4).join('. '); // Avoid overwhelming buffer

    if (fullText) {
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'pt-PT';
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-inner">
      {/* Font scale buttons */}
      <div className="flex items-center gap-1 border-r border-slate-350 dark:border-slate-600/60 pr-2">
        <Type className="w-3.5 h-3.5 text-slate-500 mr-1" />
        <button
          onClick={() => setFontSizeClass('text-normal')}
          className={`px-2 py-1 text-xs rounded-md transition-all font-semibold ${
            fontSizeClass === 'text-normal'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-705'
          }`}
          title="Tamanho de letra normal"
        >
          A
        </button>
        <button
          onClick={() => setFontSizeClass('text-large')}
          className={`px-2.5 py-1 text-sm rounded-md transition-all font-semibold ${
            fontSizeClass === 'text-large'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-705'
          }`}
          title="Tamanho de letra grande"
        >
          A+
        </button>
        <button
          onClick={() => setFontSizeClass('text-xlarge')}
          className={`px-3 py-1 text-base rounded-md transition-all font-semibold ${
            fontSizeClass === 'text-xlarge'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-705'
          }`}
          title="Tamanho de letra extra grande"
        >
          A++
        </button>
      </div>

      {/* Voice read aloud */}
      {speechEnabled && (
        <button
          onClick={handleReadScreen}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
            isPlaying
              ? 'bg-red-500 text-white animate-pulse'
              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/5'
          }`}
          title="Ler conteúdo da página em voz alta"
        >
          {isPlaying ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>Parar Voz</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-indigo-505 dark:text-indigo-400" />
              <span>Ouvir Texto</span>
            </>
          )}
        </button>
      )}

      {/* Theme Toggle */}
      <button
        onClick={toggleDarkMode}
        className="p-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-201 dark:hover:bg-white/5 rounded-xl transition-all"
        title="Alterar modo escuro / claro"
        id="darkmode-toggle"
      >
        {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
      </button>
    </div>
  );
}
