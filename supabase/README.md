# Supabase Configuration

## 📋 Schema do Banco de Dados

O schema completo está em `migrations/001_initial_schema.sql`.

### Tabelas Principais

1. **users** - Usuários da plataforma
2. **courses** - Cursos/planos de estudo personalizados
3. **milestones** - Marcos semanais de cada curso
4. **sources** - Fontes de material (livros, cursos, podcasts, papers)
5. **sessions** - Histórico de sessões com cada papel de IA
6. **assignments** - Trabalhos e tarefas
7. **integrations** - Integrações com serviços externos
8. **ai_preferences** - Preferências de IA do usuário

### Recursos

- ✅ 8 tabelas com relacionamentos
- ✅ Índices de performance
- ✅ Row Level Security (RLS)
- ✅ Funções auxiliares (updated_at automático)
- ✅ Comentários de documentação

## 🚀 Como Aplicar o Schema

### Opção 1: Via Supabase Dashboard (Recomendado)

1. Acesse [https://app.supabase.com](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Clique em **New Query**
5. Copie o conteúdo de `migrations/001_initial_schema.sql`
6. Cole no SQL Editor
7. Clique em **Run**

### Opção 2: Via Supabase CLI (Local)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Configurar acesso
supabase link

# Aplicar migrations
supabase migration up

# Gerar tipos TypeScript
supabase gen types typescript --project-id <PROJECT_ID> > src/types/database.types.ts
```

### Opção 3: Ambiente Local (Desenvolvimento)

```bash
# Iniciar Supabase localmente
supabase start

# Aplicar schema
supabase db push

# Parar quando terminar
supabase stop
```

## 🔐 Segurança

Todas as tabelas têm **Row Level Security (RLS)** habilitado:

- Usuários só veem seus próprios dados
- Acesso a cursos/sessões/tarefas é filtrado por user_id
- Integrações e preferências de IA são privadas

### Ativar RLS no Supabase Dashboard

1. Vá em **Authentication > Policies**
2. Verifique se as políticas estão ativas (geralmente já estão)

## 🔄 Variáveis de Ambiente

Adicione ao `.env.local`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 📊 Estrutura de Dados

```
users (1)
  ├─ courses (N) → milestones, sources, assignments, sessions
  │   ├─ milestones (N)
  │   ├─ sources (N)
  │   ├─ assignments (N)
  │   └─ sessions (N)
  ├─ integrations (N)
  └─ ai_preferences (1)
```

## 🧪 Testando o Schema

```javascript
// src/services/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

// Testar leitura
const { data, error } = await supabase.from('users').select('*').single()
console.log(data, error)
```

## 📝 Próximos Passos

- [x] Schema SQL criado
- [ ] Aplicar schema no Supabase
- [ ] Testar conexões
- [ ] Criar migrações adicionais conforme necessário
- [ ] Documentar novos endpoints

---

**Responsável**: Gelvazio  
**Última atualização**: 11-09-2026
