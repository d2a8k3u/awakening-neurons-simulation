import type { JSX } from 'react';

export type ButtonConfig = {
  key: string;
  label: string;
  icon: JSX.Element;
  className: string;
  onClick: () => void;
};
