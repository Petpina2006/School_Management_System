import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    UserPlus,
    Save,
    Loader2,
    User,
    Mail,
    Lock,
    Shield,
    CheckCircle,
} from "lucide-react";

import { createUser } from "../../services/userApi";

const CreateUser = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "student",
        status: "active",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (formData.password !== formData.password_confirmation) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const result = await createUser(formData);

            console.log("Create User:", result);

            if (!result?.status) {
                throw new Error(
                    result?.message || "Failed to create user"
                );
            }

            setSuccess("User created successfully.");

            // setTimeout(() => {
            //     navigate("/super-admin/users");
            // }, 800);
        } catch (err) {
            console.error("Create User Error:", err);

            setError(
                err?.message ||
                    "Something went wrong while creating user."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-7 w-full">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/super-admin/users")
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Add User
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Create a new user account
                        </p>
                    </div>

                </div>
            </div>

            {/* Success */}
            {success && (
                <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                    <CheckCircle size={20} />
                    <span>{success}</span>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="max-w-8xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >

                {/* Basic Information */}
                <div className="mb-6">

                    <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">

                        <div className="rounded-lg bg-blue-100 p-2">
                            <UserPlus
                                size={20}
                                className="text-blue-600"
                            />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-800">
                                User Information
                            </h2>

                            <p className="text-xs text-gray-500">
                                Enter basic account information
                            </p>
                        </div>

                    </div>

                    {/* Name */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Full Name
                        </label>

                        <div className="relative">

                            <User
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                required
                                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <div className="relative">

                            <Mail
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                required
                                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    required
                                    className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={
                                        formData.password_confirmation
                                    }
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    required
                                    className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>
                        </div>

                    </div>
                </div>

                {/* Role & Status */}
                <div className="border-t border-gray-100 pt-6">

                    <div className="mb-5 flex items-center gap-3">

                        <div className="rounded-lg bg-purple-100 p-2">
                            <Shield
                                size={20}
                                className="text-purple-600"
                            />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-800">
                                Account Settings
                            </h2>

                            <p className="text-xs text-gray-500">
                                Configure role and account status
                            </p>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* Role */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Role
                            </label>

                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="student">
                                    Student
                                </option>

                                <option value="teacher">
                                    Teacher
                                </option>

                                <option value="admin">
                                    Admin
                                </option>

                                <option value="super_admin">
                                    Super Admin
                                </option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

                {/* Buttons */}
                <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-5">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/super-admin/users")
                        }
                        className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    size={17}
                                    className="animate-spin"
                                />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Save size={17} />
                                Create User
                            </>
                        )}
                    </button>

                </div>

            </form>
        </div>
    );
};

export default CreateUser;