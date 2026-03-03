import { useState } from 'react';
import { HabitForm } from './components/HabitForm';
import { HabitsList } from './components/HabitsList';
import { StatsPanel } from './components/StatsPanel';

function App() {
  const [habitList, setHabitList] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  const handleStreakCount = (habitId) => {
    let count = 1;
    const habit = habitList.find((habit) => habit.id === habitId);
    if (!habit || habit.completedDates[habit.completedDates.length - 1] !== today) return 0;
    for (let dateIndex = habit.completedDates.length - 1; dateIndex > 0; dateIndex--) {
      if (
        new Date(habit.completedDates[dateIndex]) -
          new Date(habit.completedDates[dateIndex - 1]) ===
        24 * 60 * 60 * 1000
      ) {
        count += 1;
      } else {
        break;
      }
    }
    return count;
  };

  const handleDateToggle = (habitId) => {
    const date = new Date().toISOString().split('T')[0];

    setHabitList((prev) =>
      prev.map((habit) => {
        return habit.id === habitId
          ? habit.completedDates.some((d) => d === date)
            ? { ...habit, completedDates: habit.completedDates.filter((d) => d !== date) }
            : { ...habit, completedDates: [...habit.completedDates, date] }
          : habit;
      }),
    );
  };

  return (
    <div className="m-10 bg-gray-200 rounded shadow-lg">
      <div className="bg-white rounded">
        <h1 className="border-b px-8 py-3 font-bold text-3xl">Habit Tracker</h1>
        <HabitForm habitList={habitList} setHabitList={setHabitList} />
      </div>
      <div className="flex gap-3">
        <HabitsList
          habitList={habitList}
          onToggle={handleDateToggle}
          countStreak={handleStreakCount}
        />
        <StatsPanel habitList={habitList} countStreak={handleStreakCount} />
      </div>
    </div>
  );
}

export default App;
