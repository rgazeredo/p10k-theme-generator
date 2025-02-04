// Este arquivo exporta um objeto que mapeia cada índice da paleta xterm (0-255)
// para sua representação hexadecimal.

export const xtermColors: Record<number, string> = (() => {
  const colors: Record<number, string> = {};

  /**
   * Converte um índice (0 a 255) da paleta xterm para sua cor hexadecimal.
   * - Índices 0 a 15: cores básicas.
   * - Índices 16 a 231: gera cores do cubo 6×6×6.
   * - Índices 232 a 255: tons de cinza.
   */
  function getColorHex(i: number): string {
    if (i < 16) {
      // Cores básicas (0 a 15)
      const basicColors = [
        "#000000", "#800000", "#008000", "#808000",
        "#000080", "#800080", "#008080", "#c0c0c0",
        "#808080", "#ff0000", "#00ff00", "#ffff00",
        "#0000ff", "#ff00ff", "#00ffff", "#ffffff",
      ];
      return basicColors[i];
    } else if (i >= 16 && i <= 231) {
      // Cubo de cores 6×6×6 (índices 16 a 231)
      const index = i - 16;
      const rIndex = Math.floor(index / 36);
      const gIndex = Math.floor((index % 36) / 6);
      const bIndex = index % 6;
      const steps = [0, 95, 135, 175, 215, 255];
      const r = steps[rIndex];
      const g = steps[gIndex];
      const b = steps[bIndex];
      const toHex = (c: number) => c.toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    } else if (i >= 232 && i <= 255) {
      // Tons de cinza (índices 232 a 255)
      const gray = 8 + (i - 232) * 10;
      const hexGray = gray.toString(16).padStart(2, '0');
      return `#${hexGray}${hexGray}${hexGray}`;
    }
    return "#000000"; // fallback
  }

  for (let i = 0; i < 256; i++) {
    colors[i] = getColorHex(i);
  }

  return colors;
})();
