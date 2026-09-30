import { X, Calendar, User, School, Edit, Trash2, Save } from "lucide-react";

const EnrollmentModal = ({
  open,
  mode = "view",
  enrollment,
  formData,
  students,
  classes,
  onClose,
  onChange,
  onSubmit,
  onEdit,
  onDelete,
  saving,
}) => {
  if (!open || !enrollment) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {mode === "view" ? "Enrollment Details" : "Edit Enrollment"}
            </h2>

            <p className="text-sm text-gray-500">
              {mode === "view"
                ? "View enrollment information"
                : "Update enrollment information"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* View Mode */}
        {mode === "view" && (
          <div className="p-6">
            {/* Student Profile */}
            <div className="mb-6 flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <User size={40} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {enrollment.student?.Full_name ||
                    enrollment.student?.full_name ||
                    "N/A"}
                </h3>

                <p className="text-sm text-gray-500">
                  {enrollment.student?.student_code || "N/A"}
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    enrollment.status === "active"
                      ? "bg-green-100 text-green-700"
                      : enrollment.status === "completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {enrollment.status}
                </span>
              </div>
            </div>

            {/* Information */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem
                icon={<User size={18} />}
                label="Student"
                value={
                  enrollment.student?.Full_name || enrollment.student?.full_name
                }
              />

              <InfoItem
                icon={<School size={18} />}
                label="Class"
                value={enrollment.class?.class_name}
              />

              <InfoItem
                icon={<School size={18} />}
                label="Grade / Section"
                value={
                  enrollment.class
                    ? `${enrollment.class.grade || "N/A"} ${
                        enrollment.class.section || ""
                      }`
                    : "N/A"
                }
              />

              <InfoItem
                icon={<Calendar size={18} />}
                label="Academic Year"
                value={enrollment.academic_year}
              />

              <InfoItem
                icon={<Calendar size={18} />}
                label="Enrollment Date"
                value={enrollment.enrollment_date}
              />

              <InfoItem
                icon={<School size={18} />}
                label="Enrollment Status"
                value={enrollment.status}
              />
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3 border-t pt-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => onEdit(enrollment)}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Edit size={17} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(enrollment.id)}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                <Trash2 size={17} />
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Edit Mode */}
        {mode === "edit" && (
          <form onSubmit={onSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Student */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Student
                </label>

                <select
                  name="student_id"
                  value={formData.student_id}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Student</option>

                  {students?.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.Full_name || student.full_name} -{" "}
                      {student.student_code}
                    </option>
                  ))}
                </select>
              </div>

              {/* Class */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Class
                </label>

                <select
                  name="class_id"
                  value={formData.class_id}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Class</option>

                  {classes?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.class_name} - {item.grade} {item.section}
                    </option>
                  ))}
                </select>
              </div>

              {/* Academic Year */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Academic Year
                </label>

                <input
                  type="text"
                  name="academic_year"
                  value={formData.academic_year}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Enrollment Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Enrollment Date
                </label>

                <input
                  type="date"
                  name="enrollment_date"
                  value={formData.enrollment_date}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="active">Active</option>

                  <option value="completed">Completed</option>

                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3 border-t pt-5">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={17} />

                {saving ? "Updating..." : "Update Enrollment"}
              </button>
            </div>
          </form>
        )}

        {/* Delete Mode */}
        {mode === "delete" && (
          <div className="p-6">
            <div className="rounded-xl border border-red-100 bg-red-50 p-5">
              <h3 className="text-lg font-semibold text-red-700">
                Delete Enrollment
              </h3>

              <p className="mt-2 text-sm text-red-600">
                Are you sure you want to delete this enrollment?
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t pt-5">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => onDelete(enrollment.id)}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={17} />

                {saving ? "Deleting..." : "Delete Enrollment"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-gray-500">
        {icon}
        <span className="text-xs font-medium uppercase">{label}</span>
      </div>

      <p className="text-sm font-medium text-gray-800">{value || "N/A"}</p>
    </div>
  );
};

export default EnrollmentModal;
