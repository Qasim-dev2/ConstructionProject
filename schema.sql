-- RECON Construction Website - Database Schema
-- This file contains the SQL schema for creating necessary tables in Supabase

-- =====================================================
-- Contacts/Quote Requests Table
-- =====================================================
-- This table stores all quote requests submitted through the contact form
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_read ON contacts(read);

-- =====================================================
-- Projects Table
-- =====================================================
-- This table stores all construction projects for the portfolio
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  project_type VARCHAR(50) DEFAULT 'regular' CHECK (project_type IN ('featured', 'regular')),
  image_urls TEXT[], -- Array of image URLs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(project_type);

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================

-- Enable RLS on tables
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Contacts table policies
-- Allow anyone to insert (submit quote requests)
CREATE POLICY "Anyone can insert contacts" ON contacts
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated admin users can read/update/delete
CREATE POLICY "Authenticated users can view contacts" ON contacts
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contacts" ON contacts
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete contacts" ON contacts
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Projects table policies
-- Allow anyone to read projects (public view)
CREATE POLICY "Anyone can view projects" ON projects
  FOR SELECT
  USING (true);

-- Only authenticated admin users can insert/update/delete
CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects" ON projects
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects" ON projects
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- =====================================================
-- Triggers for automatic updated_at
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for contacts table
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for projects table
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
