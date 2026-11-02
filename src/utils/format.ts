const euro = new Intl.NumberFormat('pt-PT', { 
  style: 'currency',
  currency: 'EUR'
});
const date = new Intl.DateTimeFormat('pt-PT', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Europe/Lisbon'
});

export const formatPrice = (priceCents: number) => euro.format(priceCents / 100);
export const formatDateTime = (startsAt: string) => date.format(new Date(startsAt));

export function formatDuration(durationMin: number) {
  const hours = Math.floor(durationMin / 60);
  const minutes = durationMin % 60;
  if (!hours) return `${minutes}m`;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}

