const oneDay = 24 * 60 * 60 * 1000;

export function HabitCard({ habit, onToggle, countStreak }) {
  const historyList = [...habit.completedDates].sort();
  const today = new Date();
  const diff = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const thisMonday = new Date(today - diff * oneDay);
  thisMonday.setHours(0, 0, 0, 0);
  const isCompletedToday =
    today.toISOString().split('T')[0] === historyList[historyList.length - 1];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const countProgress = () => {
    let count = 0;
    for (let dIndex = historyList.length - 1; dIndex >= 0; dIndex--) {
      if (new Date(historyList[dIndex]) >= thisMonday) {
        count += 1;
      } else {
        break;
      }
    }
    return [(count / habit.targetPerWeek) * 100, count];
  };

  const progress = countProgress();

  const colorClass =
    progress[0] > 60
      ? ['bg-green-500', 'bg-green-300']
      : progress[0] < 30
        ? ['bg-red-500', 'bg-red-300']
        : ['bg-orange-500', 'bg-orange-300'];

  return (
    <div className="flex flex-col w-full bg-white rounded shadow-lg p-5">
      <div className="flex justify-between border-b border-gray-400 px-5 pb-3 ">
        <div className="flex gap-3">
          <div className={`bg-black rounded-full mt-2 w-3 h-3 ${colorClass[0]}`}></div>
          <h1>{habit.name}</h1>
        </div>
        <h1>🔥 {countStreak(habit.id)} days</h1>
      </div>
      <div className="border-b border-gray-400 px-5 pb-3 mt-3">
        <div className="flex relative rounded h-7 w-[70%] bg-gray-200">
          <div
            style={{ width: `${Math.min(progress[0] + 30, 100)}%` }}
            className={`absolute top-0 l-0 rounded-l h-full ${colorClass[1]}`}
          ></div>
          <div
            style={{ width: `${progress[0]}%` }}
            className={`absolute top-0 l-0 rounded-l h-full ${colorClass[0]}`}
          ></div>
          <span className="absolute top-0 l-0 px-5 py-1 text-sm">
            {progress[1]} / {habit.targetPerWeek} days
          </span>
        </div>
      </div>
      <div className="border-b border-gray-400 px-5 pb-3 flex flex-start">
        <button
          className={`rounded shadow-lg mt-3 px-5 py-1 text-white ${
            isCompletedToday ? 'bg-red-400' : 'bg-blue-400'
          }`}
          onClick={() => onToggle(habit.id)}
        >
          {isCompletedToday ? 'Unmark Today' : 'Mark Today'}
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
