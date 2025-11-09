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
  id: string;
  state: NeuronState;
  x: number;
  y: number;
  membranePotential: number;
  threshold: number;
  restingPotential: number;
  isFiring: boolean;
  memory: Pick<NeuronMemory, 'totalActivations' | 'learnedPatterns'>;
  activityCounter: number;
  lastActivityTime: number;
  inactivityThreshold: number;
  connections: unknown[];
  incomingWeights: Map<string, number>;
  calculateImportance: () => number;
};
