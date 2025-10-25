import { subDays, format } from 'date-fns';

const today = new Date();
export const xpData = [
  { date: format(subDays(today, 6), 'eeee'), xp: 120 },
  { date: format(subDays(today, 5), 'eeee'), xp: 150 },
  { date: format(subDays(today, 4), 'eeee'), xp: 100 },
  { date: format(subDays(today, 3), 'eeee'), xp: 280 },
  { date: format(subDays(today, 2), 'eeee'), xp: 200 },
  { date: format(subDays(today, 1), 'eeee'), xp: 300 },
  { date: format(today, 'eeee'), xp: 450 },
];
