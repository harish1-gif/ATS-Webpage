-- SQL Schema for Protected Portal Access
-- Run this in your Supabase database

-- Create table for storing portal credentials
CREATE TABLE IF NOT EXISTS portal_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portal_type VARCHAR(50) NOT NULL UNIQUE CHECK (portal_type IN ('admin', 'client')),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Create table for tracking login attempts (optional)
CREATE TABLE IF NOT EXISTS portal_login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portal_type VARCHAR(50) NOT NULL,
  attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  success BOOLEAN,
  ip_address VARCHAR(45)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_portal_credentials_type ON portal_credentials(portal_type);
CREATE INDEX IF NOT EXISTS idx_portal_login_attempts_type ON portal_login_attempts(portal_type);
CREATE INDEX IF NOT EXISTS idx_portal_login_attempts_time ON portal_login_attempts(attempt_time DESC);

-- Insert default credentials (passwords should be hashed using bcrypt)
-- For testing, you can generate hashes at https://bcrypt.online/
-- Default passwords: admin_password and client_password
INSERT INTO portal_credentials (portal_type, password_hash, is_active)
VALUES 
  ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/KFm', TRUE),
  ('client', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/KFm', TRUE)
ON CONFLICT (portal_type) DO NOTHING;

-- Grant permissions
GRANT SELECT ON portal_credentials TO authenticated;
GRANT INSERT ON portal_login_attempts TO authenticated;
