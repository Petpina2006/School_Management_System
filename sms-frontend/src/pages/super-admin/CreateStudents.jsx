import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    User,
    Hash,
    Calendar,
    Phone,
    MapPin,
    Users,
    Activity,
    Save,
    X,
    RefreshCw,
} from "lucide-react";

import { createStudent } from "../../services/studentApi";

const CreateStudent = () => {
    const navigate = useNavigate();

    // =========================================
    // FORM DATA
    // =========================================
    const [formData, setFormData] = useState({
        student_code: "",
        Full_name: "",
        gender: "",
        date_of_birth: "",
        phone: "",
        address: "",
        parent_name: "",
        parent_phone: "",
        status: "active",
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // =========================================
    // HANDLE CHANGE
    // =========================================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================================
    // SUBMIT
    // =========================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            const result = await createStudent(formData);

            console.log("Create Student:", result);

            if (!result?.status) {
                throw new Error(
                    result?.message || "Failed to create student"
                );
            }

            // Success
            navigate("/super-admin/students");
        } catch (error) {
            console.error("Create Student Error:", error);

            setError(
                error?.message || "Failed to create student."
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================================
    // BACK / CANCEL
    // =========================================
    const handleCancel = () => {
        if (saving) return;

        navigate("/super-admin/students");
    };

    // =========================================
    // RENDER
    // =========================================
    return (
        <div className="w-full">

            {/* =====================================
                HEADER
            ===================================== */}
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div className="flex items-center gap-3">

                    {/* Back Button */}
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={saving}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Add New Student
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Create a new student profile
                        </p>
                    </div>

                </div>

            </div>

            {/* =====================================
                ERROR
            ===================================== */}
            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* =====================================
                FORM
            ===================================== */}
            <form
                onSubmit={handleSubmit}
                className="w-full rounded-2xl border border-gray-100 bg-white shadow-sm"
            >

                {/* =====================================
                    BASIC INFORMATION
                ===================================== */}
                <div className="border-b border-gray-100 p-6">

                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-800">
                            Basic Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Enter the student's personal information
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* Student Code */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Student Code
                            </label>

                            <div className="relative">

                                <Hash
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    name="student_code"
                                    value={formData.student_code}
                                    onChange={handleChange}
                                    placeholder="e.g. STU001"
                                    required
                                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>
                        </div>

                        {/* Full Name */}
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
                                    name="Full_name"
                                    value={formData.Full_name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    required
                                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Gender
                            </label>

                            <div className="relative">

                                <User
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Date of Birth
                            </label>

                            <div className="relative">

                                <Calendar
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={formData.date_of_birth}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Phone
                            </label>

                            <div className="relative">

                                <Phone
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    required
                                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>
                        </div>

                        {/* Status */}
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
                                    onChange={handleChange}
                                    required
                                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

                    </div>
                </div>

                {/* =====================================
                    PARENT INFORMATION
                ===================================== */}
                <div className="border-b border-gray-100 p-6">

                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-800">
                            Parent Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Enter parent or guardian information
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* Parent Name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Parent Name
                            </label>

                            <div className="relative">

                                <Users
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    name="parent_name"
                                    value={formData.parent_name}
                                    onChange={handleChange}
                                    placeholder="Enter parent name"
                                    required
                                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>
                        </div>

                        {/* Parent Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Parent Phone
                            </label>

                            <div className="relative">

                                <Phone
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    name="parent_phone"
                                    value={formData.parent_phone}
                                    onChange={handleChange}
                                    placeholder="Enter parent phone"
                                    required
                                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>
                        </div>

                    </div>
                </div>

                {/* =====================================
                    ADDRESS
                ===================================== */}
                <div className="border-b border-gray-100 p-6">

                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-800">
                            Address
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Enter the student's current address
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Student Address
                        </label>

                        <div className="relative">

                            <MapPin
                                size={17}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter student address"
                                rows={4}
                                className="w-full resize-none rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>
                    </div>

                </div>

                {/* =====================================
                    BUTTONS
                ===================================== */}
                <div className="flex justify-end gap-3 p-6">

                    {/* Cancel */}
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={saving}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X size={17} />
                        Cancel
                    </button>

                    {/* Create */}
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
                                Creating...
                            </>
                        ) : (
                            <>
                                <Save size={17} />
                                Create Student
                            </>
                        )}
                    </button>

                </div>

            </form>
        </div>
    );
};

export default CreateStudent;