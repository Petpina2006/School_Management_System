import {
  X,
  BookOpen,
  Hash,
  FileText,
  Activity,
  Save,
  Trash2,
  Edit,
} from "lucide-react";

const SubjectModal = ({
  open,
  subject,
  mode = "view",
  formData,
  saving = false,
  onClose,
  onChange,
  onSubmit,
  onEdit,
  onDelete,
}) => {
  if (!open || !subject) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* =========================
            HEADER
        ========================== */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {mode === "view" && "Subject Details"}
              {mode === "edit" && "Edit Subject"}
              {mode === "delete" && "Delete Subject"}
            </h2>

            <p className="text-sm text-gray-500">
              {mode === "view" && "View subject information"}
              {mode === "edit" && "Update subject information"}
              {mode === "delete" && "Remove this subject from the system"}
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
            {/* Subject Profile */}
            <div className="mb-6 flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <BookOpen size={40} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {subject.subject_name || "Unknown Subject"}
                </h3>

                <p className="text-sm text-gray-500">
                  {subject.subject_code || "No Subject Code"}
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    subject.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {subject.status || "inactive"}
                </span>
              </div>
            </div>

            {/* Subject Information */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem
                icon={<Hash size={18} />}
                label="Subject Code"
                value={subject.subject_code}
              />

              <InfoItem
                icon={<BookOpen size={18} />}
                label="Subject Name"
                value={subject.subject_name}
              />

              <InfoItem
                icon={<Activity size={18} />}
                label="Status"
                value={subject.status}
              />

              <InfoItem
                icon={<FileText size={18} />}
                label="Description"
                value={subject.description}
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
                onClick={() => onEdit(subject)}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Edit size={17} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(subject.id)}
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
              {/* Subject Code */}
              <FormInput
                icon={<Hash size={18} />}
                label="Subject Code"
                name="subject_code"
                value={formData?.subject_code}
                onChange={onChange}
                required
              />

              {/* Subject Name */}
              <FormInput
                icon={<BookOpen size={18} />}
                label="Subject Name"
                name="subject_name"
                value={formData?.subject_name}
                onChange={onChange}
                required
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

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                  />

                  <textarea
                    name="description"
                    value={formData?.description || ""}
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
                {saving ? "Updating..." : "Update Subject"}
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
                    Delete Subject
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    Are you sure you want to delete this subject?
                  </p>

                  <p className="mt-3 font-semibold text-gray-800">
                    {subject.subject_name || "Unknown Subject"}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Subject Code: {subject.subject_code || "N/A"}
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
                onClick={() => onDelete(subject.id)}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={17} />
                {saving ? "Deleting..." : "Delete Subject"}
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

export default SubjectModal;