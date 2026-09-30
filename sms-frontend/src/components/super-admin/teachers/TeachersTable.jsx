import { Eye, Pencil, Trash2 } from "lucide-react";

const TeachersTable = ({
  teachers = [],
  loading,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-gray-500">Loading teachers...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-5 py-4 font-semibold text-gray-600">Code</th>

              <th className="px-5 py-4 font-semibold text-gray-600">
                Teacher Name
              </th>

              <th className="px-5 py-4 font-semibold text-gray-600">Gender</th>

              <th className="px-5 py-4 font-semibold text-gray-600">Phone</th>

              <th className="px-5 py-4 font-semibold text-gray-600">
                Specialization
              </th>

              <th className="px-5 py-4 font-semibold text-gray-600">Status</th>

              <th className="px-5 py-4 text-right font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {teachers.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-10 text-center text-gray-500"
                >
                  No teachers found.
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr key={teacher.id} className="transition hover:bg-gray-50">
                  {/* CODE */}
                  <td className="px-5 py-4">
                    <span className="font-medium text-gray-800">
                      {teacher.teacher_code}
                    </span>
                  </td>

                  {/* NAME */}
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800">
                      {teacher.first_name} {teacher.last_name}
                    </p>
                  </td>

                  {/* GENDER */}
                  <td className="px-5 py-4 capitalize text-gray-600">
                    {teacher.gender || "-"}
                  </td>

                  {/* PHONE */}
                  <td className="px-5 py-4 text-gray-600">
                    {teacher.phone || "-"}
                  </td>

                  {/* SPECIALIZATION */}
                  <td className="px-5 py-4 text-gray-600">
                    {teacher.specialization || "-"}
                  </td>

                  {/* STATUS */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        teacher.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {teacher.status || "inactive"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onView(teacher)}
                        title="View"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(teacher)}
                        title="Edit"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-amber-50 hover:text-amber-600"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(teacher.id)}
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

export default TeachersTable;
