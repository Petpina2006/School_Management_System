export default function ScoreTable({ scores = [] }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Score</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {scores.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-10 text-center text-slate-500"
                >
                  No scores found.
                </td>
              </tr>
            ) : (
              scores.map((item) => {
                const score = Number(
                  item.score ?? item.mark ?? item.total_score ?? 0,
                );

                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 font-medium">
                      {item.student?.Full_name ||
                        item.student?.full_name ||
                        item.student_name ||
                        "-"}
                    </td>

                    <td className="px-6 py-4">
                      {item.subject?.subject_name || item.subject_name || "-"}
                    </td>

                    <td className="px-6 py-4 font-bold">{score}</td>

                    <td className="px-6 py-4">
                      <span
                        className={
                          score >= 50
                            ? "rounded-full bg-green-100 px-3 py-1 text-xs text-green-700"
                            : "rounded-full bg-red-100 px-3 py-1 text-xs text-red-700"
                        }
                      >
                        {score >= 50 ? "Passed" : "Failed"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
