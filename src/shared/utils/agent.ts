export const getGreeting = (date: Date = new Date()): string => {
  const hour = date.getHours();

  if (hour < 12) {
    return "Buenos días";
  }

  if (hour < 18) {
    return "Buenas tardes";
  }

  return "Buenas noches";
};
