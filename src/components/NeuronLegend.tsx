import { NEURON_COLORS } from '@/config/neuron.ts';

const LEGEND_ITEMS: { key: keyof typeof NEURON_COLORS; label: string }[] = [
  { key: 'active', label: 'Active' },
  { key: 'firing', label: 'Firing' },
  { key: 'sleeping', label: 'Sleeping' },
];

export const NeuronLegend = () => {
  return (
    <div className="mb-4 flex items-center space-x-4 rounded-xl bg-blue-950 p-3">
      {LEGEND_ITEMS.map(({ key, label }) => (
        <div
          key={key}
          className="flex items-center space-x-2"
        >
          <span
            className="size-3 flex-shrink-0 rounded-full"
            style={{ background: NEURON_COLORS[key] }}
          />
          <span className="text-sm text-gray-200">{label}</span>
        </div>
      ))}
    </div>
  );
};

NeuronLegend.displayName = 'NeuronLegend';
