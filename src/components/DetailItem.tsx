import type { FC } from 'react';

type DetailItemProps = {
  label: string;
  value: string | number;
  color: string;
};

export const DetailItem: FC<DetailItemProps> = ({ label, value, color }) => (
  <div className="detail-item">
    <div className="detail-item-label">{label}</div>
    <div
      className="detail-item-value"
      style={{ color }}
    >
      {value}
    </div>
  </div>
);

DetailItem.displayName = 'DetailItem';
