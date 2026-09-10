# Benchmark Lab

Un solo proyecto (Vite + React + TypeScript + Tailwind) para comparar modelos de IA
resolviendo **las mismas tareas web** y verlas lado a lado cambiando un boton.
Sin APIs, sin levantar mil servidores: **un puerto, HMR, y el arquitecto.**

## Como se usa (flujo real)

1. **Un solo servidor.** En una terminal:
   ```bash
   npm install     # solo la primera vez
   npm run dev     # abre http://localhost:5173
   ```
   Dejalo abierto. No lo cierres mas.

2. **Elegir modelo.** Abri una sesion de opencode en esta carpeta y selecciona el
   modelo que quieras probar.

3. **Pedir el test.** Escribile simplemente:
   ```
   hace el 1
   ```
   El agente lee `prompts/01-dashboard.md` y escribe en
   `src/tests/01-dashboard/<su-modelo>/View.tsx`. Tarda lo que tarde el modelo.

4. **Repetir con otro modelo.** Abri OTRA sesion de opencode, elegi otro modelo,
   deci otra vez `hace el 1`. Va a escribir en su propia carpeta (porque deriva su
   slug del nombre del modelo).

5. **Comparar.** En la barra flotante de arriba cambia el **Test** y hacé clic en los
   botones de **Modelo**. HMR actualiza solo. Bonus: aprieta la tecla `B` para ocultar
   la barra (comodo para el test 3D a pantalla completa).

> Tambien podes pedir un test distinto en una misma sesion: `hace el 3`, `hace el 5`, etc.

## Los tests

| # | Test | Que mide | Prompt |
|---|------|----------|--------|
| 1 | Dashboard | Layout denso, estado, tablas, graficos, responsive | `prompts/01-dashboard.md` |
| 2 | Escena 3D | Three.js, camara, animacion, OrbitControls | `prompts/02-threejs.md` |
| 3 | Actividad para ninos | Logica de juego, drag-and-drop, UX | `prompts/03-kids-activity.md` |
| 4 | Copiar una imagen | Vision + fidelidad + drag que activa modo oscuro | `prompts/04-ui-match.md` |
| 5 | Landing page | Marketing, animaciones, responsive | `prompts/05-landing.md` |

## El test de vision (imagen + interaccion)

1. Guardá una captura que te guste en `assets/04-target-ui.png` (idealmente con una
   ventana de avion para la interaccion).
2. Decile al agente: `hace el 4`.
3. El agente abre la imagen, la replica y ademas hace que la persiana de la ventana de
   avion se pueda **arrastrar hacia abajo**: al bajarla, la pagina pasa a modo oscuro.
4. Compara con la captura original abriendo la imagen al lado.

## Como se puntua

Abrí `RESULTS.md` y usa la rubrica (1 a 5). La idea es 30 segundos por vista, no leer
codigo: se juzga lo que se ve y lo que funciona.

## Agregar un test nuevo

1. Crea `prompts/06-mi-idea.md` con el objetivo y el prompt.
2. Agregá la linea en la tabla de este README y en `AGENTS.md`.
3. Escribile al agente: `hace el 6`.

La carpeta `src/tests/06-mi-idea/<modelo>/View.tsx` se detecta sola
(`import.meta.glob`), no hay que registrar nada.

## Estructura

```
benchmark-lab/
├─ AGENTS.md              <- hace que "hace el 1" funcione
├─ prompts/               <- los prompts listos, numerados
├─ assets/                <- imagenes de referencia (test 4)
├─ RESULTS.md             <- rubrica y resultados
└─ src/
   ├─ App.tsx             <- switcher de test/modelo (no tocar)
   ├─ index.css           <- Tailwind
   └─ tests/
      ├─ 00-inicio/demo/View.tsx     <- vista de bienvenida (borrable)
      └─ <test>/<modelo>/View.tsx    <- lo que produce cada modelo
```

## Notas

- Los modelos NO deben instalar paquetes ni tocar configs; solo escribir su `View.tsx`.
- La vista corre sin StrictMode a proposito, para un montaje unico y justo.
- Si una vista rompe, el `ErrorBoundary` de `App.tsx` muestra el stack: eso es
  informacion valiosa del benchmark (cuenta como fallo del modelo).
