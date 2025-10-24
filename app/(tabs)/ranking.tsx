import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

const mockRanking = [
  { posicao: 1, nome: 'João Silva', provincia: 'Luanda', pontos: 2580 },
  { posicao: 2, nome: 'Maria Santos', provincia: 'Benguela', pontos: 2340 },
  { posicao: 3, nome: 'Carlos Costa', provincia: 'Huíla', pontos: 2120 },
  { posicao: 4, nome: 'Ana Sousa', provincia: 'Luanda', pontos: 1950 },
  { posicao: 5, nome: 'Pedro Neto', provincia: 'Huambo', pontos: 1820 },
];

export default function RankingScreen() {
  return (
    <LinearGradient
      colors={[theme.colors.black, theme.colors.primary + '20']}
      style={styles.container}
    >
      <Text style={styles.title}>🏆 Ranking Nacional</Text>
      <Text style={styles.subtitle}>Os melhores jogadores de Angola</Text>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {mockRanking.map((player) => (
          <View key={player.posicao} style={styles.rankCard}>
            <View style={[
              styles.positionBadge,
              player.posicao === 1 && styles.goldBadge,
              player.posicao === 2 && styles.silverBadge,
              player.posicao === 3 && styles.bronzeBadge,
            ]}>
              <Text style={styles.positionText}>#{player.posicao}</Text>
            </View>
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.nome}</Text>
              <Text style={styles.provincia}>📍 {player.provincia}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.score}>{player.pontos}</Text>
              <Text style={styles.scoreLabel}>pts</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
