export default function ScoreHeader({ onAdd }) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Student Scores</h1>

        <p className="text-sm text-slate-500">Manage student scores.</p>
      </div>

      <button
        onClick={onAdd}
        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        + Add Score
      </button>
    </div>
  );
}
