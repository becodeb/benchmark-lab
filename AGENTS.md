# Benchmark Lab — instrucciones para el agente

Este repo NO es un producto: es un banco de pruebas para comparar modelos de IA
resolviendo las mismas tareas web. No lo mejores ni lo refactorices sin pedirlo.

## Protocolo de ejecucion

Cuando el usuario diga "hace el 1", "test 2", "corre el 3", "el 4", "el 5" (o variantes):

1. Lee SIEMPRE `prompts/00-reglas-base.md`.
2. Lee el prompt del test pedido:
   - `1` -> `prompts/01-dashboard.md`
   - `2` -> `prompts/02-threejs.md`
   - `3` -> `prompts/03-kids-activity.md`
   - `4` -> `prompts/04-ui-match.md`
   - `5` -> `prompts/05-landing.md`
3. Averigua TU carpeta de modelo (abajo).
4. Implementa EXACTAMENTE lo que pide el prompt, escribiendo SOLO dentro de
   `src/tests/<TEST>/<tu-modelo>/`.
5. El punto de entrada obligatorio es `View.tsx` con `export default`.
6. Responde en 3 lineas: test hecho, carpeta usada, archivos creados.

Si el usuario no aclara el numero, pregúntale una sola vez cual test quiere.

## Tu carpeta de modelo

Deriva un slug en kebab-case, minusculas, solo `[a-z0-9-]`, a partir del nombre del
modelo con el que estas corriendo (el que aparece en tu system prompt).
Ejemplos: `deepseek-flash` -> `deepseek-flash`; `Claude Sonnet 4.5` -> `claude-sonnet-4-5`.

Si el usuario te dice la carpeta ("hace el 1 en carpeta gemini"), usa esa.
Anuncia la carpeta elegida en tu primera linea de respuesta.

## Reglas duras

- NO modifiques `src/App.tsx`, `src/main.tsx`, configs (`vite`, `tailwind`, `tsconfig`),
  ni `package.json`.
- NO toques carpetas de otros modelos ni de otros tests.
- NO instales paquetes: usa los ya instalados (ver reglas base).
- NO hagas `npm install`, `npm run build` ni levantes servidores: Vite ya esta corriendo
  con HMR y la vista se actualiza sola.
- Podes crear subcomponentes, hooks y utilidades dentro de TU carpeta.
- Codigo e identificadores en ingles; sin comentarios innecesarios.

## Paquetes disponibles

`react`, `react-dom`, `lucide-react`, `three`, `recharts`, `framer-motion`,
`canvas-confetti`, `tailwindcss`. No hay React Three Fiber: usa `three` puro.
