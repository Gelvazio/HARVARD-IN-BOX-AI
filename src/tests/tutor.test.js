// tutor.test.js - Testes para o Tutor (Diagnóstico de Lacunas)
import { TutorDiagnostic } from '../roles/tutor-diagnostic.js';

export class TutorTests {
  async runAllTests() {
    console.log('🎓 Iniciando testes do Tutor...\n');

    const results = {
      passed: 0,
      failed: 0,
      tests: [],
    };

    await this.testTutorInitialization(results);
    await this.testDiagnosticPhases(results);
    await this.testConversationHistory(results);
    await this.testStudentModel(results);
    await this.testSocraticMethod(results);

    this.printResults(results);
    return results;
  }

  async testTutorInitialization(results) {
    const test = { name: 'Tutor Initialization', status: '❌' };

    try {
      const tutor = new TutorDiagnostic(null, {
        topic: 'Python',
        level: 'Iniciante',
      });

      if (
        tutor.courseContext.topic === 'Python' &&
        tutor.diagnosticPhase === 'initial' &&
        tutor.conversationHistory.length === 0
      ) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Inicialização incorreta');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testDiagnosticPhases(results) {
    const test = { name: 'Diagnostic Phases', status: '❌' };

    try {
      const tutor = new TutorDiagnostic(null);

      // Phase 1: Initial
      if (tutor.diagnosticPhase !== 'initial') {
        throw new Error('Fase inicial incorreta');
      }

      // Phase 2: Simulate diagnostic
      tutor.diagnosticPhase = 'diagnostic';
      if (tutor.diagnosticPhase === 'diagnostic') {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Mudança de fase incorreta');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testConversationHistory(results) {
    const test = { name: 'Conversation History', status: '❌' };

    try {
      const tutor = new TutorDiagnostic(null);

      // Simular mensagens
      tutor.conversationHistory.push({
        role: 'student',
        content: 'O que é uma variável?',
        timestamp: new Date().toISOString(),
      });

      tutor.conversationHistory.push({
        role: 'tutor',
        content: 'Como você descreveria o valor que um programa armazena?',
        timestamp: new Date().toISOString(),
      });

      const history = tutor.getConversationHistory();

      if (
        history.length === 2 &&
        history[0].role === 'student' &&
        history[1].role === 'tutor'
      ) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Histórico não mantido corretamente');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testStudentModel(results) {
    const test = { name: 'Student Model Tracking', status: '❌' };

    try {
      const tutor = new TutorDiagnostic(null);

      tutor.studentModel.understanding = 0.5;
      tutor.studentModel.confusions.push('Variáveis globais');
      tutor.studentModel.pace = 'slow';

      const model = tutor.getStudentModel();

      if (
        model.understanding === 0.5 &&
        model.confusions.includes('Variáveis globais') &&
        model.pace === 'slow'
      ) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Modelo de aluno não rastreado');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  async testSocraticMethod(results) {
    const test = { name: 'Socratic Method Validation', status: '❌' };

    try {
      const tutor = new TutorDiagnostic(null);
      const context = tutor.buildContextPrompt();

      // Validar que o contexto contém informações necessárias
      if (
        context.includes('Tópico:') &&
        context.includes('Nível:') &&
        context.includes('Histórico de confusões:')
      ) {
        test.status = '✅';
        results.passed++;
      } else {
        throw new Error('Contexto Socrático incompleto');
      }
    } catch (e) {
      test.error = e.message;
      results.failed++;
    }

    results.tests.push(test);
  }

  printResults(results) {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 RESULTADOS DOS TESTES DO TUTOR');
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

export const runTutorTests = async () => {
  const tester = new TutorTests();
  return tester.runAllTests();
};
