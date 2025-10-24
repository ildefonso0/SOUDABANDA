import { AppConfig, Categoria, Quiz, SyncStatus } from '@/types/quiz';
import { cacheService } from './cache';

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/ildefonso0/QUIZ_SOU_DA_BANDA/main';

const GITHUB_URLS = {
  CONFIG: `${GITHUB_BASE_URL}/data/config.json`,
  CATEGORIAS: `${GITHUB_BASE_URL}/data/categorias.json`,
  QUIZZES: `${GITHUB_BASE_URL}/data/quizzes.json`,
};

class UpdateService {
  private updateInterval: ReturnType<typeof setInterval> | null = null;
  private listeners: Set<(status: SyncStatus) => void> = new Set();

  async fetchRemoteConfig(): Promise<AppConfig | null> {
    try {
      const response = await fetch(GITHUB_URLS.CONFIG);
      if (!response.ok) throw new Error('Failed to fetch config');
      return await response.json();
    } catch (error) {
      console.error('Error fetching remote config:', error);
      return null;
    }
  }

  async fetchRemoteCategorias(): Promise<Categoria[] | null> {
    try {
      const response = await fetch(GITHUB_URLS.CATEGORIAS);
      if (!response.ok) throw new Error('Failed to fetch categorias');
      return await response.json();
    } catch (error) {
      console.error('Error fetching remote categorias:', error);
      return null;
    }
  }

  async fetchRemoteQuizzes(): Promise<Quiz[] | null> {
    try {
      const response = await fetch(GITHUB_URLS.QUIZZES);
      if (!response.ok) throw new Error('Failed to fetch quizzes');
      return await response.json();
    } catch (error) {
      console.error('Error fetching remote quizzes:', error);
      return null;
    }
  }

  async shouldUpdate(): Promise<boolean> {
    try {
      const [remoteConfig, localConfig] = await Promise.all([
        this.fetchRemoteConfig(),
        cacheService.getConfig(),
      ]);

      if (!remoteConfig) {
        console.log('Could not fetch remote config');
        return false;
      }

      if (!localConfig) {
        console.log('No local config found, need to download');
        return true;
      }

      const remoteVersion = remoteConfig.versao;
      const localVersion = localConfig.versao;
      const remoteDate = new Date(remoteConfig.ultima_atualizacao);
      const localDate = new Date(localConfig.ultima_atualizacao);

      const needsUpdate = remoteVersion !== localVersion || remoteDate > localDate;

      if (needsUpdate) {
        console.log(`Update needed: Remote v${remoteVersion} vs Local v${localVersion}`);
      }

      return needsUpdate;
    } catch (error) {
      console.error('Error checking for updates:', error);
      return false;
    }
  }

  async downloadInitialData(): Promise<boolean> {
    try {
      console.log('Downloading initial data from GitHub...');
      
      const [config, categorias, quizzes] = await Promise.all([
        this.fetchRemoteConfig(),
        this.fetchRemoteCategorias(),
        this.fetchRemoteQuizzes(),
      ]);

      if (!config || !categorias || !quizzes) {
        console.error('Failed to download initial data');
        return false;
      }

      await Promise.all([
        cacheService.saveConfig(config),
        cacheService.saveCategorias(categorias),
        cacheService.saveQuizzes(quizzes),
        cacheService.updateLastSync(),
      ]);

      const syncStatus: SyncStatus = {
        lastSync: new Date().toISOString(),
        version: config.versao,
        nextSync: this.calculateNextSync(config.intervalo_atualizacao_horas),
        isOffline: false,
      };

      await cacheService.saveSyncStatus(syncStatus);
      this.notifyListeners(syncStatus);

      console.log('Initial data downloaded successfully');
      return true;
    } catch (error) {
      console.error('Error downloading initial data:', error);
      return false;
    }
  }

  async checkAndUpdate(): Promise<boolean> {
    try {
      const shouldUpdate = await this.shouldUpdate();

      if (!shouldUpdate) {
        console.log('No update needed');
        return false;
      }

      console.log('Updating content from GitHub...');
      const success = await this.downloadInitialData();

      if (success) {
        console.log('Content updated successfully');
      }

      return success;
    } catch (error) {
      console.error('Error during update check:', error);
      return false;
    }
  }

  async initialize(): Promise<void> {
    try {
      const hasCached = await cacheService.hasCachedData();

      if (!hasCached) {
        console.log('No cached data, downloading from GitHub...');
        await this.downloadInitialData();
      } else {
        console.log('Cached data found, checking for updates...');
        await this.checkAndUpdate();
      }

      await this.setupAutoUpdate();
    } catch (error) {
      console.error('Error initializing update service:', error);
      const syncStatus: SyncStatus = {
        lastSync: new Date().toISOString(),
        version: 'unknown',
        nextSync: this.calculateNextSync(24),
        isOffline: true,
      };
      await cacheService.saveSyncStatus(syncStatus);
      this.notifyListeners(syncStatus);
    }
  }

  async setupAutoUpdate(): Promise<void> {
    try {
      const config = await cacheService.getConfig();
      const interval = config?.intervalo_atualizacao_horas || 24;
      
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
      }

      const intervalMs = interval * 60 * 60 * 1000;
      
      this.updateInterval = setInterval(async () => {
        console.log('Running scheduled update check...');
        await this.checkAndUpdate();
      }, intervalMs);

      console.log(`Auto-update scheduled every ${interval} hours`);
    } catch (error) {
      console.error('Error setting up auto-update:', error);
    }
  }

  calculateNextSync(hoursFromNow: number): string {
    const next = new Date();
    next.setHours(next.getHours() + hoursFromNow);
    return next.toISOString();
  }

  addListener(listener: (status: SyncStatus) => void): void {
    this.listeners.add(listener);
  }

  removeListener(listener: (status: SyncStatus) => void): void {
    this.listeners.delete(listener);
  }

  private notifyListeners(status: SyncStatus): void {
    this.listeners.forEach(listener => listener(status));
  }

  async getSyncStatus(): Promise<SyncStatus | null> {
    return await cacheService.getSyncStatus();
  }

  async manualUpdate(): Promise<boolean> {
    console.log('Manual update triggered');
    return await this.checkAndUpdate();
  }

  dispose(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.listeners.clear();
  }
}

export const updateService = new UpdateService();
