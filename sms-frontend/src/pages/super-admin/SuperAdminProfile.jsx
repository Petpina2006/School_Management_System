import React, { useEffect, useState } from "react";
import SuperAdminProfileCard from "../../components/super-admin/profile/SuperAdminProfileCard";
import { getSuperAdminProfile } from "../../services/super-admin/superAdminApi";

export default function SuperAdminProfile() {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getSuperAdminProfile();

            console.log("Super Admin Profile:", response);

            const profileData =
                response?.data?.user ??
                response?.data ??
                response;

            setAdmin(profileData);
        } catch (err) {
            console.error("Load Profile Error:", err);

            setError(
                err?.message ||
                    "Failed to load super admin profile."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

                    <p className="mt-4 text-sm text-slate-500">
                        Loading profile...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/40 dark:bg-red-900/20">
                <h3 className="font-semibold text-red-700 dark:text-red-400">
                    Failed to load profile
                </h3>

                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {error}
                </p>

                <button
                    onClick={loadProfile}
                    className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    My Profile
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Manage your Super Admin account information.
                </p>
            </div>

            {/* Profile Card */}
            <SuperAdminProfileCard
                admin={admin}
                onUpdated={(updatedAdmin) => {
                    setAdmin(updatedAdmin);
                }}
            />

        </div>
    );
}