import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppConfig, Categoria, Quiz, SyncStatus } from '@/types/quiz';

const KEYS = {
  CONFIG: '@quiz_sou_da_banda/config',
  CATEGORIAS: '@quiz_sou_da_banda/categorias',
  QUIZZES: '@quiz_sou_da_banda/quizzes',
  SYNC_STATUS: '@quiz_sou_da_banda/sync_status',
  LAST_SYNC: '@quiz_sou_da_banda/last_sync',
};

class CacheService {
  async saveConfig(config: AppConfig): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.CONFIG, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving config to cache:', error);
      throw error;
    }
  }

  async getConfig(): Promise<AppConfig | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.CONFIG);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting config from cache:', error);
      return null;
    }
  }

  async saveCategorias(categorias: Categoria[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.CATEGORIAS, JSON.stringify(categorias));
    } catch (error) {
      console.error('Error saving categorias to cache:', error);
      throw error;
    }
  }

  async getCategorias(): Promise<Categoria[] | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.CATEGORIAS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting categorias from cache:', error);
      return null;
    }
  }

  async saveQuizzes(quizzes: Quiz[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.QUIZZES, JSON.stringify(quizzes));
    } catch (error) {
      console.error('Error saving quizzes to cache:', error);
      throw error;
    }
  }

  async getQuizzes(): Promise<Quiz[] | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.QUIZZES);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting quizzes from cache:', error);
      return null;
    }
  }

  async saveSyncStatus(status: SyncStatus): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.SYNC_STATUS, JSON.stringify(status));
    } catch (error) {
      console.error('Error saving sync status:', error);
      throw error;
    }
  }

  async getSyncStatus(): Promise<SyncStatus | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.SYNC_STATUS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting sync status:', error);
      return null;
    }
  }

  async updateLastSync(): Promise<void> {
    try {
      const now = new Date().toISOString();
      await AsyncStorage.setItem(KEYS.LAST_SYNC, now);
    } catch (error) {
      console.error('Error updating last sync:', error);
      throw error;
    }
  }

  async getLastSync(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(KEYS.LAST_SYNC);
    } catch (error) {
      console.error('Error getting last sync:', error);
      return null;
    }
  }

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(KEYS));
    } catch (error) {
      console.error('Error clearing cache:', error);
      throw error;
    }
  }

  async hasCachedData(): Promise<boolean> {
    try {
      const config = await this.getConfig();
      const quizzes = await this.getQuizzes();
      return config !== null && quizzes !== null && quizzes.length > 0;
    } catch (error) {
      return false;
    }
  }
}

export const cacheService = new CacheService();
