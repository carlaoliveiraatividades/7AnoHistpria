/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, RefreshCw, CheckCircle2, Shield, Flame, Compass, 
  Crown, Landmark, Printer, Check, Play, AlertCircle, ArrowRight 
} from 'lucide-react';
import { StudentProgress } from '../types';

interface QuizFinalProps {
  progress: StudentProgress;
  addPoints: (points: number, reason: string) => void;
  unlockBadge: (badgeId: string) => void;
}

interface FinalQuestion {
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

export default function QuizFinal({
  progress,
  addPoints,
  unlockBadge
}: QuizFinalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const finalQuestions: FinalQuestion[] = [
    {
      question: 'No Paleolítico, os grupos humanos tinham uma economia recoletora. Como adquiriam alimentos?',
      options: [
        'Através do comércio marítimo global com a Flandres.',
        'Semeando cereais nos povoados permanentes de pastagem.',
        'Através da recolha de frutos espontâneos, da caça e da pesca.',
        'Cobrando impostos feudais rústicos aos camponeses.'
      ],
      correctIdx: 2,
      explanation: 'No Paleolítico o ser humano era recoletor de recursos espontâneos do meio ambiente de sobrevivência.'
    },
    {
      question: 'Que grande inovação material carateriza o período do Neolítico tecnológico?',
      options: [
        'O uso generalizado da internet de satélite.',
        'A invenção da pedra polida e transição para agricultura.',
        'A escrita hieroglífica desenhada em dinossauros.'
      ],
      correctIdx: 1,
      explanation: 'Neolítico significa "nova pedra" (ou pedra polida), caracterizando-se pela agricultura e habitações permanentes.'
    },
    {
      question: 'A invenção da escrita (cuneiforme e hieroglífica) foi catalisada por que necessidade?',
      options: [
        'Registo de colheitas, gado e impostos nas primeiras civilizações fluviais.',
        'Rituais de pintura nas cavernas do Paleolítico Superior.',
        'Criação de cantigas de amor na Universidade de Coimbra.'
      ],
      correctIdx: 0,
      explanation: 'Sociedades complexas exigiam mecanismos de arquivo, impostos de colheitas e canais hidráulicos administados.'
    },
    {
      question: 'Quem constituía os cidadãos na democracia de Atenas no Séc. V a.C.?',
      options: [
        'Todas as pessoas vivas, incluindo as mulheres livres e os escravos.',
        'Apenas homens livres, maiores de idade, filhos de pais atenienses.',
        'Os metecos vindos da Ásia Menor e filósofos de Esparta.'
      ],
      correctIdx: 1,
      explanation: 'A cidadania era restrita aos homens livres atenienses que tivessem prestado serviço militar.'
    },
    {
      question: 'O que se entende pelo processo de "Romanização"?',
      options: [
        'A invasão de Roma pelas tribos bárbaras de cavaleiros vikings.',
        'A difusão e assimilação do latim, direito, estradas e banhos nas províncias conquistadas por Roma.',
        'O fim de todo o império romano liderado por Jesus de Nazaré.'
      ],
      correctIdx: 1,
      explanation: 'Indica a aculturação voluntária ou forçada das populações sob as leis e hábitos imperiais.'
    },
    {
      question: 'Em que século o Cristianismo se tornou a religião oficial exclusiva de todo o Império Romano com o Édito de Tessalónica?',
      options: [
        'No século I d.C. logo após a morte de Jesus.',
        'No século IV d.C. proclamado pelo imperador Teodósio.',
        'No século XII d.C. assinado em Zamora.'
      ],
      correctIdx: 1,
      explanation: 'O imperador Teodósio formalizou a exclusiva crença estatal no ano 380 d.C. (século IV).'
    },
    {
      question: 'Como se organizava síncronamente a pirâmide social da época do Feudalismo medieval?',
      options: [
        'Burgueses, Feirantes e Escravos da glória.',
        'O Clero (que ora), a Nobreza (que protege) e o Povo/Servos (que trabalham).',
        'Faraós, Sacerdotes e Escribas atenienses latinos.'
      ],
      correctIdx: 1,
      explanation: 'Tratava-se de uma sociedade tripartida dadas as funções de oração, espada e arado rural.'
    },
    {
      question: 'Qual o papel diplomático da Bula Manifestis Probatum de 1179 na constituição de Portugal?',
      options: [
        'Dividiu as ilhas dos arquipélagos atlânticos com Espanha.',
        'O Papa Alexandre III reconheceu formalmente a independência portuguesa e realeza de D. Afonso Henriques.',
        'Decretou a cobrança obrigatória de impostos de feiras.'
      ],
      correctIdx: 1,
      explanation: 'Foi o maior trunfo diplomático internacional português garantindo reconhecimento diplomático perante a cúria de Roma.'
    },
    {
      question: 'Em 1254, em Leiria, realizaram-se as Cortes convocadas por D. Afonso III. Qual o motivo do seu ineditismo?',
      options: [
        'A total extinção da cobrança de impostos do clero.',
        'A inclusão pioneira de representantes do Terceiro Estado (Povo) ao lado dos senhores feudais.',
        'O início da construção do Mosteiro da Batalha.'
      ],
      correctIdx: 1,
      explanation: 'Marcou a primeira vez que representantes locais dos concelhos puderam intervir nas reuniões reais.'
    },
    {
      question: 'Como terminou vitoriosamente a crise política histórica de 1383-1385 na sobrevivência nacional?',
      options: [
        'Assinando leis burguesas de submissão territorial a Castela.',
        'Com a eleição de D. João I nas Cortes de Coimbra e a vitória militar de Aljubarrota com D. Nuno Álvares Pereira.',
        'Com um pacto pacífico de pastores com a rainha Brites.'
      ],
      correctIdx: 1,
      explanation: 'As Cortes coroaram o Mestre de Avis e a batalha de Aljubarrota garantiu a independência com a táctica do quadrado.'
    }
  ];

  const handleStartExam = () => {
    setIsPlaying(true);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleAnswerSelect = (index: number) => {
    if (submitted) return;
    setSelectedOpt(index);
  };

  const handleSubmitQuestion = () => {
    if (selectedOpt === null) return;
    setSubmitted(true);
    
    // Check points
    if (selectedOpt === finalQuestions[currentIdx].correctIdx) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOpt(null);
    setSubmitted(false);
    if (currentIdx < finalQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Completed!
      setQuizFinished(true);
      const endScorePercentage = (score / finalQuestions.length) * 100;
      if (endScorePercentage >= 70) {
        addPoints(500, `Aprovado no Exame Final de História do 7.º Ano: ${score}/${finalQuestions.length}`);
        unlockBadge('badge-grandmaster');
        progress.completedFinalQuiz = true;
        progress.finalQuizScore = score;
      } else {
        addPoints(100, `Completou exame final com média de ${endScorePercentage}%`);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6" id="final-exam-module">
      {/* Quiz Cover banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="font-display font-extrabold text-slate-800 dark:text-slate-100 text-xl tracking-tight flex items-center gap-2">
            🏆 Exame Nacional Escolar do 7.º Ano
          </h2>
          <p className="text-xs text-slate-450 dark:text-slate-400">
            Prepara-te para o derradeiro desafio de 10 perguntas do programa de História. Conclui com pelo menos 70% de acerto para receber o Certificado Digital de Aproveitamento da Professora Carla Oliveira!
          </p>
        </div>

        {!isPlaying && (
          <button
            onClick={handleStartExam}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-755 text-white font-semibold font-display text-xs rounded-xl shadow-md transition-all uppercase tracking-wider flex items-center gap-2 shrink-0 active:scale-95"
            id="start-final-exam-button"
          >
            Iniciar Avaliação Final
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        )}
      </div>

      {isPlaying && !quizFinished && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Question gauge */}
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-850 pb-4">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest font-mono">
              Pergunta {currentIdx + 1} de {finalQuestions.length}
            </span>
            <div className="h-2 bg-slate-100 dark:bg-slate-850 rounded-full w-32 relative overflow-hidden">
              <div 
                className="absolute left-0 top-0 bottom-0 bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / finalQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-display font-extrabold text-slate-850 dark:text-slate-100 text-base sm:text-lg">
              {finalQuestions[currentIdx].question}
            </h3>

            {/* Answers List */}
            <div className="grid grid-cols-1 gap-3">
              {finalQuestions[currentIdx].options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === finalQuestions[currentIdx].correctIdx;
                let optStyle = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850';

                if (submitted) {
                  if (isCorrect) {
                     optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300';
                  } else if (isSelected) {
                     optStyle = 'border-red-500 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300';
                  } else {
                     optStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
                  }
                } else if (isSelected) {
                  optStyle = 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300';
                }

                return (
                  <button
                    key={idx}
                    disabled={submitted}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`p-4 text-left rounded-2xl border-2 text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${optStyle}`}
                  >
                    <span>{opt}</span>
                    {submitted && isCorrect && <Check className="w-4 h-4 text-emerald-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback section */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-750 text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed"
            >
              <span className="font-extrabold text-indigo-600 dark:text-indigo-400">Nota Explicativa:</span> {finalQuestions[currentIdx].explanation}
            </motion.div>
          )}

          {/* Controllers */}
          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-850">
            {!submitted ? (
              <button
                disabled={selectedOpt === null}
                onClick={handleSubmitQuestion}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-705 text-white font-semibold font-display text-xs rounded-xl disabled:opacity-40 shadow transition-all ml-auto"
              >
                Validar Resposta
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-705 text-white font-semibold font-display text-xs rounded-xl shadow transition-all ml-auto flex items-center gap-1.5"
                id="next-final-question"
              >
                {currentIdx === finalQuestions.length - 1 ? 'Concluir Exame' : 'Seguinte Pergunta'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* QUIZ FINISHED / SHOW CERTIFICATE OR FAIL BANNER */}
      {quizFinished && (
        <div className="space-y-6">
          {score >= 7 ? (
            <div className="space-y-6">
              {/* Congratulations banner */}
              <div className="bg-gradient-to-r from-emerald-500 to-indigo-600 text-white p-8 rounded-3xl text-center space-y-4 shadow-lg">
                <span className="text-6xl animate-bounce block">🏆</span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
                  Parabéns, {progress.name}! Concluíste com Distinção!
                </h3>
                <p className="text-xs sm:text-sm text-white/90 max-w-lg mx-auto">
                  Acertaste num extraordinário total de <strong className="font-bold">{score} de 10</strong> perguntas. Concluíste com louvor a disciplina de História do 7.º Ano e arrecadaste a Chave de Ouro e +500 XP!
                </p>
                <div className="flex justify-center gap-2">
                  <span className="bg-white/20 text-xs px-3.5 py-1.5 rounded-full font-bold">Nota Escolar: Aprovado • Excelente</span>
                  <span className="bg-amber-400 font-bold text-slate-900 text-xs px-3.5 py-1.5 rounded-full">Distintivo Desbloqueado: Grão-Mestre</span>
                </div>
              </div>

              {/* PRINTABLE DIGITAL CERTIFICATE */}
              <div className="print-certificate-container bg-amber-50 dark:bg-slate-850 p-8 sm:p-12 rounded-3xl border-8 border-double border-amber-300 dark:border-amber-700 shadow-md relative overflow-hidden" id="certificate-print-area">
                {/* Background decorative seals */}
                <div className="absolute right-0 bottom-0 opacity-5 scale-150 pointer-events-none translate-y-12">
                  <Crown className="w-96 h-96" />
                </div>

                <div className="text-center space-y-8 border-4 border-dotted border-amber-200/50 dark:border-amber-700/50 p-6 sm:p-10 rounded-2xl relative z-10 bg-white dark:bg-slate-900">
                  <div className="flex justify-center">
                    <Award className="w-16 h-16 text-amber-500 animate-pulse stroke-[1.25]" />
                  </div>

                  <div className="space-y-2">
                    <h1 className="font-serif text-3xl sm:text-4xl font-black text-slate-800 dark:text-amber-400 uppercase tracking-widest leading-none">
                      Certificado de Aproveitamento
                    </h1>
                    <p className="text-[11px] font-sans text-slate-400 uppercase tracking-widest font-black">
                      Ministério da Educação Virtual • EB 2/3 de Portugal
                    </p>
                  </div>

                  <div className="space-y-4 max-w-xl mx-auto">
                    <p className="font-serif italic text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                      Certifica-se solenemente que o(a) aluno(a) de excelência
                    </p>
                    <h2 className="text-3xl font-display font-extrabold text-indigo-650 dark:text-white underline decoration-amber-450 decoration-wavy underline-offset-8">
                      {progress.name}
                    </h2>
                    <p className="font-serif italic text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                      concluiu com aproveitamento e zelo pedagógico o currículo escolar obrigatório e as Aprendizagens Essenciais de <strong className="text-slate-800 dark:text-slate-205">História do 7.º Ano de Escolaridade</strong>, organizados no ano de 2026 pela docente Carla Oliveira.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 max-w-md mx-auto pt-8 border-t border-amber-200/40 text-left">
                    <div className="text-center">
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase font-black">Docente Orientadora</p>
                      <p className="font-serif font-bold text-slate-800 dark:text-slate-200 mt-2 text-xs border-b border-slate-300 dark:border-slate-700 pb-1 italic">
                        Profa. Carla Oliveira
                      </p>
                    </div>

                    <div className="text-center animate-pulse">
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase font-black">Selo Real / Chave</p>
                      <div className="inline-flex items-center gap-1.5 text-amber-500 dark:text-amber-400 font-display font-extrabold mt-2 text-xs">
                        🛡️ GRÃO-MESTRE
                      </div>
                    </div>
                  </div>
                </div>

                {/* Print button container: hidden in printing using standard css print styles */}
                <div className="flex justify-center pt-6 print:hidden">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold font-display shadow transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Imprimir / Guardar PDF do Certificado
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md mx-auto text-center space-y-4">
              <span className="text-5xl">🥺</span>
              <h3 className="font-display font-extrabold text-slate-805 dark:text-white text-lg">
                Ficaste perto dos 70%, {progress.name}!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Obiveste <strong className="text-rose-600 font-bold">{score} de 10</strong> no teu exame final. Para arrecadares o certificado real, a professora Carla Oliveira recomenda reler as lições dos temas ou responder a mais quizzes rápidos.
              </p>
              <button
                onClick={handleStartExam}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow flex items-center justify-center gap-2 mx-auto active:scale-95 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Voltar a Tentar o Exame
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
