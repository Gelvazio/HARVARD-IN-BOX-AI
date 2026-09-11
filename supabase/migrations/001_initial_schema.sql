-- HARVARD-IN-BOX-AI: Schema SQL Completo
-- Criado em: 11-09-2026
-- Responsável: Claude Haiku 4.5

-- ============================================================================
-- 1. TABELA: users (Usuários da plataforma)
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  ai_model_preference TEXT DEFAULT 'claude' CHECK (ai_model_preference IN ('claude', 'gpt', 'gemini')),
  theme_preference TEXT DEFAULT 'system' CHECK (theme_preference IN ('light', 'dark', 'system')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

COMMENT ON TABLE users IS 'Armazena dados dos usuários registrados na plataforma';

-- ============================================================================
-- 2. TABELA: courses (Cursos/Planos de Estudo)
-- ============================================================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  goal TEXT NOT NULL,
  current_level TEXT,
  sequence TEXT,
  topics_to_skip TEXT,
  total_duration_weeks INT DEFAULT 6,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'archived')),
  progress_percentage INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE courses IS 'Cursos personalizados criados pelo Advisor';

-- ============================================================================
-- 3. TABELA: milestones (Marcos/Objetivos semanais)
-- ============================================================================
CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  week_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  learning_objectives TEXT[],
  proof_of_completion TEXT,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE milestones IS 'Milestones e marcos semanais para cada curso';

-- ============================================================================
-- 4. TABELA: sources (Fontes de Material)
-- ============================================================================
CREATE TABLE IF NOT EXISTS sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT,
  source_type TEXT NOT NULL CHECK (source_type IN ('book', 'course', 'podcast', 'paper', 'video', 'article', 'other')),
  credibility_score DECIMAL(3,1) DEFAULT 5.0,
  description TEXT,
  author TEXT,
  published_date DATE,
  rank_order INT,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE sources IS 'Fontes curadas pelo Librarian (livros, cursos, podcasts, papers)';

-- ============================================================================
-- 5. TABELA: sessions (Sessões de Tutoria/Estudo)
-- ============================================================================
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL CHECK (session_type IN ('tutor', 'librarian', 'editor', 'advisor', 'companion')),
  duration_minutes INT,
  messages JSONB DEFAULT '[]'::JSONB,
  ai_model_used TEXT,
  ai_response_tokens INT,
  diagnosis_or_feedback TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE sessions IS 'Histórico de sessões com cada papel de IA (Tutor, Librarian, etc)';

-- ============================================================================
-- 6. TABELA: assignments (Trabalhos/Tarefas)
-- ============================================================================
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  content TEXT,
  submitted_at TIMESTAMPTZ,
  editor_feedback TEXT,
  feedback_structured JSONB DEFAULT '{}'::JSONB,
  revision_suggestions TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'reviewed', 'revised', 'completed')),
  score INT CHECK (score >= 0 AND score <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE assignments IS 'Trabalhos criados e avaliados pelo Editor';

-- ============================================================================
-- 7. TABELA: integrations (Integrações Externas)
-- ============================================================================
CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  integration_type TEXT NOT NULL CHECK (integration_type IN ('discord', 'zapier', 'notebooklm', 'google_calendar', 'google_docs')),
  is_connected BOOLEAN DEFAULT FALSE,
  access_token TEXT,
  refresh_token TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  last_sync TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE integrations IS 'Integrações com serviços externos (Discord, Zapier, NotebookLM, Google)';

-- ============================================================================
-- 8. TABELA: ai_preferences (Preferências de IA)
-- ============================================================================
CREATE TABLE IF NOT EXISTS ai_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  default_model TEXT DEFAULT 'claude' CHECK (default_model IN ('claude', 'gpt', 'gemini')),
  api_keys JSONB,
  prompt_templates JSONB DEFAULT '{}'::JSONB,
  language TEXT DEFAULT 'pt-BR',
  tone TEXT DEFAULT 'formal' CHECK (tone IN ('formal', 'casual', 'academic')),
  response_length TEXT DEFAULT 'medium' CHECK (response_length IN ('short', 'medium', 'long')),
  use_voice_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE ai_preferences IS 'Preferências personalizadas de IA para cada usuário';

-- ============================================================================
-- 9. ÍNDICES DE PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_courses_user_id ON courses(user_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_milestones_course_id ON milestones(course_id);
CREATE INDEX IF NOT EXISTS idx_milestones_completed ON milestones(completed);
CREATE INDEX IF NOT EXISTS idx_sources_course_id ON sources(course_id);
CREATE INDEX IF NOT EXISTS idx_sources_primary ON sources(is_primary);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_course_id ON sessions(course_id);
CREATE INDEX IF NOT EXISTS idx_sessions_type ON sessions(session_type);
CREATE INDEX IF NOT EXISTS idx_assignments_course_id ON assignments(course_id);
CREATE INDEX IF NOT EXISTS idx_assignments_status ON assignments(status);
CREATE INDEX IF NOT EXISTS idx_integrations_user_id ON integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_integrations_type ON integrations(integration_type);
CREATE INDEX IF NOT EXISTS idx_ai_preferences_user_id ON ai_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

COMMENT ON INDEX idx_courses_user_id IS 'Índice para filtrar cursos por usuário';
COMMENT ON INDEX idx_sessions_user_id IS 'Índice para filtrar sessões por usuário';
COMMENT ON INDEX idx_assignments_status IS 'Índice para filtrar trabalhos por status';

-- ============================================================================
-- 10. POLÍTICA RLS (Row Level Security)
-- ============================================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_preferences ENABLE ROW LEVEL SECURITY;

-- RLS: users - cada usuário vê apenas seus dados
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- RLS: courses - usuário vê apenas seus cursos
CREATE POLICY "Users can view own courses"
  ON courses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create courses"
  ON courses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own courses"
  ON courses FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS: milestones - acesso através do curso
CREATE POLICY "Users can view milestones of own courses"
  ON milestones FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = milestones.course_id
      AND courses.user_id = auth.uid()
    )
  );

-- RLS: sources - acesso através do curso
CREATE POLICY "Users can view sources of own courses"
  ON sources FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = sources.course_id
      AND courses.user_id = auth.uid()
    )
  );

-- RLS: sessions - usuário vê suas sessões
CREATE POLICY "Users can view own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = user_id);

-- RLS: assignments - acesso através do curso
CREATE POLICY "Users can view assignments of own courses"
  ON assignments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = assignments.course_id
      AND courses.user_id = auth.uid()
    )
  );

-- RLS: integrations - usuário vê suas integrações
CREATE POLICY "Users can view own integrations"
  ON integrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create integrations"
  ON integrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS: ai_preferences - usuário vê suas preferências
CREATE POLICY "Users can view own ai preferences"
  ON ai_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own ai preferences"
  ON ai_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 11. FUNÇÕES AUXILIARES
-- ============================================================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER users_update_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER courses_update_updated_at BEFORE UPDATE ON courses
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER sessions_update_updated_at BEFORE UPDATE ON sessions
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER assignments_update_updated_at BEFORE UPDATE ON assignments
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER integrations_update_updated_at BEFORE UPDATE ON integrations
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER ai_preferences_update_updated_at BEFORE UPDATE ON ai_preferences
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 12. DADOS INICIAIS (Opcional - comentado)
-- ============================================================================

-- INSERT INTO ai_preferences DEFAULT VALUES;
