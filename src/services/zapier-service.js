// zapier-service.js - Integração com Zapier para automação com Google Calendar e Google Docs
export class ZapierService {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
  }

  async sendCourseToZapier(courseData, milestonesData) {
    if (!this.webhookUrl) {
      console.warn('Zapier webhook URL não configurada');
      return null;
    }

    const payload = {
      action: 'create_course_automation',
      course: {
        title: courseData.title,
        description: courseData.description,
        goal: courseData.goal,
        level: courseData.current_level,
        duration_weeks: courseData.total_duration_weeks,
        created_at: new Date().toISOString(),
      },
      milestones: milestonesData.map((m) => ({
        week: m.week_number,
        title: m.title,
        description: m.description,
        objectives: m.learning_objectives || [],
        proof: m.proof_of_completion,
        due_date: this.calculateMilestoneDate(m.week_number, courseData.total_duration_weeks),
      })),
    };

    return this.sendToWebhook(payload);
  }

  async sendMilestoneToCalendar(milestone, courseTitle) {
    if (!this.webhookUrl) {
      console.warn('Zapier webhook URL não configurada');
      return null;
    }

    const payload = {
      action: 'create_calendar_event',
      event: {
        title: `${courseTitle} - Semana ${milestone.week_number}: ${milestone.title}`,
        description: milestone.description,
        date: this.calculateMilestoneDate(milestone.week_number, 6),
        objectives: milestone.learning_objectives || [],
      },
    };

    return this.sendToWebhook(payload);
  }

  async sendDocumentToGoogleDocs(courseData, milestonesData) {
    if (!this.webhookUrl) {
      console.warn('Zapier webhook URL não configurada');
      return null;
    }

    const payload = {
      action: 'create_google_doc',
      document: {
        title: `Plano de Estudo - ${courseData.title}`,
        course_goal: courseData.goal,
        current_level: courseData.current_level,
        content: this.formatCourseContent(courseData, milestonesData),
      },
    };

    return this.sendToWebhook(payload);
  }

  async sendToWebhook(payload) {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao enviar para Zapier:', error);
      return null;
    }
  }

  calculateMilestoneDate(weekNumber, totalWeeks) {
    const startDate = new Date();
    const daysToAdd = (weekNumber - 1) * 7;
    const date = new Date(startDate);
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  }

  formatCourseContent(courseData, milestonesData) {
    let content = `# Plano de Estudo Personalizado\n\n`;
    content += `## Objetivo\n${courseData.goal}\n\n`;
    content += `## Seu Nível Atual\n${courseData.current_level}\n\n`;
    content += `## Sequência de Aprendizagem\n${courseData.sequence}\n\n`;
    content += `## Milestones Semanais\n`;

    milestonesData.forEach((m) => {
      content += `\n### Semana ${m.week_number}: ${m.title}\n`;
      content += `${m.description}\n`;
      content += `**Objetivos**: ${m.learning_objectives?.join(', ') || 'Não definidos'}\n`;
      content += `**Prova de Conclusão**: ${m.proof_of_completion}\n`;
    });

    return content;
  }
}

export const createZapierService = (webhookUrl) => new ZapierService(webhookUrl);
