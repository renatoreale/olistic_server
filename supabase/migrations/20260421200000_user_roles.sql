-- Add role column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user'
  CHECK (role IN ('user', 'admin', 'superadmin'));

-- Set existing admins by email
UPDATE profiles
SET role = 'admin'
WHERE user_id IN (
  SELECT id FROM auth.users
  WHERE email IN ('regnew01@gmail.com', 'maria732008@live.it', 'realerenato@gmail.com')
);
