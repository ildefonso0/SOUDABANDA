import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { userService, UserProfile } from '@/services/userService';

export default function RankingScreen() {
  const [ranking, setRanking] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<'nacional' | 'provincia'>('nacional');
  const [currentUserProvince, setCurrentUserProvince] = useState<string>('');

  useEffect(() => {
    loadRanking();
  }, [filterType]);

  const loadRanking = async () => {
    setIsLoading(true);
    try {
      const profile = await userService.getCurrentProfile();
      if (profile) {
        setCurrentUserProvince(profile.provincia);
      }

      let rankingData: UserProfile[];
      if (filterType === 'nacional') {
        rankingData = await userService.getRanking(20);
      } else {
        rankingData = await userService.getRankingByProvincia(profile?.provincia || '', 20);
      }
      setRanking(rankingData);
    } catch (error) {
      console.error('Error loading ranking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.black, theme.colors.red + '20']}
      style={styles.container}
    >
      <Text style={styles.title}>🏆 Ranking</Text>
      <Text style={styles.subtitle}>Os melhores jogadores</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'nacional' && styles.filterButtonActive]}
          onPress={() => setFilterType('nacional')}
        >
          <Text style={[styles.filterText, filterType === 'nacional' && styles.filterTextActive]}>
            Nacional
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'provincia' && styles.filterButtonActive]}
          onPress={() => setFilterType('provincia')}
        >
          <Text style={[styles.filterText, filterType === 'provincia' && styles.filterTextActive]}>
            {currentUserProvince || 'Província'}
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.yellow} />
        </View>
      ) : ranking.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="trophy-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={styles.emptyText}>Nenhum jogador no ranking ainda</Text>
        </View>
      ) : (
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {ranking.map((player, index) => (
            <View key={player.id} style={styles.rankCard}>
              <View style={[
                styles.positionBadge,
                index === 0 && styles.goldBadge,
                index === 1 && styles.silverBadge,
                index === 2 && styles.bronzeBadge,
              ]}>
                <Text style={styles.positionText}>#{index + 1}</Text>
              </View>
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{player.nome}</Text>
                <Text style={styles.provincia}>📍 {player.provincia}</Text>
              </View>
              <View style={styles.scoreContainer}>
                <Text style={styles.score}>{player.pontuacao_total}</Text>
                <Text style={styles.scoreLabel}>pts</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 24,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.black + 'CC',
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  filterButtonActive: {
    borderColor: theme.colors.yellow,
    backgroundColor: theme.colors.yellow + '20',
  },
  filterText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  filterTextActive: {
    color: theme.colors.yellow,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  list: {
    flex: 1,
  },
  rankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
  },
  positionBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  goldBadge: {
    backgroundColor: theme.colors.gold + '40',
  },
  silverBadge: {
    backgroundColor: '#C0C0C0' + '40',
  },
  bronzeBadge: {
    backgroundColor: '#CD7F32' + '40',
  },
  positionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 4,
  },
  provincia: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.gold,
  },
  scoreLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
});
