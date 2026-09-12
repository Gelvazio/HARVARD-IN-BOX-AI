// tutor-diagnostic.js - Tutor com diagnóstico de lacunas (método Socrático)
export const DIAGNOSTIC_PROMPTS = {
  start: `Você é um tutor educacional elite usando o método Socrático. Seu objetivo é:
1. Fazer UMA pergunta por vez
2. Diagnosticar a lacuna exata na compreensão do aluno
3. Guiar o aluno à resposta correta através de perguntas
4. Nunca dar a resposta direto - sempre questionar

Comece perguntando o que o aluno gostaria de aprender ou sua pergunta específica.`,

  diagnostic: `Com base na resposta anterior, diagnostique:
- Qual é a lacuna real de compreensão?
- O aluno entendeu o conceito básico?
- Há confusão de terminologia?

Faça uma próxima pergunta que REVELE a lacuna, sem dar a resposta.`,

  clarify: `O aluno está confuso. Reformule sua pergunta de forma:
- Mais simples
- Usando analogia com algo do dia a dia
- Quebrando o conceito em partes menores`,

  confirm: `O aluno mostrou compreensão. Confirme fazendo uma pergunta que teste se realmente aprendeu.`,

  next: `Agora que o aluno compreendeu, pergunte como aplicar esse conhecimento em um novo contexto.`,
};

export class TutorDiagnostic {
  constructor(aiRouter, courseContext = {}) {
    this.aiRouter = aiRouter;
    this.courseContext = courseContext;
    this.conversationHistory = [];
    this.diagnosticPhase = 'initial';
    this.studentModel = {
      understanding: 0,
      confusions: [],
      learningStyle: null,
      pace: 'moderate',
    };
  }

  async askQuestion(userMessage) {
    this.conversationHistory.push({
      role: 'student',
      content: userMessage,
      timestamp: new Date().toISOString(),
    });

    // Diagnosticar lacuna
    const diagnostic = await this.diagnoseGap(userMessage);

    // Gerar próxima pergunta
    const nextQuestion = await this.generateQuestion(diagnostic);

    this.conversationHistory.push({
      role: 'tutor',
      content: nextQuestion,
      timestamp: new Date().toISOString(),
      diagnostic,
    });

    return {
      message: nextQuestion,
      diagnostic,
      studentModel: this.studentModel,
      phase: this.diagnosticPhase,
    };
  }

  async diagnoseGap(studentResponse) {
    const systemPrompt = DIAGNOSTIC_PROMPTS.diagnostic;
    const context = this.buildContextPrompt();

    const diagnosisPrompt = `${context}

Resposta do aluno: "${studentResponse}"

Analise:
1. Qual é a lacuna de compreensão?
2. O aluno está no caminho certo?
3. Qual pergunta faria o aluno descobrir a resposta por si?
4. Há confusão terminológica?

Retorne um JSON com: { gap: "...", isCorrect: boolean, nextFocus: "...", suggestion: "..." }`;

    const response = await this.aiRouter.sendMessage([{ role: 'user', content: diagnosisPrompt }], {
      systemPrompt,
    });

    try {
      return JSON.parse(response);
    } catch {
      return {
        gap: 'Conceito não totalmente compreendido',
        isCorrect: false,
        nextFocus: 'Reforçar conceito básico',
        suggestion: 'Fazer pergunta de verificação',
      };
    }
  }

  async generateQuestion(diagnostic) {
    let promptType = DIAGNOSTIC_PROMPTS.diagnostic;

    if (diagnostic.isCorrect) {
      promptType = DIAGNOSTIC_PROMPTS.next;
      this.diagnosticPhase = 'application';
    } else if (diagnostic.gap) {
      promptType = DIAGNOSTIC_PROMPTS.clarify;
      this.studentModel.confusions.push(diagnostic.gap);
    }

    const questionPrompt = `${promptType}

Foco: ${diagnostic.nextFocus}
Sugestão: ${diagnostic.suggestion}

IMPORTANTE: Faça UMA pergunta apenas. Seja Socrático - não explique.`;

    return this.aiRouter.sendMessage([{ role: 'user', content: questionPrompt }], {
      systemPrompt: 'Você é um tutor Socrático. Faça uma pergunta instigante.',
    });
  }

  buildContextPrompt() {
    return `Contexto do aluno:
- Tópico: ${this.courseContext.topic || 'Não especificado'}
- Nível: ${this.courseContext.level || 'Iniciante'}
- Objetivos: ${this.courseContext.objectives?.join(', ') || 'Geral'}
- Histórico de confusões: ${this.studentModel.confusions.join('; ') || 'Nenhuma registrada'}`;
  }

  getConversationHistory() {
    return this.conversationHistory;
  }

  getStudentModel() {
    return this.studentModel;
  }

  resetConversation() {
    this.conversationHistory = [];
    this.studentModel = {
      understanding: 0,
      confusions: [],
      learningStyle: null,
      pace: 'moderate',
    };
    this.diagnosticPhase = 'initial';
  }

  async startTutoringSession(topic, level) {
    this.courseContext = { topic, level };
    this.diagnosticPhase = 'initial';

    const systemPrompt = DIAGNOSTIC_PROMPTS.start;
    const startingQuestion = await this.aiRouter.sendMessage([
      { role: 'user', content: `Vou aprender sobre: ${topic} (Nível: ${level})` },
    ]);

    this.conversationHistory.push({
      role: 'tutor',
      content: startingQuestion,
      timestamp: new Date().toISOString(),
      phase: 'initial',
    });

    return startingQuestion;
  }
}

export const createTutorDiagnostic = (aiRouter, courseContext) =>
  new TutorDiagnostic(aiRouter, courseContext);
