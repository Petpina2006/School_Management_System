import React, { useEffect, useState } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    ShieldCheck,
    Pencil,
    Save,
    X,
    BadgeCheck,
} from "lucide-react";

import {
    updateSuperAdminProfile,
} from "../../../services/super-admin/superAdminApi";

export default function SuperAdminProfileCard({
    admin,
    onUpdated,
}) {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
    });

    // ==========================================
    // Load data
    // ==========================================

    useEffect(() => {
        if (admin) {
            const fullName = admin.name || "";

            const nameParts = fullName.trim().split(" ");

            setForm({
                first_name:
                    admin.first_name ||
                    nameParts[0] ||
                    "",

                last_name:
                    admin.last_name ||
                    nameParts.slice(1).join(" ") ||
                    "",

                phone: admin.phone || "",
                address: admin.address || "",
            });
        }
    }, [admin]);

    if (!admin) {
        return null;
    }

    // ==========================================
    // Full Name
    // ==========================================

    const fullName =
        admin.first_name || admin.last_name
            ? `${admin.first_name || ""} ${
                  admin.last_name || ""
              }`.trim()
            : admin.name || "Super Admin";

    // ==========================================
    // Avatar Initial
    // ==========================================

    const initial =
        fullName.charAt(0).toUpperCase() || "S";

    // ==========================================
    // Status
    // ==========================================

    const isActive =
        (admin.status || "active").toLowerCase() ===
        "active";

    // ==========================================
    // Handle Input
    // ==========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // Save
    // ==========================================

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const response =
                await updateSuperAdminProfile({
                    first_name: form.first_name,
                    last_name: form.last_name,
                    phone: form.phone,
                    address: form.address,
                });

            console.log(
                "Update Super Admin Response:",
                response
            );

            const updatedAdmin = response?.data;

            if (!updatedAdmin) {
                throw new Error(
                    "Updated profile data not found."
                );
            }

            onUpdated?.(updatedAdmin);

            setSuccess(
                "Profile updated successfully."
            );

            setEditing(false);
        } catch (err) {
            console.error(
                "Update Super Admin Error:",
                err
            );

            setError(
                err?.message ||
                    "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    };

    // ==========================================
    // Cancel
    // ==========================================

    const handleCancel = () => {
        const fullName = admin.name || "";

        const nameParts = fullName.trim().split(" ");

        setForm({
            first_name:
                admin.first_name ||
                nameParts[0] ||
                "",

            last_name:
                admin.last_name ||
                nameParts.slice(1).join(" ") ||
                "",

            phone: admin.phone || "",
            address: admin.address || "",
        });

        setError("");
        setSuccess("");
        setEditing(false);
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            {/* ==========================================
                PROFILE HEADER
            ========================================== */}

            <div className="border-b border-slate-200 p-6 dark:border-slate-800">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    {/* Profile */}
                    <div className="flex items-center gap-4">

                        {/* Avatar */}
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                            {initial}
                        </div>

                        {/* Name */}
                        <div>

                            <div className="flex items-center gap-2">

                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {fullName}
                                </h2>

                                <BadgeCheck
                                    size={20}
                                    className="text-indigo-500"
                                />

                            </div>

                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">

                                <ShieldCheck
                                    size={16}
                                />

                                <span>
                                    Super Administrator
                                </span>

                            </div>

                            {/* Status */}
                            <div className="mt-3">

                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                        isActive
                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                    }`}
                                >
                                    {admin.status ||
                                        "Active"}
                                </span>

                            </div>

                        </div>
                    </div>

                    {/* Edit */}
                    {!editing && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditing(true);
                                setError("");
                                setSuccess("");
                            }}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                        >
                            <Pencil size={17} />
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {/* ==========================================
                MESSAGE
            ========================================== */}

            {error && (
                <div className="mx-6 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400">
                    {error}
                </div>
            )}

            {success && (
                <div className="mx-6 mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-400">
                    {success}
                </div>
            )}

            {/* ==========================================
                CONTENT
            ========================================== */}

            <div className="p-6">

                {!editing ? (

                    /* =====================================
                       VIEW MODE
                    ===================================== */

                    <div>

                        <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">

                            <User size={20} />

                            Personal & Contact
                            Information

                        </h3>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            {/* User ID */}
                            <InfoItem
                                icon={
                                    <ShieldCheck
                                        size={18}
                                    />
                                }
                                label="User ID"
                                value={
                                    admin.id
                                }
                            />

                            {/* First Name */}
                            <InfoItem
                                icon={
                                    <User
                                        size={18}
                                    />
                                }
                                label="First Name"
                                value={
                                    admin.first_name ||
                                    fullName
                                        .split(" ")[0]
                                }
                            />

                            {/* Last Name */}
                            <InfoItem
                                icon={
                                    <User
                                        size={18}
                                    />
                                }
                                label="Last Name"
                                value={
                                    admin.last_name ||
                                    fullName
                                        .split(" ")
                                        .slice(1)
                                        .join(" ")
                                }
                            />

                            {/* Email */}
                            <InfoItem
                                icon={
                                    <Mail
                                        size={18}
                                    />
                                }
                                label="Email Address"
                                value={
                                    admin.email
                                }
                            />

                            {/* Phone */}
                            <InfoItem
                                icon={
                                    <Phone
                                        size={18}
                                    />
                                }
                                label="Phone Number"
                                value={
                                    admin.phone
                                }
                            />

                            {/* Role */}
                            <InfoItem
                                icon={
                                    <ShieldCheck
                                        size={18}
                                    />
                                }
                                label="Role"
                                value="Super Admin"
                            />

                            {/* Address */}
                            <div className="sm:col-span-2 lg:col-span-3">

                                <InfoItem
                                    icon={
                                        <MapPin
                                            size={18}
                                        />
                                    }
                                    label="Address"
                                    value={
                                        admin.address
                                    }
                                />

                            </div>

                        </div>

                    </div>

                ) : (

                    /* =====================================
                       EDIT MODE
                    ===================================== */

                    <form onSubmit={handleSave}>

                        <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">

                            <Pencil size={20} />

                            Edit Profile

                        </h3>

                        <div className="grid gap-5 sm:grid-cols-2">

                            {/* First Name */}
                            <FormInput
                                label="First Name"
                                name="first_name"
                                value={
                                    form.first_name
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter first name"
                                required
                            />

                            {/* Last Name */}
                            <FormInput
                                label="Last Name"
                                name="last_name"
                                value={
                                    form.last_name
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter last name"
                                required
                            />

                            {/* Email */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    value={
                                        admin.email ||
                                        ""
                                    }
                                    disabled
                                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                                />

                                <p className="mt-1 text-xs text-slate-400">
                                    Email cannot be changed here.
                                </p>

                            </div>

                            {/* Phone */}
                            <FormInput
                                label="Phone Number"
                                name="phone"
                                value={
                                    form.phone
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter phone number"
                            />

                            {/* Address */}
                            <div className="sm:col-span-2">

                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    value={
                                        form.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    rows={4}
                                    placeholder="Enter address"
                                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />

                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            {/* Cancel */}
                            <button
                                type="button"
                                onClick={
                                    handleCancel
                                }
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                <X size={17} />
                                Cancel
                            </button>

                            {/* Save */}
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Save size={17} />

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                        </div>

                    </form>
                )}
            </div>
        </div>
    );
}


/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({
    icon,
    label,
    value,
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">

            <div className="mb-2 flex items-center gap-2 text-slate-400">

                {icon}

                <span className="text-xs font-medium uppercase tracking-wide">
                    {label}
                </span>

            </div>

            <p className="break-words text-sm font-medium text-slate-900 dark:text-white">
                {value || "N/A"}
            </p>

        </div>
    );
}


/* ============================================================
   FORM INPUT
============================================================ */

function FormInput({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

        </div>
    );
}