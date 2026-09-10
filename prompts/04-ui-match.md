# Test 04 — Replicar una interfaz desde una imagen (vision)

**Carpeta destino:** `src/tests/04-ui-match/<TU-MODELO>/View.tsx`

**Que mide:** comprension de imagenes y fidelidad de maquetado — que tan bien traduce
jerarquias, espaciados, tipografias y colores de una captura a codigo.

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
4. El resultado debe verse como la captura a 1:1 en el tamanio de la referencia.

Podes modularizar en componentes secundarios dentro de tu carpeta. Exporta el componente
principal por defecto.
