import {
    X,
    Save,
    RefreshCw,
    User,
    Mail,
    Lock,
    Shield,
    Activity,
} from "lucide-react";

const UserModal = ({
    open,
    editingUser,
    formData,
    saving,
    onClose,
    onChange,
    onSubmit,
}) => {

    if (!open) {
        return null;
    }


    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">

            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

                {/* =========================================
                    HEADER
                ========================================= */}

                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

                    <div>

                        <h2 className="text-xl font-bold text-gray-800">

                            {editingUser
                                ? "Edit User"
                                : "Add New User"}

                        </h2>

                        <p className="mt-1 text-sm text-gray-500">

                            {editingUser
                                ? "Update user information"
                                : "Create a new system account"}

                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <X size={20} />

                    </button>

                </div>


                {/* =========================================
                    FORM
                ========================================= */}

                <form
                    onSubmit={onSubmit}
                    className="space-y-5 p-6"
                >

                    {/* =====================================
                        NAME
                    ===================================== */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Full Name
                        </label>

                        <div className="relative">

                            <User
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={onChange}
                                placeholder="Enter full name"
                                required
                                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                    </div>


                    {/* =====================================
                        EMAIL
                    ===================================== */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <div className="relative">

                            <Mail
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={onChange}
                                placeholder="Enter email address"
                                required
                                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                    </div>


                    {/* =====================================
                        PASSWORD
                    ===================================== */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">

                            Password

                            {editingUser && (
                                <span className="ml-2 font-normal text-gray-400">
                                    (optional)
                                </span>
                            )}

                        </label>

                        <div className="relative">

                            <Lock
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={onChange}
                                placeholder={
                                    editingUser
                                        ? "Enter new password"
                                        : "Enter password"
                                }
                                required={!editingUser}
                                minLength={8}
                                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                        {editingUser && (
                            <p className="mt-1 text-xs text-gray-400">
                                Leave blank to keep the current password.
                            </p>
                        )}

                    </div>


                    {/* =====================================
                        ROLE
                    ===================================== */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Role
                        </label>

                        <div className="relative">

                            <Shield
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <select
                                name="role"
                                value={formData.role}
                                onChange={onChange}
                                className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >

                                <option value="super_admin">
                                    Super Admin
                                </option>

                                <option value="admin">
                                    Admin
                                </option>

                                <option value="teacher">
                                    Teacher
                                </option>

                                <option value="student">
                                    Student
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* =====================================
                        STATUS
                    ===================================== */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Status
                        </label>

                        <div className="relative">

                            <Activity
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <select
                                name="status"
                                value={formData.status}
                                onChange={onChange}
                                className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >

                                <option value="active">
                                    Active
                                </option>

                                <option value="inactive">
                                    Inactive
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* =====================================
                        BUTTONS
                    ===================================== */}

                    <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {saving ? (
                                <>
                                    <RefreshCw
                                        size={17}
                                        className="animate-spin"
                                    />

                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={17} />

                                    {editingUser
                                        ? "Update User"
                                        : "Create User"}
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default UserModal;