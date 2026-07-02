import { useState } from "react";
import { EXAMPLE_MESSAGES } from "../data/examples";

export default function TicketInput({ onSubmit, isClassifying }) {
  const [text, setText] = useState("");

  function handleSubmit() {
    const clean = text.trim();
    if (!clean || isClassifying) return;
    onSubmit(clean);
    setText("");
  }

  return (
    <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <label className="mb-2 block text-sm font-semibold text-slate-300">
        Nuevo ticket
      </label>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
        }}
        placeholder="Describe el problema... ej: 'no puedo entrar al sistema de nómina'"
        rows={2}
        className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
      />

      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-500">Enter para enviar · Shift + Enter para salto de línea</p>
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || isClassifying}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40 transition"
        >
          {isClassifying ? "Clasificando..." : "Clasificar con IA"}
        </button>
      </div>

      <div className="mt-3 border-t border-slate-700/50 pt-3">
        <p className="mb-2 text-xs text-slate-500">O prueba con un ejemplo:</p>
        <div className="flex flex-wrap gap-1.5">
          {EXAMPLE_MESSAGES.map((msg, i) => (
            <button
              key={i}
              onClick={() => setText(msg)}
              disabled={isClassifying}
              className="rounded-full bg-slate-700/70 px-3 py-1 text-xs text-slate-300 hover:bg-slate-600 disabled:opacity-40 transition"
            >
              {msg.length > 45 ? msg.slice(0, 45) + "…" : msg}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}