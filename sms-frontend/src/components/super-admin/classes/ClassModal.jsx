import React from "react";
import {
  X,
  School,
  GraduationCap,
  DoorOpen,
  Calendar,
  User,
  Edit,
  Trash2,
  Save,
  Users,
} from "lucide-react";

const ClassModal = ({
  open,
  classData,
  mode = "view",
  formData,
  teachers = [],
  saving = false,
  onClose,
  onChange,
  onSubmit,
  onEdit,
  onDelete,
}) => {
  if (!open || !classData) return null;

  // Format teacher display name safely
  const teacherName = classData.teacher
    ? `${classData.teacher.first_name || ""} ${
        classData.teacher.last_name || ""
      }`.trim()
    : "No Teacher";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {mode === "view" && "Class Details"}
              {mode === "edit" && "Edit Class"}
              {mode === "delete" && "Delete Class"}
            </h2>

            <p className="text-sm text-gray-500">
              {mode === "view" && "View class information"}
              {mode === "edit" && "Update class information"}
              {mode === "delete" && "Remove this class from the system"}
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

        {/* VIEW MODE */}
        {mode === "view" && (
          <div className="p-6">
            {/* Class Profile Header */}
            <div className="mb-6 flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <School size={40} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {classData.class_name}
                </h3>

                <p className="text-sm text-gray-500">
                  Grade {classData.grade}
                  {classData.section ? ` - Section ${classData.section}` : ""}
                </p>

                <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {classData.academic_year}
                </span>
              </div>
            </div>

            {/* Class Information Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem
                icon={<School size={18} />}
                label="Class Name"
                value={classData.class_name}
              />

              <InfoItem
                icon={<GraduationCap size={18} />}
                label="Grade"
                value={classData.grade}
              />

              <InfoItem
                icon={<Users size={18} />}
                label="Section"
                value={classData.section || "N/A"}
              />

              <InfoItem
                icon={<DoorOpen size={18} />}
                label="Room"
                value={classData.room || "N/A"}
              />

              <InfoItem
                icon={<Calendar size={18} />}
                label="Academic Year"
                value={classData.academic_year}
              />

              <InfoItem
                icon={<User size={18} />}
                label="Teacher"
                value={teacherName}
              />
            </div>

            {/* View Actions */}
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
                onClick={() => onEdit(classData)}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Edit size={17} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(classData.id)}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                <Trash2 size={17} />
                Delete
              </button>
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {mode === "edit" && (
          <form onSubmit={onSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Class Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Class Name
                </label>
                <input
                  type="text"
                  name="class_name"
                  value={formData?.class_name || ""}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Grade */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Grade
                </label>
                <input
                  type="text"
                  name="grade"
                  value={formData?.grade || ""}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Section */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Section
                </label>
                <input
                  type="text"
                  name="section"
                  value={formData?.section || ""}
                  onChange={onChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Room */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Room
                </label>
                <input
                  type="text"
                  name="room"
                  value={formData?.room || ""}
                  onChange={onChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Academic Year */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Academic Year
                </label>
                <input
                  type="text"
                  name="academic_year"
                  value={formData?.academic_year || ""}
                  onChange={onChange}
                  required
                  placeholder="2025/2026"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Teacher Selection */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Teacher
                </label>
                <select
                  name="teacher_id"
                  value={formData?.teacher_id || ""}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.first_name} {teacher.last_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Edit Actions */}
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
                {saving ? "Updating..." : "Update Class"}
              </button>
            </div>
          </form>
        )}

        {/* DELETE MODE */}
        {mode === "delete" && (
          <div className="p-6">
            <div className="rounded-xl border border-red-100 bg-red-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Trash2 size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">Delete Class</h3>

                  <p className="mt-1 text-sm text-gray-600">
                    Are you sure you want to delete this class?
                  </p>

                  <p className="mt-3 font-semibold text-gray-800">
                    {classData.class_name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Grade {classData.grade}
                    {classData.section ? ` - Section ${classData.section}` : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Delete Actions */}
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
                onClick={() => onDelete(classData.id)}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={17} />
                {saving ? "Deleting..." : "Delete Class"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Component for Info Display
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

export default ClassModal;