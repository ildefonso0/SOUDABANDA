// Quiz types supported by the GitHub repository
export type QuizType = 
  | 'multipla_escolha'     // Multiple choice
  | 'verdadeiro_falso'     // True/False
  | 'imagem_para_texto'    // Image to text
  | 'completar_frase'      // Complete the sentence
  | 'quiz_relacionar';     // Match/relate items (future)

// Legacy type for backward compatibility
export type QuestionType = 'text' | 'image' | 'audio' | 'mixed';

export interface QuestionOption {
  texto: string;
  imagem?: string;
  audio?: string;
}

// GitHub Quiz structure
export interface Quiz {
  id: number | string;
  categoria: string;
  tipo: QuizType;
  pergunta: string;
  opcoes?: string[];           // For multipla_escolha
  resposta_correta: number | boolean | string;
  imagem?: string;             // For imagem_para_texto
  explicacao?: string;
}

// Legacy Question interface for backward compatibility
export interface Question {
  id: string;
  categoria: string;
  tipo: QuestionType;
  pergunta: string;
  opcoes: QuestionOption[];
  resposta_correta: number;
  explicacao: string;
}

// GitHub Config structure
export interface AppConfig {
  versao: string;
  ultima_atualizacao: string;
  intervalo_atualizacao_horas: number;
  tema: {
    cor_primaria: string;
    cor_secundaria: string;
    modo: 'claro' | 'escuro';
  };
}

// GitHub Category structure
export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  icone?: string;
}

// Sync status for tracking updates
export interface SyncStatus {
  lastSync: string;
  version: string;
  nextSync: string;
  isOffline: boolean;
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
