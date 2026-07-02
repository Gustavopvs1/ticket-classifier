import { URGENCY_STYLES, SENTIMENT_EMOJI } from "../lib/constants";

export default function TicketDetail({ ticket, onClose, onDelete }) {
  if (!ticket) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-700 bg-slate-800 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded px-2 py-0.5 text-xs font-semibold ${URGENCY_STYLES[ticket.urgency]}`}>
              {ticket.urgency.toUpperCase()}
            </span>
            <span className="rounded bg-slate-700 px-2 py-0.5 text-xs">{ticket.category}</span>
            <span>{SENTIMENT_EMOJI[ticket.sentiment]}</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        <h3 className="mb-1 font-semibold">{ticket.summary}</h3>
        <p className="mb-4 text-xs text-slate-500">
          → {ticket.department} · {new Date(ticket.createdAt).toLocaleString()}
        </p>

        <Section title="Mensaje original">
          <p className="text-sm text-slate-300">{ticket.originalText}</p>
        </Section>

        <Section title="Respuesta sugerida por la IA">
          <p className="text-sm text-slate-300">{ticket.suggestedResponse}</p>
          <button
            onClick={() => navigator.clipboard.writeText(ticket.suggestedResponse)}
            className="mt-2 rounded bg-slate-700 px-2 py-1 text-xs hover:bg-slate-600"
          >
            📋 Copiar respuesta
          </button>
        </Section>

        <Section title="Clasificación cruda (JSON)">
          <pre className="overflow-x-auto rounded bg-slate-950 p-3 text-xs text-emerald-300">
{JSON.stringify(
  {
    category: ticket.category,
    urgency: ticket.urgency,
    department: ticket.department,
    summary: ticket.summary,
    sentiment: ticket.sentiment,
  },
  null,
  2
)}
          </pre>
        </Section>

        <button
          onClick={() => { onDelete(ticket.id); onClose(); }}
          className="mt-2 w-full rounded-lg border border-red-900 py-2 text-sm text-red-400 hover:bg-red-950 transition"
        >
          Eliminar ticket
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h4>
      {children}
    </div>
  );
}