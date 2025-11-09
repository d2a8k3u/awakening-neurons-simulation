import '@/App.css';
import { Canvas } from '@/components/Canvas';
import { Sidebar } from '@/components/Sidebar';
import NetworkSimulation from '@/engine/NetworkSimulation';
import type { Neuron } from '@/engine/Neuron.ts';
import type { StateStats } from '@/types/stats.ts';
import { Brain } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const NEURON_COUNT = 150;
const INITIAL_STATS: StateStats = {
  active: 0,
  sleeping: 0,
  totalActivations: 0,
  memorySaved: 0,
};

function App() {
  const simulationRef = useRef<NetworkSimulation | null>(null);

  if (!simulationRef.current) {
    simulationRef.current = new NetworkSimulation(NEURON_COUNT);
  }

  const simulation = simulationRef.current;
  const [isRunning, setIsRunning] = useState(false);
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [stats, setStats] = useState<StateStats>(INITIAL_STATS);
  const [selectedNeuron, setSelectedNeuron] = useState<Neuron | null>(null);
  const [autoOptimize, setAutoOptimize] = useState(true);
  const animationFrameRef = useRef<number | null>(null);

  const updateSimulationState = useCallback(() => {
    setNeurons([...simulation.neurons]);
    const rawStats = simulation.getStats();
    setStats({
      active: rawStats.active,
      sleeping: rawStats.sleeping,
      totalActivations: rawStats.totalActivations,
      memorySaved: typeof rawStats.memorySaved === 'string' ? parseFloat(rawStats.memorySaved) : rawStats.memorySaved,
    });
  }, [simulation]);

  useEffect(() => {
    updateSimulationState();
  }, [updateSimulationState]);

  useEffect(() => {
    if (!isRunning) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const animate = () => {
      simulation.step(autoOptimize);
      updateSimulationState();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isRunning, autoOptimize, simulation, updateSimulationState]);

  const handleStart = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    simulation.reset();
    updateSimulationState();
    setSelectedNeuron(null);
  }, [simulation, updateSimulationState]);

  const handleOptimize = useCallback(() => {
    simulation.optimize();
    updateSimulationState();
  }, [simulation, updateSimulationState]);

  const handleNeuronClick = useCallback((neuron: Neuron | null) => {
    setSelectedNeuron(neuron);
  }, []);

  const handleToggleAutoOptimize = useCallback(() => {
    setAutoOptimize((prev) => !prev);
  }, []);

  const handleSleepNeuron = useCallback(() => {
    if (!selectedNeuron) return;

    selectedNeuron.sleep();
    updateSimulationState();
  }, [selectedNeuron, updateSimulationState]);

  const handleWakeNeuron = useCallback(() => {
    if (!selectedNeuron) return;

    selectedNeuron.wakeUp();
    updateSimulationState();
  }, [selectedNeuron, updateSimulationState]);

  return (
    <div className="app">
      <Sidebar
        stats={stats}
        isRunning={isRunning}
        autoOptimize={autoOptimize}
        selectedNeuron={selectedNeuron}
        onStart={handleStart}
        onReset={handleReset}
        onOptimize={handleOptimize}
        onToggleAutoOptimize={handleToggleAutoOptimize}
        onSleepNeuron={handleSleepNeuron}
        onWakeNeuron={handleWakeNeuron}
      />

      <div className="main-content">
        <div className="header">
          <Brain
            className="text-blue-500"
            size={32}
          />

          <h1>Awakening Neurons - Interactive visualization</h1>
        </div>

        <Canvas
          neurons={neurons}
          onNeuronClick={handleNeuronClick}
          selectedNeuron={selectedNeuron}
        />
      </div>
    </div>
  );
}

export default App;
