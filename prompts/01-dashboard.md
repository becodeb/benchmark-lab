# Test 01 — Dashboard de analiticas educativas

**Carpeta destino:** `src/tests/01-dashboard/<TU-MODELO>/View.tsx`

**Que mide:** layout denso, manejo de estado, tablas con filtros + paginacion,
responsive y capacidad de proponer datos y graficos creibles sin romper el CSS.

Lee primero `prompts/00-reglas-base.md`.

## Prompt

Genera un dashboard de analiticas educativas en `View.tsx`. Debe incluir:

- Barra lateral colapsable con navegacion.
- Tarjetas de KPIs (al menos 4) con iconos (lucide-react) y variacion respecto al mes anterior.
- Una tabla de estudiantes con: buscador, filtro por estado (activo/inactivo/becado),
  orden por columna y paginacion funcional.
- Al menos un grafico: podes usar `recharts` o construirlo con SVG/CSS propio.
- Modo oscuro por defecto, diseno profesional y 100% responsive.

Usa datos de ejemplo realistas (nombres, cursos, fechas). Podes separar la vista en
subcomponentes dentro de tu carpeta. Exporta el componente principal por defecto.
