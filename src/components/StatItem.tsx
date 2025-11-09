import type { StatType } from '@/types/stats.ts';
import type { LucideIcon } from 'lucide-react';
import styled from 'styled-components';

type StatItemProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  variant?: StatType;
};

const variantColors: Record<StatType, string> = {
  active: '#10b981',
  sleeping: '#6b7280',
  activations: '#3b82f6',
  memory: '#a855f7',
};

const StatValue = styled.span<{ variant?: keyof typeof variantColors }>`
  font-weight: 700;
  font-size: 1rem;
  color: ${({ variant }) => (variant ? variantColors[variant] : 'inherit')};
`;

export const StatItem = ({ icon: Icon, label, value, variant }: StatItemProps) => (
  <div className="flex items-center justify-between border-b border-slate-600 py-2.5 last:border-b-0">
    <span className="text-sm text-gray-400">
      <Icon
        size={16}
        className="mr-1.5 inline"
      />
      {label}:
    </span>
    <StatValue variant={variant}>{value}</StatValue>
  </div>
);

StatItem.displayName = 'StatItem';
