CREATE TABLE IF NOT EXISTS public.waitlist_subscribers (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS waitlist_subscribers_email_key
  ON public.waitlist_subscribers (email);

ALTER TABLE public.waitlist_subscribers ENABLE ROW LEVEL SECURITY;
