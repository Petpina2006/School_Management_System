import {
    X,
    User,
    Phone,
    Calendar,
    MapPin,
    Users,
    Edit,
    Trash2,
    Save,
} from "lucide-react";

const StudentsModal = ({
    open,
    student,
    mode = "view",
    formData,
    saving,
    onClose,
    onChange,
    onSubmit,
    onEdit,
    onDelete,
}) => {
    if (!open || !student) return null;

    const photoUrl = student.photo
        ? `http://127.0.0.1:8000/Students/${student.photo}`
        : null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            {mode === "view"
                                ? "Student Details"
                                : "Edit Student"}
                        </h2>

                        <p className="text-sm text-gray-500">
                            {mode === "view"
                                ? "View student information"
                                : "Update student information"}
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
                        {/* Profile */}
                        <div className="mb-6 flex items-center gap-5">
                            {photoUrl ? (
                                <img
                                    src={photoUrl}
                                    alt={student.Full_name}
                                    className="h-24 w-24 rounded-full object-cover ring-4 ring-blue-50"
                                />
                            ) : (
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    <User size={40} />
                                </div>
                            )}

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {student.Full_name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {student.student_code}
                                </p>

                                <span
                                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                        student.status === "active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {student.status}
                                </span>
                            </div>
                        </div>

                        {/* Information */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <InfoItem
                                icon={<User size={18} />}
                                label="Gender"
                                value={student.gender}
                            />

                            <InfoItem
                                icon={<Calendar size={18} />}
                                label="Date of Birth"
                                value={student.date_of_birth}
                            />

                            <InfoItem
                                icon={<Phone size={18} />}
                                label="Phone"
                                value={student.phone}
                            />

                            <InfoItem
                                icon={<MapPin size={18} />}
                                label="Address"
                                value={student.address || "N/A"}
                            />

                            <InfoItem
                                icon={<Users size={18} />}
                                label="Parent Name"
                                value={student.parent_name}
                            />

                            <InfoItem
                                icon={<Phone size={18} />}
                                label="Parent Phone"
                                value={student.parent_phone}
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
                                onClick={() => onEdit(student)}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                <Edit size={17} />
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={() => onDelete(student.id)}
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

                            {/* Student Code */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Student Code
                                </label>

                                <input
                                    type="text"
                                    name="student_code"
                                    value={formData.student_code}
                                    onChange={onChange}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Full Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="Full_name"
                                    value={formData.Full_name}
                                    onChange={onChange}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={onChange}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Date of Birth
                                </label>

                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={formData.date_of_birth}
                                    onChange={onChange}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={onChange}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Parent Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Parent Name
                                </label>

                                <input
                                    type="text"
                                    name="parent_name"
                                    value={formData.parent_name}
                                    onChange={onChange}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Parent Phone */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Parent Phone
                                </label>

                                <input
                                    type="text"
                                    name="parent_phone"
                                    value={formData.parent_phone}
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
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Address */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={onChange}
                                    rows="3"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
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

                                {saving ? "Updating..." : "Update Student"}
                            </button>
                        </div>
                    </form>
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
                <span className="text-xs font-medium uppercase">
                    {label}
                </span>
            </div>

            <p className="text-sm font-medium text-gray-800">
                {value || "N/A"}
            </p>
        </div>
    );
};

export default StudentsModal;