-- SECURITY DEFINER function to delete a user from auth.users directly,
-- bypassing GoTrue's admin API (which fails with "Database error loading user"
-- when triggered from edge functions in some Supabase configurations).
-- Deleting from auth.users cascades to profiles, push_subscriptions, etc.

CREATE OR REPLACE FUNCTION public.admin_delete_user(p_target_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  -- Delete tables with no FK cascade first
  DELETE FROM public.dating_chats
    WHERE initiator_id = p_target_id OR partner_id = p_target_id;

  DELETE FROM public.user_promotions  WHERE user_id = p_target_id;
  DELETE FROM public.community_notifications WHERE user_id = p_target_id;

  -- Deleting the auth user cascades to: profiles (→ support_tickets),
  -- push_subscriptions, photos, numerology_maps, chat_sessions, chat_messages,
  -- daily_reports, advanced_reports, pillar_progress, pillar_badges,
  -- user_service_overrides, pay_per_use_purchases, community_posts,
  -- community_comments, community_reactions, community_reports.
  DELETE FROM auth.users WHERE id = p_target_id;
END;
$$;

-- Restrict execution to service_role only
REVOKE ALL ON FUNCTION public.admin_delete_user(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_delete_user(uuid) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_user(uuid) TO service_role;
