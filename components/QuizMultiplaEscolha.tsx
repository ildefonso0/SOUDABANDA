import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

interface QuizMultiplaEscolhaProps {
  pergunta: string;
  opcoes: string[];
  selectedAnswer: number | null;
  correctAnswer: number;
  onSelectAnswer: (index: number) => void;
  disabled: boolean;
  showResult: boolean;
}

export default function QuizMultiplaEscolha({
  pergunta,
  opcoes,
  selectedAnswer,
  correctAnswer,
  onSelectAnswer,
  disabled,
  showResult,
}: QuizMultiplaEscolhaProps) {
  const renderOption = (option: string, index: number) => {
    const isSelected = selectedAnswer === index;
    const isCorrect = index === correctAnswer;

    let backgroundColor = theme.colors.black + 'CC';
    let borderColor = theme.colors.primary + '30';

    if (showResult) {
      if (isCorrect) {
        backgroundColor = theme.colors.success + '30';
        borderColor = theme.colors.success;
      } else if (isSelected && !isCorrect) {
        backgroundColor = theme.colors.error + '30';
        borderColor = theme.colors.error;
      }
    } else if (isSelected) {
      borderColor = theme.colors.gold;
    }

    return (
      <TouchableOpacity
        key={index}
        style={[styles.optionButton, { backgroundColor, borderColor }]}
        onPress={() => onSelectAnswer(index)}
        disabled={disabled}
      >
        <View style={styles.optionContent}>
          <Text style={styles.optionText}>{option}</Text>
          {showResult && isCorrect && (
            <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
          )}
          {showResult && isSelected && !isCorrect && (
            <Ionicons name="close-circle" size={24} color={theme.colors.error} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{pergunta}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {opcoes.map((option, index) => renderOption(option, index))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionContainer: {
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
  },
  question: {
    fontSize: 20,
    color: theme.colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  optionText: {
    fontSize: 16,
    color: theme.colors.white,
    flex: 1,
  },
});
