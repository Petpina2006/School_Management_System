import { Users, UserPlus, RefreshCw } from "lucide-react";

const UsersHeader = ({ onRefresh, onAdd, loading = false }) => {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      {/* =========================================
                TITLE
            ========================================= */}

      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-3">
          <Users size={26} className="text-blue-600" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all users in the school system
          </p>
        </div>
      </div>

      {/* =========================================
                BUTTONS
            ========================================= */}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>

        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          <UserPlus size={18} />
          Add User
        </button>
      </div>
    </div>
  );
};

export default UsersHeader;
