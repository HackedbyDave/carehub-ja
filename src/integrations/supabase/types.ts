export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      medications: {
        Row: {
          badge: string | null
          category: string
          created_at: string
          description: string
          dosage: string | null
          id: string
          image_url: string | null
          in_stock: boolean | null
          name: string
          original_price: number | null
          pharmacy_id: string | null
          price: number
          rating: number | null
          requires_prescription: boolean | null
          review_count: number | null
          updated_at: string
        }
        Insert: {
          badge?: string | null
          category: string
          created_at?: string
          description: string
          dosage?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          name: string
          original_price?: number | null
          pharmacy_id?: string | null
          price: number
          rating?: number | null
          requires_prescription?: boolean | null
          review_count?: number | null
          updated_at?: string
        }
        Update: {
          badge?: string | null
          category?: string
          created_at?: string
          description?: string
          dosage?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          name?: string
          original_price?: number | null
          pharmacy_id?: string | null
          price?: number
          rating?: number | null
          requires_prescription?: boolean | null
          review_count?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "medications_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          medication_id: string | null
          medication_name: string
          order_id: string
          price: number
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          medication_id?: string | null
          medication_name: string
          order_id: string
          price: number
          quantity?: number
        }
        Update: {
          created_at?: string
          id?: string
          medication_id?: string | null
          medication_name?: string
          order_id?: string
          price?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_id: string
          delivery_address: string | null
          delivery_parish: string | null
          id: string
          payment_method: string | null
          pharmacy_id: string | null
          prescription_id: string | null
          status: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          delivery_address?: string | null
          delivery_parish?: string | null
          id?: string
          payment_method?: string | null
          pharmacy_id?: string | null
          prescription_id?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          delivery_address?: string | null
          delivery_parish?: string | null
          id?: string
          payment_method?: string | null
          pharmacy_id?: string | null
          prescription_id?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacies: {
        Row: {
          address: string
          created_at: string
          email: string | null
          id: string
          is_verified: boolean | null
          latitude: number | null
          license_number: string | null
          longitude: number | null
          name: string
          operating_hours: string | null
          owner_id: string
          parish: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address: string
          created_at?: string
          email?: string | null
          id?: string
          is_verified?: boolean | null
          latitude?: number | null
          license_number?: string | null
          longitude?: number | null
          name: string
          operating_hours?: string | null
          owner_id: string
          parish: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string
          created_at?: string
          email?: string | null
          id?: string
          is_verified?: boolean | null
          latitude?: number | null
          license_number?: string | null
          longitude?: number | null
          name?: string
          operating_hours?: string | null
          owner_id?: string
          parish?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      prescriptions: {
        Row: {
          created_at: string
          customer_id: string
          doctor_id: string | null
          doctor_notes: string | null
          id: string
          image_url: string | null
          notes: string | null
          pharmacy_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          doctor_id?: string | null
          doctor_notes?: string | null
          id?: string
          image_url?: string | null
          notes?: string | null
          pharmacy_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          doctor_id?: string | null
          doctor_notes?: string | null
          id?: string
          image_url?: string | null
          notes?: string | null
          pharmacy_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          parish: string | null
          phone: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          parish?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          parish?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "customer" | "doctor" | "pharmacy"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["customer", "doctor", "pharmacy"],
    },
  },
} as const
