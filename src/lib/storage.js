const KEY = "ticket-classifier:tickets";

const MODEL_KEY = "ticket-classifier:model-downloaded";

const MODE_KEY = "ticket-classifier:mode";

export function loadMode() {
  return localStorage.getItem(MODE_KEY) || "demo"; // demo | local | byok
}

export function saveMode(mode) {
  localStorage.setItem(MODE_KEY, mode);
}

const APIKEY_KEY = "ticket-classifier:gemini-key";

export function loadApiKey() {
  return localStorage.getItem(APIKEY_KEY) || "";
}

export function saveApiKey(key) {
  localStorage.setItem(APIKEY_KEY, key);
}

export function wasModelDownloaded() {
  return localStorage.getItem(MODEL_KEY) === "true";
}

export function markModelDownloaded() {
  localStorage.setItem(MODEL_KEY, "true");
}

export function loadTickets() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null; // primera visita
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null; // datos corruptos → arrancamos limpio
  }
}

export function saveTickets(tickets) {
  try {
    localStorage.setItem(KEY, JSON.stringify(tickets));
  } catch (err) {
    console.warn("No se pudo guardar en localStorage:", err);
  }
}