import type React from 'react';
import { memo } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'gray';
type ControlButtonProps = {
  variant: ButtonVariant;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
};

export const ControlButton = memo<ControlButtonProps>(({ variant, icon, label, onClick, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`button button-${variant} ${className}`.trim()}
    aria-label={label}
  >
    {icon}
    {label}
  </button>
));

ControlButton.displayName = 'ControlButton';

export type { ButtonVariant, ControlButtonProps };
