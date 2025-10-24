import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

export default function PerfilScreen() {
  return (
    <LinearGradient
      colors={[theme.colors.black, theme.colors.gold + '20']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={60} color={theme.colors.gold} />
        </View>
        <Text style={styles.name}>Jogador Angolano</Text>
        <Text style={styles.provincia}>📍 Luanda</Text>
      </View>

      <View style={styles.statsContainer}>
        <StatCard icon="trophy" label="Pontuação Total" value="1,250" />
        <StatCard icon="checkmark-circle" label="Acertos" value="85%" />
        <StatCard icon="flame" label="Sequência Máxima" value="12" />
        <StatCard icon="time" label="Tempo Médio" value="15s" />
      </View>

      <TouchableOpacity style={styles.shareButton}>
        <Ionicons name="share-social" size={24} color={theme.colors.white} />
        <Text style={styles.shareText}>Partilhar Resultado</Text>
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
    backgroundColor: theme.colors.primary + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: theme.colors.gold,
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
    borderColor: theme.colors.primary + '30',
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
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    gap: 8,
  },
  shareText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
});
