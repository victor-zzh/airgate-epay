export function formatRechargeCredit(amount: number, options: { compact?: boolean } = {}): string {
  const value = amount.toFixed(2);
  return options.compact ? `$${amount}` : `$${value}`;
}
