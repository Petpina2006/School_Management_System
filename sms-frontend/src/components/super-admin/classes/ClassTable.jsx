import { Eye, Pencil, Trash2 } from "lucide-react";

const ClassTable = ({
  classes = [],
  loading = false,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-gray-500">Loading classes...</p>
      </div>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-gray-500">No classes found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Class
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Grade
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Section
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Room
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Academic Year
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Teacher
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {classes.map((item) => {
              // Extract teacher data safely
              const teacher = item?.teacher;
              const teacherName = teacher
                ? `${teacher.first_name || ""} ${teacher.last_name || ""}`.trim()
                : null;

              return (
                <tr key={item.id} className="transition hover:bg-gray-50">
                  {/* CLASS */}
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800">
                      {item.class_name || "—"}
                    </p>
                  </td>

                  {/* GRADE */}
                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                      {item.grade || "N/A"}
                    </span>
                  </td>

                  {/* SECTION */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.section || "-"}
                  </td>

                  {/* ROOM */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.room || "-"}
                  </td>

                  {/* YEAR */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.academic_year || "-"}
                  </td>

                  {/* TEACHER */}
                  <td className="px-5 py-4">
                    {teacherName ? (
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {teacherName}
                        </p>
                        {teacher.teacher_code && (
                          <p className="text-xs text-gray-400">
                            {teacher.teacher_code}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">No Teacher</span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onView(item)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                        title="View"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-amber-50 hover:text-amber-600"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassTable;