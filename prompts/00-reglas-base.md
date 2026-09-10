# 00 — Reglas base (aplican a TODOS los tests)

Estas reglas se suman al prompt del test que te toque.

## Donde escribis
- Tu carpeta es `src/tests/<TEST>/<TU-MODELO>/`.
- El archivo de entrada obligatorio es **`View.tsx`** y debe tener
  `export default function View() { ... }`.
- Podes crear todos los archivos extra que quieras DENTRO de tu carpeta
  (subcomponentes, hooks, tipos, css, assets). No hace falta un solo archivo.

## Que podes usar
- Tailwind CSS ya esta configurado y disponible.
- Paquetes instalados: `react`, `react-dom`, `lucide-react`, `three`,
  `recharts`, `framer-motion`, `canvas-confetti`.
- Para 3D usa **`three` puro** (no hay React Three Fiber).
- **No instales paquetes nuevos.** Si algo no esta, resolvelo con lo que hay.

## Reglas duras
- NO modifiques `src/App.tsx`, `src/main.tsx`, configs ni `package.json`.
- NO toques carpetas de otros modelos ni de otros tests.
- NO hace falta levantar el servidor ni correr build: Vite ya esta corriendo con HMR.
- Codigo e identificadores en ingles. Sin comentarios innecesarios.
- La vista debe funcionar sola, sin pasos manuales.

## Como responder
Cuando termines, contesta en 3 lineas:
1. Test realizado.
2. Ruta de la carpeta usada.
3. Lista de archivos creados.
