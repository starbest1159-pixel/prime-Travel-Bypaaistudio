export function getDisplayTravelDates(dates: string[]): string {
  if (!dates || dates.length === 0) return 'สอบถามวันเดินทาง';
  return dates.join(', ');
}

export function formatTourCode(code: string): string {
  return code ? code.toUpperCase() : 'CP-CHINA';
}

export function getTourPriceNumber(priceStr: string): number {
  if (!priceStr) return 0;
  const cleaned = priceStr.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
}
