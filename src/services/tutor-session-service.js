// tutor-session-service.js - Gerencia sessões de tutoria no Supabase
export class TutorSessionService {
  constructor(supabaseClient) {
    this.db = supabaseClient;
  }

  async createSession(userId, courseId, topic) {
    const session = {
      user_id: userId,
      course_id: courseId,
      topic,
      status: 'active',
      started_at: new Date().toISOString(),
      messages_count: 0,
      diagnostics: [],
      student_understanding: 0,
    };

    const { data, error } = await this.db.from('sessions').insert([session]).select();

    if (error) throw error;
    return data[0];
  }

  async saveMessage(sessionId, message, isStudent = true) {
    const msg = {
      session_id: sessionId,
      role: isStudent ? 'student' : 'tutor',
      content: message.content || message,
      timestamp: message.timestamp || new Date().toISOString(),
      diagnostic_data: message.diagnostic || null,
    };

    const { data, error } = await this.db
      .from('messages')
      .insert([msg])
      .select();

    if (error) throw error;
    return data[0];
  }

  async updateSessionProgress(sessionId, understanding, confusions = []) {
    const { data, error } = await this.db
      .from('sessions')
      .update({
        student_understanding: understanding,
        diagnostics: confusions,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sessionId)
      .select();

    if (error) throw error;
    return data[0];
  }

  async getSessionHistory(sessionId) {
    const { data, error } = await this.db
      .from('messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: true });

    if (error) throw error;
    return data;
  }

  async closeSession(sessionId) {
    const { data, error } = await this.db
      .from('sessions')
      .update({
        status: 'completed',
        ended_at: new Date().toISOString(),
      })
      .eq('id', sessionId)
      .select();

    if (error) throw error;
    return data[0];
  }

  async getUserSessions(userId) {
    const { data, error } = await this.db
      .from('sessions')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getSessionStats(sessionId) {
    const messages = await this.getSessionHistory(sessionId);

    return {
      total_messages: messages.length,
      student_messages: messages.filter((m) => m.role === 'student').length,
      tutor_messages: messages.filter((m) => m.role === 'tutor').length,
      diagnostics_recorded: messages.filter((m) => m.diagnostic_data).length,
      duration: this.calculateSessionDuration(messages),
    };
  }

  calculateSessionDuration(messages) {
    if (messages.length < 2) return 0;

    const first = new Date(messages[0].timestamp);
    const last = new Date(messages[messages.length - 1].timestamp);

    return Math.round((last - first) / 1000 / 60); // em minutos
  }

  async saveLearningOutcome(sessionId, outcome) {
    const assessment = {
      session_id: sessionId,
      understanding_level: outcome.understanding || 0,
      key_concepts_learned: outcome.concepts || [],
      remaining_confusions: outcome.confusions || [],
      suggested_next_steps: outcome.nextSteps || [],
      assessment_date: new Date().toISOString(),
    };

    const { data, error } = await this.db
      .from('tutor_assessments')
      .insert([assessment])
      .select();

    if (error) throw error;
    return data[0];
  }
}

export const createTutorSessionService = (supabaseClient) =>
  new TutorSessionService(supabaseClient);
