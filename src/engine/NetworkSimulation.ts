import { Neuron } from './Neuron';
import { SleepManager } from './SleepManager';

export default class NetworkSimulation {
  public readonly neurons: Neuron[];
  private sleepManager: SleepManager;

  constructor(numNeurons: number = 150) {
    this.neurons = [];
    this.sleepManager = new SleepManager(80);
    this.initialize(numNeurons);
  }

  private initialize(numNeurons: number): void {
    for (let i = 0; i < numNeurons; i++) {
      const x = Math.random() * 1000;
      const y = Math.random() * 600;
      const neuron = new Neuron(i.toString(), x, y);

      this.neurons.push(neuron);
      this.sleepManager.registerNeuron(neuron);
    }

    this.neurons.forEach((neuron) => {
      const numConnections = Math.floor(Math.random() * 7) + 3;
      for (let i = 0; i < numConnections; i++) {
        const target = this.neurons[Math.floor(Math.random() * this.neurons.length)];
        if (target.id !== neuron.id) {
          const weight = Math.random() * 2;
          neuron.addConnection(target, weight);
        }
      }
    });
  }

  step(autoOptimize: boolean = true): void {
    const numStimulate = Math.floor(Math.random() * 15) + 5;

    for (let i = 0; i < numStimulate; i++) {
      const neuron = this.neurons[Math.floor(Math.random() * this.neurons.length)];

      if ('active' === neuron.state) {
        const fired = neuron.update(Math.random() * 20 + 10);

        if (fired) {
          neuron.connections.forEach((targetId) => {
            const target = this.neurons.find((n) => n.id === targetId);
            if (target) {
              if ('sleeping' === target.state) {
                target.wakeUp();
              }
              const weight = target.incomingWeights.get(neuron.id) ?? 1;
              target.update(weight * 5);
            }
          });
        }
      }
    }

    if (autoOptimize && Math.random() < 0.1) {
      this.sleepManager.optimizeMemory();
    }

    this.neurons.forEach((neuron) => {
      if (neuron.shouldSleep()) {
        neuron.sleep();
      }
    });
  }

  optimize(): void {
    this.sleepManager.optimizeMemory();
  }

  reset(): void {
    const now = Date.now();
    this.neurons.forEach((neuron) => {
      neuron.state = 'active';
      neuron.memory.totalActivations = 0;
      neuron.memory.shortTermHistory = [];
      neuron.memory.learnedPatterns = [];
      neuron.memory.lastActiveTime = now;
      neuron.activityCounter = 0;
      neuron.lastActivityTime = now;
      neuron.membranePotential = -70;
      neuron.isFiring = false;
    });
  }

  getStats() {
    return this.sleepManager.getStats();
  }
}
