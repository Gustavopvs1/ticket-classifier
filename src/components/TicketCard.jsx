import { URGENCY_STYLES, SENTIMENT_EMOJI } from "../lib/constants";

export default function TicketCard({ ticket, onSelect, onMove }) {
  return (
    <div
      onClick={() => onSelect(ticket)}
      className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800 p-3 hover:border-slate-500 transition"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className={`rounded px-2 py-0.5 text-xs font-semibold ${URGENCY_STYLES[ticket.urgency]}`}>
          {ticket.urgency.toUpperCase()}
        </span>
        <span className="rounded bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
          {ticket.category}
        </span>
        <span className="ml-auto text-sm">{SENTIMENT_EMOJI[ticket.sentiment]}</span>
      </div>

      <p className="text-sm font-medium text-slate-100">{ticket.summary}</p>
      <p className="mt-1 text-xs text-slate-400 line-clamp-2">{ticket.originalText}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-slate-500">→ {ticket.department}</span>
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          {ticket.status !== "nuevo" && (
            <button
              onClick={() => onMove(ticket.id, -1)}
              className="rounded bg-slate-700 px-2 py-0.5 text-xs hover:bg-slate-600"
              title="Mover atrás"
            >
              ←
            </button>
          )}
          {ticket.status !== "resuelto" && (
            <button
              onClick={() => onMove(ticket.id, 1)}
              className="rounded bg-slate-700 px-2 py-0.5 text-xs hover:bg-slate-600"
              title="Mover adelante"
            >
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}