export function StatsPanel({ habitList, countStreak }) {
  const today = new Date();
  const diff = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const thisMonday = new Date(today - diff * 24 * 60 * 60 * 1000);
  thisMonday.setHours(0, 0, 0, 0);
  const totalCompletions = habitList.reduce((acc, habit) => acc + habit.completedDates.length, 0);
  const totalTarget = habitList.reduce((acc, habit) => acc + habit.targetPerWeek, 0);
  const totalCompletion = habitList.reduce((acc, habit) => {
    return (
      acc +
      habit.completedDates.reduce((acc, date) => {
        return new Date(date) >= thisMonday ? acc + 1 : acc;
      }, 0)
    );
  }, 0);
  const weeklyConsistency = Math.ceil(totalTarget ? (totalCompletion / totalTarget) * 100 : 0);
  const avgStreak =
    habitList.length > 0
      ? habitList.reduce((acc, habit) => acc + countStreak(habit.id), 0) / habitList.length
      : 0;
  const colorClass =
    weeklyConsistency > 60
      ? ['bg-green-500', 'bg-green-300']
      : weeklyConsistency < 30
        ? ['bg-red-500', 'bg-red-300']
        : ['bg-orange-500', 'bg-orange-300'];

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
      <div className="flex relative rounded h-7 w-[100%] bg-gray-200">
        <div
          style={{ width: `${Math.min(weeklyConsistency + 30, 100)}%` }}
          className={`absolute top-0 l-0 rounded-l h-full ${colorClass[1]}`}
        ></div>
        <div
          style={{ width: `${weeklyConsistency}%` }}
          className={`absolute top-0 l-0 rounded-l h-full ${colorClass[0]}`}
        ></div>
      </div>
    </div>
  );
}
