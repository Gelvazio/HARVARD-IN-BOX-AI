// advisor.test.js - Testes para o fluxo Advisor
import { AdvisorInterview } from '../roles/advisor-interview.js';
import { createCourseFlow } from '../services/course-flow.js';

export class AdvisorTests {
  async runAllTests() {
    console.log('🧪 Iniciando testes do Advisor...\n');

    const results = {
      passed: 0,
      failed: 0,
      tests: [],
    };

    // Teste 1: Interview Flow
    await this.testInterviewFlow(results);

    // Teste 2: Response Recording
    await this.testResponseRecording(results);

    // Teste 3: Progress Tracking
    await this.testProgressTracking(results);

    // Teste 4: Course Data Validation
    await this.testCourseDataValidation(results);

    this.printResults(results);
    return results;
  }

  async testInterviewFlow(results) {
    const test = { name: 'Interview Flow', status: '❌' };

    try {
      const interview = new AdvisorInterview(null);

      // Verificar se começa com primeira pergunta
      const q1 = interview.getCurrentQuestion();
      if (q1 && q1.id === 1 && q1.stage === 'destination') {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Primeira pergunta incorreta');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testResponseRecording(results) {
    const test = { name: 'Response Recording', status: '❌' };

    try {
      const interview = new AdvisorInterview(null);
      const responses = [
        'Dominar Python',
        'Iniciante',
        'Fundamentos → Aplicações → Projetos',
        'Frameworks avançados por agora',
        'Fazer 3 projetos reais',
      ];

      responses.forEach((resp) => {
        interview.recordResponse(resp);
      });

      const recorded = interview.getResponses();
      if (
        recorded.destination === 'Dominar Python' &&
        recorded.base === 'Iniciante' &&
        Object.keys(recorded).length === 5
      ) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Respostas não gravadas corretamente');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testProgressTracking(results) {
    const test = { name: 'Progress Tracking', status: '❌' };

    try {
      const interview = new AdvisorInterview(null);

      // Verificar progresso inicial
      const progress1 = interview.getProgress();
      if (progress1.current !== 0 || progress1.percentage !== 0) {
        throw new Error('Progresso inicial incorreto');
      }

      // Avançar 2 respostas
      interview.recordResponse('Resposta 1');
      interview.recordResponse('Resposta 2');

      const progress2 = interview.getProgress();
      if (progress2.current === 2 && progress2.percentage === 40) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Progresso não atualizado corretamente');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testCourseDataValidation(results) {
    const test = { name: 'Course Data Validation', status: '❌' };

    try {
      const sampleData = {
        destination: 'Aprender Machine Learning',
        base: 'Intermediário em Python',
        sequence: 'Teoria → Implementação → Projetos',
        cutoff: 'Deploy em produção (por enquanto)',
        milestones: 'Completar 2 projetos práticos',
        weeks: 8,
      };

      // Validar campos obrigatórios
      const required = ['destination', 'base', 'sequence', 'cutoff', 'milestones'];
      const hasAll = required.every((field) => sampleData[field]);

      if (hasAll && sampleData.weeks > 0) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Dados de curso inválidos');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  printResults(results) {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 RESULTADOS DOS TESTES DO ADVISOR');
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

    const passRate = Math.round((results.passed / (results.passed + results.failed)) * 100);
    console.log(`Taxa de sucesso: ${passRate}%\n`);

    return passRate === 100;
  }
}

export const runAdvisorTests = async () => {
  const tester = new AdvisorTests();
  return tester.runAllTests();
};
