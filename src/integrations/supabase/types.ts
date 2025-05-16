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
      articles: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          date: string
          excerpt: string | null
          featured: boolean
          id: string
          image: string
          slug: string
          summary: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string
          date: string
          excerpt?: string | null
          featured?: boolean
          id?: string
          image: string
          slug: string
          summary: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          date?: string
          excerpt?: string | null
          featured?: boolean
          id?: string
          image?: string
          slug?: string
          summary?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          case_study: Json | null
          created_at: string
          id: string
          implementation: string
          industry: string
          location: string
          logo: string
          name: string
          updated_at: string
        }
        Insert: {
          case_study?: Json | null
          created_at?: string
          id?: string
          implementation: string
          industry: string
          location: string
          logo: string
          name: string
          updated_at?: string
        }
        Update: {
          case_study?: Json | null
          created_at?: string
          id?: string
          implementation?: string
          industry?: string
          location?: string
          logo?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      footer_info: {
        Row: {
          company_info: Json
          contact_info: Json
          created_at: string
          id: string
          products: Json
          quick_links: Json
          updated_at: string
        }
        Insert: {
          company_info: Json
          contact_info: Json
          created_at?: string
          id?: string
          products: Json
          quick_links: Json
          updated_at?: string
        }
        Update: {
          company_info?: Json
          contact_info?: Json
          created_at?: string
          id?: string
          products?: Json
          quick_links?: Json
          updated_at?: string
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          created_at: string
          description: string
          features: string[]
          id: string
          name: string
          popular: boolean | null
          price: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          features: string[]
          id?: string
          name: string
          popular?: boolean | null
          price: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          features?: string[]
          id?: string
          name?: string
          popular?: boolean | null
          price?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          features: string[]
          icon: string
          id: string
          image: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          features: string[]
          icon: string
          id?: string
          image: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          features?: string[]
          icon?: string
          id?: string
          image?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string
          created_at: string
          id: string
          name: string
          photo: string
          position: string
          socials: Json
          updated_at: string
        }
        Insert: {
          bio: string
          created_at?: string
          id?: string
          name: string
          photo: string
          position: string
          socials: Json
          updated_at?: string
        }
        Update: {
          bio?: string
          created_at?: string
          id?: string
          name?: string
          photo?: string
          position?: string
          socials?: Json
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          company: string
          created_at: string
          id: string
          image: string
          name: string
          testimonial: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          id?: string
          image: string
          name: string
          testimonial: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          id?: string
          image?: string
          name?: string
          testimonial?: string
          updated_at?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
