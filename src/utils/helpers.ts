export function calculateActivePercent(active: number, sleeping: number): number {
  const total = active + sleeping;

  return total > 0 ? (active / total) * 100 : 0;
}
