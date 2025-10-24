import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { questionsService } from '@/services/questionsService';
import QuestionCard from '@/components/QuestionCard';

export default function TreinoScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = questionsService.getCategories();
  const questions = selectedCategory 
    ? (selectedCategory === 'all' 
      ? questionsService.getAllQuestions()
      : questionsService.getQuestionsByCategory(selectedCategory))
    : questionsService.getAllQuestions();
  
  const question = questions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setSelectedCategory(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  if (!selectedCategory) {
    return (
      <LinearGradient
        colors={[theme.colors.black, theme.colors.gold + '20']}
        style={styles.container}
      >
        <Text style={styles.title}>Modo Treino</Text>
        <Text style={styles.subtitle}>Escolha uma categoria para começar</Text>

        <View style={styles.categoriesContainer}>
          <TouchableOpacity 
            style={[styles.categoryCard, { borderColor: theme.colors.gold }]}
            onPress={() => setSelectedCategory('all')}
          >
            <Ionicons name="apps" size={40} color={theme.colors.gold} />
            <Text style={styles.categoryTitle}>Todas as Categorias</Text>
            <Text style={styles.categoryCount}>{questions.length} perguntas</Text>
          </TouchableOpacity>

          {categories.map((category) => {
            const count = questionsService.getQuestionsByCategory(category).length;
            const icons: any = {
              'História': 'book',
              'Geografia': 'map',
              'Cultura': 'musical-notes',
              'Língua': 'language',
              'Natureza': 'leaf',
              'Desporto': 'football',
              'Economia': 'cash',
            };
            
            return (
              <TouchableOpacity
                key={category}
                style={styles.categoryCard}
                onPress={() => setSelectedCategory(category)}
              >
                <Ionicons name={icons[category] || 'help'} size={40} color={theme.colors.primary} />
                <Text style={styles.categoryTitle}>{category}</Text>
                <Text style={styles.categoryCount}>{count} perguntas</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[theme.colors.black, theme.colors.gold + '20']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => {
            setSelectedCategory(null);
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setShowExplanation(false);
          }} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>
            {selectedCategory === 'all' ? 'Todas' : selectedCategory}
          </Text>
          <Text style={styles.headerSubtitle}>
            {currentQuestion + 1} / {questions.length}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>📚 {question.categoria}</Text>
        </View>

        <QuestionCard
          question={question.pergunta}
          options={question.opcoes}
          selectedAnswer={selectedAnswer}
          correctAnswer={question.resposta_correta}
          onSelectAnswer={handleAnswer}
          disabled={selectedAnswer !== null}
          showResult={selectedAnswer !== null}
          type={question.tipo as any}
        />

        {showExplanation && (
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>💡 Explicação</Text>
            <Text style={styles.explanationText}>{question.explicacao}</Text>
          </View>
        )}

        <View style={styles.navigation}>
          <TouchableOpacity
            style={[styles.navButton, currentQuestion === 0 && styles.navButtonDisabled]}
            onPress={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <Ionicons name="arrow-back" size={20} color={theme.colors.white} />
            <Text style={styles.navButtonText}>Anterior</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.navButtonPrimary]}
            onPress={handleNext}
          >
            <Text style={styles.navButtonText}>
              {currentQuestion < questions.length - 1 ? 'Próxima' : 'Recomeçar'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
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
    marginBottom: 32,
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary + '30',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginTop: 12,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    color: theme.colors.textSecondary,
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
  headerInfo: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
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
  explanationBox: {
    backgroundColor: theme.colors.gold + '20',
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    marginTop: 24,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.gold,
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
    lineHeight: 24,
  },
  navigation: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 20,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    gap: 8,
    borderWidth: 2,
    borderColor: theme.colors.primary + '30',
  },
  navButtonPrimary: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
});
