const oneDay = 24 * 60 * 60 * 1000;

export function getToday() {
  return new Date().toISOString().split('T')[0];
}
export function getThisMonday() {
  const today = new Date();
  const diff = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const thisMonday = new Date(today - diff * oneDay);
  thisMonday.setHours(0, 0, 0, 0);
  return thisMonday;
}
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
