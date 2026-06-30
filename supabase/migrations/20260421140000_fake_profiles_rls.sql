-- Allow any authenticated user to read fake dating profiles
DROP POLICY IF EXISTS "Authenticated users can read fake profiles" ON fake_dating_profiles;
CREATE POLICY "Authenticated users can read fake profiles"
ON fake_dating_profiles FOR SELECT
TO authenticated
USING (true);
