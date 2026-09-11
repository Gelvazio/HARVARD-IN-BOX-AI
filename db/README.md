# 📊 Database Migrations — Harvard In Box AI

Este diretório contém todas as migrações SQL para o banco de dados Supabase do projeto.

## 📋 Convenção de Nomenclatura

```
migration_001.sql  →  001 = número sequencial
migration_002.sql
migration_003.sql
...
migration_NNN.sql
```

## 🚀 Como Aplicar Migrations

### Via Supabase Dashboard (Recomendado)

1. Ir para [Supabase Dashboard](https://app.supabase.com)
2. Selecionar o projeto `harvard-in-box-ai`
3. Ir para **SQL Editor**
4. Clicar em **New Query**
5. Copiar conteúdo do arquivo `migration_NNN.sql`
6. Executar (Ctrl + Enter ou Cmd + Enter)
7. Verificar se houve erros

### Via CLI (Supabase CLI)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Fazer login
supabase login

# Aplicar migration
supabase db push
```

## 📝 Migrations Existentes

### ✅ migration_001.sql
**Status**: ⏳ Pendente (Será aplicada quando Tarefa 02 iniciar)  
**Data Criada**: 2026-09-11  
**Descrição**: Schema inicial com 11 tabelas principais

**Tabelas criadas:**
1. `users` - Contas de usuário
2. `courses` - Planos de aprendizado
3. `milestones` - Marcos semanais
4. `sources` - Materiais curados
5. `sessions` - Sessões de chat com IA
6. `messages` - Histórico de mensagens
7. `assignments` - Trabalhos do aluno
8. `ai_preferences` - Preferências de IA
9. `integrations` - Integrações externas
10. `ai_insights` - Conexões interdisciplinares
11. `user_progress` - Progresso de aprendizado

**Recursos adicionais:**
- ✅ 20+ índices para performance
- ✅ Row Level Security (RLS) habilitado
- ✅ 7 triggers automáticos (updated_at)
- ✅ 1 view (active_courses_view)

---

## 📅 Próximas Migrations (Planejadas)

| # | Descrição | Tarefa | Status |
|----|-----------|--------|--------|
| 002 | Adicionar tabela `notifications` | — | ⏳ Planejada |
| 003 | Adicionar tabela `audit_logs` | — | ⏳ Planejada |
| 004 | Adicionar constraints adicionais | — | ⏳ Planejada |
| 005 | Adicionar funções para cálculo de progresso | — | ⏳ Planejada |

---

## ✅ Checklist para Nova Migration

Ao criar uma nova migration, siga este checklist:

- [ ] Arquivo nomeado como `migration_NNN.sql` (número sequencial)
- [ ] Cabeçalho com descrição clara
- [ ] Comentários explicando cada tabela/coluna
- [ ] Índices criados para colunas de busca frequente
- [ ] RLS habilitado se dados são privados
- [ ] Triggers para `updated_at` se necessário
- [ ] Documentação no README atualizada
- [ ] Commit com mensagem descritiva
- [ ] Status marcado como ⏳ Pendente até aplicação
- [ ] Após aplicação, mudar para ✅ Aplicada

---

## 🔒 Segurança

### Row Level Security (RLS)

Todas as tabelas com dados do usuário têm RLS habilitado. Isso significa:
- Usuários só veem seus próprios dados
- Impossível acessar dados de outro usuário via SQL
- Supabase valida permissões automaticamente

**Exemplo de política:**
```sql
CREATE POLICY "Users can view their own courses" ON courses
    FOR SELECT USING (auth.uid() = user_id);
```

### Criptografia de API Keys

As colunas que armazenam chaves de API (`*_encrypted`) devem:
- Ser criptografadas antes de salvar (no backend)
- Nunca ser exposta no frontend
- Apenas ser descriptografadas quando necessário usar a chave

---

## 🔄 Versionamento

Cada migration é **imutável** — nunca altere um arquivo já aplicado.

Se cometer erro:
1. Criar nova migration corrigindo o problema
2. Exemplo: `migration_001.sql` tem erro → criar `migration_001_fix.sql`

---

## 🚨 Troubleshooting

### Erro: "Tabela já existe"
```
ERROR: relation "users" already exists
```
**Solução**: Migration já foi aplicada. Verificar se não está duplicada.

### Erro: "Foreign key constraint fails"
```
ERROR: insert or update on table violates foreign key constraint
```
**Solução**: Inserir dados nas tabelas de referência primeiro. Respeitar ordem de dependências.

### Erro: "Permission denied"
```
ERROR: permission denied for schema public
```
**Solução**: Usar conta Supabase com privilégios de admin.

---

## 📞 Suporte

Se encontrar problemas com migrations:
1. Verificar o arquivo `.sql` para sintaxe
2. Verificar permissões da conta Supabase
3. Consultar documentação do Supabase: https://supabase.com/docs/guides/database

---

**Última atualização**: 2026-09-11  
**Versão schema**: 001  
**Total de tabelas**: 11  
**Total de índices**: 20+  
