import { useState, useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import KanbanBoard from "./components/KanbanBoard";
import TicketInput from "./components/TicketInput";
import TicketDetail from "./components/TicketDetail";
import ModelStatus from "./components/ModelStatus";
import ModeSelector from "./components/ModeSelector";
import { MOCK_TICKETS } from "./data/mockTickets";
import { STATUSES } from "./lib/constants";
import { classifyMessage } from "./lib/llm";
import { initWebLLM, isWebGPUAvailable, isEngineReady } from "./lib/webllm-provider";
import {
  loadTickets, saveTickets,
  wasModelDownloaded, markModelDownloaded,
  loadMode, saveMode, loadApiKey, saveApiKey,
} from "./lib/storage";

export default function App() {
  const [tickets, setTickets] = useState(() => loadTickets() ?? MOCK_TICKETS);
  const [selected, setSelected] = useState(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [classifyError, setClassifyError] = useState(null);

  const [mode, setMode] = useState(() => loadMode());
  const [apiKey, setApiKey] = useState(() => loadApiKey());

  const [modelStatus, setModelStatus] = useState("idle"); // idle | loading | ready | error
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");

  useEffect(() => { saveTickets(tickets); }, [tickets]);
  useEffect(() => { saveMode(mode); }, [mode]);
  useEffect(() => { saveApiKey(apiKey); }, [apiKey]);

  const loadModel = useCallback(async () => {
    if (isEngineReady()) { setModelStatus("ready"); return; }
    if (!isWebGPUAvailable()) {
      setModelStatus("error");
      setStatusText("WebGPU no disponible en este navegador");
      return;
    }
    setModelStatus("loading");
    try {
      await initWebLLM((p, text) => { setProgress(p); setStatusText(text); });
      markModelDownloaded();
      setModelStatus("ready");
    } catch (err) {
      console.error(err);
      setModelStatus("error");
    }
  }, []);

  // el modelo solo se carga si el usuario elige IA local
  useEffect(() => {
    if (mode === "local") loadModel();
  }, [mode, loadModel]);

  function moveTicket(id, direction) {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = STATUSES.indexOf(t.status);
        const next = STATUSES[idx + direction];
        return next ? { ...t, status: next } : t;
      })
    );
  }

  function deleteTicket(id) {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  }

  async function handleNewTicket(text) {
    setIsClassifying(true);
    setClassifyError(null);
    try {
      const classification = await classifyMessage(text, { mode, apiKey });
      const ticket = {
        id: uuid(),
        originalText: text,
        ...classification,
        status: "nuevo",
        createdAt: Date.now(),
      };
      setTickets((prev) => [ticket, ...prev]);
    } catch (err) {
      console.error(err);
      if (err.code === "DEMO_ONLY_EXAMPLES") {
        setClassifyError(
          "El modo Demo solo clasifica los ejemplos precalculados. Activa 🧠 IA local o 🔑 tu API key para clasificar texto libre."
        );
      } else if (mode === "byok" && !apiKey.trim()) {
        setClassifyError("Pega tu API key de Gemini para usar este modo.");
      } else {
        setClassifyError("No se obtuvo una clasificación válida. Intenta de nuevo.");
      }
    } finally {
      setIsClassifying(false);
    }
  }

  const inputDisabled =
    (mode === "local" && modelStatus !== "ready") ||
    (mode === "byok" && !apiKey.trim());

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-xl font-bold">🎫 AI Ticket Classifier</h1>
        <p className="text-sm text-slate-400">
          Triaje de tickets con IA — 100% en tu navegador
        </p>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        <ModeSelector
          mode={mode}
          onChangeMode={setMode}
          apiKey={apiKey}
          onChangeApiKey={setApiKey}
        />

        {mode === "local" && (
          <ModelStatus
            status={modelStatus}
            progress={progress}
            statusText={statusText}
            onRetry={loadModel}
            alreadyDownloaded={wasModelDownloaded()}
          />
        )}

        <TicketInput
          onSubmit={handleNewTicket}
          isClassifying={isClassifying}
          disabled={inputDisabled}
        />

        {classifyError && (
          <div className="mb-4 rounded-lg border border-amber-900 bg-amber-950/40 px-4 py-2 text-sm text-amber-300">
            ⚠️ {classifyError}
          </div>
        )}

        <KanbanBoard tickets={tickets} onSelect={setSelected} onMove={moveTicket} />
      </main>

      <TicketDetail
        ticket={selected}
        onClose={() => setSelected(null)}
        onDelete={deleteTicket}
      />
    </div>
  );
}