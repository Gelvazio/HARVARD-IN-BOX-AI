// source-finder.js - Serviço de busca e validação de fontes
export class SourceFinder {
  constructor(aiRouter) {
    this.aiRouter = aiRouter;
    this.sourceTypes = ['book', 'course', 'podcast', 'paper', 'video', 'article'];
  }

  async searchSources(topic, options = {}) {
    const prompt = this.buildSearchPrompt(topic, options);
    const systemPrompt = `Você é um pesquisador académico expert. Encontre as 3-4 melhores fontes sobre o tópico.`;

    const response = await this.aiRouter.sendMessage(
      [{ role: 'user', content: prompt }],
      { systemPrompt, maxTokens: 1500 }
    );

    return this.parseSources(response);
  }

  buildSearchPrompt(topic, options) {
    const level = options.level || 'intermediário';
    return `
Encontre as 3-4 MELHORES fontes sobre: ${topic}

Nível: ${level}
Idioma: ${options.language || 'português'}

Para cada fonte, forneça:
- TÍTULO: Nome da fonte
- TIPO: ${this.sourceTypes.join('|')}
- URL: (se disponível)
- AUTOR: Criador/Publicador
- DESCRIÇÃO: 1 linha sobre a fonte
- SCORE: 1-10 (credibilidade)

Formato:
FONTE 1: [Título]
Tipo: [tipo]
URL: [url]
Autor: [autor]
Score: [score]
Descrição: [descrição]
    `;
  }

  parseSources(response) {
    const sources = [];
    const fontesPattern = /FONTE\s+\d+:?\s*(.+?)(?=FONTE|$)/gs;
    const matches = response.matchAll(fontesPattern);

    for (const match of matches) {
      const source = this.extractSourceData(match[1]);
      if (source) sources.push(source);
    }

    return sources.length > 0 ? sources : this.getDefaultSources();
  }

  extractSourceData(text) {
    const titleMatch = text.match(/^(.+?)(?:\nTipo:|$)/);
    const typeMatch = text.match(/Tipo:\s*(.+?)(?:\n|$)/i);
    const urlMatch = text.match(/URL:\s*(.+?)(?:\n|$)/i);
    const authorMatch = text.match(/Autor:\s*(.+?)(?:\n|$)/i);
    const scoreMatch = text.match(/Score:\s*(\d+)/i);
    const descMatch = text.match(/Descrição:\s*(.+?)(?:\n|$)/i);

    if (!titleMatch) return null;

    return {
      title: titleMatch[1].trim(),
      type: typeMatch ? typeMatch[1].trim().toLowerCase() : 'article',
      url: urlMatch ? urlMatch[1].trim() : '',
      author: authorMatch ? authorMatch[1].trim() : 'Desconhecido',
      credibilityScore: scoreMatch ? parseInt(scoreMatch[1]) : 5,
      description: descMatch ? descMatch[1].trim() : '',
    };
  }

  getDefaultSources() {
    return [
      {
        title: 'Fonte Recomendada 1',
        type: 'course',
        url: '',
        author: 'Especialista',
        credibilityScore: 8,
        description: 'Fonte de alta credibilidade',
      },
    ];
  }

  async validateCredibility(source) {
    const prompt = `Avalie a credibilidade desta fonte:
Título: ${source.title}
Autor: ${source.author}
Tipo: ${source.type}

Responda com um score de 1-10 (10 sendo máxima credibilidade) e breve justificativa.`;

    const response = await this.aiRouter.sendMessage(
      [{ role: 'user', content: prompt }],
      { maxTokens: 200 }
    );

    const scoreMatch = response.match(/\d+/);
    return {
      score: scoreMatch ? parseInt(scoreMatch[0]) : source.credibilityScore,
      justification: response,
    };
  }

  async rankSources(sources) {
    return sources.sort((a, b) => b.credibilityScore - a.credibilityScore);
  }

  selectTopSources(sources, count = 3) {
    return sources.slice(0, count);
  }
}

export const createSourceFinder = (aiRouter) => new SourceFinder(aiRouter);
