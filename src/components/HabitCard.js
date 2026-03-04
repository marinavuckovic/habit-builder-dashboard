import { getToday, formatDate } from '../utils/dateUtils';
import { ProgressBar } from './ProgressBar';
import { countStreak, countProgress } from '../utils/habitUtils';

export function HabitCard({ habit, onToggle, onDelete }) {
  const historyList = [...habit.completedDates].sort((a, b) => new Date(a) - new Date(b));
  const today = getToday();

  const isCompletedToday = today === historyList[historyList.length - 1];

  const { progress, count } = countProgress(habit, historyList);

  return (
    <div className="flex flex-col w-full bg-white rounded shadow-lg p-5">
      <div className="flex justify-between border-b border-gray-400 px-5 pb-3 ">
        <div className="flex gap-3">
          <div className={`bg-black rounded-full mt-2 w-3 h-3`}></div>
          <h1>{habit.name}</h1>
        </div>
        <h1>🔥 {countStreak(habit)} days</h1>
      </div>
      <div className="border-b border-gray-400 px-5 pb-3 mt-3">
        <div className="flex relative rounded h-7 w-4/5 bg-gray-200">
          <ProgressBar progress={progress} />
          <span className="absolute top-0 left-0 px-5 py-1 text-sm">
            {count} / {habit.targetPerWeek} days
          </span>
        </div>
      </div>
      <div className="border-b border-gray-400 px-5 pb-3 flex justify-between">
        <button
          className={`rounded shadow-lg mt-3 px-5 py-1 text-white ${
            isCompletedToday ? 'bg-red-400' : 'bg-blue-400'
          }`}
          onClick={() => onToggle(habit.id)}
        >
          {isCompletedToday ? 'Unmark Today' : 'Mark Today'}
        </button>
        <button
          className="rounded shadow-lg mt-3 px-5 py-1 text-white bg-red-500"
          onClick={() => onDelete(habit.id)}
        >
          Delete Habit
        </button>
      </div>
      <fieldset className="border rounded p-4">
        <legend className="px-2 text-sm font-semibold">~~History</legend>
        <div>
          {historyList.map((date) => {
            return <span key={date}>🔥{formatDate(date)}</span>;
          })}{' '}
        </div>
      </fieldset>
    </div>
  );
}
