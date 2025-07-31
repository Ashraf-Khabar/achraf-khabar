-- Create profile table for user settings and availability
CREATE TABLE public.profile (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  availability_status TEXT NOT NULL DEFAULT 'available',
  availability_details TEXT,
  phone TEXT,
  location TEXT DEFAULT 'Paris, France',
  bio TEXT,
  github_url TEXT DEFAULT 'https://github.com/Ashraf-Khabar/',
  linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/achraf-khabar/',
  twitter_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users to manage profile
CREATE POLICY "Authenticated users can view profile" 
ON public.profile 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can update profile" 
ON public.profile 
FOR UPDATE 
USING (true);

CREATE POLICY "Authenticated users can insert profile" 
ON public.profile 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profile_updated_at
BEFORE UPDATE ON public.profile
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default profile data
INSERT INTO public.profile (availability_status, availability_details, phone, bio)
VALUES (
  'open_to_opportunities',
  'Actuellement en contrat mais ouvert pour des discussions',
  '+33 6 XX XX XX XX',
  'DevOps/SRE & QA Automation Engineer passionné par la fiabilité et l''automatisation'
);