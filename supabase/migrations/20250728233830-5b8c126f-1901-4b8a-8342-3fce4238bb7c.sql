-- Create edge function for sending contact emails
-- This will be handled through Supabase edge functions

-- Create a table to store contact submissions for logging
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact submissions
CREATE POLICY "Allow public contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow authenticated users to view submissions (for admin)
CREATE POLICY "Allow authenticated users to view submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (auth.role() = 'authenticated');