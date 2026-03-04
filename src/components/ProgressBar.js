export function ProgressBar({ progress }) {
  const colorClass =
    progress > 60
      ? ['bg-green-500', 'bg-green-300']
      : progress < 30
        ? ['bg-red-500', 'bg-red-300']
        : ['bg-orange-500', 'bg-orange-300'];
  return (
    <>
      <div
        style={{ width: `${Math.min(progress + 30, 100)}%` }}
        className={`absolute top-0 left-0 rounded-l h-full ${colorClass[1]}`}
      ></div>
      <div
        style={{ width: `${progress}%` }}
        className={`absolute top-0 left-0 rounded-l h-full ${colorClass[0]}`}
      ></div>
    </>
  );
}
