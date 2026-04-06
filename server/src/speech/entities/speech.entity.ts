export class Speech {
  id: string;
  word: string;
  language: string;
  phonetic: string;
  nativeMarked: boolean;
  audioUrl?: string;
  difficulty: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PhonemeScore {
  phoneme: string;
  accuracy: number;
  position: number;
  duration?: number;
}

export interface PronunciationResult {
  accuracy: number;
  phonemeScores: PhonemeScore[];
  feedback: string;
  suggestions: string[];
  audioUrl?: string;
}

export interface AudioResult {
  audioUrl: string;
  duration: number;
  format: string;
}

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  phonemes: string[];
}

export interface ComparisonResult {
  userAccuracy: number;
  referenceAccuracy: number;
  similarity: number;
  feedback: string;
  improvements: string[];
}
