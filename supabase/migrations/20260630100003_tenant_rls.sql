-- Aggiorna RLS community per isolamento per tenant

-- community_posts: gli autenticati vedono solo post del proprio tenant
DROP POLICY IF EXISTS "Anyone authenticated can view posts" ON public.community_posts;

CREATE POLICY "Tenant members can view posts" ON public.community_posts
  FOR SELECT TO authenticated
  USING (tenant_id = public.current_user_tenant_id());

-- Anon: vede tutto (landing page)
-- (la policy "Anyone can view posts" per anon esiste già dalla migration precedente)

-- INSERT: il tenant_id viene forzato a quello dell'utente
DROP POLICY IF EXISTS "Users can insert own posts" ON public.community_posts;
CREATE POLICY "Users can insert own posts" ON public.community_posts
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND tenant_id = public.current_user_tenant_id());

-- community_comments
DROP POLICY IF EXISTS "Anyone authenticated can view comments" ON public.community_comments;
CREATE POLICY "Tenant members can view comments" ON public.community_comments
  FOR SELECT TO authenticated
  USING (tenant_id = public.current_user_tenant_id());

DROP POLICY IF EXISTS "Users can insert own comments" ON public.community_comments;
CREATE POLICY "Users can insert own comments" ON public.community_comments
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND tenant_id = public.current_user_tenant_id());

-- community_reactions
DROP POLICY IF EXISTS "Anyone authenticated can view reactions" ON public.community_reactions;
CREATE POLICY "Tenant members can view reactions" ON public.community_reactions
  FOR SELECT TO authenticated
  USING (tenant_id = public.current_user_tenant_id());

DROP POLICY IF EXISTS "Users can insert own reactions" ON public.community_reactions;
CREATE POLICY "Users can insert own reactions" ON public.community_reactions
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND tenant_id = public.current_user_tenant_id());

DROP POLICY IF EXISTS "Users can update own reactions" ON public.community_reactions;
CREATE POLICY "Users can update own reactions" ON public.community_reactions
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id AND tenant_id = public.current_user_tenant_id());

-- community_notifications: già filtrate per user_id, ok

-- dating: find-soulmates è cross-tenant per design (anime gemelle)
-- Le dating_chats rimangono visibili solo ai partecipanti (RLS esistente ok)

-- Profiles: aggiunge policy per impedire login cross-tenant
-- (gestito lato app con controllo tenant_id al login)
