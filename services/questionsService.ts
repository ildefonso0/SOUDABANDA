import { Quiz, Categoria, Question } from '@/types/quiz';
import { cacheService } from './cache';
import { updateService } from './updateService';
import { QuizAdapter } from './quizAdapter';
import localQuestions from '@/data/questions.json';

class QuestionsService {
  private initialized = false;
  private fallbackQuestions: Question[] = localQuestions as Question[];

  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      await updateService.initialize();
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing questions service:', error);
      this.initialized = true;
    }
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    const quizzes = await cacheService.getQuizzes();
    if (quizzes && quizzes.length > 0) {
      return quizzes;
    }
    return [];
  }

  getAllQuestions(): Question[] {
    return this.fallbackQuestions;
  }

  async getRandomQuestions(count: number): Promise<Question[]> {
    await this.ensureInitialized();
    
    const quizzes = await this.getAllQuizzes();
    
    if (quizzes.length > 0) {
      const compatibleQuizzes = QuizAdapter.quizzesToQuestions(quizzes);
      if (compatibleQuizzes.length > 0) {
        const shuffled = [...compatibleQuizzes].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
      }
    }
    
    const shuffled = [...this.fallbackQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  getQuestionsByCategory(category: string): Question[] {
    return this.fallbackQuestions.filter(q => q.categoria === category);
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  async getQuizzesByCategory(category: string): Promise<Quiz[]> {
    const quizzes = await this.getAllQuizzes();
    return quizzes.filter(q => q.categoria === category);
  }

  async getRandomQuizzes(count: number): Promise<Quiz[]> {
    const quizzes = await this.getAllQuizzes();
    const shuffled = [...quizzes].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  async getQuizById(id: number | string): Promise<Quiz | undefined> {
    const quizzes = await this.getAllQuizzes();
    return quizzes.find(q => q.id == id);
  }

  async getCategories(): Promise<string[]> {
    const categorias = await cacheService.getCategorias();
    if (categorias) {
      return categorias.map(c => c.nome);
    }
    
    const quizzes = await this.getAllQuizzes();
    const categories = new Set(quizzes.map(q => q.categoria));
    return Array.from(categories);
  }

  async getAllCategorias(): Promise<Categoria[]> {
    const categorias = await cacheService.getCategorias();
    return categorias || [];
  }

  async getCategoriaById(id: number): Promise<Categoria | undefined> {
    const categorias = await this.getAllCategorias();
    return categorias.find(c => c.id === id);
  }

  async refreshData(): Promise<boolean> {
    try {
      const success = await updateService.manualUpdate();
      return success;
    } catch (error) {
      console.error('Error refreshing data:', error);
      return false;
    }
  }

  async getSyncStatus() {
    return await updateService.getSyncStatus();
  }

  subscribeToUpdates(listener: (status: any) => void): void {
    updateService.addListener(listener);
  }

  unsubscribeFromUpdates(listener: (status: any) => void): void {
    updateService.removeListener(listener);
  }
}

export const questionsService = new QuestionsService();
