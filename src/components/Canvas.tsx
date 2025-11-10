import { NeuronLegend } from '@/components/NeuronLegend';
import type { Neuron } from '@/engine/Neuron';
import { useCanvas } from '@/hooks/useCanvas';
import { drawAll, toScreen } from '@/lib/canvasHelpers';
import { selectSelectedNeuron, selectSetSelectedNeuron, useSelectedNeuronStore } from '@/stores/selectedNeuronStore';
import React from 'react';

type CanvasProps = {
  neurons: Neuron[];
};

export const Canvas = ({ neurons }: CanvasProps) => {
  const selectedNeuron = useSelectedNeuronStore(selectSelectedNeuron);
  const setSelectedNeuron = useSelectedNeuronStore(selectSetSelectedNeuron);

  const canvasRef = useCanvas(
    (ctx, width, height) => drawAll(ctx, width, height, neurons, selectedNeuron),
    [neurons, selectedNeuron],
  );

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const hitRadius = 10;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let clicked: Neuron | null = null;
    for (const n of neurons) {
      const p = toScreen(n.x, n.y, rect.width, rect.height, neurons);

      if (Math.hypot(p.x - x, p.y - y) <= hitRadius) {
        clicked = n;
        break;
      }
    }
    setSelectedNeuron(clicked);
  };

  return (
    <>
      <NeuronLegend />
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
        />
      </div>
    </>
  );
};
