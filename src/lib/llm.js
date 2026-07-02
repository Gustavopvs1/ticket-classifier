import { CLASSIFY_PROMPT } from "./prompts";
import { parseTicket } from "./parser";
import { generateWithWebLLM } from "./webllm-provider";
import { generateWithGemini } from "./gemini-provider";
import { classifyWithDemo } from "./demo-provider";

const MAX_ATTEMPTS = 2;

export async function classifyMessage(text, { mode, apiKey } = {}) {
  if (mode === "demo") {
    return classifyWithDemo(text); // ya viene estructurado, no necesita parser
  }

  const prompt = CLASSIFY_PROMPT(text);
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const raw =
        mode === "byok"
          ? await generateWithGemini(prompt, apiKey)
          : await generateWithWebLLM(prompt);
      return parseTicket(raw);
    } catch (err) {
      console.warn(`Intento ${attempt} falló:`, err.message);
      lastError = err;
    }
  }
  throw lastError;
}