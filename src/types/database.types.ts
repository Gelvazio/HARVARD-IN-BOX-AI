// Generated types from Supabase schema
// Este arquivo é gerado automaticamente - NÃO editar manualmente

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          ai_model_preference: string
          theme_preference: string
          created_at: string
          updated_at: string
          last_login: string | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          ai_model_preference?: string
          theme_preference?: string
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          ai_model_preference?: string
          theme_preference?: string
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
      }
      courses: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          goal: string
          current_level: string | null
          sequence: string | null
          topics_to_skip: string | null
          total_duration_weeks: number
          status: string
          progress_percentage: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          goal: string
          current_level?: string | null
          sequence?: string | null
          topics_to_skip?: string | null
          total_duration_weeks?: number
          status?: string
          progress_percentage?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          goal?: string
          current_level?: string | null
          sequence?: string | null
          topics_to_skip?: string | null
          total_duration_weeks?: number
          status?: string
          progress_percentage?: number
          created_at?: string
          updated_at?: string
        }
      }
      milestones: {
        Row: {
          id: string
          course_id: string
          week_number: number
          title: string
          description: string | null
          learning_objectives: string[] | null
          proof_of_completion: string | null
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          week_number: number
          title: string
          description?: string | null
          learning_objectives?: string[] | null
          proof_of_completion?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          week_number?: number
          title?: string
          description?: string | null
          learning_objectives?: string[] | null
          proof_of_completion?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
      sources: {
        Row: {
          id: string
          course_id: string
          title: string
          url: string | null
          source_type: string
          credibility_score: number
          description: string | null
          author: string | null
          published_date: string | null
          rank_order: number | null
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          url?: string | null
          source_type: string
          credibility_score?: number
          description?: string | null
          author?: string | null
          published_date?: string | null
          rank_order?: number | null
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          url?: string | null
          source_type?: string
          credibility_score?: number
          description?: string | null
          author?: string | null
          published_date?: string | null
          rank_order?: number | null
          is_primary?: boolean
          created_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          course_id: string | null
          session_type: string
          duration_minutes: number | null
          messages: Record<string, unknown>
          ai_model_used: string | null
          ai_response_tokens: number | null
          diagnosis_or_feedback: string | null
          rating: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id?: string | null
          session_type: string
          duration_minutes?: number | null
          messages?: Record<string, unknown>
          ai_model_used?: string | null
          ai_response_tokens?: number | null
          diagnosis_or_feedback?: string | null
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string | null
          session_type?: string
          duration_minutes?: number | null
          messages?: Record<string, unknown>
          ai_model_used?: string | null
          ai_response_tokens?: number | null
          diagnosis_or_feedback?: string | null
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      assignments: {
        Row: {
          id: string
          course_id: string
          milestone_id: string | null
          title: string
          description: string | null
          due_date: string | null
          content: string | null
          submitted_at: string | null
          editor_feedback: string | null
          feedback_structured: Record<string, unknown>
          revision_suggestions: string[] | null
          status: string
          score: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          milestone_id?: string | null
          title: string
          description?: string | null
          due_date?: string | null
          content?: string | null
          submitted_at?: string | null
          editor_feedback?: string | null
          feedback_structured?: Record<string, unknown>
          revision_suggestions?: string[] | null
          status?: string
          score?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          milestone_id?: string | null
          title?: string
          description?: string | null
          due_date?: string | null
          content?: string | null
          submitted_at?: string | null
          editor_feedback?: string | null
          feedback_structured?: Record<string, unknown>
          revision_suggestions?: string[] | null
          status?: string
          score?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      integrations: {
        Row: {
          id: string
          user_id: string
          integration_type: string
          is_connected: boolean
          access_token: string | null
          refresh_token: string | null
          metadata: Record<string, unknown>
          last_sync: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          integration_type: string
          is_connected?: boolean
          access_token?: string | null
          refresh_token?: string | null
          metadata?: Record<string, unknown>
          last_sync?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          integration_type?: string
          is_connected?: boolean
          access_token?: string | null
          refresh_token?: string | null
          metadata?: Record<string, unknown>
          last_sync?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ai_preferences: {
        Row: {
          id: string
          user_id: string
          default_model: string
          api_keys: Record<string, unknown> | null
          prompt_templates: Record<string, unknown>
          language: string
          tone: string
          response_length: string
          use_voice_mode: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          default_model?: string
          api_keys?: Record<string, unknown> | null
          prompt_templates?: Record<string, unknown>
          language?: string
          tone?: string
          response_length?: string
          use_voice_mode?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          default_model?: string
          api_keys?: Record<string, unknown> | null
          prompt_templates?: Record<string, unknown>
          language?: string
          tone?: string
          response_length?: string
          use_voice_mode?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
