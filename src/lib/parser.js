import { CATEGORIES, URGENCIES } from "./constants";

const SENTIMENTS = ["neutral", "frustrado", "molesto"];

export function parseTicket(raw) {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("La respuesta del modelo no contiene JSON");

  const parsed = JSON.parse(match[0]);
  return normalizeTicket(parsed);
}

function normalizeTicket(t) {
  return {
    category: pick(t.category, CATEGORIES, "Otro"),
    urgency: pick(normalize(t.urgency), URGENCIES, "media"),
    department: typeof t.department === "string" && t.department.trim()
      ? t.department.trim()
      : "Por asignar",
    summary: typeof t.summary === "string" && t.summary.trim()
      ? t.summary.trim()
      : "(sin resumen)",
    suggestedResponse: typeof t.suggestedResponse === "string" && t.suggestedResponse.trim()
      ? t.suggestedResponse.trim()
      : "(sin respuesta sugerida)",
    sentiment: pick(normalize(t.sentiment), SENTIMENTS, "neutral"),
  };
}

function pick(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

// los modelos chicos a veces devuelven "Crítica", "CRITICA", etc.
function normalize(s) {
  if (typeof s !== "string") return s;
  return s.toLowerCase().trim()
    .replace("critica", "crítica"); // sin acento → con acento
}