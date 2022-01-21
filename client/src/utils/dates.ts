export const formatDate: (date: Date) => string = (date) =>
  date
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')
    .join('.');
