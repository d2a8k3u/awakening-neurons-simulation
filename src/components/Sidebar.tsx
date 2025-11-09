import { InfoBox } from '@/components/InfoBox.tsx';
import type { Neuron } from '@/types/neuron.ts';
import type { StateStats } from '@/types/stats.ts';
import type { FC } from 'react';
import { Controls } from './Controls';
import { NeuronDetail } from './NeuronDetail';
import { Stats } from './Stats';

type SidebarProps = {
  stats: StateStats;
  isRunning: boolean;
  autoOptimize: boolean;
  selectedNeuron: Neuron | null;
};

type SidebarCallbacks = {
  onStart: () => void;
  onReset: () => void;
  onOptimize: () => void;
  onToggleAutoOptimize: () => void;
  onSleepNeuron: () => void;
  onWakeNeuron: () => void;
};

export const Sidebar: FC<SidebarProps & SidebarCallbacks> = ({
  stats,
  isRunning,
  autoOptimize,
  selectedNeuron,
  onStart,
  onReset,
  onOptimize,
  onToggleAutoOptimize,
  onSleepNeuron,
  onWakeNeuron,
}) => {
  return (
    <aside
      className="sidebar"
      role="complementary"
      aria-label="Simulation controls and information"
    >
      <Stats stats={stats} />

      <Controls
        isRunning={isRunning}
        autoOptimize={autoOptimize}
        onStart={onStart}
        onReset={onReset}
        onOptimize={onOptimize}
        onToggleAutoOptimize={onToggleAutoOptimize}
      />

      {selectedNeuron && (
        <NeuronDetail
          neuron={selectedNeuron}
          onSleep={onSleepNeuron}
          onWake={onWakeNeuron}
        />
      )}

      <InfoBox />
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';
