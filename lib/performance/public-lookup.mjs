/** Small warm-instance cache for public redirect rows only. Never use for sessions,
 * tenant data or billing. Failures are not cached, concurrent misses coalesce,
 * and both negative entries and memory growth are bounded.
 */
export function publicLookup(
  load,
  { ttl = 30000, max = 256, now = Date.now } = {},
) {
  const entries = new Map();
  return async (key) => {
    const hit = entries.get(key);
    if (hit && (hit.pending || hit.until > now())) return hit.value;
    if (hit) entries.delete(key);
    if (entries.size >= max) entries.delete(entries.keys().next().value);
    const entry = { pending: true, until: 0, value: null };
    entry.value = Promise.resolve()
      .then(() => load(key))
      .then(
        (value) => {
          entry.pending = false;
          entry.until = now() + ttl;
          return value;
        },
        (error) => {
          if (entries.get(key) === entry) entries.delete(key);
          throw error;
        },
      );
    entries.set(key, entry);
    return entry.value;
  };
}
