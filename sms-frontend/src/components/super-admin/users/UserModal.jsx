import {
  X,
  User,
  Mail,
  Lock,
  Shield,
  Activity,
  Save,
  Trash2,
  Edit,
  RefreshCw,
} from "lucide-react";

const UserModal = ({
  open,
  user,
  mode = "view",
  formData = {},
  saving = false,
  onClose,
  onChange,
  onSubmit,
  onEdit,
  onDelete,
}) => {
  if (!open || !user) return null;

  const userName = user.name || "No Name";
  const userEmail = user.email || "No Email";
  const userRole = formatRole(user.role);
  const userStatus = user.status || "Unknown";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {mode === "view" && "User Details"}
              {mode === "edit" && "Edit User"}
              {mode === "delete" && "Delete User"}
            </h2>

            <p className="text-sm text-gray-500">
              {mode === "view" && "View user account information"}
              {mode === "edit" && "Update user account information"}
              {mode === "delete" && "Confirm user account deletion"}
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
        ========================= */}
        {mode === "view" && (
          <div className="p-6">
            {/* Profile */}
            <div className="mb-6 flex items-center gap-5">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 ring-4 ring-blue-50">
                <User size={40} />
              </div>

              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-gray-800">
                  {userName}
                </h3>

                <p className="text-sm text-gray-500">{userEmail}</p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {userRole}
                  </span>

                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {capitalize(userStatus)}
                  </span>
                </div>
              </div>
            </div>

            {/* Information */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem
                icon={<User size={18} />}
                label="Full Name"
                value={userName}
              />

              <InfoItem
                icon={<Mail size={18} />}
                label="Email"
                value={userEmail}
              />

              <InfoItem
                icon={<Shield size={18} />}
                label="Role"
                value={userRole}
              />

              <InfoItem
                icon={<Activity size={18} />}
                label="Status"
                value={capitalize(userStatus)}
              />

              <InfoItem
                icon={<User size={18} />}
                label="User ID"
                value={user.id}
              />

              <InfoItem
                icon={<Mail size={18} />}
                label="Created At"
                value={formatDate(user.created_at)}
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
                onClick={() => onEdit(user)}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Edit size={17} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(user)}
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
        ========================= */}
        {mode === "edit" && (
          <form onSubmit={onSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Full Name */}
              <FormInput
                icon={<User size={17} />}
                label="Full Name"
                name="name"
                value={formData.name || ""}
                onChange={onChange}
                placeholder="Enter full name"
                required
              />

              {/* Email */}
              <FormInput
                icon={<Mail size={17} />}
                label="Email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={onChange}
                placeholder="Enter email address"
                required
              />

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                  <span className="ml-2 font-normal text-gray-400">
                    (optional)
                  </span>
                </label>

                <div className="relative">
                  <Lock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={onChange}
                    placeholder="Enter new password"
                    minLength={8}
                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <p className="mt-1 text-xs text-gray-400">
                  Leave blank to keep the current password.
                </p>
              </div>

              {/* Role */}
              <FormSelect
                icon={<Shield size={17} />}
                label="Role"
                name="role"
                value={formData.role || ""}
                onChange={onChange}
                options={[
                  {
                    value: "super_admin",
                    label: "Super Admin",
                  },
                  {
                    value: "admin",
                    label: "Admin",
                  },
                  {
                    value: "teacher",
                    label: "Teacher",
                  },
                  {
                    value: "student",
                    label: "Student",
                  },
                ]}
              />

              {/* Status */}
              <FormSelect
                icon={<Activity size={17} />}
                label="Status"
                name="status"
                value={formData.status || ""}
                onChange={onChange}
                options={[
                  {
                    value: "active",
                    label: "Active",
                  },
                  {
                    value: "inactive",
                    label: "Inactive",
                  },
                ]}
              />
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
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <RefreshCw size={17} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Update User
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* =========================
            DELETE MODE
        ========================= */}
        {mode === "delete" && (
          <div className="p-6">
            <div className="rounded-xl bg-red-50 p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                <Trash2 size={30} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-800">
                Delete User?
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete this user?
              </p>

              <p className="mt-1 font-semibold text-gray-700">{userName}</p>

              <p className="mt-2 text-xs text-red-500">
                This action cannot be undone.
              </p>
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
                onClick={() => onDelete(user)}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <RefreshCw size={17} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    Delete User
                  </>
                )}
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
  placeholder,
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
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
};

/* =========================
   FORM SELECT
========================= */

const FormSelect = ({ icon, label, name, value, onChange, options = [] }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

/* =========================
   HELPERS
========================= */

const formatRole = (role) => {
  if (!role) return "Unknown";

  return role
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const capitalize = (value) => {
  if (!value) return "Unknown";

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString();
};

export default UserModal;
