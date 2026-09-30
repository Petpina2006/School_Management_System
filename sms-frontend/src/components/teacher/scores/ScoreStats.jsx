export default function ScoreStats({ scores = [] }) {
  const total = scores.length;

  const passed = scores.filter(
    (item) => Number(item.score ?? item.mark ?? 0) >= 50,
  ).length;

  const failed = total - passed;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Stat title="Total Scores" value={total} />

      <Stat title="Passed" value={passed} />

      <Stat title="Failed" value={failed} />
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>

      <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
    </div>
  );
}
