# Test 02 — Escena 3D interactiva

**Carpeta destino:** `src/tests/02-threejs/<TU-MODELO>/View.tsx`

**Que mide:** razonamiento espacial, manejo de camara, ciclo de animacion y uso correcto
de librerias 3D (three.js / React Three Fiber).

Lee primero `prompts/00-reglas-base.md`.

## Prompt

Crea una escena 3D interactiva dentro de `View.tsx`:

- Un planeta estilizado con anillos y varias lunas orbitando a distintas velocidades.
- Iluminacion mixta: luz direccional + luz ambiental.
- Controles de orbita con el mouse (OrbitControls).
- Un boton flotante para alternar entre rotacion automatica y pausa.
- La escena debe ocupar toda la pantalla y adaptarse al redimensionar la ventana.

Usa `three` puro con `OrbitControls` (importalo de `three/examples/jsm/controls/OrbitControls.js`).
Maneja el ciclo de vida a mano (montaje, `requestAnimationFrame`, limpieza en el unmount).
Puedes crear subcomponentes dentro de tu carpeta. Exporta el componente principal por defecto.
