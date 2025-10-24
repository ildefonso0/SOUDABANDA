import { Question } from '@/types/quiz';
import questionsData from '@/data/questions.json';

class QuestionsService {
  private questions: Question[] = questionsData as Question[];

  getAllQuestions(): Question[] {
    return this.questions;
  }

  getQuestionsByCategory(category: string): Question[] {
    return this.questions.filter(q => q.categoria === category);
  }

  getRandomQuestions(count: number): Question[] {
    const shuffled = [...this.questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  getQuestionById(id: string): Question | undefined {
    return this.questions.find(q => q.id === id);
  }

  getCategories(): string[] {
    const categories = new Set(this.questions.map(q => q.categoria));
    return Array.from(categories);
  }

  async syncWithGoogleDrive(): Promise<void> {
    console.log('Sincronização com Google Drive será implementada em breve...');
  }
}

export const questionsService = new QuestionsService();
