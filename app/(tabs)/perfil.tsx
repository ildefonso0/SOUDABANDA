import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { userService, UserProfile } from '@/services/userService';
import { useRouter } from 'expo-router';

export default function PerfilScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userPosition, setUserPosition] = useState<number | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profileData = await userService.getCurrentProfile();
      const position = await userService.getUserPosition();
      setProfile(profileData);
      setUserPosition(position);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reiniciar Perfil',
      'Tens a certeza que queres reiniciar o teu perfil? Todos os dados serão apagados.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reiniciar',
          style: 'destructive',
          onPress: async () => {
            await userService.clearProfile();
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <LinearGradient
        colors={[theme.colors.black, theme.colors.yellow + '20']}
        style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
      >
        <ActivityIndicator size="large" color={theme.colors.yellow} />
      </LinearGradient>
    );
  }

  if (!profile) {
    return (
      <LinearGradient
        colors={[theme.colors.black, theme.colors.yellow + '20']}
        style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
      >
        <Text style={styles.errorText}>Erro ao carregar perfil</Text>
      </LinearGradient>
    );
  }

  const taxaAcerto = profile.acertos + profile.erros > 0
    ? Math.round((profile.acertos / (profile.acertos + profile.erros)) * 100)
    : 0;

  return (
    <LinearGradient
      colors={[theme.colors.black, theme.colors.yellow + '20']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={60} color={theme.colors.yellow} />
        </View>
        <Text style={styles.name}>{profile.nome}</Text>
        <Text style={styles.provincia}>📍 {profile.provincia}</Text>
        {userPosition && (
          <View style={styles.positionBadge}>
            <Ionicons name="trophy" size={16} color={theme.colors.yellow} />
            <Text style={styles.positionText}>#{userPosition} no ranking</Text>
          </View>
        )}
      </View>

      <View style={styles.statsContainer}>
        <StatCard icon="trophy" label="Pontuação Total" value={profile.pontuacao_total.toLocaleString()} />
        <StatCard icon="checkmark-circle" label="Taxa de Acerto" value={`${taxaAcerto}%`} />
        <StatCard icon="flame" label="Sequência Máxima" value={profile.sequencia_maxima.toString()} />
        <StatCard icon="time" label="Tempo Médio" value={`${profile.tempo_medio}s`} />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total de Respostas:</Text>
          <Text style={styles.detailValue}>{profile.acertos + profile.erros}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Respostas Corretas:</Text>
          <Text style={[styles.detailValue, { color: theme.colors.success }]}>
            {profile.acertos}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Respostas Erradas:</Text>
          <Text style={[styles.detailValue, { color: theme.colors.error }]}>
            {profile.erros}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Ionicons name="refresh" size={20} color={theme.colors.error} />
        <Text style={styles.resetText}>Reiniciar Perfil</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={32} color={theme.colors.gold} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.red + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: theme.colors.yellow,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 4,
  },
  provincia: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  positionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.yellow + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  positionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.yellow,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.red + '30',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.yellow + '30',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textSecondary + '20',
  },
  detailLabel: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.error + '50',
  },
  resetText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.error,
  },
  errorText: {
    fontSize: 18,
    color: theme.colors.error,
  },
});
