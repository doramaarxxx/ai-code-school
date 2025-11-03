-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'new', -- new, in_progress, resolved
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS contact_inquiries_created_at_idx ON contact_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS contact_inquiries_status_idx ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS contact_inquiries_email_idx ON contact_inquiries(email);

-- Enable Row Level Security
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (submit contact form)
CREATE POLICY "Enable insert for all users" ON contact_inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all inquiries (for admin)
CREATE POLICY "Enable read for authenticated users only" ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to update (for admin to change status)
CREATE POLICY "Enable update for authenticated users only" ON contact_inquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_inquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_contact_inquiries_timestamp
  BEFORE UPDATE ON contact_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_inquiries_updated_at();

