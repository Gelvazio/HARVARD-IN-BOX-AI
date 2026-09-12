// milestone-generator.js - Gerador automático de milestones semanais
export class MilestoneGenerator {
  constructor(aiRouter) {
    this.aiRouter = aiRouter;
  }

  async generateMilestones(courseData, weeks = 6) {
    const prompt = this.buildPrompt(courseData, weeks);
    const systemPrompt = `Você é especialista em design instrucional. Crie milestones semanais realistas e mensuráveis.`;

    const response = await this.aiRouter.sendMessage(
      [{ role: 'user', content: prompt }],
      { systemPrompt, maxTokens: 2048 }
    );

    return this.parseMilestones(response, weeks);
  }

  buildPrompt(courseData, weeks) {
    return `
Crie ${weeks} milestones semanais para este curso:

Título: ${courseData.title}
Destino: ${courseData.destination}
Base: ${courseData.base}
Sequência: ${courseData.sequence}

Para cada semana, gere:
1. Título do marco
2. 3-4 objetivos de aprendizagem
3. Prova de conclusão (como validar aprendizado)

Formato:
SEMANA 1: [Título]
- Objetivo 1
- Objetivo 2
- Objetivo 3
Prova: [Como validar]
    `;
  }

  parseMilestones(response, weeks) {
    const milestones = [];

    for (let i = 1; i <= weeks; i++) {
      const weekPattern = new RegExp(
        `SEMANA ${i}:?\\s*(.+?)(?=SEMANA|$)`,
        'is'
      );
      const match = response.match(weekPattern);

      if (match) {
        milestones.push({
          week: i,
          content: match[1].trim(),
          completed: false,
        });
      }
    }

    return milestones.length > 0 ? milestones : this.generateDefaultMilestones(weeks);
  }

  generateDefaultMilestones(weeks) {
    return Array.from({ length: weeks }, (_, i) => ({
      week: i + 1,
      title: `Semana ${i + 1}`,
      objectives: [
        'Aprender conceitos fundamentais',
        'Praticar exemplos',
        'Completar exercícios',
      ],
      proof: 'Concluir exercícios da semana',
      completed: false,
    }));
  }
}

export const createMilestoneGenerator = (aiRouter) => new MilestoneGenerator(aiRouter);
