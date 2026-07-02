import { useState } from "react";

const MODES = [
  { id: "demo",  label: "⚡ Demo",     desc: "Instantáneo, respuestas precalculadas de los ejemplos" },
  { id: "local", label: "🧠 IA local", desc: "El modelo corre en tu navegador (~1GB, requiere WebGPU)" },
  { id: "byok",  label: "🔑 Tu API key", desc: "Gemini con tu propia key gratuita" },
];

export default function ModeSelector({ mode, onChangeMode, apiKey, onChangeApiKey }) {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="mb-4 rounded-xl border border-slate-700 bg-slate-800/50 p-3">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => onChangeMode(m.id)}
            title={m.desc}
            className={`rounded-lg px-3 py-1.5 text-sm transition ${
              mode === m.id
                ? "bg-blue-600 font-semibold text-white"
                : "bg-slate-700/60 text-slate-300 hover:bg-slate-600"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {MODES.find((m) => m.id === mode)?.desc}
      </p>

      {mode === "byok" && (
        <div className="mt-3 flex gap-2">
          <input
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => onChangeApiKey(e.target.value)}
            placeholder="Pega tu API key de Google AI Studio (gratis)"
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="rounded-lg bg-slate-700 px-3 text-sm hover:bg-slate-600"
          >
            {showKey ? "🙈" : "👁"}
          </button>
        </div>
      )}
      {mode === "byok" && (
        <p className="mt-1.5 text-xs text-slate-500">
          Tu key se guarda solo en tu navegador (localStorage) y las llamadas van directo de tu navegador a Google.
        </p>
      )}
    </div>
  );
}