import TicketCard from "./TicketCard";
import { STATUSES } from "../lib/constants";

const COLUMN_LABELS = {
  nuevo: "🆕 Nuevos",
  en_proceso: "⚙️ En proceso",
  resuelto: "✅ Resueltos",
};

export default function KanbanBoard({ tickets, onSelect, onMove }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {STATUSES.map((status) => {
        const items = tickets.filter((t) => t.status === status);
        return (
          <div key={status} className="rounded-xl bg-slate-800/50 p-3">
            <h2 className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-300">
              {COLUMN_LABELS[status]}
              <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs">
                {items.length}
              </span>
            </h2>
            <div className="flex flex-col gap-2">
              {items.length === 0 && (
                <p className="py-6 text-center text-xs text-slate-600">Sin tickets</p>
              )}
              {items.map((t) => (
                <TicketCard key={t.id} ticket={t} onSelect={onSelect} onMove={onMove} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}