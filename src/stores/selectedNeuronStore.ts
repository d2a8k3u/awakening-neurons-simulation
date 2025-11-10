import type { Neuron } from '@/engine/Neuron';
import { create } from 'zustand';

type SelectedNeuronStore = {
  selectedNeuron: Neuron | null;
  setSelectedNeuron: (neuron: Neuron | null) => void;
};

export const useSelectedNeuronStore = create<SelectedNeuronStore>((set) => ({
  selectedNeuron: null,
  setSelectedNeuron: (neuron) => set({ selectedNeuron: neuron }),
}));

export const selectSelectedNeuron = (state: SelectedNeuronStore) => state.selectedNeuron;
export const selectSetSelectedNeuron = (state: SelectedNeuronStore) => state.setSelectedNeuron;
