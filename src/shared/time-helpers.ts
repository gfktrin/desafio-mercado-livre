export function getMinutesBetweenDates(startDate: Date, endDate: Date): number {
  const difference = endDate.getTime() - startDate.getTime();

  return difference / 60000;
}
