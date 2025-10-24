import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

interface QuizImagemTextoProps {
  pergunta: string;
  imagem: string;
  userAnswer: string;
  correctAnswer: string;
  onAnswerChange: (answer: string) => void;
  onSubmitAnswer: () => void;
  disabled: boolean;
  showResult: boolean;
}

export default function QuizImagemTexto({
  pergunta,
  imagem,
  userAnswer,
  correctAnswer,
  onAnswerChange,
  onSubmitAnswer,
  disabled,
  showResult,
}: QuizImagemTextoProps) {
  const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

  let inputBorderColor = theme.colors.primary + '30';
  let inputBackgroundColor = theme.colors.black + 'CC';

  if (showResult) {
    if (isCorrect) {
      inputBorderColor = theme.colors.success;
      inputBackgroundColor = theme.colors.success + '30';
    } else {
      inputBorderColor = theme.colors.error;
      inputBackgroundColor = theme.colors.error + '30';
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{pergunta}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imagem }} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackgroundColor, borderColor: inputBorderColor }]}
          value={userAnswer}
          onChangeText={onAnswerChange}
          placeholder="Digite sua resposta..."
          placeholderTextColor={theme.colors.textSecondary}
          editable={!disabled}
          autoCapitalize="words"
        />
        
        {!showResult && (
          <TouchableOpacity
            style={[styles.submitButton, disabled && styles.submitButtonDisabled]}
            onPress={onSubmitAnswer}
            disabled={disabled || !userAnswer.trim()}
          >
            <Text style={styles.submitButtonText}>Responder</Text>
          </TouchableOpacity>
        )}

        {showResult && (
          <View style={styles.resultContainer}>
            {isCorrect ? (
              <View style={styles.resultCorrect}>
                <Ionicons name="checkmark-circle" size={32} color={theme.colors.success} />
                <Text style={styles.resultText}>Correto!</Text>
              </View>
            ) : (
              <View style={styles.resultWrong}>
                <Ionicons name="close-circle" size={32} color={theme.colors.error} />
                <View>
                  <Text style={styles.resultText}>Resposta correta:</Text>
                  <Text style={styles.correctAnswerText}>{correctAnswer}</Text>
                </View>
              </View>
            )}
          </View>
        )}
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
    marginBottom: 24,
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
  },
  question: {
    fontSize: 20,
    color: theme.colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    backgroundColor: theme.colors.black + 'CC',
    borderRadius: theme.borderRadius.lg,
    padding: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  inputContainer: {
    gap: 16,
  },
  input: {
    borderWidth: 2,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    fontSize: 16,
    color: theme.colors.white,
  },
  submitButton: {
    backgroundColor: theme.colors.gold,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  resultContainer: {
    marginTop: 8,
  },
  resultCorrect: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: theme.colors.success + '30',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.success,
  },
  resultWrong: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: theme.colors.error + '30',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.error,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  correctAnswerText: {
    fontSize: 16,
    color: theme.colors.white,
    marginTop: 4,
  },
});
