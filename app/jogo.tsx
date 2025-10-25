import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, ActivityIndicator, Platform, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { questionsService } from '@/services/questionsService';
import QuestionCard from '@/components/QuestionCard';
import { responsive } from '@/utils/responsive';

export default function JogoScreen() {
  const [gameQuestions, setGameQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const question = gameQuestions[currentQuestion];

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await questionsService.getRandomQuestions(10);
        setGameQuestions(questions);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();

    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (answered || timeLeft === 0 || isLoading || !question) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answered, timeLeft, isLoading, question]);

  const triggerHaptic = (type: 'success' | 'error') => {
    if (Platform.OS !== 'web') {
      if (type === 'success') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  };

  const handleAnswer = (answerIndex: number | null) => {
    if (answered) return;

    setAnswered(true);
    setSelectedAnswer(answerIndex);

    const isCorrect = answerIndex === question.resposta_correta;

    if (isCorrect) {
      triggerHaptic('success');
      setScore(score + 10 + streak * 2);
      setStreak(streak + 1);

      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      triggerHaptic('error');
      setStreak(0);
    }

    setTimeout(() => setShowExplanation(true), 500);
  };

  const handleNext = () => {
    if (currentQuestion < gameQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      router.back();
    }
  };

  const getProgressColor = () => {
    if (timeLeft > 20) return theme.colors.success;
    if (timeLeft > 10) return theme.colors.gold;
    return theme.colors.error;
  };

  if (isLoading || gameQuestions.length === 0) {
    return (
      <LinearGradient
        colors={[theme.colors.black, theme.colors.primary + '30']}
        style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
      >
        <ActivityIndicator size="large" color={theme.colors.gold} />
        <Text style={styles.loadingText}>Carregando perguntas...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[theme.colors.black, theme.colors.primary + '30']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={responsive.moderateScale(24)} color={theme.colors.white} />
        </TouchableOpacity>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Ionicons name="trophy" size={responsive.moderateScale(20)} color={theme.colors.gold} />
            <Text style={styles.statText}>{score}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={responsive.moderateScale(20)} color={theme.colors.primary} />
            <Text style={styles.statText}>{streak}</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.questionCounter}>
          {currentQuestion + 1} / {gameQuestions.length}
        </Text>
        <View style={[styles.timerCircle, { borderColor: getProgressColor() }]}>
          <Text style={[styles.timerText, { color: getProgressColor() }]}>
            {timeLeft}s
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>📚 {question.categoria}</Text>
        </View>

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <QuestionCard
            question={question.pergunta}
            options={question.opcoes}
            selectedAnswer={selectedAnswer}
            correctAnswer={question.resposta_correta}
            onSelectAnswer={handleAnswer}
            disabled={answered}
            showResult={answered}
            type={question.tipo}
          />
        </Animated.View>
      </ScrollView>

      {showExplanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Sabias que...</Text>
          <Text style={styles.explanationText}>{question.explicacao}</Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentQuestion < gameQuestions.length - 1 ? 'Próxima' : 'Finalizar'}
            </Text>
            <Ionicons name="arrow-forward" size={responsive.moderateScale(20)} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: responsive.hp(7),
    paddingHorizontal: responsive.wp(5),
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: responsive.hp(25),
  },
  loadingText: {
    color: theme.colors.white,
    marginTop: responsive.getResponsiveSpacing(16),
    fontSize: responsive.getResponsiveFontSize(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.getResponsiveSpacing(24),
  },
  backButton: {
    width: responsive.moderateScale(40),
    height: responsive.moderateScale(40),
    borderRadius: responsive.moderateScale(20),
    backgroundColor: theme.colors.black + 'CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    flexDirection: 'row',
    gap: responsive.getResponsiveSpacing(16),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.getResponsiveSpacing(4),
    backgroundColor: theme.colors.black + 'CC',
    paddingHorizontal: responsive.getResponsiveSpacing(12),
    paddingVertical: responsive.getResponsiveSpacing(6),
    borderRadius: 20,
  },
  statText: {
    fontSize: responsive.getResponsiveFontSize(16),
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.getResponsiveSpacing(24),
  },
  questionCounter: {
    fontSize: responsive.getResponsiveFontSize(16),
    color: theme.colors.textSecondary,
  },
  timerCircle: {
    width: responsive.moderateScale(60),
    height: responsive.moderateScale(60),
    borderRadius: responsive.moderateScale(30),
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black + 'CC',
  },
  timerText: {
    fontSize: responsive.getResponsiveFontSize(18),
    fontWeight: 'bold',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.gold + '30',
    paddingHorizontal: responsive.getResponsiveSpacing(16),
    paddingVertical: responsive.getResponsiveSpacing(8),
    borderRadius: 20,
    marginBottom: responsive.getResponsiveSpacing(24),
  },
  categoryText: {
    fontSize: responsive.getResponsiveFontSize(14),
    color: theme.colors.gold,
    fontWeight: 'bold',
  },
  explanationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.black + 'F5',
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    padding: responsive.getResponsiveSpacing(24),
    borderTopWidth: 2,
    borderColor: theme.colors.gold,
    maxHeight: responsive.hp(40),
  },
  explanationTitle: {
    fontSize: responsive.getResponsiveFontSize(18),
    fontWeight: 'bold',
    color: theme.colors.gold,
    marginBottom: responsive.getResponsiveSpacing(8),
  },
  explanationText: {
    fontSize: responsive.getResponsiveFontSize(16),
    color: theme.colors.white,
    marginBottom: responsive.getResponsiveSpacing(16),
    lineHeight: responsive.getResponsiveFontSize(24),
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: responsive.getResponsiveSpacing(16),
    gap: responsive.getResponsiveSpacing(8),
  },
  nextButtonText: {
    fontSize: responsive.getResponsiveFontSize(16),
    fontWeight: 'bold',
    color: theme.colors.white,
  },
});
