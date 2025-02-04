import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ColorPickerModalProps {
  /**
   * Callback chamado ao selecionar uma cor.
   * Recebe a cor no formato hexadecimal e o código (número de 0 a 255).
   */
  onColorSelect?: (colorHex: string, colorCode: number) => void;
  /**
   * Cor default (índice entre 0 e 255) que será selecionada inicialmente.
   * Exemplo: 46
   */
  color?: number;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({ onColorSelect, color }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [numberColor, setNumberColor] = useState<string>('text-black');
  const [mounted, setMounted] = useState<boolean>(false);

  // Garante que o componente está montado (necessário para o uso do document com Portal)
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Converte um índice (0 a 255) da paleta xterm para seu valor hexadecimal.
   */
  const getColorHex = (i: number): string => {
    if (i < 16) {
      // Cores básicas xterm (índices 0 a 15)
      const basicColors = [
        "#000000", "#800000", "#008000", "#808000",
        "#000080", "#800080", "#008080", "#c0c0c0",
        "#808080", "#ff0000", "#00ff00", "#ffff00",
        "#0000ff", "#ff00ff", "#00ffff", "#ffffff"
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
      const toHex = (c: number): string => c.toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    } else if (i >= 232 && i <= 255) {
      // Tons de cinza (índices 232 a 255)
      const gray = 8 + (i - 232) * 10;
      const hexGray = gray.toString(16).padStart(2, '0');
      return `#${hexGray}${hexGray}${hexGray}`;
    }
    return "#000000";
  };

  // Gera um array de índices de 0 a 255
  const colors = Array.from({ length: 256 }, (_, i) => i);

  // Se a propriedade "color" (default) for informada, define a seleção inicial
  useEffect(() => {
    if (typeof color === 'number' && color >= 0 && color < 256) {

      if (color == 0 || color == 16 || color == 232 || color == 233 || color == 234 || color == 235 || color == 236 || color == 238 || color == 239) {
        setNumberColor('text-white');
      } else {
        setNumberColor('text-black');
      }

      setSelectedIndex(color);
      setSelectedColor(getColorHex(color));
    }
  }, [color]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Ao clicar em uma cor, atualiza o estado e chama o callback
  const handleColorClick = (i: number) => {
    const colorHex = getColorHex(i);
    setSelectedIndex(i);
    setSelectedColor(colorHex);
    if (onColorSelect) {
      onColorSelect(colorHex, i);
    }
    closeModal();
  };

  // Conteúdo do modal utilizando classes do Tailwind CSS
  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-md max-h-[90vh] overflow-y-auto w-11/12 max-w-3xl">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-2xl leading-none border-none bg-transparent cursor-pointer"
          aria-label="Fechar"
        >
          &times;
        </button>
        <h3 className="text-center text-lg font-semibold mb-4">Choose a color</h3>
        <div className="grid grid-cols-[repeat(16,2.6rem)] gap-1 my-4 justify-center">
          {colors.map((i) => {
            const cellColor = getColorHex(i);
            const isSelected = selectedIndex === i;

            return (
              <div
                key={i}
                onClick={() => handleColorClick(i)}
                title={`Cor ${i}: ${cellColor}`}
                className={`relative cursor-pointer aspect-square w-10 ${isSelected ? 'border-4 border-black' : 'border border-gray-300'
                  } bg-[var(--cell-color)]`}
                // Define a variável CSS para a cor da célula
                style={{ '--cell-color': cellColor } as React.CSSProperties}
              >
                <span className="absolute bottom-0 right-0 bg-white bg-opacity-70 text-xs p-0.5">
                  {i}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-center">
      <button
        onClick={openModal}
        className={`px-4 py-2 text-lg cursor-pointer rounded border border-gray-300 bg-[var(--selected-color)] ${numberColor}`}
        // Define a variável CSS para a cor selecionada no botão
        style={{ '--selected-color': selectedColor || '#fff' } as React.CSSProperties}
      >
        {selectedIndex}
      </button>
      {mounted && isOpen && ReactDOM.createPortal(modalContent, document.body)}
    </div>
  );
};

export default ColorPickerModal;
