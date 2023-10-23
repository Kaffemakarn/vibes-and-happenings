export const formatDate = (date: Date) => {
  const month = new Date(date).toLocaleString('default', { month: 'short' });
  const day = new Date(date).toLocaleString('default', { day: '2-digit' });

  return {
    date: date,
    dateString: new Date(date).toLocaleTimeString('default', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    month: `${month.slice(0, 3)}.`.toUpperCaseLetters(),
    day: day,
  };
};
