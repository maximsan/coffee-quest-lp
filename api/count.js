import { createClient } from "@supabase/supabase-js";

export function createCountHandler({
  env = process.env,
  createClientImpl = createClient,
} = {}) {
  return async function handler(req, res) {
    const countApiToken = env.COUNT_API_TOKEN;

    if (
      !countApiToken ||
      req.headers.authorization !== `Bearer ${countApiToken}`
    ) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const supabase = createClientImpl(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY);

    const { count, error } = await supabase
      .from("waitlist_subscribers")
      .select("*", { count: "exact", head: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ count });
  };
}

export default createCountHandler();
