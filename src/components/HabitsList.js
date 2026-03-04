import { HabitCard } from './HabitCard';

export function HabitsList({ habitList, onToggle, onDelete }) {
  return (
    <div className="bg-gray-300 rounded-l p-5 flex flex-col gap-3 w-[70%]">
      <h1 className="font-bold text-lg">My Habits</h1>
      {habitList.length !== 0 &&
        habitList.map((habit) => (
          <HabitCard key={habit.id} habit={habit} onToggle={onToggle} onDelete={onDelete} />
        ))}
    </div>
  );
}
