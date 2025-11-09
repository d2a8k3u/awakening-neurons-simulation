import type { NeuronMemory, NeuronState } from '@/types/neuron';

export class Neuron {
  public readonly id: string;
  public state: NeuronState;
  public x: number;
  public y: number;

  public membranePotential: number;
  public threshold: number;
  public restingPotential: number;
  public isFiring: boolean;

  public memory: NeuronMemory;

  public activityCounter: number;
  public lastActivityTime: number;
  public inactivityThreshold: number;

  public connections: string[];
  public incomingWeights: Map<string, number>;

  constructor(id: string, x: number, y: number) {
    this.id = id;
    this.state = 'active';
    this.x = x;
    this.y = y;

    this.membranePotential = -70;
    this.threshold = -55;
    this.restingPotential = -70;
    this.isFiring = false;

    this.memory = {
      shortTermHistory: [],
      totalActivations: 0,
      importanceScore: 0,
      learnedPatterns: [],
      lastActiveTime: Date.now(),
    };

    this.activityCounter = 0;
    this.lastActivityTime = Date.now();
    this.inactivityThreshold = 3_000;

    this.connections = [];
    this.incomingWeights = new Map();
  }

  update(inputCurrent: number): boolean {
    if ('active' !== this.state) {
      return false;
    }

    this.membranePotential += inputCurrent * 0.1;
    this.membranePotential -= (this.membranePotential - this.restingPotential) * 0.05;

    if (this.membranePotential >= this.threshold) {
      this.fire();
      return true;
    }

    this.isFiring = false;
    return false;
  }

  private fire(): void {
    this.isFiring = true;
    this.membranePotential = this.restingPotential - 5;

    this.activityCounter++;
    this.lastActivityTime = Date.now();
    this.memory.totalActivations++;

    this.memory.shortTermHistory.push(Date.now());
    if (this.memory.shortTermHistory.length > 20) {
      this.memory.shortTermHistory.shift();
    }
  }

  calculateImportance(): number {
    const recentActivity = this.activityCounter / 10;
    const totalExperience = Math.log(this.memory.totalActivations + 1) / 5;
    const connectivity = this.connections.length / 10;
    const patterns = this.memory.learnedPatterns.length / 5;

    this.memory.importanceScore = recentActivity + totalExperience + connectivity + patterns;

    return this.memory.importanceScore;
  }

  shouldSleep(): boolean {
    const timeSinceActivity = Date.now() - this.lastActivityTime;
    const importance = this.calculateImportance();
    const adjustedThreshold = this.inactivityThreshold * (1 + importance * 0.5);

    return timeSinceActivity > adjustedThreshold && 'active' === this.state;
  }

  private consolidateMemory(): void {
    if (this.memory.shortTermHistory.length < 3) return;

    const intervals: number[] = [];
    for (let i = 1; i < this.memory.shortTermHistory.length; i++) {
      const interval = this.memory.shortTermHistory[i] - this.memory.shortTermHistory[i - 1];
      intervals.push(interval);
    }

    if (intervals.length > 0) {
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      if (!this.memory.learnedPatterns.includes(avgInterval)) {
        this.memory.learnedPatterns.push(avgInterval);
      }
    }
  }

  sleep(): void {
    if ('sleeping' === this.state) return;

    this.consolidateMemory();
    this.state = 'sleeping';
    this.activityCounter = 0;
  }

  wakeUp(): void {
    if ('sleeping' !== this.state) return;

    this.state = 'active';
    this.lastActivityTime = Date.now();
    this.memory.lastActiveTime = Date.now();
  }

  addConnection(targetNeuron: Neuron, weight: number = 1.0): void {
    if (!this.connections.includes(targetNeuron.id)) {
      this.connections.push(targetNeuron.id);
      targetNeuron.incomingWeights.set(this.id, weight);
    }
  }
}
