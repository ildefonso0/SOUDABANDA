import { Quiz, Question, QuestionOption, QuestionType } from '@/types/quiz';

export class QuizAdapter {
  static quizToQuestion(quiz: Quiz): Question {
    let opcoes: QuestionOption[] = [];
    let resposta_correta = 0;
    let tipo: QuestionType = 'text';

    if (quiz.tipo === 'multipla_escolha' && Array.isArray(quiz.opcoes)) {
      opcoes = quiz.opcoes.map(texto => ({ texto }));
      resposta_correta = quiz.resposta_correta as number;
      tipo = 'text';
    } else if (quiz.tipo === 'verdadeiro_falso') {
      opcoes = [
        { texto: 'Verdadeiro' },
        { texto: 'Falso' }
      ];
      resposta_correta = quiz.resposta_correta === true ? 0 : 1;
      tipo = 'text';
    } else if (quiz.tipo === 'imagem_para_texto') {
      opcoes = [{ texto: String(quiz.resposta_correta), imagem: quiz.imagem }];
      resposta_correta = 0;
      tipo = 'image';
    } else if (quiz.tipo === 'completar_frase') {
      opcoes = [{ texto: String(quiz.resposta_correta) }];
      resposta_correta = 0;
      tipo = 'text';
    } else {
      opcoes = [
        { texto: 'Opção 1' },
        { texto: 'Opção 2' },
        { texto: 'Opção 3' }
      ];
      resposta_correta = 0;
      tipo = 'text';
    }

    return {
      id: String(quiz.id),
      categoria: quiz.categoria,
      tipo,
      pergunta: quiz.pergunta,
      opcoes,
      resposta_correta,
      explicacao: quiz.explicacao || ''
    };
  }

  static quizzesToQuestions(quizzes: Quiz[]): Question[] {
    return quizzes.map(this.quizToQuestion);
  }
}
