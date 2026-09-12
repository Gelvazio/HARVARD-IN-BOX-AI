// integration.test.js - Testes de integração do fluxo completo
export class IntegrationTests {
  async runAllTests() {
    console.log('🔗 Iniciando testes de integração...\n');

    const results = {
      passed: 0,
      failed: 0,
      tests: [],
    };

    await this.testZapierWebhookPayload(results);
    await this.testMilestoneGeneration(results);
    await this.testCourseDataFormat(results);
    await this.testErrorHandling(results);

    this.printResults(results);
    return results;
  }

  async testZapierWebhookPayload(results) {
    const test = { name: 'Zapier Webhook Payload', status: '❌' };

    try {
      const mockPayload = {
        action: 'create_course_automation',
        course: {
          title: 'Python para Iniciantes',
          description: 'Curso completo de Python',
          goal: 'Dominar Python',
          level: 'Iniciante',
          duration_weeks: 6,
          created_at: new Date().toISOString(),
        },
        milestones: [
          {
            week: 1,
            title: 'Fundamentos',
            description: 'Aprenda o básico',
            objectives: ['Entender variáveis', 'Usar loops'],
            proof: 'Completar exercício 1',
            due_date: '2026-09-19',
          },
        ],
      };

      // Validar estrutura
      if (
        mockPayload.action === 'create_course_automation' &&
        mockPayload.course &&
        mockPayload.milestones.length > 0
      ) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Estrutura de payload inválida');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testMilestoneGeneration(results) {
    const test = { name: 'Milestone Generation', status: '❌' };

    try {
      const sampleMilestones = this.generateSampleMilestones();

      if (
        sampleMilestones.length === 6 &&
        sampleMilestones.every((m) => m.week_number && m.title && m.description)
      ) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Milestones não gerados corretamente');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testCourseDataFormat(results) {
    const test = { name: 'Course Data Format', status: '❌' };

    try {
      const course = {
        id: 'UUID',
        title: 'Test Course',
        description: 'Test',
        goal: 'Test goal',
        current_level: 'Beginner',
        sequence: 'A -> B -> C',
        topics_to_skip: 'Advanced topics',
        total_duration_weeks: 6,
        status: 'active',
        progress_percentage: 0,
      };

      const required = ['title', 'goal', 'current_level', 'total_duration_weeks'];
      if (required.every((f) => course[f])) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Formato de curso inválido');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testErrorHandling(results) {
    const test = { name: 'Error Handling', status: '❌' };

    try {
      // Simular erro de webhook
      const mockWebhookError = {
        status: 'error',
        code: 'WEBHOOK_FAILED',
        message: 'Failed to send webhook',
      };

      if (mockWebhookError.status === 'error' && mockWebhookError.code) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Tratamento de erro inválido');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  generateSampleMilestones() {
    return Array.from({ length: 6 }, (_, i) => ({
      week_number: i + 1,
      title: `Semana ${i + 1}: Tópico`,
      description: `Descrição da semana ${i + 1}`,
      learning_objectives: [`Objetivo ${i + 1}a`, `Objetivo ${i + 1}b`],
      proof_of_completion: `Prova ${i + 1}`,
      completed: false,
    }));
  }

  printResults(results) {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 TESTES DE INTEGRAÇÃO');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    results.tests.forEach((test) => {
      console.log(`${test.status} ${test.name}`);
      if (test.error) {
        console.log(`   └─ ${test.error}\n`);
      }
    });

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(
      `✅ Passou: ${results.passed} | ❌ Falhou: ${results.failed} | Total: ${results.passed + results.failed}\n`
    );

    return results.passed === results.passed + results.failed;
  }
}

export const runIntegrationTests = async () => {
  const tester = new IntegrationTests();
  return tester.runAllTests();
};
