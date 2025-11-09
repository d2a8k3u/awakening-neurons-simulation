export const NEURON_STATE = ['active', 'drowsy', 'sleeping'] as const;

export type NeuronState = (typeof NEURON_STATE)[number];

export type NeuronMemory = {
  shortTermHistory: number[];
  totalActivations: number;
  importanceScore: number;
  learnedPatterns: number[];
  lastActiveTime: number;
};

export type Neuron = {
  id: number;
  state: 'active' | 'sleeping';
  memory: Pick<NeuronMemory, 'totalActivations' | 'learnedPatterns'>;
  connections: unknown[];
  membranePotential: number;
  calculateImportance: () => number;
};
