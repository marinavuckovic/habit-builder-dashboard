import { getToday, getThisMonday } from './dateUtils';

export function countStreak(habit) {
  let count = 1;
  const today = getToday();
  if (!habit || habit.completedDates[habit.completedDates.length - 1] !== today) return 0;
  for (let dateIndex = habit.completedDates.length - 1; dateIndex > 0; dateIndex--) {
    if (
      new Date(habit.completedDates[dateIndex]) - new Date(habit.completedDates[dateIndex - 1]) ===
      24 * 60 * 60 * 1000
    ) {
      count += 1;
    } else {
      break;
    }
  }
  return count;
}
export function countProgress(habit, historyList) {
  const monday = getThisMonday();
  let count = historyList.filter((date) => new Date(date) >= monday).length;
  return { progress: Math.min((count / habit.targetPerWeek) * 100, 100), count };
}
export function getWeeklyConsistency(habitList) {
  const monday = getThisMonday();
  const totalTarget = habitList.reduce((acc, habit) => acc + habit.targetPerWeek, 0);
  const totalCompletion = habitList.reduce((acc, habit) => {
    return (
      acc +
      habit.completedDates.reduce((acc, date) => {
        return new Date(date) >= monday ? acc + 1 : acc;
      }, 0)
    );
  }, 0);
  return Math.ceil(totalTarget ? (totalCompletion / totalTarget) * 100 : 0);
}
