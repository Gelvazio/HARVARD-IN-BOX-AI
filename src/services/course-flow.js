// course-flow.js - Orquestra o fluxo completo de criação de curso
export class CourseFlow {
  constructor({ aiRouter, courseService, milestoneGenerator, zapierService }) {
    this.aiRouter = aiRouter;
    this.courseService = courseService;
    this.milestoneGenerator = milestoneGenerator;
    this.zapierService = zapierService;
  }

  async createCompleteUserJourney(userId, topic, interviewResponses) {
    const startTime = Date.now();

    // 1. Gerar descrição do curso via AI
    const courseDescription = await this.generateCourseDescription(topic, interviewResponses);

    // 2. Salvar curso no Supabase
    const course = await this.courseService.saveCourse(userId, {
      title: topic,
      description: courseDescription,
      ...interviewResponses,
      weeks: interviewResponses.weeks || 6,
    });

    if (!course) throw new Error('Falha ao salvar curso');

    // 3. Gerar milestones
    const milestonesPrompt = this.buildMilestonesPrompt(topic, interviewResponses);
    const milestonesContent = await this.aiRouter.sendMessage([
      { role: 'user', content: milestonesPrompt },
    ]);

    const milestones = this.parseMilestones(milestonesContent);
    const savedMilestones = await this.courseService.saveMilestones(course.id, milestones);

    // 4. Enviar para Zapier (Google Calendar + Google Docs)
    if (this.zapierService) {
      await this.zapierService.sendCourseToZapier(course, savedMilestones);
      await this.zapierService.sendDocumentToGoogleDocs(course, savedMilestones);
    }

    const endTime = Date.now();

    return {
      success: true,
      course,
      milestones: savedMilestones,
      duration: endTime - startTime,
      timestamp: new Date().toISOString(),
    };
  }

  async generateCourseDescription(topic, responses) {
    const prompt = `Você é um educador expert. Crie uma descrição concisa (máximo 3 linhas) para um curso sobre "${topic}" baseado nessas informações:
- Objetivo: ${responses.destination}
- Nível atual: ${responses.base}
- Duração: ${responses.weeks || 6} semanas`;

    const message = await this.aiRouter.sendMessage([
      { role: 'user', content: prompt },
    ]);

    return message || 'Curso de aprendizagem personalizado';
  }

  buildMilestonesPrompt(topic, responses) {
    return `Crie 6 milestones (um por semana) para o curso "${topic}".
Respeite essa estrutura:
- Base atual: ${responses.base}
- Sequência: ${responses.sequence}
- Tópicos a ignorar: ${responses.cutoff}

Para cada milestone, forneça:
1. Título da semana
2. Descrição (1-2 linhas)
3. 2-3 objetivos de aprendizagem
4. Prova de conclusão (o que prova que aprendeu)

Formato: **Semana 1: [Título]**...`;
  }

  parseMilestones(content) {
    const milestones = [];
    const weekMatches = content.match(/\*\*Semana \d+:.*?\*\*/g) || [];

    weekMatches.forEach((match, idx) => {
      milestones.push({
        title: match.replace(/\*\*/g, '').replace('Semana ', ''),
        content: `Conteúdo da semana ${idx + 1}`,
        objectives: [`Objetivo ${idx + 1}a`, `Objetivo ${idx + 1}b`],
        proof: `Completar atividade da semana ${idx + 1}`,
      });
    });

    return milestones.length > 0
      ? milestones
      : this.getDefaultMilestones();
  }

  getDefaultMilestones() {
    return Array.from({ length: 6 }, (_, i) => ({
      title: `Semana ${i + 1}: Fundamentos`,
      content: `Aprender conceitos fundamentais - Semana ${i + 1}`,
      objectives: [`Entender conceito ${i + 1}`, `Aplicar conhecimento ${i + 1}`],
      proof: `Completar exercício semanal ${i + 1}`,
    }));
  }
}

export const createCourseFlow = (services) => new CourseFlow(services);
