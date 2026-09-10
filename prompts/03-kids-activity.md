# Test 03 — Actividad interactiva para ninos

**Carpeta destino:** `src/tests/03-kids-activity/<TU-MODELO>/View.tsx`

**Que mide:** logica de juego en el DOM, feedback visual, animacion paso a paso y UX
accesible y colorida para chicos.

Lee primero `prompts/00-reglas-base.md`.

## Prompt

Genera un juego educativo web dentro de `View.tsx`, colorido y moderno, pensado para ninos:

- El objetivo es ordenar bloques de instrucciones ("Avanzar", "Girar", "Saltar") para
  guiar a un personaje a traves de una grilla de 5x5 hasta la meta.
- El usuario arma la secuencia con drag-and-drop o botones.
- Un boton "Ejecutar" reproduce la secuencia animando al personaje paso a paso.
- Si el personaje choca con un obstaculo, se detiene y avisa.
- Al llegar a la meta, muestra un modal de victoria con confeti (`canvas-confetti`).
- Boton para reiniciar. Interfaz clara para chicos (textos grandes, alto contraste).

Podes separar en subcomponentes dentro de tu carpeta. Exporta el componente principal
por defecto.
