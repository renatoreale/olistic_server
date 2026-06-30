-- ── Add photos to fake_dating_profiles ───────────────────────────────────────

ALTER TABLE fake_dating_profiles ADD COLUMN IF NOT EXISTS photos text[] DEFAULT '{}';

-- Assign one portrait URL per profile (randomuser.me, 100 per gender)
DO $$
DECLARE
  r      RECORD;
  fi     int := 0;
  mi     int := 0;
BEGIN
  FOR r IN SELECT user_id, sesso FROM fake_dating_profiles ORDER BY created_at LOOP
    IF r.sesso = 'F' THEN
      UPDATE fake_dating_profiles
      SET photos = ARRAY['https://randomuser.me/api/portraits/women/' || (fi % 100) || '.jpg']
      WHERE user_id = r.user_id;
      fi := fi + 1;
    ELSE
      UPDATE fake_dating_profiles
      SET photos = ARRAY['https://randomuser.me/api/portraits/men/' || (mi % 100) || '.jpg']
      WHERE user_id = r.user_id;
      mi := mi + 1;
    END IF;
  END LOOP;
END;
$$;

-- ── Update get_dating_user_photos to also cover fake profiles ─────────────────
-- storage_path for fakes is an external https:// URL; the edge function detects
-- and uses it directly instead of calling createSignedUrl.

DROP FUNCTION IF EXISTS get_dating_user_photos(uuid);

CREATE OR REPLACE FUNCTION get_dating_user_photos(target_user_id uuid)
RETURNS TABLE (storage_path text)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.storage_path
  FROM photos p
  WHERE p.user_id = target_user_id
  UNION ALL
  SELECT url AS storage_path
  FROM fake_dating_profiles fdp,
       unnest(fdp.photos) AS url
  WHERE fdp.user_id = target_user_id;
$$;
