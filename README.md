# 🎫 AI Ticket Classifier

**AI-powered ticket triage that runs 100% in your browser.** No backend, no database, no API keys required — the LLM runs locally on your GPU via WebGPU.

**🔗 Live demo:** https://ticket-classifier-swart.vercel.app/

![Demo](docs/demo.gif)

## What it does

Type (or pick) a support message like *"the ERP is down and I need to run today's invoices"* and the app:

1. **Classifies it** — category, urgency, department, and user sentiment
2. **Generates a suggested response** — professional, empathetic, in Spanish
3. **Drops it into a kanban board** — new → in progress → resolved, persisted in localStorage

Open any ticket to see the raw JSON returned by the model — the classification pipeline is fully transparent.

## Three inference modes

| Mode | How it works | Latency | Requirements |
|------|-------------|---------|--------------|
| ⚡ **Demo** (default) | Precomputed classifications for the example tickets | Instant | None — works on any device |
| 🧠 **Local AI** | Qwen 2.5 1.5B running in-browser via [WebLLM](https://github.com/mlc-ai/web-llm) + WebGPU | ~10–30s | Chrome/Edge, ~1GB one-time download |
| 🔑 **BYOK** | Your own free Gemini API key, called directly from the browser | ~2s | A [Google AI Studio](https://aistudio.google.com/apikey) key |

**Why three modes?** Because the audience for a demo is unpredictable. Demo mode guarantees anyone can see the full flow in 30 seconds on any hardware. Local AI is the technical showcase — real inference, zero servers, verifiable in the Network tab (spoiler: no requests). BYOK covers real free-text classification without the download.

## Privacy by architecture

In local mode, **your data never leaves your machine** — and you don't have to take my word for it. Open DevTools → Network, classify a ticket, and watch: zero requests. The model weights are cached in the browser after the first download; inference runs entirely on your GPU. You could disconnect from the internet and keep classifying.

For internal business data (customer names, operational issues), this is not a gimmick — it's the difference between "trust our privacy policy" and "verify it yourself."

## Architecture
