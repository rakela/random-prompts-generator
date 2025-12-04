/**
 * Supabase Database Types
 * Generated from the SQL schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          credits: number
          is_pro: boolean
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          credits?: number
          is_pro?: boolean
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          credits?: number
          is_pro?: boolean
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      generations: {
        Row: {
          id: string
          user_id: string
          type: string
          input_context: Json
          output_content: string
          video_title: string | null
          tokens_used: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          input_context: Json
          output_content: string
          video_title?: string | null
          tokens_used?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          input_context?: Json
          output_content?: string
          video_title?: string | null
          tokens_used?: number | null
          created_at?: string
        }
      }
    }
  }
}
