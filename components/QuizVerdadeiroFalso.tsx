import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

interface QuizVerdadeiroFalsoProps {
  pergunta: string;
  selectedAnswer: boolean | null;
  correctAnswer: boolean;
  onSelectAnswer: (answer: boolean) => void;
  disabled: boolean;
  showResult: boolean;
}

export default function QuizVerdadeiroFalso({
  pergunta,
  selectedAnswer,
  correctAnswer,
  onSelectAnswer,
  disabled,
  showResult,
}: QuizVerdadeiroFalsoProps) {
  const renderButton = (value: boolean, label: string) => {
    const isSelected = selectedAnswer === value;
    const isCorrect = value === correctAnswer;

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
        style={[styles.optionButton, { backgroundColor, borderColor }]}
        onPress={() => onSelectAnswer(value)}
        disabled={disabled}
      >
        <View style={styles.optionContent}>
          <Ionicons 
            name={value ? "checkmark-circle-outline" : "close-circle-outline"} 
            size={32} 
            color={value ? theme.colors.success : theme.colors.error} 
          />
          <Text style={styles.optionText}>{label}</Text>
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
        {renderButton(true, 'Verdadeiro')}
        {renderButton(false, 'Falso')}
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
    padding: 20,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionText: {
    fontSize: 18,
    color: theme.colors.white,
    fontWeight: 'bold',
    flex: 1,
  },
});
