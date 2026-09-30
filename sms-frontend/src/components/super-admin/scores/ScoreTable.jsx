import { Eye, Pencil, Trash2 } from "lucide-react";

const ScoreTable = ({ scores = [], onView, onEdit, onDelete }) => {
  const getPercentage = (score, maxScore) => {
    const value = Number(score || 0);
    const max = Number(maxScore || 100);

    if (max <= 0) {
      return 0;
    }

    return ((value / max) * 100).toFixed(1);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                ID
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Student
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Subject
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Class
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Exam
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Score
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Result
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase text-gray-500">
                Date
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {scores.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="px-5 py-10 text-center text-sm text-gray-500"
                >
                  No score records found.
                </td>
              </tr>
            ) : (
              scores.map((item) => {
                const percentage = getPercentage(item.score, item.max_score);

                const passed = Number(percentage) >= 50;

                return (
                  <tr key={item.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4 text-sm text-gray-600">
                      #{item.id}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-800">
                        {item.student?.Full_name ||
                          item.student?.full_name ||
                          `Student #${item.student_id}`}
                      </div>

                      <div className="text-xs text-gray-400">
                        {item.student?.student_code || `ID: ${item.student_id}`}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-800">
                        {item.subject?.subject_name ||
                          `Subject #${item.subject_id}`}
                      </div>

                      <div className="text-xs text-gray-400">
                        {item.subject?.subject_code || ""}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.class?.class_name || `Class #${item.class_id}`}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-600">
                        {item.exam_type}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-semibold text-gray-800">
                        {item.score}
                      </span>

                      <span className="text-sm text-gray-400">
                        {" "}
                        / {item.max_score || 100}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          passed
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {passed ? "Passed" : "Failed"}
                      </span>

                      <div className="mt-1 text-xs text-gray-400">
                        {percentage}%
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.exam_date
                        ? new Date(item.exam_date).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onView(item)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                          title="View"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-50"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(item)}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
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
};

export default ScoreTable;
