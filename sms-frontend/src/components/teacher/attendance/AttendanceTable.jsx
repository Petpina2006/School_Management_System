export default function AttendanceTable({ attendance = [] }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4">Student</th>

              <th className="px-6 py-4">Date</th>

              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {attendance.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-10 text-center text-slate-500"
                >
                  No attendance records.
                </td>
              </tr>
            ) : (
              attendance.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 font-medium">
                    {item.student?.Full_name ||
                      item.student?.full_name ||
                      item.student_name ||
                      "-"}
                  </td>

                  <td className="px-6 py-4">{item.date || "-"}</td>

                  <td className="px-6 py-4">
                    <span
                      className={
                        item.status === "present"
                          ? "rounded-full bg-green-100 px-3 py-1 text-xs text-green-700"
                          : "rounded-full bg-red-100 px-3 py-1 text-xs text-red-700"
                      }
                    >
                      {item.status || "-"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
