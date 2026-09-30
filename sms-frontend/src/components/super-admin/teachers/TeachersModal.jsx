import {
  X,
  User,
  Hash,
  Calendar,
  Phone,
  MapPin,
  BookOpen,
  Activity,
  Save,
  Trash2,
  Edit,
} from "lucide-react";

const TeachersModal = ({
  open,
  teacher,
  mode = "view",
  formData,
  saving = false,
  onClose,
  onChange,
  onSubmit,
  onEdit,
  onDelete,
}) => {
  if (!open || !teacher) return null;

  const teacherName = `${teacher.first_name || ""} ${
    teacher.last_name || ""
  }`.trim();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* =========================
            HEADER
        ========================== */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {mode === "view" && "Teacher Details"}
              {mode === "edit" && "Edit Teacher"}
              {mode === "delete" && "Delete Teacher"}
            </h2>

            <p className="text-sm text-gray-500">
              {mode === "view" && "View teacher information"}
              {mode === "edit" && "Update teacher information"}
              {mode === "delete" && "Remove this teacher from the system"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* =========================
            VIEW MODE
        ========================== */}
        {mode === "view" && (
          <div className="p-6">
            {/* Profile */}
            <div className="mb-6 flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <User size={40} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {teacherName || "Unknown Teacher"}
                </h3>

                <p className="text-sm text-gray-500">
                  {teacher.teacher_code || "No Teacher Code"}
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    teacher.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {teacher.status || "inactive"}
                </span>
              </div>
            </div>

            {/* Teacher Information */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem
                icon={<Hash size={18} />}
                label="Teacher Code"
                value={teacher.teacher_code}
              />

              <InfoItem
                icon={<User size={18} />}
                label="Full Name"
                value={teacherName}
              />

              <InfoItem
                icon={<User size={18} />}
                label="Gender"
                value={teacher.gender}
              />

              <InfoItem
                icon={<Calendar size={18} />}
                label="Date of Birth"
                value={teacher.date_of_birth}
              />

              <InfoItem
                icon={<Phone size={18} />}
                label="Phone"
                value={teacher.phone}
              />

              <InfoItem
                icon={<Calendar size={18} />}
                label="Hire Date"
                value={teacher.hire_date}
              />

              <InfoItem
                icon={<BookOpen size={18} />}
                label="Specialization"
                value={teacher.specialization}
              />

              <InfoItem
                icon={<Activity size={18} />}
                label="Status"
                value={teacher.status}
              />

              <InfoItem
                icon={<MapPin size={18} />}
                label="Address"
                value={teacher.address}
                fullWidth
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
                onClick={() => onEdit(teacher)}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Edit size={17} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(teacher.id)}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                <Trash2 size={17} />
                Delete
              </button>
            </div>
          </div>
        )}

        {/* =========================
            EDIT MODE
        ========================== */}
        {mode === "edit" && (
          <form onSubmit={onSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Teacher Code */}
              <FormInput
                icon={<Hash size={18} />}
                label="Teacher Code"
                name="teacher_code"
                value={formData?.teacher_code}
                onChange={onChange}
                required
              />

              {/* First Name */}
              <FormInput
                icon={<User size={18} />}
                label="First Name"
                name="first_name"
                value={formData?.first_name}
                onChange={onChange}
                required
              />

              {/* Last Name */}
              <FormInput
                icon={<User size={18} />}
                label="Last Name"
                name="last_name"
                value={formData?.last_name}
                onChange={onChange}
                required
              />

              {/* Gender */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData?.gender || ""}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Date of Birth */}
              <FormInput
                icon={<Calendar size={18} />}
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={formData?.date_of_birth}
                onChange={onChange}
              />

              {/* Phone */}
              <FormInput
                icon={<Phone size={18} />}
                label="Phone"
                name="phone"
                value={formData?.phone}
                onChange={onChange}
              />

              {/* Hire Date */}
              <FormInput
                icon={<Calendar size={18} />}
                label="Hire Date"
                name="hire_date"
                type="date"
                value={formData?.hire_date}
                onChange={onChange}
              />

              {/* Specialization */}
              <FormInput
                icon={<BookOpen size={18} />}
                label="Specialization"
                name="specialization"
                value={formData?.specialization}
                onChange={onChange}
              />

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData?.status || "active"}
                  onChange={onChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Address
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                  />

                  <textarea
                    name="address"
                    value={formData?.address || ""}
                    onChange={onChange}
                    rows="3"
                    className="w-full resize-none rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3 border-t pt-5">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <X size={17} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={17} />
                {saving ? "Updating..." : "Update Teacher"}
              </button>
            </div>
          </form>
        )}

        {/* =========================
            DELETE MODE
        ========================== */}
        {mode === "delete" && (
          <div className="p-6">
            <div className="rounded-xl border border-red-100 bg-red-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Trash2 size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Delete Teacher
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    Are you sure you want to delete this teacher?
                  </p>

                  <p className="mt-3 font-semibold text-gray-800">
                    {teacherName}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Teacher Code: {teacher.teacher_code || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3 border-t pt-5">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => onDelete(teacher.id)}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={17} />
                {saving ? "Deleting..." : "Delete Teacher"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================
   INFO ITEM
========================= */

const InfoItem = ({ icon, label, value, fullWidth = false }) => {
  return (
    <div
      className={`rounded-xl border border-gray-100 bg-gray-50 p-4 ${
        fullWidth ? "md:col-span-2" : ""
      }`}
    >
      <div className="mb-2 flex items-center gap-2 text-gray-500">
        {icon}

        <span className="text-xs font-medium uppercase">{label}</span>
      </div>

      <p className="text-sm font-medium text-gray-800">{value || "N/A"}</p>
    </div>
  );
};

/* =========================
   FORM INPUT
========================= */

const FormInput = ({
  icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          required={required}
          className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
};

export default TeachersModal;
