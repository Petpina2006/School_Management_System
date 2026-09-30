import { Eye, Pencil, Trash2, UserRound } from "lucide-react";

const EnrollmentTable = ({
  enrollments = [],
  loading,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-indigo-600" />

        <p className="mt-3 text-sm text-gray-500">Loading enrollments...</p>
      </div>
    );
  }

  if (enrollments.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <UserRound className="mx-auto h-10 w-10 text-gray-300" />

        <h3 className="mt-3 text-sm font-semibold text-gray-900">
          No enrollments found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Try changing your filters or add a new enrollment.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                ID
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Student
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Class
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Academic Year
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Enrollment Date
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {enrollments.map((enrollment) => {
              const student = enrollment.student;
              const classData = enrollment.class;

              return (
                <tr key={enrollment.id} className="transition hover:bg-gray-50">
                  <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-900">
                    #{enrollment.id}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {student?.Full_name ||
                          student?.full_name ||
                          "Unknown Student"}
                      </p>

                      <p className="text-xs text-gray-500">
                        {student?.student_code || "No code"}
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {classData?.class_name || "Unknown Class"}
                      </p>

                      <p className="text-xs text-gray-500">
                        {classData?.grade && classData?.section
                          ? `${classData.grade} - ${classData.section}`
                          : ""}
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                    {enrollment.academic_year}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                    {enrollment.enrollment_date}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                        enrollment.status === "active"
                          ? "bg-green-100 text-green-700"
                          : enrollment.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {enrollment.status}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onView(enrollment)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(enrollment)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(enrollment)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
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

export default EnrollmentTable;
