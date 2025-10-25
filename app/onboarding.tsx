import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

const PROVINCIAS = [
  'Luanda',
  'Bengo',
  'Benguela',
  'Bié',
  'Cabinda',
  'Cuando Cubango',
  'Cuanza Norte',
  'Cuanza Sul',
  'Cunene',
  'Huambo',
  'Huíla',
  'Lunda Norte',
  'Lunda Sul',
  'Malanje',
  'Moxico',
  'Namibe',
  'Uíge',
  'Zaire',
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState('');
  const [provincia, setProvincia] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (step === 1 && nome.trim()) {
      setStep(2);
    } else if (step === 2 && provincia) {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .insert([
            {
              nome: nome.trim(),
              provincia,
              pontuacao_total: 0,
              acertos: 0,
              erros: 0,
              tempo_medio: 0,
              sequencia_maxima: 0,
            },
          ])
          .select()
          .maybeSingle();

        if (error) {
          console.error('Error creating profile:', error);
        } else if (data) {
          await AsyncStorage.setItem('@quiz_sou_da_banda/user_profile_id', data.id);
          await AsyncStorage.setItem('@quiz_sou_da_banda/onboarding_complete', 'true');
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.black, theme.colors.red + '30']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.logo}>🇦🇴</Text>
            <Text style={styles.title}>Sou da Banda</Text>
            <Text style={styles.subtitle}>Bem-vindo ao quiz sobre Angola!</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressStep, step >= 1 && styles.progressStepActive]} />
            <View style={[styles.progressStep, step >= 2 && styles.progressStepActive]} />
          </View>

          {step === 1 ? (
            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>Como te chamas?</Text>
              <Text style={styles.stepDescription}>
                Vamos personalizar a tua experiência
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={24} color={theme.colors.yellow} />
                <TextInput
                  style={styles.input}
                  placeholder="Digite o seu nome"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={nome}
                  onChangeText={setNome}
                  autoFocus
                  maxLength={50}
                />
              </View>

              <TouchableOpacity
                style={[styles.continueButton, !nome.trim() && styles.continueButtonDisabled]}
                onPress={handleContinue}
                disabled={!nome.trim()}
              >
                <Text style={styles.continueButtonText}>Continuar</Text>
                <Ionicons name="arrow-forward" size={24} color={theme.colors.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>De que província és?</Text>
              <Text style={styles.stepDescription}>
                Vamos adicionar-te ao ranking da tua província
              </Text>

              <ScrollView style={styles.provinciasContainer} showsVerticalScrollIndicator={false}>
                {PROVINCIAS.map((prov) => (
                  <TouchableOpacity
                    key={prov}
                    style={[
                      styles.provinciaButton,
                      provincia === prov && styles.provinciaButtonSelected,
                    ]}
                    onPress={() => setProvincia(prov)}
                  >
                    <Text
                      style={[
                        styles.provinciaText,
                        provincia === prov && styles.provinciaTextSelected,
                      ]}
                    >
                      {prov}
                    </Text>
                    {provincia === prov && (
                      <Ionicons name="checkmark-circle" size={24} color={theme.colors.yellow} />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
                  <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
                  <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.finishButton,
                    !provincia && styles.finishButtonDisabled,
                  ]}
                  onPress={handleContinue}
                  disabled={!provincia || isLoading}
                >
                  <Text style={styles.finishButtonText}>
                    {isLoading ? 'A guardar...' : 'Começar'}
                  </Text>
                  {!isLoading && (
                    <Ionicons name="checkmark" size={24} color={theme.colors.white} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
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
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 40,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: theme.colors.textSecondary + '30',
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: theme.colors.yellow,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 12,
  },
  stepDescription: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    borderWidth: 2,
    borderColor: theme.colors.yellow + '50',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
    color: theme.colors.white,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.red,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    gap: 8,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  provinciasContainer: {
    maxHeight: 400,
    marginBottom: 24,
  },
  provinciaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  provinciaButtonSelected: {
    borderColor: theme.colors.yellow,
    backgroundColor: theme.colors.yellow + '20',
  },
  provinciaText: {
    fontSize: 18,
    color: theme.colors.white,
  },
  provinciaTextSelected: {
    fontWeight: 'bold',
    color: theme.colors.yellow,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  finishButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.red,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    gap: 8,
  },
  finishButtonDisabled: {
    opacity: 0.5,
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
});
