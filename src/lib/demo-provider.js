import { DEMO_CLASSIFICATIONS } from "../data/demoClassifications";

const FAKE_DELAY_MS = 900; // que se sienta que "piensa"

export async function classifyWithDemo(text) {
  await new Promise((r) => setTimeout(r, FAKE_DELAY_MS));
  const hit = DEMO_CLASSIFICATIONS[text.trim()];
  if (!hit) {
    const err = new Error("DEMO_ONLY_EXAMPLES");
    err.code = "DEMO_ONLY_EXAMPLES";
    throw err;
  }
  return { ...hit };
}