-- ====================================================================
-- SUPABASE PORTFOLIO DATABASE SCHEMA
-- Copy and paste this script into your Supabase Dashboard > SQL Editor
-- ====================================================================

-- 1. Bio Table
CREATE TABLE IF NOT EXISTS bio (
  id INT PRIMARY KEY DEFAULT 1,
  tagline TEXT,
  headline TEXT,
  name TEXT,
  role TEXT,
  subtext TEXT,
  hero_photo TEXT,
  cv_file TEXT,
  experience_years TEXT,
  clients_count TEXT,
  about_photo TEXT,
  apps_shipped TEXT,
  about_title TEXT,
  about_paragraph_1 TEXT,
  niche_statement TEXT,
  about_paragraph_2 TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  website TEXT,
  marquee JSONB
);

-- 2. Services Table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  icon TEXT,
  icon_bg TEXT,
  title TEXT,
  description TEXT,
  features JSONB,
  order_index INT DEFAULT 0
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  image TEXT,
  tags JSONB,
  description TEXT,
  outcome TEXT,
  demo_url TEXT,
  source_url TEXT,
  order_index INT DEFAULT 0
);

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  group_label TEXT,
  name TEXT,
  icon TEXT,
  width INT,
  order_index INT DEFAULT 0
);

-- 5. Tools Table
CREATE TABLE IF NOT EXISTS tools (
  id SERIAL PRIMARY KEY,
  name TEXT,
  image TEXT,
  order_index INT DEFAULT 0
);

-- 6. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  project_type TEXT,
  budget TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & Define Access Policies
ALTER TABLE bio ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow Public READ access for portfolio display
CREATE POLICY "Public Read Bio" ON bio FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON services FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public Read Tools" ON tools FOR SELECT USING (true);

-- Allow Public INSERT access for Contact Form
CREATE POLICY "Public Insert Messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Allow Authenticated (Admin) Users full access
CREATE POLICY "Admin Full Bio" ON bio FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Tools" ON tools FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Messages" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');
