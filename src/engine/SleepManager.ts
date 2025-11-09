import type { SleepManagerStats } from '@/types/sleepManager.ts';
import type { Neuron } from './Neuron';

export class SleepManager {
  private neurons: Map<string, Neuron>;
  private readonly maxActiveNeurons: number;

  constructor(maxActiveNeurons: number = 100) {
    this.neurons = new Map();
    this.maxActiveNeurons = maxActiveNeurons;
  }

  registerNeuron(neuron: Neuron): void {
    this.neurons.set(neuron.id, neuron);
  }

  getActiveNeurons(): Neuron[] {
    return Array.from(this.neurons.values()).filter((n) => 'active' === n.state);
  }

  getSleepingNeurons(): Neuron[] {
    return Array.from(this.neurons.values()).filter((n) => 'sleeping' === n.state);
  }

  optimizeMemory(): void {
    const active = this.getActiveNeurons();

    if (active.length > this.maxActiveNeurons) {
      const sorted = active
        .map((n) => ({ neuron: n, importance: n.calculateImportance() }))
        .sort((a, b) => a.importance - b.importance);

      const toSleep = Math.floor(active.length * 0.2);
      for (let i = 0; i < toSleep; i++) {
        sorted[i].neuron.sleep();
      }
    }

    this.getSleepingNeurons().forEach((neuron) => {
      if (this.hasIncomingSignal(neuron)) {
        neuron.wakeUp();
      }
    });
  }

  private hasIncomingSignal(neuron: Neuron): boolean {
    for (const [sourceId] of neuron.incomingWeights) {
      const source = this.neurons.get(sourceId);
      if (source?.isFiring) {
        return true;
      }
    }
    return false;
  }

  getStats(): SleepManagerStats {
    const active = this.getActiveNeurons().length;
    const sleeping = this.getSleepingNeurons().length;
    const total = this.neurons.size;
    const totalActivations = Array.from(this.neurons.values()).reduce((sum, n) => sum + n.memory.totalActivations, 0);

    return {
      active,
      sleeping,
      total,
      totalActivations,
      memorySaved: total > 0 ? ((sleeping / total) * 100).toFixed(1) : 0,
    };
  }
}
