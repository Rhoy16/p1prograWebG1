// src/services/api.js
// Centralised HTTP client for FamiBalance.
// Every service file imports `api` from here instead of calling fetch directly.

const BASE_URL = import.meta.env.VITE_API_URL || 'https://famibalance-api.onrender.com/api';

export const AUTH_TOKEN_KEY = 'famibalance_token';

/**
 * Thin wrapper around `fetch` that:
 *  1. Prepends the API base URL.
 *  2. Attaches the JWT token (when present) as a Bearer header.
 *  3. Automatically parses the JSON envelope `{ msg, data }`.
 *  4. Throws a descriptive error when the response is not OK.
 *  5. Adds a 60-second timeout for Render cold starts.
 */
async function request(endpoint, { method = 'GET', body, headers = {}, raw = false } = {}) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  const opts = {
    method,
    headers: {
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    signal: controller.signal
  };

  if (body) {
    opts.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, opts);
    clearTimeout(timeoutId);

    // For binary downloads (PDF / CSV) return the raw Response.
    if (raw) return res;

    const json = await res.json();

    if (!res.ok) {
      const err = new Error(json.msg || `Error ${res.status}`);
      err.status = res.status;
      err.data = json.data;
      throw err;
    }

    return json; // { msg, data }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('La petición ha tardado demasiado (timeout). El servidor podría estar despertando, por favor intenta de nuevo.');
    }
    throw error;
  }
}

/**
 * Public helpers that mirror the usual HTTP verbs.
 * Each returns `{ msg, data }` on success or throws on failure.
 */
export const api = {
  get:    (endpoint, opts)       => request(endpoint, { method: 'GET', ...opts }),
  post:   (endpoint, body, opts) => request(endpoint, { method: 'POST', body, ...opts }),
  put:    (endpoint, body, opts) => request(endpoint, { method: 'PUT', body, ...opts }),
  delete: (endpoint, opts)       => request(endpoint, { method: 'DELETE', ...opts }),

  /** Send a FormData (multipart) POST — useful for file uploads (OCR). */
  upload: (endpoint, formData, opts) =>
    request(endpoint, { method: 'POST', body: formData, ...opts }),
};
