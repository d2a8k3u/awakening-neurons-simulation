import { Info } from 'lucide-react';
import { memo } from 'react';

const INFO_ITEMS = [
  'Neurons fire when threshold is exceeded',
  'Inactive neurons automatically fall asleep',
  'Sleeping neurons wake up on input signal',
  'Important neurons stay active longer',
  'Memory consolidates during sleep',
] as const;

export const InfoBox = memo(() => {
  return (
    <aside
      className="mt-5 rounded-xl bg-blue-800 p-4 text-xs"
      aria-label="Simulation information"
    >
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <Info
          size={14}
          aria-hidden="true"
        />
        How it works
      </h3>

      <ul
        className="list-inside list-disc space-y-1"
        role="list"
      >
        {INFO_ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
});

InfoBox.displayName = 'InfoBox';
