import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const flagAnimation = useRef(new Animated.Value(0)).current;

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
  }, []);

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

      <View style={styles.updateNotice}>
        <Ionicons name="sync" size={16} color={theme.colors.gold} />
        <Text style={styles.updateText}>
          Atualização automática das perguntas em 24h ⟳
        </Text>
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
  updateNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    gap: 8,
  },
  updateText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
});
