/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  context: string;
}

export interface QuizQuestion {
  id: string;
  themeId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReflectionQuestion {
  id: string;
  question: string;
  tip: string;
}

export interface Subsection {
  id: string;
  title: string;
  content: string; // Brief HTML/Markdown-ready content or styled text
  keyConcepts: string[];
}

export interface Theme {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  color: string; // CSS color classes for theme framing
  accentColor: string;
  iconName: string; // Lucide icon name representation
  subsections: Subsection[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  reflection: ReflectionQuestion[];
}

export interface TimelineEvent {
  id: string;
  themeId: string;
  year: string;
  title: string;
  description: string;
  imagePlaceholder?: string; // Icon or local design motif description
  extendedExplanation: string;
  curiosity: string;
}

export interface HistoricalSource {
  id: string;
  themeId: string;
  title: string;
  type: 'image' | 'text' | 'object' | 'map';
  reference: string; // e.g. "Códice Medieval", "Pintura Rupestre em Foz Côa"
  visualAsset: string; // Icon styling guidelines/description
  contentHtml?: string; // Text content if type is 'text'
  description: string;
  questions: string[];
  suggestedAnswers: string[];
}

export interface Curiosity {
  id: string;
  themeId: string;
  title: string;
  fact: string;
  didYouKnow: string;
}

export interface GameScore {
  gameId: string;
  highScore: number;
  completed: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  unlockedAtPoints: number;
  className: string;
}

export interface StudentProgress {
  name: string;
  points: number;
  completedThemes: string[]; // List of Theme IDs
  completedQuizzes: string[]; // List of Theme IDs
  completedFinalQuiz: boolean;
  finalQuizScore: number;
  activeAvatar: string;
  unlockedBadges: string[]; // Badge IDs
  answeredReflectionAnswers: Record<string, string>; // questionId -> studentAnswer
  analyzedSourcesNotes: Record<string, string>; // sourceId -> studentNotes
  gameScores: Record<string, number>; // gameId -> score
}
