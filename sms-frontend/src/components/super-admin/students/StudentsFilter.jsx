import { useEffect, useState } from "react";
import {
    X,
    User,
    Edit,
    Trash2,
    Save,
    Eye,
} from "lucide-react";

const StudentsModal = ({
    student,
    mode = "view",
    onClose,
    onUpdate,
    onDelete,
}) => {
    const [formData, setFormData] = useState({
        student_code: "",
        Full_name: "",
        gender: "",
        date_of_birth: "",
        phone: "",
        address: "",
        parent_name: "",
        parent_phone: "",
        status: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (student) {
            setFormData({
                student_code: student.student_code || "",
                Full_name: student.Full_name || "",
                gender: student.gender || "",
                date_of_birth: student.date_of_birth || "",
                phone: student.phone || "",
                address: student.address || "",
                parent_name: student.parent_name || "",
                parent_phone: student.parent_phone || "",
                status: student.status || "active",
            });
        }
    }, [student]);

    if (!student) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await onUpdate(student.id, formData);

            onClose();
        } catch (error) {
            console.error("Update Student Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${student.Full_name}?`
        );

        if (!confirmed) return;

        try {
            setLoading(true);

            await onDelete(student.id);

            onClose();
        } catch (error) {
            console.error("Delete Student Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">

                    <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-emerald-100 p-3">
                            {mode === "view" ? (
                                <Eye
                                    size={22}
                                    className="text-emerald-600"
                                />
                            ) : (
                                <Edit
                                    size={22}
                                    className="text-emerald-600"
                                />
                            )}
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800">
                                {mode === "view"
                                    ? "Student Details"
                                    : "Update Student"}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {student.student_code}
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Content */}
                {mode === "view" ? (

                    <div className="p-6">

                        {/* Student Profile */}
                        <div className="mb-6 flex items-center gap-4 rounded-xl bg-gray-50 p-5">

                            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-emerald-100">

                                {student.photo ? (
                                    <img
                                        src={`http://127.0.0.1:8000/Students/${student.photo}`}
                                        alt={student.Full_name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <User
                                        size={35}
                                        className="text-emerald-600"
                                    />
                                )}

                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    {student.Full_name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {student.student_code}
                                </p>

                                <span
                                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                        student.status === "active"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {student.status}
                                </span>
                            </div>

                        </div>

                        {/* Information */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <Info
                                label="Student Code"
                                value={student.student_code}
                            />

                            <Info
                                label="Full Name"
                                value={student.Full_name}
                            />

                            <Info
                                label="Gender"
                                value={student.gender}
                            />

                            <Info
                                label="Date of Birth"
                                value={student.date_of_birth}
                            />

                            <Info
                                label="Phone"
                                value={student.phone}
                            />

                            <Info
                                label="Status"
                                value={student.status}
                            />

                            <Info
                                label="Parent Name"
                                value={student.parent_name}
                            />

                            <Info
                                label="Parent Phone"
                                value={student.parent_phone}
                            />

                            <div className="md:col-span-2">
                                <Info
                                    label="Address"
                                    value={student.address || "N/A"}
                                />
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex justify-end gap-3 border-t pt-5">

                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                onClick={() => onUpdate(student.id)}
                                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
                            >
                                <Edit size={17} />
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={loading}
                                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                <Trash2 size={17} />
                                Delete
                            </button>

                        </div>

                    </div>

                ) : (

                    /* UPDATE FORM */
                    <form
                        onSubmit={handleSubmit}
                        className="p-6"
                    >

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <Input
                                label="Student Code"
                                name="student_code"
                                value={formData.student_code}
                                onChange={handleChange}
                            />

                            <Input
                                label="Full Name"
                                name="Full_name"
                                value={formData.Full_name}
                                onChange={handleChange}
                            />

                            {/* Gender */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                >
                                    <option value="">
                                        Select Gender
                                    </option>
                                    <option value="male">
                                        Male
                                    </option>
                                    <option value="female">
                                        Female
                                    </option>
                                </select>
                            </div>

                            <Input
                                label="Date of Birth"
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                            />

                            <Input
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            <Input
                                label="Parent Name"
                                name="parent_name"
                                value={formData.parent_name}
                                onChange={handleChange}
                            />

                            <Input
                                label="Parent Phone"
                                name="parent_phone"
                                value={formData.parent_phone}
                                onChange={handleChange}
                            />

                            {/* Status */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                >
                                    <option value="active">
                                        Active
                                    </option>

                                    <option value="inactive">
                                        Inactive
                                    </option>
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
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    placeholder="Enter address"
                                />

                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex justify-end gap-3 border-t pt-5">

                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                            >
                                <Save size={17} />

                                {loading
                                    ? "Updating..."
                                    : "Update Student"}
                            </button>

                        </div>

                    </form>
                )}

            </div>
        </div>
    );
};

/* =========================
   Input Component
========================= */

const Input = ({
    label,
    name,
    value,
    onChange,
    type = "text",
}) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
        </div>
    );
};

/* =========================
   Info Component
========================= */

const Info = ({ label, value }) => {
    return (
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase text-gray-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-800">
                {value || "N/A"}
            </p>
        </div>
    );
};

export default StudentsModal;