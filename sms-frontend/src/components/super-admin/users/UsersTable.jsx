import {
  Users,
  Edit,
  Trash2,
  RefreshCw,
  ShieldCheck,
  GraduationCap,
  UserRoundCheck,
  UserCog,
  CheckCircle,
  XCircle,
} from "lucide-react";

const UsersTable = ({ users = [], onEdit, onDelete, deletingId }) => {
  // =========================================
  // ROLE ICON
  // =========================================

  const getRoleIcon = (role) => {
    switch (role) {
      case "super_admin":
        return ShieldCheck;

      case "admin":
        return UserCog;

      case "teacher":
        return UserRoundCheck;

      case "student":
        return GraduationCap;

      default:
        return Users;
    }
  };

  // =========================================
  // ROLE STYLE
  // =========================================

  const getRoleStyle = (role) => {
    switch (role) {
      case "super_admin":
        return "bg-red-100 text-red-700";

      case "admin":
        return "bg-blue-100 text-blue-700";

      case "teacher":
        return "bg-purple-100 text-purple-700";

      case "student":
        return "bg-emerald-100 text-emerald-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // =========================================
  // ROLE NAME
  // =========================================

  const getRoleName = (role) => {
    if (!role) return "Unknown";

    return role
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // =========================================
  // STATUS STYLE
  // =========================================

  const getStatusStyle = (status) => {
    return status === "active"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-red-100 text-red-700";
  };

  // =========================================
  // EMPTY
  // =========================================

  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-sm">
        <Users size={45} className="mx-auto text-gray-300" />

        <h3 className="mt-4 font-semibold text-gray-600">No users found</h3>

        <p className="mt-1 text-sm text-gray-400">
          Try changing your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          {/* =====================================
                        HEADER
                    ===================================== */}

          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                #
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                User
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Email
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Role
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          {/* =====================================
                        BODY
                    ===================================== */}

          <tbody className="divide-y divide-gray-100">
            {users.map((user, index) => {
              const RoleIcon = getRoleIcon(user.role);

              return (
                <tr key={user.id} className="transition hover:bg-gray-50">
                  {/* Number */}

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {index + 1}
                  </td>

                  {/* User */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">
                          {user.name || "No Name"}
                        </p>

                        <p className="text-xs text-gray-400">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>

                  {/* Role */}

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${getRoleStyle(
                        user.role,
                      )}`}
                    >
                      <RoleIcon size={14} />

                      {getRoleName(user.role)}
                    </span>
                  </td>

                  {/* Status */}

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        user.status,
                      )}`}
                    >
                      {user.status === "active" ? (
                        <CheckCircle size={14} />
                      ) : (
                        <XCircle size={14} />
                      )}

                      {user.status
                        ? user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)
                        : "Unknown"}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {/* Edit */}

                      <button
                        type="button"
                        onClick={() => onEdit(user)}
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                        title="Edit User"
                      >
                        <Edit size={17} />
                      </button>

                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() => onDelete(user.id)}
                        disabled={deletingId === user.id}
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Delete User"
                      >
                        {deletingId === user.id ? (
                          <RefreshCw size={17} className="animate-spin" />
                        ) : (
                          <Trash2 size={17} />
                        )}
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

export default UsersTable;
