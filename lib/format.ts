// Consistent number formatting to avoid hydration errors
export function formatNumber(num: number, decimals: number = 0): string {
  const fixed = num.toFixed(decimals)
  const parts = fixed.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export function formatCurrency(num: number, decimals: number = 0): string {
  return '$' + formatNumber(num, decimals)
}

export function formatHashrate(num: number): string {
  return formatNumber(num, 1) + ' EH/s'
}

export function formatBTC(num: number): string {
  return formatNumber(num, 4) + ' BTC'
}
