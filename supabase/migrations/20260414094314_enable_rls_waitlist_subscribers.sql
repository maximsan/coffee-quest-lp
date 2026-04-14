-- Server-side inserts use the Secret API key (elevated Postgres role, BYPASSRLS).
-- With RLS on and no policies, PostgREST clients using the publishable/anon key cannot read or modify rows.
ALTER TABLE public.waitlist_subscribers ENABLE ROW LEVEL SECURITY;
