import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { theme } from '@/constants/theme';
import { QuestionOption } from '@/types/quiz';

interface QuestionCardProps {
  question: string;
  options: QuestionOption[];
  selectedAnswer: number | null;
  correctAnswer: number;
  onSelectAnswer: (index: number) => void;
  disabled: boolean;
  showResult: boolean;
  type?: 'text' | 'image' | 'audio' | 'mixed';
}

export default function QuestionCard({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  onSelectAnswer,
  disabled,
  showResult,
  type = 'text',
}: QuestionCardProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = async (audioUrl: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setSound(newSound);
      setIsPlaying(true);
      await newSound.playAsync();
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };
  const renderOption = (option: QuestionOption, index: number) => {
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
        {type === 'image' && option.imagem && (
          <Image 
            source={{ uri: option.imagem }} 
            style={styles.optionImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.optionContent}>
          {(type === 'audio' || type === 'mixed') && option.audio && (
            <TouchableOpacity
              style={styles.audioButton}
              onPress={() => isPlaying ? stopAudio() : playAudio(option.audio!)}
            >
              <Ionicons 
                name={isPlaying ? 'pause-circle' : 'play-circle'} 
                size={32} 
                color={theme.colors.gold} 
              />
            </TouchableOpacity>
          )}
          <Text style={styles.optionText}>{option.texto}</Text>
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
        <Text style={styles.question}>{question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => renderOption(option, index))}
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
    overflow: 'hidden',
  },
  optionImage: {
    width: '100%',
    height: 150,
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
  audioButton: {
    marginRight: 12,
  },
});
