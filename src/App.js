import { useEffect, useState } from 'react';
import { HabitForm } from './components/HabitForm';
import { HabitsList } from './components/HabitsList';
import { StatsPanel } from './components/StatsPanel';
import { getToday } from './utils/dateUtils';

function App() {
  const [habitList, setHabitList] = useState(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });
  const today = getToday();

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habitList));
  }, [habitList]);

  const handleDateToggle = (habitId) => {
    setHabitList((prev) =>
      prev.map((habit) => {
        return habit.id === habitId
          ? habit.completedDates.some((d) => d === today)
            ? { ...habit, completedDates: habit.completedDates.filter((d) => d !== today) }
            : { ...habit, completedDates: [...habit.completedDates, today] }
          : habit;
      }),
    );
  };
  const handleDelete = (habitId) => {
    setHabitList((prev) => prev.filter((habit) => habit.id !== habitId));
  };

  return (
    <div className="m-10 bg-gray-200 rounded shadow-lg">
      <div className="bg-white rounded">
        <h1 className="border-b px-8 py-3 font-bold text-3xl">Habit Tracker</h1>
        <HabitForm habitList={habitList} setHabitList={setHabitList} />
      </div>
      <div className="flex gap-3">
        <HabitsList habitList={habitList} onToggle={handleDateToggle} onDelete={handleDelete} />
        <StatsPanel habitList={habitList} />
      </div>
    </div>
  );
}

export default App;
