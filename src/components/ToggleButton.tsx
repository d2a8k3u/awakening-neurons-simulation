import { memo } from 'react';

type ToggleButtonProps = {
  label: string;
  isActive: boolean;
  onToggle: () => void;
  activeLabel?: string;
  inactiveLabel?: string;
};

export const ToggleButton = memo<ToggleButtonProps>(
  ({ label, isActive, onToggle, activeLabel = 'ON', inactiveLabel = 'OFF' }) => {
    return (
      <div className="flex items-center justify-between py-3">
        <span className="text-sm text-gray-300">{label}</span>

        <button
          type="button"
          onClick={onToggle}
          className={`toggle-button ${isActive ? 'active' : 'inactive'}`}
          aria-pressed={isActive}
          aria-label={`${label}: ${isActive ? activeLabel : inactiveLabel}`}
        >
          {isActive ? activeLabel : inactiveLabel}
        </button>
      </div>
    );
  },
);

ToggleButton.displayName = 'ToggleButton';
