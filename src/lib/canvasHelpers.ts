import { NEURON_COLORS } from '@/config/neuron';
import type { Neuron } from '@/types/neuron.ts';

export const getBounds = (neurons: Neuron[]) => {
  if (!neurons || neurons.length === 0) {
    return { minX: 0, minY: 0, maxX: 1000, maxY: 600 };
  }
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const n of neurons) {
    if (n.x < minX) minX = n.x;
    if (n.y < minY) minY = n.y;
    if (n.x > maxX) maxX = n.x;
    if (n.y > maxY) maxY = n.y;
  }
  if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY) || maxX === minX || maxY === minY) {
    return { minX: 0, minY: 0, maxX: 1000, maxY: 600 };
  }
  return { minX, minY, maxX, maxY };
};

export const toScreen = (neuronX: number, neuronY: number, width: number, height: number, neurons: Neuron[]) => {
  const padding = 20;
  const { minX, minY, maxX, maxY } = getBounds(neurons);
  const sx = (width - padding * 2) / (maxX - minX);
  const sy = (height - padding * 2) / (maxY - minY);
  const scale = Math.min(sx, sy);
  const ox = padding + (width - padding * 2 - (maxX - minX) * scale) / 2;
  const oy = padding + (height - padding * 2 - (maxY - minY) * scale) / 2;
  return { x: ox + (neuronX - minX) * scale, y: oy + (neuronY - minY) * scale, scale };
};

export const drawNeuron = (
  ctx: CanvasRenderingContext2D,
  neuron: Neuron,
  isSelected: boolean,
  width: number,
  height: number,
  neurons: Neuron[],
) => {
  const p = toScreen(neuron.x, neuron.y, width, height, neurons);

  let fillColor: string = NEURON_COLORS.active;
  let strokeColor: string = NEURON_COLORS.strokeActive;

  if (neuron.state === 'sleeping') {
    fillColor = NEURON_COLORS.sleeping;
    strokeColor = NEURON_COLORS.strokeSleeping;
  }
  if (neuron.state === 'drowsy') {
    fillColor = NEURON_COLORS.drowsy;
    strokeColor = NEURON_COLORS.selected;
  }
  if (neuron.isFiring) {
    fillColor = NEURON_COLORS.firing;
  }

  const radius = neuron.state === 'active' ? 6 : 4;

  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = isSelected ? 2 : 1;

  ctx.beginPath();
  ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  if (isSelected) {
    const importance = typeof neuron.calculateImportance === 'function' ? neuron.calculateImportance() : 0;
    ctx.strokeStyle = NEURON_COLORS.selected;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius + 5 + importance * 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
};

export const drawConnection = (
  ctx: CanvasRenderingContext2D,
  from: Neuron,
  to: Neuron,
  width: number,
  height: number,
  neurons: Neuron[],
) => {
  const fp = toScreen(from.x, from.y, width, height, neurons);
  const tp = toScreen(to.x, to.y, width, height, neurons);

  ctx.strokeStyle = from.isFiring ? NEURON_COLORS.firing : NEURON_COLORS.connectionIdle;
  ctx.lineWidth = from.isFiring ? 2 : 0.6;
  ctx.globalAlpha = from.isFiring ? 0.5 : 0.25;

  ctx.beginPath();
  ctx.moveTo(fp.x, fp.y);
  ctx.lineTo(tp.x, tp.y);
  ctx.stroke();

  ctx.globalAlpha = 1;
};

export const drawAll = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  neurons: Neuron[],
  selectedNeuron: Neuron | null,
) => {
  ctx.clearRect(0, 0, width, height);

  neurons.forEach((neuron) => {
    if (neuron.state === 'active') {
      neuron.connections.forEach((targetId) => {
        const target = neurons.find((n) => n.id === targetId);
        if (target) drawConnection(ctx, neuron, target, width, height, neurons);
      });
    }
  });

  neurons.forEach((neuron) => {
    const isSelected = selectedNeuron?.id === neuron.id;
    drawNeuron(ctx, neuron, isSelected, width, height, neurons);
  });
};
