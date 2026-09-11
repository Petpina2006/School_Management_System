import { Eye, Pencil, Trash2 } from "lucide-react";

const StudentsTable = ({
  students = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-gray-500">Loading students...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                ID
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                Student Code
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                Full Name
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                Gender
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                Date of Birth
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                Phone
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="transition hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.id}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {student.student_code}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {student.Full_name}
                  </td>

                  <td className="px-6 py-4 text-sm capitalize text-gray-600">
                    {student.gender}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.date_of_birth || "-"}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.phone || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        student.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {/* View */}
                      <button
                        type="button"
                        onClick={() => onView?.(student)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                        title="View"
                      >
                        <Eye size={17} />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit?.(student)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-amber-50 hover:text-amber-600"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete?.(student.id)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
