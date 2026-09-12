// librarian.js - Papel Librarian (Curador de Fontes)
export class Librarian {
  constructor(sourceFinder, notebookLM, courseService) {
    this.sourceFinder = sourceFinder;
    this.notebookLM = notebookLM;
    this.courseService = courseService;
    this.selectedSources = [];
  }

  async curateSourcesForCourse(courseId, courseData) {
    const topic = courseData.title;
    const level = courseData.base;

    const allSources = await this.sourceFinder.searchSources(topic, { level });
    const ranked = await this.sourceFinder.rankSources(allSources);
    this.selectedSources = this.sourceFinder.selectTopSources(ranked, 3);

    return this.selectedSources;
  }

  async validateSelectedSources() {
    const validations = await Promise.all(
      this.selectedSources.map(s => this.sourceFinder.validateCredibility(s))
    );

    return validations.map((v, idx) => ({
      ...this.selectedSources[idx],
      validation: v,
    }));
  }

  async createNotebookForCourse(courseId, courseTitle) {
    if (this.selectedSources.length === 0) {
      throw new Error('Nenhuma fonte selecionada');
    }

    return this.notebookLM.createNotebook(courseTitle, this.selectedSources);
  }

  async generateLearningMaterials(courseId, notebookId, options = {}) {
    const materials = {};

    if (options.includePodcast !== false) {
      materials.podcast = await this.notebookLM.generatePodcast(notebookId, {
        title: options.title,
      });
    }

    if (options.includeGuide !== false) {
      materials.studyGuide = await this.notebookLM.generateStudyGuide(notebookId, {
        title: options.title,
      });
    }

    if (options.includeQuiz !== false) {
      materials.quiz = await this.notebookLM.generateQuiz(notebookId, {
        title: options.title,
        difficulty: options.difficulty || 'medium',
      });
    }

    if (options.includeSlides !== false) {
      materials.presentation = await this.notebookLM.generateSlidesPresentation(notebookId, {
        title: options.title,
      });
    }

    return materials;
  }

  getSelectedSources() {
    return [...this.selectedSources];
  }

  clearSelection() {
    this.selectedSources = [];
  }

  async saveSourcesToDatabase(courseId) {
    if (!this.courseService) {
      console.warn('CourseService não configurado');
      return null;
    }

    return this.courseService.saveSources(courseId, this.selectedSources);
  }
}

export const createLibrarian = (sourceFinder, notebookLM, courseService) => {
  return new Librarian(sourceFinder, notebookLM, courseService);
};
