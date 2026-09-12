# 🎭 Papéis de IA - HARVARD-IN-BOX-AI

Este diretório contém as implementações dos 6 papéis principais da IA que guiam o aprendizado personalizado.

## 📚 Visão Geral dos Papéis

### 1. 🎯 Advisor (Conselheiro Acadêmico)
**Arquivo**: `advisor-interview.js`

Constrói o currículo personalizado do usuário através de uma entrevista em 5 etapas.

#### Funcionalidades
- Entrevista estruturada com 5 perguntas
- Geração automática de mapa do curso
- Criação de milestones semanais
- Integração com Supabase

#### Uso
```javascript
import { createAdvisorInterview } from '../roles/advisor-interview.js';

const advisor = createAdvisorInterview(aiRouter);
const courseData = await advisor.runInterview(topic);
```

---

### 2. 📚 Librarian (Curador de Fontes)
**Arquivo**: `librarian.js`

Encontra, valida e curada as 3-4 melhores fontes para o curso com integração NotebookLM.

#### Componentes Relacionados
- `../services/source-finder.js` - Busca e validação de fontes
- `../services/notebooklm-integration.js` - Integração com NotebookLM
- `../components/source-selector.js` - UI de seleção
- `../../pages/librarian.html` - Página principal

#### Funcionalidades
- Busca automática de fontes
- Validação de credibilidade via IA
- Ranking por credibilidade
- Geração de: podcast, guia, quiz, slides

---

**Status**: TAREFA 06 em progresso (Librarian implementado)  
**Última atualização**: 12-09-2026
