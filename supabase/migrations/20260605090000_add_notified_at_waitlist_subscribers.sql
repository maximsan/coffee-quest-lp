-- Tracks whether a subscriber was included in the one-time launch notification.
ALTER TABLE public.waitlist_subscribers
  ADD COLUMN IF NOT EXISTS notified_at timestamptz;

COMMENT ON COLUMN public.waitlist_subscribers.notified_at IS
  'Timestamp set after the subscriber receives the Coffee Quest launch notification; NULL means unsent.';
