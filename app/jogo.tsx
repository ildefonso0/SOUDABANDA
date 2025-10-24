import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { questionsService } from '@/services/questionsService';
import QuestionCard from '@/components/QuestionCard';

const gameQuestions = questionsService.getRandomQuestions(10);

export default function JogoScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const question = gameQuestions[currentQuestion];

  useEffect(() => {
    if (answered || timeLeft === 0) return;
    
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
  }, [answered, timeLeft]);

  const handleAnswer = (answerIndex: number | null) => {
    if (answered) return;
    
    setAnswered(true);
    setSelectedAnswer(answerIndex);
    
    const isCorrect = answerIndex === question.resposta_correta;
    
    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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

  return (
    <LinearGradient
      colors={[theme.colors.black, theme.colors.primary + '30']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
        </TouchableOpacity>
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Ionicons name="trophy" size={20} color={theme.colors.gold} />
            <Text style={styles.statText}>{score}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={20} color={theme.colors.primary} />
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
          type={question.tipo as any}
        />
      </Animated.View>

      {showExplanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Sabias que...</Text>
          <Text style={styles.explanationText}>{question.explicacao}</Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentQuestion < gameQuestions.length - 1 ? 'Próxima' : 'Finalizar'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.black + 'CC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  questionCounter: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  timerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black + 'CC',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.gold + '30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  categoryText: {
    fontSize: 14,
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
    padding: 24,
    borderTopWidth: 2,
    borderColor: theme.colors.gold,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.gold,
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 16,
    color: theme.colors.white,
    marginBottom: 16,
    lineHeight: 24,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
});
