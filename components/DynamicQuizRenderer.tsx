import { useState } from 'react';
import { Quiz } from '@/types/quiz';
import QuizMultiplaEscolha from './QuizMultiplaEscolha';
import QuizVerdadeiroFalso from './QuizVerdadeiroFalso';
import QuizImagemTexto from './QuizImagemTexto';
import QuizCompletarFrase from './QuizCompletarFrase';

interface DynamicQuizRendererProps {
  quiz: Quiz;
  onAnswerSubmit: (isCorrect: boolean) => void;
  disabled?: boolean;
  showResult?: boolean;
}

export default function DynamicQuizRenderer({
  quiz,
  onAnswerSubmit,
  disabled = false,
  showResult = false,
}: DynamicQuizRendererProps) {
  const [selectedMultipleChoice, setSelectedMultipleChoice] = useState<number | null>(null);
  const [selectedTrueFalse, setSelectedTrueFalse] = useState<boolean | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleMultipleChoiceSelect = (index: number) => {
    if (disabled || hasSubmitted) return;
    setSelectedMultipleChoice(index);
    const isCorrect = index === quiz.resposta_correta;
    setHasSubmitted(true);
    onAnswerSubmit(isCorrect);
  };

  const handleTrueFalseSelect = (value: boolean) => {
    if (disabled || hasSubmitted) return;
    setSelectedTrueFalse(value);
    const isCorrect = value === quiz.resposta_correta;
    setHasSubmitted(true);
    onAnswerSubmit(isCorrect);
  };

  const handleTextSubmit = () => {
    if (disabled || hasSubmitted || !textAnswer.trim()) return;
    const isCorrect = textAnswer.trim().toLowerCase() === String(quiz.resposta_correta).trim().toLowerCase();
    setHasSubmitted(true);
    onAnswerSubmit(isCorrect);
  };

  switch (quiz.tipo) {
    case 'multipla_escolha':
      return (
        <QuizMultiplaEscolha
          pergunta={quiz.pergunta}
          opcoes={quiz.opcoes || []}
          selectedAnswer={selectedMultipleChoice}
          correctAnswer={quiz.resposta_correta as number}
          onSelectAnswer={handleMultipleChoiceSelect}
          disabled={disabled || hasSubmitted}
          showResult={showResult || hasSubmitted}
        />
      );

    case 'verdadeiro_falso':
      return (
        <QuizVerdadeiroFalso
          pergunta={quiz.pergunta}
          selectedAnswer={selectedTrueFalse}
          correctAnswer={quiz.resposta_correta as boolean}
          onSelectAnswer={handleTrueFalseSelect}
          disabled={disabled || hasSubmitted}
          showResult={showResult || hasSubmitted}
        />
      );

    case 'imagem_para_texto':
      return (
        <QuizImagemTexto
          pergunta={quiz.pergunta}
          imagem={quiz.imagem || ''}
          userAnswer={textAnswer}
          correctAnswer={String(quiz.resposta_correta)}
          onAnswerChange={setTextAnswer}
          onSubmitAnswer={handleTextSubmit}
          disabled={disabled || hasSubmitted}
          showResult={showResult || hasSubmitted}
        />
      );

    case 'completar_frase':
      return (
        <QuizCompletarFrase
          pergunta={quiz.pergunta}
          userAnswer={textAnswer}
          correctAnswer={String(quiz.resposta_correta)}
          onAnswerChange={setTextAnswer}
          onSubmitAnswer={handleTextSubmit}
          disabled={disabled || hasSubmitted}
          showResult={showResult || hasSubmitted}
        />
      );

    default:
      if (quiz.opcoes) {
        return (
          <QuizMultiplaEscolha
            pergunta={quiz.pergunta}
            opcoes={quiz.opcoes}
            selectedAnswer={selectedMultipleChoice}
            correctAnswer={quiz.resposta_correta as number}
            onSelectAnswer={handleMultipleChoiceSelect}
            disabled={disabled || hasSubmitted}
            showResult={showResult || hasSubmitted}
          />
        );
      }
      return null;
  }
}
