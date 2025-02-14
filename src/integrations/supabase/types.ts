export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      conversations: {
        Row: {
          context: Json | null
          created_at: string
          id: string
          is_ai: boolean
          keywords: string[] | null
          message: string
          message_type: string | null
          response_quality_score: number | null
          sentiment: number | null
          session_id: string | null
          session_topic: string | null
          user_id: string
        }
        Insert: {
          context?: Json | null
          created_at?: string
          id?: string
          is_ai?: boolean
          keywords?: string[] | null
          message: string
          message_type?: string | null
          response_quality_score?: number | null
          sentiment?: number | null
          session_id?: string | null
          session_topic?: string | null
          user_id: string
        }
        Update: {
          context?: Json | null
          created_at?: string
          id?: string
          is_ai?: boolean
          keywords?: string[] | null
          message?: string
          message_type?: string | null
          response_quality_score?: number | null
          sentiment?: number | null
          session_id?: string | null
          session_topic?: string | null
          user_id?: string
        }
        Relationships: []
      }
      gratitudes: {
        Row: {
          categories: string[] | null
          content: string
          created_at: string
          id: string
          is_favorite: boolean | null
          is_public: boolean | null
          mood_intensity: number | null
          sticker: Json | null
          tags: string[] | null
          user_id: string
        }
        Insert: {
          categories?: string[] | null
          content: string
          created_at?: string
          id?: string
          is_favorite?: boolean | null
          is_public?: boolean | null
          mood_intensity?: number | null
          sticker?: Json | null
          tags?: string[] | null
          user_id: string
        }
        Update: {
          categories?: string[] | null
          content?: string
          created_at?: string
          id?: string
          is_favorite?: boolean | null
          is_public?: boolean | null
          mood_intensity?: number | null
          sticker?: Json | null
          tags?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      mood_analytics: {
        Row: {
          average_mood_intensity: number | null
          created_at: string | null
          date: string | null
          id: string
          total_entries: number | null
          user_id: string | null
        }
        Insert: {
          average_mood_intensity?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          total_entries?: number | null
          user_id?: string | null
        }
        Update: {
          average_mood_intensity?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          total_entries?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          current_streak: number | null
          full_name: string | null
          id: string
          last_gratitude_date: string | null
          longest_streak: number | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          current_streak?: number | null
          full_name?: string | null
          id: string
          last_gratitude_date?: string | null
          longest_streak?: number | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          current_streak?: number | null
          full_name?: string | null
          id?: string
          last_gratitude_date?: string | null
          longest_streak?: number | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          age: number | null
          created_at: string
          favorite_activities: string[] | null
          fears: string[] | null
          id: string
          interests: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          created_at?: string
          favorite_activities?: string[] | null
          fears?: string[] | null
          id?: string
          interests?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          created_at?: string
          favorite_activities?: string[] | null
          fears?: string[] | null
          id?: string
          interests?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
