// advisor-interview.js - Fluxo de entrevista do Advisor (5 perguntas)
export const INTERVIEW_FLOW = [
  {
    id: 1,
    stage: 'destination',
    prompt: 'Qual é seu DESTINO? O que você quer saber/fazer ao final deste curso?',
    description: 'Definir o objetivo final do aprendizado',
  },
  {
    id: 2,
    stage: 'base',
    prompt: 'Qual é sua BASE? Onde você está hoje nesse tópico? (iniciante/intermediário/avançado)',
    description: 'Entender o nível atual de conhecimento',
  },
  {
    id: 3,
    stage: 'sequence',
    prompt: 'Em que SEQUÊNCIA aprender? Qual ordem faz mais sentido para você?',
    description: 'Definir a ordem de aprendizagem',
  },
  {
    id: 4,
    stage: 'cutoff',
    prompt: 'O que IGNORAR por agora? Quais tópicos devo deixar para depois?',
    description: 'Identificar o que não é prioridade',
  },
  {
    id: 5,
    stage: 'milestones',
    prompt: 'Quais são seus MILESTONES? O que prova que você está pronto pra avançar?',
    description: 'Definir marcos de progresso',
  },
];

export class AdvisorInterview {
  constructor(aiRouter) {
    this.aiRouter = aiRouter;
    this.currentStep = 0;
    this.responses = {};
  }

  getCurrentQuestion() {
    return INTERVIEW_FLOW[this.currentStep] || null;
  }

  isComplete() {
    return this.currentStep >= INTERVIEW_FLOW.length;
  }

  recordResponse(response) {
    const question = this.getCurrentQuestion();
    if (!question) return false;

    this.responses[question.stage] = response;
    this.currentStep += 1;
    return true;
  }

  getResponses() {
    return { ...this.responses };
  }

  getProgress() {
    return {
      current: this.currentStep,
      total: INTERVIEW_FLOW.length,
      percentage: Math.round((this.currentStep / INTERVIEW_FLOW.length) * 100),
    };
  }

  reset() {
    this.currentStep = 0;
    this.responses = {};
  }

  async generateCourseDescription(topic) {
    const responses = this.getResponses();
    const systemPrompt = `Você é um consultor educacional elite. Com base nas respostas do aluno, crie uma descrição concisa (3 linhas) do curso personalizado.`;

    const userPrompt = `
Tópico: ${topic}
Destino: ${responses.destination}
Base: ${responses.base}
Sequência: ${responses.sequence}
Ignorar: ${responses.cutoff}
Milestones: ${responses.milestones}

Gere uma descrição do curso personalizado.
    `;

    return this.aiRouter.sendMessage(
      [{ role: 'user', content: userPrompt }],
      { systemPrompt }
    );
  }
}

export const createAdvisorInterview = (aiRouter) => new AdvisorInterview(aiRouter);
