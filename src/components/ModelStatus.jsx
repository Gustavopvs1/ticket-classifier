export default function ModelStatus({ status, progress, statusText, onRetry, alreadyDownloaded }) {
  const fromCache = alreadyDownloaded || statusText?.toLowerCase().includes("cache");

  // ── Ya descargado antes: siempre toast, nunca banner ──
  if (status === "loading" && fromCache) {
    return (
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-3 rounded-xl border border-blue-500/60 bg-gradient-to-br from-blue-950 to-slate-900 px-4 py-3 shadow-xl shadow-blue-500/20 ring-1 ring-blue-400/30">
        <Spinner />
        <div>
          <p className="text-sm font-semibold text-blue-100">Preparando modelo local</p>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-1 w-24 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full bg-blue-400 transition-all duration-300"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <span className="font-mono text-xs text-blue-300">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ── Primera descarga: banner completo (aquí sí se justifica) ──
  if (status === "loading") {
    const pct = Math.round(progress * 100);
    return (
      <div className="mb-4 rounded-lg border border-blue-900 bg-blue-950/40 px-4 py-3">
        <div className="flex items-center justify-between text-sm text-blue-300">
          <span>⏳ Descargando modelo (~2GB, solo la primera vez)...</span>
          <span className="font-mono">{pct}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-blue-800 transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        {statusText && (
          <p className="mt-1.5 truncate text-xs text-slate-500">{statusText}</p>
        )}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mb-4 rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
        <p className="font-semibold">No se pudo cargar el modelo 😞</p>
        <p className="mt-1 text-xs text-red-400">
          Verifica que tu navegador soporte WebGPU (Chrome/Edge recientes) y que tengas conexión.
        </p>
        <button
          onClick={onRetry}
          className="mt-2 rounded bg-red-900/60 px-3 py-1 text-xs hover:bg-red-900"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // ── Listo: nada. El botón habilitado ya lo comunica ──
  return null;
}

function Spinner() {
  return (
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-800 border-t-blue-300" />
  );
}