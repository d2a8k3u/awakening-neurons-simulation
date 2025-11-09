import { memo } from 'react';

export const ProgressBar = memo(({ percent }: { percent: number }) => (
  <div className="mt-4 h-2.5 overflow-hidden rounded bg-slate-700">
    <div
      className="h-full rounded transition-all duration-300 ease-in-out"
      style={{ width: `${percent}%`, background: 'linear-gradient(90deg, #10b981, #3b82f6)' }}
    />
  </div>
));

ProgressBar.displayName = 'ProgressBar';
