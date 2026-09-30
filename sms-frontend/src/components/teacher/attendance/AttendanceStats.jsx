export default function AttendanceStats({ attendance = [] }) {
  const total = attendance.length;

  const present = attendance.filter((item) => item.status === "present").length;

  const absent = attendance.filter((item) => item.status === "absent").length;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Stat title="Total" value={total} />

      <Stat title="Present" value={present} />

      <Stat title="Absent" value={absent} />
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>

      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
