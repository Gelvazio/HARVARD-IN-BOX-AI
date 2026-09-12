// course-service.js - Serviço de gerenciamento de cursos no Supabase
export class CourseService {
  constructor(supabaseClient) {
    this.db = supabaseClient;
  }

  async saveCourse(userId, courseData) {
    const course = {
      user_id: userId,
      title: courseData.title,
      description: courseData.description,
      goal: courseData.destination,
      current_level: courseData.base,
      sequence: courseData.sequence,
      topics_to_skip: courseData.cutoff,
      total_duration_weeks: courseData.weeks || 6,
      status: 'active',
      progress_percentage: 0,
    };

    const { data, error } = await this.db
      .from('courses')
      .insert([course])
      .select();

    if (error) throw error;
    return data[0];
  }

  async saveMilestones(courseId, milestones) {
    const milestonesData = milestones.map((m, idx) => ({
      course_id: courseId,
      week_number: idx + 1,
      title: m.title,
      description: m.content,
      learning_objectives: m.objectives || [],
      proof_of_completion: m.proof,
      completed: false,
    }));

    const { data, error } = await this.db
      .from('milestones')
      .insert(milestonesData)
      .select();

    if (error) throw error;
    return data;
  }

  async saveSources(courseId, sources) {
    const sourcesData = sources.map((s, idx) => ({
      course_id: courseId,
      title: s.title,
      url: s.url,
      source_type: s.type,
      credibility_score: s.score || 5.0,
      description: s.description,
      author: s.author,
      rank_order: idx + 1,
      is_primary: idx < 3,
    }));

    const { data, error } = await this.db
      .from('sources')
      .insert(sourcesData)
      .select();

    if (error) throw error;
    return data;
  }

  async getCourse(courseId) {
    const { data, error } = await this.db
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();

    if (error) throw error;
    return data;
  }

  async getUserCourses(userId) {
    const { data, error } = await this.db
      .from('courses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async updateCourseProgress(courseId, percentage) {
    const { data, error } = await this.db
      .from('courses')
      .update({ progress_percentage: percentage })
      .eq('id', courseId)
      .select();

    if (error) throw error;
    return data[0];
  }
}

export const createCourseService = (supabaseClient) => new CourseService(supabaseClient);
