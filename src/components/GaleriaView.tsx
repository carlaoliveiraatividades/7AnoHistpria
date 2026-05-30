/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Compass, Award, ExternalLink, Image } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  period: string;
  description: string;
  emoji: string;
  bgColor: string;
  details: string;
}

export default function GaleriaView() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Pinturas Rupestres do Vale do Côa',
      period: 'Paleolítico (c. 22 000 a.C.)',
      description: 'O maior museu arqueológico de gravuras paleolíticas ao ar livre do mundo, em Portugal.',
      emoji: '🐗',
      bgColor: 'from-amber-600 to-amber-800',
      details: 'Estendendo-se por dezenas de quilómetros nas encostas do rio Côa, estas gravuras de xisto foram detetadas na década de 1990 e salvas de uma barragem. Demonstram o bando paleolítico a desenhar cavalos e auroques de forma fluida sem habitação fixa.'
    },
    {
      id: 'gal-2',
      title: 'Templo Partenon na Acrópole',
      period: 'Atenas, Grécia (Séc. V a.C.)',
      description: 'A joia monumental da arquitetura clássica dedicada à deusa Atena.',
      emoji: '🏛️',
      bgColor: 'from-blue-600 to-indigo-800',
      details: 'Erigido pelo estadista Péricles e desenhado por Fídias, o Partenon usa proporções matemáticas da razão dourada. Todas as suas colunas têm uma inclinação quase invisível para corrigir ilusões óticas do olho humano e aparentar total simetria.'
    },
    {
      id: 'gal-3',
      title: 'Aqueduto Romano de Segóvia',
      period: 'Império Romano (Séc. I d.C.)',
      description: 'O ex-líbris do avanço de engenharia civil urbana e romanização.',
      emoji: '🌉',
      bgColor: 'from-sky-605 to-blue-700',
      details: 'Construído sem um único pingo de argamassa ou cimento, mantendo blocos de granito hercúleos unidos puramente pela gravidade e pelo desenho perfeito de arcos quebrados duplos. Levava água fresca das serras para abastecer banhos públicos.'
    },
    {
      id: 'gal-4',
      title: 'Mosteiro de Alcobaça',
      period: 'Idade Média (Séc. XII d.C.)',
      description: 'O expoente máximo da arte gótica em Portugal fundado por Afonso Henriques.',
      emoji: '⛪',
      bgColor: 'from-emerald-600 to-teal-800',
      details: 'Doado à Ordem de Cister pelo primeiro rei de Portugal como pagamento por milagres de vitória militar em Santarém. O mosteiro possui uma igreja gigante de três naves esguias e escuras de transição românica para gótico luminoso.'
    },
    {
      id: 'gal-5',
      title: 'A Espada Lobeira de D. Afonso Henriques',
      period: 'Reconquista Cristã (Séc. XII)',
      description: 'O mítico e pesado gládio do fundador de Portugal para abrir fendas nas defesas.',
      emoji: '⚔️',
      bgColor: 'from-red-650 to-orange-700',
      details: 'Símbolo da fundação da nacionalidade, pesava várias vezes mais que gládios comuns de cavaleiros do norte. Era utilizada tanto para combater no lombo de cavalos pesados como para rituais solenes de juramentos de vassalagem.'
    },
    {
      id: 'gal-6',
      title: 'Estudo Geral / Universidade de Coimbra',
      period: 'Baixa Idade Média (1290 d.C.)',
      description: 'Criada por D. Dinis, é uma das academias mais antigas em funcionamento do mundo.',
      emoji: '📜',
      bgColor: 'from-violet-600 to-purple-800',
      details: 'Fundada originalmente em Lisboa sob autorização papal, foi deslocada para Coimbra definitivamente à beira-rio. Promoveu o estudo laico do direito, poética lírica e medicina, alterando a exclusividade clériga das ciências.'
    }
  ];

  return (
    <div className="space-y-6" id="galeria-historica-main">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h2 className="font-display font-extrabold text-slate-800 dark:text-slate-100 text-xl tracking-tight flex items-center gap-2">
          🏛️ Galeria Histórica de Monumentos & Objetos
        </h2>
        <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
          Navega por esta exposição virtual e clica em qualquer item para expandir as explicações académicas fornecidas pela professora Carla Oliveira.
        </p>
      </div>

      {/* Grid gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-grid-wrapper">
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="overflow-hidden bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer group hover:shadow-md transition-all"
            whileHover={{ y: -4 }}
          >
            {/* Visual Cover header */}
            <div className={`h-40 bg-gradient-to-br ${item.bgColor} flex items-center justify-center text-7xl select-none group-hover:scale-[1.03] transition-transform`}>
              {item.emoji}
            </div>
            
            <div className="p-5 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-indigo-600 dark:text-indigo-400">
                {item.period}
              </span>
              <h3 className="font-display font-bold text-slate-850 dark:text-slate-100 text-sm sm:text-base leading-snug group-hover:text-indigo-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-450 line-clamp-2">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Dialog for large image */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative"
              id="gallery-modal-dialog"
            >
              {/* Cover Banner */}
              <div className={`h-48 bg-gradient-to-br ${selectedItem.bgColor} flex items-center justify-center text-8xl relative select-none`}>
                {selectedItem.emoji}
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-550 dark:text-indigo-400 uppercase tracking-widest block">
                    {selectedItem.period}
                  </span>
                  <h3 className="font-display font-black text-slate-850 dark:text-slate-100 text-lg sm:text-xl mt-1 leading-snug">
                    {selectedItem.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed whitespace-pre-line">
                  {selectedItem.details}
                </p>

                <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white font-semibold font-display text-xs"
                  >
                    Fechar Exposição
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
