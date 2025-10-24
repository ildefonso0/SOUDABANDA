import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';

const sections = [
  {
    icon: 'map',
    title: 'Geografia',
    content: 'Angola é o sétimo maior país de África com 1.246.700 km². Possui uma costa de 1.650 km no Oceano Atlântico.',
  },
  {
    icon: 'people',
    title: 'População',
    content: 'Com mais de 35 milhões de habitantes, Angola é um país multicultural com diversas etnias e línguas.',
  },
  {
    icon: 'time',
    title: 'Independência',
    content: 'Angola conquistou sua independência de Portugal em 11 de novembro de 1975.',
  },
  {
    icon: 'musical-notes',
    title: 'Cultura',
    content: 'Rica em música (Semba, Kizomba, Kuduro), dança e arte tradicional. O país é berço de ritmos que influenciaram o mundo.',
  },
  {
    icon: 'diamond',
    title: 'Recursos',
    content: 'Angola é rica em petróleo, diamantes, ferro, cobre e outros minerais preciosos.',
  },
  {
    icon: 'language',
    title: 'Línguas',
    content: 'O português é a língua oficial. Principais línguas nacionais: Umbundu, Kimbundu, Kikongo, Chokwe.',
  },
];

const provinces = [
  'Luanda', 'Benguela', 'Huíla', 'Huambo', 'Cabinda',
  'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Bengo',
  'Bié', 'Cuando Cubango', 'Lunda Norte', 'Lunda Sul',
  'Malanje', 'Moxico', 'Namibe', 'Uíge', 'Zaire',
];

export default function SobreAngolaScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[theme.colors.black, theme.colors.primary + '20']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sobre Angola</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.flagContainer}>
          <Text style={styles.flag}>🇦🇴</Text>
          <Text style={styles.countryName}>República de Angola</Text>
          <Text style={styles.motto}>"Virtus Unita Fortior"</Text>
        </View>

        <View style={styles.sectionsContainer}>
          {sections.map((section, index) => (
            <View key={index} style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name={section.icon as any} size={28} color={theme.colors.gold} />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}
        </View>

        <View style={styles.provincesContainer}>
          <Text style={styles.provincesTitle}>🗺️ 18 Províncias</Text>
          <View style={styles.provincesList}>
            {provinces.map((province, index) => (
              <View key={index} style={styles.provinceTag}>
                <Text style={styles.provinceText}>{province}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.funFactsContainer}>
          <Text style={styles.funFactsTitle}>💡 Curiosidades</Text>
          <View style={styles.factCard}>
            <Text style={styles.factText}>
              • Angola tem a segunda maior cascata de África: as Quedas de Kalandula
            </Text>
          </View>
          <View style={styles.factCard}>
            <Text style={styles.factText}>
              • O Parque Nacional da Kissama é lar de elefantes, leões e búfalos
            </Text>
          </View>
          <View style={styles.factCard}>
            <Text style={styles.factText}>
              • A Kizomba, dança nascida em Angola, é popular em todo o mundo
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.black + 'CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  flagContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  flag: {
    fontSize: 80,
    marginBottom: 16,
  },
  countryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 4,
  },
  motto: {
    fontSize: 14,
    color: theme.colors.gold,
    fontStyle: 'italic',
  },
  sectionsContainer: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 32,
  },
  sectionCard: {
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  sectionContent: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  provincesContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  provincesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 16,
  },
  provincesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  provinceTag: {
    backgroundColor: theme.colors.primary + '30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  provinceText: {
    fontSize: 12,
    color: theme.colors.white,
  },
  funFactsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  funFactsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 16,
  },
  factCard: {
    backgroundColor: theme.colors.gold + '20',
    borderRadius: theme.borderRadius.md,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.gold,
  },
  factText: {
    fontSize: 14,
    color: theme.colors.white,
    lineHeight: 22,
  },
});
