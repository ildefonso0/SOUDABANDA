import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

export interface UserProfile {
  id: string;
  nome: string;
  provincia: string;
  foto_url?: string;
  pontuacao_total: number;
  acertos: number;
  erros: number;
  tempo_medio: number;
  sequencia_maxima: number;
  created_at: string;
  updated_at: string;
}

class UserService {
  private currentProfileId: string | null = null;

  async checkOnboardingComplete(): Promise<boolean> {
    try {
      const complete = await AsyncStorage.getItem('@quiz_sou_da_banda/onboarding_complete');
      return complete === 'true';
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  }

  async getCurrentProfileId(): Promise<string | null> {
    if (this.currentProfileId) {
      return this.currentProfileId;
    }

    try {
      const id = await AsyncStorage.getItem('@quiz_sou_da_banda/user_profile_id');
      this.currentProfileId = id;
      return id;
    } catch (error) {
      console.error('Error getting current profile ID:', error);
      return null;
    }
  }

  async getCurrentProfile(): Promise<UserProfile | null> {
    try {
      const profileId = await this.getCurrentProfileId();
      if (!profileId) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error getting current profile:', error);
      return null;
    }
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<boolean> {
    try {
      const profileId = await this.getCurrentProfileId();
      if (!profileId) return false;

      const { error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', profileId);

      if (error) {
        console.error('Error updating profile:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  }

  async updateScore(pontos: number, acertou: boolean, tempo: number): Promise<void> {
    try {
      const profile = await this.getCurrentProfile();
      if (!profile) return;

      const novaPontuacao = profile.pontuacao_total + pontos;
      const novoAcertos = acertou ? profile.acertos + 1 : profile.acertos;
      const novosErros = !acertou ? profile.erros + 1 : profile.erros;

      const totalRespostas = novoAcertos + novosErros;
      const tempoTotal = profile.tempo_medio * (totalRespostas - 1) + tempo;
      const novoTempoMedio = Math.round(tempoTotal / totalRespostas);

      await this.updateProfile({
        pontuacao_total: novaPontuacao,
        acertos: novoAcertos,
        erros: novosErros,
        tempo_medio: novoTempoMedio,
      });
    } catch (error) {
      console.error('Error updating score:', error);
    }
  }

  async updateMaxStreak(streak: number): Promise<void> {
    try {
      const profile = await this.getCurrentProfile();
      if (!profile) return;

      if (streak > profile.sequencia_maxima) {
        await this.updateProfile({ sequencia_maxima: streak });
      }
    } catch (error) {
      console.error('Error updating max streak:', error);
    }
  }

  async getRanking(limit: number = 10): Promise<UserProfile[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('pontuacao_total', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching ranking:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting ranking:', error);
      return [];
    }
  }

  async getRankingByProvincia(provincia: string, limit: number = 10): Promise<UserProfile[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('provincia', provincia)
        .order('pontuacao_total', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching ranking by provincia:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting ranking by provincia:', error);
      return [];
    }
  }

  async getUserPosition(): Promise<number | null> {
    try {
      const profile = await this.getCurrentProfile();
      if (!profile) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .gt('pontuacao_total', profile.pontuacao_total);

      if (error) {
        console.error('Error getting user position:', error);
        return null;
      }

      return (data?.length || 0) + 1;
    } catch (error) {
      console.error('Error getting user position:', error);
      return null;
    }
  }

  async clearProfile(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        '@quiz_sou_da_banda/user_profile_id',
        '@quiz_sou_da_banda/onboarding_complete',
      ]);
      this.currentProfileId = null;
    } catch (error) {
      console.error('Error clearing profile:', error);
    }
  }
}

export const userService = new UserService();
