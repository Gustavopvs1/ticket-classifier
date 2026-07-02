import * as webllm from "@mlc-ai/web-llm";

export const MODEL_ID = "Llama-3.2-3B-Instruct-q4f16_1-MLC";

let engine = null;

export function isWebGPUAvailable() {
  return !!navigator.gpu;
}

export function isEngineReady() {
  return engine !== null;
}

export async function initWebLLM(onProgress) {
  if (engine) return;
  engine = await webllm.CreateMLCEngine(MODEL_ID, {
    initProgressCallback: (p) => onProgress?.(p.progress, p.text),
  });
}

export async function generateWithWebLLM(prompt) {
  if (!engine) throw new Error("El modelo no está inicializado");
  const reply = await engine.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
    max_tokens: 400,
  });
  return reply.choices[0].message.content;
}