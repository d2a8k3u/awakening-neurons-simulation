import { ToggleButton } from '@/components/ToggleButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils.ts';
import type { ButtonConfig } from '@/types/controls.ts';
import { HardDrive, Pause, Play, RotateCcw, Settings } from 'lucide-react';
import type { FC } from 'react';

type ControlsProps = {
  isRunning: boolean;
  autoOptimize: boolean;
  onStart: () => void;
  onReset: () => void;
  onOptimize: () => void;
  onToggleAutoOptimize: () => void;
};

const getStartButtonConfig = (isRunning: boolean, onStart: () => void): ButtonConfig => ({
  key: 'start',
  label: isRunning ? 'Pause' : 'Start',
  icon: isRunning ? <Pause size={18} /> : <Play size={18} />,
  className: `button ${isRunning ? 'button-danger' : 'button-primary'}`,
  onClick: onStart,
});

const staticButtons = (onReset: () => void, onOptimize: () => void): ButtonConfig[] => [
  {
    key: 'reset',
    label: 'Reset',
    icon: <RotateCcw size={18} />,
    className: 'button button-secondary',
    onClick: onReset,
  },
  {
    key: 'optimize',
    label: 'Optimize memory',
    icon: <HardDrive size={18} />,
    className: 'button button-gray',
    onClick: onOptimize,
  },
];

export const Controls: FC<ControlsProps> = ({
  isRunning,
  autoOptimize,
  onStart,
  onReset,
  onOptimize,
  onToggleAutoOptimize,
}) => {
  const buttons = [getStartButtonConfig(isRunning, onStart), ...staticButtons(onReset, onOptimize)];

  return (
    <section
      className="card"
      aria-labelledby="controls-heading"
    >
      <h2 id="controls-heading">
        <Settings
          size={20}
          aria-hidden="true"
        />
        Controls
      </h2>

      <div className="mt-2 flex flex-col gap-1">
        {buttons.map((btn) => (
          <Button
            key={btn.key}
            className={cn('button', btn.className)}
            size="lg"
            onClick={btn.onClick}
          >
            {btn.icon}
            {btn.label}
          </Button>
        ))}

        <ToggleButton
          label="Auto optimize"
          isActive={autoOptimize}
          onToggle={onToggleAutoOptimize}
        />
      </div>
    </section>
  );
};

Controls.displayName = 'Controls';
