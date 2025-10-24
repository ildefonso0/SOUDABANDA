import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { questionsService } from '@/services/questionsService';

export default function HomeScreen() {
  const router = useRouter();
  const flagAnimation = useRef(new Animated.Value(0)).current;
  const [syncStatus, setSyncStatus] = useState<string>('Sincronizado');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flagAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(flagAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    loadSyncStatus();
  }, []);

  const loadSyncStatus = async () => {
    const status = await questionsService.getSyncStatus();
    if (status) {
      const lastSync = new Date(status.lastSync);
      setSyncStatus(`Última atualização: ${lastSync.toLocaleDateString()}`);
    }
  };

  const handleManualUpdate = async () => {
    setIsUpdating(true);
    try {
      const success = await questionsService.refreshData();
      if (success) {
        Alert.alert('Sucesso', 'Conteúdo atualizado com sucesso!');
        loadSyncStatus();
      } else {
        Alert.alert('Aviso', 'Não há atualizações disponíveis ou não foi possível conectar ao GitHub.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o conteúdo. Tente novamente mais tarde.');
    } finally {
      setIsUpdating(false);
    }
  };

  const translateX = flagAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  return (
    <LinearGradient
      colors={[theme.colors.black, theme.colors.primary + '30']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <Text style={styles.logo}>🇦🇴</Text>
        </Animated.View>
        <Text style={styles.title}>Sou da Banda</Text>
        <Text style={styles.slogan}>"Conhecer Angola é jogá-la com orgulho"</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuButton
          icon="play"
          title="Jogar Agora"
          subtitle="Teste seus conhecimentos"
          color={theme.colors.primary}
          onPress={() => router.push('/jogo')}
        />
        <MenuButton
          icon="school"
          title="Modo Treino"
          subtitle="Aprenda sem pressão"
          color={theme.colors.gold}
          onPress={() => router.push('/(tabs)/treino')}
        />
        <MenuButton
          icon="trophy"
          title="Ranking"
          subtitle="Veja sua posição"
          color={theme.colors.primary}
          onPress={() => router.push('/(tabs)/ranking')}
        />
        <MenuButton
          icon="globe"
          title="Sobre Angola"
          subtitle="Conteúdo educativo"
          color={theme.colors.gold}
          onPress={() => router.push('/sobre-angola')}
        />
      </View>

      <View style={styles.updateSection}>
        <TouchableOpacity 
          style={styles.updateButton}
          onPress={handleManualUpdate}
          disabled={isUpdating}
        >
          <Ionicons 
            name={isUpdating ? "hourglass" : "sync"} 
            size={20} 
            color={theme.colors.gold} 
          />
          <Text style={styles.updateButtonText}>
            {isUpdating ? 'Atualizando...' : 'Atualizar Conteúdo'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.updateNotice}>
          <Ionicons name="information-circle" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.updateText}>{syncStatus}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

function MenuButton({ icon, title, subtitle, color, onPress }: any) {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: color + '30' }]}>
        <Ionicons name={icon} size={32} color={color} />
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 8,
  },
  slogan: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  menuContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  updateSection: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.gold + '50',
    gap: 8,
  },
  updateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.gold,
  },
  updateNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  updateText: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
});
