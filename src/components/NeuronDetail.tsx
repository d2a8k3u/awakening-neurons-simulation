import { DetailItem } from '@/components/DetailItem.tsx';
import { useNeuronDetails } from '@/hooks/useNeuronDetails.ts';
import type { Neuron } from '@/types/neuron.ts';
import { Info, Moon, Sun } from 'lucide-react';
import type { FC } from 'react';

interface NeuronDetailProps {
  neuron: Neuron;
  onSleep: () => void;
  onWake: () => void;
}

const NeuronDetail: FC<NeuronDetailProps> = ({ neuron, onSleep, onWake }) => {
  const detailItems = useNeuronDetails(neuron);
  const isActive = neuron.state === 'active';

  return (
    <div className="card neuron-detail">
      <h2>
        <Info size={20} />
        Neuron #{neuron.id}
      </h2>

      <div className="detail-grid">
        {detailItems.map((item) => (
          <DetailItem
            key={item.label}
            {...item}
          />
        ))}
      </div>

      {isActive ? (
        <button
          onClick={onSleep}
          className="button button-gray"
        >
          <Moon size={18} />
          Put to Sleep
        </button>
      ) : (
        <button
          onClick={onWake}
          className="button button-primary"
        >
          <Sun size={18} />
          Wake Up
        </button>
      )}
    </div>
  );
};

export default NeuronDetail;
