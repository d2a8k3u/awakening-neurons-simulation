import type { LucideIcon } from 'lucide-react';

export type StatType = 'active' | 'sleeping' | 'activations' | 'memory';

export type StateStats = {
  active: number;
  sleeping: number;
  totalActivations: number;
  memorySaved: number;
};

export type StatConfig = {
  icon: LucideIcon;
  label: string;
  getValue: (stats: StateStats) => string | number;
  variant: StatType;
};

export type SleepManagerStats = {
  active: number;
  sleeping: number;
  total: number;
  totalActivations: number;
  memorySaved: string | number;
};
