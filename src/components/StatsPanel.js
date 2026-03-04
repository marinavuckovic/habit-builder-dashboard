import { ProgressBar } from './ProgressBar';
import { countStreak, getWeeklyConsistency } from '../utils/habitUtils';

export function StatsPanel({ habitList }) {
  const totalCompletions = habitList.reduce((acc, habit) => acc + habit.completedDates.length, 0);
  const weeklyConsistency = getWeeklyConsistency(habitList);
  const avgStreak =
    habitList.length > 0
      ? habitList.reduce((acc, habit) => acc + countStreak(habit), 0) / habitList.length
      : 0;

  return (
    <div className="w-[30%] h-[30%] m-5 px-5 py-3 bg-white rounded-t shadow-lg">
      <h1 className="font-bold text-lg border-b border-gray-300">Stats Overview</h1>
      <div className="flex justify-between my-3 border-b border-gray-200">
        <h1>Total habits:</h1>
        <h1>{habitList.length}</h1>
      </div>
      <div className="flex justify-between my-3 border-b border-gray-200">
        <h1>Avg Streak:</h1>
        <h1>{avgStreak.toFixed(1)} days</h1>
      </div>
      <div className="flex justify-between my-3 border-b border-gray-200">
        <h1>Total completions:</h1>
        <h1>{totalCompletions}</h1>
      </div>
      <div className="flex justify-between my-3">
        <h1>Weekly Consistency:</h1>
        <h1 className="text-lg font-bold">{weeklyConsistency}%</h1>
      </div>
      <div className="flex relative rounded h-7 w-full bg-gray-200">
        <ProgressBar progress={weeklyConsistency} />
      </div>
    </div>
  );
}
