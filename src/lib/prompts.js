export const CLASSIFY_PROMPT = (message) => `Eres un sistema de triaje de tickets de soporte interno de una empresa.

Analiza el siguiente mensaje y responde ÚNICAMENTE con un objeto JSON válido, sin markdown, sin explicaciones, sin texto adicional.

Estructura exacta:
{
  "category": una de ["TI", "RH", "Operaciones", "Facturación", "Cliente", "Otro"],
  "urgency": una de ["baja", "media", "alta", "crítica"],
  "department": departamento que debe atenderlo (string corto),
  "summary": resumen del problema en máximo 12 palabras,
  "suggestedResponse": respuesta profesional y empática al usuario en 2-3 oraciones, en español,
  "sentiment": una de ["neutral", "frustrado", "molesto"]
}

Criterios de urgencia:
- crítica: bloquea operación del negocio hoy (facturación caída, sistema de producción abajo)
- alta: bloquea el trabajo de una persona sin alternativa
- media: molesta pero hay workaround
- baja: solicitudes, dudas, mejoras

Mensaje a clasificar:
"""${message}"""`;