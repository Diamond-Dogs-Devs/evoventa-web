export const getYearDateRange = (year: number = new Date().getFullYear()) => {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;
  return { startDate, endDate };
};
