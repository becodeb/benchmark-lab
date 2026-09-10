# Test 04 — Replicar una interfaz desde una imagen (vision + interaccion)

**Carpeta destino:** `src/tests/04-ui-match/<TU-MODELO>/View.tsx`

**Que mide:** comprension de imagenes, fidelidad de maquetado e interaccion
(drag con el mouse + cambio de tema en tiempo real).

Lee primero `prompts/00-reglas-base.md`.

## Preparacion (la hace el humano una sola vez)

Poner la captura de referencia en `assets/04-target-ui.png` (ver `assets/README.md`).

## Prompt

1. Abre y mira la imagen `assets/04-target-ui.png` con tu herramienta de lectura de archivos.
2. Si la imagen no existe, decilo claramente y NO inventes un diseno alternativo.
3. Replica esa interfaz con la mayor fidelidad visual posible en `View.tsx` usando Tailwind CSS:
   - Respeta paleta de colores, espaciados (padding/margin), bordes redondeados, sombras
     y jerarquia tipografica.
   - Si hay iconos, usa equivalentes de `lucide-react` o SVG inline.
   - Usa datos/imagenes de relleno solo donde la captura no permita otro contenido.
4. Interaccion obligatoria sobre la **ventana de avion** que aparece en la imagen:
   - Su persiana se puede arrastrar hacia abajo con el mouse (drag con pointer events).
   - A medida que la persiana baja, TODA la pagina se va oscureciendo de forma fluida y
     proporcional al recorrido: persiana arriba = modo claro, persiana abajo del todo =
     modo oscuro completo.
   - Al soltar, la persiana queda en la posicion donde la dejaste (se puede volver a subir
     y la pagina vuelve al modo claro).
   - El arrastre no debe romper el scroll de la pagina ni seleccionar texto por accidente.
5. El resto del layout debe verse como la captura a 1:1 en el tamanio de la referencia.

Podes modularizar en componentes secundarios dentro de tu carpeta. No uses librerias
nuevas. Exporta el componente principal por defecto.
