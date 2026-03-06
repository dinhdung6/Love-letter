import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Message {
  id: number
  content: string
}

export interface OpenedMessage {
  id: string
  user_id: string
  message_id: number
  envelope_color: string
  opened_at: string
}

export interface OpenedMessageWithContent extends OpenedMessage {
  content: string
}
