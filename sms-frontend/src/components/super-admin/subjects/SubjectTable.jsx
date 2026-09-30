import { Eye, Pencil, Trash2, BookOpen } from "lucide-react";

const SubjectTable = ({ subjects = [], loading, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                ID
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Subject Code
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Subject Name
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Description
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-12 text-center text-sm text-gray-500"
                >
                  Loading subjects...
                </td>
              </tr>
            ) : subjects.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-5 py-12 text-center">
                  <BookOpen size={35} className="mx-auto mb-3 text-gray-300" />

                  <p className="text-sm font-medium text-gray-600">
                    No subjects found
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Try changing your search or add a new subject.
                  </p>
                </td>
              </tr>
            ) : (
              subjects.map((subject) => (
                <tr key={subject.id} className="transition hover:bg-gray-50">
                  <td className="px-5 py-4 text-sm font-medium text-gray-700">
                    #{subject.id}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                      {subject.subject_code}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                    {subject.subject_name}
                  </td>

                  <td className="max-w-[250px] px-5 py-4 text-sm text-gray-500">
                    <p className="truncate">{subject.description || "—"}</p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        subject.status === "active"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {subject.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onView?.(subject)}
                        title="View"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => onEdit?.(subject)}
                        title="Edit"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-yellow-50 hover:text-yellow-600"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => onDelete?.(subject)}
                        title="Delete"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
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

export default SubjectTable;
