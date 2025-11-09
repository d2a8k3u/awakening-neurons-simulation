import { ProgressBar } from '@/components/ProgressBar.tsx';
import { StatItem } from '@/components/StatItem.tsx';
import type { StatConfig, StateStats } from '@/types/stats.ts';
import { calculateActivePercent } from '@/utils/helpers.ts';
import { Activity, HardDrive, Moon, Sun, Zap } from 'lucide-react';
import { memo, useMemo } from 'react';

type StatsProps = {
  stats: StateStats;
};

const STAT_CONFIGS: readonly StatConfig[] = [
  {
    icon: Sun,
    label: 'Active neurons',
    getValue: (stats) => stats.active,
    variant: 'active',
  },
  {
    icon: Moon,
    label: 'Sleeping neurons',
    getValue: (stats) => stats.sleeping,
    variant: 'sleeping',
  },
  {
    icon: Zap,
    label: 'Activation summary',
    getValue: (stats) => stats.totalActivations,
    variant: 'activations',
  },
  {
    icon: HardDrive,
    label: 'Saved memory',
    getValue: (stats) => `${stats.memorySaved}%`,
    variant: 'memory',
  },
] as const;

export const Stats = memo(({ stats }: StatsProps) => {
  const activePercent = useMemo(
    () => calculateActivePercent(stats.active, stats.sleeping),
    [stats.active, stats.sleeping],
  );

  return (
    <div className="card">
      <h2>
        <Activity size={20} />
        Statistics
      </h2>

      {STAT_CONFIGS.map(({ icon, label, getValue, variant }) => (
        <StatItem
          key={label}
          icon={icon}
          label={label}
          value={getValue(stats)}
          variant={variant}
        />
      ))}

      <ProgressBar percent={activePercent} />

      <div className="mt-2 text-center text-xs text-slate-400">{activePercent.toFixed(1)}% active</div>
    </div>
  );
});

Stats.displayName = 'Stats';
