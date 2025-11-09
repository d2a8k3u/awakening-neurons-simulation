import type { Neuron } from '@/types/neuron.ts';

type DetailItemData = {
  label: string;
  value: string | number;
  color: string;
};

export const useNeuronDetails = (neuron: Neuron): DetailItemData[] => {
  const isActive = neuron.state === 'active';

  return [
    {
      label: 'State',
      value: isActive ? 'Active' : 'Sleeping',
      color: isActive ? '#10b981' : '#6b7280',
    },
    {
      label: 'Activations',
      value: neuron.memory.totalActivations,
      color: '#3b82f6',
    },
    {
      label: 'Importance',
      value: neuron.calculateImportance().toFixed(2),
      color: '#a855f7',
    },
    {
      label: 'Connections',
      value: neuron.connections.length,
      color: '#f59e0b',
    },
    {
      label: 'Patterns',
      value: neuron.memory.learnedPatterns.length,
      color: '#ec4899',
    },
    {
      label: 'Potential',
      value: `${neuron.membranePotential.toFixed(1)} mV`,
      color: '#06b6d4',
    },
  ];
};
