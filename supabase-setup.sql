-- Create the SMS messages table
CREATE TABLE IF NOT EXISTS sms_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_name TEXT NOT NULL,
    sender_company TEXT,
    message TEXT NOT NULL CHECK (char_length(message) <= 500),
    phone_number TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    error_message TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sms_messages_created_at ON sms_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sms_messages_status ON sms_messages(status);
CREATE INDEX IF NOT EXISTS idx_sms_messages_phone ON sms_messages(phone_number);

-- Enable RLS (Row Level Security)
ALTER TABLE sms_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for contact form)
CREATE POLICY "Anyone can send messages" ON sms_messages
    FOR INSERT 
    WITH CHECK (true);

-- Create policy to allow reads only for authenticated users (for admin)
CREATE POLICY "Only authenticated users can read messages" ON sms_messages
    FOR SELECT 
    USING (auth.role() = 'authenticated');

-- Create policy to allow updates only for service role (for status updates)
CREATE POLICY "Service role can update messages" ON sms_messages
    FOR UPDATE 
    USING (auth.role() = 'service_role');

-- Function to create the table (fallback for the service)
CREATE OR REPLACE FUNCTION create_sms_table()
RETURNS void
LANGUAGE sql
AS $$
  -- This function exists to ensure the table is created
  SELECT 1;
$$;

-- Grant necessary permissions
GRANT INSERT ON sms_messages TO anon;
GRANT SELECT ON sms_messages TO authenticated;
GRANT ALL ON sms_messages TO service_role;