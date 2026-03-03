import { useState } from 'react';

export function HabitForm({ habitList, setHabitList }) {
  const [name, setName] = useState('');
  const [perWeek, setPerWeek] = useState(5);

  const handleAddHabit = (e) => {
    e.preventDefault();
    const habit = {
      id: crypto.randomUUID(),
      name: name,
      targetPerWeek: Number(perWeek),
      completedDates: [],
    };
    setHabitList([...habitList, habit]);
    setName('');
    setPerWeek(5);
  };

  return (
    <div className="rounded w-full">
      <form
        className="bg-gray-300 inline-flex items-center gap-3 px-3 py-2 m-5 rounded"
        onSubmit={handleAddHabit}
      >
        <input
          className="bg-white px-5 py-1 rounded"
          type="text"
          required
          placeholder="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex items-strach">
          <label
            htmlFor="num-input"
            className="h-full px-5 py-1 rounded-l text-gray-400 border-r bg-white mr-0 border-r border-gray-400"
          >
            Target per week
          </label>
          <input
            id="num-input"
            className="px-5 rounded-r bg-white w-[80px] ml-0"
            type="number"
            min={1}
            max={7}
            value={perWeek}
            onChange={(e) => setPerWeek(e.target.value)}
          />
        </div>
        <button type="submit" className="rounded shadow-lg bg-blue-400 px-5 py-1 text-white">
          Add Habbit
        </button>
      </form>
    </div>
  );
}
