// Supabase client for the landing page email capture.
// We use the anon key with Row Level Security rather than the service
// role key, which must only ever live on the server. The table
// (newsletter_subscribers) is created with an RLS policy that allows
// anonymous INSERTs only — the anon key cannot read or modify existing rows.

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * Insert an email address into the newsletter waitlist.
 * Returns { ok: true } on success, or { ok: false, error } on failure.
 * The caller decides how to surface this to the user.
 */
export async function subscribeEmail(email: string): Promise<
  { ok: true } | { ok: false; error: string }
> {
  if (!supabaseConfigured) {
    return { ok: false, error: 'Supabase is not configured yet.' };
  }

  const url = `${SUPABASE_URL}/rest/v1/newsletter_subscribers`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) return { ok: true };
    // 401/403 or validation error — surface a readable message.
    const text = await res.text().catch(() => '');
    return { ok: false, error: text || `HTTP ${res.status}` };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}