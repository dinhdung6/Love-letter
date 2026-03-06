-- Enable UUID extension (usually already enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY,
  content TEXT NOT NULL
);

-- Create opened_messages table
CREATE TABLE IF NOT EXISTS opened_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  message_id INTEGER NOT NULL REFERENCES messages(id),
  envelope_color TEXT NOT NULL,
  opened_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries by user_id
CREATE INDEX IF NOT EXISTS idx_opened_messages_user_id ON opened_messages(user_id);

-- Create unique constraint to prevent duplicate opened messages
CREATE UNIQUE INDEX IF NOT EXISTS idx_opened_messages_unique ON opened_messages(user_id, message_id);
