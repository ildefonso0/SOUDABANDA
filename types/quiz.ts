export type QuestionType = 'text' | 'image' | 'audio' | 'mixed';

export interface QuestionOption {
  texto: string;
  imagem?: string;
  audio?: string;
}

export interface Question {
  id: string;
  categoria: string;
  tipo: QuestionType;
  pergunta: string;
  opcoes: QuestionOption[];
  resposta_correta: number;
  explicacao: string;
}

export interface UserProfile {
  nome: string;
  foto?: string;
  provincia: string;
  pontuacao_total: number;
  acertos: number;
  erros: number;
  tempo_medio: number;
  categorias_favoritas: string[];
}

export interface GameStats {
  currentStreak: number;
  maxStreak: number;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeElapsed: number;
}
